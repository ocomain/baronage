#!/usr/bin/env python3
"""
Publish one In Memoriam notice to News on www.baronage.com, unattended (owner 2026-10-26: "memoir is written on site
auto"). Run by the weekly scheduled task "roll-obituary-scan" once it has a confirmed death and has written the notice.

    python3 /Users/ac/Projects/baronage.com/www/scripts/publish_memoriam.py /path/to/notice.json
    python3 /Users/ac/Projects/baronage.com/www/scripts/publish_memoriam.py /path/to/notice.json --dry-run

The JSON file (UTF-8):
    roll_id            Roll entry id (number)
    name               "James, 16th Earl of Lindsay"
    titles             titles as on the Roll: ["Earl of Lindsay", "Baron of Kilconquhar"] (or one string)
    died               ISO date, "2026-10-09"; only what the sources give: "2026-06" (shown "June 2026") or "2026"
    born               optional, the same way: "1955-11-19", "1955-11" or "1955"; leave it out when no source gives it.
                       Never guess a day or a month.
    place              place of death, "London"
    text               the notice, 100 to 150 words, plain text, paragraphs separated by a blank line, no links
    family_notice_url  the family's own notice (linked, never copied)
    source_urls        list of URLs, or of {"label": "...", "url": "..."}
    roll_url           the Roll entry, "https://roll.baronage.com/baron/the-earl-of-lindsay"
  optional:
    family_notice_label  link text, default "The family's notice"
    slug, title          default from the name: "james-16th-earl-of-lindsay", "In Memoriam: James, 16th Earl of Lindsay"
    published            default today (London); kept from the first run when the notice already exists
    photo                the holder's portrait from his Roll entry, {"url": "https://roll.baronage.com/baronages/…jpg"}
                         (credited "Roll of Scottish Barons"), or a photograph we are free to use, shown beside
                         the heading and on the sharing card:
                         {"url": image file to download, "credit": "Chris McAndrew / UK Parliament",
                          "licence": "CC BY 3.0", "licence_url": "...", "source_url": page where the licence is shown,
                          "alt": optional description}. Only free licences: CC BY, CC BY-SA, CC0, public domain,
                         Open Government Licence. Never a newspaper's, an agency's or a family notice's picture.

What it does: checks the notice (length, no links, never "feudal", no cause of death); pulls; writes
content/news/<slug>.json (and the photo as public/images/news/<slug>.webp and .jpg); builds the site; commits that one file (plain message) and pushes to main; waits until the
page answers 200 on www.baronage.com with the name on it; tells IndexNow; prints the URL as the last line on stdout.
Messages go to stderr. Safe to run twice: an unchanged notice is not committed again, and the URL is printed. Exits 1
with a plain message on any failure, leaving the checkout as it found it.
"""
import argparse
import fcntl
import html
import json
import os
import re
import subprocess
import sys
import time
import unicodedata
import urllib.error
import urllib.request
from datetime import datetime
from io import BytesIO
from pathlib import Path
from zoneinfo import ZoneInfo

REPO = Path(__file__).resolve().parent.parent
NEWS_DIR = REPO / "content" / "news"
PHOTO_DIR = REPO / "public" / "images" / "news"
FREE_LICENCE = re.compile(r"^(CC BY(-SA)? \d(\.\d)?|CC0( 1\.0)?|Public domain|OGL( v\d(\.\d)?)?|Open Government Licence( v\d(\.\d)?)?)$", re.I)
SITE = "https://www.baronage.com"
CATEGORY, CATEGORY_SLUG = "In Memoriam", "in-memoriam"
CATEGORY_SLUGS = {"In Memoriam": "in-memoriam", "Congratulations": "congratulations"}
INDEXNOW = {"key": "910101b36edcdd4d440834976c689148", "keyLocation": f"{SITE}/910101b36edcdd4d440834976c689148.txt"}
MIN_WORDS, MAX_WORDS = 100, 150
LIVE_TIMEOUT_S = 15 * 60

