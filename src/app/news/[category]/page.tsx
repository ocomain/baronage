import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/page-metadata";
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
  return pageMetadata({ title: `${c.name} · News`, description: STANDFIRSTS[c.slug] ?? `${c.name}: news from the Association.`, path: `/news/${c.slug}/` });
}

export default async function NewsCategoryPage({ params }: Props) {
  const { category } = await params;
  const c = categoryBySlug(category);
  if (!c) notFound();
  const posts = newsPosts.filter((p) => p.category === c.name);
  return (
    <>
      <section className="bg-navy-deep text-parchment-50 texture-saltire">
        <Container className="py-12 text-center sm:py-14">
          <p className="rise eyebrow eyebrow--light">News</p>
          <h1
            className="rise mt-4 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            {c.name}
          </h1>
          {STANDFIRSTS[c.slug] && (
            <p className="mx-auto mt-4 max-w-2xl font-serif text-lg italic leading-relaxed text-parchment-200/85 sm:text-xl">
              {STANDFIRSTS[c.slug]}
            </p>
          )}
        </Container>
      </section>
      <Section tone="parchment" className="!pt-10 sm:!pt-12">
        <Container>
          <NewsCategoryTabs current={c.slug} categories={used()} />
          <NewsList posts={posts} showCategory={false} />
        </Container>
      </Section>
    </>
  );
}
