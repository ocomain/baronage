import { NavBadge } from "@/components/NavBadge";
import { SectionSidebar } from "@/components/SectionSidebar";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { DigitalAddressSimulator } from "@/components/DigitalAddressSimulator";
import { Footnote } from "@/components/Footnote";
import { HeaderOffset } from "@/components/HeaderOffset";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/primitives";

export const metadata: Metadata = {
  alternates: { canonical: "/proper-address/" },
  title: "Proper Address for Scottish Barons",
  description:
    "The correct forms of address, salutation and precedence for Scottish Barons and Baronesses, written, spoken and online.",
};

const NAV: { id: string; label: string; badge?: string }[] = [
  { id: "verbal", label: "Address" },
  { id: "written", label: "Written Address" },
  { id: "salutation", label: "Salutation in Letters", badge: "New" }, // owner 2026-10-23 (the Lyon letters)
  { id: "children", label: "Children of a Baron" },
  { id: "special", label: "Special Considerations" },
  { id: "dowager", label: "Widow or Dowager" },
  { id: "higher", label: "Higher Dignities" },
  { id: "digital", label: "Digital Address Guidelines", badge: "New" },
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
/** Numbered marker that opens one of the higher-dignities sources in a pop-up card (same component as the Explained page). */
function Ref({ n, src }: { n: number; src: number }) {
  return <Footnote n={n}>{HIGHER_SOURCES[src - 1]}</Footnote>;
}
/** External source link inside a reference. */
function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood">
      {children}
    </a>
  );
}
/** Source for the heir's style, "Younger of" (and "Master" for a peer's heir). */
const HEIR_SOURCE: ReactNode = (
  <>
    Parliament, 1584, in one list: “Robert Dowglas, younger of Lochlevin, Laurence, maister of Oliephant, Johne,
    maister of Forbes” (<Src href="https://www.rps.ac.uk/ms/1584/5/60">Records of the Parliaments of Scotland, 1584/5/60</Src>).
    The Crown today: “Donald Cameron, Younger of Lochiel” (
    <Src href="https://www.thegazette.co.uk/London/issue/50467/page/4069">London Gazette, 21 March 1986, p. 4069</Src>).
    With “the”: an Act of 1778, “Lieutenant Allan Malcolm the younger of Lochore” (
    <Src href="https://archive.org/details/bim_eighteenth-century_anno-regni-georgii-iii-_great-britain_1778/page/n485/mode/1up">
      18 Geo. III, c. 23, p. 486
    </Src>
    ). For a Scottish peer’s heir the Passport Office enters “MASTER OF [title]” as the surname and adds “THE MASTER OF
    [title]” (
    <Src href="https://www.gov.uk/government/publications/titles-included-in-passports/titles-accessible">
      HM Passport Office, Titles
    </Src>
    ).{" "}
    <em>An Introductory Survey of the Sources and Literature of Scots Law</em>, Stair Society, vol. 1 (1936), p. 433:
    “Whilst the heir-apparent of a feudal baron is invariably styled ‘younger of’, the heir, whether apparent or
    presumptive, of an earl or peerage-lord is ‘Master’.” Quoted in the{" "}
    <Src href="https://dsl.ac.uk/entry/snd/maister_n1_v">Dictionaries of the Scots Language, “Maister”</Src>, sense 3.
    {" "}
    Innes of Learney: “the heir-apparent prefixes the word ‘younger’ (or ‘ygr.’) to the title”; officials “might
    otherwise suppose ‘younger’ to be a surname”, so in deeds he writes the word last; and “All unmarried daughters
    bear these titles, but younger sons, younger brothers, and collaterals do not bear the designation of the house”:{" "}
    <Adam page="408" n={439} />. See{" "}
    <Link href="/reading-room/younger-of-and-master-of/" className="underline decoration-gold/50 underline-offset-2 hover:text-oxblood">
      “Younger of” and “Master of”: the record set straight
    </Link>
    .
  </>
);
/** "The Maid of X" for a daughter who is the heir: two uses in the Bachuil family (owner's references, 2026-10-12). */
const MAID_SOURCE: ReactNode = (
  <>
    “From the Isle of Lismore came Catriona, the Maid of Bachuil heir to the chiefship of the Macleays, and her sister
    Flora Livingstone of Bachuil.” — the Standing Council of Scottish Chiefs,{" "}
    <Src href="https://www.clanchiefs.org.uk/heirs-reception-given-by-the-standing-council-of-scottish-chiefs/">
      “Heirs Reception given by the Standing Council of Scottish Chiefs”
    </Src>
    , 15 December 2014, on the reception at the Palace of Holyroodhouse on 28 November 2014. See also the Baron of the
    Bachuil’s own profile on <Src href="https://uk.linkedin.com/in/niall-bachuil-40a7ab5a">LinkedIn</Src> (sign-in
    needed).
  </>
);
/** Source for "Lady of X" used by a lady laird in her own right. */
const LADY_SOURCE: ReactNode = (
  <>
    Catherine Maxwell Stuart, 21st Lady of Traquair, signs the welcome on Traquair House’s own site —{" "}
    <Src href="https://www.traquair.co.uk/about-traquair/">traquair.co.uk, “About Traquair”</Src>.
  </>
);
/** Source for post-nominal letters following the baronial title. */
const POSTNOMINAL_SOURCE: ReactNode = (
  <>
    Birthday Honours 2005, Diplomatic Service and Overseas List, 11 June 2005, Order of the British Empire, OBE: “Robert Brown GILLESPIE, Baron of Blackhall — For services to British business interests, especially engineering, in France”, p. 2 —{" "}
    <Src href="http://news.bbc.co.uk/1/shared/bsp/hi/pdfs/birthhons_foreign_11_06_05.pdf">PDF (BBC News)</Src>. The official list prints the barony as part of the name; the honour follows it. Innes of Learney gives the rule:
    such honours “follow after the territorial or chiefly title, e.g. ‘Colonel Hugh Rose of Kilravock, C.B.’”:{" "}
    <Adam page="410" n={441} />.
  </>
);
/** Source for the designation and the barony written together (Written Address). */
const TD_GAZETTE_SOURCE: ReactNode = (
  <>
    Court of the Lord Lyon, “Rolls of the Chiefs, and Heads of Territorial Houses … Officially Recognised”, <em>The Edinburgh Gazette</em>, 19 August 2005: entries print the designation and the barony together where they differ, e.g. “Newlands of Lauriston, Baron of Miltonhaven” (matriculated 6 October 2003, Lyon Register 85/36) —{" "}
    <Src href="https://www.thegazette.co.uk/notice/E-25893-1107-293">The Gazette</Src>. The same form appears in earlier notices, e.g. “Teall of Teallach Baron of Huntly”, 4 April 1997, p. 777.
  </>
);
/** Source for “Baron of Esslemont” and “The Baron of Hallhead-Esslemont” (Written Address). */
const TD_ESSLEMONT_SOURCE: ReactNode = (
  <>
    Sir Thomas Innes of Learney, “The Robes of the Feudal Baronage of Scotland”, <em>Proceedings of the Society of Antiquaries of Scotland</em> 79 (1944–45): the Esslemont matriculation of 4 September 1934, Lyon Register vol. xxxi, p. 20, in which Gordon of Hallhead was “duly described as Baron of Esslemont”, p. 160 n. 1; and “The Baron of Hallhead-Esslemont duly received both chapeau and designation, consistently with the statute and the ancient precedents of Lyon Court”, p. 163 —{" "}
    <Src href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/">journal PDF</Src>. See{" "}
    <Link href="/reading-room/esslemont-petition-1934/" className="underline decoration-gold/50 underline-offset-2 hover:text-oxblood">The Esslemont petition of 1934</Link>.
  </>
);
/** Sources for the higher-dignities note; opened from the numbered markers. */
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
    <Src href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/">journal PDF</Src>.
  </>,
  <>
    Innes of Learney (1945), p. 158 and n. 7, citing Sir Bruce Seton’s Gordon Peerage Case, p. 15. Reproduced above. On “Baron of X” as the correct form, and “esquire” never added, pp. 161–163; the Esslemont Memorial’s words “preferred for formal purposes by English and British lords”, p. 163.
    The Lord Lyon’s “Lord” is that of his office: “The Officers of the Court are the Lord Lyon King of Arms and the Lyon Clerk
    and Keeper of the Records, both appointed by the Sovereign on the recommendation of the First Minister” —{" "}
    <Src href="https://courtofthelordlyon.scot/about%20us.htm">Court of the Lord Lyon, About us</Src>.
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
    Act of the Parliament of Scotland, 20 December 1567, article 33: “the barons of this realm ought to have vote in parliament as a part of the nobility” —{" "}
    <Src href="https://www.rps.ac.uk/trans/1567/12/45">RPS 1567/12/45</Src>. Sir Thomas Innes of Learney, “The Robes of the Feudal Baronage of Scotland”, <em>Proceedings of the Society of Antiquaries of Scotland</em> 79 (1944–45), p. 132, quoting the Act: “This clarifies the (obvious) nobiliary fact, that the Barons are a part of ‘The Nobility’ in its constitutional sense, and as an ‘Order’ or ‘Estate’” —{" "}
    <Src href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/">journal PDF</Src>. See{" "}
    <Link href="/reading-room/innes-of-learney-1945/" className="underline decoration-gold/50 underline-offset-2 hover:text-oxblood">Innes of Learney, 1945</Link>.
  </>,
];
/* Sir Thomas Innes of Learney on forms of address, in his revision of Adam's "Clans, Septs and Regiments"
   (pp. 408–411). Every quotation below was read on the page image (11 October 2026). In copyright: short
   quotations only. */
