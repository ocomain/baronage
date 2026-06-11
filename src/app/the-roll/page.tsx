import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow, GoldRule, PdfLink, Section, SectionHeading } from "@/components/primitives";
import { ROLL_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Roll of Scottish Barons",
  description:
    "An open, verified and impartial public register of the Baronage of Scotland — free, for life, to verify an entry. Maintained by researchers, genealogists and scholars at roll.baronage.com.",
};

const features = [
  {
    title: "Verified & vetted",
    body: "Every entry is thoroughly researched and authenticated with recognised authorities, researchers and institutions. Only dignities of proven legitimacy are recognised.",
  },
  {
    title: "Free, for life",
    body: "It is free for life to verify a pledged or non-pledged entry on the Roll — succession documented with accuracy and legal precision.",
  },
  {
    title: "Public & impartial",
    body: "A non-political, impartial honourable body. The record is open and public, safeguarding the historical integrity of Scottish baronies.",
  },
];

export default function TheRollPage() {
  return (
    <>
      <PageHero
        eyebrow="The Open Register"
        title="The Roll of Scottish Barons"
        intro="An open-source verification register of titles within the Baronage of Scotland — created to improve transparency and accuracy in the public record."
        image="/images/craighall.webp"
        position="center 32%"
        scrim="strong"
      />

      {/* Prominent, clearly-marked hand-off to the separate register */}
      <section className="border-b border-gold/25 bg-navy text-parchment-50 texture-saltire">
        <Container className="flex flex-col items-center gap-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="eyebrow eyebrow--light">A separate register · roll.baronage.com</p>
            <p className="mt-2 max-w-xl text-parchment-200/85">
              The live Roll is a distinct public sub-site. Searching or verifying an entry opens it in a new window.
            </p>
          </div>
          <ButtonLink href={ROLL_URL} variant="gold" className="shrink-0">
            Open the Roll Register
          </ButtonLink>
        </Container>
      </section>

      <Section tone="cream" className="border-b border-parchment-300/60">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-sm border border-parchment-300/70 bg-parchment-300/70 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col bg-parchment-50 p-8">
                  <h3 className="text-xl text-navy">{f.title}</h3>
                  <div className="gold-rule gold-rule--start mt-4 text-gold/70">
                    <span className="gold-rule__gem" />
                  </div>
                  <p className="mt-5 leading-relaxed text-ink-soft">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="Why the Roll Exists"
              title="A trusted record, where none was required"
            />
          </Reveal>
          <Reveal>
            <div className="prose-heritage mt-8">
              <p>
                Since 2004, there has been no legal requirement to record baronies in Scotland. In the absence of a
                register, false or questionable claimants have appeared in published sources. The Roll addresses this by
                maintaining a strict, verified and public record — a trusted resource for scholars, genealogists and all
                those interested in Scotland’s heritage.
              </p>
              <p>
                Inclusion is voluntary but requires adherence to rigorous criteria. As custodians of the Roll, we
                collaborate with recognised authorities to authenticate claims, and the non-recognition of unverified
                titles is fundamental to our work.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <figure className="mt-10 border-l-2 border-gold/60 bg-parchment-50 px-6 py-5">
              <blockquote className="font-serif text-lg italic leading-relaxed text-navy">
                “…the title, honour, rank and status of free baron, who shall now and in perpetuity be called barons of
                Spynie.”
              </blockquote>
              <figcaption className="mt-3 font-sans text-xs uppercase tracking-[0.16em] text-muted">
                Phrasing from a Crown charter grant — Records of the Parliament of Scotland
              </figcaption>
            </figure>
          </Reveal>

          <Reveal>
            <div className="mt-10 border-t border-parchment-300/70 pt-8">
              <p className="leading-relaxed text-ink-soft">Cooperating organisations and Barons agree to:</p>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-3 leading-relaxed text-ink-soft">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-none rotate-45 bg-gold" aria-hidden />
                  <span>
                    Not recognise the title, honour, rank, and status “baron of” (or higher dignity) for unverified
                    holders.
                  </span>
                </li>
                <li className="flex gap-3 leading-relaxed text-ink-soft">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-none rotate-45 bg-gold" aria-hidden />
                  <span>
                    It is recommended that organisations do not recognise a title not verified on the Roll.
                  </span>
                </li>
              </ul>
              <div className="mt-8">
                <PdfLink href="/docs/roll-inclusion-guidelines.pdf" label="Roll Inclusion Guidelines.pdf" />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="navy" className="text-center">
        <Container size="prose">
          <Reveal>
            <Eyebrow light>Visit the Register</Eyebrow>
            <h2 className="mt-4 text-3xl text-parchment-50 sm:text-4xl">Search the Roll of Scottish Barons</h2>
            <GoldRule className="mt-7" />
            <p className="mx-auto mt-7 max-w-xl leading-relaxed text-parchment-200/85">
              The Roll is maintained as a separate, public register at <strong className="text-gold-light">roll.baronage.com</strong>.
              It opens in a new window, distinct from this site.
            </p>
            <div className="mt-9 flex justify-center">
              <ButtonLink href={ROLL_URL} variant="gold">
                Open the Roll Register
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
