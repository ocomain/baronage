export const dynamic = "force-static";

import type { MetadataRoute } from "next";

const BASE = "https://baronage.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/the-roll",
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
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/the-roll" ? 0.9 : 0.7,
  }));
}
