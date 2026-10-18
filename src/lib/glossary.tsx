import Link from "next/link";
import type { ReactNode } from "react";

/* The glossary of "Scottish Baronies, Explained", moved here from the page (2026-10-18) so that terms can be linked
   to it from anywhere on the page (components/Glossary.tsx). */
const extLink =
  "text-gold-deep underline decoration-gold/40 underline-offset-2 transition-colors hover:text-oxblood";
const intLink =
  "text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:text-oxblood-deep";

/** Key terms, single source of truth for the visible glossary and the
 * schema.org DefinedTermSet. */
/** `def` is plain text (it feeds the schema.org DefinedTermSet); `note` is an
 * optional small-print line of sources or cross-references rendered beneath it. */
export const glossary: { term: string; def: string; note?: ReactNode }[] = [
  {
    term: "Scottish feudal barony",
    def: "A now incorrect and defunct historical term. Baronies were feudal until 28 November 2004, when the feudal system was abolished along with all feudal aspects; extant baronies continue as personal, non-territorial dignities, so a living barony is no longer “feudal”. The precise term for the historic character is “quondam” (formerly) feudal barony.",
  },
  {
    term: "Quondam feudal barony",
    def: "A barony that was feudal before 28 November 2004. “Quondam” means “formerly”; the phrase (Lord Lyon Sellar, 2009) marks that a barony's feudal character is now historical, the living dignity personal and non-territorial.",
  },
  {
    term: "Scottish barony",
    def: "A dignity which can be baron or lord or earl in the Baronage of Scotland — a title of nobility ranking below the peerage. Historically attached to land held of the Crown, it has, since the 2004 reform, been a personal, non-territorial dignity. Its holder is a baron, or “minor baron” — noble, but not a peer.",
  },
  {
    term: "Minor baron",
    def: "A holder of a Scottish barony — a member of Scotland's titled nobility ranking below the peerage. The term used by the Court of the Lord Lyon to distinguish these barons from barons of the peerage.",
    note: (
      <>
        See also{" "}
        <Link href="/reading-room/innes-of-learney-1945/" className={intLink}>
          The Lord Lyon’s Case for the Baronage
        </Link>
        .
      </>
    ),
  },
  {
    term: "Barones majores / minores",
    def: "Greater and lesser barons. The greater barons became the peerage; the lesser — the “small barons” of the Acts — are the Baronage of Scotland. Under the robes Act of 1455 minor barons (who were always members of parliament but later not obligated to attend) and Lords of Parliament were not told apart by dress: Barons and Lords of Parliament both wore the same red mantle, open at the front and lined with silk or furred with grey. The higher ranks were marked apart by mantles of their own — the earls, under the same Act, in ‘grained’ brown furred with white, and in later usage dukes, marquesses and earls graded by the rows of ermine on their robes. In 1567 Parliament declared the barons “a part of the nobility”. Craig: “Dukes, marquesses, and earls are all comprehended among the barons, and originally they were all known under the latter description.”",
    note: (
      <>
        <a href="https://www.rps.ac.uk/trans/1455/8/12" target="_blank" rel="noopener noreferrer" className={extLink}>
          RPS 1455/8/12
        </a>{" "}
        (robes);{" "}
        <a href="https://www.rps.ac.uk/trans/1567/12/45" target="_blank" rel="noopener noreferrer" className={extLink}>
          RPS 1567/12/45
        </a>{" "}
        (“a part of the nobility”); Craig, <em>Jus Feudale</em>, I.12.15; Innes of Learney,{" "}
        <a
          href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>PSAS</em> 79
        </a>
        , pp. 124–148 (the robes).
      </>
    ),
  },
  {
    term: "Constitutional baron",
    def: "A baron by the law and constitution of Scotland: the barons formed an estate of Parliament (Act of 1567: “the barons of this realm ought to have vote in Parliament as a part of the nobility”), and were recognised by Crown, Parliament and the Lyon Court by the style “Baron of X”. The Esslemont Memorial of 1934, upheld by Lord Lyon Grant and printed by Innes of Learney in 1945, called them “truly constitutional barons”, as against barons created by patent under the English peerage and the “much inferior baronages of the Continent”.",
    note: (
      <>
        See{" "}
        <Link href="/reading-room/esslemont-petition-1934/" className={intLink}>
          The Esslemont petition of 1934
        </Link>{" "}
        and{" "}
        <Link href="/reading-room/innes-of-learney-1945/" className={intLink}>
          Innes of Learney, 1945
        </Link>
        .
      </>
    ),
  },
  {
    term: "Laird",
    def: "The Scots word for lord: a description and courtesy, not a title, like “landlord” or “lord of the manor” in England. It is a catch-all term — the neighbours call you laird whether you are a baron or not. In medieval England, likewise, every master of an estate was called a lord; the distinction developed differently in Scotland, with Lord being a word for a titled noble which were predominantly peers but also crown chartered lords without a greater title (a minor baron holding the higher rank of lord in the baronage of Scotland). Lairds if they hold a coat of arms but are not barons are untitled nobility (gentry in the English sense).",
    note: (
      <>
        See{" "}
        <Link href="/reading-room/lairds-lords-and-barons/" className={intLink}>
          Lairds, lords and barons
        </Link>{" "}
        in the Reading Room.
      </>
    ),
  },
  {
    term: "Freeholder",
    def: "A vassal holding land directly of the Crown without a grant in free barony. Freeholders and small barons were excused attendance at Parliament together in 1428. Until then both owed suit and presence in Parliament as members and were liable to fines for absence, so for the minor barons — who bore the burden and expense of travelling to wherever Parliament sat — the Act came as a relief rather than a loss. From 1587 they voted together for shire commissioners (on forty shillings of land held of the king). But “Freeholders were not Barons and everybody recognised that”; heraldically they had no baronial insignia.",
    note: (
      <>
        <a href="https://www.rps.ac.uk/trans/1428/3/3" target="_blank" rel="noopener noreferrer" className={extLink}>
          RPS 1428/3/3
        </a>
        ;{" "}
        <a href="https://www.rps.ac.uk/trans/1587/7/143" target="_blank" rel="noopener noreferrer" className={extLink}>
          RPS 1587/7/143
        </a>
        ; Innes of Learney,{" "}
        <a
          href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>PSAS</em> 79
        </a>
        , p. 137 n. 1.
      </>
    ),
  },
  {
    term: "Incorporeal hereditament",
    def: "An intangible heritable right that may be held and inherited without attaching to land. Since 2004 a Scottish barony exists as such a dignity, independent of any estate.",
  },
  {
    term: "Caput",
    def: "The head place of a barony — its principal seat or centre, from which the barony took its name and, historically, where the baron's court was held.",
  },
  {
    term: "Peerage",
    def: "The highest grade of the British nobility. In Scotland its ranks, in ascending order, are Lord of Parliament, Viscount, Earl, Marquess and Duke in the peerage of Scotland. A peerage stands in law whether or not its holder is enrolled, and historically carried a seat in Parliament. It ranks above, and is distinct from, a barony in the Baronage of Scotland. In sixteenth-century usage the Peerage was, in Innes of Learney’s words, what “on English terminology got loosely called ‘the Nobility’”, while Parliament in 1567 acknowledged the Baronage as “a part of the nobility”; the Lyon King of Arms Acts of 1592 and 1672 use “noblemen” in that narrower sense, so “noblemen, barons and gentlemen” means peers, barons and gentlemen (PSAS 79, p. 136).",
    note: (
      <>
        See also{" "}
        <Link href="/reading-room/innes-of-learney-1945/" className={intLink}>
          The Lord Lyon’s Case for the Baronage
        </Link>
        .
      </>
    ),
  },
  {
    term: "Lord of Parliament",
    def: "The lowest rank of the Scottish peerage, below Viscount, Earl, Marquess and Duke in the peerage of Scotland — the Scottish equivalent of an English peerage baron, and a higher dignity than a (minor) baron. Lords of Parliament arose in the mid-15th century from among the greater barons — territorial dignities at that stage, the term “peerage” itself settling into use only closer to the Union of 1707. The lesser barons (minor barons) also sat among the nobility in Parliament in their own right: from 1428 they were relieved of the obligation to attend in person, due to the expense and burdens of travel, and an Act of 1587 allowed them to be represented by elected commissioners for the shires, though minor barons retained the legal right to attend in person — which continued until the Union of 1707.",
  },
  {
    term: "Baronetcy",
    def: "A hereditary knighthood ranking below the peerage and above a knighthood. A baronet is styled “Sir” (or “Dame”), and the dignity passes to heirs — unlike a knighthood, which is personal.",
  },
  {
    term: "Knighthood",
    def: "A personal, non-hereditary honour conferring the style “Sir” (or “Dame”). Unlike a peerage, a barony or a baronetcy, it does not pass to the holder's heirs.",
  },
  {
    // owner 2026-10-18: "Esquire also needs to be added to Glossary", then: "needs a better definition between Esquire
    // and gentlemen". By the sources it is the gentleman who lives without labour; an esquire is made by lineage, royal grant or office (owner: "it's linked to lineage, royal grant, or office").
    term: "Esquire",
    def: "The rank between the knights and the plain gentlemen. Not a title (esquires and gentlemen were “only names of worship”), nor a matter of land: “it is not an estate, however large, that confers this rank” (Blackstone, 1765). It is linked to lineage (the eldest sons of knights, the younger sons of peers), royal grant or office (such as justice of the peace).",
    note: (
      <>
        Blackstone, <em>Commentaries on the Laws of England</em>, vol. I (1765),{" "}
        <a href="https://avalon.law.yale.edu/18th_century/blackstone_bk1ch12.asp" target="_blank" rel="noopener noreferrer" className={extLink}>
          pp. 393–394
        </a>
        , following Camden: the eldest sons of knights and the younger sons of peers, with their eldest sons
        after them; esquires made by the king’s letters patent; and those who hold an office of trust under the Crown. Sir
        Thomas Smith, <em>De Republica Anglorum</em> (1583), ch. 19,{" "}
        <a href="https://archive.org/details/derepublicaanglo00smituoft/page/37/mode/1up" target="_blank" rel="noopener noreferrer" className={extLink}>
          p. 37
        </a>{" "}
        (esquires are those of the gentlemen who bear arms, the marks of their family). In Scotland the barons rank “after
        Knights and before Esquires” (Innes of Learney,{" "}
        <a href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/" target="_blank" rel="noopener noreferrer" className={extLink}>
          <em>PSAS</em> 79, p. 113
        </a>
        ), and an esquire who bears arms is of the untitled nobility: see <a href="#term-nobility-clause" className={intLink}>Nobility clause</a>.
      </>
    ),
  },
  {
    // owner 2026-10-18: the difference between esquire and gentleman
    term: "Gentleman",
    def: "The rank below the esquire. In England, wrote Sir Thomas Smith (1583), whoever “can live idly, and without manual labour” and keeps up the state of a gentleman “shall be taken for a gentleman”; in law, as Coke put it, a gentleman is one “who bears coat armour” (Blackstone, 1765). In Scotland a gentleman who bears arms is of the untitled nobility.",
    note: (
      <>
        Smith, <em>De Republica Anglorum</em> (1583), ch. 20,{" "}
        <a href="https://archive.org/details/derepublicaanglo00smituoft/page/39/mode/1up" target="_blank" rel="noopener noreferrer" className={extLink}>
          pp. 39–40
        </a>
        , as quoted by Blackstone, <em>Commentaries</em>, vol. I (1765),{" "}
        <a href="https://avalon.law.yale.edu/18th_century/blackstone_bk1ch12.asp" target="_blank" rel="noopener noreferrer" className={extLink}>
          pp. 393–394
        </a>
        , with Coke’s definition. In Scotland: see <a href="#term-nobility-clause" className={intLink}>Nobility clause</a>.
      </>
    ),
  },
  {
    // owner 2026-10-18: "I guess you better also add Chief to glossary" (the table's "Esquires/Chiefs/Lairds")
    term: "Chief",
    def: "The head of a clan or family. Since at least the 16th century a chief has had to be entitled to bear the undifferenced arms of the clan or family, and so be “Chief of the Name and Arms”; it is for the Lord Lyon to decide who has succeeded. A chief so recognised “is chief of all who bear the name of the clan or family”, not only of the members of a clan society.",
    note: (
      <>
        Court of the Lord Lyon,{" "}
        <a href="https://www.courtofthelordlyon.scot/index_htm_files/SuccessionofChiefsGuidanceNote.pdf" target="_blank" rel="noopener noreferrer" className={extLink}>
          Guidance Note, “Chiefs of Clans and Families”, 16 December 2021
        </a>
        , paras 5 and 7. A chief who bears arms is of the untitled nobility: see <a href="#term-nobility-clause" className={intLink}>Nobility clause</a>.
      </>
    ),
  },
  {
    term: "Register of Sasines",
    def: "Scotland's public register of land deeds. After the Conveyancing (Scotland) Act 1874 the transfer of a barony was recorded here; since 2004, baronies are recorded in the separate Scottish Barony Register.",
  },
  {
    term: "Territorial designation (TD)",
    def: "A “Surname of Place” designation — such as “Kerr of Ardgowan” — that forms part of a person's name. It must be authorised by the Court of the Lord Lyon and generally requires ownership of a substantial estate. It is not a title of nobility or dignity, and is separate from a barony, although certainly untitled nobility; a person may hold either, both, or neither. The custom is distinctly Scottish and does not apply to the rest of the British Isles.",
    note: (
      <>
        For the evidence that Scotland’s barons were styled by both title and designation, see{" "}
        <Link href="/reading-room/the-two-styles-of-a-scottish-baron/" className={intLink}>
          Baron of X, or X of Y?
        </Link>
        .
      </>
    ),
  },
  {
    term: "Of that Ilk",
    def: "A form of territorial designation used where a family's surname and its lands share the same name — “Borthwick of that Ilk” means “Borthwick of Borthwick”. The two forms are interchangeable.",
  },
  {
    term: "Representer (of a House)",
    def: "The person recognised by the Lord Lyon as head of a family — normally the heir of line — and so entitled to its undifferenced arms. “Representer of the Baronial House of X” in Lyon Court Letters Patent denotes the head of a family that formerly held the barony of X — in plain terms, a former baron’s house — and not the present holder of the barony, which may have passed with the land to another owner (as in the 2001 matriculation for Kincaid of Kincaid). Innes of Learney, who writes “Representative” (“Representer” is the Lyon Court’s later Scots form), held that such representers remain barons in the Continental sense — of baronial race, equivalent to the Continental baronial houses — though not barons in Scots law, the barony having passed with the land: “such chapeau, once it is matriculated, descends to the ‘heir and representative’ of such ‘baronial race’—who in the Continental sense is of course a ‘Baron’.” He distinguished “heir male” from “representative”, it being from the latter character that the baronial additaments descend.",
    note: (
      <>
        Innes of Learney,{" "}
        <a
          href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>PSAS</em> 79
        </a>
        , p. 155 (quoted); p. 154 n. 1 (“‘Heir Male’ is in such terminology a distinct term from ‘Representative’,
        and it is from the latter character … that baronial exterior additaments descend”); p. 156 (“incorporeally
        Baronial as the Representatives of Baronial Houses”); p. 142 n. 4. Lord Lyon Sellar,{" "}
        <a
          href="https://courtofthelordlyon.scot/index_htm_files/craigend.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Note in <em>Smith of Craigend</em>
        </a>
        .
      </>
    ),
  },
  {
    term: "For aught yet seen",
    def: "Lyon Court usage for “on the evidence so far”. A recognition “for aught yet seen” is provisional: it stands unless better evidence displaces it. Used since 2009 for barony ownership proved by an entry in the Scottish Barony Register with the Custodian’s report.",
    note: (
      <>
        Lord Lyon Sellar, Note in the petition of Lindley-Highfield of Ballumbie Castle, Baron of Cartsburn (1 December
        2009), reproduced in Donald Draper Campbell,{" "}
        <a
          href="https://www.ccsna.org/sites/default/files/upload/2019-02/Scottish-Armory-and-Heraldry-by-Donald-Draper-Campbell-Esq-2019-01-12.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Scottish Armory and Heraldry
        </a>{" "}
        (2019), p. 82; Lord Lyon Sellar,{" "}
        <a
          href="https://courtofthelordlyon.scot/index_htm_files/craigend.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Note in <em>Smith of Craigend</em>
        </a>
        ; Lord Lyon Morrow,{" "}
        <a
          href="https://courtofthelordlyon.scot/index_htm_files/Menking.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Note in the petition of Menking
        </a>{" "}
        (2015), para 5.
      </>
    ),
  },
  {
    term: "Of the genus of barony",
    def: "Lord Lyon Morrow’s formula (Menking, 2015) for former feudal lordships, regalities and earldoms: dignities of the same kind as a barony, whose holders receive a baron’s additaments and are recorded as holding the lordship or earldom.",
    note: (
      <>
        Lord Lyon Morrow,{" "}
        <a
          href="https://courtofthelordlyon.scot/index_htm_files/Menking.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Note in the petition of Menking
        </a>{" "}
        (30 April 2015), paras 9–20, 28–35.
      </>
    ),
  },
  {
    term: "Additaments",
    def: "“Symbols signifying a particular rank” added to a coat of arms (Court of Session, 2019): for barons, the baronial helm; formerly also the chapeau, the feudo-baronial mantle and, for pre-1587 baronial houses, supporters — only for baronies held since then continuously in the same family.",
    note: (
      <>
        <a
          href="https://freiherrvonquast.wordpress.com/wp-content/uploads/2020/06/margaret-hamilton-of-rockhall-v-lord-lyon-king-of-arms-2019-csoh-85-case.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>Hamilton of Rockhall v Lord Lyon</em> [2019] CSOH 85
        </a>
        ; Innes of Learney,{" "}
        <a
          href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>PSAS</em> 79
        </a>
        , pp. 148–157 (the chapeau); Lord Lyon Sellar’s guidance of 5 January 2010, reproduced in Campbell,{" "}
        <a
          href="https://www.ccsna.org/sites/default/files/upload/2019-02/Scottish-Armory-and-Heraldry-by-Donald-Draper-Campbell-Esq-2019-01-12.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Scottish Armory and Heraldry
        </a>{" "}
        (2019), p. 83; on supporters,{" "}
        <a
          href="https://www.casemine.com/judgement/uk/5a8ff80a60d03e7f57eb874d"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>Sundry Barons, &amp;c. v The Lord Lyon</em>
        </a>{" "}
        (Court of Session, 31 May 1673).
      </>
    ),
  },
  {
    term: "Nobility clause",
    def: "The closing clause of older Lyon Court grants and declarations that the grantee is to be “taken, and received amongst all Nobles and in all places of Honour as Nobles in the Noblesse of Scotland” — the words of the Wauchope of Niddrie declaration of 19 April 1945. A nobility clause was present in Lord Lyon Blair’s grant to the Baron of Ballencrieff (2007); it has been omitted from all Letters Patent for grants made since: for every petitioner, peers included, not for barons alone. According to Innes of Learney: “A [Scottish] coat of arms is the outward indication of [untitled or titled] nobility and arms are officially described as ‘Ensigns of Nobility’. A patent of arms is . . . a Diploma of Nobility. . . .” Clarifying this statement, a later writer on Scottish heraldry has noted: “Technically, a grant of arms from the Lord Lyon is a patent of nobility; the grantee is thereby ‘enrolled with all nobles in the noblesse of Scotland’. This does not constitute a peerage or any title. It is a social distinction, untitled nobility, and has no legal privileges.”",
    note: (
      <>
        Court of the Lord Lyon (Lord Lyon Sir Francis Grant), 19 April 1945, Lyon Register vol. xxxv p. 31; printed in
        Innes of Learney,{" "}
        <a
          href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>PSAS</em> 79
        </a>
        , p. 160 (the words quoted);{" "}
        <a
          href="https://freiherrvonquast.wordpress.com/wp-content/uploads/2020/06/margaret-hamilton-of-rockhall-v-lord-lyon-king-of-arms-2019-csoh-85-case.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>Hamilton of Rockhall v Lord Lyon</em> [2019] CSOH 85
        </a>
        , para [21] (the Ballencrieff grant of 2007; omitted since).
      </>
    ),
  },
  {
    term: "Comes · Dominus · Baro",
    def: "The Latin rank-words of the sheriff-court rolls — Earl of, Lord of, Baron of — entered as titles (“Intrat A, Baro de B”), corresponding to lands held in free earldom, free lordship and free barony. A “Dominus de X” need not be a Lord of Parliament, but a minor baron holding the higher rank of lord in the baronage of Scotland — interchangeably known as Lord X, Lord of X or Laird of X.",
    note: (
      <>
        Innes of Learney,{" "}
        <a
          href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>PSAS</em> 79
        </a>
        , pp. 157–158;{" "}
        <a
          href="https://archive.org/details/inquiryintoorigi00bortuoft/"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Borthwick, <em>An Inquiry into the Origin and Limitations of the Feudal Dignities of Scotland</em> (1775)
        </a>
        , p. 13.
      </>
    ),
  },
  {
    term: "Hoch-adel",
    def: "The Continental “high nobility” — houses of baronial rank and above, as opposed to the untitled gentry. Lyon Court declarations of 1938–45 (Chisholm; Wauchope of Niddrie) found Scottish barons “of rank equivalent to that denominated Hoch Adel, and equivalent to the Chiefs of Baronial Houses, upon the Continent of Europe”.",
    note: (
      <>
        Court of the Lord Lyon (Lord Lyon Sir Francis Grant), 19 April 1945, Lyon Register vol. xxxv p. 31; printed in
        Innes of Learney,{" "}
        <a
          href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>PSAS</em> 79
        </a>
        , p. 160 and n. 6.
      </>
    ),
  },
];
