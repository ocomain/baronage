import { Fragment, type ReactNode } from "react";
import { R } from "@/components/RankRefs";
import { GlossaryTerm } from "@/components/Glossary";

/**
 * "The Noblesse of Scotland, in order of precedence": the ranks with what Scots law and English usage call each
 * (owner 2026-10-17, wording approved in the papers chat and edited by him the same day; keep it exactly; each point
 * carries a numbered reference to its source, from RankRefs, at his request the same evening). It replaces the ladder's list of ranks (owner: "it's meant to be one combined
 * table"): the peers keep their line of ranks and the barons' row carries the chapeau. No number column (owner).
 * The heading is part of the table, in a navy title band (owner: "make it part of the table and please make the table
 * look beautifully designed"); a fine double gold frame, gold small-capital column heads, the barons' row in a light
 * gold tint with a gold edge (owner: dark blue there was hard to read).
 * A <table> at ≥640px and a stacked, labelled layout below that width so the page never scrolls sideways on phones.
 */
/** The two defunct terms in the barons' row are struck through (owner 2026-10-17). */
const gone = (t: string) => <s className="decoration-ink/70">{t}</s>;

// Glossary words in the table link to their entry, with the short ones as a tooltip on a computer (owner 2026-10-18).
/** `commons`: the one row outside the Noblesse, set below a line and in plain grey (owner 2026-10-18). */
const ROWS: { rank: string; note?: ReactNode; scots: ReactNode; english: string; baron?: boolean; commons?: boolean; ref: number }[] = [
  {
    rank: "Peers",
    note: (
      <>
        Dukes, marquis, earls, viscounts, <GlossaryTerm term="Lord of Parliament">lords of parliament</GlossaryTerm> in the
        peerage of Scotland
      </>
    ),
    scots: "Titled nobility; noblemen; peers (“greater barons” also holding baronies)",
    english: "Nobility; peers",
    ref: 5,
  },
  // Notes under Baronets and Knights, and "gentry" for baronets (owner 2026-10-18, "Yes agreed with all", via the papers chat)
  {
    rank: "Baronets",
    note: "Baronets of Nova Scotia, the baronetage of Scotland",
    scots: (
      <>
        <GlossaryTerm term="Baronetcy">Baronetcy</GlossaryTerm> (hereditary knighthood); noblemen
      </>
    ),
    english: "Commoners in law; gentry, often counted among the aristocracy",
    ref: 6,
  },
  { rank: "Knights", note: "Knights of the Thistle and knights bachelor", scots: <><GlossaryTerm term="Knighthood">Knighthood</GlossaryTerm> (for life); noblemen</>, english: "Commoners, gentry", ref: 7 },
  {
    rank: "Barons",
    note: "Barons and barons of higher dignities in the baronage of Scotland",
    scots: (
      <>
        Titled nobility; noblemen; “<GlossaryTerm term="Minor baron">minor barons</GlossaryTerm>”; before 1943 sometimes incorrectly {gone("untitled nobility")},
        and before 2004 {gone("feudal barons")} (both terms are now defunct)
      </>
    ),
    english: "Commoners, gentry",
    baron: true,
    ref: 8,
  },
  { rank: "Esquires/Chiefs/Lairds", scots: "Untitled nobility if armigerous", english: "Commoners, gentry", ref: 9 },
  { rank: "Gentlemen", scots: "Untitled nobility if armigerous", english: "Commoners, gentry", ref: 9 },
  { rank: "Everyone else", scots: "The commons (Mackenzie: “Plebeians”)", english: "Commoners", commons: true, ref: 10 },
];

/** Rank names that have an entry in the glossary. */
const RANK_TERMS: Record<string, string> = { Peers: "Peerage", Esquires: "Esquire", Lairds: "Laird", Gentlemen: "Gentleman", Chiefs: "Chief" };

