import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * News (owner 2026-10-26: "maybe on new site section should be news … their website doesn't just cover deaths"): dated
 * posts, each in one category. "In Memoriam" is the first category; its notices are written and published by the weekly
 * "roll-obituary-scan" task through scripts/publish_memoriam.py, which writes one JSON file per post into content/news/.
 * Server-side only: read at build time.
 */

/** Categories, in the order the index shows them; a post's category must be one of these. */
export const NEWS_CATEGORIES = [{ name: "In Memoriam", slug: "in-memoriam" }] as const;
export type NewsCategoryName = (typeof NEWS_CATEGORIES)[number]["name"];

type SourceLink = string | { label: string; url: string };

/**
 * A photograph we are free to use (owner 2026-10-26: "a picture is handy … pls add"): a free licence (CC BY, CC BY-SA,
 * CC0, public domain, Open Government Licence) or written permission, always credited under it. Stored on our own site.
 */
export type NewsPhoto = {
  src: string; // "/images/news/<slug>.webp"
  width: number;
  height: number;
  alt: string;
  credit: string; // "Chris McAndrew / UK Parliament"
  licence: string; // "CC BY 3.0"
  licence_url?: string;
  source_url: string; // where the licence can be checked
};

/** One post, as stored in content/news/<slug>.json. In Memoriam posts carry the person's fields as well. */
export type NewsPost = {
  slug: string;
  category: NewsCategoryName;
  /** ISO date the post went up */
  published: string;
  title: string;
  /** Plain text; paragraphs separated by a blank line. No links or markup. */
  text: string;
  // In Memoriam
  roll_id?: number;
  name?: string;
  titles?: string[];
  born?: string;
  died?: string;
  place?: string;
  family_notice_url?: string;
  family_notice_label?: string;
  roll_url?: string;
  source_urls?: SourceLink[];
  photo?: NewsPhoto;
};

const DIR = join(process.cwd(), "content", "news");

function load(): NewsPost[] {
  let files: string[] = [];
  try {
    files = readdirSync(DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  return files
    .map((f) => JSON.parse(readFileSync(join(DIR, f), "utf8")) as NewsPost)
    .sort((a, b) => b.published.localeCompare(a.published) || (b.died ?? "").localeCompare(a.died ?? ""));
}

export const newsPosts: NewsPost[] = load();

export const categorySlug = (name: string) => NEWS_CATEGORIES.find((c) => c.name === name)?.slug ?? "news";
export const categoryBySlug = (slug: string) => NEWS_CATEGORIES.find((c) => c.slug === slug);
export const postPath = (p: NewsPost) => `/news/${categorySlug(p.category)}/${p.slug}/`;

/** "2026-10-09" -> "9 October 2026" (UTC, so the day never shifts with the build machine's zone). */
export function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export const paragraphs = (text: string) => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

/** The opening sentence, for the index and the page description. */
export function excerpt(text: string, max = 200) {
  const first = paragraphs(text)[0] ?? "";
  return first.length <= max ? first : `${first.slice(0, first.lastIndexOf(" ", max))}…`;
}

const KNOWN_SOURCES: [RegExp, string][] = [
  [/telegraph\.co\.uk/, "The Telegraph"],
  [/yahoo\.com/, "The Telegraph’s obituary, as syndicated by Yahoo News"],
  [/parliament\.uk/, "UK Parliament, members’ record"],
  [/thegazette\.co\.uk/, "The Gazette"],
  [/thetimes\.(co\.uk|com)/, "The Times"],
  [/scotsman\.com/, "The Scotsman"],
  [/heraldscotland\.com/, "The Herald"],
  [/court-lyon\.gov\.uk|courtofthelordlyon/, "Court of the Lord Lyon"],
];

/** A source as a link: its own label if given, else a known publisher's name, else its web address. */
export function sourceLink(s: SourceLink) {
  if (typeof s !== "string") return s;
  const known = KNOWN_SOURCES.find(([re]) => re.test(s));
  return { url: s, label: known ? known[1] : s.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") };
}
