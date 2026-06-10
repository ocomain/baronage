import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#faf6ec",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://baronage.com"),
  title: {
    default: "Baronage of Scotland Association — Preserving the Heritage of Scottish Barons",
    template: "%s · Baronage of Scotland Association",
  },
  description:
    "The ancient nobility of Scotland — verified, recorded, and preserved for future generations. The Association maintains the Roll of Scottish Barons, an open, verified register of titles.",
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
      "The ancient nobility of Scotland — verified, recorded, and preserved for future generations.",
    type: "website",
    locale: "en_GB",
    url: "https://baronage.com",
    siteName: "Baronage of Scotland Association",
    // NOTE go-live: revert these image URLs to "/og.jpg" once the site serves at baronage.com
    images: [{ url: "https://new.baronage.com/og.jpg", width: 1200, height: 630, alt: "Eilean Donan castle at dusk with the seal of the Baronage of Scotland Association" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baronage of Scotland Association",
    description:
      "The ancient nobility of Scotland — verified, recorded, and preserved for future generations.",
    images: ["https://new.baronage.com/og.jpg"],
  },
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Baronage of Scotland Association",
  url: "https://baronage.com",
  logo: "https://baronage.com/seal-gold.png",
  description:
    "The ancient nobility of Scotland — verified, recorded, and preserved for future generations. A non-profit honourable body and keeper of the Roll of Scottish Barons.",
  email: "secretary@baronage.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5 South Charlotte Street",
    addressLocality: "Edinburgh",
    postalCode: "EH2 4AN",
    addressCountry: "GB",
  },
  sameAs: ["https://roll.baronage.com"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