REQUIRED = ["roll_id", "name", "titles", "died", "place", "text", "family_notice_url", "source_urls", "roll_url"]
# Never in our own voice (owner, 2026-09); and never a cause of death (the brief's rule).
BANNED = [(r"\bfeudal\b", '"feudal"')]
CAUSE_OF_DEATH = [
    r"\bcancer\b", r"\btumou?r\b", r"\bstroke\b", r"\bheart attack\b", r"\bcardiac\b", r"\bsuicide\b", r"\billness\b",
    r"\bdisease\b", r"\bdementia\b", r"\balzheimer", r"\bcovid\b", r"\bpneumonia\b", r"\bcause of death\b",
    r"\baccident\b", r"\bcollapsed\b", r"\bovercome\b",
]
ISO_DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
# A death or birth date as far as the sources go (owner-approved Horsbrugh notice, 26 Oct 2026: died "at the weekend",
# born unknown): a year, a year and month, or a full date.
PARTIAL_DATE = re.compile(r"^\d{4}(-\d{2}(-\d{2})?)?$")
PARTIAL_FORMATS = {4: "%Y", 7: "%Y-%m", 10: "%Y-%m-%d"}
os.environ["PATH"] = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:" + os.environ.get("PATH", "")


def say(msg: str) -> None:
    print(f"publish_memoriam: {msg}", file=sys.stderr, flush=True)


def fail(msg: str) -> None:
    say(f"FAILED: {msg}")
    sys.exit(1)


def mask(text: str) -> str:
    return re.sub(r"gh[pousr]_[A-Za-z0-9_]+", "***", text)


def run(args: list[str], check: bool = True, timeout: int = 900) -> subprocess.CompletedProcess:
    p = subprocess.run(args, cwd=REPO, capture_output=True, text=True, timeout=timeout)
    if check and p.returncode != 0:
        fail(f"`{' '.join(args)}` exited {p.returncode}: {mask((p.stderr or p.stdout).strip())[-800:]}")
    return p


def slugify(name: str) -> str:
    s = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def words(text: str) -> int:
    return len(text.split())


def check_photo(ph, roll_url: str) -> dict:
    """A photograph we may use: a free licence with its credit, or (owner 2026-10-26, "where is his pic? see roll") the
    holder's own portrait on his Roll entry, credited to the Roll, or a picture the owner supplies as a file."""
    if not isinstance(ph, dict) or not (str(ph.get("url", "")).strip() or str(ph.get("file", "")).strip()):
        fail("photo must be an object with at least a url (or a file)")
    crop = ph.get("crop")
    if crop is not None and not (
        isinstance(crop, list) and len(crop) == 4 and all(isinstance(v, int) and v >= 0 for v in crop) and crop[2] > crop[0] and crop[3] > crop[1]
    ):
        fail(f"photo.crop must be [left, top, right, bottom] in pixels of the original, got {crop!r}")
    extra = {
        **({"crop": crop} if crop else {}),
        # who the picture shows, when that is not plain from the post (owner 2026-10-26: Lady Violet's 2014 photo on the birth post)
        **({"caption": str(ph["caption"]).strip()} if ph.get("caption") else {}),
    }
    if str(ph.get("file", "")).strip():
        # a picture the owner supplies from his own computer (owner 2026-10-26: "use Screenshot … on my comp as photo"):
        # its use is his decision; the credit line shows only when a credit is given
        path = Path(str(ph["file"])).expanduser()
        if not path.is_file():
            fail(f"photo.file {path} is not a file")
        return {
            "url": f"owner-supplied:{path.name}",
            "file": str(path),
            "credit": str(ph.get("credit", "")).strip(),
            "licence": "",
            "source_url": str(ph.get("source_url", "")).strip(),
            **({"alt": str(ph["alt"]).strip()} if ph.get("alt") else {}),
            **extra,
        }
    src = str(ph["url"]).strip()
    if not re.match(r"^https?://\S+$", src):
        fail(f"photo.url must be a web address, got {src!r}")
    if re.match(r"^https://roll\.baronage\.com/", src):
        return {
            "url": src,
            "credit": str(ph.get("credit") or "Roll of Scottish Barons").strip(),
            "licence": "",
            "source_url": str(ph.get("source_url") or roll_url).strip(),
            **({"alt": str(ph["alt"]).strip()} if ph.get("alt") else {}),
            **extra,
        }
    lack = [k for k in ("credit", "licence", "source_url") if not str(ph.get(k, "")).strip()]
    if lack:
        fail(f"photo is missing: {', '.join(lack)} (a photo is only used with its credit and licence)")
    if not FREE_LICENCE.match(str(ph["licence"]).strip()):
        fail(f"photo licence {ph['licence']!r} is not a free licence we can use (CC BY, CC BY-SA, CC0, public domain, OGL), and the photo is not from the holder's Roll entry")
    for k in ("source_url", "licence_url"):
        if ph.get(k) and not re.match(r"^https?://\S+$", str(ph[k])):
            fail(f"photo.{k} must be a web address, got {ph[k]!r}")
    return {
        "url": src,
        "credit": str(ph["credit"]).strip(),
        "licence": str(ph["licence"]).strip(),
        **({"licence_url": str(ph["licence_url"])} if ph.get("licence_url") else {}),
        "source_url": str(ph["source_url"]),
        **({"alt": str(ph["alt"]).strip()} if ph.get("alt") else {}),
        **extra,
    }