function Adam({ page, n }: { page: string; n: number }) {
  return (
    <>
      Frank Adam, <em>The Clans, Septs and Regiments of the Scottish Highlands</em>, revised by Sir Thomas Innes of
      Learney, <Src href={`https://archive.org/details/bwb_S0-BUT-001/page/n${n}`}>p. {page}</Src> (the page linked is
      from a later printing)
    </>
  );
}
const TITLE_ALONE_SOURCE = (
  <>
    “In personal address, the title alone is used, e.g. ‘Lochiel,’ ‘Glengarry,’ ‘Monaltrie’—no ‘Mr.’”; and “It is rude,
    not ‘respectful,’ to address Clanranald as ‘Mr. Macdonald’”: <Adam page="409" n={440} />.
  </>
);
const ESQUIRE_SOURCE = (
  <>
    “‘Esquire’ is not normally added, the designation being taken to infer it.” Where it is used, that is “when the laird
    or chief is not a baron”: <Adam page="410" n={441} />.
  </>
);
const MADAM_SOURCE = (
  <>
    A laird’s wife is “in formal documents, ‘Madam Neilson of Craigcaffie’”: <Adam page="411" n={442} />.
  </>
);
const VISITING_CARD_SOURCE = (
  <>
    Territorial and chiefly titles are used upon visiting-cards, “where they may (and strictly should) be on the same line
    as the name”: <Adam page="410" n={441} />.
  </>
);
const LADY_TITLE_SOURCE = (
  <>
    “This feudal title of ‘lady’ is not a ‘courtesy’ but a proper legal description of the female”; “‘Lady Craigcaffie’ is
    a style still used, e.g. Lyon Court record narrative”: <Adam page="411" n={442} />. The Laird of Drum’s wife is “The
    Lady Drum”: the same, p. 410, note 1.
  </>
);
const PROFESSOR_SOURCE = (
  <>
    Court of Session, Outer House, Opinion of Lord Uist, 22 February 2008, [2008] CSOH 36, in the Petition of “Professor The
    Much Honoured Stephen Pendaries Kerr of Ardgowan, Baron of Ardgowan” for judicial review of a decision of the Lord Lyon
    King of Arms. His petition to the Lord Lyon of 24 May 2004 was “in the name ‘The Much Honoured Stephen Kerr of Ardgowan,
    Baron of Ardgowan’” (para. [2]) —{" "}
    <Src href="http://web.archive.org/web/20080603042706/http://www.scotcourts.gov.uk:80/opinions/2008CSOH36.html">Scottish Courts (archived)</Src>.
  </>
);
const DEAR_SOURCE = (
  <>
    In personal letters a laird or chief “is addressed ‘Dear Glenfalloch,’ not ‘Dear Campbell’”: <Adam page="410" n={441} />.
  </>
);
const WIDOW_SOURCE = (
  <>
    “Under Scots law, a wife or widow has certain rights in her husband’s estate, and in our law of families and titles she
    has corresponding rights in the name and title of her husband”: <Adam page="410" n={441} />.
  </>
);
const RECORDS_SOURCE = (
  <>
    “official recognition is only accorded where such titles are ordinarily used”; “Signature on cheques is a good test!”
    He also quotes the editor of the <em>Annuaire de la Noblesse de la France</em>: such titles should be “regularly
    employed in all registrations of Births, Marriages, or Deaths”: <Adam page="409" n={440} />.
  </>
);

