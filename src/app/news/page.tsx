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
          <h1 className="mb-6 font-display text-4xl leading-[1.05] text-navy sm:text-5xl">News</h1>
          <NewsCategoryTabs current={null} categories={used} />
          <NewsList posts={newsPosts} />
        </Container>
      </Section>
    </>
  );
}