/** "Esquires/Chiefs/Lairds" may wrap after a slash. */
function Rank({ name }: { name: string }) {
  const parts = name.split("/");
  return (
    <>
      {parts.map((part, i) => (
        <span key={part}>
          {RANK_TERMS[part] ? <GlossaryTerm term={RANK_TERMS[part]}>{part}</GlossaryTerm> : part}
          {i < parts.length - 1 && (
            <>
              /<wbr />
            </>
          )}
        </span>
      ))}
    </>
  );
}

/** The rank's name, with the peers' line of ranks or the barons' chapeau under it. */
function RankCell({ r }: { r: (typeof ROWS)[number] }) {
  return (
    <>
      <span className={`block font-display leading-tight ${r.commons ? "text-ink-soft/80" : "text-navy"} ${r.baron ? "text-[1.45rem] font-semibold" : "text-[1.3rem]"}`}>
        <Rank name={r.rank} />
      </span>
      {r.note && <span className="mt-1 block font-sans text-[0.72rem] leading-snug text-ink-soft">{r.note}</span>}
      {r.baron && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/images/guide/chapeau-gules.svg" alt="The chapeau" width={72} height={36} loading="lazy" className="mt-2 block h-8 w-auto" />
      )}
    </>
  );
}

/** The title band: the heading as part of the table. */
function Title() {
  return (
    <>
      <span className="block font-display text-[1.75rem] leading-tight text-parchment-50 sm:text-[2.1rem]">
        The Noblesse of Scotland
        <R n={1} light />
      </span>
      <span className="mt-2 flex items-center justify-center gap-3">
        <span aria-hidden className="h-px w-8 bg-gold/70 sm:w-12" />
        <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-light sm:text-[0.72rem]">
          in order of precedence
          {/* the note number at a readable size: inside this small line it would be about 7px (owner 2026-10-17: "this is old people looking at the site") */}
          <R n={2} light big />
        </span>
        <span aria-hidden className="h-px w-8 bg-gold/70 sm:w-12" />
      </span>
      {/* The line for every rank below the peers, moved up from under the table and made punchier (owner 2026-10-17:
          "better at the top under 'in order of precedence'"; first approved in the papers chat; not to mention passports). */}
      <span className="mx-auto mt-3 block max-w-xl text-balance font-serif text-[1.1rem] italic leading-snug text-parchment-100">
        In English usage all below a peer are commoners; but UK law includes Scots law.
        <R n={3} light big />
      </span>
    </>
  );
}

// Every row white but the barons'; the parchment Baronets and Gentlemen rows ran into the "Not of the Noblesse" line
// (owner 2026-10-18: "this mismatches with same colouring" … "maybe have white background for Gentlemen and Baronets rows").
const rowTone = (r: (typeof ROWS)[number]) => (r.baron ? "bg-gold/[0.14]" : "bg-white");

/** The line between the Noblesse and the commons (owner 2026-10-18: "should the table visually show that \"Everyone else\"
 * is not in the Noblesse of Scotland" … "yes"). Parchment between white rows. */
function NotNoblesse() {
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden className="h-px flex-1 bg-gold/60" />
      <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold-deep">Not of the Noblesse</span>
      <span aria-hidden className="h-px flex-1 bg-gold/60" />
    </span>
  );
}

const headCell = "px-5 py-3 text-left align-bottom font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-deep";
const label = "mr-1.5 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-gold-deep";

