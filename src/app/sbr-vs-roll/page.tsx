import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/page-metadata";
import { Reveal } from "@/components/Reveal";
import { RegisterComparison } from "@/components/RegisterComparison";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/primitives";
import { ROLL_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "The SBR and the Roll",
  description:
    "The Scottish Barony Register records the legal transfer of a barony, in place of the Register of Sasines since 2004; the Roll of Scottish Barons records recognition. What each one does, and how they work together.",
  path: "/sbr-vs-roll/",
});

export default function SbrVsRollPage() {
  return (
    <>
      <PageHero
        eyebrow="Register vs. Roll"
        image="/images/scribe.webp"
        position="center 42%"
        title="Two records, two jobs"
        intro="The Scottish Barony Register replaces the Register of Sasines for baronies: it records legal title. The Roll of Scottish Barons records recognition. Complementary, not competing."
      />

      <Section tone="parchment" className="!py-12 sm:!py-16">
        <Container size="prose">
          <Reveal>
            <aside className="border-l-4 border-gold bg-parchment-100 px-6 py-6 sm:px-8 sm:py-7">
              <Eyebrow>Legal title and recognition</Eyebrow>
              <p className="mt-3 font-serif text-xl leading-relaxed text-navy sm:text-2xl">
                Legal title and recognition are two different things — and the Roll of the Peerage shows why. Andrew
                Mountbatten Windsor remains Duke of York in law, because only an Act of Parliament can extinguish a
                peerage; what the King’s removal of his name from the Roll of the Peerage in 2025 withdrew was
                recognition of the title, not the legal title. A Scottish barony stands on the same footing: only an
                Act of Parliament can extinguish it. And because baronies are legally assignable, each record has a
                distinct purpose — the Scottish Barony Register records legal title; the Roll of Scottish Barons records
                recognition, and the conduct that goes with it, as the Rolls of the Peerage and the Baronetage do in
                their own spheres.
              </p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-navy sm:text-xl">
                The Roll is on friendly terms with the Custodian of the Scottish Barony Register: the two records work
                alongside each other, not against.
              </p>
            </aside>
          </Reveal>

          <Reveal>
            <div className="prose-heritage">
              <p>
                The Scottish Barony Register (SBR) replaces the Register of Sasines for baronies, which{" "}
                <a
                  href="https://www.legislation.gov.uk/asp/2000/5/section/63"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-deep underline decoration-gold/40 underline-offset-2 transition-colors hover:text-oxblood"
                >
                  since 2004 can no longer be recorded there
                </a>
                . That is the difference from the Roll. It is a private register of legal transfers, established in
                2004 by members of the Scottish legal profession, under a Custodian whose certification the Lord Lyon
                accepts as evidence of title. We recognise it as an authoritative source, and recommend that every holder of a
                Scottish barony record their legal title there. The Roll is complementary to the SBR, not in
                competition with it: The Roll also documents the wider historic baronage — dignities held by dynastic
                succession, by chiefs, baronets and peers — for which the records of the Lyon Office stand as primary
                evidence. Set side by side, the two serve different jobs:
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-8">
              <RegisterComparison />
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href={ROLL_URL} variant="gold">
                Search the Roll
              </ButtonLink>
              <ButtonLink href="/the-roll" variant="outline">
                About the Roll
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
