import Link from "next/link";
import { Container, GoldRule, Section } from "./primitives";
import { PaperThumbnail } from "./PaperThumbnail";
import type { ReadingRoomPaper } from "@/generated/reading-room";

const DEFAULT_EMBLEM = "/images/seal-ink.png";

/** "2026-09-11" -> "September 2026" (UTC, so the month never shifts with the build machine's zone). */
export function monthYear(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}

/**
 * Shell for a Reading Room paper — a compact masthead on parchment (no hero),
 * the generated body at reading measure, endnotes, the "Authority & sources"
 * box (same treatment as the Explained page's authority pop-ups), and links to
 * other papers. Server component; nothing fixed or sticky, so it prints cleanly.
 */
export function ArticleShell({ paper, related }: { paper: ReadingRoomPaper; related: ReadingRoomPaper[] }) {
  return (
    <Section tone="parchment" className="!py-12 sm:!py-16">
      <Container size="prose">
        <article className="min-w-0">
          <header className="flex items-start justify-between gap-6 sm:gap-10">
            <div className="min-w-0">
              <p className="eyebrow">{paper.category}</p>
              <h1 className="mt-4 font-display text-4xl leading-[1.08] text-navy sm:text-5xl">{paper.title}</h1>
              <p className="mt-4 font-serif text-xl italic leading-relaxed text-ink-soft sm:text-2xl">{paper.subtitle}</p>
              <p className="mt-5 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">
                {paper.readingTime} read · Reviewed {monthYear(paper.reviewed)} ·{" "}
                <Link href="/reading-room" className="text-gold-deep transition-colors hover:text-oxblood">
                  The Reading Room
                </Link>
              </p>
              <GoldRule className="mt-6" align="start" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={paper.emblem ?? DEFAULT_EMBLEM}
              alt=""
              aria-hidden
              width={56}
              height={56}
              className="mt-1 h-14 w-14 flex-none object-contain opacity-85"
            />
          </header>

          <div
            className="prose-heritage paper-body mt-10 max-w-[68ch] text-[1.05rem] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: paper.html }}
          />

          {paper.footnotesHtml && (
            <section aria-labelledby="notes" className="mt-12 max-w-[68ch] border-t border-parchment-300/70 pt-8">
              <h2 id="notes" className="font-display text-2xl text-navy">
                Notes
              </h2>
              <div
                className="paper-notes mt-4 text-sm leading-relaxed text-ink-soft"
                dangerouslySetInnerHTML={{ __html: paper.footnotesHtml }}
              />
            </section>
          )}

          {paper.sourcesHtml && (
            <aside
              aria-labelledby="authority-sources"
              className="mt-12 max-w-[68ch] border border-gold/40 bg-parchment-50 p-6 sm:p-8"
            >
              <div className="border-b border-parchment-300/70 pb-3">
                <h2
                  id="authority-sources"
                  className="font-inscribe text-[0.7rem] font-normal uppercase tracking-[0.22em] text-gold-deep"
                >
                  Authority &amp; sources
                </h2>
              </div>
              <div
                className="paper-sources mt-4 space-y-3 font-serif text-[0.95rem] leading-relaxed text-ink-soft [&_strong]:text-navy"
                dangerouslySetInnerHTML={{ __html: paper.sourcesHtml }}
              />
            </aside>
          )}

          {related.length > 0 && (
            <section aria-labelledby="more-papers" className="mt-14 max-w-[68ch]">
              <h2 id="more-papers" className="eyebrow !font-semibold">
                More from the Reading Room
              </h2>
              <ul className="mt-4 divide-y divide-parchment-300/70 border-y border-parchment-300/70">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/reading-room/${p.slug}`} className="group flex items-center gap-4 py-4">
                      <PaperThumbnail title={p.title} category={p.category} size="sm" className="opacity-80" />
                      <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                        <span className="font-display text-xl text-navy transition-colors group-hover:text-oxblood">
                          {p.title}
                        </span>
                        <span className="flex-none font-sans text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                          {p.category} · {p.readingTime}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-10">
            <Link
              href="/reading-room"
              className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-deep transition-colors hover:text-oxblood"
            >
              ← The Reading Room
            </Link>
          </p>
        </article>
      </Container>
    </Section>
  );
}
