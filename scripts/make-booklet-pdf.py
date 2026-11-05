#!/usr/bin/env python3
"""
The Baron's Course booklet as a PDF to download or attach to an email (owner 2026-10-23: "can then be emailed out
also"). Run on this Mac after `npm run build`, whenever a course paper changes, then build again and commit the PDF:

    python3 scripts/make-booklet-pdf.py                  (the course)
    python3 scripts/make-booklet-pdf.py proper-address   (the Proper Address guide, owner 2026-11-01)

It serves out/ on a spare port, prints /the-barons-course/print/ with Chrome in a fresh profile (no subscriber key,
so subscriber passages are left out, as on the public page), shrinks the pictures (Chrome stores them uncompressed:
30 MB) and writes public/the-barons-course/The-Barons-Course-Baronage-of-Scotland-Association.pdf. Needs pypdf and
Pillow (both on this Mac). Not run on GitHub.

The course PDF also prints Scottish Baronies, Explained in full as the Read first, before Paper 1, and the Proper
Address guide as an appendix (owner 2026-11-05). Each is printed from its own page here and put in place; the
#fragments are the pages' print modes (#booklet-pdf, #in-booklet in globals.css). So remake the course PDF after an
edit to either page too.
"""
import functools
import http.server
import os
import shutil
import subprocess
import sys
import tempfile
import threading

import pypdf
from PIL import Image
from pypdf.generic import NameObject, TextStringObject

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "out")
BOOKS = {
    "course": {
        "page": "the-barons-course/print/#booklet-pdf",
        # (page, marker): printed and put in before the first page whose text has the marker
        "insert": [("scottish-baronies-explained/#in-booklet", "PAPER 1 OF")],
        "append": ["proper-address/"],
        "dest": ("the-barons-course", "The-Barons-Course-Baronage-of-Scotland-Association.pdf"),
        "meta": {"/Title": "Scottish Baronial Studies"},
    },
    "proper-address": {
        "page": "proper-address/",
        "dest": ("proper-address", "Proper-Address-for-Scottish-Barons-Forms-of-Address-and-Precedence.pdf"),
        "meta": {
            "/Title": "Proper Address for Scottish Barons: The Definitive Guide to Forms of Address & Precedence",
            "/Subject": "Forms of address, salutation and precedence for Scottish barons and baronesses",
            "/Keywords": "Scottish baron, forms of address, proper address, precedence, The Much Honoured, baroness",
        },
    },
}
SITE = "https://www.baronage.com"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT = 4419


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    book = BOOKS[sys.argv[1] if len(sys.argv) > 1 else "course"]
    dest = os.path.join(ROOT, "public", *book["dest"])
    inserts, appends = book.get("insert", []), book.get("append", [])
    for page in [book["page"], *(p for p, _ in inserts), *appends]:
        if not os.path.exists(os.path.join(OUT, page.split("#")[0], "index.html")):
            raise SystemExit(f"Build the site first (npm run build): out/{page.split('#')[0]} is missing.")
    server = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), functools.partial(Quiet, directory=OUT))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    work = tempfile.mkdtemp(prefix="booklet-")

    def print_page(page, name):
        raw = os.path.join(work, f"{name}.pdf")
        subprocess.run(
            [CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--timeout=20000",
             f"--user-data-dir={os.path.join(work, 'profile-' + name)}", f"--print-to-pdf={raw}",
             f"http://127.0.0.1:{PORT}/{page}"],
            check=True, capture_output=True,
        )
        return raw

    try:
        raw = print_page(book["page"], "main")
        extra_in = [(print_page(p, f"in{i}"), marker) for i, (p, marker) in enumerate(inserts)]
        extra_end = [print_page(p, f"end{i}") for i, p in enumerate(appends)]
    finally:
        server.shutdown()

    writer = pypdf.PdfWriter(clone_from=pypdf.PdfReader(raw))
    for path, marker in extra_in:
        at = next((i for i, p in enumerate(writer.pages) if marker in (p.extract_text() or "")), None)
        if at is None:
            raise SystemExit(f"No page with {marker!r} to put {path} before.")
        writer.merge(at, pypdf.PdfReader(path))
    for path in extra_end:
        writer.append(pypdf.PdfReader(path))
    for page in writer.pages:
        # Links to the site's own pages were printed against the local server.
        for annot in page.get("/Annots") or []:
            action = annot.get_object().get("/A")
            action = action.get_object() if action is not None else None
            if action is not None and str(action.get("/URI", "")).startswith(f"http://127.0.0.1:{PORT}"):
                action[NameObject("/URI")] = TextStringObject(SITE + str(action["/URI"])[len(f"http://127.0.0.1:{PORT}"):])
        for img in page.images:
            im = img.image
            if im.mode in ("RGBA", "LA", "P"):
                im = im.convert("RGBA")
                flat = Image.new("RGB", im.size, (255, 255, 255))
                flat.paste(im, mask=im.split()[-1])
                im = flat
            else:
                im = im.convert("RGB")
            im.thumbnail((1400, 1400))
            img.replace(im, quality=70)
        page.compress_content_streams()
    writer.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
    writer.add_metadata({**book["meta"], "/Author": "Baronage of Scotland Association"})
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "wb") as f:
        writer.write(f)
    shutil.rmtree(work, ignore_errors=True)
    print(f"{dest}: {len(writer.pages)} pages, {os.path.getsize(dest) / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
