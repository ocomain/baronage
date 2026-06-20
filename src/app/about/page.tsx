import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Seal } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, Section, SectionHeading } from "@/components/primitives";
import { Footnote } from "@/components/Footnote";

export const metadata: Metadata = {
  title: "About the Association",
  description:
    "Baronage of Scotland Association is a non-profit honourable body owned by its members — preserving the rights, heritage and dignity of Scottish Barons.",
};

const mandate = [
  "Advocacy for the titles of the Baronage of Scotland, one of the historic Three Estates.",
  "Legal protection of the historic rights and heritage of the baronage, upholding the principles of honour.",
  "Keeper of the open-source verification Roll of Scottish Barons.",
  "Offering barons The Pledge — converting a barony into a pledged hereditary title, bound by the Baronial Code.",
  "Representing barons in their engagement with government.",
  (
    <>
      Updating baronial descriptors to reflect the law: since the 2000 Act, titles are personal and
      non-territorial, and the term “feudal” baron is no longer correct for extant baronies (Lord Lyon
      Sellar, in 2009, accordingly termed them “quondam feudal baronies”
      <Footnote n={5}>
        <p>
          Lord Lyon W. D. H. Sellar (2009), p. 82 — quoted in Donald Draper Campbell,{" "}
          <a
            href="https://www.ccsna.org/sites/default/files/upload/2019-02/Scottish-Armory-and-Heraldry-by-Donald-Draper-Campbell-Esq-2019-01-12.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
          >
            Scottish Armory and Heraldry
          </a>{" "}
          (2019).
        </p>
      </Footnote>{" "}
      — quondam meaning “formerly”).
    </>
  ),
  "Lobbying for HRH the Baron of Renfrew as patron, for a royal warrant recognising the Roll, and for the modern relevance of the Lord Lyon office.",
  "Signing Memorandums of Understanding with other baronial and noble organisations, at home and on the Continent.",
];

const citations: { source: string; text: string; href?: string; pop?: boolean }[] = [
  {
    source: "Court of the Lord Lyon · 1943",
    href: "https://archive.org/details/in.ernet.dli.2015.69848/page/n187/mode/1up?q=Declares",
    text: "Finds and Declares that the Barons of Scotland are recognised as a “titled nobility,” of the ancient Feudal Nobility of Scotland.",
  },
  {
    source: "Lord Clyde’s dictum · 1992",
    href: "https://archive.org/details/1992-lord-clydes-dictum",
    text: "A barony falls into the class of noble — as opposed to ignoble — feus: a territorial dignity conferred by the Crown.",
  },
  {
    source: "The Institutional Writers",
    pop: true,
    text: "Craig, Stair and Bankton confirm that a grant of lands with rank attached ennobles the grantee — nobility following the dignity of the estate.",
  },
  {
    source: "Scotland Act 2000",
    href: "https://www.legislation.gov.uk/asp/2000/5/section/63",
    text: "On the abolition of the feudal system, the dignity of baron was expressly preserved as a non-territorial, “floating” dignity, protected in Scots law.",
  },
];

