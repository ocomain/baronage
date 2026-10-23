"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CourseStep } from "@/lib/course";
import { COURSE_EVENT, readProgress } from "@/lib/courseProgress";
import { PrintButton } from "./PrintButton";
import { Seal } from "./Seal";

/** The reader's name for the certificate: typed here, kept on this device only, never sent anywhere. */
const NAME_STORE = "baronage.course.name";

/**
 * The Baron's Course: the certificate of reading (owner 2026-10-23, "more visual and gamified"). Offered once every
 * paper is ticked on this device. A keepsake the reader prints for their own record, not a qualification: it says
 * so on its face, and nothing about it is recorded by the Association.
 */
export function CourseCertificate({
  steps,
  name,
  countWord,
}: {
  steps: Pick<CourseStep, "n" | "slug" | "title">[];
  /** "The Baron’s Course" */
  name: string;
  /** "twelve" */
  countWord: string;
}) {
  const [read, setRead] = useState<string[] | null>(null);
  const [reader, setReader] = useState("");
  const [today, setToday] = useState("");
  useEffect(() => {
    const sync = () => setRead(readProgress());
    sync();
    try {
      setReader(localStorage.getItem(NAME_STORE) ?? "");
    } catch {}
    setToday(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
    window.addEventListener(COURSE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(COURSE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const onName = (v: string) => {
    setReader(v);
    try {
      localStorage.setItem(NAME_STORE, v);
    } catch {}
  };

  // Before the device has been read, say nothing either way.
  if (read === null) return <div className="min-h-[20rem]" />;

  const done = steps.filter((s) => read.includes(s.slug)).length;
  const nextUnread = steps.find((s) => !read.includes(s.slug));

  if (nextUnread) {
    return (
      <div className="mx-auto max-w-2xl border border-gold/50 bg-parchment-50 p-6 text-center sm:p-10">
        <p className="font-serif text-xl leading-relaxed text-navy sm:text-2xl">
          Your certificate is ready when all {countWord} papers are read. On this device you have read {done} of{" "}
          {steps.length}.
        </p>
        <p className="mt-6 font-serif text-lg">
          <Link
            href={`/reading-room/${nextUnread.slug}/`}
            className="text-oxblood underline decoration-oxblood/40 underline-offset-4 hover:decoration-oxblood"
          >
            {done ? "Resume" : "Start"} at paper {nextUnread.n}: {nextUnread.title} →
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="no-print mx-auto mb-10 max-w-2xl">
        <label htmlFor="certificate-name" className="block font-sans text-[0.95rem] font-semibold text-navy">
          Your name, as it should appear
        </label>
        <input
          id="certificate-name"
          type="text"
          value={reader}
          maxLength={80}
          autoComplete="name"
          onChange={(e) => onName(e.target.value)}
          placeholder="e.g. John Smith, Baron of Inverness"
          className="mt-1.5 w-full rounded-sm border border-parchment-300 bg-white px-3.5 py-3 font-serif text-xl text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold"
        />
        <p className="mt-2 font-serif text-base italic text-ink-soft">Kept on this device only; it is not sent to us.</p>
        <PrintButton label="Print the certificate" className="mt-5" />
      </div>

      <div className="paper-print certificate mx-auto max-w-[44rem] border-[3px] border-gold bg-parchment-50 p-2 shadow-[0_22px_48px_-34px_rgba(10,16,36,0.55)]">
        <div className="certificate__inner flex min-h-[52rem] flex-col items-center border border-gold/60 px-6 py-12 text-center sm:px-12">
          <Seal tone="gold" size="sm" alt="" aria-hidden className="h-28 w-auto" />
          <p className="eyebrow mt-6">Baronage of Scotland Association</p>
          <p className="certificate__title mt-6 font-display text-5xl leading-tight text-navy sm:text-6xl">Certificate of Reading</p>
          <p className="mt-10 font-serif text-xl italic text-ink-soft">This records that</p>
          <p className="certificate__name mt-3 min-h-[3.5rem] w-full max-w-lg border-b border-gold/60 pb-2 font-display text-4xl leading-tight text-oxblood sm:text-[2.6rem]">
            {reader.trim()}
          </p>
          <p className="mt-8 font-serif text-xl text-ink">has read the {countWord} papers of</p>
          <p className="certificate__course mt-2 font-display text-4xl text-navy">{name}</p>
          <p className="mt-2 font-serif text-xl italic text-ink-soft">in the Reading Room of the Association</p>
          <p className="mt-10 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">{today}</p>
          <p className="certificate__note mt-auto pt-12 font-serif text-base italic text-muted">
            For your own record. A keepsake, not a qualification. www.baronage.com
          </p>
        </div>
      </div>
    </>
  );
}
