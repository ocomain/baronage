import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Section } from "@/components/primitives";

export const metadata: Metadata = {
  title: "The Baronial Code of Honour",
  description:
    "The principles and standards that define the collective commitment of the Scottish baronage to honour, duty and nobility.",
};

const principles = [
  {
    title: "Hereditary Title Conversion",
    body: "Each Baron commits to The Pledge, converting their title into a pledged hereditary honour preserved within the family bloodline for future generations.",
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
    body: "Should a Baron be convicted of a serious crime, as judged by their fellow barons, they shall forfeit their title and recognition on the Roll.",
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
      />

      <Section tone="parchment">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.08} className="h-full">
                <article className="flex h-full flex-col border border-parchment-300/70 bg-parchment-50 p-7">
                  <span className="font-display text-4xl text-gold/55">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-3 text-xl text-navy">{p.title}</h2>
                  <p className="mt-4 leading-relaxed text-ink-soft">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navyDeep" className="text-center">
        <Container size="prose">
          <Reveal>
            <h2 className="text-3xl text-parchment-50 sm:text-4xl">Take the Oath. Make the Pledge.</h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-parchment-200/85">
              The Code is affirmed through the Baronial Oath and The Pledge — a lasting commitment of honour to family,
              baronage and country.
            </p>
            <div className="mt-9 flex justify-center">
              <ButtonLink href="/oath" variant="gold">
                The Oath & The Pledge
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
