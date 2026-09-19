import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { Container, Eyebrow, Section } from "@/components/primitives";
import { ReadingRoomGrid, type PaperCard } from "@/components/ReadingRoomGrid";
import { FEATURED_PAPER } from "@/lib/site";
import { readingRoomCategories, readingRoomPapers } from "@/generated/reading-room";

const STANDFIRST =
  "Papers on the baronage of Scotland — its law, its history, its words and its insignia — written from the sources, with page references so you can check them.";

export const metadata: Metadata = pageMetadata({
  title: "The Reading Room",
  description: STANDFIRST,
  path: "/reading-room/",
});

export default function ReadingRoomPage() {
  // Pinned papers first (featured paper leads), pinned-last papers at the end; the rest newest first,
  // and papers of the same day keep the editorial category order.
  const pinnedFirst = [FEATURED_PAPER.slug, "barons-in-the-lyon-courts-own-words", "lairds-lords-and-barons"];
  const pinnedLast = ["non-peerage-earldoms", "barons-in-the-gazette"];
  const rank = (slug: string) =>
    pinnedFirst.includes(slug) ? pinnedFirst.indexOf(slug) - pinnedFirst.length : pinnedLast.includes(slug) ? 1 + pinnedLast.indexOf(slug) : 0;
  const editorial = new Map(readingRoomPapers.map((p, i) => [p.slug, i]));
  const papers: PaperCard[] = [...readingRoomPapers]
    .sort(
      (a, b) =>
        rank(a.slug) - rank(b.slug) ||
        b.published.localeCompare(a.published) ||
        readingRoomCategories.indexOf(a.category) - readingRoomCategories.indexOf(b.category) ||
        (editorial.get(a.slug) ?? 0) - (editorial.get(b.slug) ?? 0),
    )
    .map(({ slug, title, subtitle, category, readingTime, published }) => ({
      slug,
      title,
      subtitle,
      category,
      readingTime,
      published,
    }));
  // Only subjects that have papers get a filter.
  const categories = readingRoomCategories.filter((c) => papers.some((p) => p.category === c));

  return (
    <>
      {/* Compact masthead, as on the Armorial — the papers themselves are the show */}
      <section className="bg-navy-deep text-parchment-50 texture-saltire">
        <Container className="py-12 text-center sm:py-14">
          <p className="rise eyebrow eyebrow--light">Reference</p>
          <h1
            className="rise mt-4 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            The Reading Room
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-lg italic leading-relaxed text-parchment-200/85 sm:text-xl">
            {STANDFIRST}
          </p>
        </Container>
      </section>

      <Section tone="parchment" className="!pt-10 sm:!pt-12">
        <Container>
          <aside className="mx-auto mb-10 max-w-3xl border-l-4 border-gold bg-parchment-100 px-6 py-4 sm:px-8">
            <Eyebrow>Important to read</Eyebrow>
            <p className="mt-2 font-serif text-lg leading-relaxed text-navy">
              Before the papers below, read{" "}
              <Link
                href="/scottish-baronies-explained"
                className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
              >
                Scottish Baronies, Explained
              </Link>
              , our FAQ answering the questions people ask most about baronial titles.
            </p>
          </aside>
          <ReadingRoomGrid papers={papers} categories={categories} featuredSlug={FEATURED_PAPER.slug} />
        </Container>
      </Section>
    </>
  );
}
