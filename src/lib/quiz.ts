/**
 * The Reading Room Quiz (owner 2026-10-28, after DDW Daily): five questions a week, each from a published paper.
 * The rules here have no imports, so the quiz component can use them in the browser. The bank and its checks
 * against the papers are in quiz-bank.ts, which runs only at build time.
 *
 * The site is static, so the browser picks the quiz: the latest one whose week (a Monday) has begun in London.
 */

export type QuizQuestion = {
  q: string;
  options: string[];
  /** Index into `options` of the right answer. */
  answer: number;
  /** One line from the paper, word for word, shown after the reader answers. */
  why: string;
  /** The paper's title and the link to the section that carries the fact (filled in by quiz-bank.ts). */
  paperTitle: string;
  href: string;
};

export type Quiz = {
  no: number;
  /** The Monday the quiz starts, YYYY-MM-DD. */
  week: string;
  questions: QuizQuestion[];
};

export type QuizAnswers = Array<number | null>;

export const QUIZ_TZ = "Europe/London";
export const QUESTIONS_PER_QUIZ = 5;
export const OPTIONS_PER_QUESTION = 4;
export const QUIZ_PATH = "/quiz/";
export const SHARE_URL = "www.baronage.com/quiz/";

/** Today's date in London as YYYY-MM-DD. */
export function londonDate(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: QUIZ_TZ, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** The latest quiz whose week has begun by `today`; the first quiz if none has yet. */
export function quizFor(quizzes: readonly Quiz[], today: string): Quiz | null {
  let best: Quiz | null = null;
  for (const quiz of quizzes) if (quiz.week <= today && (!best || quiz.week > best.week)) best = quiz;
  return best ?? quizzes[0] ?? null;
}

/** "Week of 26 October" */
export function weekLabel(week: string): string {
  const d = new Date(`${week}T12:00:00Z`);
  return `Week of ${d.getUTCDate()} ${d.toLocaleString("en-GB", { month: "long", timeZone: "UTC" })}`;
}

export function emptyAnswers(quiz: Quiz): QuizAnswers {
  return quiz.questions.map(() => null);
}

/** Answers read back from the reader's browser, or null when they do not fit this quiz. */
export function parseAnswers(quiz: Quiz, raw: unknown): QuizAnswers | null {
  if (!Array.isArray(raw) || raw.length !== quiz.questions.length) return null;
  const ok = raw.every((v) => v === null || (Number.isInteger(v) && v >= 0 && v < OPTIONS_PER_QUESTION));
  return ok ? (raw as QuizAnswers) : null;
}

export function score(quiz: Quiz, answers: QuizAnswers): number {
  return quiz.questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);
}

/** ■ for a right answer, □ for a wrong or missing one. */
export function squares(quiz: Quiz, answers: QuizAnswers): string {
  return quiz.questions.map((q, i) => (answers[i] === q.answer ? "■" : "□")).join("");
}

/** The text a reader copies or emails. */
export function shareText(quiz: Quiz, answers: QuizAnswers): string {
  return `The Reading Room Quiz No. ${quiz.no}\n${squares(quiz, answers)} ${score(quiz, answers)}/${quiz.questions.length}\n${SHARE_URL}`;
}

/** One key per quiz in the reader's browser. */
export const storageKey = (quiz: Quiz) => `rr-quiz-${quiz.no}`;
