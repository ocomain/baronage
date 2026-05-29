import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, Section, SectionHeading } from "@/components/primitives";

export const metadata: Metadata = {
  title: "The Governing Council",
  description:
    "Distinguished, voluntary members entrusted with the leadership and strategic direction of the Baronage of Scotland Association.",
};

const roles = [
  {
    title: "Chancellor & Council",
    body: "An elected Chancellor and Governing Council, serving a biannual term, voted in at the members’ meeting — entrusted with leadership and strategic direction.",
  },
  {
    title: "Keepers of the Roll",
    body: "A small team of researchers, genealogists and scholars who vet and verify entries, ensuring succession is documented with accuracy and legal precision.",
  },
  {
    title: "Future Oversight",
    body: "We do not wish to own or control the record in perpetuity; we intend to transfer oversight to government supervisors, ensuring proper checks and balances.",
  },
];

export default function GoverningCouncilPage() {
  return (
    <>
      <PageHero
        eyebrow="Stewardship of the Baronage"
        title="The Governing Council"
        intro="Distinguished, voluntary members entrusted with the leadership and strategic direction of our honourable institution."
      />

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="Leadership"
              title="Steering the legacy and the future"
              intro="The Council brings a wealth of experience, dedication and a deep commitment to the values and traditions of the Scottish baronage — ensuring our mission of service, empowerment and heritage preservation is upheld and advanced."
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="cream" className="border-y border-parchment-300/60">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {roles.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1} className="h-full">
                <article className="flex h-full flex-col border border-parchment-300/70 bg-parchment-50 p-8">
                  <h3 className="text-xl text-navy">{r.title}</h3>
                  <div className="gold-rule gold-rule--start mt-4 text-gold/70">
                    <span className="gold-rule__gem" />
                  </div>
                  <p className="mt-5 leading-relaxed text-ink-soft">{r.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <div className="border border-parchment-300/70 bg-parchment-50 p-8 sm:p-10">
              <h3 className="text-2xl text-navy">An honourable body, owned by its members</h3>
              <GoldRule className="mt-5" align="start" />
              <p className="mt-6 leading-relaxed text-ink-soft">
                The Association, the Roll, and the Scottish charity in formation are three separate entities, working in
                liaison with all baronage stakeholders. Memorandums of Understanding have been signed with stakeholder
                organisations — with alignment and advisory on the Roll — to be announced at forthcoming press events.
              </p>
              <div className="mt-8">
                <ButtonLink href="/about" variant="outline">
                  About the Association
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
