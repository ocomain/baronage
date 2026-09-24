import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { DigitalAddressSimulator } from "@/components/DigitalAddressSimulator";
import { Footnote } from "@/components/Footnote";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/primitives";

export const metadata: Metadata = {
  alternates: { canonical: "/proper-address/" },
  title: "Proper Address for Scottish Barons",
  description:
    "The correct forms of address, salutation and precedence for Scottish Barons and Baronesses — written, verbal and digital — preserving the dignity of the title.",
};

const NAV = [
  { id: "verbal", label: "Address" },
  { id: "written", label: "Written Address" },
  { id: "salutation", label: "Salutation in Letters" },
  { id: "children", label: "Children of a Baron" },
  { id: "special", label: "Special Considerations" },
  { id: "dowager", label: "Widow or Dowager" },
  { id: "higher", label: "Higher Dignities" },
  { id: "digital", label: "Digital Address Guidelines" },
];

/* ---- typographic primitives (serif, high-contrast, like the source) ---- */
function P({ children }: { children: ReactNode }) {
  return <p className="mt-6 font-serif text-xl leading-[1.8] text-ink">{children}</p>;
}
function Aside({ children }: { children: ReactNode }) {
  return <p className="mt-6 font-serif text-xl italic leading-[1.8] text-ink">{children}</p>;
}
/** Stand-alone bold form — same size as the bulleted forms. */
function FormLine({ children }: { children: ReactNode }) {
  return <p className="my-6 font-serif text-xl font-bold leading-snug text-navy">{children}</p>;
}
function Forms({ children }: { children: ReactNode }) {
  return <ul className="my-6 list-disc space-y-3 pl-7 marker:text-navy/50">{children}</ul>;
}
/** A bullet — regular weight; only the title forms inside are bold. */
function F({ children }: { children: ReactNode }) {
  return <li className="font-serif text-xl leading-snug text-ink">{children}</li>;
}
/** Bold title form. */
function S({ children }: { children: ReactNode }) {
  return <strong className="font-bold text-navy">{children}</strong>;
}
/** Italic connector. */
function Or() {
  return <em className="font-normal"> or </em>;
}
/** Italic note / parenthetical. */
function N({ children }: { children: ReactNode }) {
  return <em className="font-normal"> {children}</em>;
}
/** Numbered marker that opens its source in a pop-up card (same component as the Explained page). */
function Ref({ n }: { n: number }) {
  return <Footnote n={n}>{HIGHER_SOURCES[n - 1]}</Footnote>;
}
/** External source link inside a reference. */
function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood">
      {children}
    </a>
  );
}
/** Sources for the designation-and-barony forms in Written Address. */
const TD_SOURCES: ReactNode = (
  <ol className="list-decimal space-y-3 pl-5">
    <li>
      Court of the Lord Lyon, “Rolls of the Chiefs, and Heads of Territorial Houses … Officially Recognised”, <em>The Edinburgh Gazette</em>, 19 August 2005: entries print the designation and the barony together where they differ, e.g. “Newlands of Lauriston, Baron of Miltonhaven” (matriculated 6 October 2003, Lyon Register 85/36) —{" "}
      <Src href="https://www.thegazette.co.uk/notice/E-25893-1107-293">The Gazette</Src>. The same form appears in earlier notices, e.g. “Teall of Teallach Baron of Huntly”, 4 April 1997, p. 777.
    </li>
    <li>
      Sir Thomas Innes of Learney, “The Robes of the Feudal Baronage of Scotland”, <em>Proceedings of the Society of Antiquaries of Scotland</em> 79 (1944–45): the Esslemont matriculation of 4 September 1934, Lyon Register vol. xxxi, p. 20, in which Gordon of Hallhead was “duly described as Baron of Esslemont”, p. 160 n. 1; and “The Baron of Hallhead-Esslemont duly received both chapeau and designation, consistently with the statute and the ancient precedents of Lyon Court”, p. 163 —{" "}
      <Src href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/">journal PDF</Src>. See{" "}
      <Link href="/reading-room/esslemont-petition-1934/" className="underline decoration-gold/50 underline-offset-2 hover:text-oxblood">The Esslemont petition of 1934</Link>.
    </li>
  </ol>
);
/** Sources for the higher-dignities note; opened from the numbered markers and from "Authority & sources". */
const HIGHER_SOURCES: ReactNode[] = [
  <>
    James Dalrymple, Viscount Stair, <em>The Institutions of the Law of Scotland</em> (2nd ed., 1693), II.iii.45, p. 222 —{" "}
    <Src href="https://archive.org/details/bim_early-english-books-1641-1700_the-institutions-of-the-_stair-james-dalrymple-_1693/page/n227">archive.org</Src>.
  </>,
  <>
    William Borthwick, <em>An Inquiry into the Origin and Limitations of the Feudal Dignities of Scotland</em> (1775), p. 3 (“Lord Barons”; the term recurs at pp. 4, 16, 18 and 19) —{" "}
    <Src href="https://archive.org/details/inquiryintoorigi00bortuoft/page/3/mode/2up">archive.org</Src>; John Lodge, <em>The Peerage of Ireland</em> (rev. ed., 1789), vol. V, pp. 40–41, decree of 1634 on precedency between “the Lord Baron of Trimlestown and the Lord Baron of Dunsany” —{" "}
    <Src href="https://archive.org/details/peerageofireland05lodg">archive.org</Src>.
  </>,
  <>
    Borthwick (1775), p. 21: “In the year 1416, William Lord Graham gets a charter of the barony of Mellenok, in which he is designed, Willielmo Domino Graham. And the same Lord gets a charter of the lands of Aldmontrose, dated the 4th August 1420, Willielmo Domino de Graham”, the charters being “on the record of the great seal” —{" "}
    <Src href="https://archive.org/details/inquiryintoorigi00bortuoft/page/21/mode/2up">archive.org</Src>. Patrick Graham was created Lord Graham, a Lord of Parliament, in 1445.
  </>,
  <>
    Sir Thomas Innes of Learney, “The Robes of the Feudal Baronage of Scotland”, <em>Proceedings of the Society of Antiquaries of Scotland</em> 79 (1944–45), pp. 111–163, at p. 158, citing the Additional Case for the Countess of Sutherland, p. 84, and Lord Hailes —{" "}
    <Src href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/">journal PDF</Src>. Reproduced above.
  </>,
  <>
    Innes of Learney (1945), p. 158 and n. 7, citing Sir Bruce Seton’s Gordon Peerage Case, p. 15. Reproduced above. On “Baron of X” as the correct form, and “esquire” never added, pp. 161–163; the Esslemont Memorial’s words “preferred for formal purposes by English and British lords”, p. 163.
  </>,
  <>
    Annandale: Letters Patent of Lord Lyon Innes of Edingight, 4 February 1983, “Baron of the Barony of the lands of the Earldom of Annandale and Hartfell”, recorded in <em>The Edinburgh Gazette</em>, 17 January 1984, p. 51, and discussed in Lord Lyon Sellar’s{" "}
    <Src href="https://courtofthelordlyon.scot/index_htm_files/ARRAN.pdf">Note in the Petition of Sturzenegger of Arran</Src> (c. 2010), pp. 19–22. Lord Lyon Blair’s recognitions: Crawfurd-Lindsay, Letters Patent 30 May 2007; Breadalbane, warrant 12 April 2006; Rothes, warrant 5 September 2006 and Letters Patent 6 August 2007 (Sellar, pp. 4–5). Sellar’s ruling that such an owner “has no claim to a style greater than that of baron”: the same Note. Full record in{" "}
    <Link href="/reading-room/non-peerage-earldoms/" className="underline decoration-gold/50 underline-offset-2 hover:text-oxblood">Non-peerage Earldoms</Link>.
  </>,
  <>
    One unit: Crawfurd and Lindsay, charter of 1 March 1648, ratified{" "}
    <Src href="https://www.rps.ac.uk/search.php?action=print&id=23983&filename=charlesi_trans&type=trans">RPS 1648/3/234</Src>; Slains and Erroll, charter of 29 March 1699, ratified RPS 1700/10/253. A barony of another name: Rothes, whose Fife lands were erected “in liberam baroniam de Ballinbreich” (RMS VI, nos. 756–757, 1598); Wigtown, on the lordship and barony of Cumbernauld (1588/9).
  </>,
  <>
    Letters Patent of Lord Lyon Innes of Edingight, 4 February 1983, recognising Percy Wentworth Hope Johnstone of Annandale and that Ilk as “Baron of the Barony of the lands of the Earldom of Annandale and Hartfell” and Chief of Clan Johnstone; recorded in the Lyon Court’s notice in <em>The Edinburgh Gazette</em>, 17 January 1984, p. 51, Lyon Register 66/71 —{" "}
    <Src href="https://www.thegazette.co.uk/Edinburgh/issue/21460/page/51/data.pdf">The Gazette</Src>; discussed by Lord Lyon Sellar, Note in the Petition of Sturzenegger of Arran (c. 2010), pp. 19–22.
  </>,
  <>
    Lord Lyon Sellar, <Src href="https://courtofthelordlyon.scot/index_htm_files/ARRAN.pdf">Note in the Petition of Sturzenegger of Arran</Src> (petition of 10 February 2006; Note c. 2010), reported as <em>Sturzenegger, Petitioner (No 2)</em> 2015 SLT (Lyon Ct) 2: of the passages in Stair and Erskine, “it suggests to me that in terms of the feudal grant the owner has no claim to a style greater than that of baron”; the petition for recognition as “Feudal Earl of Arran” was refused.
  </>,
  <>
    Innes of Learney (1945), p. 157 (“a subsisting yet very ancient ‘Order’ in the Realm of Scotland”); Act of the Parliament of Scotland, 20 December 1567, article 33: “the barons of this realm ought to have vote in parliament as a part of the nobility” —{" "}
    <Src href="https://www.rps.ac.uk/trans/1567/12/45">RPS 1567/12/45</Src>; quoted by Innes at p. 132. See{" "}
    <Link href="/reading-room/innes-of-learney-1945/" className="underline decoration-gold/50 underline-offset-2 hover:text-oxblood">Innes of Learney, 1945</Link>.
  </>,
];
function Sec({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="font-display text-[1.7rem] font-medium leading-tight text-navy underline decoration-1 underline-offset-[0.32em] sm:text-[2.05rem]">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

const DIGITAL: { head: ReactNode; key: string; entry: ReactNode; example?: ReactNode; note?: ReactNode }[] = [
  {
    key: "title-free",
    head: "Title Field (Free Text)",
    entry: (
      <>
        If the title field allows free text, type <S>“The Much Honoured”</S> as the prefix. Or type the title{" "}
        <S>“The Baron of [Placename]”</S>.
      </>
    ),
  },
  {
    key: "title-dropdown",
    head: "Title Field (Drop-Down List)",
    entry: (
      <>
        If the title field uses a drop-down list, select <S>“Baron”</S>
        <Or />
        <S>“Baroness”</S>
        <Or />
        <S>“Lady”</S> as appropriate.
      </>
    ),
    example: <>Select “Baron” from the drop-down list.</>,
  },
  {
    key: "first-name",
    head: "First Name Field",
    entry: (
      <>
        Enter the christian name of the baron. Or type <S>“The Baron of”</S>
        <Or />
        <S>“The Much Honoured”</S>
        <Or />
        <S>“The Baron of [Placename]”</S> if the system primarily uses first names.
      </>
    ),
    example: <S>“John”</S>,
  },
  {
    key: "surname",
    head: "Surname Field",
    entry: (
      <>
        Enter the full baronial title in the surname field, following the format <S>“Baron of [Placename]”</S> or
        optionally <S>“[Familyname] The Baron of [Placename]”</S>.
      </>
    ),
    example: (
      <>
        <S>“Baron of Inverness”</S>
        <Or />
        <S>“Smith The Baron of Inverness”</S>
      </>
    ),
  },
  {
    key: "surname-title-selected",
    head: "Surname Field (if you selected, for example, Baron in the title field)",
    entry: (
      <>
        If your title is already in the title field, put <S>“of [Placename]”</S>
        <Or />
        <S>“[Familyname] of [Placename]”</S> to accurately represent the baronial title.
      </>
    ),
    example: (
      <>
        <S>“of Inverness”</S>
        <Or />
        <S>“Smith of Inverness”</S>
      </>
    ),
  },
  {
    key: "surname-baron-first-name",
    head: "Surname Field (if you typed “The Baron of [Placename]” in the first name field)",
    entry: <S>The Much Honoured</S>,
  },
  {
    key: "display-name",
    head: "Display Name or Full Name Field",
    entry: <>For systems that use a single display name or full name field, enter the name in the following format:</>,
    example: (
      <>
        <S>“The Much Hon Baron of Inverness”</S>
        <Or />
        <S>“The Baron of Inverness”</S>
        <Or />
        <S>“John, Baron of Inverness”</S>
        <Or />
        <S>“The Baron”</S>
      </>
    ),
  },
  {
    key: "correspondence",
    head: "Addressing the Baron in Correspondence",
    entry: (
      <>
        In digital correspondence, ensure that the salutation reflects the correct title — the prefix normally reserved
        for Mr or Dr is replaced with The Much Hon. and the surname with Baron of Inverness.
      </>
    ),
    example: (
      <>
        <S>“Dear Baron of Inverness”</S>
        <Or />
        <S>“Dear The Much Hon. Baron of Inverness”</S>
      </>
    ),
  },
  {
    key: "email-signature",
    head: "Email Signature",
    entry: <>If including the title in an email signature, format it as follows:</>,
    example: (
      <>
        <S>“John Smith, Baron of Inverness”</S>
        <Or />
        <S>“The Baron of Inverness”</S>
        <Or />
        <S>“John, Baron of Inverness”</S>
        <Or />
        <S>“The Baron”</S>
      </>
    ),
    note: <>However, Much Hon can be useful for replacing the Mr title field on digital platforms.</>,
  },
  {
    key: "worst-case",
    head: "Worst case",
    entry: (
      <>
        Note that if the title field only allows for Mr / Ms, for example, entering <S>“The Baron of [Placename]”</S>
        <Or />
        <S>“The Lady [Placename]”</S> in the surname field ensures that it will at least format as:
      </>
    ),
    example: (
      <>
        <S>“Mr The Baron of Inverness”</S>
        <Or />
        <S>“Ms The Lady Inverness”</S>
      </>
    ),
  },
];

export default function ProperAddressPage() {
  return (
    <>
      <PageHero
        eyebrow="Forms of Address & Precedence"
        title="Proper Address for Scottish Barons"
        intro="Addressing a Scottish Baron correctly honours a line of titleholders stretching back centuries — the correct forms, in written, verbal and digital use."
        image="/images/charter-seal.webp"
        position="center 40%"
      />

      {/* Lead */}
      <Section tone="white" className="pb-2 pt-14 sm:pt-16">
        <Container size="prose">
          <Reveal>
            <p className="font-serif text-2xl leading-[1.7] text-ink">
              Addressing a Scottish Baron correctly is a nod to any selfless contributions they’ve made, and to the
              long line of titleholders who carried it before—some stretching back over a thousand years. Each title
              represents generations of leadership, service, and heritage, and using it properly honours the enduring
              legacy of those who shaped Scotland’s history. Unfortunately, modern practices and digital forms often
              overlook these traditional distinctions, leading to common errors. Below, we outline the correct forms of
              address for a Scottish Baron in both written and spoken communication.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* In-page quick navigation */}
      <div className="border-y border-parchment-300/60 bg-white">
        <Container size="prose">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 py-4 text-sm">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="nav-link font-sans text-[0.66rem] uppercase tracking-[0.14em] text-navy/60 transition-colors hover:text-oxblood"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      {/* Sections */}
      <Section tone="white" className="pt-12 sm:pt-14">
        <Container size="prose">
          <div className="space-y-14">
            <Reveal>
              <Sec id="verbal" title="Address">
                <P>A Scottish Baron is referred to as “<S>The Baron</S>” / “<S>The Baroness</S>”</P>
                <Forms>
                  <F>
                    Third person introduction <S>The Baron</S> (of Inverness and Lady Inverness)
                  </F>
                  <F>
                    In person: <S>Baron</S> <em>or</em> simply ‘<S>Inverness</S>’ may be used
                  </F>
                  <F>
                    In person: <S>Baroness</S> <em>or</em> <S>Lady Inverness</S>
                  </F>
                </Forms>
                <P>
                  It is incorrect to refer to them simply by their surname or without the baronial designation, e.g.,
                  “Mr / Mrs Smith” or “Esq.” is certainly incorrect. Some wives of highland clan chief-barons prefer{" "}
                  <S>Madam</S>.
                </P>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="written" title="Written Address">
                <P>
                  When addressing a Scottish Baron in writing, for some barons they hold a territorial designation and
                  the correct format for the envelope or any formal correspondence would be the full territorial title:
                </P>
                <FormLine>(The Much Hon.) [First Name] [Surname] of [TD], Baron of [Barony]</FormLine>
                <P>
                  Some barons with a territorial designation choose not to use their baron title. However, most barons
                  do not hold a territorial designation and <em>just the title</em> is normally the <em>preferred</em>{" "}
                  format, for example (brackets are optional):
                </P>
                <Forms>
                  <F>
                    <S>
                      (The Much Honoured<Or />The) Baron of Inverness
                    </S>
                  </F>
                </Forms>
                <Aside>
                  Also correct: if the title is <Link href="/pledge" className="underline decoration-gold/60 underline-offset-2 transition-colors hover:text-oxblood">Pledged</Link> (a lifelong, hereditary honour rather than a temporary
                  office), the title can replace the second name for daily or professional use;{" "}
                  <strong className="font-bold">John, Baron of Inverness</strong> or{" "}
                  <strong className="font-bold">John Inverness</strong>. The holder may also retain their family name,
                  with or without TD, but is not typically used for daily life.
                </Aside>
                <div className="my-6 border-y border-parchment-300/70 py-6 text-center">
                  <p className="font-serif text-base italic leading-relaxed text-ink">
                    As published in{" "}
                    <a
                      href="https://announcements.telegraph.co.uk/marketplace/advert/livingstone-of-bachuil-notices_61304"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
                    >
                      The Telegraph
                    </a>{" "}
                    — the premier baron:
                  </p>
                  <p className="mt-3 font-serif text-xl font-bold text-navy">Niall, Baron of Bachuil</p>
                  <p className="mx-auto mt-4 max-w-2xl font-serif text-base italic leading-relaxed text-ink">
                    Bachuil chaired a Titles and Usages Committee and published the paper “The Use and Abuse of
                    Titles”, presented to the Court of the Lord Lyon and the Scottish Parliament.
                  </p>
                </div>
                <P>
                  Where the territorial designation and the barony differ, both are written, as the Lyon Court’s
                  Gazette notices do: “[Surname] of Kildonan, Baron of Inverness”. They may also be joined socially:
                  Lord Lyon Innes of Learney, writing in 1945, called the petitioner in the Esslemont case, Gordon of
                  Hallhead, “The Baron of Hallhead-Esslemont”, though the Lyon Register records him as “Baron of
                  Esslemont”. The recorded title stays “Baron of [Barony]”; the wife takes the designation, as a laird’s
                  wife always has.
                </P>
                <Forms>
                  <F>
                    Formal: <S>[Surname] of Kildonan, Baron of Inverness</S>
                  </F>
                  <F>
                    Joined, social: <S>The Much Honoured Baron of Kildonan-Inverness</S>
                  </F>
                  <F>
                    Wife: <S>Lady Kildonan</S>
                  </F>
                </Forms>
                <p className="mt-2">
                  <Footnote n={0} heading="Authority & sources" label="Authority & sources" triggerClassName="cursor-pointer border-0 bg-transparent p-0 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-gold-deep underline decoration-dotted decoration-gold/40 underline-offset-4 transition-colors hover:text-oxblood">
                    {TD_SOURCES}
                  </Footnote>
                </p>
                <div hidden>{TD_SOURCES}</div>
                <div className="gold-rule my-10 text-gold/70" aria-hidden="true"><span className="gold-rule__gem" /></div>
                <P>
                  Wives or female barons are entitled to <S>Lady</S> <em>or</em> <S>Baroness of</S>
                </P>
                <Forms>
                  <F>
                    <S>(The) Lady Inverness</S>
                    <Or />
                    <S>Jane, Lady Inverness</S>
                  </F>
                  <F>
                    <S>(The Much Honoured / The) Baroness of Inverness</S>
                    <Or />
                    <S>(The Much Hon.) Jane Smith, Baroness of Inverness</S>
                  </F>
                </Forms>
                <P>
                  “Lady Jane” is incorrect and should never be used — this is the title for daughters of a senior
                  peer: a Duke, Marquis, or Earl. Forms such as “Lady Jane Inverness” or “Baron John of Inverness” are
                  often seen, but are still socially incorrect. The phrase “Lady of Inverness” is wrong if the lady in
                  question does not hold a Scottish barony in her own right.
                </P>
                <P>
                  A Scottish barony is a{" "}
                  <Link
                    href="/scottish-baronies-explained"
                    className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
                  >
                    personal dignity
                  </Link>{" "}
                  held legally by the baron (or baroness in her own right). It does not create a separate legal title for
                  a spouse. However, under British social custom, a wife is the legal and social equal of her husband in style and title.
                  She shares his rank and assumes the feminine form of his title by courtesy but does not hold it in her
                  own right. Upon marriage, she takes his style; if widowed or divorced, her title use follows
                  convention, not entitlement. As titles of nobility are considered part of a person’s name and
                  identity, her title is reflected in a British passport as her legal name.
                </P>
                <div className="gold-rule my-10 text-gold/70" aria-hidden="true"><span className="gold-rule__gem" /></div>
                <P>In cases where the Baron is entitled to post-nominal letters, these should follow, such as:</P>
                <Forms>
                  <F>
                    <S>The Baron of Inverness, CBE</S>
                  </F>
                </Forms>
                <P>
                  A title granted by the Crown, such as a Scottish Barony, supersedes academic titles like Professor or
                  Doctor and generally should not be used. The baronial title takes precedence and should stand alone
                  due to its higher rank. However, if an individual insists on including their academic title, it must
                  appear in a subordinate position. Here’s the correct format if an academic title is included:
                </P>
                <Forms>
                  <F>
                    <S>The Baron of Inverness, Professor John Smith</S>
                    <Or />
                    <S>Prof Baron of Inverness</S>
                    <Or />
                    <S>Prof Inverness</S>
                  </F>
                  <F>
                    <S>Dr The Lady Inverness</S>{" "}
                    <S>(Jane Smith, 5th baroness)</S>
                    <Or />
                    <S>Dr Lady Inverness</S>
                  </F>
                </Forms>
                <P>
                  For official and ceremonial purposes, the baronial title alone is the correct form, preserving the
                  dignity and precedence of the Crown-granted rank.
                </P>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="salutation" title="Salutation in Letters">
                <P>
                  When beginning a letter to a Scottish Baron, the salutation should reflect the dignity of the title.
                  The correct salutation is:
                </P>
                <Forms>
                  <F>
                    <S>Dear Baron of Inverness</S>
                    <Or />
                    <S>Dear Baron</S>
                  </F>
                  <F>
                    <S>Dear Lady Inverness</S>
                    <Or />
                    <S>Dear Baroness of Inverness</S>
                    <Or />
                    <S>Dear Baroness</S>
                  </F>
                </Forms>
                <P>
                  Alternatively, only the barony can be used: <S>Dear Inverness</S>, but this format is never for a lady.
                </P>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="children" title="Addressing the Children of a Baron">
                <P>
                  The heir may be addressed with the courtesy title “Younger of Barony,” and oldest daughter “Maid”:
                </P>
                <Forms>
                  <F>
                    <S>Younger of Barony</S>
                    <Or />
                    <S>Mr John Smith, Younger of Barony</S>
                    <Or />
                    <S>Barony Yr</S>
                    <N>(spoken Barony)</N>
                  </F>
                  <F>
                    <S>Maid of Barony</S>
                    <Or />
                    <S>Miss Jane Smith, Maid of Barony</S>
                    <N>(some prefer Maiden)</N>
                  </F>
                  <F>
                    Wife of heir: <S>Mrs Smith, Younger of Barony</S>
                  </F>
                </Forms>
                <P>If a baron holds a territorial designation, the TD typically takes precedence:</P>
                <Forms>
                  <F>
                    <S>Mr John Smith of TD, yr</S>
                  </F>
                  <F>
                    Wife of heir: <S>Mrs Smith of TD, yr</S>
                  </F>
                  <F>
                    Younger daughters: <S>Miss Mary Smith of TD</S>
                  </F>
                </Forms>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="special" title="Special Considerations">
                <P>
                  If the Baron holds additional titles or ranks, the baronial title should take precedence in most forms
                  of address. However, in cases where the Baron is also a peer, baronet, or knight of the realm, that
                  title would take precedence. For example:
                </P>
                <Forms>
                  <F>
                    <S>The Rt Hon The Lord Inverness</S>
                    <N>(if a Scottish Baron is also a Peer)</N>
                  </F>
                </Forms>
                <P>For example, if the Baron is also a knight, they would be addressed as:</P>
                <Forms>
                  <F>
                    <S>Sir John Smith</S>
                    <Or />
                    <S>Sir John Smith, Baron of Inverness</S>
                  </F>
                </Forms>
                <P>For military titles, military titles go before the title, or for maximum formality:</P>
                <Forms>
                  <F>
                    <S>Major (The Baron of) Inverness</S>
                  </F>
                  <F>
                    <S>Major The Much Honoured Baron of Inverness DL</S>{" "}
                    <S>(John Smith, 5th baron)</S> <N>— post-nominals after title</N>
                  </F>
                </Forms>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="dowager" title="Widow or Dowager Baroness">
                <div className="mb-2 mt-2 border-y border-parchment-300/70 py-6 text-center">
                  <p className="font-serif text-base italic leading-relaxed text-ink">
                    The mother of the premier baron — also styled <strong className="font-bold not-italic text-navy">Madam</strong>{" "}
                    instead of Lady, as a Highland chiefly family:
                  </p>
                  <p className="mt-4 font-serif text-xl font-bold text-navy">
                    <a
                      href="https://www.clanlivingstone.info/LateChief.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-gold/50 underline-offset-4 transition-colors hover:text-oxblood"
                    >
                      The Dowager Madam Livingstone of Bachuil
                    </a>
                  </p>
                  <p className="mt-5 border-t border-parchment-300/60 pt-5 font-serif text-base italic leading-relaxed text-ink">
                    As published in{" "}
                    <a
                      href="https://announcements.telegraph.co.uk/marketplace/advert/livingstone-of-bachuil-notices_61304"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
                    >
                      The Telegraph
                    </a>
                    : <strong className="font-bold not-italic text-navy">Valerie, Madam Livingstone of Bachuil</strong>{" "}
                    and <strong className="font-bold not-italic text-navy">Niall, Baron of Bachuil</strong>
                  </p>
                </div>
                <P>
                  The following section applies only to Pledged bloodline titles; as the title of honour always remains
                  within the family. However, if a non-Pledged title is disponed to another family, the honour ceases
                  for all connected family members, meaning there can be no dowager or continued courtesy titles. Upon
                  the death of a Scottish Baron, the widow retains the style of “Lady [Barony]” unless the new Baron is
                  married. New baron must be related to the dowager. In such cases, she may choose to be styled as:
                </P>
                <Forms>
                  <F>
                    <S>The Dowager Lady Inverness</S>
                  </F>
                  <F>
                    <S>Margaret, Lady Inverness</S>
                  </F>
                </Forms>
                <P>
                  If she remarries, she would take her style from her new husband, forfeiting her previous title.
                  However, by long-standing social convention in Great Britain, a divorced wife who does not remarry may
                  choose to retain her former husband’s title, minus the prefix—no longer “The Much Honoured.”
                </P>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="higher" title="Higher dignities Lord, Earl and Marquis in the Baronage of Scotland">
                <p className="mt-6 font-serif text-xl font-bold italic leading-[1.8] text-navy">
                  A baron, lord, earl or marquis in the baronage of Scotland are all barons of the Kingdom of Scotland:
                  the higher ranks are, in Stair’s words, “but more noble titles of a barony”.<Ref n={1} /> Innes of
                  Learney called the baronage “a subsisting yet very ancient ‘Order’ in the Realm of Scotland”, and Parliament in 1567 declared that “the barons of this realm ought to have vote
                  in Parliament as a part of the nobility”.<Ref n={10} /> The Esslemont Memorial of 1934, upheld by
                  Lord Lyon Grant and printed by Innes, called them “truly constitutional barons”.<Ref n={5} />
                </p>
                <P>
                  Over 90% of titles in the Baronage of Scotland are Baron of; a small number of very rare titles are
                  the nobler titles of lord, earl and marquis. Baron of somewhat distinguishes from peers (there are not
                  many titles in the peerage that use of for baron, for example many Irish peers are baron of). However,
                  to distinguish Earl of or Marquis of which could be confused with the peerage the prefix honorific
                  style The Much Hon. (The Much Honoured) can be put before the name, this prefix honorific is used to
                  distinguish Scottish Barons from honourifics attaching to peers. In Scotland marquis follows the French
                  spelling as a rule.
                </P>
                <P>
                  The Roll of Scottish Barons styles the holder of an earldom in the form the Lyon Court has used for
                  that holder. Where a Lord Lyon has recognised a holder of the earldom in an earl’s style, the style
                  continues to the successor; otherwise the holder is styled Baron of the Earldom, the form the Lyon
                  Court used for Annandale in 1983<Ref n={8} /> and the ceiling Lord Lyon Sellar set in 2010.<Ref n={9} />
                </P>
                <P>Earldom example:</P>
                <Forms>
                  <F>
                    Where a Lord Lyon has recognised the earldom’s holder as Earl:{" "}
                    <S>The Much Honoured Earl of Lochaber in the baronage of Scotland</S>
                    <N>(spoken Lochaber)</N>
                  </F>
                  <F>
                    Otherwise: <S>The Much Honoured Baron of the Earldom of Lochaber</S>
                    <N>(spoken Lochaber)</N>
                  </F>
                  <F>
                    Peer: <S>The Right Honourable The Earl of Lochaber</S>
                    <N>(spoken Lord Lochaber or The Earl)</N>
                  </F>
                </Forms>
                <P>
                  Note that for Lords in the Baronage of Scotland a baron is a lord and a lord is a baron: “Lord of X”
                  and “Baron of X” are interchangeable, as the holder prefers, and both are correct, a lordship being, in
                  Stair’s words, one of the “more noble titles of a barony”.<Ref n={1} /> “Lord Baron of X” is an
                  ancient combined form: Borthwick records that “the earliest appearance of peers in Scotland is under
                  the description of Lord Barons”, and it was the style of the Irish lords of Parliament in the
                  seventeenth century.<Ref n={2} /> A Scots baron who is not a lord is only ever called a baron. Non-peerage
                  lords have been written both “Lord X” and “Lord of X” since the Middle Ages, in the most formal documents
                  including Crown charters, as Borthwick’s examples below show: William Lord Graham in 1416 and William
                  Lord of Graham in 1420, before he received the Lord of Parliament honour of 1445.<Ref n={3} /> The medieval
                  sheriff-court rolls entered a lord as “Intrat A, Dominus de B” and a baron as “Intrat A, Baro de
                  B”.<Ref n={4} />
                </P>
                <figure className="mt-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/innes-1945-p158-baron-of-the-barony.webp"
                    alt="Innes of Learney, PSAS 79 (1944–45), p. 158: sheriff-court rolls entered ‘Intrat A, Dominus de B’ or ‘Intrat A, Baro de B’; where a peer held a feudal barony it was added to his style as ‘Baron of the Barony of X’."
                    width={1320}
                    height={453}
                    loading="lazy"
                    className="mx-auto w-full max-w-3xl border border-parchment-300/70"
                  />
                  <figcaption className="mt-3 text-center font-serif text-base italic text-ink/80">
                    Innes of Learney, “The Robes of the Feudal Baronage of Scotland” (1945), p. 158: “Dominus de B” and “Baro de B”
                    in the sheriff-court rolls, and the peerage form “Baron of the Barony of X”.
                  </figcaption>
                </figure>
                <P>
                  Both forms remain in use. “Lord X” asserts no rank by itself: it is the spoken form of peers, but
                  equally of judges of the Court of Session and courtesy lords, and it is the male counterpart of
                  “Lady X”, the form the baronage has always used for a baroness or a baron’s wife. So “The Much
                  Honoured Lord Lochaber” and “The Much Honoured Lord of Lochaber” are equally correct, the prefix
                  marking the baronage, while a baron remains “Baron of Inverness”. “Baron X” is different. In Britain
                  it is the formal designation of one thing only, a peer of the rank of baron, the form the Esslemont
                  Memorial of 1934 noted is “preferred for formal purposes by English and British lords”; no one else
                  uses it, and the Scottish form has always been “Baron of X”. That is the line not to cross: a Scots
                  baron is “Baron of X”, never “Baron X”, though Innes of Learney notes “Baron McCorquodale” as a non-peerage
                  description in 1427.<Ref n={5} />
                </P>
                <figure className="mt-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/innes-1945-baron-mccorquodale.webp"
                    alt="Innes of Learney, PSAS 79 (1944–45), p. 158: ‘In Argyll “Baron McCorquodale” is found as a non-peerage description in 1427.’"
                    width={1320}
                    height={233}
                    loading="lazy"
                    className="mx-auto w-full max-w-3xl border border-parchment-300/70"
                  />
                  <figcaption className="mt-3 text-center font-serif text-base italic text-ink/80">
                    The same page: “Baron McCorquodale”, a non-peerage description of 1427.
                  </figcaption>
                </figure>
                <P>
                  Lordships, earldoms and marquisates are nobler titles of a barony, so
                  their holders are barons whose barony carries the nobler name, and typically only the senior rank is
                  referenced, e.g. The Earl, The Lord, The Baron. “Earl in the baronage of Scotland” names the class; a
                  holder’s style follows the rule above: Earl where a Lord Lyon has recognised a holder of that earldom
                  in an earl’s style (at present Crawfurd-Lindsay, Rothes and Breadalbane, recognised under Lord Lyon
                  Blair in 2006–07), otherwise Baron of the Earldom, the form the Lyon Court used for Annandale in 1983,
                  unless the Lyon Court gives that holder another style.<Ref n={6} /> Some earldoms were erected by the
                  Crown as an earldom, lordship and barony in one unit; others sit on a barony of another
                  name.<Ref n={7} /> For the history of these words see{" "}
                  <Link href="/reading-room/lairds-lords-and-barons/" className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood">
                    Lairds, lords and barons
                  </Link>{" "}
                  and the{" "}
                  <Link href="/scottish-baronies-explained/#term-comes-dominus-baro" className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood">
                    glossary
                  </Link>
                  .
                </P>                <div className="mt-10 border-y border-parchment-300/70 py-6 text-center">
                  <p className="font-serif text-base italic leading-relaxed text-ink">
                    William Borthwick, 1775 —{" "}
                    <a
                      href="https://archive.org/details/inquiryintoorigi00bortuoft/page/12/mode/2up?q=Lord+Barons"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
                    >
                      An inquiry into the origin and limitations of the feudal dignities of Scotland
                    </a>
                  </p>
                  <figure className="mt-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/lord-baron.webp"
                      alt="Charter excerpt from Borthwick (1775): in 1416 William ‘Lord Graham’ receives the barony of Mellenok, and in 1420 ‘William Lord of Graham’ the lands of Aldmontrose."
                      width={584}
                      height={262}
                      className="mx-auto w-full max-w-md border border-navy/10 shadow-[0_14px_34px_-16px_rgba(8,12,28,0.4)]"
                    />
                  </figure>
                  <p className="mt-6 font-serif text-lg text-navy">
                    1416 William Lord Graham &gt;
                    <br />
                    1420 William Lord of Graham
                  </p>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    By definition a feudal lordship, as the additional Lord of Parliament honour was not created for
                    Lord Graham until 1445.
                  </p>
                </div>
                <p className="mt-8">
                  <Footnote n={0} heading="Authority & sources" label="Authority & sources" triggerClassName="cursor-pointer border-0 bg-transparent p-0 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-gold-deep underline decoration-dotted decoration-gold/40 underline-offset-4 transition-colors hover:text-oxblood">
                    <ol className="list-decimal space-y-3 pl-5">
                      {HIGHER_SOURCES.map((src, i) => (
                        <li key={i}>{src}</li>
                      ))}
                    </ol>
                  </Footnote>
                </p>
                {/* Crawlable copy of the sources — the pop-up renders its content only when opened. */}
                <ol hidden>
                  {HIGHER_SOURCES.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ol>
                <P>Lordship example:</P>
                <Forms>
                  <F>
                    Scottish baronial Lord: <S>The Much Honoured Lord Lochaber</S><Or /><S>Baron of Lochaber</S> never Baron X
                    <N>(spoken Lochaber)</N>
                  </F>
                  <F>
                    Peer: <S>The Right Honourable The Lord Lochaber</S>
                    <N>(spoken Lord Lochaber)</N>
                  </F>
                </Forms>
                <P>
                  The heir to these higher dignities is the same as a baron “Younger of Lochaber” for a son, and for the
                  oldest daughter “Maid of Lochaber”. Earls in the Baronage of Scotland, typically hold lordship or
                  barony subsidiary titles. For Pledged title holders, the Roll recommends special disposition allowing
                  their children use of their junior titles during their lifetimes, similar to courtesy titles in the
                  peerage but more like the Spanish nobility’s practice of subtitle transfer during a lifetime. This is a
                  one-time, irreversible process that lasts until death, after which the title reverts to the primary
                  succession of the senior title. For advice, contact us.
                </P>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="digital" title="Digital Address Guidelines for Barons">
                <P>
                  When entering the title of a Baron into a digital system, it is important to ensure that the title is
                  displayed correctly and with proper respect for its historical and legal significance. Below are
                  recommended practices for filling out typical fields in computer systems, such as databases, online
                  forms, and digital directories. Always think of how it will be presented in that system:
                </P>
                <DigitalAddressSimulator />
                <p className="mt-10 font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-navy/70">Field by field</p>
                <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-parchment-300/70 bg-parchment-300/70 md:grid-cols-2">
                  {DIGITAL.map((d, i) => (
                    <div
                      key={d.key}
                      className={`flex h-full flex-col bg-parchment-50 p-6 sm:p-7 ${d.key === "worst-case" ? "md:col-span-2" : ""}`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-inscribe text-[0.68rem] tabular-nums tracking-[0.2em] text-gold-deep">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-[1.25rem] leading-snug text-navy">{d.head}</h3>
                      </div>
                      <div className="gold-rule gold-rule--start mt-3 text-gold/70">
                        <span className="gold-rule__gem" />
                      </div>
                      <p className="mt-4 font-serif text-lg leading-relaxed text-ink">{d.entry}</p>
                      {d.example && (
                        <div className="mt-4 border border-navy/15 bg-white/70 px-4 py-3 shadow-[inset_0_1px_2px_rgba(8,12,28,0.06)]">
                          <span className="block font-sans text-[0.58rem] font-medium uppercase tracking-[0.2em] text-gold-deep">
                            Example entry
                          </span>
                          <p className="mt-1 font-serif text-lg leading-relaxed text-ink">{d.example}</p>
                        </div>
                      )}
                      {d.note && <p className="mt-4 font-serif text-base italic leading-relaxed text-muted">{d.note}</p>}
                    </div>
                  ))}
                </div>
                <P>
                  By following these guidelines, you can ensure that baronial titles are correctly represented and
                  respected in digital systems, maintaining the dignity and historical heritage of the title.
                </P>
              </Sec>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
