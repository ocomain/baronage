"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PaperThumbnail } from "@/components/PaperThumbnail";
import { KEY_STORE, NEW_KEY_STORE } from "@/lib/subscriber";

/** The light fields the index needs — never the paper bodies, which would bloat the client payload. */
export type PaperCard = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readingTime: string;
  published: string;
  gated: boolean;
  /** The "Must read" tag (owner 2026-10-24; "Essential reading" until then), from the paper's front-matter `essential`. */
  essential: boolean;
};

const ALL = "All papers";

/**
 * The Reading Room index as one shelf of small files, four to a row on wide screens: a sheet, the subject, the title
 * and the reading time (owner, 13 October 2026). The papers run subject by subject, in the order the subjects are
 * given, exactly as they did when each subject had its own heading; the subject filters above only hide files. Every file is in the prerendered HTML, so search engines and readers without JavaScript
 * still get the whole library.
 */
export function ReadingRoomGrid({
  papers,
  categories,
  featuredSlug,
}: {
  papers: PaperCard[];
  categories: string[];
  featuredSlug: string;
}) {
  const [active, setActive] = useState<string>(ALL);
  // A subscriber arriving by their link (or returning on the same device) is told the papers are open.
  const [subscriber, setSubscriber] = useState(false);
  useEffect(() => {
    try {
      setSubscriber(!!(localStorage.getItem(KEY_STORE) || localStorage.getItem(NEW_KEY_STORE)));
    } catch {}
  }, []);

  const count = (c: string) => (c === ALL ? papers.length : papers.filter((p) => p.category === c).length);
  // Subject by subject, in the order the subjects are given; within a subject the page's order holds.
  const shelf = categories.flatMap((c) => papers.filter((p) => p.category === c));

  return (
    <>
      <div
        role="toolbar"
        aria-label="Filter papers by subject"
        className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {[ALL, ...categories].map((c) => {
          const on = c === active;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={`flex-none whitespace-nowrap border px-3.5 py-2 font-sans text-[0.64rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                on
                  ? "border-navy bg-navy text-parchment-50"
                  : "border-parchment-300 bg-parchment-50 text-ink-soft hover:border-gold hover:text-oxblood"
              }`}
            >
              {c} <span className={on ? "text-gold-light" : "text-muted"}>{count(c)}</span>
            </button>
          );
        })}
      </div>

      {subscriber && (
        <p role="status" className="mt-6 border border-gold/40 bg-parchment-50 px-4 py-3 font-serif text-base text-ink-soft">
          Thank you for subscribing. The subscriber papers are open on this device.
        </p>
      )}

      <ul aria-label="Papers" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {shelf.map((p) => (
          <li key={p.slug} hidden={active !== ALL && p.category !== active}>
            {/* Phones: a compact row (sheet left, text right). From sm up: a small framed file, with room at the top for
                the Featured and Must read tags (pt-11, 2026-10-23). */}
            <Link
              href={`/reading-room/${p.slug}`}
              className="group relative flex h-full items-center gap-4 border border-parchment-300/70 bg-parchment-50 p-4 text-left shadow-[0_14px_30px_-26px_rgba(10,16,36,0.5)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_22px_40px_-26px_rgba(10,16,36,0.6)] sm:flex-col sm:items-center sm:gap-0 sm:px-4 sm:pb-5 sm:pt-11 sm:text-center"
            >
              <span
                className="pointer-events-none absolute inset-2 hidden border border-gold/0 transition-colors duration-300 group-hover:border-gold/25 sm:block"
                aria-hidden
              />
              <PaperThumbnail title={p.title} category={p.category} size="sm" />
              <span className="flex min-w-0 flex-1 flex-col sm:w-full sm:items-center">
                {p.slug === featuredSlug && (
                  <span className="mb-1.5 self-start bg-gold px-1.5 py-0.5 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-navy-deep sm:absolute sm:left-3 sm:top-3 sm:mb-0 sm:px-2 sm:py-1 sm:text-[0.55rem]">
                    Featured
                  </span>
                )}
                {/* "Must read" (owner 2026-10-24; was "Essential reading" from 10-23): navy, so it is not mistaken for the gold "Featured" tag */}
                {p.essential && (
                  <span className="mb-1.5 self-start whitespace-nowrap bg-navy px-1.5 py-0.5 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-gold-light sm:absolute sm:right-3 sm:top-3 sm:mb-0 sm:px-2 sm:py-1 sm:text-[0.55rem]">
                    Must read
                  </span>
                )}
                <span className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-gold-deep sm:mt-4">
                  {p.category}
                </span>
                <span className="mt-1 block font-display text-xl leading-tight text-navy transition-colors group-hover:text-oxblood sm:mt-1.5">
                  {p.title}
                </span>
                <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] sm:mt-auto sm:justify-center sm:pt-4 sm:text-[0.62rem]">
                  <span className="whitespace-nowrap text-muted">{p.readingTime} read</span>
                  {/* owner 2026-10-27: not on the card of "The Lord Lyon and the baronage since 2004" */}
                  {p.gated && p.slug !== "lord-lyon-since-2004" && <span className="whitespace-nowrap text-muted">Subscribers</span>}
                  <span className="whitespace-nowrap text-gold-deep transition-colors group-hover:text-oxblood">
                    Read <span aria-hidden>→</span>
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
