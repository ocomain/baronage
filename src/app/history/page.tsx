import type { Metadata } from "next";
import { HistoryStory } from "@/components/HistoryStory";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, Section } from "@/components/primitives";
import { ROLL_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "History of the Scottish Baronage",
  description:
    "One of the oldest noble classes in Scotland — feudal superiors of the Crown, defenders of sovereignty, and today a non-territorial dignity preserved in law.",
};

export default function HistoryPage() {
  return (
    <>
      {/* Compact masthead — the storybook itself is the hero */}
      <section className="bg-navy-deep text-parchment-50 texture-saltire">
        <Container className="py-10 text-center sm:py-12">
          <p className="rise eyebrow eyebrow--light">A Thousand Years of Heritage · In Four Chapters</p>
          <h1
            className="rise mt-4 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            History of the Scottish Baronage
          </h1>
          <p className="rise mt-4 font-serif text-lg italic text-parchment-200/75" style={{ animationDelay: "0.16s" }}>
            Scroll through the chapters.
          </p>
        </Container>
      </section>

      {/* The storybook — each chapter scrolls over the last */}
      <HistoryStory />

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <p className="dropcap text-xl leading-relaxed text-ink-soft">
              Scottish baronies predate the peerage itself, standing among the most ancient noble dignities in the
              British Isles. Originating in the medieval period, a barony was an estate of land held directly from the
              Crown, erected into a <strong className="font-semibold text-navy">free barony</strong> by Crown Charter —
              a dignity created not by Parliament but by the sovereign will of the Scottish Crown.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Unlike the modern peerage, which is primarily a titular and parliamentary distinction, the Scottish
              Baronage was rooted in territorial jurisdiction. The baron held both the dignity of the title and the
              legal authority over his lands, often possessing the right of <em>“pit and gallows”</em> — the power of
              life and death.
            </p>
          </Reveal>
          <Reveal>
            <blockquote className="mt-10 border-l-2 border-gold pl-6 font-serif text-2xl italic leading-relaxed text-navy sm:pl-8">
              Today, the Scottish Baronage is a recognised dignity in Scots law.
            </blockquote>
          </Reveal>
          <Reveal>
            <p className="mt-10 text-lg leading-relaxed text-ink-soft">
              Since the abolition of the feudal system in 2004, baronies, which were held by feudal barons, have
              become{" "}
              <strong className="font-semibold text-navy">incorporeal heritable dignities</strong> — independent of any
              land, freely inheritable and transferable. The holder of a Scottish barony is correctly styled a{" "}
              <strong className="font-semibold text-navy">minor baron</strong>: a titled noble below the peerage, yet
              above the rank of gentleman.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="navy" className="text-center">
        <Container size="prose">
          <Reveal>
            <GoldRule className="mb-8" />
            <h2 className="text-3xl text-parchment-50 sm:text-4xl">Honour the heritage</h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-parchment-200/85">
              Explore the correct forms of address for a Scottish Baron, or verify a title on the Roll.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/proper-address" variant="outlineLight">
                Forms of address
              </ButtonLink>
              <ButtonLink href={ROLL_URL} variant="gold">
                Verify on the Roll
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
