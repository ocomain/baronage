import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, Section } from "@/components/primitives";

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
    title: "Scottish Baronies, Explained",
    description:
      "Distinct from peerages, altered fundamentally by legislation in 2004, and often described with out-of-date terminology. What the law and the institutional sources actually say.",
    url: "/scottish-baronies-explained/",
  },
};

const extLink =
  "text-gold-deep underline decoration-gold/40 underline-offset-2 transition-colors hover:text-oxblood";
const intLink =
  "text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:text-oxblood-deep";

/** One source of truth for questions & answers: the visible page and the
 * FAQPage JSON-LD are both generated from this array, so they cannot drift. */
const faqs: { q: string; a: string; body: ReactNode; authority: ReactNode }[] = [
  {
    q: "Is a Scottish baron a nobleman?",
    a: "Yes. A holder of a barony within the Baronage of Scotland is a member of Scotland's titled nobility, though not a peer. The Scottish equivalent of an English peerage baron is the higher title Lord of Parliament (the lowest rank of the Scottish Peerage, which ranks in order of Lord, Viscount, Earl, Marquis, Duke); a Scottish baron is noble but sits below the peerage — correctly described a minor baron, the term used by the Lord Lyon Court itself for this rank of the ancient nobility. The prefix “The Much Honoured” is the honorific traditionally used to distinguish a Scottish baron from a peer.",
    body: (
      <>
        <p>
          Yes. A holder of a barony within the Baronage of Scotland is a member of Scotland’s{" "}
          <strong className="font-semibold text-navy">titled nobility</strong>, though not a peer. The distinction
          matters: the Scottish equivalent of an English peerage baron is the higher title{" "}
          <strong className="font-semibold text-navy">Lord of Parliament</strong> (the lowest rank of the Scottish
          Peerage, which ranks in order of Lord, Viscount, Earl, Marquis, Duke). A Scottish baron is noble but sits
          below the peerage — correctly described a{" "}
          <strong className="font-semibold text-navy">minor baron</strong>, the term used by the Lord Lyon Court
          itself for this rank of the ancient nobility. The prefix{" "}
          <strong className="font-semibold text-navy">“The Much Honoured”</strong> is the honorific traditionally
          used to distinguish a Scottish baron from a peer.
        </p>
      </>
    ),
    authority: (
      <>
        Court of the Lord Lyon, Petition of Maclean of Ardgour (26 February 1943): the Minor Barons of Scotland are
        recognised in the nobiliary court and the Court of Session as a <em>“titled nobility”</em> and form part of the
        ancient nobility of Scotland.
      </>
    ),
  },
  {
    q: "Is “Scottish feudal barony” or “feudal baron” or “feudal title” the correct term today?",
    a: "No longer. Until 2004 these were properly called feudal baronies, because the dignity was attached to land held of the Crown. The Abolition of Feudal Tenure etc. (Scotland) Act 2000, in force 28 November 2004, ended the feudal system and severed the dignity from the land. Extant baronies were expressly preserved as personal, non-territorial dignities — so “feudal” is now out of date as a descriptor of a living barony. Lord Lyon Sellar in 2009 accordingly termed them “quondam feudal baronies” — quondam meaning “formerly”. For the titleholder, baron or lord or earl in the Baronage of Scotland is the correct modern description.",
    body: (
      <>
        <p>
          <strong className="font-semibold text-navy">No longer.</strong> Until 2004 these were properly called
          feudal baronies, because the dignity was attached to land held of the Crown. The{" "}
          <em>Abolition of Feudal Tenure etc. (Scotland) Act 2000</em>, which came into force on 28 November 2004,
          ended the feudal system and severed the dignity from the land.
          Extant baronies were expressly preserved, but the word <em>“feudal”</em> is now dated as a descriptor of a
          living barony — the titles were retained specifically as{" "}
          <strong className="font-semibold text-navy">personal, non-territorial dignities</strong>.
        </p>
        <p className="mt-4">
          Lord Lyon Sellar, in 2009, accordingly termed them{" "}
          <strong className="font-semibold text-navy">“quondam feudal baronies”</strong> —{" "}
          <em>quondam</em> meaning “formerly”. The historically precise usage is thus “quondam feudal” for the
          pre-2004 character of a barony, and simply “barony” or “personal dignity” for its present one. For the
          titleholder,{" "}
          <strong className="font-semibold text-navy">baron or lord or earl in the Baronage of Scotland</strong> is
          the correct modern description.
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
        (2019).
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
        non-territorial dignity. Scottish Law Commission, <em>Report on the Abolition of the Feudal System</em>.
      </>
    ),
  },
  {
    q: "Can a Scottish barony be bought and sold?",
    a: "In law, yes: since the 2004 reform baronies are freely transferable dignities and may pass by inheritance, bequest, gift, or assignation. In practice the market is very small — the Custodian's annual reports of the Scottish Barony Register record on the order of one to two transfers in a typical year, and a recorded transfer is not necessarily a commercial sale, since family assignations and bequests pass through the same register. Baronies generally remain within families across generations. Where sales have occurred the sums indicate scarcity value: the Scottish Law Commission, from 1997 market evidence, estimated a barony of no particular distinction at approximately £60,000, and in 2002 the Barony of MacDonald of the Isle of Skye was reported as offered for sale at more than £1 million.",
    body: (
      <>
        <p>
          This is widely misunderstood in both directions. In law,{" "}
          <strong className="font-semibold text-navy">yes</strong>: since the 2004 reform baronies are freely
          transferable dignities and may pass by inheritance, bequest, gift, or assignation, with the transferee
          becoming the new holder.
        </p>
        <p className="mt-4 border-l-2 border-gold/50 pl-4 text-[0.95em] italic">
          A note from this site: a growing number of barons wish to reduce the commercial aspect of baronies. By
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
          <a href="https://scottishbaronyregister.org" target="_blank" rel="noopener noreferrer" className={extLink}>
            Scottish Barony Register
          </a>
          , the private register that records the legal transfer of baronies, publishes{" "}
          <a
            href="https://scottishbaronyregister.org/annual-reports"
            target="_blank"
            rel="noopener noreferrer"
            className={extLink}
          >
            annual reports of the Custodian
          </a>{" "}
          (publicly available for 2021–2025); these record on the order of{" "}
          <strong className="font-semibold text-navy">one to two transfers in a typical year</strong> — and a recorded
          transfer is not necessarily a commercial sale, since assignations within families and by bequest can
          sometimes pass through the same register. Baronies generally remain within families across generations; a barony can only be bought
          if a holder chooses to part with one, and few do. Families are not selling their heirlooms.
        </p>
        <p className="mt-4">
          Where sales have occurred, the sums indicate scarcity value. The Scottish Law Commission, working from 1997
          market evidence, estimated a barony “of no particular distinction” at approximately £60,000, and in 2002 the
          Barony of MacDonald of the Isle of Skye was reported to have been offered for sale at more than £1 million.
          Independent accounts also note that a number of post-2004 transfers have involved purchasers from outside
          Scotland and the United Kingdom.
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
    q: "What is The Pledge, and what does it change?",
    a: "The Pledge is a declaration of honour by which a baron commits their barony to hereditary descent within the family line. It cannot legally alter a barony — it operates in honour rather than law — but its practical effect is on future recognition upon the Roll of Scottish Barons should a pledged barony later be conveyed outside the family. In this the Roll follows the two official Rolls. The Roll of the Peerage separates recognition from legal title: Andrew Mountbatten Windsor remains Duke of York in law, since only an Act of Parliament can extinguish a peerage, yet the King's removal of his name from that Roll in 2025 withdrew official recognition of the title — not his legal entitlement to it. The Roll of the Baronetage goes further: no one is received or styled as a baronet unless entered upon it. The Roll of Scottish Barons is modelled between the two — recognition is paramount, as with the baronetage, while legal title is never affected, as with the peerage.",
    body: (
      <>
        <p>
          <Link href="/pledge" className={intLink}>
            The Pledge
          </Link>{" "}
          is a declaration of honour by which a baron commits their barony to{" "}
          <strong className="font-semibold text-navy">hereditary descent</strong> within the family line. A growing
          number of barons have taken it, wishing to reduce the commercial transfer of baronies. It cannot legally
          alter a barony — it operates in honour rather than law — but its practical effect is on future{" "}
          <strong className="font-semibold text-navy">recognition</strong> upon the Roll of Scottish Barons, should a
          pledged barony later be conveyed outside the family.
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
    a: "Scottish titles have historically had more liberal succession rules than their English counterparts, and can descend through female lines. The earliest baronies carried remainders to “heirs and assignees”. Before the Union, titles were often resigned to the Crown and reissued with a new destination; the Conveyancing (Scotland) Act 1874 ended Crown confirmation charters, after which assignation by legal conveyance and registration established the new baron. Since 2004 the barony is a non-territorial personal dignity that retains the old remainder to heirs and assignees: it can be transferred or bequeathed by will, and otherwise descends under the pre-1964 rules preserved for titles and dignities.",
    body: (
      <>
        <p>
          Scottish titles have historically had more liberal succession rules than their English counterparts, and can
          descend through female lines. The earliest baronies, like other early dignities, carried remainders to{" "}
          <strong className="font-semibold text-navy">“heirs and assignees”</strong> — because all noble titles,
          including the higher dignities that became today’s peerage, were originally territorial: they ran with the
          owner of the estate rather than the person. Over time they evolved into personal dignities or peerages
          attached to the individual.
        </p>
        <p className="mt-4">
          Before the Union, Scotland operated differently from England. Titles were often resigned to the Crown and
          reissued with a new destination — for instance to a kinsman or a member of the clan — giving the system a
          flexibility the English peerage lacked. When a barony passed to a new family, the practice was to resign the
          title and obtain reconfirmation of the feudal grant from the Crown. The Conveyancing (Scotland) Act 1874
          ended this practice, and Crown confirmation charters ceased; thereafter it was assignation by legal
          conveyance and registration in the Register of Sasines that established the new baron.
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
          carries no formal status in law.
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
];

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
  <>Court of the Lord Lyon, Petition of Maclean of Ardgour (26 February 1943).</>,
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
      rel="noopener noreferrer"
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function BaroniesExplainedPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
        </Container>
      </section>

      <Section tone="parchment">
        <Container size="prose">
          <div className="space-y-14">
            {faqs.map((f, i) => {
              const slug = f.q
                .toLowerCase()
                .replace(/[“”"?]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");
              return (
              <Reveal key={f.q} delay={Math.min(i * 0.04, 0.16)}>
                <article
                  id={slug}
                  className={`scroll-mt-28 ${i > 0 ? "border-t border-parchment-300/70 pt-12" : ""}`}
                >
                  <h2 className="font-display text-2xl text-navy sm:text-3xl">{f.q}</h2>
                  <div className="mt-5 leading-relaxed text-ink-soft">{f.body}</div>
                  <p className="mt-6 border-l-2 border-gold/50 pl-4 font-sans text-sm leading-relaxed text-muted">
                    <span className="font-semibold uppercase tracking-[0.14em] text-gold-deep">Authority:</span>{" "}
                    {f.authority}
                  </p>
                </article>
              </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="cream" className="border-t border-parchment-300/60">
        <Container size="prose">
          <Reveal>
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
            <p className="mt-10 border-t border-parchment-300/70 pt-6 font-sans text-sm leading-relaxed text-muted">
              This page is intended as general education on Scots nobiliary law and does not address the history or
              succession of any individual title. Readers researching a specific barony should consult the Lord Lyon,
              the relevant charters, and independent genealogical scholarship.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="navyDeep" className="text-center">
        <Container size="prose">
          <Reveal>
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
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
