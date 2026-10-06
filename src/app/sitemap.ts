export const dynamic = "force-static";

import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { readingRoomPapers } from "@/generated/reading-room";

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
    ["/armorial", ["src/app/armorial"]],
    ["/history", ["src/app/history", "src/components/HistoryChapters.tsx"]],
    ["/proper-address", ["src/app/proper-address"]],
    ["/baronial-code", ["src/app/baronial-code"]],
    ["/pledge", ["src/app/pledge"]],
    ["/charitable-trust", ["src/app/charitable-trust"]],
    ["/governing-council", ["src/app/governing-council"]],
    ["/about", ["src/app/about"]],
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

  return [...pages, ...papers];
}
