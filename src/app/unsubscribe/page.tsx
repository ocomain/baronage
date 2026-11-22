import type { Metadata } from "next";
import { Seal } from "@/components/Seal";
import { UnsubscribeForm } from "@/components/UnsubscribeForm";
import { Container, GoldRule, Section } from "@/components/primitives";

/** Leave the free newsletter (our own list; see MAIL_API in lib/site). Large type for older readers. Out of search and the sitemap. */
export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <Section tone="parchment" className="!pt-16 sm:!pt-24">
      <Container size="prose">
        <div className="flex flex-col items-center text-center">
          <Seal size="xs" className="h-20 w-20" />
          <p className="eyebrow mt-6">Baronage of Scotland Association</p>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.08] text-navy sm:text-[3.6rem]">Leave the newsletter</h1>
          <GoldRule className="mt-8" />
          <UnsubscribeForm />
        </div>
      </Container>
    </Section>
  );
}
