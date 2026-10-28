import { readingRoomPapers } from "@/generated/reading-room";
import { SITE_URL } from "@/lib/site";

/**
 * The Baron's Course: a numbered reading series through the Reading Room (owner 2026-10-23, "approved, yes this is
 * good"; order and lesson lines from the papers chat, word for word). Called "Essential Reading" for an afternoon,
 * then "call it The Baron's Course" (owner, same day); /essential-reading/ forwards here. Renamed Scottish Baronial
 * Studies on 28 Oct 2026 (owner: a less derogatory name), but the menu still says The Baron's Course ("as it's clear
 * it's a course then") and the address stays /the-barons-course/. This list is the one source of truth for the
 * course panel, the course page, the band and the previous/next links on each paper.
 *
 * A step whose paper is not yet in the Reading Room is skipped, and the numbering and the count follow what is
 * published. Server-side only: it reads the generated papers, bodies included, so
 * client components get the light `CourseStep` objects below and never this module.
 */
export const COURSE_PARTS = ["The words", "The rank", "Recognition", "In public life", "The Roll", "In the deed"] as const;

const STEPS: { part: number; slug: string; lesson: string }[] = [
  // Part I. The words
  { part: 1, slug: "lairds-lords-and-barons", lesson: "What a laird, a lord and a baron were, and what a territorial designation is." },
  {
    part: 1,
    slug: "the-two-styles-of-a-scottish-baron",
    lesson: "The title and the name are two different things, and “of X” needs the Lord Lyon’s recognition.",
  },
  { part: 1, slug: "younger-of-and-master-of", lesson: "How an heir is styled, and why “Younger of” is the Scots form." },
  // Part II. The rank
  {
    part: 2,
    slug: "untitled-in-1930-titled-in-1943",
    lesson: "The Lyon Court’s own finding of 1943: the minor barons are a titled nobility.",
  },
  { part: 2, slug: "is-a-scottish-baron-a-commoner", lesson: "The noblesse of Scotland, and where a baron stands in it." },
  {
    part: 2,
    slug: "the-precedence-of-a-scottish-baron",
    lesson: "After knights and before esquires: the baron’s place, “never ceded”.",
  },
  {
    part: 2,
    slug: "how-the-baronets-pleaded-the-barons-nobility",
    lesson: "The baronets themselves pleaded the barons’ nobility to the Crown.",
  },
  // Part III. Recognition
  { part: 3, slug: "esslemont-petition-1934", lesson: "The chapeau, and what the Lyon Court meant by granting it." },
  {
    part: 3,
    slug: "barons-in-the-lyon-courts-own-words",
    lesson: "Lords Lyon who signed as barons, and the instruments that say “Baron of X”.",
  },
  { part: 3, slug: "lord-lyon-since-2004", lesson: "Section 63 and the appointed day: the dignity kept, the land let go." },
  // Part IV. In public life ("and in law" dropped once the deed paper moved to Part VI: papers chat, 23 Oct)
  {
    part: 4,
    slug: "barons-in-the-house-of-commons",
    lesson: "How the title fares in Parliament, councils and the honours list.",
  },
  // Part V. The Roll
  {
    part: 5,
    slug: "official-roll-of-the-baronetage-1910",
    lesson: "Why a dignity needs a roll, and why a roll needs a pledge.",
  },
  // Part VI. In the deed: the last paper (owner 2026-10-23, via the papers chat: "add to last paper of course"); it
  // ends, as the course does, on the Roll and the Pledge.
  {
    part: 6,
    slug: "how-a-scottish-baron-is-named-in-a-legal-document",
    lesson: "How to design a baron in a deed, and why it never says “commonly called”.",
  },
];

/**
 * Read first (owner 2026-10-24, via the papers chat: "shouldn't baronies explained be read first in the baron's
 * course?", then "yes least it should be a pre-read of the course like presection"): one unnumbered step before Part I.
 * It is outside the count, the seal and the certificate; its tick is kept in the same store under its slug. Lesson line
 * from the papers chat, final copy. Reading time: about 8,200 readable words on 24 Oct 2026 at the papers' 230 a minute.
 */
export const COURSE_PREREAD = {
  slug: "scottish-baronies-explained",
  href: "/scottish-baronies-explained/",
  title: "Scottish Baronies, Explained",
  lesson: "The words, the rank and the questions every holder asks: the primer the papers build on.",
  readingTime: "36 min",
};
export type CoursePreread = typeof COURSE_PREREAD;

/** A published step, light enough to hand to client components. */
export type CourseStep = {
  n: number; // 1-based, counting published steps only
  part: number; // 1..6
  slug: string;
  title: string;
  lesson: string;
  readingTime: string; // e.g. "9 min"
};

const published = new Map(readingRoomPapers.map((p) => [p.slug, p]));

export const courseSteps: CourseStep[] = STEPS.filter((s) => published.has(s.slug)).map((s, i) => {
  const p = published.get(s.slug)!;
  return { n: i + 1, part: s.part, slug: s.slug, title: p.title, lesson: s.lesson, readingTime: p.readingTime };
});

export const COURSE_PATH = "/the-barons-course/";
export const COURSE_NAME = "Scottish Baronial Studies";
/** The menu's name for it, also the course page's eyebrow so the page is plainly the one the menu named. */
export const COURSE_MENU_NAME = "The Baron’s Course";
/** The link-preview card (app/og/course), so a shared link shows the course, not the site's general picture. */
export const COURSE_OG_IMAGE = {
  url: `${SITE_URL}/og/course/the-barons-course.png`,
  width: 1200,
  height: 630,
  alt: "Scottish Baronial Studies: papers from the Reading Room of the Baronage of Scotland Association",
};

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
  "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
/** 12 -> "twelve" (to twenty; figures beyond). */
export const numberWord = (n: number) => WORDS[n] ?? String(n);

/** "Twelve papers, read in order, give…": the count follows the published steps. */
export const courseStandfirst = () => {
  const w = numberWord(courseSteps.length);
  return `${w[0].toUpperCase()}${w.slice(1)} papers, read in order, give a baron or an heir the words, the rank, the recognition and the evidence behind the title.`;
};

/** The step for a paper, with its neighbours, or null if the paper is not in the course. */
export function courseStepFor(slug: string) {
  const i = courseSteps.findIndex((s) => s.slug === slug);
  if (i < 0) return null;
  return {
    step: courseSteps[i],
    prev: courseSteps[i - 1] ?? null,
    next: courseSteps[i + 1] ?? null,
    total: courseSteps.length,
    // Paper 1 points back to the pre-read
    preread: i === 0 ? COURSE_PREREAD : null,
  };
}
