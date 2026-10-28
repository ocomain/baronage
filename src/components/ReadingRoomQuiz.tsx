"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PaperActions } from "@/components/PaperActions";
import {
  QUIZ_PATH,
  emptyAnswers,
  parseAnswers,
  score,
  shareText,
  storageKey,
  weekLabel,
  type Quiz,
  type QuizAnswers,
} from "@/lib/quiz";

const LETTERS = ["A", "B", "C", "D"];

/** The reader's answers to this quiz, kept in their own browser (one key per quiz). */
function useAnswers(quiz: Quiz) {
  const [answers, setAnswers] = useState<QuizAnswers>(() => emptyAnswers(quiz));
  useEffect(() => {
    try {
      const saved = parseAnswers(quiz, JSON.parse(localStorage.getItem(storageKey(quiz)) ?? "null"));
      if (saved) setAnswers(saved);
    } catch {}
  }, [quiz]);
  function answer(i: number, choice: number) {
    if (answers[i] != null) return;
    const next = answers.map((a, j) => (j === i ? choice : a));
    setAnswers(next);
    try {
      localStorage.setItem(storageKey(quiz), JSON.stringify(next));
    } catch {}
  }
  return { answers, answer };
}

function Options({ quiz, i, answers, onAnswer }: { quiz: Quiz; i: number; answers: QuizAnswers; onAnswer: (choice: number) => void }) {
  const chosen = answers[i];
  const q = quiz.questions[i];
  return (
    <ul className="grid gap-3">
      {q.options.map((label, idx) => {
        const state = chosen == null ? "open" : idx === q.answer ? "right" : idx === chosen ? "wrong" : "other";
        return (
          <li key={label}>
            <button
              type="button"
              disabled={chosen != null}
              onClick={() => onAnswer(idx)}
              className={`flex min-h-16 w-full items-center gap-4 border-[1.5px] px-4 py-3 text-left font-sans text-lg font-semibold leading-snug transition-colors sm:px-5 ${
                state === "right"
                  ? "border-navy bg-navy text-parchment-50"
                  : state === "wrong"
                    ? "border-oxblood bg-white text-oxblood"
                    : state === "other"
                      ? "border-parchment-300 bg-white text-muted"
                      : "cursor-pointer border-parchment-300 bg-white text-ink hover:border-navy"
              }`}
            >
              <span
                aria-hidden
                className={`grid h-8 w-8 flex-none place-items-center border text-[0.95rem] font-bold ${
                  state === "right" ? "border-gold-light text-gold-light" : state === "wrong" ? "border-oxblood text-oxblood" : "border-gold text-gold-deep"
                }`}
              >
                {LETTERS[idx]}
              </span>
              <span>
                {label}
                {state === "right" && <span className="sr-only"> (the right answer)</span>}
                {state === "wrong" && <span className="sr-only"> (your answer)</span>}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Verdict({ quiz, i, answers }: { quiz: Quiz; i: number; answers: QuizAnswers }) {
  const chosen = answers[i];
  const q = quiz.questions[i];
  if (chosen == null) return null;
  const right = chosen === q.answer;
  // The line is the paper's own words; one cut short mid-sentence ends with an ellipsis.
  const why = /[.!?”’]$/.test(q.why) ? q.why : `${q.why}…`;
  return (
    <div className="mt-6 border-t border-parchment-300 pt-5">
      <span className={`block font-sans text-[0.95rem] font-bold uppercase tracking-[0.16em] ${right ? "text-navy" : "text-oxblood"}`}>
        {right ? "Right" : "Not quite"}
      </span>
      <p className="mt-2 font-serif text-[1.4rem] italic leading-[1.45] text-ink-soft">{why}</p>
      <p className="mt-3 font-sans text-[0.95rem] text-muted">
        From <em className="text-ink-soft">{q.paperTitle}</em>.{" "}
        <Link href={q.href} className="font-bold text-navy underline decoration-gold/80 underline-offset-4 hover:text-oxblood">
          Read the paper <span aria-hidden>→</span>
        </Link>
      </p>
    </div>
  );
}

const BUTTON =
  "inline-flex min-h-14 items-center gap-2.5 border-[1.5px] border-navy bg-navy px-6 font-sans text-[0.95rem] font-bold uppercase tracking-[0.14em] text-parchment-50 transition-colors hover:bg-parchment-50 hover:text-navy";
const LEFT = ["None", "One", "Two", "Three", "Four", "Five"];
/** Shown with the score, on the homepage and the quiz page (owner 2026-10-28: "say come back next Monday"). */
const COME_BACK = "Come back next Monday for five new questions.";

/** The score once all five are answered: the figure, the five squares where asked for, and when to come back. */
function QuizScore({ quiz, answers, squares = true }: { quiz: Quiz; answers: QuizAnswers; squares?: boolean }) {
  return (
    <div className="mt-5">
      <div className="font-sans text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-muted">Your score</div>
      <div className="font-display text-[5.5rem] font-semibold leading-none text-navy tabular-nums">
        {score(quiz, answers)}
        <span className="text-[2rem] font-medium text-muted"> of {quiz.questions.length}</span>
      </div>
      {squares && (
        <div className="mt-4 flex gap-2.5" aria-hidden>
          {quiz.questions.map((q, j) => (
            <span key={j} className={`h-[22px] w-[22px] border-[1.5px] ${answers[j] === q.answer ? "border-navy bg-navy" : "border-oxblood bg-white"}`} />
          ))}
        </div>
      )}
      <p className="mt-4 font-serif text-2xl leading-snug text-ink-soft">{COME_BACK}</p>
    </div>
  );
}

/** The homepage panel: question one answered in place, then a button to the quiz page for the rest; the score once all are done. */
export function QuizPanel({ quiz }: { quiz: Quiz }) {
  const { answers, answer } = useAnswers(quiz);
  const left = answers.filter((a) => a == null).length;
  const done = left === 0;
  return (
    <section className="bg-parchment px-5 py-14 sm:px-8 sm:py-16" aria-labelledby="quiz-panel-h">
      <div className="mx-auto max-w-3xl border border-parchment-300 border-t-[3px] border-t-gold bg-parchment-50 px-5 pb-9 pt-8 sm:px-10">
        <div className="font-sans text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-muted">
          {weekLabel(quiz.week)}
          {!done && ` · Question 1 of ${quiz.questions.length}`}
        </div>
        <h2 id="quiz-panel-h" className="mt-1.5 font-display text-[2.4rem] leading-[1.05] text-navy">
          <Link href={QUIZ_PATH} className="hover:text-oxblood">
            The Reading Room Quiz
          </Link>
        </h2>
        {done ? (
          <QuizScore quiz={quiz} answers={answers} />
        ) : (
          <>
            <p className="mb-5 mt-4 font-display text-[1.85rem] font-semibold leading-tight text-navy sm:text-[2.15rem]">{quiz.questions[0].q}</p>
            <Options quiz={quiz} i={0} answers={answers} onAnswer={(c) => answer(0, c)} />
            <div aria-live="polite">
              <Verdict quiz={quiz} i={0} answers={answers} />
            </div>
          </>
        )}
        <div className="mt-7">
          <Link href={QUIZ_PATH} className={BUTTON}>
            {done ? "See your answers" : answers[0] == null ? "Answer all five" : `${LEFT[left] ?? left} to go`} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/** The quiz page: one question at a time, starting at the first unanswered one, then the score. */
export function QuizPage({ quiz }: { quiz: Quiz }) {
  const { answers, answer } = useAnswers(quiz);
  // The question whose answer is on screen, until the reader moves on.
  const [shown, setShown] = useState<number | null>(null);
  const [copied, setCopied] = useState("");
  const top = useRef<HTMLDivElement>(null);
  const next = answers.findIndex((a) => a == null);
  const i = shown ?? next;

  function onAnswer(choice: number) {
    answer(i, choice);
    setShown(i);
  }
  function moveOn() {
    setShown(null);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div ref={top} className="mx-auto max-w-3xl scroll-mt-28">
      <div className="font-sans text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-muted">
        No. {quiz.no} · {weekLabel(quiz.week)}
      </div>
      <h1 className="mt-1.5 font-display text-5xl leading-[1.02] text-navy sm:text-6xl">The Reading Room Quiz</h1>
      <p className="mt-3 font-serif text-2xl italic leading-snug text-ink-soft">Five questions from the Reading Room papers.</p>

      <ol className="mt-7 flex gap-2.5" aria-label="Progress">
        {quiz.questions.map((q, j) => {
          const a = answers[j];
          const cls =
            a != null
              ? a === q.answer
                ? "border-navy bg-navy"
                : "border-oxblood bg-white"
              : j === i
                ? "border-[3px] border-navy bg-white"
                : "border-parchment-300 bg-white";
          return (
            <li
              key={j}
              className={`h-[22px] w-[22px] border-[1.5px] ${cls}`}
              aria-label={`Question ${j + 1}${a == null ? "" : a === q.answer ? ", right" : ", not quite"}`}
            />
          );
        })}
      </ol>

      {i >= 0 ? (
        <div className="mt-6">
          <div className="font-sans text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Question {i + 1} of {quiz.questions.length}
          </div>
          <p className="mb-5 mt-3 font-display text-[1.85rem] font-semibold leading-tight text-navy sm:text-[2.15rem]">{quiz.questions[i].q}</p>
          <Options quiz={quiz} i={i} answers={answers} onAnswer={onAnswer} />
          <div aria-live="polite">
            <Verdict quiz={quiz} i={i} answers={answers} />
          </div>
          {answers[i] != null && (
            <div className="mt-7">
              <button type="button" onClick={moveOn} className={BUTTON}>
                {answers.some((a, j) => a == null && j !== i) ? "Next question" : "See your score"} <span aria-hidden>→</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <Result quiz={quiz} answers={answers} copied={copied} setCopied={setCopied} />
      )}
    </div>
  );
}

function Result({
  quiz,
  answers,
  copied,
  setCopied,
}: {
  quiz: Quiz;
  answers: QuizAnswers;
  copied: string;
  setCopied: (s: string) => void;
}) {
  const text = shareText(quiz, answers);
  const pre = useRef<HTMLPreElement>(null);
  function copy() {
    const select = () => {
      const r = document.createRange();
      if (pre.current) r.selectNodeContents(pre.current);
      const sel = getSelection();
      sel?.removeAllRanges();
      sel?.addRange(r);
      setCopied("Selected: press Copy on your keyboard.");
    };
    try {
      navigator.clipboard.writeText(text).then(() => setCopied("Copied."), select);
    } catch {
      select();
    }
  }
  return (
    <div className="mt-6">
      {/* The progress squares above already show which were right. */}
      <QuizScore quiz={quiz} answers={answers} squares={false} />

      <ul className="mt-7 border-t border-parchment-300">
        {quiz.questions.map((q, j) => (
          <li key={j} className="grid grid-cols-[22px_1fr] items-start gap-3.5 border-b border-parchment-300 py-3.5">
            <span className={`mt-1 h-[22px] w-[22px] border-[1.5px] ${answers[j] === q.answer ? "border-navy bg-navy" : "border-oxblood"}`} aria-hidden />
            <span className="min-w-0 font-sans text-[1.05rem] leading-relaxed text-ink">
              {q.options[q.answer]}.{" "}
              <Link href={q.href} className="font-semibold text-navy underline decoration-gold/80 underline-offset-4 hover:text-oxblood">
                {q.paperTitle}
              </Link>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 border border-parchment-300 bg-white px-5 py-5">
        <pre ref={pre} className="mb-4 whitespace-pre-wrap break-words font-sans text-[1.05rem] font-semibold leading-relaxed text-ink">
          {text}
        </pre>
        <button type="button" onClick={copy} className={BUTTON}>
          Copy
        </button>
        <p role="status" className="mt-3 min-h-[1.4em] font-sans text-[0.95rem] text-muted">
          {copied}
        </p>
      </div>
      {/* The same "Email to a friend" as the papers: our own sender, the sender's score in the email (owner 2026-10-28). */}
      <PaperActions
        title="The Reading Room Quiz"
        slug="quiz"
        path={QUIZ_PATH}
        thing="quiz"
        score={`${score(quiz, answers)}/${quiz.questions.length}`}
        showPrint={false}
        className="mt-6"
      />
    </div>
  );
}
