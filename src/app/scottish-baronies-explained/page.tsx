import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ButtonLink, Container, GoldRule, Section } from "@/components/primitives";
import { Footnote } from "@/components/Footnote";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Scottish Baronies, Explained — FAQ",
  description:
    "Is “Scottish feudal barony” still the correct term? No — since the Abolition of Feudal Tenure etc. (Scotland) Act 2000 came into force in 2004, Scottish baronies are personal, non-territorial dignities. An evidence-based FAQ on the Baronage of Scotland, with primary sources.",
  keywords: [
    "Scottish feudal barony",
    "Scottish barony",
    "Baronage of Scotland",
    "feudal baron",
    "quondam feudal barony",
    "Abolition of Feudal Tenure Act 2000",
    "Scottish barony title",
    "Lord of Parliament",
    "Lordship of the Manor",
  ],
  alternates: { canonical: "/scottish-baronies-explained/" },
  openGraph: {
    type: "article",
    title: "Scottish Baronies, Explained",
    description:
      "Distinct from peerages, altered fundamentally by legislation in 2004, and often described with out-of-date terminology. What the law and the institutional sources actually say.",
    url: "/scottish-baronies-explained/",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Scottish Baronies, Explained — the Baronage of Scotland Association",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scottish Baronies, Explained",
    description:
      "Since the 2004 reform, Scottish baronies are personal, non-territorial dignities. An evidence-based FAQ with primary sources.",
    images: ["/og.jpg"],
  },
};

/** Freshness signals — bump DATE_MODIFIED (and REVIEWED_LABEL) whenever the
 * answers change; both the visible "last reviewed" line and the schema.org
 * dateModified read from here, so they cannot drift. */
const DATE_PUBLISHED = "2026-07-02";
const DATE_MODIFIED = "2026-09-11";
const REVIEWED_LABEL = "September 2026";

const PAGE_URL = `${SITE_URL}/scottish-baronies-explained/`;

/** One source of truth for the URL-fragment ids: the table of contents and the
 * per-question <article id> both derive from this, so anchors always match. */
