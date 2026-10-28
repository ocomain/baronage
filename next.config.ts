import type { NextConfig } from "next";
import { readFileSync } from "node:fs";

// The Reading Room Quiz (src/lib/quiz.ts) shows the latest quiz whose Monday has come by the London day of the build;
// the deploy workflow rebuilds every Monday morning to move it on. QUIZ_BUILD_DAY=YYYY-MM-DD overrides the day, to
// preview a week ahead.
const QUIZ_BUILD_DAY =
  process.env.QUIZ_BUILD_DAY ||
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const quizWeeks: string[] = JSON.parse(readFileSync("content/quiz/quizzes.json", "utf8")).map((q: { week: string }) => q.week);

const nextConfig: NextConfig = {
  // Static export — the site is fully static and deploys to GitHub Pages.
  output: "export",
  // Clean directory URLs (/history/ -> history/index.html) for static hosting.
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    QUIZ_BUILD_DAY,
    // "1" once a quiz has begun: the menu item and the homepage panel appear only then.
    QUIZ_LIVE: quizWeeks.some((w) => w <= QUIZ_BUILD_DAY) ? "1" : "",
  },
};

export default nextConfig;
