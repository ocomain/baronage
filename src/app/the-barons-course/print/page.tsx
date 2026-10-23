import type { Metadata } from "next";
import Link from "next/link";
import { statSync } from "node:fs";
import { join } from "node:path";
import { Container, Section } from "@/components/primitives";
import { PaperBody } from "@/components/PaperBody";
import { PrintButton } from "@/components/PrintButton";
import { SealedPaper } from "@/components/SealedPaper";
import { Seal } from "@/components/Seal";
import { readingRoomPapers } from "@/generated/reading-room";
import { COURSE_NAME, COURSE_PARTS, COURSE_PATH, courseStandfirst, courseSteps, numberWord } from "@/lib/course";

/**
 * The Baron's Course as one booklet to print (owner 2026-10-23: "print it out … not to get distracted"): a title page
 * with the contents and a box to tick by hand for each paper, then every paper in order, each from a new page, with
 * its notes and sources, in the papers' own print style (.paper-print in globals.css). A subscriber paper prints what
 * this device may read: its public text and a note, or the whole paper once the subscriber key is here. Out of search
 * and out of the sitemap; the course page links to it. The same booklet as a PDF, to download or to attach to an
 * email (owner: "can then be emailed out also"), is made on the Mac by scripts/make-booklet-pdf.py.
 */
