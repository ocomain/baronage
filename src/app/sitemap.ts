export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { readingRoomPapers } from "@/generated/reading-room";

const BASE = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/the-roll",
    "/sbr-vs-roll",
    "/scottish-baronies-explained",
    "/reading-room",
    "/armorial",
    "/history",
    "/proper-address",
    "/baronial-code",
    "/pledge",
    "/charitable-trust",
    "/governing-council",
    "/about",
    "/members",
    "/contact",
  ];
  // Trailing slashes match the URLs the site actually serves (trailingSlash: true),
  // so sitemap entries resolve directly instead of via a 301.
  const pages: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${BASE}${path}/`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === "" ? 1 : path === "/the-roll" || path === "/scottish-baronies-explained" ? 0.9 : 0.7,
  }));

  // Reading Room papers — derived from the generated module so new papers are picked up automatically.
  const papers: MetadataRoute.Sitemap = readingRoomPapers.map((paper) => ({
    url: `${BASE}/reading-room/${paper.slug}/`,
    lastModified: new Date(paper.reviewed),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...pages, ...papers];
}
