import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";
import { Container, Section } from "@/components/primitives";
import { NewsCategoryTabs, NewsList } from "@/components/NewsList";
import { NEWS_CATEGORIES, categoryBySlug, newsPosts } from "@/lib/news";

// Static export: one page for each category that has a post (every category while there are none, as the export needs
// at least one page; it then says there are no announcements yet).
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

/** The tabs that carry the old saying (owner 2026-10-31): it would sit oddly above a Roll update. */
const WITH_SAYING = ["in-memoriam", "congratulations"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = categoryBySlug(category);
  if (!c) return {};
  return pageMetadata({
    title: `${c.name} · Announcements`,
    description: STANDFIRSTS[c.slug] ?? `${c.name}: announcements from the Association.`,
    path: `/news/${c.slug}/`,
    image: { url: `${SITE_URL}/og/news-index/${c.slug}.png`, width: 1200, height: 630, alt: `${c.name}: announcements from the Baronage of Scotland Association` },
  });
}

export default async function NewsCategoryPage({ params }: Props) {
  const { category } = await params;
  const c = categoryBySlug(category);
  if (!c) notFound();
  const posts = newsPosts.filter((p) => p.category === c.name);
  return (
    <>
      {/* No hero, as on the Announcements page (owner 2026-10-26); the standfirst stays as the page description */}
      <Section tone="parchment" className="!pt-10 sm:!pt-12">
        <Container>
          {WITH_SAYING.includes(c.slug) ? (
            // owner 2026-10-27: the old saying after the heading, with a dash
            <div className="mb-6 sm:flex sm:items-baseline sm:gap-x-4">
              <h1 className="font-display text-4xl leading-[1.05] text-navy sm:flex-none sm:text-5xl">{c.name}</h1>
              <p className="mt-2 font-serif text-xl italic leading-snug text-ink-soft sm:mt-0 sm:text-2xl">
                <span className="hidden sm:inline" aria-hidden="true">
                  —{" "}
                </span>
                As the saying goes, a gentleman should only be written about at his birth, his marriage and his death.
              </p>
            </div>
          ) : (
            <h1 className="mb-6 font-display text-4xl leading-[1.05] text-navy sm:text-5xl">{c.name}</h1>
          )}
          <NewsCategoryTabs current={c.slug} categories={used()} />
          <NewsList posts={posts} showCategory={false} />
        </Container>
      </Section>
    </>
  );
}
