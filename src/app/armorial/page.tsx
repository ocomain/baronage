import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, Section } from "@/components/primitives";
import { baronies } from "@/lib/supporters";
import { CALENDLY_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Armorial",
  description:
    "Supporters of the work of the Association — each title verified and recorded upon the Roll.",
  openGraph: {
    title: "An Armorial Selection — Baronage of Scotland Association",
    description: "Supporters of the work of the Association — each title verified and recorded upon the Roll.",
    // NOTE go-live: revert to "/og-supporters.jpg" once the site serves at baronage.com
    images: [{ url: "https://new.baronage.com/og-supporters.jpg", width: 1200, height: 630, alt: "Coats of arms of supporters of the Baronage of Scotland Association" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://new.baronage.com/og-supporters.jpg"],
  },
};

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
            Every achievement shown here appears by the kind permission of its holder.{" "}
            <strong className="font-semibold not-italic text-navy">
              Space allows only a selection of our many supporters.
            </strong>
          </p>
        </Container>
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {baronies.map((b) => (
              <figure
                key={b.name}
                className="group relative flex h-full flex-col items-center border border-parchment-300/70 bg-parchment-50 px-6 pb-8 pt-10 text-center shadow-[0_18px_40px_-30px_rgba(10,16,36,0.5)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_26px_50px_-28px_rgba(10,16,36,0.6)]">
                  <div className="pointer-events-none absolute inset-2.5 border border-gold/0 transition-colors duration-300 group-hover:border-gold/25" aria-hidden />
                  <div className="flex h-56 w-full items-center justify-center">
                    {b.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={b.img}
                        alt={`Coat of arms — ${b.dignity} of ${b.name}`}
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
                  <figcaption className="mt-6">
                    <span className="block font-sans text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-gold-deep">
                      {b.dignity} of
                    </span>
                    <span className="mt-1.5 block font-display text-2xl text-navy">{b.name}</span>
                    {b.note ? (
                      <span className="mx-auto mt-2 block font-serif text-lg italic leading-snug text-gold-deep">
                        {b.note}
                      </span>
                    ) : null}
                  </figcaption>
              </figure>
            ))}
          </div>

          <Reveal>
            <p className="mt-12 text-center font-serif text-lg italic text-muted">
              A selection of support — titles verified in the Roll of Scottish Barons.
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
