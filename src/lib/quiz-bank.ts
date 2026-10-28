/**
 * The quiz bank (content/quiz/quizzes.json), checked against the Reading Room at build time. The build stops if a
 * question breaks a rule, so nothing reaches the site that a reader cannot check in a published paper:
 *   - five questions, four different options, one right answer;
 *   - the paper exists and is not a subscriber-only paper;
 *   - the section the link points to exists in the paper;
 *   - the answer line appears in the paper word for word.
 */

import bank from "../../content/quiz/quizzes.json";
import { readingRoomPapers } from "@/generated/reading-room";
import { OPTIONS_PER_QUESTION, QUESTIONS_PER_QUIZ, type Quiz } from "./quiz";

type RawQuestion = { q: string; options: string[]; answer: number; why: string; paper: string; anchor: string };
type RawQuiz = { no: number; week: string; questions: RawQuestion[] };

/** A paper's words without tags, footnote markers or entities, for the word-for-word check. */
function plainText(html: string): string {
  return html
    .replace(/<sup class="fnref"[\s\S]*?<\/sup>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ");
}
const squash = (s: string) => s.replace(/\s+/g, " ").trim();

function check(raw: RawQuiz): Quiz {
  const where = `Quiz No. ${raw.no}`;
  const fail = (msg: string): never => {
    throw new Error(`${where}: ${msg}`);
  };
  if (!Number.isInteger(raw.no) || raw.no < 1) fail("needs a number");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw.week) || new Date(`${raw.week}T12:00:00Z`).getUTCDay() !== 1) fail(`week ${raw.week} is not a Monday`);
  if (raw.questions?.length !== QUESTIONS_PER_QUIZ) fail(`needs ${QUESTIONS_PER_QUIZ} questions`);
  return {
    no: raw.no,
    week: raw.week,
    questions: raw.questions.map((q, i) => {
      const at = `question ${i + 1}`;
      if (!q.q?.trim()) fail(`${at} has no question`);
      if (q.options?.length !== OPTIONS_PER_QUESTION || new Set(q.options).size !== OPTIONS_PER_QUESTION)
        fail(`${at} needs ${OPTIONS_PER_QUESTION} different options`);
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= OPTIONS_PER_QUESTION) fail(`${at} has no right answer`);
      const paper = readingRoomPapers.find((p) => p.slug === q.paper);
      if (!paper) return fail(`${at}: no paper "${q.paper}"`);
      if (paper.gated === "full") fail(`${at}: "${q.paper}" is for subscribers only`);
      if (!paper.html.includes(`id="${q.anchor}"`)) fail(`${at}: no section #${q.anchor} in "${q.paper}"`);
      if (!plainText(paper.html).includes(squash(q.why))) fail(`${at}: the answer line is not word for word in "${q.paper}"`);
      return {
        q: q.q,
        options: q.options,
        answer: q.answer,
        why: q.why,
        paperTitle: paper.title,
        href: `/reading-room/${paper.slug}/#${q.anchor}`,
      };
    }),
  };
}

/** Every quiz, oldest first. */
export const quizzes: Quiz[] = (bank as RawQuiz[]).map(check).sort((a, b) => a.week.localeCompare(b.week));
