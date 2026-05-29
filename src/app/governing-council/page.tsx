import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow, GoldRule, Section } from "@/components/primitives";

export const metadata: Metadata = {
  title: "The Governing Council",
  description:
    "Distinguished, voluntary members entrusted with the leadership and strategic direction of the Baronage of Scotland Association.",
};

const members = [
  { name: "Brady", designation: "Baron of Balvaird", mark: "B" },
  { name: "Alexander", designation: "Baron of Drum", mark: "D" },
  { name: "Antoin", designation: "Younger of Kinfauns", mark: "K" },
  { name: "Gordon Macduff", designation: "Member of Council", mark: "M" },
];

const stewardship = [
  {
    numeral: "I",
    title: "Chancellor & Council",
    body: "An elected Chancellor and Governing Council, serving a biannual term, voted in at the members’ meeting.",
  },
  {
    numeral: "II",
    title: "Keepers of the Roll",
    body: "Researchers, genealogists and scholars who vet and verify entries with accuracy and legal precision.",
  },
  {
    numeral: "III",
    title: "Future Oversight",
    body: "We intend to transfer oversight to government supervisors, ensuring proper checks and balances.",
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

      {/* Lead */}
      <Section tone="parchment">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Leadership</Eyebrow>
              <div className="mt-6 h-px w-16 bg-gold/60 lg:h-24 lg:w-px" />
            </Reveal>
            <Reveal className="lg:col-span-8" delay={0.1}>
              <p className="dropcap font-serif text-2xl leading-[1.5] text-ink sm:text-[1.6rem]">
                The Council brings a wealth of experience, dedication and a deep commitment to the values and traditions
                of the Scottish baronage — ensuring our mission of service, empowerment and heritage preservation is
                upheld and advanced for generations to come.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The Council — members */}
      <Section tone="cream" className="border-y border-parchment-300/60">
        <Container>
          <Reveal>
            <div className="text-center">
              <Eyebrow>The Council</Eyebrow>
              <h2 className="mt-4 text-4xl text-navy sm:text-5xl">Members of the Governing Council</h2>
              <GoldRule className="mt-6" />
            </div>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08} className="h-full">
                <article className="flex h-full flex-col items-center border border-parchment-300/70 bg-parchment-50 p-8 text-center">
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-navy">
                    <span className="absolute inset-1 rounded-full border border-gold/25" aria-hidden />
                    <span className="font-inscribe text-2xl text-gold-light">{m.mark}</span>
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-navy">{m.name}</h3>
                  <span className="mt-3 font-inscribe text-[0.62rem] uppercase tracking-[0.2em] text-gold-deep">
                    {m.designation}
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 text-center font-serif text-lg italic text-muted">
              An honourable body, owned by its members — a not-for-profit.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Stewardship */}
      <Section tone="parchment">
        <Container>
          <Reveal>
            <Eyebrow>How We Are Governed</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-4xl text-navy sm:text-5xl">Steering the legacy and the future</h2>
          </Reveal>
          <div className="mt-12 border-t border-navy/15">
            {stewardship.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-navy/15 py-8 sm:grid-cols-[5rem_1fr] sm:gap-x-10">
                  <span className="font-inscribe text-3xl text-gold/70 sm:text-4xl">{s.numeral}</span>
                  <div>
                    <h3 className="text-2xl text-navy sm:text-3xl">{s.title}</h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing */}
      <Section tone="navy">
        <Container size="prose">
          <Reveal>
            <div className="text-center">
              <GoldRule className="mb-8" />
              <h2 className="text-3xl text-parchment-50 sm:text-4xl">Three entities, one purpose</h2>
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-parchment-200/85">
                The Association, the Roll, and the Scottish charity in formation are three separate entities, working in
                liaison with all baronage stakeholders. Memorandums of Understanding signed with stakeholder
                organisations are to be announced at forthcoming press events.
              </p>
              <div className="mt-9 flex justify-center">
                <ButtonLink href="/about" variant="outlineLight">
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
