export const dynamic = "force-static";

import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { readingRoomPapers } from "@/generated/reading-room";
import { NEWS_CATEGORIES, newsPosts, postPath } from "@/lib/news";

const BASE = SITE_URL;
const BUILD_DATE = new Date();

/**
 * When a page's source last changed, from git. Every page used to claim the build date, which
 * told search engines that all pages change on every publish, so the dates were worthless.
 * The deploy checks out the full history (fetch-depth 0); without it, or outside git, the
 * build date is used.
 */
function lastChanged(...paths: string[]): Date {
  try {
    const out = execSync(`git log -1 --format=%cI -- ${paths.map((p) => JSON.stringify(p)).join(" ")}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (out) return new Date(out);
  } catch {
    /* no git: fall through */
  }
  return BUILD_DATE;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Route -> the files whose change means the page changed (its folder, plus any component that holds its content).
  const routes: [string, string[]][] = [
    ["", ["src/app/page.tsx", "src/components/EasyStart.tsx", "src/components/LiveStats.tsx"]],
    ["/the-roll", ["src/app/the-roll"]],
    ["/sbr-vs-roll", ["src/app/sbr-vs-roll", "src/components/RegisterComparison.tsx"]],
    ["/scottish-baronies-explained", ["src/app/scottish-baronies-explained"]],
    ["/reading-room", ["src/app/reading-room/page.tsx", "content/reading-room"]],
    ["/the-barons-course", ["src/app/the-barons-course", "src/lib/course.ts", "src/components/CoursePanel.tsx"]],
    ["/the-barons-course/certification", ["src/app/the-barons-course/certification"]],
    ["/armorial", ["src/app/armorial"]],
    ["/history", ["src/app/history", "src/components/HistoryChapters.tsx"]],
    ["/proper-address", ["src/app/proper-address"]],
    ["/robes-and-chapeau", ["src/app/robes-and-chapeau", "src/components/GuideChapters.tsx"]],
    ["/court-and-officers", ["src/app/court-and-officers", "src/components/GuideChapters.tsx"]],
    ["/arms-and-flags", ["src/app/arms-and-flags", "src/components/GuideChapters.tsx"]],
    ["/baronial-code", ["src/app/baronial-code"]],
    ["/pledge", ["src/app/pledge"]],
    ["/governing-council", ["src/app/governing-council"]],
    ["/about", ["src/app/about"]],
    ["/support", ["src/app/support"]],
    ["/members", ["src/app/members"]],
    ["/contact", ["src/app/contact"]],
  ];
  // Trailing slashes match the URLs the site actually serves (trailingSlash: true),
  // so sitemap entries resolve directly instead of via a 301.
  const pages: MetadataRoute.Sitemap = routes.map(([path, files]) => ({
    url: `${BASE}${path}/`,
    lastModified: lastChanged(...files),
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

  // News: the index, each category with a post, and every post (written by scripts/publish_memoriam.py and the like).
  const newest = newsPosts[0] ? new Date(newsPosts[0].published) : BUILD_DATE;
  const news: MetadataRoute.Sitemap = [
    { url: `${BASE}/news/`, lastModified: newest, changeFrequency: "weekly", priority: 0.6 },
    ...(process.env.QUIZ_LIVE === "1" ? [{ url: `${BASE}/quiz/`, lastModified: BUILD_DATE, changeFrequency: "weekly" as const, priority: 0.5 }] : []),
    ...NEWS_CATEGORIES.filter((c) => newsPosts.some((p) => p.category === c.name)).map((c) => ({
      url: `${BASE}/news/${c.slug}/`,
      lastModified: new Date(newsPosts.find((p) => p.category === c.name)!.published),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...newsPosts.map((p) => ({ url: `${BASE}${postPath(p)}`, lastModified: new Date(p.published), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];

  return [...pages, ...papers, ...news];
}
