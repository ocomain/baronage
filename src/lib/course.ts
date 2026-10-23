import { readingRoomPapers } from "@/generated/reading-room";

/**
 * The Baron's Course: a numbered reading series through the Reading Room (owner 2026-10-23, "approved, yes this is
 * good"; order and lesson lines from the papers chat, word for word). This list is the one source of truth for the
 * course panel, the course page, the band and the previous/next links on each paper.
 *
 * A step whose paper is not yet in the Reading Room is skipped, and the numbering and the count follow what is
 * published (step 12 waits for its paper). Server-side only: it reads the generated papers, bodies included, so
 * client components get the light `CourseStep` objects below and never this module.
 */
export const COURSE_PARTS = ["The words", "The rank", "Recognition", "In public life and in law", "The Roll"] as const;

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
  // Part IV. In public life and in law
  {
    part: 4,
    slug: "barons-in-the-house-of-commons",
    lesson: "How the title fares in Parliament, councils and the honours list.",
  },
  {
    part: 4,
    slug: "how-a-scottish-baron-is-named-in-a-legal-document", // shown once the paper is published
    lesson: "How to design a baron in a deed, and why it never says “commonly called”.",
  },
  // Part V. The Roll
  {
    part: 5,
    slug: "official-roll-of-the-baronetage-1910",
    lesson: "Why a dignity needs a roll, and why a roll needs a pledge.",
  },
];

/** A published step, light enough to hand to client components. */
export type CourseStep = {
  n: number; // 1-based, counting published steps only
  part: number; // 1..5
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
  return { step: courseSteps[i], prev: courseSteps[i - 1] ?? null, next: courseSteps[i + 1] ?? null, total: courseSteps.length };
}
