import type { Metadata } from "next";
import { Seal } from "@/components/Seal";
import { ConfirmSubscription } from "@/components/ConfirmSubscription";
import { Container, GoldRule, Section } from "@/components/primitives";

/**
 * Where the confirmation email's link lands (our own newsletter list; see MAIL_API in lib/site). The page confirms
 * nothing by itself: the reader presses the button, so mail scanners that fetch the link sign no one up. Large type
 * for older readers, as on /welcome/. Out of search and out of the sitemap.
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
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.08] text-navy sm:text-[3.6rem]">One last step</h1>
          <GoldRule className="mt-8" />
          <ConfirmSubscription />
        </div>
      </Container>
    </Section>
  );
}
