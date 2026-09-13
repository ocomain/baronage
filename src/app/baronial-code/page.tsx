import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Seal } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow, GoldRule, Section } from "@/components/primitives";

export const metadata: Metadata = {
  alternates: { canonical: "/baronial-code/" },
  title: "The Baronial Code of Honour",
  description:
    "The principles and standards that define the collective commitment of the Scottish baronage to honour, duty and nobility.",
};

const principles = [
  {
    title: "A Pledged Hereditary Title",
    body: "Each Baron commits to The Pledge — an undertaking in honour, not in law — to preserve their barony as a hereditary title within the family bloodline for future generations.",
  },
  {
    title: "Honour and Integrity",
    body: "Conduct oneself with the utmost honour, integrity and dignity, never acting in a manner that could bring disrepute upon the baronage.",
  },
  {
    title: "Law and Order",
    body: "Respect and adhere to the laws of one’s country, championing the rule of law and upholding the rights of others.",
  },
  {
    title: "Dedication to Service",
    body: "Dedicate oneself to the community, the baronage and the greater good — using one’s influence to promote charitable works.",
  },
  {
    title: "Preservation of Heritage",
    body: "Work to preserve the rich history and traditions of the Scottish baronage, ensuring our ancestors’ legacy is passed down.",
  },
  {
    title: "Forfeiture of Title",
    body: "Should a Baron be convicted of a serious crime, as judged by their fellow barons, they shall forfeit their title recognition on the Roll (does not affect title succession recognition).",
  },
  {
    title: "Loyalty to the Crown",
    body: "Where a baron is a citizen of a Commonwealth country, honour one’s sovereign and fulfil one’s duties as a noble subject.",
  },
  {
    title: "Confidentiality and Discretion",
    body: "Maintain discretion regarding the internal affairs of the baronage, protecting the privacy and integrity of fellow barons.",
  },
  {
    title: "Lifelong Commitment",
    body: "Regard the Pledge as a lifelong commitment — continuously striving to embody the virtues of nobility in all aspects of life.",
  },
];

export default function BaronialCodePage() {
  return (
    <>
      <PageHero
        eyebrow="Honour · Duty · Nobility"
        title="The Baronial Code of Honour"
        intro="The principles and standards that define our collective commitment. By signing The Pledge, each Baron affirms this Code."
        image="/images/knight-helm.webp"
      />

      <Section tone="parchment" className="!pb-0">
        <Container size="prose">
          <Reveal>
            <aside className="border-l-4 border-gold bg-parchment-100 px-6 py-6 sm:px-8 sm:py-7">
              <Eyebrow>Virtuous and well deserving</Eyebrow>
              <p className="mt-3 font-serif text-2xl leading-snug text-navy sm:text-3xl">
                <strong className="font-semibold">
                  Barony titles are conferred on “persons deserving of being raised to the nobility”.
                </strong>
              </p>
              <p className="mt-3 font-inscribe text-[0.7rem] uppercase tracking-[0.24em] text-gold-deep">
                Court of Session · 2019
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-muted">
                <a
                  href="https://freiherrvonquast.wordpress.com/wp-content/uploads/2020/06/margaret-hamilton-of-rockhall-v-lord-lyon-king-of-arms-2019-csoh-85-case.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
                >
                  <em>Hamilton of Rockhall v Lord Lyon</em> [2019] CSOH 85
                </a>
                , para [101], taking up Innes of Learney, <em>Scots Heraldry</em> (2nd ed., 1956), p. 85 (quoted at
                para [14]): under the{" "}
                <a
                  href="https://www.legislation.gov.uk/aosp/1672/47"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
                >
                  Lyon King of Arms Act 1672
                </a>{" "}
                the Lord Lyon grants arms to “virtuous and well deserving persons” — “persons deserving of being raised
                to the nobility”, who by the grant become the root of a “noble stok”.
              </p>
            </aside>
          </Reveal>
        </Container>
      </Section>

      <Section tone="parchment">
        <Container size="prose">
          {/* The Code, presented as the document itself */}
          <Reveal>
            <div className="relative border border-gold/40 bg-parchment-50 px-6 py-12 shadow-[0_30px_80px_-40px_rgba(10,16,36,0.5)] sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute inset-3 border border-gold/20" aria-hidden />
              <div className="flex flex-col items-center text-center">
                <Seal className="h-16 w-16" />
                <p className="eyebrow mt-5">In Nine Articles</p>
                <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">The Code of Honour</h2>
                <GoldRule className="mt-6" />
              </div>

              <ol className="mt-12">
                {principles.map((p, i) => (
                  <Reveal key={p.title} delay={Math.min(i * 0.04, 0.2)}>
                    <li
                      className={`grid grid-cols-[3.2rem_1fr] items-start gap-x-5 py-7 sm:grid-cols-[4rem_1fr] sm:gap-x-8 ${
                        i > 0 ? "border-t border-parchment-300/70" : ""
                      }`}
                    >
                      <span className="pt-0.5 text-center font-inscribe text-2xl leading-none text-gold-deep sm:text-3xl">
                        {["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][i]}
                      </span>
                      <div>
                        <h3 className="font-display text-xl text-navy sm:text-2xl">{p.title}</h3>
                        <p className="mt-2.5 leading-relaxed text-ink-soft">{p.body}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>

              <div className="mt-10 flex flex-col items-center border-t border-parchment-300/70 pt-9 text-center">
                <p className="max-w-md font-serif text-lg italic leading-relaxed text-ink-soft">
                  Affirmed by each Baron upon taking the Pledge — in honour, to family, baronage and country.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="navyDeep" className="text-center">
        <Container size="prose">
          <Reveal>
            <h2 className="text-3xl text-parchment-50 sm:text-4xl">Make the Pledge.</h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-parchment-200/85">
              The Code is affirmed through The Pledge — a lasting commitment of honour to family, baronage and country.
            </p>
            <div className="mt-9 flex justify-center">
              <ButtonLink href="/pledge" variant="gold">
                The Pledge
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