def check_notice(d: dict) -> dict:
    """The notice as it will be stored, or a plain message and exit 1."""
    if "text" not in d and "notice" in d:
        d["text"] = d.pop("notice")
    missing = [k for k in REQUIRED if d.get(k) in (None, "", [])]
    if missing:
        fail(f"missing field(s): {', '.join(missing)}")
    try:
        roll_id = int(d["roll_id"])
    except (TypeError, ValueError):
        fail(f"roll_id must be a number, got {d['roll_id']!r}")
    if d.get("born") in (None, "", "unknown", "UNKNOWN"):
        d.pop("born", None)
    for k in ("born", "died"):
        if k not in d:
            continue
        if not PARTIAL_DATE.match(str(d[k])):
            fail(f"{k} must be an ISO date like 1955-11-19, or as far as the sources go: 1955-11 or 1955 (leave born out when unknown); got {d[k]!r}")
        try:
            datetime.strptime(d[k], PARTIAL_FORMATS[len(d[k])])
        except ValueError:
            fail(f"{k} is not a real date: {d[k]!r}")
    if "born" in d and d["died"][: len(d["born"])] < d["born"][: len(d["died"])]:
        fail("died is before born")
    titles = d["titles"] if isinstance(d["titles"], list) else [d["titles"]]
    titles = [str(t).strip() for t in titles if str(t).strip()]

    text = "\n\n".join(p.strip() for p in re.split(r"\n\s*\n", str(d["text"]).replace("\r\n", "\n")) if p.strip())
    n = words(text)
    if n > MAX_WORDS:
        fail(f"the notice is {n} words; the most is {MAX_WORDS}")
    if n < MIN_WORDS:
        fail(f"the notice is {n} words; the least is {MIN_WORDS}")
    if re.search(r"https?://|www\.|\]\(|<[a-z/]", text, re.I):
        fail("the notice text must be plain: no links, web addresses or markup (links go in the URL fields)")
    for pattern, label in BANNED:
        if re.search(pattern, text, re.I):
            fail(f"the notice uses {label}, which never appears in the Association's own voice")
    for pattern in CAUSE_OF_DEATH:
        m = re.search(pattern, text, re.I)
        if m:
            fail(f"the notice seems to give a cause of death ({m.group(0)!r}); notices never do")

    def url(v: str, field: str) -> str:
        if not re.match(r"^https?://\S+$", str(v)):
            fail(f"{field} must be a web address, got {v!r}")
        return str(v)

    sources = []
    for s in d["source_urls"] if isinstance(d["source_urls"], list) else [d["source_urls"]]:
        if isinstance(s, dict):
            sources.append({"label": str(s.get("label", "")).strip() or url(s.get("url", ""), "source_urls"), "url": url(s.get("url", ""), "source_urls")})
        else:
            sources.append(url(s, "source_urls"))

    photo_in = check_photo(d.get("photo"), d["roll_url"]) if d.get("photo") else None

    name = str(d["name"]).strip()
    slug = slugify(d.get("slug") or name)
    if not slug:
        fail("could not make a page address from the name")
    post = {
        "slug": slug,
        "category": CATEGORY,
        "published": str(d.get("published") or datetime.now(ZoneInfo("Europe/London")).date().isoformat()),
        "title": str(d.get("title") or f"In Memoriam: {name}").strip(),
        "roll_id": roll_id,
        "name": name,
        "titles": titles,
        **({"born": d["born"]} if "born" in d else {}),
        "died": d["died"],
        "place": str(d["place"]).strip(),
        "text": text,
        "family_notice_url": url(d["family_notice_url"], "family_notice_url"),
        **({"family_notice_label": str(d["family_notice_label"]).strip()} if d.get("family_notice_label") else {}),
        "roll_url": url(d["roll_url"], "roll_url"),
        "source_urls": sources,
    }
    if photo_in:
        post["_photo_in"] = photo_in
    if not ISO_DATE.match(post["published"]):
        fail(f"published must be an ISO date, got {post['published']!r}")
    return post


