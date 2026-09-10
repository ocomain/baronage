import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { Container, GoldRule, Section } from "@/components/primitives";
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
          <section key={group.category} aria-label={group.category} className="mt-12">
            <h2 className="eyebrow !font-semibold">{group.category}</h2>
            <ul className="mt-4 divide-y divide-parchment-300/70 border-y border-parchment-300/70">
              {group.papers.map((paper) => (
                <li key={paper.slug} className="py-6">
                  <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted">
                    {paper.category}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-snug text-navy sm:text-3xl">
                    <Link href={`/reading-room/${paper.slug}`} className="transition-colors hover:text-oxblood">
                      {paper.title}
                    </Link>
                  </h3>
                  <p className="mt-2 font-serif text-lg italic leading-relaxed text-ink-soft">{paper.subtitle}</p>
                  <p className="mt-3 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                    {paper.readingTime} read
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>
    </Section>
  );
}
