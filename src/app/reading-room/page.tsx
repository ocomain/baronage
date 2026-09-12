import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { Container, Eyebrow, GoldRule, Section } from "@/components/primitives";
import { PaperThumbnail } from "@/components/PaperThumbnail";
import { readingRoomCategories, readingRoomPapers } from "@/generated/reading-room";

const STANDFIRST =
  "Papers on the baronage of Scotland — its law, its history, its words and its insignia — written from the sources, with page references so you can check them.";

export const metadata: Metadata = pageMetadata({
  title: "The Reading Room",
  description: STANDFIRST,
  path: "/reading-room/",
});

export default function ReadingRoomPage() {
  // Fixed editorial order; only categories that have papers are shown.
  const groups = readingRoomCategories
    .map((category) => ({ category, papers: readingRoomPapers.filter((p) => p.category === category) }))
    .filter((g) => g.papers.length > 0);

  return (
    <Section tone="parchment" className="!py-12 sm:!py-16">
      <Container size="prose">
        <header>
          <p className="eyebrow">Reference</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] text-navy sm:text-5xl">The Reading Room</h1>
          <p className="mt-4 font-serif text-xl italic leading-relaxed text-ink-soft sm:text-2xl">{STANDFIRST}</p>
          <GoldRule className="mt-6" align="start" />
        </header>

        {groups.map((group) => (
          <Fragment key={group.category}>
            <section aria-label={group.category} className="mt-12">
              <h2 className="eyebrow !font-semibold">{group.category}</h2>
              <ul className="mt-4 divide-y divide-parchment-300/70 border-y border-parchment-300/70">
                {group.papers.map((paper) => (
                  <li key={paper.slug}>
                    <Link
                      href={`/reading-room/${paper.slug}`}
                      className="group flex items-start gap-4 py-6 sm:gap-6 sm:py-8"
                    >
                      <PaperThumbnail title={paper.title} category={paper.category} size="responsive" />
                      <span className="flex min-w-0 flex-1 flex-col gap-2">
                        <span className="font-display text-[1.35rem] leading-tight text-navy transition-colors group-hover:text-oxblood">
                          {paper.title}
                        </span>
                        <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted">
                          {paper.category} · {paper.readingTime} read
                        </span>
                        <span className="font-serif text-base italic leading-relaxed text-ink-soft sm:text-lg">
                          {paper.subtitle}
                        </span>
                        <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-deep transition-colors group-hover:text-oxblood">
                          Read the paper →
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {group.category === "Heritage & Sources" && (
              <aside className="mt-12 border-l-4 border-gold bg-parchment-100 px-6 py-6 sm:px-8 sm:py-7">
                <Eyebrow>Important to read</Eyebrow>
                <p className="mt-3 font-serif text-lg leading-relaxed text-navy sm:text-xl">
                  Before the papers below, read{" "}
                  <Link href="/scottish-baronies-explained" className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood">
                    Scottish Baronies, Explained
                  </Link>
                  , our FAQ answering the questions people ask most about baronial titles.
                </p>
              </aside>
            )}
          </Fragment>
        ))}
      </Container>
    </Section>
  );
}