def build() -> None:
    """npm run build, again up to twice when the Google Fonts download flakes (a known hiccup)."""
    for attempt in range(1, 4):
        p = subprocess.run(["npm", "run", "build"], cwd=REPO, capture_output=True, text=True, timeout=1200)
        if p.returncode == 0:
            return
        log = p.stdout + p.stderr
        if attempt < 3 and re.search(r"queries have exactly one entry|next/font|Module not found", log):
            say(f"build failed on the font download (attempt {attempt}); trying again")
            continue
        raise RuntimeError(log.strip()[-1500:])


def fetch(url: str) -> tuple[int, str]:
    req = urllib.request.Request(f"{url}?t={int(time.time())}", headers={"Cache-Control": "no-cache", "User-Agent": "publish_memoriam"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception:
        return 0, ""


def fetch_photo(photo_in: dict, slug: str, name: str) -> tuple[dict, list[Path]]:
    """Download a free-licence photograph and store it on our site: WebP for the page, JPEG for the sharing card."""
    from PIL import Image, ImageOps

    if photo_in.get("file"):
        data = Path(photo_in["file"]).read_bytes()
    else:
        req = urllib.request.Request(photo_in["url"], headers={"User-Agent": "BaronageOfScotlandAssociation/1.0 (+https://www.baronage.com) publish_memoriam"})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                data = r.read(30_000_000)
        except Exception as e:
            raise RuntimeError(f"could not download the photo {photo_in['url']}: {e}")
    try:
        im = ImageOps.exif_transpose(Image.open(BytesIO(data))).convert("RGB")
    except Exception:
        raise RuntimeError(f"{photo_in['url']} is not an image")
    if photo_in.get("crop"):
        x0, y0, x1, y1 = photo_in["crop"]
        if x1 > im.width or y1 > im.height:
            raise RuntimeError(f"photo.crop {photo_in['crop']} runs past the picture ({im.width} x {im.height})")
        im = im.crop((x0, y0, x1, y1))
    if im.width > 720:
        im = im.resize((720, round(im.height * 720 / im.width)), Image.LANCZOS)
    PHOTO_DIR.mkdir(parents=True, exist_ok=True)
    webp, jpg = PHOTO_DIR / f"{slug}.webp", PHOTO_DIR / f"{slug}.jpg"
    im.save(webp, "WEBP", quality=82, method=6)
    im.save(jpg, "JPEG", quality=85, optimize=True, progressive=True)
    photo = {
        "src": f"/images/news/{slug}.webp",
        "width": im.width,
        "height": im.height,
        "alt": photo_in.get("alt") or name,
        **({"caption": photo_in["caption"]} if photo_in.get("caption") else {}),
        "credit": photo_in["credit"],
        "licence": photo_in["licence"],
        **({"licence_url": photo_in["licence_url"]} if photo_in.get("licence_url") else {}),
        "source_url": photo_in["source_url"],
    }
    return photo, [webp, jpg]


def load_json(file: str) -> dict:
    try:
        raw = json.loads(Path(file).expanduser().read_text(encoding="utf-8"))
    except FileNotFoundError:
        fail(f"no such file: {file}")
    except json.JSONDecodeError as e:
        fail(f"{file} is not valid JSON: {e}")
    if not isinstance(raw, dict):
        fail("the JSON file must hold one object")
    return raw


def main() -> None:
    ap = argparse.ArgumentParser(description="Publish an In Memoriam notice to News on www.baronage.com.")
    ap.add_argument("notice", help="path to the notice JSON file")
    ap.add_argument("--dry-run", action="store_true", help="check the notice and show what would happen; change nothing")
    a = ap.parse_args()
    raw = load_json(a.notice)
    publish(check_notice(raw), raw, a.dry_run)


def publish(post: dict, raw: dict, dry_run: bool) -> None:
    """Write, build, commit, push and wait for one checked post of any News category (see publish_news.py too)."""
    photo_in = post.pop("_photo_in", None)
    label = post.get("name") or post.get("holder") or post["title"]
    category_slug = CATEGORY_SLUGS[post["category"]]
    path = NEWS_DIR / f"{post['slug']}.json"
    rel = f"content/news/{path.name}"
    url = f"{SITE}/news/{category_slug}/{post['slug']}/"

    def committed() -> dict | None:
        """This notice as committed (HEAD), or None."""
        p = run(["git", "show", f"HEAD:{rel}"], check=False)
        return json.loads(p.stdout) if p.returncode == 0 else None

    def prepare(prev: dict | None) -> str:
        if prev is not None:
            if any(prev.get(k) != post.get(k) for k in ("roll_id", "category", "kind", "died", "event_date")):
                fail(f"{path.name} already holds another post (Roll id {prev.get('roll_id')}, {prev.get('died') or prev.get('event_date')}); give this one its own \"slug\"")
            if not raw.get("published"):
                post["published"] = prev["published"]  # a re-run keeps the first date
            if prev.get("published_at"):
                post["published_at"] = prev["published_at"]  # and the first time
        else:
            # the time orders posts published the same day: the newest first (owner 2026-10-26)
            post["published_at"] = datetime.now(ZoneInfo("Europe/London")).isoformat(timespec="seconds")
        return json.dumps(post, ensure_ascii=False, indent=2) + "\n"

    def same_photo(prev: dict | None) -> bool:
        old = (prev or {}).get("photo") or {}
        return bool(photo_in) and all(old.get(k) == photo_in.get(k) for k in ("credit", "licence", "source_url", "caption", "crop")) and old.get("url_in") == photo_in["url"]

    if dry_run:
        prev = committed()
        if photo_in and same_photo(prev):
            post["photo"] = prev["photo"]
        body = prepare(prev)
        state = "new" if prev is None else ("unchanged" if json.dumps(prev, ensure_ascii=False, indent=2) + "\n" == body else "update")
        if photo_in and not same_photo(prev):
            state += f", with a photo ({photo_in['credit']}, {photo_in['licence']}) to fetch"
        say(f"dry run, nothing written. {words(post['text'])} words; {state} post")
        say(f"would write {path}")
        say(f"would publish {url}")
        print(url)
        return

    # One run at a time on this checkout (other sessions share it).
    lock = open(REPO / ".git" / "publish_memoriam.lock", "w")
    try:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        fail("another publish_memoriam run is under way; try again in a few minutes")

    run(["git", "fetch", "-q", "origin", "main"])
    run(["git", "pull", "-q", "--rebase", "--autostash", "origin", "main"])
    # The News pages themselves must be on GitHub, or the notice could never go live.
    if run(["git", "cat-file", "-e", "origin/main:src/app/news/[category]/[slug]/page.tsx"], check=False).returncode != 0:
        fail("the News section is not live on www.baronage.com yet, so nothing was published; use --dry-run until it is")
    if f'"{post["category"]}"' not in run(["git", "show", "origin/main:src/lib/news.ts"], check=False).stdout:
        fail(f"the {post['category']} category is not live on www.baronage.com yet, so nothing was published; use --dry-run until it is")
    prev = committed()
    files = [path]
    if photo_in:
        old = (prev or {}).get("photo") or {}
        same = same_photo(prev)
        stored = [PHOTO_DIR / f"{post['slug']}.webp", PHOTO_DIR / f"{post['slug']}.jpg"]
        files += stored
    before = {f: (f.read_bytes() if f.exists() else None) for f in files}

    def restore() -> None:
        for f, b in before.items():
            if b is None:
                f.unlink(missing_ok=True)
            else:
                f.write_bytes(b)

    if photo_in:
        if same and all(f.exists() for f in stored):
            post["photo"] = old
        else:
            try:
                post["photo"], _ = fetch_photo(photo_in, post["slug"], label)
            except Exception as e:
                restore()
                fail(str(e))
            post["photo"]["url_in"] = photo_in["url"]  # so a re-run knows the photo is the same one
    body = prepare(prev)
    state = "new" if prev is None else ("unchanged" if json.dumps(prev, ensure_ascii=False, indent=2) + "\n" == body else "update")
    rels = [str(f.relative_to(REPO)) for f in files]

    if state != "unchanged":
        NEWS_DIR.mkdir(parents=True, exist_ok=True)
        path.write_text(body, encoding="utf-8")
        say(f"wrote {', '.join(rels)} ({state}); building")
        try:
            build()
            built = REPO / "out" / "news" / category_slug / post["slug"] / "index.html"
            if not built.exists() or post["title"] not in html.unescape(built.read_text(encoding="utf-8")):
                raise RuntimeError(f"the build did not produce {built.relative_to(REPO)} with the name on it")
        except Exception as e:  # leave the checkout as it was
            restore()
            fail(f"build failed, nothing committed: {mask(str(e))}")

        run(["git", "pull", "-q", "--rebase", "--autostash", "origin", "main"])
        run(["git", "add", *rels])
        verb = "updated" if state == "update" else "published"
        run(["git", "commit", "-q", "-o", *rels, "-m", f"News, {post['category']}: {label} ({verb} by the weekly scan)"])
    elif photo_in and not same:
        restore()  # the photo was fetched again but the notice is unchanged
    # Push whatever of this notice is not yet on GitHub (also mends a run that failed after committing).
    if run(["git", "rev-list", "--count", "origin/main..HEAD", "--", *rels]).stdout.strip() != "0":
        for attempt in (1, 2):
            p = run(["git", "push", "-q", "origin", "main"], check=False)
            if p.returncode == 0:
                break
            if attempt == 2:
                fail(f"push failed: {mask(p.stderr.strip())[-600:]}")
            run(["git", "pull", "-q", "--rebase", "--autostash", "origin", "main"])
        say("pushed; waiting for the page to go live (GitHub Pages takes about two minutes)")

    deadline = time.time() + LIVE_TIMEOUT_S
    while True:
        status, page = fetch(url)
        # the whole new wording, not only the title, so an edit anywhere in the text is not reported live from the old page
        shown = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", page)))
        paras = [re.sub(r"\s+", " ", p).strip() for p in post["text"].split("\n\n") if p.strip()]
        # a birth page shows whose child it is ("Son of …") in place of the Roll titles
        lines = [f"{'Daughter' if post.get('sex') == 'daughter' else 'Son'} of {post['holder']}"] if post.get("kind") == "birth" else post.get("titles", [])
        if status == 200 and post["title"] in html.unescape(page) and all(p in shown for p in paras) and all(t in shown for t in lines):
            break
        if time.time() > deadline:
            fail(f"{url} did not go live within {LIVE_TIMEOUT_S // 60} minutes (last answer {status}); the commit is on GitHub, so run this again later")
        time.sleep(15)

    try:
        req = urllib.request.Request(
            "https://api.indexnow.org/indexnow",
            data=json.dumps({"host": "www.baronage.com", **INDEXNOW, "urlList": [url, f"{SITE}/news/", f"{SITE}/news/{category_slug}/"]}).encode(),
            headers={"Content-Type": "application/json"},
        )
        urllib.request.urlopen(req, timeout=20)
    except Exception as e:
        say(f"IndexNow ping failed (not fatal): {e}")

    say(f"live ({state})")
    print(url)


if __name__ == "__main__":
    main()
