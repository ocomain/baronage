"use client";

import Link from "next/link";
import { useState } from "react";
import { PaperThumbnail } from "@/components/PaperThumbnail";

/** The light fields the index needs — never the paper bodies, which would bloat the client payload. */
export type PaperCard = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readingTime: string;
  published: string;
};

const ALL = "All papers";

/**
 * The Reading Room index as a card grid, after the Armorial, with subject filters. Every card is in the
 * prerendered HTML; filtering only hides cards, so search engines and readers without JavaScript still get
 * the whole library.
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
  const count = (c: string) => (c === ALL ? papers.length : papers.filter((p) => p.category === c).length);

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

      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {papers.map((p) => (
          <li key={p.slug} hidden={active !== ALL && p.category !== active}>
            {/* Phones: a compact row (thumbnail left, text right). From sm up: a framed card, as on the Armorial. */}
            <Link
              href={`/reading-room/${p.slug}`}
              className="group relative flex h-full items-start gap-4 border border-parchment-300/70 bg-parchment-50 p-4 text-left shadow-[0_18px_40px_-30px_rgba(10,16,36,0.5)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_26px_50px_-28px_rgba(10,16,36,0.6)] sm:flex-col sm:items-center sm:gap-0 sm:px-6 sm:pb-7 sm:pt-9 sm:text-center"
            >
              <span
                className="pointer-events-none absolute inset-2.5 hidden border border-gold/0 transition-colors duration-300 group-hover:border-gold/25 sm:block"
                aria-hidden
              />
              <PaperThumbnail title={p.title} category={p.category} size="responsive" />
              <span className="flex min-w-0 flex-1 flex-col sm:w-full sm:items-center">
                <span className="flex flex-wrap items-center gap-2 sm:mt-6 sm:justify-center">
                  {p.slug === featuredSlug && (
                    <span className="bg-gold px-1.5 py-0.5 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-navy-deep sm:absolute sm:left-4 sm:top-4 sm:px-2 sm:py-1 sm:text-[0.55rem]">
                      Featured
                    </span>
                  )}
                  <span className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-gold-deep sm:text-[0.6rem]">
                    {p.category}
                  </span>
                </span>
                <span className="mt-1.5 block font-display text-xl leading-tight text-navy transition-colors group-hover:text-oxblood sm:mt-2 sm:text-2xl">
                  {p.title}
                </span>
                <span className="mt-2 line-clamp-2 font-serif text-[0.95rem] italic leading-snug text-ink-soft sm:mt-3 sm:line-clamp-3 sm:text-base sm:leading-relaxed">
                  {p.subtitle}
                </span>
                <span className="mt-3 flex items-center gap-3 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] sm:mt-auto sm:pt-5 sm:text-[0.62rem]">
                  <span className="text-muted">{p.readingTime} read</span>
                  <span className="text-gold-deep transition-colors group-hover:text-oxblood">
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