const entities = [
  {
    name: "The Association",
    role: "Membership body",
    body: "A non-profit honourable body owned by its members, with ownership and votes. Membership is optional and open to those who share our values and heritage.",
  },
  {
    name: "The Roll",
    role: "Title record",
    body: "A non-membership register of verified titles within the Baronage of Scotland — free, for life, to verify an entry.",
  },
  {
    name: "The Baron’s Trust",
    role: "Charity (forming)",
    body: "A separate, independent charitable entity being established for donations to good causes, in collaboration with all baronage stakeholders.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The Association"
        title="About the Baronage of Scotland Association"
        intro="An independent, voluntary and non-profit honourable body, dedicated to preserving the historical integrity of Scottish baronies."
        image="/images/great-hall.webp"
        position="center 60%"
      />

      {/* The emblem and its motto */}
      <Section tone="navyDeep" className="!pb-10 sm:!pb-12">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="relative mx-auto flex aspect-square w-full max-w-xs items-center justify-center border border-gold/30 bg-navy/50 sm:max-w-sm">
                <div className="pointer-events-none absolute inset-3 border border-gold/15" aria-hidden />
                <Seal className="h-48 w-48 drop-shadow-[0_18px_45px_rgba(0,0,0,0.5)] sm:h-60 sm:w-60" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow eyebrow--light">Our Emblem</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-parchment-50 sm:text-4xl">
                In Liberam Baroniam · Per Cartas Nostras
              </h2>
              <GoldRule className="mt-6" align="start" />
              <p className="mt-6 font-serif text-xl italic leading-relaxed text-gold-light">
                “Into a free barony · By our charters”
              </p>
              <div className="mt-6 space-y-4 leading-relaxed text-parchment-200/85">
                <p>
                  Our emblem takes the form of an engraved seal — recalling the wax seals appended to the Crown
                  charters by which every Scottish barony was created. The motto around its ring preserves the very
                  words of those grants: lands were erected{" "}
                  <em className="text-parchment-100">in liberam baroniam</em> — “into a free barony” — conferring the
                  rank and dignity of baron upon the grantee and their heirs.
                </p>
                <p>
                  <em className="text-parchment-100">Per cartas nostras</em> — “by our charters” — records the source
                  of that honour: the sealed charters of the Crown, from which every baronial dignity flows. The shield
                  at the seal’s centre stands for the baronage itself — the ancient Nobility of Scotland, whose
                  titles the Association and the Roll exist to verify and preserve.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>


      <Section tone="navyDeep" className="!pt-10 sm:!pt-12">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Recognised in Law"
              title="A noble dignity, affirmed"
              light
              intro="The status of the Scottish Baronage is recognised in the nobiliary court, the Court of Session and within UK legal frameworks."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {citations.map((c, i) => (
              <Reveal key={c.source} delay={(i % 2) * 0.1} className="h-full">
                <figure className="flex h-full flex-col border-l-2 border-gold/60 bg-navy/40 p-7">
                  <blockquote className="font-serif text-lg italic leading-relaxed text-parchment-100/90">
                    {c.text}
                  </blockquote>
                  <figcaption className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-gold-light">
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-gold-light/50 underline-offset-4 transition-colors hover:text-parchment-50"
                      >
                        {c.source}
                      </a>
                    ) : c.pop ? (
                      <Footnote
                        n={4}
                        label={c.source}
                        triggerClassName="cursor-pointer border-0 bg-transparent p-0 font-sans text-xs uppercase tracking-[0.18em] text-gold-light underline decoration-gold-light/50 underline-offset-4 transition-colors hover:text-parchment-50"
                      >
                        <p>
                          Institutional Writers{" "}
                          <em>(writers whose text is accepted in Scottish courts as an explanation of the law)</em>:
                        </p>
                        <ol className="mt-3 ml-4 list-[lower-alpha] space-y-2 marker:font-inscribe marker:text-gold-deep">
                          <li className="pl-1">
                            Sir Thomas Craig, Jus Feudale (I.xii.23): “Where the prince makes a grant of lands which
                            have rank attached to them, he{" "}
                            <strong className="font-semibold">ennobles the grantee</strong> even though no express
                            conferment of noble rank be made.”
                          </li>
                          <li className="pl-1">
                            Lord Stair, Institutions (II.iii.45): “Erection is, when lands are not only united in one
                            tenement, but are erected into the dignity of a barony; which comprehendeth lordship,
                            earldom, &amp;c. all which are but more{" "}
                            <strong className="font-semibold">noble titles of a barony</strong>, having the like feudal
                            effects.”
                          </li>
                          <li className="pl-1">
                            Bankton, Institute (II.iii.84): “<em>Nobility</em> followed the property of the estate to
                            which it was annexed.”
                          </li>
                        </ol>
                      </Footnote>
                    ) : (
                      c.source
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <SectionHeading align="start" eyebrow="Our Mandate" title="In service of heritage and society" />
          </Reveal>
          <Reveal>
            <ul className="mt-8 space-y-4">
              {mandate.map((item, i) => (
                <li key={i} className="flex gap-4 leading-relaxed text-ink-soft">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-none rotate-45 bg-gold" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <div className="mt-12 border-l-2 border-gold/60 pl-6">
              <p className="font-serif text-lg italic leading-relaxed text-oxblood-deep">
                The heir to the British throne holds the baronage titles Lord of the Isles and Baron of Renfrew, and around thirty Scottish clan chiefs
                are also barons — titles rooted deep in antiquity. As Lord Lyon Sir Thomas Innes of Learney observed,
                Scottish barons are equivalent to the Continental barons.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="parchment" className="border-t border-parchment-300/50">
        <Container size="prose">
          <Reveal>
            <SectionHeading align="start" eyebrow="About Us" title="An impartial, voluntary honourable body" />
          </Reveal>
          <Reveal>
            <div className="prose-heritage mt-8">
              <p>
                The Roll of Scottish Barons and Baronage of Scotland Association (baronage.com), “the Roll,” is an independent,
                voluntary non-profit dedicated to preserving the historical integrity of Scottish baronies. Since 2004,
                there has been no legal requirement to record baronies in Scotland, leading to false or questionable
                claimants appearing in sources like Debrett’s. We address this by maintaining a strict and verified,
                public record, ensuring succession is documented with accuracy and legal precision.
              </p>
              <p>
                As a non-political and impartial honourable body, we collaborate with recognised authorities,
                researchers, and institutions to authenticate claims. Inclusion on the Roll is free/voluntary pledged or non-pledged but requires
                adherence to rigorous criteria—only dignities with proven legitimacy are recognised. Non-recognition of
                unverified titles is fundamental. By safeguarding the historical record and upholding the traditions of
                the Scottish Baronage—part of the Three Estates—we provide a trusted resource for scholars,
                genealogists, and those interested in Scotland’s heritage.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="cream" className="border-y border-parchment-300/60">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Governance"
              title="Three separate entities"
              intro="To ensure proper checks and balances, our work is held across three distinct bodies."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {entities.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col border border-parchment-300/70 bg-parchment-50 p-8">
                  <span className="eyebrow">{e.role}</span>
                  <h3 className="mt-3 text-2xl text-navy">{e.name}</h3>
                  <div className="gold-rule gold-rule--start mt-4 text-gold/70">
                    <span className="gold-rule__gem" />
                  </div>
                  <p className="mt-5 leading-relaxed text-ink-soft">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-10 max-w-3xl text-center font-serif text-lg italic leading-relaxed text-muted">
              We, as custodians of the Roll, do not wish to own or control this entity; we plan to eventually transfer
              its oversight to government supervisors to ensure proper checks and balances into the future (once
              agreed with officials).
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <div className="border border-parchment-300/70 bg-parchment-50 p-8 text-center sm:p-10">
              <h3 className="text-2xl text-navy">Legal Status</h3>
              <GoldRule className="mt-5" />
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-ink-soft">
                Baronage of Scotland Association is a non-profit honourable body owned by its members — not a
                charity. A separate, independent charitable entity is being formed for donations from barons to good
                causes, in collaboration with other stakeholders.
              </p>
              <div className="mt-8 flex justify-center">
                <ButtonLink href="/governing-council" variant="outline">
                  The Governing Council
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
