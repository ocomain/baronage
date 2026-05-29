import Link from "next/link";
import { Crest } from "@/components/Crest";
import { Reveal } from "@/components/Reveal";
import {
  ButtonLink,
  Container,
  Eyebrow,
  GoldRule,
  Section,
  SectionHeading,
} from "@/components/primitives";

// Eilean Donan castle (Unsplash, free for commercial use) — placeholder pending the
// Association's own licensed imagery before go-live.
const HERO_IMG =
  "https://images.unsplash.com/photo-1458413111252-87446cbff277?auto=format&fit=crop&w=2400&q=80";

const pillars = [
  {
    title: "The Roll of Barons",
    body: "An open, verified public register of the Baronage of Scotland — bringing transparency and accuracy to the record. Free, for life, to verify an entry.",
    href: "/the-roll",
    cta: "Verify a title",
  },
  {
    title: "The Pledge & Oath",
    body: "Barons may convert their title into a pledged bloodline honour — a family compact of service, bound by the Baronial Code and Oath.",
    href: "/oath",
    cta: "Take the Pledge",
  },
  {
    title: "The Baron’s Trust",
    body: "Channelling the influence of the baronage into charitable works — mentoring young people and preserving Scotland’s cultural heritage.",
    href: "/charitable-trust",
    cta: "Our charitable mission",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ----------------------------- Hero ----------------------------- */}
      <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-navy-deep text-parchment-50">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(12,21,48,0.55), rgba(12,21,48,0.72) 55%, rgba(12,21,48,0.95)), url('${HERO_IMG}')`,
          }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 texture-saltire opacity-60" aria-hidden />
        {/* gold frame */}
        <div className="pointer-events-none absolute inset-5 -z-10 border border-gold/20 sm:inset-8" aria-hidden />

        <Container className="py-24 text-center">
          <div className="rise flex justify-center">
            <Crest className="text-gold" style={{ width: 78, height: (78 * 112) / 96 }} />
          </div>
          <p className="rise mt-8 font-serif text-xl italic text-gold-light sm:text-2xl" style={{ animationDelay: "0.08s" }}>
            Preserving the noble heritage of Scottish Barons
          </p>
          <h1
            className="rise mx-auto mt-4 max-w-4xl text-balance text-4xl text-parchment-50 sm:text-6xl md:text-7xl"
            style={{ animationDelay: "0.16s" }}
          >
            The Baronage of Scotland
          </h1>
          <div className="rise mt-8" style={{ animationDelay: "0.24s" }}>
            <GoldRule />
          </div>
          <p
            className="rise mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-parchment-200/85"
            style={{ animationDelay: "0.3s" }}
          >
            One of the oldest noble classes in Scotland — predating the peerage and part of the historic Three Estates.
            We safeguard its rights, heritage and dignity in the modern world.
          </p>
          <div
            className="rise mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: "0.38s" }}
          >
            <ButtonLink href="/the-roll" variant="gold">
              Verify on the Roll
            </ButtonLink>
            <ButtonLink href="/history" variant="outlineLight">
              Discover the heritage
            </ButtonLink>
          </div>
        </Container>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-gold/60" aria-hidden>
          <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-gold/0 to-gold/70" />
        </div>
      </section>

      {/* --------------------------- Mandate --------------------------- */}
      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <SectionHeading
              eyebrow="Our Mandate"
              title="An honourable body, in service of heritage"
              intro="The Baronage of Scotland Association is a non-profit honourable body, owned by its members, dedicated to advocacy, legal protection and the principled stewardship of baronial titles — one of the historic Three Estates of Scotland."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-center font-serif text-xl italic leading-relaxed text-muted">
              “Central to being a baron is to provide for a better society.” We leverage the legacy of the baronage as a
              force for good — much as the barons who sealed the Declaration of Arbroath in 1320.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------- Pillars --------------------------- */}
      <Section tone="cream" className="border-y border-parchment-300/60">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="What We Maintain" title="Three pillars of the baronage" />
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-parchment-300/70 bg-parchment-300/70 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col bg-parchment-50 p-8 transition-colors hover:bg-parchment">
                  <span className="font-display text-5xl text-gold/50">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-2xl text-navy">{pillar.title}</h3>
                  <div className="gold-rule gold-rule--start mt-4 text-gold/70">
                    <span className="gold-rule__gem" />
                  </div>
                  <p className="mt-5 flex-1 leading-relaxed text-ink-soft">{pillar.body}</p>
                  <Link
                    href={pillar.href}
                    className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-oxblood transition-colors hover:text-gold-deep"
                  >
                    {pillar.cta} →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------- Quote band -------------------------- */}
      <Section tone="navy" className="text-center">
        <Container size="prose">
          <Reveal>
            <Crest className="mx-auto text-gold/80" style={{ width: 48, height: (48 * 112) / 96 }} />
            <blockquote className="mt-8 font-display text-3xl leading-snug text-parchment-50 sm:text-4xl">
              Recognised in the nobiliary court and the Court of Session as a{" "}
              <span className="text-gold-light">“titled nobility.”</span>
            </blockquote>
            <cite className="mt-6 block not-italic text-sm uppercase tracking-[0.22em] text-parchment-200/70">
              — Court of the Lord Lyon, 1943
            </cite>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------- Featured Baron ------------------------ */}
      <Section tone="parchment">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
                <div className="absolute inset-0 translate-x-3 translate-y-3 border border-gold/40" aria-hidden />
                <div className="relative flex h-full w-full flex-col items-center justify-center bg-navy texture-saltire text-center">
                  <Crest className="text-gold" style={{ width: 90, height: (90 * 112) / 96 }} />
                  <p className="mt-6 px-6 font-serif text-lg italic text-parchment-200/80">
                    Arms of the featured baron
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <Eyebrow>Featured Baron</Eyebrow>
              <h2 className="mt-4 text-3xl text-navy sm:text-4xl">The Baron of Ardblair and Gask</h2>
              <GoldRule className="mt-6" align="start" />
              <p className="mt-6 leading-relaxed text-ink-soft">
                Each season we honour a member of the baronage whose stewardship exemplifies the Baronial Code —
                service, integrity and the preservation of heritage. Their title, like all upon the Roll, is recorded
                with accuracy and legal precision.
              </p>
              <div className="mt-8">
                <ButtonLink href="/the-roll" variant="outline">
                  Explore the Roll
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* -------------------------- History teaser ----------------------- */}
      <Section tone="navyDeep">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow light>A Thousand Years</Eyebrow>
              <h2 className="mt-4 text-3xl text-parchment-50 sm:text-4xl">
                Defenders of Scottish sovereignty
              </h2>
              <GoldRule className="mt-6" align="start" />
              <p className="mt-6 leading-relaxed text-parchment-200/80">
                Scottish barons held their lands directly from the Crown, sat among the Three Estates of Parliament, and
                stood as key defenders of Scotland’s independence — their dedication immortalised at Arbroath in 1320.
                Today the dignity endures as a non-territorial title of honour, protected in Scots law.
              </p>
              <div className="mt-8">
                <ButtonLink href="/history" variant="outlineLight">
                  Read the history
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { n: "1320", l: "Declaration of Arbroath" },
                  { n: "Three", l: "Estates of Parliament" },
                  { n: "2000", l: "Dignity preserved in law" },
                ].map((stat) => (
                  <div key={stat.l} className="border border-gold/20 bg-navy/40 p-6">
                    <p className="font-display text-3xl text-gold-light">{stat.n}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-parchment-200/70">{stat.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ----------------------------- CTA ------------------------------ */}
      <Section tone="oxblood" className="text-center">
        <Container size="prose">
          <Reveal>
            <h2 className="text-3xl text-parchment-50 sm:text-4xl">Preserve your title’s legacy</h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-parchment-100/85">
              Verify an entry on the Roll, or speak with the Secretary about membership, the Pledge, and the work of the
              baronage.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/the-roll" variant="gold">
                Verify on the Roll
              </ButtonLink>
              <ButtonLink href="/contact" variant="outlineLight">
                Contact the Secretary
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
