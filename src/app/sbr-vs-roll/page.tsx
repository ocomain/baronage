import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { RegisterComparison } from "@/components/RegisterComparison";
import { ButtonLink, Container, Section } from "@/components/primitives";
import { ROLL_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/sbr-vs-roll/" },
  title: "The SBR and the Roll",
  description:
    "How the Scottish Barony Register and the Roll of Scottish Barons differ, what each one records, and how they work together.",
};

export default function SbrVsRollPage() {
  return (
    <>
      <PageHero
        eyebrow="Register vs. Roll"
        title="Two records, two jobs"
        intro="The Scottish Barony Register and the Roll of Scottish Barons are complementary, not competing. Here is what each one is, what it records, and how they fit together."
      />

      <Section tone="parchment" className="!py-12 sm:!py-16">
        <Container size="prose">
          <Reveal>
            <div className="prose-heritage">
              <p>
                The Scottish Barony Register (SBR) is a private register of legal transfers, established in 2004 by
                members of the Scottish legal profession, under a Custodian whose certification the Lord Lyon accepts
                as evidence of title. We recognise it as an authoritative source, and recommend that every holder of a
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
