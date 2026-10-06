import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/page-metadata";
import { Reveal } from "@/components/Reveal";
import { RegisterComparison } from "@/components/RegisterComparison";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/primitives";
import { RollCounts } from "@/components/RollCounts";
import { ROLL_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "The SBR and the Roll",
  description:
    "The Scottish Barony Register records the legal transfer of a barony; the Roll of Scottish Barons records recognition. What each does, and how they work together.",
  path: "/sbr-vs-roll/",
});

const OFFICIAL_Q = "Is there an official register of Scottish baronies?";
const OFFICIAL_A =
  "No. Since 28 November 2004 a barony cannot be registered in the Land Register of Scotland or recorded in the Register of Sasines (Abolition of Feudal Tenure etc. (Scotland) Act 2000, s. 63(2)), and no statute has created a register in their place. The Scottish Barony Register (SBR) is a private, non-statutory register. It replaces the Register of Sasines for the transfers of baronies voluntarily submitted to it since 2004, and records legal title, no more: it does not recognise or decline to recognise a title. The Roll of Scottish Barons does a different job: it recognises the title and catalogues the whole Baronage of Scotland, including dignities held by dynastic succession, chiefs, baronets and peers, which pass by inheritance and so have never appeared in any register of transfers. Nothing on the Roll is taken on trust: the evidence for every entry is published beside it.";
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [{ "@type": "Question", name: OFFICIAL_Q, acceptedAnswer: { "@type": "Answer", text: OFFICIAL_A } }],
};

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
            <section id="official-register" className="mt-12 scroll-mt-32" aria-labelledby="official-register-q">
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
              />
              <h2 id="official-register-q" className="font-display text-3xl leading-tight text-navy sm:text-4xl">
                {OFFICIAL_Q}
              </h2>
              <div className="prose-heritage mt-5">
                <p>
                  No. Since 28 November 2004 a barony cannot be registered in the Land Register of Scotland or
                  recorded in the Register of Sasines,{" "}
                  <a
                    href="https://www.legislation.gov.uk/asp/2000/5/section/63"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-deep underline decoration-gold/40 underline-offset-2 transition-colors hover:text-oxblood"
                  >
                    under the 2000 Act
                  </a>
                  , and no statute has created a register in their place. The Scottish Barony Register (SBR) is a
                  private, non-statutory register. It replaces the Register of Sasines for the transfers of baronies
                  voluntarily submitted to it since 2004, and records legal title, no more: it does not recognise or decline to recognise a title. At its update of 9 August 2026 the
                  SBR listed 214 baronies, the holder’s name shown as private for 143 of them.
                </p>
                <p>
                  The Roll of Scottish Barons does a different job. It recognises the title and catalogues the whole
                  Baronage of Scotland, including dignities held by dynastic succession, chiefs, baronets and peers,
                  which pass by inheritance and so have never appeared in any register of transfers. <RollCounts />{" "}
                  Nothing on the Roll is taken on trust: the evidence for every entry is published beside it, so
                  anyone can judge the authority for themselves.
                </p>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <div className="prose-heritage mt-12">
              <p>
                The Lord Lyon accepts the SBR Custodian’s certification as evidence of title. We recognise the SBR
                as an authoritative source, and recommend that every holder of a Scottish barony record their legal
                title there. Side by side:
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
