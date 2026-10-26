#!/usr/bin/env python3
"""
Publish one News post on www.baronage.com, unattended, for the weekly scan: an In Memoriam notice or a Congratulations
post (owner 2026-10-26: "also let's have it auto do marriages announcing the new baroness for example and children anew
younger of or master of as congratulation posts").

    python3 /Users/ac/Projects/baronage.com/www/scripts/publish_news.py /path/to/post.json
    python3 /Users/ac/Projects/baronage.com/www/scripts/publish_news.py /path/to/post.json --dry-run

"category" picks the kind of post: "In Memoriam" (the default; the fields and rules of publish_memoriam.py) or
"Congratulations", with these fields (UTF-8 JSON, one object):
    category          "Congratulations"
    kind              "marriage" or "birth"
    roll_id           Roll entry id (number)
    holder            the holder as on the Roll: "John Smith, Baron of Inverness"
    titles            titles as on the Roll, shown under the heading: ["The Baron of Inverness"] (or one string);
                      on a birth post the parent's
    date              the wedding or the birth, ISO: "2026-10-03", or "2026-07" when the sources give only the month
    text              60 to 100 words, plain text, paragraphs separated by a blank line, no links
    announcement_url  the family's own announcement (required; linked, never copied)
    roll_url          the Roll entry
  marriage:  spouse   "Jane Brown"
             place    optional: the church or venue, never a home address
             photo    optional, as for In Memoriam: a free-licence photograph with credit (never of a child)
  birth:     child    "Alexander James Smith"
             sex      "son" or "daughter"
             style    optional: the heir's style ONLY as the announcement gives it: "Younger of Inverness",
                      "Master of Lindsay"; a daughter has none unless the announcement gives one
             photo    optional: of the parents ONLY, never the child, with an alt naming who is shown
  optional:  source_urls, announcement_label, slug, title, published
  photo:     {url, credit, licence, licence_url, source_url, alt}, plus optional "caption" (who and when, shown
             before the credit) and "crop" [left, top, right, bottom] in pixels of the original

Refused, with exit 1 and a plain message: a missing announcement_url; more than 100 or fewer than 60 words; anything
that looks like a home address (postcode, house number and street, flat); a photo on a birth post without an alt; links or markup in
the text; "feudal"; "substantive"; the Lord Lyon "recognising" a style; the word "title" in a birth post (a style is
never called a title). Then as publish_memoriam.py: writes content/news/<slug>.json, builds, commits that file (and a
photo), pushes, waits for the page to answer 200, pings IndexNow, prints the URL as the last line on stdout. Safe to
run twice.
"""
import argparse
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import publish_memoriam as pm  # noqa: E402  (shared checks and the publishing steps)

MIN_WORDS, MAX_WORDS = 60, 100
EVENT_DATE = re.compile(r"^\d{4}-\d{2}(-\d{2})?$")  # the day, or only the month when the sources go no further
POSTCODE = re.compile(r"\b(GIR ?0AA|[A-PR-UWYZ][A-HK-Y]?\d[A-Z\d]? ?\d[ABD-HJLNP-UW-Z]{2})\b")
STREET = re.compile(
    r"\b\d{1,4}[A-Za-z]?,? (?:[A-Z][a-z']+ ){1,3}(Street|St|Road|Rd|Avenue|Ave|Lane|Drive|Crescent|Place|Gardens|Terrace|"
    r"Court|Square|Close|Way|Row|Grove|Mews|Walk|Wynd|Brae|Loan|Gate)\b"
)
FLAT = re.compile(r"\b(Flat|Apartment|Apt\.?)\s+\d", re.I)
ALWAYS_BANNED = [
    (r"\bfeudal\b", '"feudal", which never appears in the Association\'s own voice'),
    (r"\bsubstantive\b", '"substantive"'),
    (r"\bLyon\b[^.]{0,80}\brecogni[sz]", "the Lord Lyon \"recognising\" a style"),
]


