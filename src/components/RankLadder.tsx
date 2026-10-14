import Link from "next/link";

/**
 * The order of rank drawn as a ladder, the baron's rung marked, with the four dated records it rests on
 * (owner 2026-10-13: precedence "with visuals instead of many words"). Words are kept to the names of the
 * ranks, one sentence of Innes of Learney's, and one line for each date; the sources are listed by the page.
 */
const RUNGS: { name: string; note?: string; baron?: boolean }[] = [
  { name: "Peers", note: "Dukes, marquesses, earls, viscounts, lords of parliament" },
  { name: "Baronets" },
  { name: "Knights" },
  { name: "Barons", baron: true },
  { name: "Esquires" },
  { name: "Gentlemen" },
];

const DATES: { year: string; text: string }[] = [
  { year: "1625", text: "The King’s patents set baronets before knights, barons, esquires and gentlemen." },
  { year: "1672", text: "The Lyon Register enters baronets, knights and barons together, ahead of the gentlemen." },
  { year: "1905", text: "The King’s scale names “Barons of Scotland” among the peers, and no other barons." },
  { year: "2000", text: "Parliament keeps “any quality or precedence” that goes with a barony." },
];

/** What each rank shows above the shield: the peers' coronets of rank, each drawn with its crimson cap turned up with
 * ermine (owner 2026-10-14, to sit with the chapeau), and the baron's chapeau in a panel of its own. */
const CORONETS: { src: string; rank: string; text: string }[] = [
  { src: "/images/guide/coronet-duke.svg", rank: "Duke", text: "Eight strawberry leaves" },
  { src: "/images/guide/coronet-marquess.svg", rank: "Marquess", text: "Four leaves, four pearls" },
  { src: "/images/guide/coronet-earl.svg", rank: "Earl", text: "Eight pearls on points, eight leaves" },
  { src: "/images/guide/coronet-viscount.svg", rank: "Viscount", text: "Sixteen pearls" },
  { src: "/images/guide/coronet-lord.svg", rank: "Lord of Parliament", text: "Six pearls" },
];

/** The chapeau's own record, older than the modern grants (owner 2026-10-13: Roslin, and the petition of 1835). */
const CHAPEAU_DATES: { year: string; text: string }[] = [
  { year: "1650", text: "The Baron of Roslin is found in his vault “laying in his armour with a red velvet cap on his head”." },
  { year: "1835", text: "The Lyon Court allows the heir of the barons of Dolphinton a cap “as being indicative of his descent from the ancient barons of Dolphington”." },
  { year: "1934", text: "The Lord Lyon “found the claim established, and awarded the chapeau” to the Baron of Esslemont." },
];

export function RankLadder() {
  return (
    <figure className="my-2">
      <ol aria-label="The order of rank" className="mx-auto max-w-md border-x-[5px] border-gold/60 px-3 py-1">
        {RUNGS.map((r, i) => (
          <li
            key={r.name}
            className={`my-2 flex items-center gap-4 px-4 py-3 ${
              r.baron
                ? "bg-navy text-parchment-50 shadow-[0_14px_30px_-18px_rgba(10,16,36,0.7)]"
                : "border border-parchment-300 bg-parchment-50 text-navy"
            }`}
          >
            <span
              aria-hidden
              className={`flex h-9 w-9 flex-none items-center justify-center rounded-full font-sans text-base font-semibold ${
                r.baron ? "bg-gold text-navy-deep" : "border border-gold/60 text-gold-deep"
              }`}
            >
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block font-display leading-tight ${r.baron ? "text-3xl" : "text-2xl"}`}>{r.name}</span>
              {r.note && <span className="mt-0.5 block font-sans text-[0.8rem] leading-snug text-ink-soft">{r.note}</span>}
            </span>
            {r.baron && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/images/guide/chapeau-gules.svg" alt="" width={72} height={36} loading="lazy" className="h-9 w-auto flex-none" />
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mx-auto mt-5 max-w-md text-center font-serif text-lg italic leading-relaxed text-navy">
        “Their precedence was thus after Knights and before Esquires.”
        <span className="mt-1 block font-sans text-[0.72rem] font-semibold not-italic uppercase tracking-[0.16em] text-gold-deep">
          Innes of Learney, 1945
        </span>
      </figcaption>
      <div className="mt-10 border-t border-gold/40 pt-7">
        <p className="text-center font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">Above the shield</p>
        <p className="mx-auto mt-2 max-w-md text-center font-serif text-lg italic leading-relaxed text-navy">
          “The rank of a Peer is shown by the Coronet.”
          <span className="mt-1 block font-sans text-[0.72rem] font-semibold not-italic uppercase tracking-[0.16em] text-gold-deep">
            Court of the Lord Lyon
          </span>
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {CORONETS.map((c) => (
            <li key={c.rank} className="border border-parchment-300 bg-parchment-50 px-2 pb-3 pt-4 text-center last:col-span-2 sm:last:col-span-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.src} alt="" width={120} height={76} loading="lazy" className="mx-auto h-[3.75rem] w-auto max-w-full object-contain" />
              <span className="mt-2 block font-display text-lg leading-tight text-navy">{c.rank}</span>
              <span className="mt-1 block font-sans text-[0.78rem] leading-snug text-ink-soft">{c.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-start gap-5 bg-navy px-5 py-5 text-parchment-50 shadow-[0_14px_30px_-18px_rgba(10,16,36,0.7)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/guide/chapeau-gules.svg" alt="" width={120} height={60} loading="lazy" className="h-14 w-auto flex-none" />
          <div className="min-w-0">
            <p className="font-display text-2xl leading-tight">Baron: the chapeau</p>
            <p className="mt-1 font-sans text-[0.92rem] leading-snug text-parchment-200">A red cap turned up with ermine.</p>
            <ul className="mt-3 space-y-2">
              {CHAPEAU_DATES.map((d) => (
                <li key={d.year} className="flex items-baseline gap-3">
                  <span className="flex-none font-display text-xl leading-none text-gold-light">{d.year}</span>
                  <span className="font-sans text-[0.88rem] leading-snug text-parchment-100">{d.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-3 text-center font-sans text-[0.8rem] leading-snug text-ink-soft">
          Each drawing shows the front of the coronet; the numbers count all the way round.
        </p>
      </div>
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {DATES.map((d) => (
          <li key={d.year} className="flex items-baseline gap-3 border-l-2 border-gold/60 bg-parchment-50 px-4 py-3">
            <span className="flex-none font-display text-2xl leading-none text-gold-deep">{d.year}</span>
            <span className="font-sans text-[0.92rem] leading-snug text-navy">{d.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <p className="font-display text-xl leading-snug text-navy">“Never ceded” to knights or baronets: the precedence of a Scottish baron</p>
        <Link
          href="/reading-room/the-precedence-of-a-scottish-baron/"
          className="mt-3 inline-flex items-center gap-1.5 bg-navy px-4 py-2.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-parchment-50 transition-colors hover:bg-oxblood"
        >
          Read the paper <span aria-hidden>→</span>
        </Link>
      </div>
    </figure>
  );
}
