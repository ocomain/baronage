import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, ExternalArrow, Eyebrow, GoldRule, PdfLink, Section, SectionHeading } from "@/components/primitives";
import { ROLL_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Roll of Scottish Barons",
  description:
    "An open, verified and impartial public register of the Baronage of Scotland — free, for life, to verify an entry. Maintained by researchers, genealogists and scholars at roll.baronage.com. Related organisations: the Court of the Lord Lyon, the Scottish Barony Register and the Convention of the Baronage of Scotland.",
};

const features = [
  {
    title: "Verified & vetted",
    body: "Every entry is thoroughly researched and authenticated with recognised authorities, researchers and institutions. Only dignities of proven legitimacy are recognised — and each entry publishes the credentials on which it rests.",
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

const organisations: { name: string; href?: string; linkLabel?: string; body: string }[] = [
  {
    name: "The Court of the Lord Lyon",
    href: "https://www.courtofthelordlyon.scot",
    linkLabel: "courtofthelordlyon.scot",
    body: "Scotland’s heraldic authority and a court of law. The Lyon Court’s letters patent, matriculations and official gazette notices are the Roll’s primary sources: where a dignity is evidenced under the hand of the Lord Lyon, no further proof is asked. The Court is wholly independent of this Association and of every private body within the baronial community.",
  },
  {
    name: "The Scottish Barony Register",
    href: "https://scottishbaronyregister.org",
    linkLabel: "scottishbaronyregister.org",
    body: "Established by members of the Scottish legal profession upon the abolition of feudal tenure in 2004, under a Custodian whose certification the Lord Lyon accepts as evidence of title. We recognise the Register as an authoritative source for inclusion on the Roll, and we recommend that every holder of a Scottish barony record their legal title there. The Roll is complementary to the Register, not in competition with it: the Register records transfers of ownership since 2004, while the Roll also documents the wider historic baronage — dignities held by dynastic succession, by chiefs of Name and by peers — which have never changed hands in the modern era and therefore appear in no register of transfers. For these, the records of the Lyon Office stand as primary evidence.",
  },
  {
    name: "The Convention of the Baronage of Scotland",
    href: "https://www.scotsbarons.org",
    linkLabel: "scotsbarons.org",
    body: "The historic representative body of Scotland’s baronage, revived in the twentieth century with the encouragement of Lord Lyon Sir Thomas Innes of Learney. Though quieter in recent years, the Convention holds a distinguished place in the modern history of the baronage, and the Association honours it.",
  },
  {
    name: "The Forum for the Scottish Baronage",
    body: "An organisation of barony owners, which describes itself as “the largest and most active community of Scottish barons and baronesses in the world”. The Forum publishes commentary of its own on other baronial organisations, including this Roll. We leave readers to weigh such commentary against the primary record: the Roll seeks no private organisation’s endorsement, resting instead on the public records of the Lyon Court and the certification of the Scottish Barony Register.",
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
              The live Roll is a distinct public sub-site — every entry and its evidence open to inspection. Searching
              or verifying an entry opens it in a new window.
            </p>
          </div>
          <ButtonLink href={ROLL_URL} variant="gold" className="shrink-0">
            Open the Roll Register
          </ButtonLink>
        </Container>
      </section>

      <Section tone="cream" className="border-b border-parchment-300/60 !py-12 sm:!py-16">
        <Container>
          <Reveal>
            <figure className="mx-auto mb-12 max-w-3xl border-l-2 border-gold/60 bg-parchment-50 px-6 py-5">
              <blockquote className="font-serif text-lg italic leading-relaxed text-navy">
                “…the title, honour, rank and status of free baron, who shall now and in perpetuity be called barons of
                Spynie.”
              </blockquote>
              <figcaption className="mt-3 font-sans text-xs uppercase tracking-[0.16em] text-muted">
                Phrasing from a Crown charter grant —{" "}
                <a
                  href="https://www.rps.ac.uk/search.php?a=fcf&fn=jamesvi_trans&id=11094&t=trans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-deep transition-colors hover:text-oxblood"
                >
                  Records of the Parliament of Scotland ↗
                </a>
              </figcaption>
            </figure>
          </Reveal>
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

      <Section tone="parchment" className="!py-12 sm:!py-14">
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
                Because the Roll is open source, nothing is asked to be taken on trust. Every entry publishes the
                credentials on which it rests — Lyon Court instruments, Scottish Barony Register references, gazette
                citations and images of original documents — so that anyone, anywhere, may verify a title for
                themselves.
              </p>
              <p>
                We, as custodians of the Roll, do not wish to own or control this entity; we plan to eventually
                transfer its oversight to government supervisors to ensure proper checks and balances into the future
                (once agreed with officials).
              </p>
              <p>
                Inclusion is voluntary but requires adherence to rigorous criteria. As custodians of the Roll, we
                collaborate with recognised authorities to authenticate claims, and the non-recognition of unverified
                titles is fundamental to our work.
              </p>
            </div>
          </Reveal>


          <Reveal>
            <figure className="mt-10 border border-parchment-300/70 bg-parchment-50 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-sm border border-emerald-300 bg-emerald-50 px-3 py-1 font-sans text-xs text-emerald-900">
                  Authenticated Baron
                </span>
                <span className="rounded-sm border border-amber-300 bg-amber-100 px-3 py-1 font-sans text-xs text-amber-900">
                  🛡️ Hereditary Title
                </span>
              </div>
              <p className="mt-4 font-serif text-xl text-navy">The Much Honoured Baron of Hartsyde</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink-soft">
                <li>
                  • Verified by The Roll 30 Jun 2025 seeing original Warrant for Letters Patent “Baron of Hartsyde”
                  officially recognised by Lord Lyon 16th Aug 2010
                </li>
                <li>• Scottish Barony Register, Dignity of the Barony of Hartsyde (County of Lanark) 26th Feb 2010 “2010/02”</li>
                <li>• Burke’s Peerage Revised Families. Burke’s Peerage (Genealogical Books) Ltd. Updated 2025</li>
                <li>
                  • Pledged Hereditary Title — the holder has formally signed the Roll’s{" "}
                  <Link
                    href="/pledge"
                    className="text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:text-oxblood-deep"
                  >
                    Baronial Pledge
                  </Link>
                  , a declaration that the barony be preserved within the family line as a hereditary dignity
                </li>
              </ul>
              <div className="mt-6 grid grid-cols-2 items-start gap-4 sm:gap-5">
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hartsyde-patent.webp"
                    alt="Original letters patent document, as displayed on the Hartsyde entry"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="w-full border border-parchment-300/70"
                  />
                  <span className="mt-2 block font-sans text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                    Original letters patent
                  </span>
                </div>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/hartsyde-pledge.webp"
                    alt="Signed Baronial Pledge document, as displayed on the Hartsyde entry"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="w-full border border-parchment-300/70"
                  />
                  <span className="mt-2 block font-sans text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                    The signed Baronial Pledge
                  </span>
                </div>
              </div>
              <figcaption className="mt-5 font-sans text-xs uppercase tracking-[0.16em] text-muted">
                An entry as published — credentials, original documents and the signed Baronial Pledge, Barony of
                Hartsyde ·{" "}
                <a
                  href="https://roll.baronage.com/baron/jean-guy-philip-boisserolles-de-st-julien"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-deep transition-colors hover:text-oxblood"
                >
                  view the live entry ↗
                </a>
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

      <Section tone="cream" id="related-organisations" className="border-t border-parchment-300/60 !py-12 sm:!py-14">
        <Container size="prose">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="Recognised Sources"
              title="Related Organisations"
              intro={
                <>
                  The Roll does not stand alone. It is maintained under the oversight of the Association’s{" "}
                  <Link
                    href="/governing-council"
                    className="text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:text-oxblood-deep"
                  >
                    Governing Council
                  </Link>
                  , and draws gladly on the work of Scotland’s established institutions.
                </>
              }
            />
          </Reveal>

          <div className="mt-12 space-y-10">
            {organisations.map((o, i) => (
              <Reveal key={o.name} delay={i * 0.06}>
                <article className="border-t border-parchment-300/70 pt-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="text-2xl text-navy">{o.name}</h3>
                    {o.href && (
                      <a
                        href={o.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-gold-deep"
                      >
                        {o.linkLabel}
                        <ExternalArrow className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <p className="mt-4 leading-relaxed text-ink-soft">{o.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <aside className="mt-14 border-l-2 border-gold/60 bg-white px-6 py-7 sm:px-8">
              <Eyebrow>For the Avoidance of Doubt</Eyebrow>
              <ul className="mt-6 space-y-6">
                <li className="leading-relaxed text-ink-soft">
                  <strong className="font-semibold text-navy">Who maintains the Roll.</strong> The Roll is maintained
                  under the oversight of the Association’s Governing Council, whose members are published — by name,
                  with their records — on{" "}
                  <Link
                    href="/governing-council"
                    className="text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:text-oxblood-deep"
                  >
                    this site
                  </Link>
                  .
                </li>
                <li className="leading-relaxed text-ink-soft">
                  <strong className="font-semibold text-navy">“Hereditary Title.”</strong> The badge is defined openly
                  on the register itself: “All Scottish baronial dignities are heritable. The Roll displays a
                  ‘Hereditary Title’ badge where hereditary succession is pledged, or where the dignity is treated as
                  dynastic.” It describes the Roll’s treatment of succession; it asserts no category of property law.
                </li>
                <li className="leading-relaxed text-ink-soft">
                  <strong className="font-semibold text-navy">“Verified.”</strong> Verification on the Roll means
                  documentary authentication against the primary record — letters patent, the official gazettes of the
                  Lyon Office, and the certification of the Scottish Barony Register. Since 2004 no register of
                  Scottish baronies, public or private, has carried statutory force; what a serious record offers is
                  evidence. The Roll’s entries cite theirs.
                </li>
              </ul>
            </aside>
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
