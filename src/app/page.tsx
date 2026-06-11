import Link from "next/link";
import type { ReactNode } from "react";
import { HeroHome } from "@/components/HeroHome";
import { BaroniesCarousel } from "@/components/BaroniesCarousel";
import { ImageBand } from "@/components/ImageBand";
import { Reveal } from "@/components/Reveal";
import { Footnote } from "@/components/Footnote";
import { ButtonLink, Container, Eyebrow, GoldRule, Section } from "@/components/primitives";
import { ROLL_URL } from "@/lib/site";

const CHARTER_IMG = "/images/charter-seal.webp";
const GLEN_IMG = "/images/glen-mist.webp";

/** Footnote-reference superscript that opens the citation in a pop-up card. */
function Fn({ n }: { n: number }) {
  const f = footnotes[n - 1];
  return (
    <Footnote n={n}>
      <p>{f.body}</p>
      {f.subs && f.subs.length > 0 ? (
        <ol className="mt-3 ml-4 list-[lower-alpha] space-y-2 marker:font-inscribe marker:text-gold-deep">
          {f.subs.map((s, j) => (
            <li key={j} className="pl-1">
              {s}
            </li>
          ))}
        </ol>
      ) : null}
    </Footnote>
  );
}

const pillars = [
  {
    numeral: "I",
    title: "The Roll of Scottish Barons",
    body: "An open, verified public register of the Baronage of Scotland — free, for life, to verify an entry.",
    href: "/the-roll",
  },
  {
    numeral: "II",
    title: "The Pledge",
    body: "A pledged bloodline honour — a family compact of service, bound by the Baronial Code.",
    href: "/pledge",
  },
  {
    numeral: "III",
    title: "The Baron’s Trust",
    body: "Channelling the influence of the baronage into charitable works and the preservation of heritage.",
    href: "/charitable-trust",
  },
];

const timeline = [
  { year: "1320", event: "Barons seal the Declaration of Arbroath" },
  { year: "1587", event: "Minor barons no longer obliged to attend Parliament, though entitled to sit" },
  { year: "1707", event: "Sat among the Three Estates until the Union" },
  { year: "2000", event: "Dignity preserved in law by the Scotland Act" },
  { year: "2004", event: "Titles become non-territorial personal dignities" },
];

