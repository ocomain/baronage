import type { Metadata } from "next";
import Link from "next/link";
import { HistoryChapters } from "@/components/HistoryChapters";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, Section } from "@/components/primitives";
import { ROLL_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/history/" },
  title: "History of the Scottish Baronage",
  description:
    "One of the oldest noble classes in Scotland — feudal superiors of the Crown, defenders of sovereignty, and today a non-territorial dignity preserved in law.",
};

const more = [
  { href: "/scottish-baronies-explained", label: "Scottish Baronies, Explained" },
  { href: "/reading-room/baronage-in-the-statutes", label: "The baronage in the statutes, 1428–2004" },
  { href: "/reading-room/treaty-of-union", label: "The Treaty of Union and the baronage" },
  { href: "/reading-room/innes-of-learney-1945", label: "The Lord Lyon’s Case for the Baronage" },
];

export default function HistoryPage() {
  return (
    <>
      {/* Compact masthead — the storybook itself is the hero */}
      <section className="bg-navy-deep text-parchment-50 texture-saltire">
        <Container className="py-10 text-center sm:py-12">
          <p className="rise eyebrow eyebrow--light">A Thousand Years of Heritage · In Eight Chapters</p>
          <h1
            className="rise mt-4 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            History of the Scottish Baronage
          </h1>
          <p className="rise mt-4 font-serif text-lg italic text-parchment-200/75" style={{ animationDelay: "0.16s" }}>
            The barons and their rights, in the words of the record.
          </p>
        </Container>
      </section>

      {/* The storybook — each chapter scrolls over the last */}
      <HistoryChapters />

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <blockquote className="border-l-2 border-gold pl-6 font-serif text-2xl italic leading-relaxed text-navy sm:pl-8">
              Today, baron is a protected dignity in Scots law.
            </blockquote>
          </Reveal>
          <Reveal>
            <p className="mt-8 text-lg leading-relaxed text-ink-soft">
              A Scottish barony is now an <strong className="font-semibold text-navy">incorporeal heritable dignity</strong>
              , independent of any land. Its holder is a <strong className="font-semibold text-navy">minor baron</strong>
              : a titled noble below the peerage and above the rank of gentleman.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-10 font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">
              Read further
            </p>
            <ul className="mt-3 space-y-2 text-lg">
              {more.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:text-oxblood-deep"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
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
