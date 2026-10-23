"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CourseStep } from "@/lib/course";
import { COURSE_EVENT, readProgress } from "@/lib/courseProgress";
import { ButtonLink } from "./primitives";
import { CourseSeal } from "./CourseSeal";

/**
 * The Baron's Course on the Reading Room: one line instead of the full syllabus (owner 2026-10-23: the panel at the top
 * of the Reading Room was "confusing … duplicate"). The name and a link lead to the course page; the button starts at
 * paper 1, or resumes at the first paper not yet read on this device, or, once all are read, offers the certificate.
 * The wax seal fills as papers are read.
 */
export function CourseBanner({
  steps,
  name,
  path,
  countWord,
}: {
  steps: Pick<CourseStep, "n" | "slug" | "title">[];
  name: string;
  path: string;
  /** "twelve" */
  countWord: string;
}) {
  const [read, setRead] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setRead(readProgress());
    sync();
    window.addEventListener(COURSE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(COURSE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const done = steps.filter((s) => read.includes(s.slug)).length;
  const nextUnread = steps.find((s) => !read.includes(s.slug));

  return (
    <section
      aria-label={name}
      className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8 border border-gold/50 bg-parchment-50 px-5 py-5 shadow-[0_18px_40px_-34px_rgba(10,16,36,0.55)] sm:px-8"
    >
      <CourseSeal done={done} total={steps.length} size={64} />
      <div className="min-w-0 flex-1 basis-48">
        <p className="font-display text-[1.7rem] leading-tight text-navy sm:text-3xl">
          <Link href={path} className="transition-colors hover:text-oxblood">
            {name}
          </Link>
        </p>
        <p className="mt-1 font-serif text-lg italic leading-snug text-ink-soft">
          {countWord[0].toUpperCase() + countWord.slice(1)} papers, in order.{" "}
          {done > 0 && (
            <span className="not-italic font-semibold text-navy">
              {done === steps.length ? `All ${countWord} read.` : `${done} of ${steps.length} read.`}
            </span>
          )}{" "}
          <Link
            href={path}
            className="whitespace-nowrap not-italic text-oxblood underline decoration-oxblood/40 underline-offset-4 transition-colors hover:decoration-oxblood"
          >
            See the list
          </Link>
        </p>
      </div>
      {nextUnread ? (
        <ButtonLink href={`/reading-room/${nextUnread.slug}/`} className="!px-7 !py-3.5 !text-[0.8rem]">
          {done > 0 ? `Resume at paper ${nextUnread.n}` : "Start with paper 1"} <span aria-hidden>→</span>
        </ButtonLink>
      ) : (
        <ButtonLink href={`${path}certificate/`} className="!px-7 !py-3.5 !text-[0.8rem]">
          Your certificate <span aria-hidden>→</span>
        </ButtonLink>
      )}
    </section>
  );
}
