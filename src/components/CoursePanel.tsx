"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CoursePreread, CourseStep } from "@/lib/course";
import { COURSE_EVENT, readProgress, writeProgress } from "@/lib/courseProgress";
import { CourseSeal, PartSeal } from "./CourseSeal";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/**
 * The Baron's Course (owner 2026-10-23): the steps by part, each with its numeral, title, lesson line, reading time
 * and a tick. Two columns of parts on a computer; one numbered rail on a phone. Ticks are kept on this device only
 * (lib/courseProgress); without storage everything shows unread and still works. A wax seal fills as papers are
 * read, each finished part gets a small seal, and the last tick leads to the Certificate page: the certificate is for
 * members, Friends and Patrons who pass the test (owner 2026-10-28: "drop the free Certificate of Reading").
 */
export function CoursePanel({
  title,
  eyebrow,
  steps,
  parts,
  standfirst,
  path,
  preread,
}: {
  /** The page's h1: the course page has no hero band (owner 2026-10-23). */
  title: string;
  /** A small line over the h1: the menu's name for the course. */
  eyebrow?: string;
  steps: CourseStep[];
  parts: readonly string[];
  standfirst: string;
  /** The course page, "/the-barons-course/": the booklet and the Certificate page sit under it. */
  path: string;
  /** "Read first": the unnumbered step before Part I (owner 2026-10-24), outside the count and the seal. */
  preread?: CoursePreread;
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
      aria-labelledby="course-title"
      className="mx-auto max-w-5xl border border-gold/50 bg-parchment-50 px-5 py-8 shadow-[0_22px_48px_-34px_rgba(10,16,36,0.55)] sm:px-10 sm:py-10"
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-7">
        <CourseSeal done={done} total={steps.length} size={92} className="mt-1 hidden sm:block" />
        <CourseSeal done={done} total={steps.length} size={68} className="mt-1 sm:hidden" />
        <div className="min-w-0">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 id="course-title" className="font-display text-4xl leading-[1.05] text-navy sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl font-serif text-lg italic leading-relaxed text-ink-soft sm:text-xl">{standfirst}</p>

          {/* Progress and the way back in: only once something has been read on this device */}
          {done > 0 && (
            <p className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted">
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
                <Link
                  href={`${path}certification/`}
                  className="text-oxblood underline decoration-oxblood/40 underline-offset-4 transition-colors hover:decoration-oxblood"
                >
                  All read: the certificate, for members →
                </Link>
              )}
            </p>
          )}

          {/* The booklet: every paper in order, to print or keep as a PDF */}
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href={`${path}print/`}
              className="inline-flex min-h-[2.75rem] items-center gap-2.5 border-2 border-navy px-4 py-2 font-sans text-[0.95rem] font-semibold text-navy transition-colors hover:border-oxblood hover:text-oxblood"
            >
              <svg aria-hidden viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9V3h12v6" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <path d="M6 14h12v7H6z" />
              </svg>
              Print the course
            </Link>
            <span className="font-serif text-base italic text-ink-soft">every paper in one booklet, to print or to email as a PDF</span>
          </p>
        </div>
      </div>

      {/* Read first: one unnumbered step before Part I; its tick counts toward nothing */}
      {preread && (
        <div className="mt-9 border-l-4 border-gold bg-parchment-100 px-5 py-5 sm:px-6">
          <p className="flex min-h-[22px] items-center gap-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">
            Read first
            {read.includes(preread.slug) && <PartSeal />}
          </p>
          <div className="mt-4 grid max-w-3xl grid-cols-[2.5rem_1fr_auto] items-start gap-x-4">
            <span
              aria-hidden
              className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                read.includes(preread.slug) ? "border-navy bg-navy text-gold-light" : "border-gold bg-parchment-50 text-gold-deep"
              }`}
            >
              {/* an open book */}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 6.5C10.3 5.2 8 4.6 4 4.8v13c4-.2 6.3.4 8 1.7 1.7-1.3 4-1.9 8-1.7v-13c-4-.2-6.3.4-8 1.7z" />
                <path d="M12 6.5v13" />
              </svg>
            </span>
            <div className="min-w-0 pt-1">
              <span className="mb-1.5 inline-block bg-gold px-1.5 py-0.5 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-navy-deep">
                Start here
              </span>
              <Link href={preread.href} className="block font-display text-xl leading-snug text-navy transition-colors hover:text-oxblood">
                {preread.title}
              </Link>
              <p className="mt-1 font-serif text-base leading-snug text-ink-soft">{preread.lesson}</p>
              <p className="mt-1.5 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted">
                {preread.readingTime}
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle(preread.slug)}
              aria-pressed={read.includes(preread.slug)}
              aria-label={read.includes(preread.slug) ? `Mark “${preread.title}” as not read` : `Mark “${preread.title}” as read`}
              title={read.includes(preread.slug) ? "Read" : "Mark as read"}
              className={`mt-1.5 flex h-7 w-7 items-center justify-center rounded-full border text-sm transition-colors ${
                read.includes(preread.slug)
                  ? "border-navy bg-navy text-gold-light"
                  : "border-parchment-300 bg-white text-transparent hover:border-gold hover:text-gold-deep"
              }`}
            >
              ✓
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-x-12 gap-y-9 md:grid-cols-2">
        {parts.map((partTitle, pi) => {
          const inPart = steps.filter((s) => s.part === pi + 1);
          if (!inPart.length) return null;
          const partRead = inPart.every((s) => read.includes(s.slug));
          return (
            <div key={partTitle} className="break-inside-avoid">
              <p className="flex min-h-[22px] items-center gap-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                Part {ROMAN[pi]} · {partTitle}
                {partRead && <PartSeal />}
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
                        {s.n === 1 && !preread && (
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
