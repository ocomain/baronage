import Link from "next/link";
import { Container, GoldRule, Section } from "./primitives";
import { PaperThumbnail } from "./PaperThumbnail";
import { PaperBody } from "./PaperBody";
import { PaperActions } from "./PaperActions";
import { SealedPaper } from "./SealedPaper";
import { KEY_STORE, NEW_KEY_STORE, UNSEALING } from "@/lib/subscriber";
import type { ReadingRoomPaper } from "@/generated/reading-room";

const DEFAULT_EMBLEM = "/images/seal-ink.png";

/** Back-to-index link; display (inline-flex / hidden) is set where it is used. */
const BACK_LINK =
  "items-center gap-2 border border-gold/40 bg-parchment-50 px-3.5 py-2 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-gold-deep transition-colors hover:border-oxblood/40 hover:text-oxblood";

/** "2026-09-11" -> "September 2026" (UTC, so the month never shifts with the build machine's zone). */
export function monthYear(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}

/**
 * Shell for a Reading Room paper — a compact masthead on parchment (no hero),
 * the generated body at reading measure, endnotes, the "Authority & sources"
 * box (same treatment as the Explained page's authority pop-ups), and links to
 * other papers. A subscriber paper (gated) shows its public text and the sign-up instead. Server component. On paper it prints as a plain document: see the
 * print rules for .paper-print in globals.css.
 */
export function ArticleShell({ paper, related }: { paper: ReadingRoomPaper; related: ReadingRoomPaper[] }) {
  return (
    <Section tone="parchment" className="!py-12 sm:!py-16 print:!py-0">
      <Container size="prose">
        <article className="paper-print min-w-0">
          {/* Phones only: back link above the title. */}
          <nav aria-label="Breadcrumb" className="no-print mb-8 sm:hidden">
            <Link href="/reading-room" className={`inline-flex ${BACK_LINK}`}>
              <span aria-hidden>←</span> The Reading Room · all papers
            </Link>
          </nav>
          <header className="flex items-start justify-between gap-6 sm:gap-10">
            <div className="min-w-0">
              <p className="eyebrow">{paper.category}</p>
              <h1 className="mt-4 font-display text-4xl leading-[1.08] text-navy sm:text-5xl">{paper.title}</h1>
              <p className="mt-4 font-serif text-xl italic leading-relaxed text-ink-soft sm:text-2xl">{paper.subtitle}</p>
              <p className="mt-5 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">
                {paper.readingTime} read · Reviewed {monthYear(paper.reviewed)}
                {/* Desktop only: phones already have the back link above the title. */}
                <span className="no-print hidden sm:inline">
                  {" "}
                  ·{" "}
                  <Link
                    href="/reading-room"
                    className="text-gold-deep underline decoration-gold/60 underline-offset-4 transition-colors hover:text-oxblood hover:decoration-oxblood/60"
                  >
                    The Reading Room
                  </Link>
                </span>
              </p>
              {/* A subscriber paper offers printing once it has been opened (see SealedPaper). */}
              <PaperActions title={paper.title} slug={paper.slug} showPrint={paper.gated !== "full"} className="mt-5" />
              {/* Paper only: where the essay came from. */}
              <p className="print-only paper-print__source">
                Baronage of Scotland Association · The Reading Room · www.baronage.com/reading-room/{paper.slug}/
              </p>
              <GoldRule className="mt-6" align="start" />
            </div>
            <div className="flex flex-none flex-col items-end gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={paper.emblem ?? DEFAULT_EMBLEM}
                alt=""
                aria-hidden
                width={56}
                height={56}
                className="mt-1 h-14 w-14 object-contain opacity-85"
              />
            </div>
          </header>

          {paper.gated ? (
            <>
              {/* Runs before first paint: with a subscriber key at hand, hold the sign-up box back while the paper opens. */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `try{if(/key=/.test(location.hash)||localStorage.getItem("${KEY_STORE}")||localStorage.getItem("${NEW_KEY_STORE}"))document.documentElement.classList.add("${UNSEALING}")}catch(e){}`,
                }}
              />
              <SealedPaper
                slug={paper.slug}
                mode={paper.gated}
                html={paper.html}
                footnotesHtml={paper.footnotesHtml}
                sourcesHtml={paper.sourcesHtml}
              />
            </>
          ) : (
            <PaperBody html={paper.html} footnotesHtml={paper.footnotesHtml} sourcesHtml={paper.sourcesHtml} />
          )}

          {related.length > 0 && (
            <section aria-labelledby="more-papers" className="no-print mt-14 max-w-[68ch]">
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

          <PaperActions title={paper.title} slug={paper.slug} showPrint={paper.gated !== "full"} className="mt-12" />

          <p className="no-print mt-8">
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
