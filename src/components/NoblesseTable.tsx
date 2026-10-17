/**
 * "The Noblesse of Scotland, in order of precedence": the ranks with what Scots law and English usage call each
 * (owner 2026-10-17, wording approved in the papers chat; keep it exactly; sources in the FAQ's "Authority & sources").
 * A <table> at ≥640px and a stacked, labelled layout below that width so the page never scrolls sideways on phones.
 * The barons' row is marked, as on the ladder.
 */
const ROWS: { rank: string; scots: string; english: string; baron?: boolean }[] = [
  { rank: "Peers", scots: "Titled nobility; noblemen; peers (the “great barons” holding baronies)", english: "Nobility; peers" },
  { rank: "Baronets", scots: "Hereditary knighthood; noblemen", english: "Commoners in law; often counted among the aristocracy" },
  { rank: "Knights", scots: "Knighthood; noblemen", english: "Commoners, gentry" },
  {
    rank: "Barons",
    scots: "Titled nobility; noblemen; also called untitled nobility (the Lyon Court’s “minor barons”)",
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

export function NoblesseTable() {
  return (
    <figure className="my-2">
      <figcaption className="text-center">
        <span className="block font-display text-2xl leading-tight text-navy sm:text-3xl">The Noblesse of Scotland</span>
        <span className="mt-1 block font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
          in order of precedence
        </span>
      </figcaption>
      <div className="mt-5 overflow-hidden rounded-sm border border-parchment-300/70 bg-parchment-50">
        {/* ≥ 640px: semantic table */}
        <table className="hidden w-full table-fixed border-collapse text-sm sm:table sm:text-[0.95rem]">
          <caption className="sr-only">The Noblesse of Scotland, in order of precedence</caption>
          <colgroup>
            <col className="w-[7%]" />
            <col className="w-[21%]" />
            <col className="w-[42%]" />
            <col className="w-[30%]" />
          </colgroup>
          <thead>
            <tr className="bg-navy text-parchment-50">
              {["#", "Rank", "Scots law", "English usage"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-3 py-3.5 text-left align-bottom font-sans text-[0.72rem] font-semibold uppercase tracking-[0.1em] sm:px-4 sm:text-xs"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/25">
            {ROWS.map((r, i) => (
              <tr
                key={r.rank}
                className={r.baron ? "bg-navy text-parchment-50" : i % 2 === 0 ? "bg-white text-navy" : "bg-parchment-50 text-navy"}
              >
                <td className="px-3 py-3 align-top sm:px-4">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full font-sans text-sm font-semibold ${
                      r.baron ? "bg-gold text-navy-deep" : "border border-gold/60 text-gold-deep"
                    }`}
                  >
                    {i + 1}
                  </span>
                </td>
                <th scope="row" className="px-3 py-3 text-left align-top font-display text-lg font-normal leading-tight sm:px-4">
                  <Rank name={r.rank} />
                </th>
                <td className={`px-3 py-3 align-top leading-snug sm:px-4 ${r.baron ? "text-parchment-50" : "text-ink"}`}>{r.scots}</td>
                <td className={`px-3 py-3 align-top leading-snug sm:px-4 ${r.baron ? "text-parchment-200" : "text-ink-soft"}`}>{r.english}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* < 640px: stacked */}
        <ol className="divide-y divide-gold/25 sm:hidden">
          {ROWS.map((r, i) => (
            <li key={r.rank} className={`px-4 py-4 ${r.baron ? "bg-navy text-parchment-50" : i % 2 === 0 ? "bg-white text-navy" : "bg-parchment-50 text-navy"}`}>
              <p className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={`flex h-7 w-7 flex-none items-center justify-center rounded-full font-sans text-sm font-semibold ${
                    r.baron ? "bg-gold text-navy-deep" : "border border-gold/60 text-gold-deep"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="font-display text-xl leading-tight">
                  <Rank name={r.rank} />
                </span>
              </p>
              <p className="mt-2 text-[0.95rem] leading-snug">
                <span className={`mr-1.5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.1em] ${r.baron ? "text-gold-light" : "text-gold-deep"}`}>
                  Scots law
                </span>
                <span className={r.baron ? "text-parchment-50" : "text-ink"}>{r.scots}</span>
              </p>
              <p className="mt-1.5 text-[0.95rem] leading-snug">
                <span className={`mr-1.5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.1em] ${r.baron ? "text-gold-light" : "text-gold-deep"}`}>
                  English usage
                </span>
                <span className={r.baron ? "text-parchment-200" : "text-ink-soft"}>{r.english}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