const slugify = (q: string) =>
  q
    .toLowerCase()
    .replace(/[“”"?]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const extLink =
  "text-gold-deep underline decoration-gold/40 underline-offset-2 transition-colors hover:text-oxblood";
const intLink =
  "text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:text-oxblood-deep";

/** One source of truth for questions & answers: the visible page and the
 * FAQPage JSON-LD are both generated from this array, so they cannot drift. */
const faqs: { q: string; a: string; body: ReactNode; authority: ReactNode }[] = [
  {
    q: "Is a Scottish baron a nobleman?",
    a: "Yes. Historically, barons were untitled nobility as baron was a description not a title, the first hereditary titles were lords and earls. Whether “baron” was a name of dignity or only a description of a man’s tenure was argued for centuries: Mackenzie records in 1680 that the old barons, “especially where they are Chiefs of Clans”, refused to yield precedence to baronets although “the other pretend that a Baron is no Name of Dignity”. The 1672 Act let only peers and bishops sign by their titles; barons signed by name, “of” their lands. In 1943 the Court of the Lord Lyon found and declared that the minor barons are a “titled nobility”, and that finding has governed the nobiliary court since. The record on the side of “title” is long: a document of 1382 states that Baronia est nomen dignitatis et importat judicaturam — barony is a name of dignity and imports jurisdiction; the Crown charter of 1590 erecting Spynie into a free barony conferred the “title, honour, rank and status of a free baron”; the sheriff-court suit-rolls entered a baron as “A, Baro de B” exactly as an earl was entered “A, Comes de B”; Mary Queen of Scots wrote to “Our traist friend the barroun of Kylrawak”; and Lord Lyon Erskine of Cambo signed himself “Baro de Cambo”. Against it stood Mackenzie’s “other” party, the subscription clause of the 1672 Act, and J. H. Stevenson (1896, 1927), for whom “the mere territorial baron has no title of dignity appropriated to him”. Today, a holder of a barony within the Baronage of Scotland is a member of Scotland's titled nobility, though not a peer. The Scottish equivalent of an English peerage baron is the higher title Lord of Parliament (the lowest rank of the Scottish Peerage, which ranks in order of Lord of Parliament, Viscount, Earl, Marquis, Duke); a Scottish baron is noble but sits below the peerage. The prefix “The Much Honoured” is the honorific traditionally used to distinguish a Scottish baron from a peer. Scotland followed France and much of continental Europe, recognising both peerage and non-peerage titled nobility — the Scottish baron belongs to the latter, which is why a barony can be a genuine title of nobility without being a peerage. Baronies were affirmed in Lord Clyde’s 1992 dictum as heritable titles of honour.",
    body: (
      <>
        <p>
          Yes. Historically, barons were untitled nobility as baron was a description not a title, the first
          hereditary titles were lords and earls. Whether “baron” was a name of dignity or only a description of a
          man’s tenure was argued for
          centuries: Mackenzie records in 1680 that the old barons, “especially where they are Chiefs of Clans”,
          refused to yield precedence to baronets although “the other pretend that a Baron is no Name of Dignity”.
          The 1672 Act let only peers and bishops sign by their titles; barons signed by name, “of” their lands. In
          1943 the Court of the Lord Lyon found and declared that the minor barons are a{" "}
          <strong className="font-semibold text-navy">“titled nobility”</strong>, and that finding has governed the
          nobiliary court since (see{" "}
          <Link href="/reading-room/innes-of-learney-1945/" className={intLink}>
            The Lord Lyon’s Case for the Baronage
          </Link>
          ).
        </p>
        <figure className="mt-6 border-l-2 border-gold/60 bg-parchment-50 px-6 py-5">
          <blockquote className="font-serif text-2xl italic leading-snug text-navy sm:text-3xl">
            “…such Feus as had a Jurisdiction annext to them, <strong className="font-semibold">a Barony, as we call
            it, do ennoble</strong>; for Baronies are establisht only by the Prince’s Erection or Confirmation.”
          </blockquote>
          <figcaption className="mt-3 font-sans text-xs uppercase tracking-[0.16em] text-muted">
            Sir George Mackenzie, Lord Advocate —{" "}
            <a
              href="https://archive.org/details/bim_eighteenth-century_the-works-of-that-eminen_mackenzie-george-sir_1716_2"
              target="_blank"
              rel="noopener noreferrer"
              className={extLink}
            >
              The Science of Herauldry (1680)
            </a>
          </figcaption>
        </figure>
        <p className="mt-4">
          The record on the side of “title” is long. A document of 1382 states that{" "}
          <em>Baronia est nomen dignitatis et importat judicaturam</em> — barony is a name of dignity and imports
          jurisdiction. The Crown charter of 1590 erecting Spynie into a free barony conferred the “title, honour,
          rank and status of a free baron”. The sheriff-court suit-rolls entered a baron as “A, <em>Baro de</em> B”
          exactly as an earl was entered “A, <em>Comes de</em> B”. Mary Queen of Scots wrote to “Our traist friend
          the barroun of Kylrawak”, and Lord Lyon Erskine of Cambo signed himself “<em>Baro de Cambo</em>”. Against
          it stood Mackenzie’s “other” party, the subscription clause of the 1672 Act, and J. H. Stevenson (1896,
          1927), for whom “the mere territorial baron has no title of dignity appropriated to him”.
        </p>
        <p className="mt-4">
          Today, a holder of a barony within the Baronage of Scotland is a member of Scotland’s{" "}
          <strong className="font-semibold text-navy">titled nobility</strong>, though not a peer. The distinction
          matters: the Scottish equivalent of an English peerage baron is the higher title{" "}
          <strong className="font-semibold text-navy">Lord of Parliament</strong> (the lowest rank of the Scottish
          Peerage, which ranks in order of Lord of Parliament, Viscount, Earl, Marquis, Duke). A Scottish baron is
          noble but sits
          below the peerage. The prefix{" "}
          <strong className="font-semibold text-navy">“The Much Honoured”</strong> is the honorific traditionally
          used to distinguish a Scottish baron from a peer.
        </p>
        <p className="mt-4">
          Scotland followed France and much of continental Europe, recognising{" "}
          <strong className="font-semibold text-navy">both peerage and non-peerage titled nobility</strong> — the
          Scottish baron belongs to the latter. Scots nobiliary practice followed continental custom in this, which
          is why a barony can be a genuine title of nobility without being a peerage. Baronies were affirmed in Lord Clyde’s 1992
          dictum as heritable <strong className="font-semibold text-navy">titles of honour</strong>.
        </p>
      </>
    ),
    authority: (
      <>
        Court of the Lord Lyon, interlocutor of 26 February 1943 (Lord Lyon Sir Francis Grant) in a petition for a
        birthbrief, recorded in the Public Register of All Genealogies and Birthbrieves, vol. iv, p. 26; printed in
        Innes of Learney,{" "}
        <a
          href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>PSAS</em> vol. 79 (1944–45), p. 143 n. 3
        </a>
        : <em>“the Minor Barons of Scotland are, and have been both in this nobiliary Court and in the Court of
        Session recognised as a ‘titled nobility’…”</em> Lord Lyon David Sellar, 2010 [Ref: 57 Lindberg Ptr, Lyon
        Court]:{" "}
        <em>
          “the dignity of baron has a noble character in that it is a right which historically originated in a Crown
          grant.”
        </em>{" "}
        <em>Spencer-Thomas of Buquhollie v Newell</em> (1992),{" "}
        <a
          href="https://archive.org/details/1992-lord-clydes-dictum"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Lord Clyde’s dictum
        </a>
        : <em>“a barony falls into the class of noble as opposed to ignoble feus… It was at the earliest a territorial
        dignity as distinct from the later personal peerage.”</em> Sir Robert Douglas,{" "}
        <em>The Baronage of Scotland</em> (1798), p. 1, a foundational text on Scottish nobility:{" "}
        <em>
          “There is no nation in Europe where the Gentry, or lesser Barons and Freeholders, enjoyed so much liberty,
          or had such extensive privileges as those of Scotland.”
        </em>{" "}
        On the history of the word:{" "}
        <a
          href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Innes of Learney, “The Robes of the Feudal Baronage of Scotland”, <em>PSAS</em> 79 (1944–45), pp. 113
          (Spynie), 142, 144, 157–161 (suit-rolls, Kilravock, Cambo)
        </a>
        ;{" "}
        <a
          href="https://archive.org/details/bim_eighteenth-century_the-works-of-that-eminen_mackenzie-george-sir_1716_2"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Sir George Mackenzie, <em>Works</em> vol. ii (<em>Science of Herauldry</em>, 1680), pp. 549–550
        </a>
        ;{" "}
        <a href="https://www.rps.ac.uk/trans/1672/6/57" target="_blank" rel="noopener noreferrer" className={extLink}>
          RPS 1672/6/57 (Lyon King at Arms Act, subscription clause)
        </a>
        ;{" "}
        <a
          href="https://courtofthelordlyon.scot/index_htm_files/ARRAN.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Lord Lyon Sellar, Note in <em>Sturzenegger of Arran</em>, p. 8 (Stevenson)
        </a>
        .
      </>
    ),
  },
  {
    q: "Are Scottish barony titles legitimate, or a scam?",
    a: "They are legitimate. A Scottish barony is a genuine dignity and honour recognised in Scots law: the barons of Scotland were affirmed as a “titled nobility” by the Court of the Lord Lyon in 1943 and by the Court of Session, and section 63 of the Abolition of Feudal Tenure etc. (Scotland) Act 2000 expressly preserved the dignity of baron when the feudal system was abolished. What is not a title is a “souvenir plot” — a novelty square of Scottish land sold online with a “Lord” or “Laird” label. Owning one confers no title and no nobility; the Court of the Lord Lyon states that a souvenir plot is not even sufficient to petition for a grant of arms. Nearly every “Scottish title scam” story concerns these souvenir schemes, not genuine baronies, which are an entirely different thing.",
    body: (
      <>
        <p>
          <strong className="font-semibold text-navy">They are legitimate.</strong> A Scottish barony is a genuine
          dignity and honour recognised in Scots law: the barons of Scotland were affirmed as a{" "}
          <strong className="font-semibold text-navy">“titled nobility”</strong> by the Court of the Lord Lyon in 1943
          and by the Court of Session, and{" "}
          <a
            href="https://www.legislation.gov.uk/asp/2000/5/section/63"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            section 63 of the Abolition of Feudal Tenure etc. (Scotland) Act 2000
          </a>{" "}
          expressly preserved the dignity of baron when the feudal system was abolished.
        </p>
        <p className="mt-4">
          What is <strong className="font-semibold text-navy">not</strong> a title is a{" "}
          <strong className="font-semibold text-navy">“souvenir plot”</strong> — a novelty square of Scottish land
          sold online with a “Lord” or “Laird” label. Owning one confers no title and no nobility; the Court of the
          Lord Lyon states that a souvenir plot is not even sufficient to petition for a grant of arms. Nearly every{" "}
          <em>“Scottish title scam”</em> story concerns these souvenir schemes — not genuine baronies, which are an
          entirely different thing (see{" "}
          <a href="#can-you-buy-a-lord-or-laird-title-in-scotland" className={intLink}>
            Can you buy a “Lord” or “Laird” title in Scotland?
          </a>
          ).
        </p>
      </>
    ),
    authority: (
      <>
        Court of the Lord Lyon, interlocutor of 26 February 1943 (Lord Lyon Sir Francis Grant), Public Register of All
        Genealogies and Birthbrieves, vol. iv, p. 26, printed in{" "}
        <a
          href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Innes of Learney, <em>PSAS</em> 79, p. 143 n. 3
        </a>
        , and{" "}
        <em>Spencer-Thomas of Buquhollie v Newell</em> (Court of Session) — recognition as a “titled nobility”;{" "}
        <a
          href="https://www.legislation.gov.uk/asp/2000/5/section/63"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Abolition of Feudal Tenure etc. (Scotland) Act 2000, s.63
        </a>{" "}
        — preservation of the dignity. On souvenir plots:{" "}
        <a
          href="https://web.archive.org/web/20120728090955/http://www.lyon-court.com/lordlyon/776.html"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Court of the Lord Lyon, “Lairds”
        </a>
        .
      </>
    ),
  },
  {
    q: "Are Scottish baronies recognised in law?",
    a: "Yes — by statute. When the feudal system was abolished, the dignity of baron was expressly preserved: section 63 of the Abolition of Feudal Tenure etc. (Scotland) Act 2000 provides that nothing in the Act affects the dignity of baron. The Explanatory Notes to the Act confirm that the dignity survives as a personal, non-territorial “floating” dignity, no longer attached to land. A Scottish barony is therefore a recognised dignity in Scots law, held independently of any estate. Section 63(4) adds that “dignity” includes any quality or precedence associated with, and any heraldic privilege incidental to, a dignity — the statutory hook on which the Court of the Lord Lyon continues to treat ownership of a barony as bringing a petitioner within its jurisdiction (Menking, 2015, paras 6–8).",
    body: (
      <>
        <p>
          <strong className="font-semibold text-navy">Yes — by statute.</strong> When the feudal system was abolished,
          the dignity of baron was expressly preserved:{" "}
          <a
            href="https://www.legislation.gov.uk/asp/2000/5/section/63"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            section 63 of the Abolition of Feudal Tenure etc. (Scotland) Act 2000
          </a>{" "}
          provides that <em>nothing in the Act affects the dignity of baron</em>.
        </p>
        <p className="mt-4">
          The{" "}
          <a
            href="https://www.legislation.gov.uk/asp/2000/5/notes"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            Explanatory Notes
          </a>{" "}
          to the Act confirm that the dignity survives as a{" "}
          <strong className="font-semibold text-navy">personal, non-territorial “floating” dignity</strong>, no longer
          attached to land. A Scottish barony is therefore a recognised dignity in Scots law, held independently of any
          estate.
        </p>
        <p className="mt-4">
          Subsection (4) goes further than the bare word. It provides that{" "}
          <a
            href="https://www.legislation.gov.uk/asp/2000/5/section/63"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            <em>“‘dignity’ includes any quality or precedence associated with, and any heraldic privilege incidental to,
            a dignity”</em>
          </a>
          . That is the statutory hook on which the Court of the Lord Lyon continues to treat ownership of a barony as
          bringing a petitioner within its jurisdiction (Lord Lyon Morrow, Note in the petition of Menking, 30 April
          2015, paras 6–8).
        </p>
      </>
    ),
    authority: (
      <>
        <a
          href="https://www.legislation.gov.uk/asp/2000/5/section/63"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Abolition of Feudal Tenure etc. (Scotland) Act 2000, s.63
        </a>{" "}
        and its{" "}
        <a
          href="https://www.legislation.gov.uk/asp/2000/5/notes"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Explanatory Notes
        </a>{" "}
        — legislation.gov.uk. Section 63(4): <em>“‘dignity’ includes any quality or precedence associated with, and any
        heraldic privilege incidental to, a dignity”</em>. Lord Lyon Morrow,{" "}
        <a
          href="https://courtofthelordlyon.scot/index_htm_files/Menking.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Note in the petition of Menking
        </a>{" "}
        (30 April 2015), paras 6–8 — ownership of a barony brings the petitioner within the jurisdiction of the Lord
        Lyon.
      </>
    ),
  },
  {
    q: "Is “Scottish feudal barony” or “feudal baron” or “feudal title” the correct term today?",
    a: "No longer. Until 2004 these were properly called feudal baronies, because the dignity was attached to land held of the Crown. The Abolition of Feudal Tenure etc. (Scotland) Act 2000, in force 28 November 2004, ended the feudal system and severed the dignity from the land. Extant baronies were expressly preserved as personal, non-territorial dignities — so the feudal aspects and the word “feudal” are now out of date as a descriptor of a living barony. In the words of the Act (s. 63): “an estate held in barony ceases to exist as a feudal estate, the dignity of baron, though retained, shall not attach to the land” — and “nothing in this Act affects the dignity of baron”. In plain terms: this was the abolition of the feudal barony, retaining the dignity of baron — so the “feudal baron” is now incorrect: a defunct historical term with no meaning in law. The term lingers — other organisations can still be found writing “feudal barony” from habit — but legacy usage does not revive a legal category the 2000 Act closed. In law there is no such thing as a feudal baron today: since 28 November 2004 there has been no feudal tenure in Scotland for a barony to be feudal of — the feudal barony itself was extinguished, leaving only the title of baron, without the word “feudal”. The statute, not custom, settles the terminology. Lord Lyon Sellar in 2009 accordingly termed them “quondam feudal baronies” — quondam meaning “formerly”. For the titleholder, baron or lord or earl in the Baronage of Scotland is the correct modern description; collectively, the minor barons of Scotland, the term used by the Court of the Lord Lyon for this rank of the ancient nobility. The Scottish Law Commission’s 1999 report that led to the Act drew the same line: the Scottish Parliament could “abolish feudal baronies altogether” while allowing “the dignity of baron, derived from the former connection with the Crown as feudal superior, to continue as a floating dignity” (p. 24); its discussion paper had mentioned, but rejected, the possibility of allowing the “noble aspects of the barony title” to lapse along with the abolition of the feudal relationship (para. 2.34). The feudal framework was abolished; the noble dignity continues.",
    body: (
      <>
        <p>
          <strong className="font-semibold text-navy">No longer.</strong> Until 2004 these were properly called
          feudal baronies, because the dignity was attached to land held of the Crown. The{" "}
          <em>Abolition of Feudal Tenure etc. (Scotland) Act 2000</em>, which came into force on 28 November 2004,
          ended the feudal system and severed the dignity from the land.
          Extant baronies were expressly preserved, but the feudal aspects and the word <em>“feudal”</em> are now dated
          as a descriptor of a living barony — the titles were retained specifically as{" "}
          <strong className="font-semibold text-navy">personal, non-territorial dignities</strong>. In the words of
          the Act (s. 63): <em>“an estate held in barony ceases to exist as a feudal estate, the dignity of baron,
          though retained, shall not attach to the land”</em> — and{" "}
          <em>“nothing in this Act affects the dignity of baron”</em>. In plain terms: this was the abolition of the
          feudal barony, retaining the dignity of baron — so{" "}
          <strong className="font-semibold text-navy">the “feudal baron” is now incorrect: a defunct historical
          term with no meaning in law</strong>.
        </p>
        <p className="mt-4">
          The term lingers — other organisations can still be found writing <em>“feudal barony”</em> from habit —
          but legacy usage does not revive a legal category the 2000 Act closed. In law{" "}
          <strong className="font-semibold text-navy">there is no such thing as a feudal baron today</strong>: since
          28 November 2004 there has been no feudal tenure in Scotland for a barony to be feudal <em>of</em> — the
          feudal barony itself was extinguished, leaving only the title of baron, without the word <em>“feudal”</em>.
          The statute, not custom, settles the terminology.
        </p>
        <p className="mt-4">
          Lord Lyon Sellar, in 2009, accordingly termed them{" "}
          <strong className="font-semibold text-navy">“quondam feudal baronies”</strong> —{" "}
          <em>quondam</em> meaning “formerly”. The historically precise usage is thus “quondam feudal” for the
          pre-2004 character of a barony, and simply “barony” or “personal dignity” for its present one. For the
          titleholder,{" "}
          <strong className="font-semibold text-navy">baron or lord or earl in the Baronage of Scotland</strong> is
          the correct modern description; collectively, the{" "}
          <strong className="font-semibold text-navy">minor barons</strong> of Scotland, the term used by the Court
          of the Lord Lyon for this rank of the ancient nobility.
        </p>
        <p className="mt-4">
          The Scottish Law Commission’s 1999 report that led to the Act drew the same line: the Scottish Parliament
          could <em>“abolish feudal baronies altogether”</em> while allowing{" "}
          <em>
            “the dignity of baron, derived from the former connection with the Crown as feudal superior, to continue
            as a floating dignity”
          </em>{" "}
          (p. 24); its discussion paper had mentioned, but rejected, the possibility of allowing
          the <em>“noble aspects of the barony title”</em> to lapse along with the abolition of the feudal
          relationship (para. 2.34). The feudal framework was abolished; the noble dignity continues.
        </p>
      </>
    ),
    authority: (
      <>
        <a
          href="https://www.legislation.gov.uk/asp/2000/5/section/63"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Abolition of Feudal Tenure etc. (Scotland) Act 2000, s.63
        </a>{" "}
        — nothing in the Act affects “the dignity of baron or any other dignity or office”; commenced 28 November
        2004. Lord Lyon W. D. H. Sellar (2009), p. 82, quoted in Donald Draper Campbell,{" "}
        <a
          href="https://www.ccsna.org/sites/default/files/upload/2019-02/Scottish-Armory-and-Heraldry-by-Donald-Draper-Campbell-Esq-2019-01-12.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Scottish Armory and Heraldry
        </a>{" "}
        (2019).{" "}
        Scottish Law Commission,{" "}
        <a
          href="https://web.archive.org/web/20251113231036/https://www.scotlawcom.gov.uk/files/1712/8015/2730/26-07-2010_1458_725.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>Report on Abolition of the Feudal System</em>
        </a>{" "}
        (Scot Law Com No 168, 1999), p. 24 and para. 2.34.{" "}
        <a
          href="https://www.legislation.gov.uk/asp/2000/5/notes"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Explanatory Notes
        </a>{" "}
        to the 2000 Act, paras 197–198: <em>“Subsection (1) expressly preserves the dignity of baron”</em>;{" "}
        <em>“the retained dignity of baron will no longer attach to the land. It will be a floating dignity”</em>.
      </>
    ),
  },
  {
    q: "What did the 2004 change actually do?",
    a: "It converted baronies from territorial dignities into personal ones. Before 2004 a barony was tied to a defined estate and its caput (the head place of the barony). After 2004 the dignity floats free of any land: it is an incorporeal dignity, comparable in legal status to a hereditary peerage, baronetcy, or coat of arms, but conferring no right to land.",
    body: (
      <>
        <p>
          It converted baronies from territorial dignities into personal ones. Before 2004 a barony was tied to a
          defined estate and its <em>caput</em> (the head place of the barony). After 2004 the dignity{" "}
          <strong className="font-semibold text-navy">“floats” free of any land</strong>: it is an incorporeal dignity,
          comparable in legal status to a hereditary peerage, baronetcy, or coat of arms, but conferring no right to
          land.
        </p>
      </>
    ),
    authority: (
      <>
        Abolition of Feudal Tenure etc. (Scotland) Act 2000, s.63(2), and its{" "}
        <a
          href="https://www.legislation.gov.uk/asp/2000/5/notes"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Explanatory Notes
        </a>
        , para. 198 — the retained dignity “will be a floating dignity” no longer attaching to land, becoming a
        non-territorial dignity. Scottish Law Commission,{" "}
        <a
          href="https://web.archive.org/web/20251113231036/https://www.scotlawcom.gov.uk/files/1712/8015/2730/26-07-2010_1458_725.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>Report on Abolition of the Feudal System</em>
        </a>{" "}
        (Scot Law Com No 168, 1999).
      </>
    ),
  },
  {
    q: "Can a Scottish barony be bought and sold?",
    a: "Technically, in law, yes: since the 2004 reform baronies are freely transferable dignities and may pass by inheritance, bequest, gift, or assignation. In practice the market is very small — the Scottish Barony Register publishes annual reports of the Custodian, recording a handful of transfers in a typical year, and a recorded transfer is not necessarily a commercial sale, since family assignations and bequests pass through the same register. Baronies generally remain within families across generations. Where sales have occurred the sums indicate scarcity value: the Scottish Law Commission, from 1997 market evidence, estimated a barony of no particular distinction at approximately £60,000, and in 2002 the Barony of MacDonald was reported as offered for sale at more than £1 million.",
    body: (
      <>
        <p>
          This is widely misunderstood in both directions. Technically, in law,{" "}
          <strong className="font-semibold text-navy">yes</strong>: since the 2004 reform baronies are freely
          transferable dignities and may pass by inheritance, bequest, gift, or assignation, with the transferee
          becoming the new holder.
        </p>
        <p className="mt-4 border-l-2 border-gold/50 pl-4 text-[0.95em] italic">
          A note from this site: a growing number of barons wish to reduce the <em>in commercio</em> aspect of baronies. By
          signing{" "}
          <Link href="/pledge" className={intLink}>
            The Pledge
          </Link>{" "}
          they commit their title to hereditary descent — a commitment that shapes the future{" "}
          <strong className="font-semibold not-italic text-navy">recognition</strong> of the barony upon the Roll of
          Scottish Barons, as explained in the next question.
        </p>
        <p className="mt-4">
          In practice, the market is very small. The{" "}
          <a href="https://scottishbaronyregister.org" target="_blank" rel="nofollow noopener noreferrer" className={extLink}>
            Scottish Barony Register
          </a>{" "}
          (see{" "}
          <a href="#what-is-the-difference-between-the-scottish-barony-register-and-the-roll" className={intLink}>
            how the SBR and the Roll differ
          </a>
          ) publishes{" "}
          <a
            href="https://scottishbaronyregister.org/annual-reports"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={extLink}
          >
            annual reports of the Custodian
          </a>{" "}
          (publicly available for 2021–2025); these record a handful of transfers in a typical year — and a recorded
          transfer is not necessarily a commercial sale, since assignations within families and by bequest can
          sometimes pass through the same register. Baronies generally remain within families across generations; a barony can only be bought
          if a holder chooses to part with one, and few do. Families are not selling their heirlooms.
        </p>
        <p className="mt-4">
          Where sales have occurred, the sums indicate scarcity value. The Scottish Law Commission, working from 1997
          market evidence, estimated a barony “of no particular distinction” at approximately £60,000, and in 2002 the
          Barony of MacDonald was reported to have been offered for sale at more than £1 million.
        </p>
      </>
    ),
    authority: (
      <>
        Abolition of Feudal Tenure etc. (Scotland) Act 2000 (transferability);{" "}
        <a
          href="https://www.legislation.gov.uk/ukpga/1964/41"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Succession (Scotland) Act 1964
        </a>{" "}
        (intestate descent). Transfer volume: Annual Reports of the Custodian, Scottish Barony Register, 2021–2025.
        Valuation: Scottish Law Commission estimate from 1997 evidence; 2002 press reports on the Barony of MacDonald.
        The prevalence of family retention over sale is a market observation, not a rule of law.
      </>
    ),
  },
  {
    q: "What is the difference between the Scottish Barony Register and the Roll?",
    a: "The Scottish Barony Register (SBR) and the Roll of Scottish Barons are both non-statutory private registers — neither is an official register. The SBR, established in 2004 by members of the Scottish legal profession under a Custodian, records legal transfers of baronies voluntarily submitted since 28 November 2004; the Lord Lyon accepts the Custodian's certification as evidence of title. The Roll is the Association's open-source verification register, aggregating every Baronage of Scotland title, including dignities held by dynastic succession, by chiefs, baronets and peers, which never transferred and so appear in no register of transfers. Unverified titles are not recognised on the Roll. Holders may also sign the Pledge, committing a barony to hereditary descent. The Roll is free, for life; the SBR charges a recording fee. Complementary, not competing: the SBR records legal assignation, the Roll recognises the title.",
    body: (
      <>
        <p>
          The Scottish Barony Register (SBR) and the Roll of Scottish Barons are often confused, but they do
          different jobs: one records legal transfers, the other recognises the title. Set side by side, here is what
          each records, and what it does not:
        </p>
        <div className="mt-6">
          <ButtonLink href="/sbr-vs-roll" variant="outline">
            How the SBR and the Roll differ
          </ButtonLink>
        </div>
      </>
    ),
    authority: (
      <>
        Scottish Barony Register —{" "}
        <a
          href="https://scottishbaronyregister.org"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={extLink}
        >
          scottishbaronyregister.org
        </a>
        . See also{" "}
        <Link href="/the-roll" className={intLink}>
          The Roll
        </Link>{" "}
        for the Roll’s own account of related organisations, including the SBR, and the Roll’s inclusion criteria.
      </>
    ),
  },
  {
    q: "Can you buy a “Lord” or “Laird” title in Scotland?",
    a: "A souvenir plot does not make you a Lord or a Laird — this is a widespread misunderstanding. Owning a novelty square of Scottish land confers no title: the Court of the Lord Lyon states that “laird” is “a description rather than a title”, and that a souvenir plot is not sufficient to bring a person within the Lyon Court's jurisdiction to seek a grant of arms. More broadly, it is a common myth that one can simply buy one's way into the genuine nobility of the United Kingdom: the Honours (Prevention of Abuses) Act 1925 makes it a criminal offence to trade in the grant of honours.",
    body: (
      <>
        <p>
          <strong className="font-semibold text-navy">A souvenir plot does not make you a Lord or a Laird</strong> —
          this is a widespread misunderstanding. Owning a novelty square of Scottish land confers no title: the{" "}
          <a
            href="https://web.archive.org/web/20120728090955/http://www.lyon-court.com/lordlyon/776.html"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            Court of the Lord Lyon
          </a>{" "}
          states that “laird” is{" "}
          <strong className="font-semibold text-navy">“a description rather than a title”</strong>, and that a souvenir
          plot is not sufficient to bring a person within the Lyon Court’s jurisdiction to seek a grant of arms. On
          what “laird” and “lord” have meant in Scotland, see{" "}
          <Link href="/reading-room/lairds-lords-and-barons/" className={intLink}>
            Lairds, lords and barons
          </Link>
          .
        </p>
        <p className="mt-4">
          More broadly, it is a common myth that one can simply buy one’s way into the genuine nobility of the United
          Kingdom. The{" "}
          <a
            href="https://www.legislation.gov.uk/ukpga/1925/72"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            Honours (Prevention of Abuses) Act 1925
          </a>{" "}
          makes it a criminal offence to trade in the grant of honours.
        </p>
      </>
    ),
    authority: (
      <>
        <a
          href="https://web.archive.org/web/20120728090955/http://www.lyon-court.com/lordlyon/776.html"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Court of the Lord Lyon, “Lairds”
        </a>{" "}
        (archived 2012): “the term ‘laird’ … is a description rather than a title”, “not appropriate for … the owner of
        a small souvenir plot of land”. On the sale of honours:{" "}
        <a
          href="https://www.legislation.gov.uk/ukpga/1925/72"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Honours (Prevention of Abuses) Act 1925
        </a>{" "}
        — legislation.gov.uk.
      </>
    ),
  },
  {
    q: "What is a territorial designation (TD), and is it the same as a barony?",
    a: "No — a territorial designation is not the same as a barony, and the two are often confused. A barony is a title of nobility; a distinctly Scottish territorial designation — the “Surname of Place” form, such as “Kerr of Ardgowan” — is part of a person's family name, not a title of nobility. A baron may use the barony title as a matter of legal right, without the Lord Lyon's permission (although the Lord Lyon's recognition of the barony title in the holder's favour is nonetheless helpful), but a territorial designation must be authorised by the Court of the Lord Lyon and is recognised only where the applicant owns a substantial estate — in Lord Lyon Sellar’s guidance of 5 January 2010, “an ‘estate’, or farm or, at the very least, a house with policies extending to five acres or thereby, outwith a burgh”. In the Kerr of Ardgowan case the petitioner was recognised as Baron of Ardgowan, yet the matching territorial designation was treated as a separate question, the Court of Session confirming the Lord Lyon's discretion to grant or refuse a territorial designation: in Kerr of Ardgowan v Lord Lyon 2009 SLT 759 the Extra Division held that the Lord Lyon “does indeed enjoy a wide discretion in deciding whether or not to accept a change of name for entry in the Public Register”. A territorial designation becomes a heritable part of the surname, separable from the land, only after it has been held and used for roughly three generations; and owning the caput — the head place of a barony — does not by itself entitle the holder to the matching designation. Many barons today hold no territorial designation, and most people who hold a territorial designation are not barons; the two can coincide, differ, or be unconnected. A territorial designation belongs to the family name (surname), not to a barony or peerage title. TDs belong mainly to lairds (landowners of historic estates) and long-established landed families. A baron may hold one too: where he owns the lands historically associated with his barony and is so recognised by the Lord Lyon, he may be “Surname of [TD]” as well as “Baron of [Barony]” — though the designation and the barony remain distinct. A few Scottish peers also carry a designation in their surname: The Rt Hon Jean Drummond of Megginch, 16th Baroness Strange (d. 2005), had the designation “of Megginch” recognised by the Lord Lyon in her surname, separately from her peerage Strange, which carries no territorial element; The Rt Hon James Borthwick of that Ilk, 25th Lord Borthwick, and The Rt Hon Patrick Johnstone of Annandale and of that Ilk, 11th Earl of Annandale and Hartfell, are others. This is different again from a peerage that merely includes a place-name: The Rt Hon Donald Cameron of Lochiel, Lord Cameron of Lochiel — “Lord Cameron of Lochiel” is a peerage title, distinct from his surname “Cameron of Lochiel”, which carries the territorial designation. “Of that Ilk” is a form of territorial designation used where the surname and the place are the same: “Borthwick of that Ilk” and “Borthwick of Borthwick” mean the same thing, and which form is used is a matter of preference. The custom has a statutory root: the Lyon King of Arms Act 1672 allowed only peers and bishops to subscribe by their titles, while “all others shall subscribe their christened names … with their surnames, and may, if they please, adject the designations of their lands prefixing the word ‘of’ to the said designations”; the clause was repealed as spent by the Requirements of Writing (Scotland) Act 1995, but it is the origin of the territorial “of”. The usage is continental in character: the Scots “of” before a placename does the work of the Continent's nobiliary particles — the German von, the French and Spanish de. The territorial “of” does not exist in the United Kingdom outside Scotland: UK institutions such as HM Passport Office and the College of Arms refer “of” surnames to the Lord Lyon, and an “of” surname marks its bearer as Scottish. For the history of the designation — the 1672 Act, the Lyon Court’s test, and the passport — see Lairds, lords and barons in the Reading Room.",
    body: (
      <>
        <p>
          No — a territorial designation is not the same as a barony, and the two are often confused. A barony is a
          title of nobility. The distinctly Scottish territorial designation “Surname of Place” form, such as
          “Kerr of Ardgowan” — is part of a person’s family name, not a title of nobility. The two are separate, and
          may or may not coincide.
        </p>
        <p className="mt-4">
          A baron may use the barony title (for example “Baron of X”) as a matter of legal right, without the Lord
          Lyon’s permission — although the Lord Lyon’s recognition of the barony title in the holder’s favour is
          nonetheless helpful (see{" "}
          <a href="#will-the-lord-lyon-recognise-a-baron-as-a-baron" className={intLink}>
            Will the Lord Lyon recognise a baron as a baron?
          </a>
          ). A territorial designation is different: it must be authorised by the Court of the Lord Lyon, and is
          recognised only where the applicant owns a substantial estate — in Lord Lyon Sellar’s guidance of 5 January
          2010, <em>“an ‘estate’, or farm or, at the very least, a house with policies extending to five acres or
          thereby, outwith a burgh”</em>. In the{" "}
          <a
            href="https://vlex.co.uk/vid/stephen-kerr-of-ardgowan-807229025"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            Kerr of Ardgowan
          </a>{" "}
          case the petitioner was recognised as Baron of Ardgowan, yet the matching territorial designation was treated
          as a separate question — the Court of Session confirming the Lord Lyon’s discretion to grant or refuse a
          territorial designation. In <em>Kerr of Ardgowan v Lord Lyon</em> 2009 SLT 759 the Extra Division held that
          the Lord Lyon <em>“does indeed enjoy a wide discretion in deciding whether or not to accept a change of name
          for entry in the Public Register”</em>.
        </p>
        <p className="mt-4">
          A territorial designation becomes a heritable part of the surname, separable from the land, only after it has
          been held and used for three generations, or 82 years. And owning the <em>caput</em> — the head place of a
          barony — does not by itself entitle the holder to the matching designation; that too must be authorised by
          the Lord Lyon.
        </p>
        <p className="mt-4">
          In practice, many barons hold no territorial designation, and most people who hold a territorial designation
          are not barons; the two can be the same, different, or unconnected. A territorial designation belongs to the
          family name (surname), not to a barony or peerage title. TDs belong mainly to lairds (landowners of historic
          estates) and long-established landed families.
        </p>
        <p className="mt-4">
          A baron may hold one too: where he owns the lands historically associated with his barony and is so
          recognised by the Lord Lyon, he may be “Surname of [TD]” as well as “Baron of [Barony]” — though the
          designation and the barony remain distinct.
        </p>
        <p className="mt-4">
          A few Scottish peers also carry a territorial designation in their surname. The Rt Hon Jean Drummond of
          Megginch, 16th Baroness Strange (d. 2005), famously had the designation “of Megginch” recognised by the Lord
          Lyon in her surname — separately from her peerage Strange, which carries no territorial element. The Rt Hon
          James Borthwick of that Ilk, 25th Lord Borthwick, and The Rt Hon Patrick Johnstone of Annandale and of that
          Ilk, 11th Earl of Annandale and Hartfell, are others. This is different again from a peerage that merely includes a place-name: The Rt Hon Donald Cameron
          of Lochiel, Lord Cameron of Lochiel — “Lord Cameron of Lochiel” is a peerage title, distinct from his
          surname, “Cameron of Lochiel”, which carries the territorial designation.
        </p>
        <p className="mt-4">
          <em>“Of that Ilk”</em> is a form of territorial designation used where the surname and the place are one and
          the same. “Borthwick of that Ilk” and “Borthwick of Borthwick” mean the same thing; which form is used is a
          matter of preference.
        </p>
        <p className="mt-4">
          The custom has a statutory root. The{" "}
          <a href="https://www.rps.ac.uk/trans/1672/6/57" target="_blank" rel="noopener noreferrer" className={extLink}>
            Lyon King of Arms Act 1672
          </a>{" "}
          allowed only peers and bishops to subscribe by their titles, while <em>“all others shall subscribe their
          christened names … with their surnames, and may, if they please, adject the designations of their lands
          prefixing the word ‘of’ to the said designations”</em>. The clause was repealed as spent by the Requirements
          of Writing (Scotland) Act 1995, but it is the origin of the territorial “of”.
        </p>
        <p className="mt-4">
          The usage is continental in character: the Scots <em>“of”</em> before a placename does the work of the
          Continent’s nobiliary particles — the German <em>von</em>, the French and Spanish <em>de</em> — naming a
          family after its territory. It is a custom Scotland shares with Europe, in keeping with the rest of its
          nobiliary practice. The territorial “of” does not exist in the United Kingdom outside Scotland: UK
          institutions such as HM Passport Office and the College of Arms refer “of” surnames to the Lord Lyon, and an
          “of” surname marks its bearer as Scottish. For the history of the designation — the 1672 Act, the Lyon
          Court’s test, and the passport — see{" "}
          <Link href="/reading-room/lairds-lords-and-barons/" className={intLink}>
            Lairds, lords and barons
          </Link>{" "}
          in the Reading Room.
        </p>
      </>
    ),
    authority: (
      <>
        <a
          href="https://vlex.co.uk/vid/stephen-kerr-of-ardgowan-807229025"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Kerr of Ardgowan, Petitioner
        </a>{" "}
        and{" "}
        <a
          href="https://vlex.co.uk/vid/kerr-v-advocate-general-804518881"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Kerr v Advocate General
        </a>{" "}
        (Court of Session) — the Lord Lyon’s discretion over recognition of a territorial designation, which he ties to
        ownership of a substantial estate; reported as <em>Kerr of Ardgowan v Lord Lyon</em> 2009 SLT 759 (Extra
        Division), quoted in{" "}
        <a
          href="https://courtofthelordlyon.scot/index_htm_files/ARRAN.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Lord Lyon Sellar, Note in <em>Sturzenegger of Arran</em>, pp. 13–14
        </a>
        . Lord Lyon Sellar’s guidance of 5 January 2010 (the “five acres … outwith a burgh” test) and the long-usage
        requirement (“at least three generations”, citing Sir Crispin Agnew): Donald Draper Campbell,{" "}
        <a
          href="https://www.ccsna.org/sites/default/files/upload/2019-02/Scottish-Armory-and-Heraldry-by-Donald-Draper-Campbell-Esq-2019-01-12.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Scottish Armory and Heraldry
        </a>{" "}
        (2019), pp. 48–50 and 83–84. The 1672 subscription clause:{" "}
        <a href="https://www.rps.ac.uk/trans/1672/6/57" target="_blank" rel="noopener noreferrer" className={extLink}>
          RPS 1672/6/57
        </a>{" "}
        (original text) and{" "}
        <a href="https://www.legislation.gov.uk/aosp/1672/47" target="_blank" rel="noopener noreferrer" className={extLink}>
          Lyon King of Arms Act 1672
        </a>{" "}
        (revised text, noting the repeal by the{" "}
        <a href="https://www.legislation.gov.uk/ukpga/1995/7" target="_blank" rel="noopener noreferrer" className={extLink}>
          Requirements of Writing (Scotland) Act 1995
        </a>
        ).
      </>
    ),
  },
  {
    q: "Will the Lord Lyon recognise a baron as a baron?",
    a: "Maybe — this is at the discretion of the sitting Lord Lyon. Traditionally, in a petition for a grant of arms, where the Lord Lyon determines that the dignity of baron exists, that the petitioner is a “virtuous and well deserving person” — the standard set by the Lyon King of Arms Act 1672 — and exercises his discretion in the petitioner's favour, he will officially recognise the petitioner as “Baron of [the barony]” and grant arms with a helmet befitting their degree. In recent years, the Lord Lyon routinely treats an entry in the Scottish Barony Register as sufficient evidence that the dignity exists, and may grant arms without recognition. Recognition is not what makes a baron a baron — the dignity is held as of legal right — but recognition by the Lord Lyon is the formal mark of the title within Scotland's heraldic system, and it rests with the judgement of each sitting Lord Lyon. The Lord Lyon holds considerable autonomy in this respect: part of that discretion is that the form of address recorded on the grant of arms is the one that should be used for official purposes. The dignity itself is held as of right under s. 63 of the 2000 Act — recognition by the Lord Lyon is “only ever a matter of grace (and not entitlement)”, as the Court of Session put it (Hamilton of Rockhall v Lord Lyon [2019] CSOH 85). The Lord Lyon has also said that “in Scotland anyone is at liberty to call themselves what they wish subject to it not being the intention to deceive” (Menking, Note of 30 April 2015, para 21).",
    body: (
      <>
        <p>
          <strong className="font-semibold text-navy">Maybe — this is at the discretion of the sitting Lord Lyon.</strong>{" "}
          Traditionally, in a
          petition for a grant of arms, where the Lord Lyon determines that the dignity of baron exists, that the
          petitioner is a <strong className="font-semibold text-navy">“virtuous and well deserving person”</strong> —
          the standard set by the{" "}
          <a
            href="https://www.legislation.gov.uk/aosp/1672/47"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            Lyon King of Arms Act 1672
          </a>{" "}
          — and exercises his discretion in the petitioner’s favour, he will officially recognise the petitioner as{" "}
          <strong className="font-semibold text-navy">“Baron of [the barony]”</strong> and grant arms with a helmet
          befitting their degree. In recent years, the Lord Lyon routinely treats an entry
          in the Scottish Barony Register as sufficient evidence that the dignity exists, and may grant arms without
          recognition.
        </p>
        <p className="mt-4">
          Recognition is not what makes a baron a baron — the dignity is held as of legal right. But recognition by the
          Lord Lyon is the formal mark of the title within Scotland’s heraldic system, and it rests with the judgement
          of each sitting Lord Lyon. The Lord Lyon holds{" "}
          <strong className="font-semibold text-navy">considerable autonomy</strong> in this respect: part of that
          discretion is that the form of address recorded on the grant of arms is the one that should be used for
          official purposes.
        </p>
        <p className="mt-4">
          The dignity itself is held as of right under s. 63 of the 2000 Act — recognition by the Lord Lyon is{" "}
          <em>“only ever a matter of grace (and not entitlement)”</em>, as the Court of Session put it (
          <em>Hamilton of Rockhall v Lord Lyon</em> [2019] CSOH 85). The Lord Lyon has also said that{" "}
          <em>“in Scotland anyone is at liberty to call themselves what they wish subject to it not being the intention
          to deceive”</em>{" "}
          (Menking, Note of 30 April 2015, para 21).
        </p>
      </>
    ),
    authority: (
      <>
        <a
          href="https://www.legislation.gov.uk/aosp/1672/47"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Lyon King of Arms Act 1672
        </a>{" "}
        — grants of arms to “virtuous and well deserving persons”; the Lord Lyon’s published policy on baronies
        acquired after 28 November 2004 — official recognition as “Baron of [the barony]” where the dignity is proven
        and the discretion is exercised in the petitioner’s favour;{" "}
        <a href="https://www.courtofthelordlyon.scot" target="_blank" rel="noopener noreferrer" className={extLink}>
          Court of the Lord Lyon
        </a>
        .{" "}
        <a
          href="https://freiherrvonquast.wordpress.com/wp-content/uploads/2020/06/margaret-hamilton-of-rockhall-v-lord-lyon-king-of-arms-2019-csoh-85-case.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          <em>Hamilton of Rockhall v Lord Lyon King of Arms</em> [2019] CSOH 85
        </a>{" "}
        (Court of Session, Outer House) — recognition by the Lord Lyon “only ever a matter of grace (and not
        entitlement)”. Lord Lyon Morrow,{" "}
        <a
          href="https://courtofthelordlyon.scot/index_htm_files/Menking.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Note in the petition of Menking
        </a>{" "}
        (30 April 2015), para 21.
      </>
    ),
  },
  {
    q: "What is The Pledge, and what does it change?",
    a: "The Pledge is a declaration of honour by which a baron commits their barony to hereditary descent within the family line. It cannot legally alter a barony — it operates in honour rather than law — but its practical effect is on future recognition upon the Roll of Scottish Barons should a pledged barony later be sold outside the family. In this the Roll follows the two official Rolls. The Roll of the Peerage separates recognition from legal title: Andrew Mountbatten Windsor remains Duke of York in law, since only an Act of Parliament can extinguish a peerage, yet the King's removal of his name from that Roll in 2025 withdrew official recognition of the title — not his legal entitlement to it. The Roll of the Baronetage goes further: no one is received or styled as a baronet unless entered upon it. The Roll of Scottish Barons is modelled between the two — recognition is paramount, as with the baronetage, while legal title is never affected, as with the peerage.",
    body: (
      <>
        <p>
          <Link href="/pledge" className={intLink}>
            The Pledge
          </Link>{" "}
          is a declaration of honour by which a baron commits their barony to{" "}
          <strong className="font-semibold text-navy">hereditary descent</strong> within the family line. A growing
          number of barons have taken it, wishing to reduce the <em>in commercio</em> transfer of baronies. It cannot legally
          alter a barony — it operates in honour rather than law — but its practical effect is on future{" "}
          <strong className="font-semibold text-navy">recognition</strong> upon the Roll of Scottish Barons, should a
          pledged barony later be sold outside the family.
        </p>
        <p className="mt-4">
          In separating recognition from legal title, the Roll follows the model of the two official Rolls. The
          instructive recent example is the former Prince Andrew:{" "}
          <strong className="font-semibold text-navy">
            Andrew Mountbatten Windsor remains Duke of York in law
          </strong>{" "}
          — only an Act of Parliament can extinguish a peerage — yet the King’s removal of his name from the Roll of
          the Peerage in 2025 withdrew official <em>recognition</em> of the title, not his legal entitlement to it.
          The Roll of the Baronetage goes a degree further: no one is received or styled as a baronet unless entered
          upon it.
        </p>
        <p className="mt-4">
          The Roll of Scottish Barons is modelled between the two: recognition upon the Roll is paramount, as with
          the baronetage, while legal title is never affected, as with the peerage. A pledged barony that is later
          sold out of the family line does not cease to exist in law — but its recognition on the Roll is a matter of
          the Roll’s published method, just as the peerage and baronetage Rolls govern recognition in their own
          spheres. See{" "}
          <Link href="/the-roll" className={intLink}>
            The Roll
          </Link>{" "}
          for how the two official Rolls work.
        </p>
      </>
    ),
    authority: (
      <>
        <Link href="/pledge" className={intLink}>
          The Pledge
        </Link>{" "}
        (a convention of honour, not statute — it cannot alter a barony in law). Roll of the Peerage: created by royal
        warrant, 1 June 2004; maintained by the Crown Office and published by the{" "}
        <a
          href="https://www.college-of-arms.gov.uk/resources/roll-of-the-peerage"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          College of Arms
        </a>
        ; the removal of Andrew Mountbatten Windsor from it in 2025 was widely reported, the dukedom itself remaining
        extant in law. Roll of the Baronetage: royal warrant of Edward VII, 1910 — precedence and official styling as
        a baronet follow enrolment.
      </>
    ),
  },
  {
    q: "How does succession to a barony work?",
    a: "Scottish titles have historically had more liberal succession rules than their English counterparts, with some descending through female lines. The earliest baronies carried remainders to “heirs and assignees”. Before the Union, titles were designed to be perpetual and were often resigned to the Crown and reissued with a new destination; the Conveyancing (Scotland) Act 1874 ended Crown confirmation charters, after which assignation by legal conveyance and registration established the new baron. This is what created the so-called feudal earl. Since 2004 the barony is a non-territorial personal dignity that retains the old remainder to heirs and assignees: it can be transferred or bequeathed by will, and otherwise descends under the pre-1964 rules preserved for titles and dignities.",
    body: (
      <>
        <p>
          Scottish titles have historically had more liberal succession rules than their English counterparts, with
          some descending through female lines. The earliest baronies, like other early dignities, carried remainders to{" "}
          <strong className="font-semibold text-navy">“heirs and assignees”</strong> — because all noble titles,
          including the higher dignities that became today’s peerage, were originally territorial: they ran with the
          owner of the estate rather than the person. However, the title and estate were typically entailed to the
          male heir, which kept them in the family line for hundreds of years. Over time territorial peerages evolved
          into personal peerages attached to the individual.
        </p>
        <p className="mt-4">
          Before the Union, Scotland operated differently from England. Titles were designed to be perpetual and were
          often resigned to the Crown and
          reissued with a new destination — for instance to a kinsman or a member of the clan — giving the system a
          flexibility the English peerage lacked. When a barony passed to a new family or baron, the practice was to resign the
          title and obtain reconfirmation of the feudal grant from the Crown. The Conveyancing (Scotland) Act 1874
          ended this practice, and Crown confirmation charters ceased; thereafter it was assignation by legal
          conveyance and registration in the Register of Sasines that established the new baron. This is what created
          the so-called feudal earl.
        </p>
        <p className="mt-4">
          Since 2004 the system has changed once more. The barony is now an incorporeal hereditament — a non-territorial
          personal dignity — which nonetheless retains the old remainder to heirs and assignees. It can be transferred
          or bequeathed by will, and where a holder dies without settling it, it descends under the pre-1964 rules
          preserved for titles and dignities.
        </p>
      </>
    ),
    authority: (
      <>
        Abolition of Feudal Tenure etc. (Scotland) Act 2000, s.63(2) and Explanatory Notes para. 198;{" "}
        <a
          href="https://www.legislation.gov.uk/ukpga/1964/41"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Succession (Scotland) Act 1964
        </a>{" "}
        (which preserved the pre-1964 rules of descent for titles and dignities); Conveyancing (Scotland) Act 1874.
      </>
    ),
  },
  {
    q: "What is the difference between a barony and a Lordship of the Manor?",
    a: "They are entirely different things. A Scottish barony is a title of nobility, granted historically by the Crown through a charter, conferring precedence, privileges, and — until the Union of 1707 — a place among the ancient Three Estates of the Scottish Parliament. An English Lordship of the Manor was never a Crown-granted title of nobility: it is a style attached to the ownership of a manor and confers no noble rank and no parliamentary rights. The nearest Scottish equivalent to a Lord of the Manor is a Laird. The Court of the Lord Lyon has itself stated that 'laird' is 'a description rather than a title', and it likewise carries no formal status in law.",
    body: (
      <>
        <p>
          They are entirely different things and are often confused, sometimes deliberately. A Scottish barony is a{" "}
          <strong className="font-semibold text-navy">title of nobility</strong>, granted historically by the Crown
          through a charter, conferring precedence, privileges, and — until the Union of 1707 — a place among the
          ancient Three Estates of the Scottish Parliament. An English{" "}
          <strong className="font-semibold text-navy">“Lordship of the Manor”</strong> was never a Crown-granted title
          of nobility: it is a style attached to the ownership of a manor and confers no noble rank and no
          parliamentary rights. The nearest Scottish equivalent to a Lord of the Manor is a{" "}
          <em>Laird</em>. The{" "}
          <a
            href="https://web.archive.org/web/20120728090955/http://www.lyon-court.com/lordlyon/776.html"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            Court of the Lord Lyon has itself stated
          </a>{" "}
          that “laird” is{" "}
          <strong className="font-semibold text-navy">“a description rather than a title”</strong>, and it likewise
          carries no formal status in law. For what the words themselves have meant, see{" "}
          <Link href="/reading-room/lairds-lords-and-barons/" className={intLink}>
            Lairds, lords and barons
          </Link>
          .
        </p>
        <p className="mt-4">
          The claim, made by some, that Scottish baronies are simply the Scottish name for English manors is incorrect:
          the two arise from different legal systems and carry different status. Today a barony retains legal standing
          as a personal dignity and carries heraldic rights; a Lordship of the Manor does not, because it never
          conferred noble rank in the first place.
        </p>
      </>
    ),
    authority: (
      <>
        <em>Spencer-Thomas of Buquhollie v Newell</em> (Court of Session — the noble quality of the barony grant);
        historical accounts of the Scottish Three Estates. On Laird:{" "}
        <a
          href="https://web.archive.org/web/20120728090955/http://www.lyon-court.com/lordlyon/776.html"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Court of the Lord Lyon, “Lairds”
        </a>
        , archived 2012 — “the term ‘laird’ … is a description rather than a title”.
      </>
    ),
  },
  {
    q: "How does a Scottish barony differ from an English or Irish feudal barony?",
    a: "There are no recognised English or Irish feudal barons today. They developed along different lines. Scotland followed the continental pattern of a titled nobility that extends below the peerage — a class of noble barons, with the territorial “of” that answers to the German von or the French de. In England and Ireland the word “baron” went the other way and became the lowest rank of the peerage; there is no English or Irish equivalent of the Scottish non-peerage titled baron. (The Scottish peerage has its own lowest rank, the Lord of Parliament, discussed above.) The earliest English baronies were baronies by tenure — held per baroniam, directly of the Crown, the tenure itself carrying a duty to attend Parliament — but from the thirteenth century the summons came instead by writ. Under the Tenures Abolition Act 1660 many baronies by tenure were converted into baronies by writ, and the rest ceased to exist as recognised feudal baronies, their lands passing into free socage; the courts then closed the door on the older form, the Fitzwalter case (1670) holding that barony by tenure had long been discontinued and the Berkeley case (1861) confirming that baronies by tenure no longer existed. In Ireland the picture is more tangled: an Irish feudal barony was a customary title denoting land held by feudal obligation rather than a rank of nobility, and separately “barony” in Ireland means an administrative division of a county — like an English hundred — which is not a title at all, though spurious titles have been sold trading on those place-names. The Scottish barony followed neither path: neither a peerage nor a mere tenure, but a dignity of a titled nobility, it survived the abolition of the feudal system in 2004, expressly preserved as a personal, non-territorial dignity. Lord Lyon Sellar put it thus in Sturzenegger of Arran: “Anachronistic and anomalous the position of the former feudal baron may be, but there can be no doubt about the thread of continuity from the earliest days of feudalism in Scotland until the present day.” And on the Heritable Jurisdictions Act, often assumed to have ended the Scottish barony: “Baron courts, however, were not abolished by the Heritable Jurisdictions Act, although their jurisdiction, both civil and criminal, was greatly reduced. … The style of ‘Baron’, although not incorrect, gradually fell into desuetude.”",
    body: (
      <>
        <p>
          <strong className="font-semibold text-navy">There are no recognised English or Irish feudal barons today.</strong>{" "}
          They developed along different lines. Scotland followed the continental pattern of a titled nobility that
          extends below the peerage — a class of noble barons, with the territorial “of” that answers to the German{" "}
          <em>von</em> or the French <em>de</em>. In England and Ireland the word “baron” went the other way and became
          the lowest rank of the peerage; there is no English or Irish equivalent of the Scottish non-peerage titled
          baron. (The Scottish peerage has its own lowest rank, the Lord of Parliament, discussed above.)
        </p>
        <p className="mt-4">
          The earliest English baronies were <em>baronies by tenure</em> — held <em>per baroniam</em>, directly of the
          Crown, the tenure itself carrying a duty to attend Parliament. From the thirteenth century the summons came
          instead by writ (a <em>barony by writ</em>). The{" "}
          <a
            href="https://www.legislation.gov.uk/aep/Cha2/12/24/introduction"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            Tenures Abolition Act 1660
          </a>{" "}
          then swept away the old feudal tenures: many baronies by tenure were converted into baronies by writ, and the
          rest ceased to exist as recognised feudal baronies, their lands passing into free socage. The courts closed
          the door on the older form — the <em>Fitzwalter</em> case (1670) held that barony by tenure had long been
          discontinued, and the <em>Berkeley</em> case (1861) confirmed that baronies by tenure no longer existed.
        </p>
        <p className="mt-4">
          In Ireland the picture is more tangled still. An Irish feudal barony was a customary title denoting land held
          by feudal obligation rather than a rank of nobility, and its holder sat in no parliament by right of it.
          Separately — and more commonly — “barony” in Ireland means an administrative division of a county, akin to an
          English hundred, which is not a title at all; spurious “titles” have been sold trading on those place-names.
        </p>
        <p className="mt-4">
          The Scottish barony followed neither path. Neither a peerage nor a mere tenure, but a dignity of a titled
          nobility, it came through the abolition of the feudal system in 2004 expressly preserved as a personal,
          non-territorial dignity — as set out{" "}
          <a href="#what-did-the-2004-change-actually-do" className={intLink}>
            above
          </a>
          .
        </p>
        <p className="mt-4">
          Lord Lyon Sellar put it thus in <em>Sturzenegger of Arran</em>:{" "}
          <em>“Anachronistic and anomalous the position of the former feudal baron may be, but there can be no doubt
          about the thread of continuity from the earliest days of feudalism in Scotland until the present day.”</em>{" "}
          And on the Heritable Jurisdictions Act, often assumed to have ended the Scottish barony:{" "}
          <em>“Baron courts, however, were not abolished by the Heritable Jurisdictions Act, although their
          jurisdiction, both civil and criminal, was greatly reduced. … The style of ‘Baron’, although not incorrect,
          gradually fell into desuetude.”</em>
        </p>
      </>
    ),
    authority: (
      <>
        <a
          href="https://www.legislation.gov.uk/aep/Cha2/12/24/introduction"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Tenures Abolition Act 1660
        </a>{" "}
        (conversion of feudal tenures to socage); <em>Fitzwalter</em> case (1670) and the <em>Berkeley</em> Peerage
        case (1861), Committee for Privileges of the House of Lords — barony by tenure obsolete. On Ireland, the
        distinction between an Irish feudal barony and an administrative barony (a land division of a county). Lord
        Lyon Sellar,{" "}
        <a
          href="https://courtofthelordlyon.scot/index_htm_files/ARRAN.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={extLink}
        >
          Note in the petition of <em>Sturzenegger of Arran</em>
        </a>
        , pp. 7, 10–11 — the “thread of continuity” and the effect of the Heritable Jurisdictions Act on baron courts.
      </>
    ),
  },
];

/** Display order for the questions (drives the table of contents, the visible
 * page, and the FAQ JSON-LD alike). Casual-reader questions lead; the more
 * detailed, legal and edge-case questions follow. Reorder here — the entries
 * are matched to `faqs` by anchor slug, so this is the single place to change. */
const FAQ_ORDER = [
  "is-a-scottish-baron-a-nobleman",
  "is-scottish-feudal-barony-or-feudal-baron-or-feudal-title-the-correct-term-today",
  "can-a-scottish-barony-be-bought-and-sold",
  "what-is-the-pledge-and-what-does-it-change",
  "how-does-succession-to-a-barony-work",
  "what-did-the-2004-change-actually-do",
  "are-scottish-baronies-recognised-in-law",
  "are-scottish-barony-titles-legitimate-or-a-scam",
  "can-you-buy-a-lord-or-laird-title-in-scotland",
  "what-is-a-territorial-designation-td-and-is-it-the-same-as-a-barony",
  "will-the-lord-lyon-recognise-a-baron-as-a-baron",
  "what-is-the-difference-between-a-barony-and-a-lordship-of-the-manor",
  "how-does-a-scottish-barony-differ-from-an-english-or-irish-feudal-barony",
  "what-is-the-difference-between-the-scottish-barony-register-and-the-roll",
];
const orderedFaqs = FAQ_ORDER.map((slug) => faqs.find((f) => slugify(f.q) === slug)).filter(
  (f): f is (typeof faqs)[number] => Boolean(f),
);

const sources: ReactNode[] = [
  <>
    <a
      href="https://www.legislation.gov.uk/asp/2000/5/section/63"
      target="_blank"
      rel="noopener noreferrer"
      className={extLink}
    >
      Abolition of Feudal Tenure etc. (Scotland) Act 2000, s.63
    </a>
    , and its{" "}
    <a
      href="https://www.legislation.gov.uk/asp/2000/5/notes"
      target="_blank"
      rel="noopener noreferrer"
      className={extLink}
    >
      Explanatory Notes
    </a>
    , paras. 195–198 — legislation.gov.uk.
  </>,
  <>
    <a
      href="https://www.legislation.gov.uk/ukpga/1964/41"
      target="_blank"
      rel="noopener noreferrer"
      className={extLink}
    >
      Succession (Scotland) Act 1964
    </a>{" "}
    — legislation.gov.uk.
  </>,
  <>
    Court of the Lord Lyon, interlocutor of 26 February 1943 (Lord Lyon Sir Francis Grant) in a petition for a
    birthbrief, recorded in the Public Register of All Genealogies and Birthbrieves, vol. iv, p. 26; printed in{" "}
    <a
      href="http://journals.socantscot.org/index.php/psas/article/download/8229/8197/"
      target="_blank"
      rel="noopener noreferrer"
      className={extLink}
    >
      Innes of Learney, “The Robes of the Feudal Baronage of Scotland”, <em>PSAS</em> vol. 79 (1944–45), p. 143 n. 3
    </a>
    .
  </>,
  <>
    <em>Spencer-Thomas of Buquhollie v Newell</em> (Court of Session).
  </>,
  <>
    Scottish Law Commission, <em>Report on the Abolition of the Feudal System</em>.
  </>,
  <>
    Sir Thomas Craig, <em>Jus Feudale</em> (1655); Viscount Stair, <em>Institutions</em> (1681); Erskine,{" "}
    <em>Institute</em>; Bankton, <em>Institute</em>.
  </>,
  <>
    <a href="https://www.courtofthelordlyon.scot" target="_blank" rel="noopener noreferrer" className={extLink}>
      Court of the Lord Lyon
    </a>{" "}
    — jurisdiction over Scottish heraldry and recognition.
  </>,
  <>
    Scottish Barony Register —{" "}
    <a
      href="https://scottishbaronyregister.org/annual-reports"
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={extLink}
    >
      Annual Reports of the Custodian
    </a>
    , 2021–2025.
  </>,
  <>
    Lord Lyon W. D. H. Sellar (2009), “quondam feudal baronies”, quoted in Donald Draper Campbell,{" "}
    <a
      href="https://www.ccsna.org/sites/default/files/upload/2019-02/Scottish-Armory-and-Heraldry-by-Donald-Draper-Campbell-Esq-2019-01-12.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={extLink}
    >
      Scottish Armory and Heraldry
    </a>{" "}
    (2019), p. 82.
  </>,
];

/** Key terms, single source of truth for the visible glossary and the
 * schema.org DefinedTermSet. */
/** `def` is plain text (it feeds the schema.org DefinedTermSet); `note` is an
 * optional small-print line of sources or cross-references rendered beneath it. */
const glossary: { term: string; def: string; note?: ReactNode }[] = [
  {
    term: "Scottish feudal barony",
    def: "A now incorrect and defunct historical term. Baronies were feudal until 28 November 2004, when the feudal system was abolished along with all feudal aspects; extant baronies continue as personal, non-territorial dignities, so a living barony is no longer “feudal”. The precise term for the historic character is “quondam” (formerly) feudal barony.",
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
    def: "Greater and lesser barons. The greater barons became the peerage; the lesser — the “small barons” of the Acts — are the Baronage of Scotland. Under the robes Act of 1455 minor barons (who were always members of parliament but later not obligated to attend) and Lords of Parliament were not told apart by dress: they both wore the same red mantle, open at the front and lined with silk or furred with grey. The higher ranks were marked apart by mantles of their own — the earls, under the same Act, in ‘grained’ brown furred with white, and in later usage dukes, marquesses and earls graded by the rows of ermine on their robes. In 1567 Parliament declared the barons “a part of the nobility”. Craig: “Dukes, marquesses, and earls are all comprehended among the barons, and originally they were all known under the latter description.”",
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
    term: "Laird",
    def: "The Scots word for lord: a description, not a title, like “landlord” or “lord of the manor” in England. It is a catch-all term — the neighbours call you laird whether you are a baron or not. In medieval England, likewise, every master of an estate was called a lord; the distinction developed differently in Scotland, with Lord becoming a word for peers or crown chartered lords in the baronage of Scotland. Lairds if they hold a coat of arms but are not barons are untitled nobility (gentry in the English sense).",
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
    term: "Quondam feudal barony",
    def: "A barony that was feudal before 28 November 2004. “Quondam” means “formerly”; the phrase (Lord Lyon Sellar, 2009) marks that a barony's feudal character is now historical, the living dignity personal and non-territorial.",
  },
  {
    term: "Incorporeal hereditament",
    def: "An intangible form of heritable property that may be owned and inherited without attaching to land. Since 2004 a Scottish barony exists as such a dignity, independent of any estate.",
  },
  {
    term: "Caput",
    def: "The head place of a barony — its principal seat or centre, from which the barony took its name and, historically, where the baron's court was held.",
  },
  {
    term: "Peerage",
    def: "The highest grade of the British nobility. In Scotland its ranks, in ascending order, are Lord of Parliament, Viscount, Earl, Marquess and Duke in the peerage of Scotland. A peerage stands in law whether or not its holder is enrolled, and historically carried a seat in Parliament. It ranks above, and is distinct from, a barony in the Baronage of Scotland.",
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
    term: "Register of Sasines",
    def: "Scotland's public register of property deeds. After the Conveyancing (Scotland) Act 1874 the transfer of a barony was recorded here; since 2004, baronies are recorded in the separate Scottish Barony Register.",
  },
  {
    term: "Territorial designation (TD)",
    def: "A “Surname of Place” designation — such as “Kerr of Ardgowan” — that forms part of a person's name. It must be authorised by the Court of the Lord Lyon and generally requires ownership of a substantial estate. It is not a title of nobility, and is separate from a barony: a person may hold either, both, or neither. The custom is distinctly Scottish and does not apply to the rest of the British Isles.",
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
        (2019), p. 83.
      </>
    ),
  },
  {
    term: "Nobility clause",
    def: "The closing clause of older Lyon Court grants and declarations that the grantee is to be “taken, and received amongst all Nobles and in all places of Honour” — the words of the Wauchope of Niddrie declaration of 19 April 1945. A nobility clause was present in Lord Lyon Blair’s grant to the Baron of Ballencrieff (2007); it has been omitted from grants since.",
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
    def: "The Latin rank-words of the sheriff-court rolls — Earl of, Lord of, Baron of — entered as titles (“Intrat A, Baro de B”), corresponding to lands held in free earldom, free lordship and free barony. A “Dominus de X” in a fifteenth-century charter need not be a Lord of Parliament.",
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

const org = {
  "@type": "Organization",
  name: "Baronage of Scotland Association",
  url: `${SITE_URL}/`,
};

/** A single JSON-LD @graph: the FAQ (with authorship, freshness dates and the
 * entities it is about), breadcrumbs, and the glossary as a DefinedTermSet.
 * Machine-readable structure for search engines and AI answer engines. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      url: PAGE_URL,
      name: "Scottish Baronies, Explained",
      description:
        "An evidence-based FAQ on the Baronage of Scotland: why “feudal baron” is out of date since the 2004 reform, and what the law and institutional sources actually say.",
      inLanguage: "en-GB",
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
      author: org,
      publisher: org,
      about: [
        {
          "@type": "Legislation",
          name: "Abolition of Feudal Tenure etc. (Scotland) Act 2000",
          legislationIdentifier: "2000 asp 5",
          sameAs: [
            "https://www.legislation.gov.uk/asp/2000/5/contents",
            "https://en.wikipedia.org/wiki/Abolition_of_Feudal_Tenure_etc._(Scotland)_Act_2000",
          ],
        },
        {
          "@type": "GovernmentOrganization",
          name: "Court of the Lord Lyon",
          sameAs: [
            "https://www.courtofthelordlyon.scot",
            "https://en.wikipedia.org/wiki/Court_of_the_Lord_Lyon",
          ],
        },
      ],
      mainEntity: orderedFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Scottish Baronies, Explained", item: PAGE_URL },
      ],
    },
    {
      "@type": "DefinedTermSet",
      "@id": `${PAGE_URL}#glossary`,
      name: "Glossary of Scottish baronial terms",
      hasDefinedTerm: glossary.map((g) => ({
        "@type": "DefinedTerm",
        name: g.term,
        description: g.def,
        inDefinedTermSet: `${PAGE_URL}#glossary`,
      })),
    },
  ],
};

export default function BaroniesExplainedPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-navy-deep text-parchment-50 texture-saltire">
        <Container className="py-10 text-center sm:py-12">
          <p className="rise eyebrow eyebrow--light">Frequently Asked Questions</p>
          <h1
            className="rise mt-4 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            Scottish Baronies, Explained
          </h1>
          <p
            className="rise mx-auto mt-5 max-w-3xl text-xl leading-relaxed text-parchment-100 sm:text-2xl"
            style={{ animationDelay: "0.16s" }}
          >
            Distinct from peerages, altered by legislation in 2004, and often described with terminology that is now
            out of date. What the law and the institutional sources actually say.
          </p>
          <p
            className="rise mt-6 font-sans text-[0.7rem] uppercase tracking-[0.18em] text-parchment-200/60"
            style={{ animationDelay: "0.24s" }}
          >
            Last reviewed {REVIEWED_LABEL} · Sourced from primary legislation and the Court of the Lord Lyon
          </p>
        </Container>
      </section>

      <Section tone="parchment">
        <Container size="prose">
          <nav
            aria-label="On this page"
            className="mb-14 rounded-sm border border-parchment-300/70 bg-parchment-50/70 px-6 py-6 sm:px-8"
          >
            <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
              On this page
            </p>
            <ol className="mt-4 space-y-2.5">
              {orderedFaqs.map((f, i) => (
                <li key={f.q} className="flex gap-3 leading-snug">
                  <span className="font-sans text-sm tabular-nums text-gold-deep/70">{i + 1}.</span>
                  <a href={`#${slugify(f.q)}`} className={intLink}>
                    {f.q}
                  </a>
                </li>
              ))}
              <li className="flex gap-3 leading-snug">
                <span className="font-sans text-sm tabular-nums text-gold-deep/70">{orderedFaqs.length + 1}.</span>
                <a href="#glossary" className={intLink}>
                  Glossary of terms
                </a>
              </li>
            </ol>
          </nav>
          <div className="space-y-14">
            {orderedFaqs.map((f, i) => {
              const slug = slugify(f.q);
              return (
              <article
                key={f.q}
                id={slug}
                className={`scroll-mt-32 lg:scroll-mt-44 ${i > 0 ? "border-t border-parchment-300/70 pt-12" : ""}`}
              >
                <h2 className="font-display text-2xl text-navy sm:text-3xl">{f.q}</h2>
                <div className="mt-5 leading-relaxed text-ink-soft">{f.body}</div>
                <p className="mt-6">
                  <Footnote
                    n={i + 1}
                    heading="Authority & sources"
                    label="Authority & sources"
                    triggerClassName="cursor-pointer border-0 bg-transparent p-0 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-gold-deep underline decoration-dotted decoration-gold/40 underline-offset-4 transition-colors hover:text-oxblood"
                  >
                    {f.authority}
                  </Footnote>
                </p>
                {/* Crawlable copy of the citations — the pop-up renders its content only when opened. */}
                <p hidden>Authority: {f.authority}</p>
              </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="parchment" className="border-t border-parchment-300/60">
        <Container size="prose">
          <h2 id="glossary" className="scroll-mt-32 font-display text-2xl text-navy sm:text-3xl lg:scroll-mt-44">
            Glossary of terms
          </h2>
          <GoldRule className="mt-5" align="start" />
          <dl className="mt-8 space-y-6">
            {glossary.map((g) => (
              <div key={g.term}>
                <dt className="font-display text-lg text-navy">{g.term}</dt>
                <dd className="mt-1.5 leading-relaxed text-ink-soft">
                  <p>{g.def}</p>
                  {g.note && <p className="mt-1.5 font-sans text-sm text-ink-soft/80">{g.note}</p>}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="cream" className="border-t border-parchment-300/60">
        <Container size="prose">
          <h2 className="font-display text-2xl text-navy sm:text-3xl">Primary sources</h2>
          <GoldRule className="mt-5" align="start" />
          <ul className="mt-8 space-y-3.5 leading-relaxed text-ink-soft">
            {sources.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rotate-45 bg-gold" aria-hidden />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 border-t border-parchment-300/70 pt-6 font-sans text-base leading-relaxed text-ink-soft">
            This page is intended as general education on Scots nobiliary law and does not address the history or
            succession of any individual title. Readers researching a specific barony should{" "}
            <a href="mailto:secretary@baronage.com" className={intLink}>
              contact us
            </a>{" "}
            to consult with our genealogist, the relevant charters, and independent genealogical scholarship.
          </p>
        </Container>
      </Section>

      <Section tone="navyDeep" className="text-center">
        <Container size="prose">
          <h2 className="text-3xl text-parchment-50 sm:text-4xl">Explore further.</h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-parchment-200/85">
            The history of the baronage, the Roll of Scottish Barons, and the correct forms of address.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/history" variant="gold">
              The History
            </ButtonLink>
            <ButtonLink href="/the-roll" variant="outlineLight">
              The Roll
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
