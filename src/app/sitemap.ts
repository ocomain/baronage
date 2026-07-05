export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/the-roll",
    "/scottish-baronies-explained",
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
  return routes.map((path) => ({
    url: `${BASE}${path}/`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === "" ? 1 : path === "/the-roll" || path === "/scottish-baronies-explained" ? 0.9 : 0.7,
  }));
}
