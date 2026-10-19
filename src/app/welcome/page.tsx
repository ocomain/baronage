import type { Metadata } from "next";
import { Seal } from "@/components/Seal";
import { ButtonLink, Container, GoldRule, Section } from "@/components/primitives";

/**
 * Where Zoho Campaigns sends a new subscriber after they confirm (owner 2026-10-20: Zoho's own thank-you page had the
 * Reading Room address as plain text in tiny type: "should be huge … these are old people"). Zoho's list setting
 * points here with the subscriber key after "#key=", which the script in app/layout.tsx keeps on the device; the key
 * itself is never in this file or the repository. Out of search and out of the sitemap.
 */
export const metadata: Metadata = {
  title: "Thank you for subscribing",
  robots: { index: false, follow: false },
};

export default function WelcomePage() {
  return (
    <Section tone="parchment" className="!pt-16 sm:!pt-24">
      <Container size="prose">
        <div className="flex flex-col items-center text-center">
          <Seal size="xs" className="h-20 w-20" />
          <p className="eyebrow mt-6">Baronage of Scotland Association</p>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.08] text-navy sm:text-[3.6rem]">
            Thank you. You are subscribed.
          </h1>
          <GoldRule className="mt-8" />
          <p className="mt-8 max-w-2xl font-serif text-[1.6rem] leading-snug text-ink sm:text-[1.9rem]">
            Every paper in the Reading Room, including the subscriber papers, is now open to you on this device.
          </p>
          <ButtonLink href="/reading-room/" className="mt-10 !px-8 !py-6 !text-[1.05rem] !tracking-[0.06em] sm:!px-10 sm:!tracking-[0.14em]">
            Open the Reading Room
          </ButtonLink>
          <p className="mt-10 max-w-xl text-[1.25rem] leading-relaxed text-ink-soft">
            New papers and the Council’s declarations will come to you by email.
          </p>
        </div>
      </Container>
    </Section>
  );
}
