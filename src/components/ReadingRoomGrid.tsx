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
};

const ALL = "All papers";

/**
 * The Reading Room index as card grids under subject headings, after the Armorial, with subject filters. Every card is in the
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
  // A subscriber arriving by their link (or returning on the same device) is told the papers are open.
  const [subscriber, setSubscriber] = useState(false);
  useEffect(() => {
    try {
      setSubscriber(!!(localStorage.getItem(KEY_STORE) || localStorage.getItem(NEW_KEY_STORE)));
    } catch {}
  }, []);

  const count = (c: string) => (c === ALL ? papers.length : papers.filter((p) => p.category === c).length);
  // Shown under subject headings, in the order the subjects are given; within a subject the editorial order holds.
  const groups = categories.map((c) => ({ name: c, papers: papers.filter((p) => p.category === c) }));

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

      <div className="mt-10 space-y-12 sm:space-y-14">
        {groups.map((g) => (
          <section key={g.name} aria-label={g.name} hidden={active !== ALL && g.name !== active}>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-2xl leading-tight text-navy sm:text-3xl">{g.name}</h2>
              <span className="h-px flex-1 bg-gold/45" aria-hidden />
              <span className="flex-none font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted">
                {g.papers.length} {g.papers.length === 1 ? "paper" : "papers"}
              </span>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.papers.map((p) => (
          <li key={p.slug}>
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
                </span>
                <span className="mt-1.5 block font-display text-xl leading-tight text-navy transition-colors group-hover:text-oxblood sm:mt-2 sm:text-2xl">
                  {p.title}
                </span>
                <span className="mt-2 line-clamp-2 font-serif text-[0.95rem] italic leading-snug text-ink-soft sm:mt-3 sm:line-clamp-3 sm:text-base sm:leading-relaxed">
                  {p.subtitle}
                </span>
                <span className="mt-3 flex items-center gap-3 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] sm:mt-auto sm:pt-5 sm:text-[0.62rem]">
                  <span className="text-muted">{p.readingTime} read</span>
                  {p.gated && <span className="text-muted">Subscribers</span>}
                  <span className="text-gold-deep transition-colors group-hover:text-oxblood">
                    Read <span aria-hidden>→</span>
                  </span>
                </span>
              </span>
            </Link>
          </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
