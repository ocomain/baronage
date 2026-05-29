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
  { mark: "B", full: "Brady, Baron of Balvaird" },
  { mark: "D", full: "Alexander, Baron of Drum, Chief of the Name Irvine" },
  { mark: "K", full: "Antoin, Younger of Kinfauns, Tanist, Irish Clan Ó Comáin" },
  { mark: "M", full: "Gordon Macduff" },
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
          <div className="mx-auto mt-14 max-w-3xl divide-y divide-navy/15 border-y border-navy/15">
            {members.map((m, i) => (
              <Reveal key={m.mark} delay={i * 0.06}>
                <div className="flex items-center gap-5 py-6 sm:gap-7 sm:py-7">
                  <span className="relative flex h-14 w-14 flex-none items-center justify-center rounded-full border border-gold/50 bg-navy sm:h-16 sm:w-16">
                    <span className="absolute inset-1 rounded-full border border-gold/25" aria-hidden />
                    <span className="font-inscribe text-xl text-gold-light sm:text-2xl">{m.mark}</span>
                  </span>
                  <p className="font-display text-xl leading-snug text-navy sm:text-[1.7rem]">{m.full}</p>
                </div>
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
