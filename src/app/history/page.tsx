import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { InteractiveHistory } from "@/components/InteractiveHistory";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow, GoldRule, Section } from "@/components/primitives";
import { ROLL_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "History of the Scottish Baronage",
  description:
    "One of the oldest noble classes in Scotland — feudal superiors of the Crown, defenders of sovereignty, and today a non-territorial dignity preserved in law.",
};

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="A Thousand Years of Heritage"
        title="History of the Scottish Baronage"
        intro="One of the oldest noble classes in Scotland — with origins in the medieval period, predating the peerage itself."
      />

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <p className="dropcap text-xl leading-relaxed text-ink-soft">
              For over a thousand years the Scottish baronage has stood among the nation’s oldest nobility — feudal
              superiors of the Crown, defenders of its sovereignty, and today a dignity of honour preserved in law. Its
              story unfolds across the centuries that shaped Scotland itself.
            </p>
          </Reveal>
        </Container>

        <Container className="mt-16">
          <Reveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <Eyebrow>The Story in Four Chapters</Eyebrow>
              <h2 className="mt-4 text-4xl text-navy sm:text-5xl">From the Crown to the present day</h2>
              <GoldRule className="mt-6" />
            </div>
          </Reveal>
          <Reveal>
            <InteractiveHistory />
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