export function NoblesseTable() {
  return (
    <>
    <figure className="my-2 border border-gold/60 bg-parchment-50 p-1 shadow-[0_22px_48px_-30px_rgba(10,16,36,0.55)]">
      <div className="border border-gold/35">
        {/* ≥ 640px: semantic table, the heading in its first row */}
        <table aria-label="The Noblesse of Scotland, in order of precedence" className="hidden w-full table-fixed border-collapse text-[0.95rem] sm:table">
          <colgroup>
            <col className="w-[27%]" />
            <col className="w-[43%]" />
            <col className="w-[30%]" />
          </colgroup>
          <thead>
            <tr className="bg-navy">
              <th colSpan={3} scope="colgroup" className="px-6 pb-5 pt-6 text-center font-normal">
                <Title />
              </th>
            </tr>
            <tr className="border-b border-gold/40 bg-parchment-100">
              <th scope="col" className={headCell}>Rank</th>
              <th scope="col" className={`${headCell} border-l border-gold/20`}>Scots law</th>
              <th scope="col" className={`${headCell} border-l border-gold/20`}>
                English / UK usage
                <R n={4} big />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/20">
            {ROWS.map((r, i) => (
              <Fragment key={r.rank}>
              {r.commons && (
                <tr className="border-t-2 border-gold/50 bg-parchment-50">
                  <td colSpan={3} className="px-5 pb-1.5 pt-3">
                    <NotNoblesse />
                  </td>
                </tr>
              )}
              <tr className={rowTone(r)}>
                <th
                  scope="row"
                  className={`py-4 pr-5 text-left align-top font-normal ${r.baron ? "border-l-4 border-gold pl-4" : "pl-5"}`}
                >
                  <RankCell r={r} />
                </th>
                <td className={`border-l border-gold/20 px-5 py-4 align-top leading-relaxed ${r.commons ? "text-ink-soft" : "text-ink"}`}>
                  {r.scots}
                  <R n={r.ref} big />
                </td>
                <td className="border-l border-gold/20 px-5 py-4 align-top leading-relaxed text-ink-soft">{r.english}</td>
              </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
        {/* < 640px: the same title band, then one card per rank */}
        <div className="sm:hidden">
          <p className="bg-navy px-4 pb-4 pt-5 text-center">
            <Title />
          </p>
          <ul className="divide-y divide-gold/20 border-t border-gold/40">
            {ROWS.map((r, i) => (
              <Fragment key={r.rank}>
              {r.commons && (
                <li className="border-t-2 border-gold/50 bg-parchment-50 px-4 pb-1.5 pt-3">
                  <NotNoblesse />
                </li>
              )}
              <li className={`py-4 pr-4 ${rowTone(r)} ${r.baron ? "border-l-4 border-gold pl-3" : "pl-4"}`}>
                <RankCell r={r} />
                <p className="mt-2.5 text-[0.95rem] leading-snug">
                  <span className={label}>Scots law</span>
                  <span className={r.commons ? "text-ink-soft" : "text-ink"}>{r.scots}</span>
                  <R n={r.ref} big />
                </p>
                <p className="mt-1.5 text-[0.95rem] leading-snug">
                  <span className={label}>
                    English / UK usage
                    {i === 0 && <R n={4} big />}
                  </span>
                  <span className="text-ink-soft">{r.english}</span>
                </p>
              </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </figure>
    {/* Innes of Learney's sentence first, then the two lines (owner 2026-10-18: "Put the Innes quote before the 1945 text"). */}
    <p className="mx-auto mt-6 max-w-md text-center font-serif text-lg italic leading-relaxed text-navy">
      “Their precedence was thus after Knights and before Esquires.”
      <R n={11} />
      <span className="mt-1 block font-sans text-[0.72rem] font-semibold not-italic uppercase tracking-[0.16em] text-gold-deep">
        Innes of Learney, 1945
      </span>
    </p>
    {/* Two lines under the table (owner 2026-10-18, approved word for word in the papers chat). Not to mention juries. */}
    <div className="mx-auto mt-5 max-w-2xl space-y-3 font-sans text-[0.95rem] leading-relaxed text-ink">
      <p>
        In 1945 the Lyon Court declared a Scottish baron “of rank equivalent to that denominated{" "}
        <GlossaryTerm term="Hoch-adel">Hoch Adel</GlossaryTerm>”, the
        Continent’s high nobility.
        <R n={12} big />
      </p>
      <p>
        In Scotland, greater or lesser, all are equally noble: “all Peers to one another” (Mackenzie, 1680). Rank decided
        who could fight or marry whom, yet a baron, even a gentleman as untitled nobility, counted as a duke’s peer: he
        could challenge him to a duel and marry his daughter.
        <R n={13} big />
      </p>
    </div>
    </>
  );
}
