import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Crest } from "@/components/Crest";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, Section, SectionHeading } from "@/components/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Oath & The Pledge",
  description:
    "The Pledge converts a baronial title into a pledged bloodline honour — a family compact of service, sealed by the Baronial Oath.",
};

const pledgePoints = [
  "A declaration that the barony be preserved within the family line as a hereditary dignity.",
  "A commitment to uphold the Baronial Code of Honour and to swear the Baronial Oath.",
  "An optional tithe to a Scottish registered charity, in service to others.",
  "A family compact in honour rather than law — retained with the holder’s will and estate papers.",
];

export default function OathPage() {
  return (
    <>
      <PageHero
        eyebrow="A Lasting Commitment"
        title="The Oath & The Pledge"
        intro="An opportunity to convert a baronial title into a pledged bloodline hereditary honour — ensuring legitimacy and principled commitment for future generations."
      />

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <SectionHeading align="start" eyebrow="The Pledge" title="A family compact, in honour" />
          </Reveal>
          <Reveal>
            <p className="prose-heritage mt-8">
              The Pledge is a non-legal declaration of intent, by which a baron asks that their barony be preserved
              within the family line and treated as a hereditary dignity. It operates as a family compact — in honour
              rather than law. It cannot legally alter a barony or create an entail; its practical effect is future
              recognition on the Roll should a pledged barony later be conveyed outside the family.
            </p>
          </Reveal>
          <Reveal>
            <ul className="mt-8 space-y-4">
              {pledgePoints.map((point) => (
                <li key={point} className="flex gap-4 leading-relaxed text-ink-soft">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-none rotate-45 bg-gold" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* The Oath — presented as a declaration */}
      <Section tone="navy">
        <Container size="prose">
          <Reveal>
            <div className="relative border border-gold/30 bg-navy-deep/60 p-8 text-center sm:p-12">
              <div className="pointer-events-none absolute inset-3 border border-gold/15" aria-hidden />
              <Crest className="mx-auto text-gold" style={{ width: 46, height: (46 * 112) / 96 }} />
              <p className="eyebrow eyebrow--light mt-6">The Baronial Oath</p>
              <GoldRule className="mt-5" />
              <blockquote className="mt-8 space-y-5 font-serif text-lg italic leading-relaxed text-parchment-100/90 sm:text-xl">
                <p>
                  “I, Baron of [Title], solemnly swear by my honour and the legacy of the noble baronage to uphold the
                  principles and duties bestowed upon me as a holder of a title in the Baronage of Scotland.
                </p>
                <p>
                  I pledge to conduct myself with the highest levels of honour, dignity and integrity; to respect the
                  laws of my country and the rights of others; and to dedicate my efforts to the service of my
                  community, the baronage and society at large.
                </p>
                <p>
                  I embrace this oath as a lifelong commitment, striving always to bring credit to the baronage, my
                  family, and my country.”
                </p>
              </blockquote>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="parchment" className="text-center">
        <Container size="prose">
          <Reveal>
            <h2 className="text-3xl text-navy sm:text-4xl">Begin the Pledge</h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ink-soft">
              The full Baronial Pledge is available on request. To take the Pledge or learn more, please contact the
              Secretary.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/baronial-code" variant="outline">
                Read the Code of Honour
              </ButtonLink>
              <ButtonLink href={`mailto:${site.email}`} variant="gold">
                Contact the Secretary
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
