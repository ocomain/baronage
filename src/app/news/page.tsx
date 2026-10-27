import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";
import { Container, Section } from "@/components/primitives";
import { NewsCategoryTabs, NewsList } from "@/components/NewsList";
import { NEWS_CATEGORIES, newsPosts } from "@/lib/news";

const STANDFIRST = "Notices from the Baronage of Scotland Association.";

export const metadata: Metadata = pageMetadata({
  title: "News",
  description: STANDFIRST,
  path: "/news/",
  image: { url: `${SITE_URL}/og/news-index/news.png`, width: 1200, height: 630, alt: "News from the Baronage of Scotland Association" },
});

/** News (owner 2026-10-26): every post, newest first; In Memoriam is the first category. No hero (owner: "it should just
 * get on with it"): a plain heading, the category tabs, then the notices. */
export default function NewsPage() {
  const used = NEWS_CATEGORIES.filter((c) => newsPosts.some((p) => p.category === c.name));
  return (
    <>
      <Section tone="parchment" className="!pt-10 sm:!pt-12">
        <Container>
          {/* owner 2026-10-27: the old saying after the heading, with a dash */}
          <div className="mb-6 sm:flex sm:items-baseline sm:gap-x-4">
            <h1 className="font-display text-4xl leading-[1.05] text-navy sm:text-5xl">News</h1>
            <p className="mt-2 font-serif text-xl italic leading-snug text-ink-soft sm:mt-0 sm:text-2xl">
              <span className="hidden sm:inline" aria-hidden="true">
                —{" "}
              </span>
              As the saying goes, a gentleman should only be written about at his birth, his marriage and his death.
            </p>
          </div>
          <NewsCategoryTabs current={null} categories={used} />
          <NewsList posts={newsPosts} />
        </Container>
      </Section>
    </>
  );
}
