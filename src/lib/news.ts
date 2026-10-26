import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * News (owner 2026-10-26: "maybe on new site section should be news … their website doesn't just cover deaths"): dated
 * posts, each in one category. "In Memoriam" is the first category; its notices are written and published by the weekly
 * "roll-obituary-scan" task through scripts/publish_memoriam.py, which writes one JSON file per post into content/news/.
 * Server-side only: read at build time.
 */

/** Categories, in the order the index shows them; a post's category must be one of these. */
export const NEWS_CATEGORIES = [
  { name: "In Memoriam", slug: "in-memoriam" },
  // owner 2026-10-26: "also let's have it auto do marriages announcing the new baroness … and children anew younger of or
  // master of as congratulation posts"
  { name: "Congratulations", slug: "congratulations" },
] as const;
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
  // Congratulations
  kind?: "marriage" | "birth";
  /** the wedding or the birth, ISO */
  event_date?: string;
  /** the holder as on the Roll, "John Smith, Baron of Inverness" */
  holder?: string;
  spouse?: string;
  child?: string;
  sex?: "son" | "daughter";
  /** the heir's style, only as the family's announcement gives it: "Younger of Inverness", "Master of Lindsay" */
  style?: string;
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

/**
 * "2026-10-09" -> "9 October 2026"; a date known only to the month or year stays so: "2026-06" -> "June 2026",
 * "1955" -> "1955" (UTC, so the day never shifts with the build machine's zone).
 */
export function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!m) return String(y);
  const opts: Intl.DateTimeFormatOptions = { month: "long", year: "numeric", timeZone: "UTC", ...(d ? { day: "numeric" } : {}) };
  return new Date(Date.UTC(y, m - 1, d || 1)).toLocaleDateString("en-GB", opts);
}

/** The life dates of an In Memoriam post: "19 November 1955 – 9 October 2026", or "Died June 2026" when the birth is unknown. */
export function lifeLine(p: NewsPost) {
  if (!p.died) return null;
  return p.born ? `${longDate(p.born)} – ${longDate(p.died)}` : `Died ${longDate(p.died)}`;
}

/** "Married on 3 October 2026, at St Giles’ Cathedral" / "Born on 3 October 2026", for a Congratulations post. */
export function eventLine(p: NewsPost) {
  if (!p.kind || !p.event_date) return null;
  return p.kind === "marriage"
    ? `Married on ${longDate(p.event_date)}${p.place ? `, at ${p.place}` : ""}`
    : `Born on ${longDate(p.event_date)}`;
}

/** The small line under the heading: the titles as on the Roll, or, for a birth, whose son or daughter the child is. */
export function titlesLine(p: NewsPost) {
  if (p.kind === "birth" && p.holder) return `${p.sex === "daughter" ? "Daughter" : "Son"} of ${p.holder}`;
  return p.titles?.length ? p.titles.join(" · ") : null;
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
