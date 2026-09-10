import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const SITE_NAME = "Baronage of Scotland Association";

/** Shared social image — kept in one place so per-page overrides don't drop it
 *  (Next replaces nested `openGraph`/`twitter` objects wholesale rather than merging). */
export const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Eilean Donan castle at dusk with the seal of the Baronage of Scotland Association",
};

/** Page-level metadata with correct link-preview (Open Graph / Twitter) tags.
 *  `path` must start and end with "/" (e.g. "/sbr-vs-roll/"). */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} · ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_GB",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