export const metadata: Metadata = {
  title: `${COURSE_NAME}: the booklet to print`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${COURSE_PATH}print/` },
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const PDF = "The-Barons-Course-Baronage-of-Scotland-Association.pdf";

/** The PDF's size in whole megabytes, or null while there is none. */
function pdfMegabytes() {
  try {
    return Math.max(1, Math.round(statSync(join(process.cwd(), "public", "the-barons-course", PDF)).size / 1e6));
  } catch {
    return null;
  }
}
const published = new Map(readingRoomPapers.map((p) => [p.slug, p]));

/** Twelve papers on one page: give each paper's anchors (notes, headings) a prefix of its own so none collide. */
const prefixIds = (html: string, pfx: string) =>
  html.replace(/\bid="([^"]+)"/g, `id="${pfx}$1"`).replace(/href="#([^"]+)"/g, `href="#${pfx}$1"`);
/** Every picture loads with the page, so none is left blank on paper. */
const eager = (html: string) => html.replace(/ loading="lazy"/g, "");
const words = (html: string) => html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

export default function EssentialReadingBookletPage() {
  const papers = courseSteps.map((step) => ({ step, paper: published.get(step.slug)! }));
  const count = numberWord(courseSteps.length);

  // About how many A4 pages: the title page and the contents page, the text, the notes and sources in smaller type, the
  // pictures, and the part page each paper leaves blank at its end. Matched to a print of 23 Oct 2026 (97 pages);
  // shown to the nearest five.
  const pageCount =
    2 +
    papers.reduce(
      (n, { paper }) =>
        n +
        words(paper.html) / 450 +
        words(paper.footnotesHtml + paper.sourcesHtml) / 600 +
        (paper.html.match(/<img/g) ?? []).length * 0.45 +
        0.5,
      0,
    );
  const about = Math.max(5, Math.round(pageCount / 5) * 5);
  const pdfMb = pdfMegabytes();

  return (
    <Section tone="parchment" className="!py-12 sm:!py-16 print:!py-0">
      <Container size="prose">
        {/* On screen only: what this is, and the button */}
        <div className="no-print mb-14 max-w-[68ch] border border-gold/50 bg-parchment-50 p-6 sm:p-8">
          <p className="eyebrow">Print to read</p>
          <p className="mt-3 font-display text-3xl leading-tight text-navy sm:text-4xl">{COURSE_NAME}: the booklet</p>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft sm:text-xl">
            All {count} papers in order, each starting on a new page, with their notes and sources: about {about} printed
            pages. The contents page lists the papers with a box to tick as you finish each one.
          </p>
          {pdfMb && (
            <p className="mt-3 font-serif text-lg leading-relaxed text-ink-soft sm:text-xl">
              Or keep it as a PDF, to read on a tablet or to send by email.
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <PrintButton label="Print the booklet" />
            {pdfMb && (
              <a
                href={`${COURSE_PATH}${PDF}`}
                download
                className="inline-flex min-h-[3rem] items-center gap-3 border-2 border-navy px-5 py-2.5 font-sans text-[1.05rem] font-semibold text-navy transition-colors hover:border-oxblood hover:text-oxblood"
              >
                <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M4 19h16" />
                </svg>
                Download the PDF ({pdfMb} MB)
              </a>
            )}
            <Link
              href={COURSE_PATH}
              className="font-sans text-[0.95rem] font-semibold text-oxblood underline decoration-oxblood/40 underline-offset-4 hover:decoration-oxblood"
            >
              ← Back to {COURSE_NAME}
            </Link>
          </div>
        </div>

        {/* Title page and contents */}
        <section className="paper-print booklet-cover">
          <div className="text-center">
            <Seal tone="ink" size="sm" alt="" aria-hidden className="mx-auto h-28 w-auto sm:h-32" />
            <p className="eyebrow mt-6">Baronage of Scotland Association · The Reading Room</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-navy sm:text-6xl">{COURSE_NAME}</h1>
            <p className="mx-auto mt-4 max-w-[52ch] font-serif text-xl italic leading-relaxed text-ink-soft">
              {courseStandfirst()}
            </p>
            <p className="print-only paper-print__source">www.baronage.com{COURSE_PATH}</p>
          </div>

          <div className="booklet-contents mt-12 border-t border-gold/40 pt-8">
            <p className="font-display text-2xl text-navy">Contents</p>
            <p className="mt-1 font-serif text-lg italic text-ink-soft">Tick each paper as you finish it.</p>
            {COURSE_PARTS.map((partTitle, pi) => {
              const inPart = courseSteps.filter((s) => s.part === pi + 1);
              if (!inPart.length) return null;
              return (
                <div key={partTitle} className="booklet-part mt-6">
                  <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                    Part {ROMAN[pi]} · {partTitle}
                  </p>
                  <ol className="mt-2 space-y-3">
                    {inPart.map((s) => (
                      <li key={s.slug} className="grid grid-cols-[1.4rem_2rem_1fr] items-start gap-x-3">
                        <span aria-hidden className="booklet-box mt-1 block h-[1.15rem] w-[1.15rem] border-[1.5px] border-navy" />
                        <span className="font-display text-xl leading-snug text-gold-deep">{s.n}.</span>
                        <span>
                          <span className="block font-display text-xl leading-snug text-navy">{s.title}</span>
                          <span className="block font-serif text-base leading-snug text-ink-soft">
                            {s.lesson} <span className="whitespace-nowrap">({s.readingTime})</span>
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </section>

        {papers.map(({ step, paper }) => {
          const pfx = `p${step.n}-`;
          const html = eager(prefixIds(paper.html, pfx));
          const footnotesHtml = prefixIds(paper.footnotesHtml, pfx);
          const sourcesHtml = prefixIds(paper.sourcesHtml, pfx);
          const address = `www.baronage.com/reading-room/${paper.slug}/`;
          return (
            <article key={paper.slug} id={paper.slug} className="paper-print booklet-paper mt-20 border-t-2 border-gold/50 pt-14">
              <header>
                <p className="eyebrow">
                  Paper {step.n} of {courseSteps.length} · Part {ROMAN[step.part - 1]} · {COURSE_PARTS[step.part - 1]}
                </p>
                <h2 className="booklet-title mt-4 font-display text-4xl leading-[1.08] text-navy sm:text-5xl">{paper.title}</h2>
                <p className="mt-4 font-serif text-xl italic leading-relaxed text-ink-soft sm:text-2xl">{paper.subtitle}</p>
                <p className="paper-print__source mt-3 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  {paper.readingTime} read · {address}
                </p>
              </header>
              {paper.gated ? (
                <SealedPaper
                  slug={paper.slug}
                  mode={paper.gated}
                  html={html}
                  footnotesHtml={footnotesHtml}
                  sourcesHtml={sourcesHtml}
                  lockedNote={
                    <>
                      {paper.gated === "full"
                        ? "This is a free subscriber paper, so only its title prints here. "
                        : "Some passages of this paper are for subscribers and are not printed here. "}
                      To print it in full, subscribe free at {address}, open the link in the confirmation email on this
                      device, and print this booklet again.
                    </>
                  }
                />
              ) : (
                <PaperBody html={html} footnotesHtml={footnotesHtml} sourcesHtml={sourcesHtml} />
              )}
            </article>
          );
        })}

        <section className="paper-print booklet-end mt-16 border-t-2 border-gold/50 pt-10">
          <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">
            Then: the Roll and the Pledge
          </p>
          <p className="mt-2 font-serif text-lg leading-relaxed text-navy">
            The Roll of Scottish Barons: www.baronage.com/the-roll/
            <br />
            The Pledge: www.baronage.com/pledge/
          </p>
        </section>
      </Container>
    </Section>
  );
}
