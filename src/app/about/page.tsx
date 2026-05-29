import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, Section, SectionHeading } from "@/components/primitives";

export const metadata: Metadata = {
  title: "About the Association",
  description:
    "Baronage of Scotland Association is a non-profit honourable body owned by its members — preserving the rights, heritage and dignity of Scottish Barons.",
};

const mandate = [
  "Advocacy for the titles of the Baronage of Scotland, one of the historic Three Estates.",
  "Legal protection of the historic rights and heritage of the baronage, upholding the principles of honour.",
  "Keeper of the open-source verification Roll of Scottish Barons.",
  "Offering barons The Pledge — a pledged bloodline hereditary honour bound by the Baronial Code.",
  "Representing barons in their engagement with government.",
  "Allying with affiliated baronial and noble bodies, at home and on the Continent.",
];

const entities = [
  {
    name: "The Association",
    role: "Membership body",
    body: "A non-profit honourable body owned by its members, with ownership and votes. Membership is optional and open to those who share our values and heritage.",
  },
  {
    name: "The Roll",
    role: "Title record",
    body: "A non-membership register of verified titles within the Baronage of Scotland — free, for life, to verify an entry.",
  },
  {
    name: "The Baron’s Trust",
    role: "Charity (forming)",
    body: "A separate, independent charitable entity being established for donations to good causes, in collaboration with all baronage stakeholders.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The Association"
        title="About the Baronage of Scotland"
        intro="An independent, voluntary and non-profit honourable body, dedicated to preserving the historical integrity of Scottish baronies."
      />

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <SectionHeading align="start" eyebrow="Our Mandate" title="In service of heritage and society" />
          </Reveal>
          <Reveal>
            <ul className="mt-8 space-y-4">
              {mandate.map((item) => (
                <li key={item} className="flex gap-4 leading-relaxed text-ink-soft">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-none rotate-45 bg-gold" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section tone="cream" className="border-y border-parchment-300/60">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Governance"
              title="Three separate entities"
              intro="To ensure proper checks and balances, our work is held across three distinct bodies."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {entities.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col border border-parchment-300/70 bg-parchment-50 p-8">
                  <span className="eyebrow">{e.role}</span>
                  <h3 className="mt-3 text-2xl text-navy">{e.name}</h3>
                  <div className="gold-rule gold-rule--start mt-4 text-gold/70">
                    <span className="gold-rule__gem" />
                  </div>
                  <p className="mt-5 leading-relaxed text-ink-soft">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <div className="border border-parchment-300/70 bg-parchment-50 p-8 text-center sm:p-10">
              <h3 className="text-2xl text-navy">Legal Status</h3>
              <GoldRule className="mt-5" />
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-ink-soft">
                Baronage of Scotland Association is a non-profit honourable body owned by its members — not a
                charity. A separate, independent charitable entity is being formed for donations from barons to good
                causes, in collaboration with other stakeholders.
              </p>
              <div className="mt-8 flex justify-center">
                <ButtonLink href="/governing-council" variant="outline">
                  The Governing Council
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
