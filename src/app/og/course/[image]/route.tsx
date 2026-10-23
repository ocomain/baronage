import { notFound } from "next/navigation";
import { renderCourseOgImage } from "@/lib/og-course";

// Static export, as the paper cards: the param carries the ".png" suffix so the card is written to
// out/og/course/the-barons-course.png and served with an image content type.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ image: "the-barons-course.png" }];
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  if (image !== "the-barons-course.png") notFound();
  return renderCourseOgImage();
}
