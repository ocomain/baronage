import { notFound } from "next/navigation";
import { renderNewsOgImage } from "@/lib/og-news";
import { newsPosts } from "@/lib/news";

// Static export, as the paper cards: the param carries the ".png" suffix so each card is written to
// out/og/news/<slug>.png and served with an image content type.
export const dynamic = "force-static";
export const dynamicParams = false;

// With no posts, one general News card, as the export needs at least one.
export function generateStaticParams() {
  return newsPosts.length ? newsPosts.map((p) => ({ image: `${p.slug}.png` })) : [{ image: "news.png" }];
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const post = newsPosts.find((p) => `${p.slug}.png` === image);
  if (post) return renderNewsOgImage(post);
  if (image !== "news.png") notFound();
  return renderNewsOgImage({ slug: "news", category: "In Memoriam", published: "", title: "Announcements", text: "" });
}
