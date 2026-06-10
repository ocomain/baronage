import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow, GoldRule, Section, SectionHeading } from "@/components/primitives";
import { site, CALENDLY_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Baron’s Charitable Trust",
  description:
    "Channelling the influence and resources of the baronage into meaningful action — empowering young people, supporting charitable causes and preserving Scotland’s heritage.",
};

const initiatives = [
  {
    title: "Empowering Young People",
    body: "Mentoring young people, particularly from disadvantaged backgrounds, through educational programmes, scholarships and mentorship — fostering the leaders of tomorrow.",
  },
  {
    title: "Supporting Charitable Causes",
    body: "Working with charities and community organisations — providing funding, resources and volunteer support, from local food banks to international humanitarian efforts.",
  },
  {
    title: "Preserving Cultural Heritage",
    body: "Supporting historical research and maintaining historic sites, ensuring Scotland’s rich history is preserved and passed to future generations.",
  },
  {
    title: "Community Development",
    body: "Enhancing the quality of life within communities — supporting local arts, community spaces and environmental conservation at the grassroots level.",
  },
];

const roles = ["Mentorship & Leadership", "Charitable Giving", "Community Engagement", "Heritage Preservation"];

export default function CharitableTrustPage() {
  return (
    <>
      <PageHero
        eyebrow="Dedicated to Service & Empowerment"
        title="The Baron’s Charitable Trust"
        intro="With the privilege of a baronial title comes the responsibility to give back — to lead by example and use our influence for the greater good."
        image="/images/glen-mist.webp"
        position="center 45%"
      />

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="Our Mission"
              title="A beacon of support for communities"
              intro="The Baron’s Trust is driven to empower the next generation, support charitable endeavours and preserve Scotland’s rich cultural heritage — channelling the resources of the baronage into meaningful action."
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="cream" className="border-y border-parchment-300/60">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Key Initiatives" title="Where we make an impact" />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {initiatives.map((it, i) => (
              <Reveal key={it.title} delay={(i % 2) * 0.1} className="h-full">
                <article className="flex h-full gap-5 border border-parchment-300/70 bg-parchment-50 p-7">
                  <span className="font-display text-3xl leading-none text-gold/60">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl text-navy">{it.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-soft">{it.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="parchment">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>Your Role</Eyebrow>
              <h2 className="mt-4 text-3xl text-navy sm:text-4xl">An invitation to serve</h2>
              <GoldRule className="mt-6" align="start" />
              <p className="mt-6 leading-relaxed text-ink-soft">
                As a member of the Baronage of Scotland, you are invited to take an active role in the Trust — using
                titles not for personal gain, but for the betterment of society and the preservation of our shared
                heritage.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-parchment-300/70 bg-parchment-300/70 sm:grid-cols-2">
                {roles.map((role) => (
                  <li key={role} className="bg-parchment-50 p-6 text-center font-display text-lg text-navy">
                    {role}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="navyDeep" className="text-center">
        <Container size="prose">
          <Reveal>
            <Eyebrow light>In Development</Eyebrow>
            <h2 className="mt-4 text-3xl text-parchment-50 sm:text-4xl">Seeking principal benefactors</h2>
            <div className="mx-auto mt-6 max-w-2xl space-y-4 leading-relaxed text-parchment-200/85">
              <p>
                The Baron’s Charitable Trust is an independent initiative currently in development, with the intention
                of a separate entity applying for charitable status in Scotland, subject to regulatory approval.
              </p>
              <p>
                It is being structured to operate with full transparency and accountability, as a separate independent
                entity, and aims to include all baronage stakeholders. It is actively seeking principal benefactors to
                support its mission—please get in touch.
              </p>
              <p>
                This prospective trust is entirely distinct from our non-profit Baronage of Scotland Association, which
                manages The Roll of the Scottish Baronage.
              </p>
            </div>
            <div className="mt-9 flex justify-center">
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
