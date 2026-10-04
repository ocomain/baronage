import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/primitives";
import { guideEntries } from "@/lib/guide";

export const metadata: Metadata = {
  alternates: { canonical: "/guide/" },
  title: "A Guide to the Scottish Baronage",
  description:
    "Where to start: how to address a Scottish baron, plain answers on baronies, the history in brief, and robes, chapeau and insignia, each with its sources.",
};

export default function GuidePage() {
  return (
    <>
      {/* Compact masthead: the list of topics is the page, so it should show without scrolling. */}
      <section className="bg-navy-deep text-parchment-50 texture-saltire">
        <Container className="py-12 sm:py-16">
          <p className="rise eyebrow eyebrow--light">Guide</p>
          <h1
            className="rise mt-4 font-display leading-[1.04] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            A guide to the Scottish baronage
          </h1>
          <p className="rise mt-5 max-w-2xl text-lg leading-relaxed text-parchment-200/85" style={{ animationDelay: "0.16s" }}>
            The short answer first. Each topic links to the page or paper that sets it out in full, with its sources.
          </p>
        </Container>
      </section>

      <Section tone="parchment" className="!py-14 sm:!py-16">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {guideEntries.map((e, i) => (
              <li key={e.href}>
                <Reveal delay={(i % 2) * 0.08} className="h-full">
                  <Link
                    href={e.href}
                    className="group flex h-full flex-col border border-parchment-300/80 bg-parchment-50 p-7 transition-colors hover:border-gold sm:p-8"
                  >
                    <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">
                      {e.kind === "Paper" ? "Reading Room paper" : "Page"}
                    </p>
                    <h2 className="mt-3 font-display text-3xl leading-tight text-navy">{e.title}</h2>
                    <p className="mt-3 text-lg leading-relaxed text-ink-soft">{e.summary}</p>
                    <span className="mt-6 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-oxblood transition-colors group-hover:text-oxblood-deep">
                      Read <span aria-hidden>→</span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
