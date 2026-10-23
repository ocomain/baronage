"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CourseStep } from "@/lib/course";
import { COURSE_EVENT, readProgress, writeProgress } from "@/lib/courseProgress";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/**
 * The Baron's Course (owner 2026-10-23): the steps by part, each with its numeral, title, lesson line, reading time
 * and a tick. Two columns of parts on a computer; one numbered rail on a phone. Ticks are kept on this device only
 * (lib/courseProgress); without storage everything shows unread and still works.
 */
export function CoursePanel({
  steps,
  parts,
  heading,
  standfirst,
}: {
  steps: CourseStep[];
  parts: readonly string[];
  /** Shown on the Reading Room; left out on the course's own page, which has the title as its h1. */
  heading?: string;
  standfirst: string;
}) {
  const [read, setRead] = useState<string[]>([]);
  // The current list, so quick taps in a row each start from the latest (state can lag a render behind).
  const current = useRef<string[]>([]);
  useEffect(() => {
    const sync = () => {
      current.current = readProgress();
      setRead(current.current);
    };
    sync();
    window.addEventListener(COURSE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(COURSE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = (slug: string) => {
    const prev = current.current;
    const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
    current.current = next;
    setRead(next);
    writeProgress(next);
  };
  const done = steps.filter((s) => read.includes(s.slug)).length;
  const nextUnread = steps.find((s) => !read.includes(s.slug));

  return (
    <section
      aria-label="The baron’s course"
      className="mx-auto max-w-5xl border border-gold/50 bg-parchment-50 px-5 py-8 shadow-[0_22px_48px_-34px_rgba(10,16,36,0.55)] sm:px-10 sm:py-10"
    >
      {heading && <h2 className="font-display text-3xl leading-tight text-navy sm:text-[2.1rem]">{heading}</h2>}
      <p className={`max-w-3xl font-serif text-lg italic leading-relaxed text-ink-soft sm:text-xl ${heading ? "mt-3" : ""}`}>
        {standfirst}
      </p>

      {/* Progress and the way back in: only once something has been read on this device */}
      {done > 0 && (
        <p className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted">
          <span>
            {done} of {steps.length} read
          </span>
          {nextUnread ? (
            <Link
              href={`/reading-room/${nextUnread.slug}/`}
              className="text-oxblood underline decoration-oxblood/40 underline-offset-4 transition-colors hover:decoration-oxblood"
            >
              Resume: {nextUnread.n}. {nextUnread.title} →
            </Link>
          ) : (
            <span className="text-gold-deep">Course complete</span>
          )}
        </p>
      )}

      <div className="mt-8 grid gap-x-12 gap-y-9 md:grid-cols-2">
        {parts.map((partTitle, pi) => {
          const inPart = steps.filter((s) => s.part === pi + 1);
          if (!inPart.length) return null;
          return (
            <div key={partTitle} className="break-inside-avoid">
              <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                Part {ROMAN[pi]} · {partTitle}
              </p>
              {/* the rail: a thin gold line through the numerals */}
              <ol className="relative mt-4 space-y-6 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-gold/40">
                {inPart.map((s) => {
                  const isRead = read.includes(s.slug);
                  return (
                    <li key={s.slug} className="relative grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4">
                      <span
                        aria-hidden
                        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border font-display text-xl leading-none ${
                          isRead ? "border-navy bg-navy text-gold-light" : "border-gold bg-parchment-50 text-gold-deep"
                        }`}
                      >
                        {s.n}
                      </span>
                      <div className="min-w-0 pt-1">
                        {s.n === 1 && (
                          <span className="mb-1.5 inline-block bg-gold px-1.5 py-0.5 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-navy-deep">
                            Start here
                          </span>
                        )}
                        <Link
                          href={`/reading-room/${s.slug}/`}
                          className="block font-display text-xl leading-snug text-navy transition-colors hover:text-oxblood"
                        >
                          <span className="sr-only">{s.n}. </span>
                          {s.title}
                        </Link>
                        <p className="mt-1 font-serif text-base leading-snug text-ink-soft">{s.lesson}</p>
                        <p className="mt-1.5 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted">
                          {s.readingTime}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggle(s.slug)}
                        aria-pressed={isRead}
                        aria-label={isRead ? `Mark “${s.title}” as not read` : `Mark “${s.title}” as read`}
                        title={isRead ? "Read" : "Mark as read"}
                        className={`mt-1.5 flex h-7 w-7 items-center justify-center rounded-full border text-sm transition-colors ${
                          isRead
                            ? "border-navy bg-navy text-gold-light"
                            : "border-parchment-300 bg-white text-transparent hover:border-gold hover:text-gold-deep"
                        }`}
                      >
                        ✓
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}

        {/* After the last step: what the course leads to */}
        <div className="border-l-4 border-gold bg-parchment-100 px-6 py-5 md:self-start">
          <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">
            Then: the Roll and the Pledge
          </p>
          <p className="mt-2 font-serif text-lg leading-relaxed text-navy">
            <Link href="/the-roll/" className="underline decoration-gold/60 underline-offset-4 transition-colors hover:text-oxblood">
              The Roll of Scottish Barons
            </Link>{" "}
            ·{" "}
            <Link href="/pledge/" className="underline decoration-gold/60 underline-offset-4 transition-colors hover:text-oxblood">
              The Pledge
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
