import Link from "next/link";
import type { ReactNode } from "react";

type Row = { label: string; sbr: ReactNode; roll: ReactNode };

const intLink =
  "text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:text-oxblood-deep";

const rows: Row[] = [
  {
    label: "What it is",
    sbr: "A private register of legal transfers, established in 2004 by members of the Scottish legal profession, under a Custodian",
    roll: "The open-source verification register of the Baronage of Scotland, maintained by the Association",
  },
  {
    label: "Official status",
    sbr: "Non-statutory; not an official register. The Custodian’s certification is accepted by the Lord Lyon as evidence of title",
    roll: "Non-statutory; not an official register. Bears on recognition only, never on legal title",
  },
  {
    label: "What it records",
    sbr: "Transfers of baronies since 28 November 2004, as voluntarily submitted",
    roll: "Aggregator of all Baronage of Scotland titles — including those held by dynastic succession, chiefs, baronets and peers, which appear in no register of transfers",
  },
  {
    label: "What an entry shows",
    sbr: "That a legal assignation was recorded",
    roll: "That the dignity and its holder have been verified against open-sourced evidence",
  },
  {
    label: "Evidence",
    sbr: "The assignation submitted for recording",
    roll: "Lyon Court instruments, SBR certification, government gazette citations (Lyon Court), original documents — published with each entry",
  },
  {
    label: "Unverified titles",
    sbr: "Not its function: the SBR records transfers; it neither recognises nor declines to recognise a title",
    roll: "Not recognised. Under the Roll’s published rules, listed barons and cooperating organisations agree not to recognise unverified titles",
  },
  {
    label: "The Pledge",
    sbr: "—",
    roll: (
      <>
        Holders may pledge their barony upon the Roll:{" "}
        <Link href="/pledge" className={intLink}>
          The Pledge
        </Link>{" "}
        preserves it within the family line as a pledged hereditary title, bound by the{" "}
        <Link href="/baronial-code" className={intLink}>
          Baronial Code of Honour
        </Link>{" "}
        — a compact in honour, not law
      </>
    ),
  },
  {
    label: "Cost",
    sbr: "A recording fee, set by the SBR",
    roll: "Free, for life — nobody pays to be listed",
  },
  {
    label: "Kept by",
    sbr: "The Custodian",
    roll: (
      <>
        Maintained under the oversight of the Association’s{" "}
        <Link href="/supporters" className={intLink}>
          supporters
        </Link>{" "}
        and{" "}
        <Link href="/governing-council" className={intLink}>
          Governing Council
        </Link>
        , whose members are published by name, with their records
      </>
    ),
  },
  {
    label: "In a phrase",
    sbr: "Records legal assignation",
    roll: "Recognises the title",
  },
];

/**
 * Shared, static comparison of the Scottish Barony Register (SBR) and the
 * Roll of Scottish Barons. Server component — no client JS. Renders a real
 * <table> at ≥640px and a stacked, labelled layout below that width so the
 * page never scrolls horizontally on mobile.
 */
export function RegisterComparison() {
  return (
    <div>
      <div className="overflow-hidden rounded-sm border border-parchment-300/70 bg-parchment-50">
        {/* ≥ 640px: semantic table */}
        <table className="hidden w-full table-fixed border-collapse text-sm sm:table sm:text-[0.95rem]">
          <caption className="sr-only">
            Comparison of the Scottish Barony Register and the Roll of Scottish Barons
          </caption>
          <colgroup>
            <col className="w-[20%]" />
            <col className="w-[40%]" />
            <col className="w-[40%]" />
          </colgroup>
          <thead>
            <tr className="bg-navy text-parchment-50">
              <th scope="col" className="px-4 py-4 text-left align-bottom sm:px-5">
                <span className="sr-only">Comparison point</span>
              </th>
              <th
                scope="col"
                className="px-4 py-4 text-left font-sans text-[0.72rem] font-semibold uppercase tracking-[0.1em] align-bottom sm:px-5 sm:text-xs"
              >
                Scottish Barony Register (SBR)
              </th>
              <th
                scope="col"
                className="px-4 py-4 text-left font-sans text-[0.72rem] font-semibold uppercase tracking-[0.1em] align-bottom sm:px-5 sm:text-xs"
              >
                The Roll of Scottish Barons
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/25">
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-parchment-50"}>
                <th
                  scope="row"
                  className="eyebrow px-4 py-5 text-left align-top !text-[0.66rem] !tracking-[0.14em] sm:px-5"
                >
                  {row.label}
                </th>
                <td className="px-4 py-5 align-top leading-relaxed text-ink-soft sm:px-5">{row.sbr}</td>
                <td className="px-4 py-5 align-top leading-relaxed text-ink-soft sm:px-5">{row.roll}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* < 640px: stacked, labelled layout — no horizontal scroll */}
        <div className="divide-y divide-gold/25 sm:hidden">
          {rows.map((row) => (
            <div key={row.label} className="px-5 py-6">
              <p className="eyebrow">{row.label}</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    Scottish Barony Register (SBR)
                  </p>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{row.sbr}</p>
                </div>
                <div>
                  <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    The Roll of Scottish Barons
                  </p>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{row.roll}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 leading-relaxed text-ink-soft">
        The Roll treats the SBR as an authoritative source and recommends every holder record their legal title
        there. The SBR records legal assignations; the Roll documents recognition across the whole baronage.
        Complementary, not competing.
      </p>
    </div>
  );
}
