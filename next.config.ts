import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — the site is fully static and deploys to GitHub Pages.
  output: "export",
  // Clean directory URLs (/history/ -> history/index.html) for static hosting.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
