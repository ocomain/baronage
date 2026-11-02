import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { NewsPost } from "./news";

/**
 * A short version for a notice's share card, taken from everything the card is drawn from: the post, its photograph
 * file and the card's own design. It is added to the card's address, so the address changes whenever the card does
 * and Facebook, WhatsApp, X and LinkedIn fetch the new card instead of the one they first saw (owner 2026-11-02,
 * "pls fix sharing meta image", after a notice's photo and heading changed on the day it went up). Read at build time.
 */
export function newsOgVersion(post: NewsPost): string {
  const hash = createHash("sha1").update(JSON.stringify(post));
  const read = (...parts: string[]) => {
    try {
      hash.update(readFileSync(path.join(process.cwd(), ...parts)));
    } catch {
      // a missing file changes nothing here; the card itself reports it
    }
  };
  if (post.photo) read("public", post.photo.src.replace(/^\//, "").replace(/\.webp$/, ".jpg"));
  read("src", "lib", "og-news.tsx");
  return hash.digest("hex").slice(0, 8);
}
