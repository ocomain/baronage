import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";
import { Container, Section } from "@/components/primitives";
import { NewsCategoryTabs, NewsList } from "@/components/NewsList";
import { NEWS_CATEGORIES, categoryBySlug, newsPosts } from "@/lib/news";

// Static export: one page for each category that has a post (every category while there are none, as the export needs
// at least one page; it then says there is no news yet).
export const dynamicParams = false;

const used = () => NEWS_CATEGORIES.filter((c) => newsPosts.some((p) => p.category === c.name));

export function generateStaticParams() {
  return (used().length ? used() : NEWS_CATEGORIES).map((c) => ({ category: c.slug }));
}

type Props = { params: Promise<{ category: string }> };

const STANDFIRSTS: Record<string, string> = {
  "in-memoriam": "Notices of barons and peers on the Roll who have died, with the Association’s condolences to their families.",
  congratulations: "Marriages and births in the families of barons and peers on the Roll, with the Association’s congratulations.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = categoryBySlug(category);
  if (!c) return {};
  return pageMetadata({
    title: `${c.name} · News`,
    description: STANDFIRSTS[c.slug] ?? `${c.name}: news from the Association.`,
    path: `/news/${c.slug}/`,
    image: { url: `${SITE_URL}/og/news-index/${c.slug}.png`, width: 1200, height: 630, alt: `${c.name}: news from the Baronage of Scotland Association` },
  });
}

export default async function NewsCategoryPage({ params }: Props) {
  const { category } = await params;
  const c = categoryBySlug(category);
  if (!c) notFound();
  const posts = newsPosts.filter((p) => p.category === c.name);
  return (
    <>
      {/* No hero, as on the News page (owner 2026-10-26); the standfirst stays as the page description */}
      <Section tone="parchment" className="!pt-10 sm:!pt-12">
        <Container>
          <h1 className="mb-6 font-display text-4xl leading-[1.05] text-navy sm:text-5xl">{c.name}</h1>
          <NewsCategoryTabs current={c.slug} categories={used()} />
          <NewsList posts={posts} showCategory={false} />
        </Container>
      </Section>
    </>
  );
}