/* Sources for the duke-and-baron table under "Address". Each is set out in full, with every letter cited,
   in the Reading Room paper "Where 'The Much Honoured' comes from". */
const MUCH_HONOURED_PAPER = (
  <Link href="/reading-room/where-the-much-honoured-comes-from/" className="underline decoration-gold/50 underline-offset-2 hover:text-oxblood">
    Where “The Much Honoured” comes from
  </Link>
);
const YOUR_HONOUR_SOURCE = (
  <>
    <em>Titles and Forms of Address</em>, 9th ed. (1955), under “Chiefs of Scottish Clans and Territorial Houses”: “The
    prefix of Chiefs and Laird-Barons was, in writing, The Much Honoured; in address, Your Honour” —{" "}
    <Src href="https://archive.org/details/titlesandformsof017862mbp">archive.org</Src>. In use: “May it pleas your
    Honour”, the tenants of Glenshee to the Laird of Invercauld, 4 March 1776, <em>The Records of Invercauld</em>,{" "}
    <Src href="https://archive.org/details/recordsofinverca00news/page/n377">pp. 342–343</Src>. See {MUCH_HONOURED_PAPER}.
  </>
);
const FORMAL_LETTER_SOURCE = (
  <>
    Opening: the Marquis of Huntly to the Laird of Grant, 22 December 1677, “Much honored Sir”, <em>The Chiefs of
    Grant</em>, vol. 2, <Src href="https://archive.org/details/chiefsofgrantv200fras/page/n86">p. 23</Src>; General Mackay to
    Campbell of Calder, 18 October 1677, “Much Honored Sir”, <em>The Book of the Thanes of Cawdor</em>,{" "}
    <Src href="https://archive.org/details/bookthanescawdo00innegoog/page/n424">p. 336</Src>. Close: George Stirling to the
    Laird of Keir, 1673, “your Honouris humble servant”, <em>The Stirlings of Keir</em>,{" "}
    <Src href="https://archive.org/details/stirlingsofkeirt00fras/page/n629">p. 506</Src>. See {MUCH_HONOURED_PAPER}.
  </>
);
const ENVELOPE_SOURCE = (
  <>
    Letters “should be and still sometimes are addressed, e.g. ‘The Much Honoured, the Laird of Glenfalloch,’ or if a
    baron, ‘The Much Honoured, the Baron of Dunfallandy’”: Frank Adam, <em>The Clans, Septs and Regiments of the Scottish
    Highlands</em>, revised by Sir Thomas Innes of Learney,{" "}
    <Src href="https://archive.org/details/bwb_S0-BUT-001/page/n441">p. 410</Src>. The passage is in the edition of 1952
    (W. &amp; A. K. Johnston) and in later ones; the page linked is from a later printing. It is not in the first edition
    of 1908.
  </>
);
function Sec({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="anchor-clear">
      <h2 className="font-display text-[1.7rem] font-medium leading-tight text-navy underline decoration-1 underline-offset-[0.32em] sm:text-[2.05rem]">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}


export default function ProperAddressPage() {
  return (
    <>
      <PageHero
        eyebrow="Forms of Address & Precedence"
        title="Proper Address for Scottish Barons"
        intro="The correct forms, in writing, in speech and online."
        image="/images/charter-seal.webp"
        position="center 40%"
      />

      <HeaderOffset />
      <SectionSidebar items={NAV} anchorId="page-nav" />

      {/* In-page quick navigation */}
      <div className="border-y border-parchment-300/60 bg-white">
        <Container size="prose">
          <nav id="page-nav" className="flex flex-wrap gap-x-5 gap-y-2 py-4 text-sm">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="nav-link font-sans text-[0.66rem] uppercase tracking-[0.14em] text-navy/60 transition-colors hover:text-oxblood"
              >
                {n.label}
                {n.badge && <NavBadge>{n.badge}</NavBadge>}
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
                    <Footnote n={1}>{TITLE_ALONE_SOURCE}</Footnote>
                  </F>
                  <F>
                    In person: <S>Baroness</S> <em>or</em> <S>Lady Inverness</S>
                  </F>
                </Forms>
                <P>
                  It is incorrect to refer to them simply by their surname or without the baronial designation, e.g.,
                  “Mr / Mrs Smith” or “Esq.” is certainly incorrect.<Footnote n={2}>{ESQUIRE_SOURCE}</Footnote> Some wives of highland clan chief-barons prefer{" "}
                  <S>Madam</S>.<Footnote n={3}>{MADAM_SOURCE}</Footnote>
                </P>
                <P>
                  “<S>Your Honour</S>” is the old formal address of a baron, the spoken counterpart of the written
                  prefix “The Much Honoured”.
                </P>
                <p className="mt-4 font-serif text-base leading-relaxed text-ink">
                  Used to barons from the 1620s to the 1770s (“May it pleas your Honour”, the tenants of Glenshee to
                  the Laird of Invercauld, 1776) and recorded in <em>Titles and Forms of Address</em> (1955): “The
                  prefix of Chiefs and Laird-Barons was, in writing, The Much Honoured; in address, Your Honour”. See{" "}
                  <Link
                    href="/reading-room/where-the-much-honoured-comes-from/#your-honour"
                    className="underline decoration-gold/60 underline-offset-2 transition-colors hover:text-oxblood"
                  >
                    Where “The Much Honoured” comes from
                  </Link>
                  . A baron’s forms run parallel to a duke’s, each at its own level:
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse font-serif text-lg leading-snug text-ink">
                    <thead>
                      <tr className="border-b border-navy/20 text-left font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">
                        <th className="py-2 pr-4"></th>
                        <th className="py-2 pr-4">A duke</th>
                        <th className="py-2">A baron</th>
                      </tr>
                    </thead>
                    <tbody className="[&_td]:border-b [&_td]:border-parchment-300/70 [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top">
                      <tr>
                        <td>Title</td>
                        <td>The Duke of X</td>
                        <td><S>The Baron of X</S></td>
                      </tr>
                      <tr>
                        <td>Speaking about him</td>
                        <td>the Duke</td>
                        <td><S>the Baron</S></td>
                      </tr>
                      <tr>
                        <td>Speaking to him, as an equal</td>
                        <td>Duke</td>
                        <td><S>Baron</S> (or Inverness)</td>
                      </tr>
                      <tr>
                        <td>Speaking to him deferentially</td>
                        <td>Your Grace</td>
                        <td><S>Your Honour</S><Footnote n={4}>{YOUR_HONOUR_SOURCE}</Footnote></td>
                      </tr>
                      <tr>
                        <td>Formal letter</td>
                        <td>opens “My Lord Duke”, closes “Your Grace’s most obedient servant”</td>
                        <td><S>opens “Much Honoured Sir”, closes “Your Honour’s humble servant”</S><Footnote n={5}>{FORMAL_LETTER_SOURCE}</Footnote></td>
                      </tr>
                      <tr>
                        <td>Social letter</td>
                        <td>“Dear Duke of Middlesex” or “Dear Duke”</td>
                        <td><S>“Dear Baron of Inverness”, “Dear Baron”</S><Or /><S>“Dear Inverness”</S></td>
                      </tr>
                      <tr>
                        <td>Envelope</td>
                        <td>His Grace the Duke of Middlesex</td>
                        <td><S>The Much Honoured, the Baron of Inverness</S><Footnote n={6}>{ENVELOPE_SOURCE}</Footnote></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* The three references above open in pop-ups; these copies keep them in the page's own HTML. */}
                <div hidden>{YOUR_HONOUR_SOURCE}</div>
                <div hidden>{FORMAL_LETTER_SOURCE}</div>
                <div hidden>{ENVELOPE_SOURCE}</div>
                <div hidden>
                  {TITLE_ALONE_SOURCE} {ESQUIRE_SOURCE} {MADAM_SOURCE} {VISITING_CARD_SOURCE} {LADY_TITLE_SOURCE} {DEAR_SOURCE}{" "}
                  {WIDOW_SOURCE} {RECORDS_SOURCE} {POSTNOMINAL_SOURCE}
                </div>
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
                  On a visiting card, the title goes on the same line as the name, never on a line beneath it
                  <Footnote n={7}>{VISITING_CARD_SOURCE}</Footnote>:
                </P>
                <Forms>
                  <F>
                    <S>John Smith, Baron of Inverness</S>
                  </F>
                  <F>
                    Not “John Smith” with “Baron of Inverness” on a second line
                  </F>
                </Forms>
                <P>
                  Where the territorial designation and the barony differ, both are written, as the Lyon Court’s{" "}
                  {/* owner 2026-10-23: linked to the paper */}
                  <Link
                    href="/reading-room/barons-in-the-gazette/"
                    className="underline decoration-gold/60 underline-offset-2 transition-colors hover:text-oxblood"
                  >
                    Gazette notices
                  </Link>{" "}
                  do: “[Surname] of Kildonan, Baron of Inverness”.<Footnote n={8}>{TD_GAZETTE_SOURCE}</Footnote> They may also be joined socially:
                  Lord Lyon Innes of Learney, writing in 1945, called the petitioner in the Esslemont case, Gordon of
                  Hallhead, “The Baron of Hallhead-Esslemont”, though the Lyon Register records him as “Baron of
                  Esslemont”.<Footnote n={9}>{TD_ESSLEMONT_SOURCE}</Footnote> The recorded title stays “Baron of [Barony]”; the wife takes the designation, as a laird’s
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
                {/* The pop-ups render only when opened; this keeps these sources in the page's own HTML. */}
                <div hidden>
                  {TD_GAZETTE_SOURCE} {TD_ESSLEMONT_SOURCE} {LADY_SOURCE}
                </div>
                <div className="gold-rule my-10 text-gold/70" aria-hidden="true"><span className="gold-rule__gem" /></div>
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
                  She shares his rank and assumes the feminine form of his title by legal description
                  <Footnote n={10}>{LADY_TITLE_SOURCE}</Footnote> but does not hold it in her own right. Upon marriage, she takes his style; if widowed or divorced, her title use follows
                  convention, not entitlement. As titles of nobility are considered part of a person’s name and
                  identity, her title is reflected in a British passport as her legal name.
                </P>
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
                  often seen, but are still socially incorrect. The phrase “Lady of Inverness” is wrong unless the lady in
                  question is a{" "}
                  <Link
                    href="/reading-room/lairds-lords-and-barons/"
                    className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
                  >
                    laird
                  </Link>{" "}
                  in her own right.<Footnote n={11}>{LADY_SOURCE}</Footnote>
                </P>
                <div className="gold-rule my-10 text-gold/70" aria-hidden="true"><span className="gold-rule__gem" /></div>
                <P>
                  In cases where the Baron is entitled to post-nominal letters, these should follow<Footnote n={12}>{POSTNOMINAL_SOURCE}</Footnote>, such as:
                </P>
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
                  {/* owner 2026-10-25: the main style, first */}
                  <F>
                    <S>Prof The Much Hon John Smith, Baron of Inverness</S>
                    <Footnote n={13}>{PROFESSOR_SOURCE}</Footnote>
                    <Or />
                    <S>Prof the Baron of Inverness</S>
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
                  {/* owner 2026-10-23: "A lower-case “b” for baron is inconsequential" (he went back to "inconsequential":
                      "I think inconsequential is better personally") */}
                  When beginning a letter to a Scottish Baron, the salutation should reflect the dignity of the title. A
                  lower-case “b” for baron is inconsequential. The correct salutation is:
                </P>
                <Forms>
                  <F>
                    <S>Dear the baron of Inverness</S>
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
                {/* owner 2026-10-21: the Lyon Office's covering letter of 2013 (the owner's copy, address blacked out),
                    "with a sentence saying Dear Baron Inverness has been used by lyon office in previous years"; then
                    "a bit smaller and perhaps aligned to the right of the text", then "better underneath and slightly bigger so can read it", then "1/3 smaller" (512px to 344px); the letter speaking for itself; cropped to its text ("you don't need all that white space") */}
                <P>
                  Alternatively, only the barony or TD can be used: <S>Dear Inverness</S>
                  <Footnote n={14}>{DEAR_SOURCE}</Footnote>, but this format is never for a lady.
                </P>
                {/* own paragraph, "in previous years" cut (owner 2026-10-30) */}
                <P>
                  <S>Dear Baron Inverness</S> has also been used by the Lyon Office:
                </P>
                {/* owner 2026-10-23: the 1976 "Dear Drum" letter added, first side by side, then "worth both letters
                    being blown up more so not side by side put drum letter second underneath"; the 2013 letter
                    shortened to end at its main paragraph ("crop out the yours sincerely section"). Both copies are
                    the owner's, with addresses and private passages blacked out. */}
                <div className="mx-auto mt-6 grid max-w-[26rem] gap-8">
                  {[
                    {
                      // owner 2026-10-23: from just above the Lyon arms ("doesn't look as good without seeing the
                      // lyon coat of arms") down to the letter's first line
                      file: "lyon-letter-2013-arms",
                      w: 640,
                      h: 587,
                      alt: "Letter of the Court of the Lord Lyon, 8 October 2013, to Jean-Guy Philip Boisserolles de Saint-Julien, Baron of Hartsyde, beginning “Dear Baron Hartsyde”",
                      caption: "Lyon Office, 2013: “Dear Baron Hartsyde”",
                    },
                    {
                      file: "lyon-letter-1976-drum",
                      w: 640,
                      h: 461,
                      alt: "Letter from the Lyon Clerk and Keeper of the Records, Malcolm R. Innes of Edingight, Court of the Lord Lyon, 14 October 1976, to Lt. Col. C. F. Irvine of Drum, M.C., beginning “Dear Drum”, with the words “you and your heirs were the undoubted barons of Drum” circled",
                      // owner 2026-10-23: "not just Lyon Clerk he went on to be lord lyon"; day and month dropped from both captions
                      caption: "Innes of Edingight, Lyon Clerk, later Lord Lyon, 1976: “Dear Drum”", // owner: "delete Malcolm"
                    },
                  ].map((l) => (
                    <figure key={l.file}>
                      <a href={`/images/${l.file}.webp`} target="_blank" rel="noopener noreferrer" className="block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/images/${l.file}-640.webp`}
                          srcSet={`/images/${l.file}-640.webp 640w, /images/${l.file}.webp ${l.file.includes("1976") ? 874 : 1200}w`}
                          sizes="(min-width: 640px) 26rem, 100vw"
                          alt={l.alt}
                          width={l.w}
                          height={l.h}
                          loading="lazy"
                          decoding="async"
                          className="w-full border border-parchment-300 shadow-[0_14px_32px_-20px_rgba(10,16,36,0.5)]"
                        />
                      </a>
                      <figcaption className="mt-3 text-center font-serif text-base italic leading-snug text-muted">
                        {l.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <p className="mt-2 text-center font-serif text-sm italic text-muted">Select a letter to enlarge it.</p>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="children" title="Addressing the Children of a Baron">
                <P>
                  {/* owner 2026-10-23: link to the paper on "Younger of" and "Master of" */}
                  The heir is styled{" "}
                  <Link href="/reading-room/younger-of-and-master-of/" className="underline decoration-gold/60 underline-offset-2 transition-colors hover:text-oxblood">
                    “Younger of Barony”
                  </Link>
                  , as a Scottish peer’s heir is “Master of”. “The” may go before either,
                  and keeps “younger” from being read as a surname.<Footnote n={15}>{HEIR_SOURCE}</Footnote>
                </P>
                <div hidden>{HEIR_SOURCE}</div>
                <div hidden>{MAID_SOURCE}</div>
                <Forms>
                  <F>
                    <S>Younger of Barony</S>
                    <Or />
                    <S>Mr John Smith, Younger of Barony</S>
                    <Or />
                    <S>Barony yr</S>
                    <N>(spoken barony or young barony)</N>
                  </F>
                  <F>
                    Wife of heir: <S>Mrs Smith, Younger of Barony</S>
                  </F>
                </Forms>
                <P>
                  Where there is no son and a daughter is the heir, some families style her “Maid of Barony”
                  <Footnote n={16}>{MAID_SOURCE}</Footnote>, a usage best kept where the family already has it:
                </P>
                <Forms>
                  <F>
                    <S>Maid of Barony</S>
                    <Or />
                    <S>Miss Jane Smith, the Maid of Barony</S>
                    <N>(some prefer Maiden)</N>
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
                    Unmarried daughters: <S>Miss Mary Smith of TD</S>
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
                  The following section applies only to Pledged hereditary titles; as the title of honour always remains
                  within the family. However, if a non-Pledged title is disponed to another family, the honour ceases
                  for all connected family members, meaning there can be no dowager or continued courtesy titles. Upon
                  the death of a Scottish Baron, the widow retains the style of “Lady [Barony]”<Footnote n={17}>{WIDOW_SOURCE}</Footnote> unless the new Baron is
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
                  A baron, a lord, earl or marquis in the baronage of Scotland are all barons of the Kingdom of Scotland,
                  the higher ranks being, in the words of Viscount Stair, “but more noble titles of a barony”,<Ref n={18} src={1} />{" "}
                  and the Parliament of Scotland declared in 1567 that “the barons of this realm ought to have vote in
                  parliament as a part of the nobility”, an Act which, in the words of Lord Lyon Innes of Learney,
                  “clarifies the (obvious) nobiliary fact, that the Barons are a part of ‘The Nobility’ in its
                  constitutional sense, and as an ‘Order’ or ‘Estate’”.<Ref n={19} src={10} />
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
                  {/* owner 2026-10-23: link to the paper on non-peerage earldoms */}
                  The Roll of Scottish Barons styles{" "}
                  <Link href="/reading-room/non-peerage-earldoms/" className="underline decoration-gold/60 underline-offset-2 transition-colors hover:text-oxblood">
                    the holder of an earldom
                  </Link>{" "}
                  in the form the Lyon Court has used for
                  that holder. Where a Lord Lyon has recognised a holder of the earldom in an earl’s style, the style
                  continues to the successor; otherwise the holder is styled Baron of the Earldom, the form the Lyon
                  Court used for Annandale in 1983<Ref n={20} src={8} /> and the ceiling Lord Lyon Sellar set in 2010.<Ref n={21} src={9} />
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
                  Stair’s words, one of the “more noble titles of a barony”.<Ref n={22} src={1} /> A Scots baron who is not a lord is only
                  ever called a baron. “Lord Baron of X” is an ancient combined form.<Ref n={23} src={2} /> Non-peerage
                  lords have been written both “Lord X” and “Lord of X” since the Middle Ages, in the most formal documents
                  including Crown charters, as Borthwick’s examples below show: William Lord Graham in 1416 and William
                  Lord of Graham in 1420, before he received the Lord of Parliament honour of 1445.<Ref n={24} src={3} /> The medieval
                  sheriff-court rolls entered a lord as “Intrat A, Dominus de B” and a baron as “Intrat A, Baro de
                  B”.<Ref n={25} src={4} />
                </P>
                <P>
                  Both forms remain in use. “Lord X” asserts no rank by itself: it is the spoken form of peers, but
                  equally of judges of the Court of Session, courtesy lords and the Lord Lyon himself, and it is the male counterpart of
                  “Lady X”, the form the baronage has always used for a baroness or a baron’s wife. So for a lord in the baronage of Scotland “The Much Honoured Lord Lochaber” and “The Much Honoured Lord
                  of Lochaber” are equally correct, the prefix marking the baronage, while a baron who is not a lord
                  remains “Baron of Inverness”. “Baron X” is different. In Britain
                  it is the formal designation of one thing only, a peer of the rank of baron, the form the Esslemont
                  Memorial of 1934 noted is “preferred for formal purposes by English and British lords”; no one else
                  uses it, and the Scottish form has always been “Baron of X”. That is the line not to cross: a Scots
                  baron is “Baron of X”, never “Baron X”, though Innes of Learney notes “Baron McCorquodale” as a non-peerage
                  description in 1427.<Ref n={26} src={5} />
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
                  referenced. “Earl in the baronage of Scotland” names the class; a
                  holder’s style follows the rule above: Earl where a Lord Lyon has recognised a holder of that earldom
                  in an earl’s style (at present Crawfurd-Lindsay, Rothes and Breadalbane, recognised under Lord Lyon
                  Blair in 2006–07), otherwise Baron of the Earldom, the form the Lyon Court used for Annandale in 1983,
                  unless the Lyon Court gives that holder another style.<Ref n={27} src={6} /> Some earldoms were erected by the
                  Crown as an earldom, lordship and barony in one unit; others sit on a barony of another
                  name.<Ref n={28} src={7} /> For the history of these words see{" "}
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
                      loading="lazy"
                      decoding="async"
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
                {/* Crawlable copy of the sources — the pop-up renders its content only when opened. */}
                <ol hidden>
                  {HIGHER_SOURCES.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ol>
                <P>
                  Formally for a lordship, as the Lyon Court has recorded it, the style is “Lord of X” or “Baron of X”; socially “Lord X” is also used,
                  just as a “Baroness of” may be “Lady X”.
                </P>
                <P>Lordship example:</P>
                <Forms>
                  <F>
                    Scottish baronial lord: <S>The Much Honoured Lord Lochaber</S><Or /><S>Baron of Lochaber</S>
                  </F>
                  <F>
                    Baron without a lordship: <S>The Much Honoured Baron of Lochaber</S>
                    <N>(never Lord)</N>
                  </F>
                  <F>
                    Peer: <S>The Right Honourable The Lord Lochaber</S>
                  </F>
                </Forms>
                <P>
                  The heir to these higher dignities is the same as a baron’s: “Younger of Lochaber” for a son, and, where
                  a daughter is the heir, “Maid of Lochaber”. Earls in the Baronage of Scotland, typically hold lordship or
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
                <P>
                  Use the title on every record and every signature. Official recognition is given only to titles in
                  ordinary use.<Footnote n={29}>{RECORDS_SOURCE}</Footnote>
                </P>
                {/* owner 2026-10-30: from note 29, the words of the Annuaire's editor, as a big quote */}
                <blockquote className="mt-8 border-l-2 border-gold pl-6 font-serif text-2xl italic leading-relaxed text-navy sm:pl-8">
                  Such titles should be “regularly employed in all registrations of Births, Marriages, or Deaths”.
                </blockquote>
                <DigitalAddressSimulator />
                {/* "Field by field" table deleted (owner 2026-10-23: "I think that's confusing") */}
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
