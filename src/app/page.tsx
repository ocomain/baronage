import Link from "next/link";
import { HeroHome } from "@/components/HeroHome";
import { BaroniesCarousel } from "@/components/BaroniesCarousel";
import { Seal } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow, GoldRule, Section } from "@/components/primitives";
import { ROLL_URL } from "@/lib/site";

const HISTORY_IMG =
  "https://images.unsplash.com/photo-1732008209481-3f5eed6b4ab5?auto=format&fit=crop&w=1600&q=80";

const pillars = [
  {
    numeral: "I",
    title: "The Roll of Barons",
    body: "An open, verified public register of the Baronage of Scotland — free, for life, to verify an entry.",
    href: "/the-roll",
    external: true,
  },
  {
    numeral: "II",
    title: "The Pledge",
    body: "A pledged bloodline honour — a family compact of service, bound by the Baronial Code.",
    href: "/pledge",
  },
  {
    numeral: "III",
    title: "The Baron’s Trust",
    body: "Channelling the influence of the baronage into charitable works and the preservation of heritage.",
    href: "/charitable-trust",
  },
];

const timeline = [
  { year: "1320", event: "Barons seal the Declaration of Arbroath" },
  { year: "1707", event: "Sat among the Three Estates until the Union" },
  { year: "2000", event: "Dignity preserved in law by the Scotland Act" },
  { year: "2004", event: "Titles become non-territorial personal dignities" },
];

