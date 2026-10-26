import { notFound } from "next/navigation";
import { renderNewsIndexOgImage } from "@/lib/og-news";
import { NEWS_CATEGORIES, newsPosts } from "@/lib/news";

// The link-preview card for /news/ (news.png) and for each category page (<category>.png), written out at build time.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ image: "news.png" }, ...NEWS_CATEGORIES.map((c) => ({ image: `${c.slug}.png` }))];
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  if (image === "news.png") return renderNewsIndexOgImage("News", null, newsPosts);
  const c = NEWS_CATEGORIES.find((x) => `${x.slug}.png` === image);
  if (!c) notFound();
  return renderNewsIndexOgImage(c.name, "News", newsPosts.filter((p) => p.category === c.name));
}
