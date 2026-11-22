import type { Metadata } from "next";
import { Seal } from "@/components/Seal";
import { ConfirmSubscription } from "@/components/ConfirmSubscription";
import { Container, GoldRule, Section } from "@/components/primitives";

/**
 * Where the confirmation email's link lands (our own newsletter list; see MAIL_API in lib/site). It confirms at once
 * in the reader's browser and moves on to /welcome/ (owner 2026-11-22: no "one last step" button; see
 * components/ConfirmSubscription). Large type for older readers, as on /welcome/. Out of search and out of the sitemap.
 */
export const metadata: Metadata = {
  title: "Confirm your subscription",
  robots: { index: false, follow: false },
};

export default function ConfirmPage() {
  return (
    <Section tone="parchment" className="!pt-16 sm:!pt-24">
      <Container size="prose">
        <div className="flex flex-col items-center text-center">
          <Seal size="xs" className="h-20 w-20" />
          <p className="eyebrow mt-6">Baronage of Scotland Association</p>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.08] text-navy sm:text-[3.6rem]">Confirming your subscription</h1>
          <GoldRule className="mt-8" />
          <ConfirmSubscription />
        </div>
      </Container>
    </Section>
  );
}
