import Link from "next/link";
import type { ReactNode } from "react";
import { Footnote } from "@/components/Footnote";

/**
 * Numbered references for the question "Where does a Scottish baron rank?" (the table "The Noblesse of Scotland" and
 * the ladder under it). The owner asked on 2026-10-17 for each point to carry its own numbered reference to its
 * authority, in place of the one "Authority & sources" link. These are the sources that link held, divided point by
 * point; numbered in the order they appear on the page. The full list is still copied, hidden, for search engines.
 */
// Links in the cards in the house red, bold and underlined, so they are plainly links (owner 2026-10-17: the links
// were "not obvious enough to click"); links to other sites end in an arrow.
const ext =
  "font-semibold text-oxblood underline decoration-oxblood/60 decoration-[1.5px] underline-offset-2 transition-colors hover:text-oxblood-deep";
const int = ext;

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={ext}>
      {children}
      <span aria-hidden> ↗</span>
    </a>
  );
}

const MACKENZIE = "https://archive.org/details/bim_eighteenth-century_the-works-of-that-eminen_mackenzie-george-sir_1716_2/page/";
const INNES = "http://journals.socantscot.org/index.php/psas/article/download/8229/8197/";

const REFS: Record<number, ReactNode> = {
  1: (
    <>
      The heading is the Lyon Court’s nobility clause, “to be taken, numbered, accounted and received as Nobles in the
      Noblesse of Scotland”, in a grant of arms of 20 February 1984, reproduced in{" "}
      <A href="https://www.ccsna.org/sites/default/files/upload/2019-02/Scottish-Armory-and-Heraldry-by-Donald-Draper-Campbell-Esq-2019-01-12.pdf">
        D. D. Campbell, <em>Scottish Armory and Heraldry: A General Overview</em> (rev. 2019), p. 77
      </A>
      .
    </>
  ),
  2: (
    <>
      The order: Sir Thomas Innes of Learney, later Lord Lyon,{" "}
      <A href={INNES}>
        “The Robes of the Feudal Baronage of Scotland”, <em>Proceedings of the Society of Antiquaries of Scotland</em> 79
        (1944–45), p. 113
      </A>
      , from the baronets’ patents of 1625, which set the baronet, in Sir George Mackenzie’s English of 1680,
      “before all Knights, called equites aurati, all lesser Barons, commonly called Lairds, and before all other Gentlemen” (“Of Precedency”, in his <em>Works</em>, vol. ii (1716),{" "}
      <A href={`${MACKENZIE}n554/mode/1up`}>p. 547</A>).
    </>
  ),
  4: (
    <>
      English usage: in law the commoners are all peers of one another, as none of them is noble:{" "}
      <A href="https://avalon.law.yale.edu/18th_century/blackstone_bk1ch12.asp">
        Blackstone, <em>Commentaries on the Laws of England</em>, Book I, ch. 12 (1765)
      </A>
      .
    </>
  ),
  5: (
    <>
      Peers: <A href="https://www.legislation.gov.uk/aosp/1707/7">Treaty of Union, art. XXIII</A> (“Peers of Scotland”);{" "}
      <A href="https://dsl.ac.uk/entry/dost/pere_n_1">
        <em>Dictionary of the Older Scottish Tongue</em>, “Pere” n.1, sense 5
      </A>{" "}
      (“in Scotland, a member of the titled nobility”). The greater barons: “the greater barons and the lesser barons, the
      former acquiring such titles as Duke or Earl”, Lord Clyde in{" "}
      <A href="https://archive.org/details/1992-lord-clydes-dictum">
        <em>Spencer-Thomas of Buquhollie v Newell</em> 1992 SLT 973
      </A>
      ; Sir George Mackenzie, <em>Works</em>, vol. ii (1716), <A href={`${MACKENZIE}n557/mode/1up`}>p. 550</A> (“Now the
      Lords are called the great Barons, and the rest are called small Barons in the 101 Act, 7 Parl. James I. and ever
      since”), also <A href={`${MACKENZIE}n539/mode/1up`}>p. 534</A> and <A href={`${MACKENZIE}n552/mode/1up`}>p. 545</A>{" "}
      (“With us all are called Barons who hold their Lands of the King in libera baronia”, that is, in free barony).
    </>
  ),
  6: (
    <>
      Baronets: the patents create the hereditary state, degree, dignity, name, order, title and style of baronet
      (Mackenzie, <em>Works</em>, vol. ii, <A href={`${MACKENZIE}n554/mode/1up`}>p. 547</A>). See{" "}
      <Link href="/reading-room/how-the-baronets-pleaded-the-barons-nobility/" className={int}>
        How the baronets pleaded the barons’ nobility
      </Link>
      .
    </>
  ),
  7: (
    <>
      Knights and barons as noblemen: Act of 10 December 1540, “every noble man, such as an earl, lord, knight and baron”,
      in the modern English of the{" "}
      <A href="https://www.rps.ac.uk/trans/1540/12/30">Records of the Parliaments of Scotland, 1540/12/30</A>.
    </>
  ),
  8: (
    <>
      Barons: “…the nobility, earls, lords and barons…”, Parliament of Scotland, 1592 (
      <A href="https://www.rps.ac.uk/trans/1592/4/72">RPS 1592/4/72</A>, modern English; the Act of 1540 is in note 7); a
      barony does “ennoble” (Mackenzie,{" "}
      <em>Works</em>, vol. ii, <A href={`${MACKENZIE}n590/mode/1up`}>p. 583</A>); “recognised as a ‘titled nobility’”, Lyon
      Court interlocutor of 26 February 1943, printed by Innes of Learney, <A href={INNES}><em>PSAS</em> 79, p. 143 n. 3</A>;
      “of the rank of minor barons or untitled nobility of Scotland”, Lyon Court birthbrief of March 1930: see{" "}
      <Link href="/reading-room/untitled-in-1930-titled-in-1943/" className={int}>
        Untitled in 1930, titled in 1943
      </Link>{" "}
      and{" "}
      <Link href="/reading-room/barons-in-the-gazette/" className={int}>
        Barons in the Gazette
      </Link>
      . “Feudal barons” until feudal tenure ended on 28 November 2004 under the{" "}
      <A href="https://www.legislation.gov.uk/asp/2000/5/section/63">Abolition of Feudal Tenure etc. (Scotland) Act 2000</A>,
      whose s. 63 keeps the dignity of baron and “any quality or precedence associated with” it.
    </>
  ),
  9: (
    <>
      Esquires, chiefs, lairds and gentlemen: the Lyon Court’s grant of 1984 in note 1 was to an armiger without a
      title. See{" "}
      <Link href="/reading-room/lairds-lords-and-barons/" className={int}>
        Lairds, lords and barons
      </Link>
      .
    </>
  ),
  10: (
    <>
      The commons:{" "}
      <A href="https://dsl.ac.uk/entry/dost/commoun_n">
        <em>Dictionary of the Older Scottish Tongue</em>, “Commoun” n.
      </A>{" "}
      (“the common people”); “a Plebeian” (Mackenzie, <em>Works</em>, vol. ii,{" "}
      <A href={`${MACKENZIE}n559/mode/1up`}>p. 552</A>).
    </>
  ),
  3: (
    <>
      English usage: in law the commoners are all peers of one another, however far some outrank others, as none of them
      is noble: William Blackstone,{" "}
      <A href="https://archive.org/details/bim_eighteenth-century_commentaries-on-the-laws_blackstone-william-sir_1765_1/page/n404/mode/1up">
        <em>Commentaries on the Laws of England</em>, vol. I (Oxford, 1765), book I, ch. 12, p. 391
      </A>
      . Scots law: by the <A href="https://www.legislation.gov.uk/aosp/1707/7">Treaty of Union, art. XVIII</A>, the laws of
      Scotland “remain in the same force as before”, and “no alteration be made in Laws which concern private Right except
      for evident utility of the subjects within Scotland”. See{" "}
      <Link href="/reading-room/treaty-of-union/" className={int}>
        The Treaty of Union
      </Link>
      .
    </>
  ),
  11: (
    <>
      Innes of Learney, <A href={INNES}><em>PSAS</em> 79 (1944–45), p. 113</A>, after the baronets’ patents and the Lyon
      Register. See{" "}
      <Link href="/reading-room/innes-of-learney-1945/" className={int}>
        The Lord Lyon’s Case for the Baronage
      </Link>{" "}
      and{" "}
      <Link href="/reading-room/the-precedence-of-a-scottish-baron/" className={int}>
        “Never ceded” to knights or baronets: the precedence of a Scottish baron
      </Link>
      .
    </>
  ),
  12: (
    <>
      <A href="https://courtofthelordlyon.scot/blazoning.htm">Court of the Lord Lyon, “Blazoning”</A>.
    </>
  ),
  13: (
    <>
      The numbers of leaves and pearls, and “the caps of crimson velvet turned up with ermine, with a gold tassel on the
      top”, as in the Earl Marshal’s order of 1 October 1901, in{" "}
      <A href="https://archive.org/details/completeguidetoh00foxduoft/page/n418/mode/1up">
        A. C. Fox-Davies, <em>A Complete Guide to Heraldry</em> (1909), pp. 365–368
      </A>
      ; “the Scots and English have one form of coronets”, and the warrant of 2 June 1665 giving the lords of parliament,
      “those of the degree of peers”, “a golden circle decorated with six pearls”:{" "}
      <A href="https://archive.org/details/systemofheraldry02nisbuoft/page/n176/mode/1up">
        Nisbet, <em>A System of Heraldry</em>, vol. ii (1816 ed.), pp. 44, 51–52
      </A>
      .
    </>
  ),
  14: (
    <>
      Innes of Learney, <A href={INNES}><em>PSAS</em> 79 (1944–45), pp. 152–155</A>: the Roslin “red velvet cap”, and
      that the Lyon Court grants the chapeau in red (p. 155). See{" "}
      <Link href="/robes-and-chapeau/" className={int}>
        Robes &amp; Chapeau
      </Link>
      .
    </>
  ),
  15: (
    <>
      Father Hay’s account of the Roslin vault, opened in 1650, in Innes of Learney,{" "}
      <A href={INNES}><em>PSAS</em> 79 (1944–45), p. 152</A>.
    </>
  ),
  16: (
    <>
      The petition of Ainslie of Pilton, “heir and representative of the Feudal Barons of Dolphinton”, and the Lyon
      Court’s interlocutor of 28 November 1835: Innes of Learney, <A href={INNES}><em>PSAS</em> 79 (1944–45), p. 153</A>.
    </>
  ),
  17: (
    <>
      The Lord Lyon’s interlocutor of 4 September 1934: Innes of Learney,{" "}
      <A href={INNES}><em>PSAS</em> 79 (1944–45), p. 154</A>. See{" "}
      <Link href="/reading-room/esslemont-petition-1934/" className={int}>
        The Esslemont petition of 1934
      </Link>
      .
    </>
  ),
  18: (
    <>
      The patent of Sir Robert Gordon, the first baronet, 28 May 1625, printed in F. W. Pixley,{" "}
      <A href="https://archive.org/details/historyofbaronet00pixluoft/page/n102/mode/1up">
        <em>A History of the Baronetage</em> (1900), p. 83
      </A>
      ; in Sir George Mackenzie’s English of 1680, the baronet goes “before all Knights, called equites aurati, all lesser Barons, commonly called Lairds, and before all other Gentlemen” (“Of Precedency”, in his{" "}
      <em>Works</em>, vol. ii (1716), <A href={`${MACKENZIE}n554/mode/1up`}>p. 547</A>); Innes of Learney, <A href={INNES}><em>PSAS</em> 79 (1944–45), p. 113</A>.
    </>
  ),
  19: (
    <>
      George Seton,{" "}
      <A href="https://archive.org/details/lawpracticeofher00setouoft/page/n111/mode/1up">
        <em>The Law and Practice of Heraldry in Scotland</em> (1863), p. 76
      </A>
      , on the first volume of the Lyon Register; Innes of Learney, <A href={INNES}><em>PSAS</em> 79 (1944–45), p. 113</A>.
    </>
  ),
};

/**
 * A numbered reference marker; `light` for use on the navy title band; `big` for a number at a readable size and in
 * bold whatever the size of the text around it (owner 2026-10-17: the table's numbers "a bit bigger and clearer").
 */
export function R({ n, light = false, big = false }: { n: number; light?: boolean; big?: boolean }) {
  let marker = (
    <Footnote n={n} heading={`Reference · Note ${n}`}>
      {REFS[n]}
    </Footnote>
  );
  if (light) marker = <span className="[&_button]:text-gold-light [&_button]:decoration-gold-light/50">{marker}</span>;
  if (big) marker = <span className="text-[1.3rem] not-italic leading-none tracking-normal [&_button]:font-bold">{marker}</span>;
  return marker;
}
