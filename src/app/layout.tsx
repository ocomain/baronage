import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Quicksand } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";

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
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Baronage of Scotland Association — The Ancient Nobility of Scotland",
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
    url: SITE_URL,
    siteName: "Baronage of Scotland Association",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Eilean Donan castle at dusk with the seal of the Baronage of Scotland Association" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baronage of Scotland Association",
    description:
      "The ancient nobility of Scotland — verified, recorded, and preserved for future generations.",
    images: ["/og.jpg"],
  },
  // NOTE: no global canonical here — a layout-level canonical is inherited by every
  // page and would mark them all as duplicates of the homepage. Each page sets its own.
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
  url: SITE_URL,
  logo: `${SITE_URL}/seal-gold.png`,
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
        {/* Legacy one-page anchors from the old Canva site -> new pages */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'var __m={"#page-2":"/proper-address/","#governing-council":"/governing-council/","#about":"/about/"};var __t=__m[location.hash];if(__t)location.replace(__t);',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {/* Cloudflare Web Analytics — privacy-first, cookieless */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "15c0a029804c41d8b4c3223aeee42148"}'
        ></script>
        {/* Microsoft Clarity — heatmaps & session recordings */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "xb0q6mjkpd");',
          }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
