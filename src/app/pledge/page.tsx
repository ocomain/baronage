import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Seal } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, PdfLink, Section, SectionHeading } from "@/components/primitives";
import { CALENDLY_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Pledge",
  description:
    "The Pledge converts a barony into a pledged hereditary title — a family compact of service, bound by the Baronial Code of Honour.",
};

const pledgePoints = [
  "A declaration that the barony be preserved within the family line as a hereditary dignity.",
  "A commitment to uphold the Baronial Code of Honour, in service to others.",
  "An optional tithe to a Scottish registered charity, for good causes.",
  "A family compact in honour rather than law — retained with the holder’s will and estate papers.",
];

export default function PledgePage() {
  return (
    <>
      <PageHero
        eyebrow="A Lasting Commitment"
        title="The Pledge"
        intro="An opportunity to convert a barony into a pledged hereditary title — ensuring legitimacy and principled commitment for future generations."
        image="/images/scribe.webp"
        position="center 30%"
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

      {/* The Pledge — presented as a declaration */}
      <Section tone="navy">
        <Container size="prose">
          <Reveal>
            <div className="relative border border-gold/30 bg-navy-deep/60 p-8 text-center sm:p-12">
              <div className="pointer-events-none absolute inset-3 border border-gold/15" aria-hidden />
              <Seal className="mx-auto h-16 w-16" />
              <p className="eyebrow eyebrow--light mt-6">The Baronial Pledge</p>
              <GoldRule className="mt-5" />
              <blockquote className="mt-8 font-serif text-xl italic leading-relaxed text-parchment-100/90 sm:text-2xl">
                “That my barony be preserved within my family line as a hereditary dignity; that I uphold the Baronial
                Code of Honour; and that I dedicate my title to the service of others and the betterment of society.”
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
              To take the Pledge or learn more, please contact the Secretary.
            </p>
            <div className="mt-8 flex justify-center">
              <PdfLink href="/docs/the-baronial-pledge.pdf" label="The Baronial Pledge.pdf" />
            </div>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/baronial-code" variant="outline">
                Read the Code of Honour
              </ButtonLink>
              <ButtonLink href={CALENDLY_URL} variant="gold">
                Request a Call Back
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
