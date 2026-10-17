/**
 * "The Noblesse of Scotland, in order of precedence": the ranks with what Scots law and English usage call each
 * (owner 2026-10-17, wording approved in the papers chat and edited by him the same day; keep it exactly; sources in
 * the FAQ's "Authority & sources"). It replaces the ladder's list of ranks (owner: "it's meant to be one combined
 * table"): the peers keep their line of ranks and the barons' row carries the chapeau. No number column (owner).
 * The heading is part of the table, in a navy title band (owner: "make it part of the table and please make the table
 * look beautifully designed"); a fine double gold frame, gold small-capital column heads, the barons' row in a light
 * gold tint with a gold edge (owner: dark blue there was hard to read).
 * A <table> at ≥640px and a stacked, labelled layout below that width so the page never scrolls sideways on phones.
 */
const ROWS: { rank: string; note?: string; scots: string; english: string; baron?: boolean }[] = [
  {
    rank: "Peers",
    note: "Dukes, marquis, earls, viscounts, lords of parliament in the peerage of Scotland",
    scots: "Titled nobility; noblemen; peers (“greater barons” also holding baronies)",
    english: "Nobility; peers",
  },
  { rank: "Baronets", scots: "Baronetcy (hereditary knighthood); noblemen", english: "Commoners in law; often counted among the aristocracy" },
  { rank: "Knights", scots: "Knighthood (for life); noblemen", english: "Commoners, gentry" },
  {
    rank: "Barons",
    note: "Barons and barons of higher dignities in the baronage of Scotland",
    scots:
      "Titled nobility; noblemen; the Lyon Court’s “minor barons”; before 1943 sometimes called untitled nobility, and before 2004 feudal barons (both terms now defunct)",
    english: "Commoners, gentry",
    baron: true,
  },
  { rank: "Esquires/Chiefs/Lairds", scots: "Untitled nobility if armigerous", english: "Commoners, gentry" },
  { rank: "Gentlemen", scots: "Untitled nobility if armigerous", english: "Commoners, gentry" },
  { rank: "Everyone else", scots: "The commons (Mackenzie: “Plebeians”)", english: "Commoners" },
];

/** "Esquires/Chiefs/Lairds" may wrap after a slash. */
function Rank({ name }: { name: string }) {
  const parts = name.split("/");
  return (
    <>
      {parts.map((part, i) => (
        <span key={part}>
          {part}
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
      <span className={`block font-display leading-tight text-navy ${r.baron ? "text-[1.45rem] font-semibold" : "text-[1.3rem]"}`}>
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
      <span className="block font-display text-[1.75rem] leading-tight text-parchment-50 sm:text-[2.1rem]">The Noblesse of Scotland</span>
      <span className="mt-2 flex items-center justify-center gap-3">
        <span aria-hidden className="h-px w-8 bg-gold/70 sm:w-12" />
        <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-light sm:text-[0.72rem]">
          in order of precedence
        </span>
        <span aria-hidden className="h-px w-8 bg-gold/70 sm:w-12" />
      </span>
    </>
  );
}

const rowTone = (r: (typeof ROWS)[number], i: number) =>
  r.baron ? "bg-gold/[0.14]" : i % 2 === 0 ? "bg-white" : "bg-parchment-50";

const headCell = "px-5 py-3 text-left align-bottom font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-deep";
const label = "mr-1.5 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-gold-deep";

export function NoblesseTable() {
  return (
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
              <th scope="col" className={`${headCell} border-l border-gold/20`}>English / UK usage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/20">
            {ROWS.map((r, i) => (
              <tr key={r.rank} className={rowTone(r, i)}>
                <th
                  scope="row"
                  className={`py-4 pr-5 text-left align-top font-normal ${r.baron ? "border-l-4 border-gold pl-4" : "pl-5"}`}
                >
                  <RankCell r={r} />
                </th>
                <td className="border-l border-gold/20 px-5 py-4 align-top leading-relaxed text-ink">{r.scots}</td>
                <td className="border-l border-gold/20 px-5 py-4 align-top leading-relaxed text-ink-soft">{r.english}</td>
              </tr>
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
              <li key={r.rank} className={`py-4 pr-4 ${rowTone(r, i)} ${r.baron ? "border-l-4 border-gold pl-3" : "pl-4"}`}>
                <RankCell r={r} />
                <p className="mt-2.5 text-[0.95rem] leading-snug">
                  <span className={label}>Scots law</span>
                  <span className="text-ink">{r.scots}</span>
                </p>
                <p className="mt-1.5 text-[0.95rem] leading-snug">
                  <span className={label}>English / UK usage</span>
                  <span className="text-ink-soft">{r.english}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
