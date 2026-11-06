export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/sealed/" },
      // owner 2026-11-06: keep the Members page off the Wayback Machine. A bot named here reads only this group,
      // so /sealed/ is repeated for it.
      { userAgent: ["ia_archiver", "archive.org_bot"], disallow: ["/sealed/", "/members/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
