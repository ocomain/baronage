import Link from "next/link";
import { ROLL_URL, CALENDLY_URL } from "@/lib/site";

const rows: { href: string; title: string; line: string; external?: boolean }[] = [
  { href: ROLL_URL, title: "Check a title on the Roll", line: "Search the Roll of Scottish Barons by name or title.", external: true },
  { href: "/proper-address", title: "How to address a baron", line: "In speech, in letters and on forms." },
  { href: "/scottish-baronies-explained", title: "What is a Scottish barony?", line: "Plain answers to the common questions." },
  { href: "/pledge", title: "The Pledge", line: "A commitment, in honour, to keep a barony in the family." },
  { href: "/reading-room", title: "Read the papers", line: "The sources and the record, set out in full." },
  { href: CALENDLY_URL, title: "Ask the Secretary to call you", line: "Choose a time and we will telephone.", external: true },
];

/** The main things a visitor comes to do, as large rows that can be clicked anywhere. */
export function EasyStart() {
  return (
    <section className="ez-only border-b border-parchment-300/70 bg-parchment-50" aria-labelledby="ez-start-h">
      <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8">
        <h2 id="ez-start-h" className="text-center font-display text-4xl text-navy">
          Where would you like to go?
        </h2>
        <ul className="mt-8 flex flex-col gap-4">
          {rows.map((r) => {
            const inner = (
              <>
                <span className="ez-row-text">
                  <span className="ez-row-title">{r.title}</span>
                  <span className="ez-row-line">{r.line}</span>
                </span>
                <span className="ez-row-go" aria-hidden>
                  →
                </span>
              </>
            );
            return (
              <li key={r.href}>
                {r.external ? (
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="ez-row">
                    {inner}
                  </a>
                ) : (
                  <Link href={r.href} className="ez-row">
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
