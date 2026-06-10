import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, GoldRule, Section, ExternalArrow } from "@/components/primitives";
import { site, CALENDLY_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Call Back",
  description:
    "Book a thirty-minute call with the Secretary of the Baronage of Scotland Association — for membership, the Roll, the Pledge, or the work of the baronage.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Request a Call Back"
        intro="The surest way to reach us is to book a thirty-minute call with the Secretary — for membership, the Roll, the Pledge, or the work of the baronage."
        image="/images/hero-loch-castle.webp"
      />

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <div className="border border-gold/30 bg-parchment-50 p-8 text-center sm:p-12">
              <Eyebrow>Speak with the Secretary</Eyebrow>
              <h2 className="mt-4 text-3xl text-navy sm:text-4xl">Book a thirty-minute call</h2>
              <GoldRule className="mt-6" />
              <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ink-soft">
                Choose a time that suits you and we will call you back — to discuss membership, verifying a title on the
                Roll, the Pledge, or any aspect of the baronage.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-gold px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-navy-deep transition-colors hover:bg-gold-light"
              >
                Request a Call Back
                <ExternalArrow className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 grid gap-8 border-t border-parchment-300/70 pt-10 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow">Secretary</h3>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block font-display text-xl text-navy transition-colors hover:text-oxblood"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <h3 className="eyebrow">Registered Office</h3>
                <address className="mt-3 not-italic leading-relaxed text-ink-soft">
                  {site.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
