import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/primitives";

/**
 * Hidden for now (owner 2026-10-19, via the "Baron membership strategy" chat: "let's hide the Charitable Trust page for
 * now then as we have no charity at the moment and this is for our non-profit association"). The address is indexed,
 * so it still answers, but is kept out of search and sends the visitor to About. The full page is in git history:
 * src/app/charitable-trust/page.tsx at 4be9909. Links to it were taken out of the footer, the homepage and the sitemap.
 */
export const metadata: Metadata = {
  title: "About the Association",
  robots: { index: false, follow: true },
};

export default function CharitableTrustPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/about/" />
      <Section tone="cream">
        <Container>
          <p className="py-24 text-center font-serif text-xl text-navy">
            Please continue to{" "}
            <Link href="/about/" className="text-oxblood underline decoration-oxblood/40 underline-offset-4">
              About the Association
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
