#!/usr/bin/env python3
"""
The Baron's Course booklet as a PDF to download or attach to an email (owner 2026-10-23: "can then be emailed out
also"). Run on this Mac after `npm run build`, whenever a course paper changes, then build again and commit the PDF:

    python3 scripts/make-booklet-pdf.py

It serves out/ on a spare port, prints /the-barons-course/print/ with Chrome in a fresh profile (no subscriber key,
so subscriber passages are left out, as on the public page), shrinks the pictures (Chrome stores them uncompressed:
30 MB) and writes public/the-barons-course/The-Barons-Course-Baronage-of-Scotland-Association.pdf. Needs pypdf and
Pillow (both on this Mac). Not run on GitHub.
"""
import functools
import http.server
import os
import shutil
import subprocess
import tempfile
import threading

import pypdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "out")
DEST = os.path.join(ROOT, "public", "the-barons-course", "The-Barons-Course-Baronage-of-Scotland-Association.pdf")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT = 4419


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    if not os.path.exists(os.path.join(OUT, "the-barons-course", "print", "index.html")):
        raise SystemExit("Build the site first (npm run build): out/the-barons-course/print/ is missing.")
    server = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), functools.partial(Quiet, directory=OUT))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    work = tempfile.mkdtemp(prefix="booklet-")
    raw = os.path.join(work, "raw.pdf")
    try:
        subprocess.run(
            [CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--timeout=20000",
             f"--user-data-dir={os.path.join(work, 'profile')}", f"--print-to-pdf={raw}",
             f"http://127.0.0.1:{PORT}/the-barons-course/print/"],
            check=True, capture_output=True,
        )
    finally:
        server.shutdown()

    writer = pypdf.PdfWriter(clone_from=pypdf.PdfReader(raw))
    for page in writer.pages:
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
    writer.add_metadata({"/Title": "Scottish Baronial Studies", "/Author": "Baronage of Scotland Association"})
    os.makedirs(os.path.dirname(DEST), exist_ok=True)
    with open(DEST, "wb") as f:
        writer.write(f)
    shutil.rmtree(work, ignore_errors=True)
    print(f"{DEST}: {len(writer.pages)} pages, {os.path.getsize(DEST) / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