export default function HomePage() {
  return (
    <>
      <HeroHome />

      {/* ============================== MANDATE ============================== */}
      <Section tone="parchment">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-40">
                <Eyebrow>An Ancient Dignity</Eyebrow>
                <div className="mt-6 h-px w-16 bg-gold/60 lg:h-24 lg:w-px" />
                <p className="mt-6 font-inscribe text-sm uppercase tracking-[0.2em] text-muted">
                  Predating the peerage itself
                </p>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={0.1}>
              <p className="dropcap font-serif text-xl leading-[1.6] text-ink sm:text-2xl">
                Scottish baronies predate the peerage itself, standing among the most ancient noble dignities in the
                British Isles. Originating in the medieval period, a barony was an estate of land held directly from the
                Crown, erected into a free barony by Royal Charter — a dignity created not by Parliament but by the
                sovereign will of the Scottish Crown.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                Unlike the modern peerage, which is primarily a titular and parliamentary distinction, the Scottish
                Baronage was rooted in territorial jurisdiction. The baron held both the dignity of the title and the
                legal authority over his lands, often possessing the right of “pit and gallows” — the power of life and
                death.
              </p>
              <div className="mt-9 border-l-2 border-gold/60 pl-6">
                <p className="font-serif text-xl italic leading-relaxed text-oxblood-deep sm:text-2xl">
                  Today, the Scottish Baronage is a recognised noble status in Scots law.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ============================== PILLARS (editorial index) ============================== */}
      <Section tone="cream" className="border-y border-parchment-300/60">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>What We Maintain</Eyebrow>
                <h2 className="mt-4 text-4xl text-navy sm:text-5xl">Three pillars of the baronage</h2>
              </div>
              <p className="max-w-xs font-serif text-lg italic text-muted">
                The work entrusted to an honourable body.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 border-t border-navy/15">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <Link
                  href={p.href}
                  {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-2 border-b border-navy/15 py-8 transition-colors hover:bg-parchment/60 sm:grid-cols-[6rem_1fr_auto] sm:gap-x-10 sm:py-10"
                >
                  <span className="font-inscribe text-3xl text-gold/70 transition-colors group-hover:text-gold sm:text-4xl">
                    {p.numeral}
                  </span>
                  <div className="col-start-2 sm:col-start-2">
                    <h3 className="text-2xl text-navy transition-colors group-hover:text-oxblood sm:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">{p.body}</p>
                  </div>
                  <span className="col-span-2 mt-2 inline-flex items-center gap-2 font-inscribe text-[0.65rem] uppercase tracking-[0.22em] text-oxblood transition-all group-hover:gap-3 sm:col-span-1 sm:col-start-3 sm:mt-0">
                    Enter <span aria-hidden>→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================== QUOTE (full-bleed, seal watermark) ============================== */}
      <section className="relative isolate overflow-hidden bg-navy-deep py-28 text-center text-parchment-50 sm:py-36">
        <div className="absolute inset-0 -z-10 texture-saltire opacity-60" aria-hidden />
        <Seal
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
          aria-hidden
          alt=""
        />
        <Container size="prose">
          <Reveal>
            <blockquote className="font-serif text-3xl italic leading-snug text-parchment-50 sm:text-[2.7rem]">
              Recognised in the nobiliary court and the Court of Session as a{" "}
              <span className="text-foil not-italic">“titled nobility.”</span>
            </blockquote>
            <cite className="mt-8 block font-inscribe text-xs uppercase not-italic tracking-[0.3em] text-parchment-200/70">
              Court of the Lord Lyon · 1943
            </cite>
          </Reveal>
        </Container>
      </section>

      {/* ============================== TOUR OF THE BARONIES ============================== */}
      <Section tone="parchment">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>From the Roll</Eyebrow>
                <h2 className="mt-4 text-4xl text-navy sm:text-5xl">A tour of the baronies</h2>
              </div>
              <p className="max-w-xs font-serif text-lg italic text-muted">
                Selected arms from across the Scottish baronage.
              </p>
            </div>
          </Reveal>
        </Container>
        <Reveal className="mt-14">
          <BaroniesCarousel />
        </Reveal>
        <Container className="mt-14 text-center">
          <ButtonLink href={ROLL_URL} variant="outline">
            Explore the Roll
          </ButtonLink>
        </Container>
      </Section>

      {/* ============================== HISTORY (asymmetric) ============================== */}
      <Section tone="parchment" className="overflow-hidden">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-3 -z-10 border border-gold/30" aria-hidden />
                <div
                  className="aspect-[4/5] w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(10,16,36,0.12), rgba(10,16,36,0.3)), url('${HISTORY_IMG}')`,
                  }}
                  role="img"
                  aria-label="A Scottish castle at dusk"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Eyebrow>A Thousand Years</Eyebrow>
              <h2 className="mt-4 text-4xl text-navy sm:text-5xl">Defenders of Scottish sovereignty</h2>
              <p className="mt-6 leading-relaxed text-ink-soft">
                Scottish barons held their lands directly from the Crown and stood as key defenders of Scotland’s
                independence. Today the dignity endures as a non-territorial title of honour, protected in Scots law.
              </p>
              <dl className="mt-8 divide-y divide-parchment-300/70 border-y border-parchment-300/70">
                {timeline.map((t) => (
                  <div key={t.year} className="flex items-baseline gap-6 py-3.5">
                    <dt className="font-inscribe text-lg text-gold-deep">{t.year}</dt>
                    <dd className="text-ink-soft">{t.event}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <ButtonLink href="/history" variant="outline">
                  Read the history
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ============================== FEATURED BARON ============================== */}
      <Section tone="parchment" className="border-t border-parchment-300/60">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
                <div className="absolute inset-0 translate-x-3 translate-y-3 border border-gold/40" aria-hidden />
                <div className="relative flex h-full w-full flex-col items-center justify-center bg-navy-deep texture-saltire text-center">
                  <Seal className="h-28 w-28" />
                  <p className="mt-6 px-6 font-serif text-lg italic text-parchment-200/80">
                    Arms of the featured baron
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <Eyebrow>Featured Baron</Eyebrow>
              <h2 className="mt-4 text-4xl text-navy sm:text-5xl">The Baron of Ardblair and Gask</h2>
              <GoldRule className="mt-6" align="start" />
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                Each season we honour a member of the baronage whose stewardship exemplifies the Baronial Code —
                service, integrity and the preservation of heritage. Their title, like all upon the Roll, is recorded
                with accuracy and legal precision.
              </p>
              <div className="mt-8">
                <ButtonLink href="/the-roll" variant="outline">
                  About the Roll
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ============================== CTA ============================== */}
      <Section tone="navy" className="text-center">
        <Container size="prose">
          <Reveal>
            <GoldRule className="mb-8" />
            <h2 className="text-4xl text-parchment-50 sm:text-5xl">Preserve your title’s legacy</h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-parchment-200/85">
              Verify an entry on the Roll, or speak with the Secretary about membership, the Pledge, and the work of the
              baronage.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href={ROLL_URL} variant="gold">
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
