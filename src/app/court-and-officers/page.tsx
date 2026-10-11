import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Facsimile, GuideChapters, Ref, type GuideChapter } from "@/components/GuideChapters";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, Section } from "@/components/primitives";

export const metadata: Metadata = {
  alternates: { canonical: "/court-and-officers/" },
  title: "The Baron’s Court and its Officers",
  description:
    "Bailie, clerk, officer and dempster: what each did in a Scottish baron’s court, how 1746 cut the court down, and why it is ceremonial today. Eight short chapters.",
  openGraph: {
    type: "article",
    title: "The Baron’s Court and its Officers",
    description: "Bailie, clerk, officer and dempster: who served in a Scottish baron’s court, in the words of the record.",
    url: "/court-and-officers/",
    images: [{ url: "/og-court-and-officers.jpg", width: 1200, height: 630, alt: "A blowing horn and a white wand on an oak table, with the words Court and Officers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Baron’s Court and its Officers",
    description: "Who served in a Scottish baron’s court, in the words of the record.",
    images: ["/og-court-and-officers.jpg"],
  },
};

/* Every quotation below is one already checked for the Reading Room paper "The baron's court and its officers". */
const CARNWATH = "https://digital.nls.uk/scottish-history-society-publications/browse/archive/127212981";
const URIE = "https://archive.org/details/courtbookofbaron00urie/page/n101/mode/1up";
const STAIR = "https://archive.org/details/bim_early-english-books-1641-1700_the-institutions-of-the-_stair-james-dalrymple-_1681/page/n303/mode/1up";
const ACT_1746 = "https://archive.org/details/dli.calcutta.10089/page/n153/mode/1up";
const ACT_2000 = "https://www.legislation.gov.uk/asp/2000/5/section/63";
const SLC = "https://www.scotlawcom.gov.uk/sites/default/files/2026-02/26-07-2010_1458_725.pdf";

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-2 hover:text-oxblood">
    {children}
  </a>
);

const PIT_AND_GALLOWS_SOURCE = (
  <>
    Viscount Stair, 1681: a barony’s jurisdiction “will not reach to Capital Punishment, unless the same be exprest, as it
    uses to be when the Priviledge of Pit and Gallows are exprest” — <em>Institutions</em>, Title 13, § 62,{" "}
    <A href={STAIR}>p. 276</A>.
  </>
);
const WAND_SOURCE = (
  <>
    “His insignia of office included a horn and a white wand ‘ane eln lang.’ If opposed in the execution of his duty he
    broke his wand as an indication that he had been ‘deforced.’” — W. Croft Dickinson (ed.),{" "}
    <em>The Court Book of the Barony of Carnwath, 1523–1542</em> (Scottish History Society, 1937), Introduction, p. lxxxvi —{" "}
    <A href={CARNWATH}>National Library of Scotland</A>. A Scots ell was a little over three feet.
  </>
);
const SUITORS_SOURCE = (
  <>
    “The judges of the court were the suitors.” The presiding officer “was <em>not</em> a judge”: Dickinson,{" "}
    <em>Carnwath</em>, Introduction, p. lxxx — <A href={CARNWATH}>National Library of Scotland</A>. In later times the
    bailie became the sole judge and the dempster only pronounced his sentence.
  </>
);
const CEREMONY_SOURCE = (
  <>
    Scottish Law Commission, 1999: “In practice barons’ courts are held now only for ceremonial purposes.” —{" "}
    <A href={SLC}>Report No 168</A>, para 2.31, note 40. Since 28 November 2004 no jurisdiction remains.
  </>
);

const chapters: GuideChapter[] = [
  {
    numeral: "I",
    years: "1681",
    title: "A barony came with a court",
    lead: (
      <>
        The Crown’s grant of a barony gave its holder a share of the King’s justice over the people on his lands. Power
        of life and death needed the words “pit and gallows” in the charter
        <Ref n={1}>{PIT_AND_GALLOWS_SOURCE}</Ref>.
      </>
    ),
    quote: "Jurisdiction and Courts are comprehended in Barrony",
    source: { label: "Viscount Stair, Institutions of the Law of Scotland · 1681", href: STAIR },
    img: "/images/guide/court-chair.webp",
    pos: "72% 50%",
  },
  {
    numeral: "II",
    years: "The baron’s deputy",
    title: "The bailie",
    lead: "He held the court in the baron’s place, and was sworn to faithful administration. At Urie in 1620 the bailie was a cousin of the laird.",
    quote: "sufficient power, be letter and seale of the Baron",
    source: { label: "The Forme and Maner of Baron Courts · in Dickinson, Carnwath, p. lxxix", href: CARNWATH },
    img: "/images/guide/court-commission.webp",
    pos: "72% 50%",
  },
  {
    numeral: "III",
    years: "Keeper of the book",
    title: "The clerk",
    lead: "He kept the court book: its judgments, and the rents and fines due to the baron. At Carnwath in 1527 the clerk was sworn “to write truly”.",
    quote: "vilȝem somerwell vas sworn to vrit trewly in the office of clerkschip",
    source: { label: "Court Book of the Barony of Carnwath · 15 May 1527", href: CARNWATH },
    img: "/images/guide/court-book.webp",
    pos: "78% 50%",
  },
  {
    numeral: "IV",
    years: "Horn and white wand",
    title: "The officer",
    lead: (
      <>
        The court’s messenger and enforcer: he summoned the parties and seized goods for its fines. His insignia were a
        horn and a white wand an ell long, which he broke if he was resisted
        <Ref n={2}>{WAND_SOURCE}</Ref>.
      </>
    ),
    quote: "of the quhilk reif & deforsment he brak his wand & tuk witnes",
    source: { label: "Court Book of the Barony of Carnwath · pp. 138–139", href: CARNWATH },
    img: "/images/guide/court-horn-wand.webp",
    pos: "64% 50%",
  },
  {
    numeral: "V",
    years: "The voice of the court",
    title: "The dempster",
    lead: (
      <>
        One of the tenants, he spoke the court’s judgment, its “doom”, aloud. The tenants who owed attendance were the
        judges, not the baron
        <Ref n={3}>{SUITORS_SOURCE}</Ref>.
      </>
    ),
    quote: "gart giff doum be the mouth of Jhone watsone dompstar",
    source: { label: "Court Book of the Barony of Carnwath · p. 184", href: CARNWATH },
    img: "/images/guide/court-benches.webp",
    pos: "70% 50%",
  },
  {
    numeral: "VI",
    years: "21 July 1620",
    title: "A court in session",
    lead: "The court of Urie met in a barn at Woodhead. One heading names the bailie, the clerk, the officer and the dempster. Most of the work was small: rents, debts, mill dues, straying cattle, blows that drew blood.",
    quote: "The suits calit, the Court lawfullie fensit and affirmit.",
    source: { label: "Court Book of the Barony of Urie · p. 30", href: URIE },
    img: "/images/guide/court-barn.webp",
    pos: "66% 50%",
    dark: true,
    figure: (
      <Facsimile
        src="/images/reading-room/baron-court-urie-1620.webp"
        alt="The printed Court Book of the Barony of Urie, page 30: the sitting of 21 July 1620 in James Alardes’s barn in Woodhead, naming the bailie, the clerk, the officer and the dempster."
        caption="The Urie court book, 21 July 1620: bailie, clerk, officer and dempster in one heading."
      />
    ),
  },
  {
    numeral: "VII",
    years: "1746",
    title: "Cut down",
    lead: "After the rising of 1745 Parliament cut the court down but did not abolish it. From 1748 it could try nothing capital, and hear no ordinary claim above forty shillings.",
    quote: "a fine not exceeding twenty shillings sterling, or by setting the delinquent in the stocks, for any time not exceeding three hours, in the day-time",
    source: { label: "Heritable Jurisdictions (Scotland) Act 1746, s. 17", href: ACT_1746 },
    img: "/images/guide/court-stocks.webp",
    pos: "70% 50%",
  },
  {
    numeral: "VIII",
    years: "Since 2004",
    title: "Today",
    lead: (
      <>
        All jurisdiction ended on 28 November 2004. A baron may still name a bailie, a clerk, an officer and a dempster,
        and hold a court, for ceremony
        <Ref n={4}>{CEREMONY_SOURCE}</Ref>. It can decide nothing.
      </>
    ),
    quote: "Any jurisdiction of … barony shall on the appointed day cease to exist; but nothing in this Act affects the dignity of baron",
    source: { label: "Abolition of Feudal Tenure etc. (Scotland) Act 2000, s. 63(1)", href: ACT_2000 },
    img: "/images/guide/court-ceremony.webp",
    pos: "70% 50%",
  },
];

const sources = [
  { label: "W. Croft Dickinson (ed.), The Court Book of the Barony of Carnwath, 1523–1542 (Scottish History Society, 1937)", href: CARNWATH },
  { label: "The Court Book of the Barony of Urie in Kincardineshire, 1604–1747 (Scottish History Society, 1892)", href: "https://archive.org/details/courtbookofbaron00urie" },
  { label: "Viscount Stair, The Institutions of the Law of Scotland, 1681, Title 13, §§ 62–63", href: STAIR },
  { label: "Heritable Jurisdictions (Scotland) Act 1746, s. 17, in Pickering’s Statutes at Large, vol. XIX, p. 133", href: ACT_1746 },
  { label: "Abolition of Feudal Tenure etc. (Scotland) Act 2000, s. 63", href: ACT_2000 },
  { label: "Scottish Law Commission, Report on Abolition of the Feudal System (No 168, 1999)", href: SLC },
];

const linkCls = "text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:text-oxblood-deep";

export default function CourtAndOfficersPage() {
  return (
    <>
      <section className="bg-navy-deep text-parchment-50 texture-saltire">
        <Container className="py-10 text-center sm:py-12">
          <p className="rise eyebrow eyebrow--light">Guide · In Eight Chapters</p>
          <h1
            className="rise mt-4 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            Court and Officers
          </h1>
          <p className="rise mt-4 font-serif text-lg italic text-parchment-200/75" style={{ animationDelay: "0.16s" }}>
            The baron’s court and who served in it, in the words of the record.
          </p>
        </Container>
      </section>

      <GuideChapters chapters={chapters} />

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <blockquote className="border-l-2 border-gold pl-6 font-serif text-2xl italic leading-relaxed text-navy sm:pl-8">
              The court has gone. The dignity it belonged to has not, and who holds that dignity is what the Roll records.
            </blockquote>
          </Reveal>
          <Reveal>
            <p className="mt-10 font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">Read further</p>
            <ul className="mt-3 space-y-2 text-lg">
              <li>
                <Link href="/reading-room/the-barons-court-and-its-officers" className={linkCls}>
                  The full paper: The baron’s court and its officers
                </Link>
              </li>
              <li>
                <Link href="/reading-room/baronage-in-the-statutes" className={linkCls}>
                  The baronage in the statutes, 1428–2004
                </Link>
              </li>
            </ul>
            <p className="mt-8 font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">Sources</p>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
              {sources.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-4 hover:text-oxblood">
                    {s.label}
                  </a>
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
            <h2 className="text-3xl text-parchment-50 sm:text-4xl">What the baron wore and bore</h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-parchment-200/85">
              The red robe and the chapeau; the helm, the banner and the flags.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/robes-and-chapeau" variant="gold">
                Robes &amp; Chapeau
              </ButtonLink>
              <ButtonLink href="/arms-and-flags" variant="outlineLight">
                Arms &amp; Flags
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
