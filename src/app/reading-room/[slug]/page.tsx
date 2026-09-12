import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/ArticleShell";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";
import { readingRoomPapers } from "@/generated/reading-room";

// Static export: every paper is prerendered from the generated module; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return readingRoomPapers.map((paper) => ({ slug: paper.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const getPaper = (slug: string) => readingRoomPapers.find((p) => p.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) return {};
  return pageMetadata({
    title: paper.title,
    description: paper.description,
    path: `/reading-room/${paper.slug}/`,
    image: {
      url: `${SITE_URL}/og/reading-room/${paper.slug}.png`,
      width: 1200,
      height: 630,
      alt: `${paper.title} — a paper in the Reading Room of the Baronage of Scotland Association`,
    },
  });
}

export default async function ReadingRoomPaperPage({ params }: Props) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  // Up to three other papers, same category first, in the index's editorial order.
  const others = readingRoomPapers.filter((p) => p.slug !== paper.slug);
  const related = [
    ...others.filter((p) => p.category === paper.category),
    ...others.filter((p) => p.category !== paper.category),
  ].slice(0, 3);

  const url = `${SITE_URL}/reading-room/${paper.slug}/`;
  const organisation = { "@type": "Organization", name: "Baronage of Scotland Association", url: SITE_URL };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: paper.title,
    description: paper.description,
    author: organisation,
    publisher: organisation,
    datePublished: paper.published,
    dateModified: paper.reviewed,
    about: { "@type": "Thing", name: "Baronage of Scotland" },
    articleSection: paper.category,
    wordCount: paper.wordCount,
    inLanguage: "en-GB",
    mainEntityOfPage: url,
    url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <ArticleShell paper={paper} related={related} />
    </>
  );
}
