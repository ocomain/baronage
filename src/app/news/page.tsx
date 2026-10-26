import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Container, Section } from "@/components/primitives";
import { NewsCategoryTabs, NewsList } from "@/components/NewsList";
import { NEWS_CATEGORIES, newsPosts } from "@/lib/news";

const STANDFIRST = "Notices from the Baronage of Scotland Association, newest first.";

export const metadata: Metadata = pageMetadata({
  title: "News",
  description: STANDFIRST,
  path: "/news/",
});

/** News (owner 2026-10-26): every post, newest first; In Memoriam is the first category. */
export default function NewsPage() {
  const used = NEWS_CATEGORIES.filter((c) => newsPosts.some((p) => p.category === c.name));
  return (
    <>
      {/* Compact masthead, as on the Reading Room */}
      <section className="bg-navy-deep text-parchment-50 texture-saltire">
        <Container className="py-12 text-center sm:py-14">
          <p className="rise eyebrow eyebrow--light">The Association</p>
          <h1
            className="rise mt-4 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            News
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-lg italic leading-relaxed text-parchment-200/85 sm:text-xl">
            {STANDFIRST}
          </p>
        </Container>
      </section>
      <Section tone="parchment" className="!pt-10 sm:!pt-12">
        <Container>
          <NewsCategoryTabs current={null} categories={used} />
          <NewsList posts={newsPosts} />
        </Container>
      </Section>
    </>
  );
}
