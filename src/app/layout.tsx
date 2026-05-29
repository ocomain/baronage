import type { Metadata } from "next";
import { Cormorant_Garamond, Quicksand } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Matches the brand fonts used on roll.baronage.com
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://baronage.com"),
  title: {
    default: "Baronage of Scotland Association — Preserving the Heritage of Scottish Barons",
    template: "%s · Baronage of Scotland Association",
  },
  description:
    "The Baronage of Scotland Association preserves the historical rights, heritage and dignity of Scottish Barons, and maintains the Roll of Scottish Barons — an open, verified register of titles.",
  keywords: [
    "Baronage of Scotland Association",
    "Scottish Barons",
    "Roll of Scottish Barons",
    "Scottish barony title",
    "Scottish nobility",
    "heraldry",
  ],
  openGraph: {
    title: "Baronage of Scotland Association",
    description:
      "Preserving the noble heritage of Scottish Barons and providing value in society in the modern era.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-parchment text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
