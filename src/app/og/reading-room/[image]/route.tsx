import { notFound } from "next/navigation";
import { renderPaperOgImage } from "@/lib/og-paper";
import { readingRoomPapers } from "@/generated/reading-room";

// Static export: the params carry the ".png" suffix so each card is written to
// out/og/reading-room/<slug>.png and served with an image content type.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return readingRoomPapers.map((paper) => ({ image: `${paper.slug}.png` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const paper = readingRoomPapers.find((p) => `${p.slug}.png` === image);
  if (!paper) notFound();
  return renderPaperOgImage(paper);
}
