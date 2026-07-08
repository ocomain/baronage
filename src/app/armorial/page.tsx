import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ArmorialGrid } from "@/components/ArmorialGrid";
import { ButtonLink, Container, GoldRule, Section } from "@/components/primitives";
import { baronies } from "@/lib/supporters";
import { CALENDLY_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/armorial/" },
  title: "The Armorial",
  description:
    "Supporters of the work of the Association — each title verified and recorded upon the Roll.",
  openGraph: {
    title: "An Armorial Selection — Baronage of Scotland Association",
    description: "Supporters of the work of the Association — each title verified and recorded upon the Roll.",
    images: [{ url: "/og-supporters.jpg", width: 1200, height: 630, alt: "Coats of arms of supporters of the Baronage of Scotland Association" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-supporters.jpg"],
  },
};

/**
 * Hover flourish — "in the Baronage of Scotland" fades in letter-by-letter on
 * card hover. Pure CSS: the parent figure's `group` hover drives a staggered
 * per-letter opacity transition (delay = index · step). The letters carry NO
 * vertical travel of their own, so they rise with the card lift in lockstep
 * with the rest of the caption and stay aligned. Decorative, so aria-hidden;
 * desktop-only by nature (no hover on touch).
 */
function Flourish({ text, placement }: { text: string; placement: "top" | "below" }) {
  // "top" (chief cards) is an absolute overlay centred between the gold frame
  // and the arms — adds no height. "below" is an in-flow line under the barony
  // name: it reserves its own line so the card grows to hold it (no overflow at
  // the bottom edge, even for two-line names) while the arms stay top-anchored.
  const base =
    placement === "top"
      ? "pointer-events-none absolute inset-x-0 top-[1.45rem] z-10"
      : "mt-2 block";
  return (
    <span
      aria-hidden
      className={`${base} whitespace-nowrap px-4 text-center font-display text-[0.88rem] italic leading-none tracking-wide text-gold-deep`}
    >
      {[...text].map((ch, i) => (
        <span
          key={i}
          style={{ transitionDelay: `${i * 28}ms` }}
          className="inline-block opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:duration-200"
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export default function SupportersPage() {
  return (
    <>
      {/* Compact masthead — the armorial itself is the show */}
      <section className="bg-navy-deep text-parchment-50 texture-saltire">
        <Container className="py-12 text-center sm:py-14">
          <p className="rise eyebrow eyebrow--light">From the Roll of Scottish Barons</p>
          <h1
            className="rise mt-4 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            An Armorial of Supporters
            <span className="mt-2 block text-[0.52em] leading-snug text-parchment-200/85">
              of the work of the Association
            </span>
          </h1>
        </Container>
      </section>

      <Section tone="parchment" className="!pt-12 sm:!pt-14">
        <Container size="prose" className="mb-12 sm:mb-14">
          <p className="text-center font-serif text-lg italic leading-relaxed text-muted">
            Every achievement shown here appears by request or kind permission of its holder.{" "}
            <strong className="font-semibold not-italic text-navy">
              Space allows only a selection of our many supporters.
            </strong>
          </p>
        </Container>
        <Container>
          <ArmorialGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {baronies.map((b) => (
              <figure
                key={b.name}
                className="group relative flex h-full flex-col items-center border border-parchment-300/70 bg-parchment-50 px-6 pb-8 pt-10 text-center shadow-[0_18px_40px_-30px_rgba(10,16,36,0.5)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_26px_50px_-28px_rgba(10,16,36,0.6)]">
                  <div className="pointer-events-none absolute inset-2.5 border border-gold/0 transition-colors duration-300 group-hover:border-gold/25" aria-hidden />
                  {b.note && !b.officer && <Flourish text="in the Baronage of Scotland" placement="top" />}
                  <div className="flex h-56 w-full items-center justify-center">
                    {b.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={b.img}
                        alt={b.officer ? `Coat of arms — ${b.name}${b.note ? `, ${b.note}` : ""}` : `Coat of arms — ${b.dignity} of ${b.name}`}
                        width={208}
                        height={208}
                        loading="eager"
                        decoding="async"
                        draggable={false}
                        className="h-52 w-52 object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                    ) : (
                      <span className="font-display text-6xl text-gold/50">{b.name.charAt(0)}</span>
                    )}
                  </div>
                  <figcaption className="relative mt-6 w-full">
                    {b.officer ? (
                      <>
                        <span className="block whitespace-nowrap font-display text-lg leading-tight text-navy">
                          {b.name}
                        </span>
                        {b.note && (
                          <span className="mt-2 block font-serif text-lg italic leading-snug text-gold-deep">
                            {b.note}
                          </span>
                        )}
                        {b.sub && (
                          <span className="mt-1 block whitespace-nowrap font-display text-[0.88rem] italic leading-none tracking-wide text-gold-deep">
                            {b.sub}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        {b.dignity !== "Younger" && (
                          <span className="block font-sans text-[0.55rem] font-medium uppercase tracking-[0.26em] text-gold-deep/70">
                            The Much Hon
                          </span>
                        )}
                        <span className="mt-1 block font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
                          {b.dignity} of
                        </span>
                        <span className="mt-1.5 block font-display text-3xl text-navy">{b.name}</span>
                        {b.note ? (
                          <span className="mx-auto mt-2 block font-serif text-lg italic leading-snug text-gold-deep">
                            {b.note}
                          </span>
                        ) : (
                          <Flourish text="in the Baronage of Scotland" placement="below" />
                        )}
                      </>
                    )}
                  </figcaption>
              </figure>
            ))}
          </ArmorialGrid>

          <Reveal>
            <p className="mt-12 text-center font-serif text-lg italic text-muted">
              A selection of support — Baronage of Scotland titles verified in the{" "}
              <a
                href="https://roll.baronage.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
              >
                Roll of Scottish Barons
              </a>
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="navy" className="text-center">
        <Container size="prose">
          <Reveal>
            <GoldRule className="mb-8" />
            <h2 className="text-3xl text-parchment-50 sm:text-4xl">Join their number</h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-parchment-200/85">
              Verify a title on the Roll, or take the Pledge to help support our work.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href={CALENDLY_URL} variant="gold">
                Request a Call Back
              </ButtonLink>
              <ButtonLink href="/pledge" variant="outlineLight">
                The Pledge
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
