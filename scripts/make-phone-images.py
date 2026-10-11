#!/usr/bin/env python3
"""Phone-sized twins of the hero and chapter images.

For each source below writes <name>-960.webp beside it: at most WIDTH pixels wide, WebP quality QUALITY.
PageHero, HeroHome and HistoryChapters serve the twin to screens up to 640px wide (see src/lib/heroImage.ts).
Run after adding or replacing a hero image:  python3 scripts/make-phone-images.py   (needs Pillow)
"""
from pathlib import Path
from PIL import Image

PUBLIC = Path(__file__).resolve().parent.parent / "public"
QUALITY = 72
# source -> widest the twin may be (the homepage poster fills a taller screen, so it keeps more pixels)
SOURCES = {
    "images/great-hall.webp": 960,
    "images/charter-seal.webp": 960,
    "images/scribe.webp": 960,
    "images/hero-loch-castle.webp": 960,
    "images/glen-mist.webp": 960,
    "images/knight-helm.webp": 960,
    "images/cathedral.webp": 960,
    "images/castle-eilean-donan.webp": 960,
    "images/king-david.webp": 960,
    "images/craighall.webp": 960,
    "images/guide/robe-of-state.webp": 960,
    "images/guide/mantle-five-buttons.webp": 960,
    "images/guide/vault-armour-cap.webp": 960,
    "images/guide/supporters-in-stone.webp": 960,
    "images/guide/register-room.webp": 960,
    "images/guide/court-chair.webp": 960,
    "images/guide/court-commission.webp": 960,
    "images/guide/court-book.webp": 960,
    "images/guide/court-horn-wand.webp": 960,
    "images/guide/court-benches.webp": 960,
    "images/guide/court-barn.webp": 960,
    "images/guide/court-stocks.webp": 960,
    "images/guide/court-ceremony.webp": 960,
    "images/guide/arms-painter-desk.webp": 960,
    "images/guide/arms-register-folios.webp": 960,
    "images/guide/arms-tilting-helm.webp": 960,
    "images/guide/arms-flagpoles.webp": 960,
    "images/guide/arms-banner-tower.webp": 960,
    "images/guide/arms-standard-moor.webp": 960,
    "images/guide/arms-saltire-glen.webp": 960,
    "videos/pledge-scribe-poster.webp": 960,
    "videos/roll-portal-poster.webp": 960,
    "videos/hero-poster.webp": 1280,
}

for rel, width in SOURCES.items():
    src = PUBLIC / rel
    out = src.with_name(src.stem + "-960.webp")
    im = Image.open(src).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(out, "WEBP", quality=QUALITY, method=6)
    print(f"{rel}: {src.stat().st_size // 1024} KB -> {out.name} {im.width}x{im.height} {out.stat().st_size // 1024} KB")