def check_congratulations(d: dict) -> dict:
    kind = str(d.get("kind", "")).strip().lower()
    if kind not in ("marriage", "birth"):
        pm.fail('kind must be "marriage" or "birth"')
    if not str(d.get("announcement_url", "")).strip():
        pm.fail("missing announcement_url: a Congratulations post always links to the family's own announcement")
    required = ["roll_id", "holder", "titles", "date", "text", "roll_url"] + (["spouse"] if kind == "marriage" else ["child", "sex"])
    missing = [k for k in required if d.get(k) in (None, "", [])]
    if missing:
        pm.fail(f"missing field(s): {', '.join(missing)}")
    try:
        roll_id = int(d["roll_id"])
    except (TypeError, ValueError):
        pm.fail(f"roll_id must be a number, got {d['roll_id']!r}")
    if not EVENT_DATE.match(str(d["date"])):
        pm.fail(f"date must be an ISO date like 2026-10-03, or 2026-10 when the sources give only the month, got {d['date']!r}")
    if kind == "birth" and str(d["sex"]).strip().lower() not in ("son", "daughter"):
        pm.fail('sex must be "son" or "daughter"')
    # a birth post may show the parents (owner 2026-10-26: "put a photo of the happy couple"), never the child
    if kind == "birth" and d.get("photo") and not str((d["photo"] or {}).get("alt", "")).strip():
        pm.fail("a photo on a birth post needs an alt naming the parent(s) shown: never a photograph of the child")

    text = "\n\n".join(p.strip() for p in re.split(r"\n\s*\n", str(d["text"]).replace("\r\n", "\n")) if p.strip())
    n = pm.words(text)
    if n > MAX_WORDS:
        pm.fail(f"the post is {n} words; the most is {MAX_WORDS}")
    if n < MIN_WORDS:
        pm.fail(f"the post is {n} words; the least is {MIN_WORDS}")
    if re.search(r"https?://|www\.|\]\(|<[a-z/]", text, re.I):
        pm.fail("the text must be plain: no links, web addresses or markup (links go in the URL fields)")
    for pattern, label in ALWAYS_BANNED:
        if re.search(pattern, text, re.I):
            pm.fail(f"the text uses {label}")
    if kind == "birth" and re.search(r"\btitle", text, re.I):
        pm.fail('the word "title" is not used in a birth post: an heir\'s style is never called a title')
    place = str(d.get("place", "")).strip()
    for field, value in (("text", text), ("place", place)):
        for rx in (POSTCODE, STREET, FLAT):
            m = rx.search(value)
            if m:
                pm.fail(f"the {field} seems to give a home address ({m.group(0)!r}); posts never do")

    def url(v, field: str) -> str:
        if not re.match(r"^https?://\S+$", str(v)):
            pm.fail(f"{field} must be a web address, got {v!r}")
        return str(v)

    sources = []
    for s in d.get("source_urls") or []:
        if isinstance(s, dict):
            sources.append({"label": str(s.get("label", "")).strip() or url(s.get("url", ""), "source_urls"), "url": url(s.get("url", ""), "source_urls")})
        else:
            sources.append(url(s, "source_urls"))

    # a free-licence photo, or the holder's own portrait on the Roll (on a birth post, of the parents only)
    photo_in = pm.check_photo(d["photo"], d["roll_url"]) if d.get("photo") else None

    holder = str(d["holder"]).strip()
    titles = d["titles"] if isinstance(d["titles"], list) else [d["titles"]]
    style = str(d.get("style", "")).strip()
    if kind == "marriage":
        # "John Smith, Baron of Inverness, and Miss Jane Brown": the comma keeps the barony with the holder alone
        default_title = f"Congratulations: {holder}{',' if ',' in holder else ''} and {str(d['spouse']).strip()}"
    else:
        default_title = f"Congratulations: the birth of {str(d['child']).strip()}" + (f", {style}" if style else "")
    title = str(d.get("title") or default_title).strip()
    slug = pm.slugify(d.get("slug") or f"{title.removeprefix('Congratulations:')} {str(d['date'])[:4]}")
    post = {
        "slug": slug,
        "category": "Congratulations",
        "published": str(d.get("published") or pm.datetime.now(pm.ZoneInfo("Europe/London")).date().isoformat()),
        "title": title,
        "kind": kind,
        "roll_id": roll_id,
        "holder": holder,
        "titles": [str(t).strip() for t in titles if str(t).strip()],
        "event_date": d["date"],
        **({"place": place} if kind == "marriage" and place else {}),
        **({"spouse": str(d["spouse"]).strip()} if kind == "marriage" else {}),
        **({"child": str(d["child"]).strip(), "sex": str(d["sex"]).strip().lower()} if kind == "birth" else {}),
        **({"style": style} if kind == "birth" and style else {}),
        "text": text,
        "family_notice_url": url(d["announcement_url"], "announcement_url"),
        **({"family_notice_label": str(d["announcement_label"]).strip()} if d.get("announcement_label") else {}),
        "roll_url": url(d["roll_url"], "roll_url"),
        "source_urls": sources,
    }
    if photo_in:
        post["_photo_in"] = photo_in
    return post


def main() -> None:
    ap = argparse.ArgumentParser(description="Publish a News post (In Memoriam or Congratulations) on www.baronage.com.")
    ap.add_argument("post", help="path to the post JSON file")
    ap.add_argument("--dry-run", action="store_true", help="check the post and show what would happen; change nothing")
    a = ap.parse_args()
    raw = pm.load_json(a.post)
    category = str(raw.get("category") or "In Memoriam").strip()
    if category == "In Memoriam":
        post = pm.check_notice(raw)
    elif category == "Congratulations":
        post = check_congratulations(raw)
    else:
        pm.fail(f'category must be "In Memoriam" or "Congratulations", got {category!r}')
    pm.publish(post, raw, a.dry_run)


if __name__ == "__main__":
    main()
