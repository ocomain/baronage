import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Facsimile, GuideChapters, Ref, type GuideChapter } from "@/components/GuideChapters";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, Section } from "@/components/primitives";

export const metadata: Metadata = {
  alternates: { canonical: "/arms-and-flags/" },
  title: "The Arms and Flags of a Scottish Baron",
  description:
    "Whose the arms are, what a barony adds to them, the baron’s helm, and the five flags with their sizes: the banner, standard, guidon, pennon and pinsel. Seven short chapters.",
  openGraph: {
    type: "article",
    title: "The Arms and Flags of a Scottish Baron",
    description: "The helm, the banner and the flags a Scottish baron may bear and fly, in the words of the record.",
    url: "/arms-and-flags/",
    images: [{ url: "/og-arms-and-flags.jpg", width: 1200, height: 630, alt: "A great tilting helm of steel garnished with gold, with the words Arms and Flags" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Arms and Flags of a Scottish Baron",
    description: "What a Scottish baron may bear and fly, in the words of the record.",
    images: ["/og-arms-and-flags.jpg"],
  },
};

/* Every quotation below is one already checked for the Reading Room paper "The arms and flags of a baron". */
const ACT_1672 = "https://www.legislation.gov.uk/aosp/1672/47";
const LYON_FAQ = "https://www.courtofthelordlyon.scot/faqs.htm";
const GUIDANCE_2010 = "https://web.archive.org/web/20150228064731/http://www.lyon-court.com/lordlyon/616.html";
const FLAGS = "https://web.archive.org/web/20080114024540/http://www.lyon-court.com:80/lordlyon/375.html";
// The Lion Rampant sentence is quoted from the Court's Information Leaflet No. 3, para. 12 (copy hosted by the Clan Strachan Society).
const LEAFLET = "http://www.clanstrachan.org/heraldry/lyon-leaflets/info-Leaflet-03_HERALDIC_FLAGS/lyon_Leaflet_3.pdf";
const SALTIRE = "https://web.archive.org/web/20080114024459/http://www.lyon-court.com:80/lordlyon/236.html";
const NISBET = "https://archive.org/details/systemofheraldry01nisbuoft/page/n31/mode/1up";
const DRUM = "/reading-room/barons-in-the-lyon-courts-own-words/";
const BIGGAR = "https://roll.baronage.com/baron/charles-ross-of-biggar";

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-2 hover:text-oxblood">
    {children}
  </a>
);

const PERSONAL_SOURCE = (
  <>
    The Court of the Lord Lyon: “There is no such thing in Scotland as a ‘family coat of arms’”; a coat of arms “can only
    be borne by one person at a time” — <A href={LYON_FAQ}>Frequently Asked Questions</A>.
  </>
);
const ADDS_SOURCE = (
  <>
    The Lord Lyon’s guidance of 5 January 2010: barons “who were granted a chapeau Gules or, it may be, a mantle before the
    appointed day may, of course, continue to display these additaments” — <A href={GUIDANCE_2010}>archived copy</A>.
    Supporters go to “representatives of baronial houses who had a seat in Parliament until 1587”.
  </>
);
const HELM_SOURCE = (
  <>
    Innes of Learney gives the barons “The great tilting-helm garnished with gold … <em>or</em> a steel helmet with grille of
    one or three grilles, garnished with gold, but the tilting-helm is most used.” — <em>Scots Heraldry</em> (1978 ed.),
    p. 17.
  </>
);
const FOUR_FLAGS_SOURCE = (
  <>
    The Lyon Court’s guidance sets the banner apart from the standard, guidon, pennon and pinsel, each granted, assigned or
    allotted by the Lord Lyon — <A href={FLAGS}>“Further Guidance on Flags”</A> (archived copy of the Court’s former
    website). The versions of the guidance agree on sizes and differ on who may have a guidon or a pennon.
  </>
);
const BANNER_SIZE_SOURCE = (
  <>
    Innes of Learney: “Baronets and feudal barons, 3 feet square” — <em>Scots Heraldry</em> (1978 ed.), p. 21. The Lyon
    Court: “No one else may use it. Flown over the house it denotes that the armiger is there” —{" "}
    <A href={FLAGS}>“Further Guidance on Flags”</A>.
  </>
);
const STANDARD_SOURCE = (
  <>
    The standard is “granted by the Lord Lyon only to those who have a ‘following’” — <A href={FLAGS}>“Further Guidance on
    Flags”</A>. Length: Innes of Learney, “Knight and Baron, 4 yds.”, <em>Scots Heraldry</em> (1978 ed.), p. 35. The
    Baron of Biggar’s is “three and a half metres in length”: Lyon Register, vol. 86, p. 109, shown on{" "}
    <A href={BIGGAR}>the Roll</A>.
  </>
);
const SALTIRE_SOURCE = (
  <>
    The Saltire is “the correct flag for all Scots or Scottish corporate bodies to fly” — the Court of the Lord Lyon,{" "}
    <A href={SALTIRE}>“The Saltire”</A> (archived copy).
  </>
);

const chapters: GuideChapter[] = [
  {
    numeral: "I",
    years: "1672",
    title: "One person’s arms",
    lead: (
      <>
        There is no family coat of arms in Scotland, and a barony does not supply one
        <Ref n={1}>{PERSONAL_SOURCE}</Ref>. Each baron needs his own grant or matriculation from the Lord Lyon, entered
        in the register Parliament set up in 1672.
      </>
    ),
    quote: "the true and unrepeallable rule of all Armes and Bearings in Scotland",
    source: { label: "Lyon King of Arms Act · 1672", href: ACT_1672 },
    img: "/images/guide/arms-painter-desk.webp",
    pos: "74% 50%",
  },
  {
    numeral: "II",
    years: "The Baron of Drum, 1992",
    title: "What a barony adds",
    lead: (
      <>
        The shield is the arms. In arms granted before 2004 a barony shows in the red chapeau and the robe behind the
        shield; the old houses also have supporters
        <Ref n={2}>{ADDS_SOURCE}</Ref>.
      </>
    ),
    quote: "fastened on the right shoulder by five spherical buttons Or",
    source: { label: "Matriculation of Irvine of Drum · Lyon Register, vol. 72, p. 83", href: DRUM },
    img: "/images/guide/arms-register-folios.webp",
    pos: "70% 50%",
    dark: true,
    figure: (
      <Facsimile
        src="/images/reading-room/baron-achievement-drum-1992-labelled.webp"
        alt="The painted arms of Irvine of Drum, Baron of Drum, from his matriculation of 1992, with nine numbered labels: motto, crest, helmet, mantling, chapeau, mantle, shield, supporters and compartment."
        caption={
          <>
            1 motto · 2 crest · 3 helmet · 4 mantling · 5 chapeau · 6 mantle · 7 shield · 8 supporters · 9 compartment
          </>
        }
      />
    ),
  },
  {
    numeral: "III",
    years: "Since 2004",
    title: "The helm",
    lead: (
      <>
        For a barony acquired since 28 November 2004 the arms show it by the helm alone: the great tilting-helm garnished
        with gold, or a steel helm with a gold grille
        <Ref n={3}>{HELM_SOURCE}</Ref>.
      </>
    ),
    quote: "a helm appropriate to their degree, that is, to the dignity of baron",
    source: { label: "Lord Lyon’s guidance · 5 January 2010", href: GUIDANCE_2010 },
    img: "/images/guide/arms-tilting-helm.webp",
    pos: "74% 50%",
  },
  {
    numeral: "IV",
    years: "Banner, standard, guidon, pennon, pinsel",
    title: "Five flags",
    lead: (
      <>
        Only the banner comes with the arms. The other four are each granted or assigned by the Lord Lyon
        <Ref n={4}>{FOUR_FLAGS_SOURCE}</Ref>. Ask the Lyon Office before a flag is made.
      </>
    ),
    quote: "under which general name, are comprehended standards, banners, pennons, gideons, and gonfanouns",
    source: { label: "Alexander Nisbet, A System of Heraldry · 1722", href: NISBET },
    img: "/images/guide/arms-flagpoles.webp",
    pos: "72% 50%",
    dark: true,
    figure: (
      <Facsimile
        src="/images/reading-room/baron-flags-to-scale.svg"
        alt="The five heraldic flags drawn to one scale: a square banner 0.90 metres each way; a standard 3.5 metres long; a guidon 2.40 metres; a pennon 1.20 metres; a triangular pinsel; and a figure 1.75 metres tall for scale."
        caption="The five flags to one scale, in the sizes given for a baron. The arms are invented for the drawing."
      />
    ),
  },
  {
    numeral: "V",
    years: "Three feet square",
    title: "The banner",
    lead: (
      <>
        The arms themselves as a flag: for a baron, square, three feet each way. It flies where its owner is, and no one
        else may use it
        <Ref n={5}>{BANNER_SIZE_SOURCE}</Ref>.
      </>
    ),
    quote: "The coat of arms fills the banner right to its edges, as though it were a rectangular shield.",
    source: { label: "The Court of the Lord Lyon, guidance on flags", href: FLAGS },
    img: "/images/guide/arms-banner-tower.webp",
    pos: "78% 50%",
    dark: true,
    figureWide: true,
    figure: (
      <Facsimile
        src="/images/reading-room/baron-banner-right-and-wrong.svg"
        alt="Two square flags. The first, marked right, is filled edge to edge by a coat of arms. The second, marked wrong, is a plain flag with a small shield of the same arms in the middle."
        caption="Right and wrong: the arms fill the flag; a shield on a plain field is not a banner."
      />
    ),
  },
  {
    numeral: "VI",
    years: "The Baron of Biggar, 2007",
    title: "The standard",
    lead: (
      <>
        The long flag of those with a following, granted by the Lord Lyon. A baron’s is four yards long, and its end is
        split in two and rounded
        <Ref n={6}>{STANDARD_SOURCE}</Ref>.
      </>
    ),
    quote: "Those of peers and barons have the ends split into two and rounded.",
    source: { label: "The Court of the Lord Lyon, guidance on flags", href: FLAGS },
    img: "/images/guide/arms-standard-moor.webp",
    pos: "62% 40%",
    dark: true,
    figureWide: true,
    figure: (
      <Facsimile
        src="/images/reading-room/baron-standard-biggar-2007-labelled.webp"
        alt="The standard of the Baron of Biggar as painted on his Letters Patent of 2007: the Saltire next to the pole, four stripes of white and red, a goat’s head badge, a red demi-lion crest, the motto on two blue bands, and a split, rounded end."
        caption="1 the Saltire · 2 the badge · 3 the motto · 4 the crest · 5 the livery colours · 6 the end split and rounded"
      />
    ),
  },
  {
    numeral: "VII",
    years: "Two national flags",
    title: "The Saltire and the Lion",
    lead: (
      <>
        The Saltire is every Scot’s flag
        <Ref n={7}>{SALTIRE_SOURCE}</Ref>. The Lion Rampant is the Sovereign’s, and a baron has no right to fly it.
      </>
    ),
    quote: "This is NOT a national flag and its use by citizens and corporate bodies is entirely wrong.",
    source: { label: "The Court of the Lord Lyon, Information Leaflet No. 3", href: LEAFLET },
    img: "/images/guide/arms-saltire-glen.webp",
    pos: "78% 50%",
  },
];

const sources = [
  { label: "Lyon King of Arms Act 1672", href: ACT_1672 },
  { label: "The Court of the Lord Lyon, “Further Guidance on Flags” (former website, archived 14 January 2008)", href: FLAGS },
  { label: "Lord Lyon Sellar, guidance of 5 January 2010 (archived copy)", href: GUIDANCE_2010 },
  { label: "Sir Thomas Innes of Learney, Scots Heraldry (1978 ed.)", href: "https://archive.org/details/scotsheraldry0000inne" },
  { label: "Alexander Nisbet, A System of Heraldry (1722; ed. 1816), vol. I", href: "https://archive.org/details/systemofheraldry01nisbuoft" },
  { label: "Letters Patent of the Baron of Biggar, 23 October 2007, shown on the Roll", href: BIGGAR },
];

const linkCls = "text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:text-oxblood-deep";

export default function ArmsAndFlagsPage() {
  return (
    <>
      <section className="bg-navy-deep text-parchment-50 texture-saltire">
        <Container className="py-10 text-center sm:py-12">
          <p className="rise eyebrow eyebrow--light">Guide · In Seven Chapters</p>
          <h1
            className="rise mt-4 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            Arms and Flags
          </h1>
          <p className="rise mt-4 font-serif text-lg italic text-parchment-200/75" style={{ animationDelay: "0.16s" }}>
            What a Scottish baron may bear and fly, in the words of the record.
          </p>
        </Container>
      </section>

      <GuideChapters chapters={chapters} />

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <blockquote className="border-l-2 border-gold pl-6 font-serif text-2xl italic leading-relaxed text-navy sm:pl-8">
              Arms and flags follow the person who holds the dignity. Who holds it is what the Roll records.
            </blockquote>
          </Reveal>
          <Reveal>
            <p className="mt-10 font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">Read further</p>
            <ul className="mt-3 space-y-2 text-lg">
              <li>
                <Link href="/reading-room/heraldry-and-flags-of-a-baron" className={linkCls}>
                  The full paper: The arms and flags of a baron
                </Link>
              </li>
              <li>
                <Link href="/armorial" className={linkCls}>
                  The Armorial
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
            <h2 className="text-3xl text-parchment-50 sm:text-4xl">The robe and the court</h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-parchment-200/85">
              What a baron wore, and who served in his court.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/robes-and-chapeau" variant="gold">
                Robes &amp; Chapeau
              </ButtonLink>
              <ButtonLink href="/court-and-officers" variant="outlineLight">
                Court &amp; Officers
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