const footnotes: { body: ReactNode; subs?: ReactNode[] }[] = [
  {
    body: (
      <>
        Lord Lyon Court Ruling (26 February 1943, Vol. IV, p. 26): “Finds and Declares that the (Minor) Barons of
        Scotland are, and have been both in this nobiliary Court and in the Court of Session recognised as a ‘titled
        nobility’ and that the estait of the Baronage (i.e. Barones Minores) are of the ancient Feudal Nobility of
        Scotland” <em><a href="https://archive.org/details/in.ernet.dli.2015.69848/page/n187/mode/1up?q=Declares" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood">Proceedings of the Society of Antiquaries of Scotland 1944–1945, Vol. 79, p. 143</a></em>
      </>
    ),
    subs: [
      <>
        Lord Lyon David Sellar 2010 [Ref: 57 Lindberg Ptr Lyon Court] “the dignity of baron has a{" "}
        <strong className="font-semibold">noble</strong> character in that it is a right which historically originated
        in a Crown grant.”
      </>,
    ],
  },
  {
    body: (
      <>
        <a href="https://archive.org/details/1992-lord-clydes-dictum" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood">Spencer-Thomas of Buquhollie v. Newell (1992), Lord Clyde’s dictum</a> “<em>a barony falls into the class of
        noble</em> as opposed to ignoble feus. That classification is discussed by Craig (Jus Feudale, I.x.16) and
        Bankton (II.iii.83). In Scotland the distinction was recognised between the greater barons and the lesser
        barons, the former acquiring such titles as Duke or Earl. It was at the earliest a territorial dignity as
        distinct from the later personal peerage. Thus when one was divested of an estate the title of honour ceased
        (Bankton, II.iii.84). In the feudal system, however, whether the dignity was that of a baron or of the greater
        dignity of an earldom, the feudal effects were the same (Erskine’s Institute, II.iii.46).” The Baronage of
        Scotland by Sir Robert Douglas (1798), a foundational text on Scottish nobility, describes baronies as{" "}
        <strong className="font-semibold">“titles of honour”</strong> conferred by the Crown with associated dignities.
      </>
    ),
  },
  {
    body: (
      <>
        Scottish Law Times 1992, p. 979: “The essential feature of a barony title is the{" "}
        <strong className="font-semibold">noble quality</strong> of the feudal grant… giving the proprietor a
        territorial <strong className="font-semibold">rank</strong> and{" "}
        <strong className="font-semibold">dignity</strong>. It also at an earlier period gave rights in relation to
        Parliament.”
      </>
    ),
  },
  {
    body: (
      <>
        Institutional Writers <em>(writers whose text is accepted in Scottish courts as an explanation of the law)</em>:
      </>
    ),
    subs: [
      <>
        Sir Thomas Craig, Jus Feudale (I.xii.23): “Where the prince makes a grant of lands which have rank attached to
        them, he <strong className="font-semibold">ennobles the grantee</strong> even though no express conferment of
        noble rank be made.”
      </>,
      <>
        Lord Stair, Institutions (II.iii.45): “Erection is, when lands are not only united in one tenement, but are
        erected into the dignity of a barony; which comprehendeth lordship, earldom, &amp;c. all which are but more{" "}
        <strong className="font-semibold">noble titles of a barony</strong>, having the like feudal effects.”
      </>,
      <>
        Bankton, Institute (II.iii.84): “<em>Nobility</em> followed the property of the estate to which it was annexed.”
      </>,
    ],
  },
  {
    body: (
      <>
        <a href="https://www.scotlawcom.gov.uk/files/1712/8015/2730/26-07-2010_1458_725.pdf" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood">Scottish Law Commission Report, 1999, para 2.34</a>
      </>
    ),
    subs: [
      <>
        <em>
          In our view the Scottish Parliament could, if it wished, abolish feudal baronies altogether… while allowing
          the dignity of baron, derived from the former connection with the Crown as feudal superior, to continue as a
          floating dignity.
        </em>{" "}
        p,24
      </>,
      <>
        <em>
          The discussion paper mentioned, but rejected, the possibility of allowing the “noble aspects of the barony
          title” to lapse along with the abolition of the feudal relationship on which the{" "}
          <strong className="font-semibold not-italic">ennoblement of the baron</strong> is based.
        </em>{" "}
        para 2.34
      </>,
    ],
  },
  {
    body: (
      <>
        <a href="https://www.legislation.gov.uk/asp/2000/5/notes/division/1/3/6/11" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood">Scottish Parliament, Explanatory Notes to the 2000 Act, Section 63.198</a>
      </>
    ),
  },
  {
    body: (
      <>
        <a href="https://www.legislation.gov.uk/asp/2000/5/section/63" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood">Abolition of Feudal Tenure etc. (Scotland) Act 2000, Section 63</a>
      </>
    ),
  },
  {
    body: (
      <>
        <a href="https://en.wikipedia.org/wiki/Baron_of_Renfrew_(title)" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood">Royal Warrant, 1469 (Baron of Renfrew title)</a>
      </>
    ),
  },
  {
    body: (
      <>
        The Convention of the Baronage of Scotland observed that “four Barons bore the Canopy of State at the Queen’s
        Accession Service in St Giles in 1953”.
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <HeroHome />

      {/* ============================== THE ROLL — KEY NUMBERS ============================== */}
      <section className="border-t-2 border-gold/40 border-b border-b-parchment-300/60 bg-parchment texture-parchment py-8 sm:py-9">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 divide-y divide-parchment-300/70 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { value: "200", label: "Verified Barons" },
                { value: "200", label: "Unverified Holders" },
                { value: "86", label: "Pledged Hereditary" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center px-6 py-4 text-center sm:py-1.5">
                  <span className="font-display text-5xl leading-none text-navy sm:text-6xl">{stat.value}</span>
                  <span className="mt-2 font-inscribe text-xs uppercase tracking-[0.22em] text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============================== TOUR OF THE BARONIES ============================== */}
      <Section tone="parchment" className="pt-16 pb-10 sm:pt-20 sm:pb-12">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>The Baronage</Eyebrow>
                <h2 className="mt-4 text-4xl text-navy sm:text-5xl">A selection of supporters</h2>
              </div>
              <p className="max-w-xs font-serif text-lg italic text-muted">
                From the Roll of Scottish Barons.
              </p>
            </div>
          </Reveal>
        </Container>
        <Reveal className="mt-14">
          <BaroniesCarousel />
        </Reveal>
        <Container className="mt-14 text-center">
          <ButtonLink href="/armorial" variant="outline">
            Explore Armorials
          </ButtonLink>
        </Container>
      </Section>

      {/* ============================== MANDATE ============================== */}
      <Section tone="parchment" className="border-t border-parchment-300/50 pt-12 sm:pt-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-40">
                <Eyebrow>An Ancient Dignity</Eyebrow>
                <div className="mt-6 h-px w-16 bg-gold/60 lg:h-24 lg:w-px" />
                <p className="mt-6 font-inscribe text-sm uppercase tracking-[0.2em] text-muted">
                  Predating the peerage itself
                </p>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={0.1}>
              <p className="dropcap font-serif text-xl leading-[1.6] text-ink sm:text-2xl">
                In Scotland, the title “Baron” or “Baroness” is a rank of the ancient nobility of the Baronage of
                Scotland<Fn n={1} />. The Scottish baronage, predating the peerage, remains a distinguished part of our
                noble heritage today, recognised in the nobiliary court and the Court of Session as{" "}
                <strong className="font-semibold text-navy">titled nobility</strong>
                <Fn n={1} />, and affirmed in Lord Clyde’s 1992 dictum as heritable{" "}
                <strong className="font-semibold text-navy">titles of honour</strong>
                <Fn n={2} /> and for their <em>“noble quality”</em> and former parliamentary rights<Fn n={3} />. Their
                noble status is further enshrined by the institutional writers, including Sir Thomas Craig, Lord Stair,
                and Bankton<Fn n={4} />.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                Since the feudal aspects of baronies were abolished in 2004<Fn n={5} />, special legal provisions ensured the{" "}
                <strong className="font-semibold text-navy">dignity of baron</strong> was retained as a
                non-territorial<Fn n={6} />, floating dignity<Fn n={6} />, protected in Scots law<Fn n={7} /> and
                recognised within UK legal frameworks, including its continued ennoblement<Fn n={5} /> as noted in the
                Scottish Law Commission report for the Scottish Parliament<Fn n={5} />. The <em>“Baron of X”</em> as a
                title of nobility is the holder’s name and identity, legally recognised and eligible in British
                passports and official documents.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                <strong className="font-semibold text-navy">
                  Notably, the heir to the British throne, Prince William, holds the baronage titles Lord of the Isles
                  and Baron of Renfrew
                  <Fn n={8} />, underscoring the prestige of the baronial tradition. Around thirty Scottish clan chiefs
                  are also barons, with titles and histories rooted deep in antiquity.
                </strong>{" "}
                In an age where personal identity and chosen forms
                of address are widely respected, honouring a historic title — rooted in centuries of tradition and legal
                standing — preserves our shared national heritage, and ensures the contributions of past generations are
                not forgotten.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ============================== NON-RECOGNITION ============================== */}
      <Section tone="navyDeep">
        <Container size="prose">
          <Reveal>
            <div className="relative border border-gold/35 bg-navy/60 p-8 text-center sm:p-12">
              <div className="pointer-events-none absolute inset-3 border border-gold/15" aria-hidden />
              <Eyebrow light>Fundamental to the Roll</Eyebrow>
              <h2 className="mt-4 text-3xl text-parchment-50 sm:text-4xl">
                Non-recognition of unverified titles
              </h2>
              <GoldRule className="mt-6" />
              <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-parchment-200/85">
                Inclusion on the Roll is free/voluntary pledged or non-pledged but requires adherence to rigorous criteria — only dignities with
                proven legitimacy are recognised.{" "}
                <strong className="font-semibold text-parchment-50">
                  Non-recognition of unverified titles is fundamental.
                </strong>
              </p>
              <p className="mt-8 font-inscribe text-[0.7rem] uppercase tracking-[0.24em] text-gold">
                Cooperating organisations and Barons agree to
              </p>
              <ul className="mx-auto mt-5 max-w-xl space-y-4 text-left">
                <li className="flex gap-4 leading-relaxed text-parchment-200/85">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-none rotate-45 bg-gold" aria-hidden />
                  <span>
                    Not recognise the title, honour, rank, and status <em>“baron of”</em> (or higher dignity) for
                    unverified holders.
                  </span>
                </li>
                <li className="flex gap-4 leading-relaxed text-parchment-200/85">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-none rotate-45 bg-gold" aria-hidden />
                  <span>It is recommended that organisations do not recognise a title not verified on the Roll.</span>
                </li>
              </ul>
              <div className="mt-10 flex justify-center">
                <ButtonLink href={ROLL_URL} variant="gold">
                  Verify a Title on the Roll
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================== PILLARS (editorial index) ============================== */}
      <Section tone="cream" className="border-y border-parchment-300/60">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>What We Maintain</Eyebrow>
                <h2 className="mt-4 text-4xl text-navy sm:text-5xl">Three pillars of the Association</h2>
              </div>
              <p className="max-w-xs font-serif text-lg italic text-muted">
                The work entrusted to an honourable body.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 border-t border-navy/15">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <Link
                  href={p.href}
                  className="group grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-2 border-b border-navy/15 py-8 transition-colors hover:bg-parchment/60 sm:grid-cols-[6rem_1fr_auto] sm:gap-x-10 sm:py-10"
                >
                  <span className="font-inscribe text-3xl text-gold/70 transition-colors group-hover:text-gold sm:text-4xl">
                    {p.numeral}
                  </span>
                  <div className="col-start-2 sm:col-start-2">
                    <h3 className="text-2xl text-navy transition-colors group-hover:text-oxblood sm:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">{p.body}</p>
                  </div>
                  <span className="col-span-2 mt-2 inline-flex items-center gap-2 font-inscribe text-[0.65rem] uppercase tracking-[0.22em] text-oxblood transition-all group-hover:gap-3 sm:col-span-1 sm:col-start-3 sm:mt-0">
                    Enter <span aria-hidden>→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================== QUOTE (full-bleed cinematic) ============================== */}
      <ImageBand image={GLEN_IMG} position="center 42%">
        <Reveal>
          <p className="eyebrow eyebrow--light">Recognised in Law</p>
          <blockquote className="mt-7 font-serif text-3xl italic leading-snug text-parchment-50 sm:text-[2.7rem]">
            Recognised in the nobiliary court and the Court of Session as{" "}
            <span className="text-foil not-italic">“titled nobility.”</span>
            <Fn n={1} />
          </blockquote>
          <cite className="mt-8 block font-inscribe text-xs uppercase not-italic tracking-[0.3em] text-parchment-200/75">
            Court of the Lord Lyon · 1943
          </cite>
        </Reveal>
      </ImageBand>

      {/* ============================== HISTORY (asymmetric) ============================== */}
      <Section tone="parchment" className="overflow-hidden">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-3 -z-10 border border-gold/30" aria-hidden />
                <div
                  className="aspect-[4/5] w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(10,16,36,0.08), rgba(10,16,36,0.22)), url('${CHARTER_IMG}')`,
                  }}
                  role="img"
                  aria-label="A sealed Scottish charter with red wax seal"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Eyebrow>A Thousand Years</Eyebrow>
              <h2 className="mt-4 text-4xl text-navy sm:text-5xl">Defenders of Scottish sovereignty</h2>
              <p className="mt-6 leading-relaxed text-ink-soft">
                Scottish barons held their lands directly from the Crown and stood as key defenders of Scotland’s
                independence. Today the dignity endures as a non-territorial title of honour, protected in Scots law.
              </p>
              <dl className="mt-8 divide-y divide-parchment-300/70 border-y border-parchment-300/70">
                {timeline.map((t) => (
                  <div key={t.year} className="flex items-baseline gap-6 py-3.5">
                    <dt className="font-inscribe text-lg text-gold-deep">{t.year}</dt>
                    <dd className="text-ink-soft">{t.event}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <ButtonLink href="/history" variant="outline">
                  Read the history
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ============================== FEATURED BARON ============================== */}
      <Section tone="parchment" className="border-t border-parchment-300/60">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
                <div className="absolute inset-0 translate-x-3 translate-y-3 border border-gold/40" aria-hidden />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/featured/ardblair.webp"
                  alt="The Baron of Ardblair and Gask"
                  className="relative h-full w-full object-cover object-top shadow-[0_30px_60px_-30px_rgba(10,16,36,0.7)]"
                />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <Eyebrow>Featured Baron</Eyebrow>
              <h2 className="mt-4 text-4xl text-navy sm:text-5xl">The Baron of Ardblair and Gask</h2>
              <GoldRule className="mt-6" align="start" />
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                Each season we honour a member of the baronage whose stewardship exemplifies the Baronial Code —
                service, integrity and the preservation of heritage. Their title, like all upon the Roll, is recorded
                with accuracy and legal precision.
              </p>
              <div className="mt-8">
                <ButtonLink href="/the-roll" variant="outline">
                  About the Roll
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
