import Link from "next/link";
import { EmailSignup } from "@/components/EmailSignup";
import { ROLL_URL, INDEX_URL, CALENDLY_URL } from "@/lib/site";

const rows: { href: string; title: string; line: string; external?: boolean }[] = [
  { href: ROLL_URL, title: "Check a title on the Roll", line: "Search the Roll of Scottish Barons by name or title.", external: true },
  { href: INDEX_URL, title: "Look up 1,872 baronies", line: "The Index of Scottish Baronies (beta).", external: true },
  { href: "/proper-address", title: "How to address a baron", line: "In speech, in letters and on forms." },
  { href: "/scottish-baronies-explained", title: "What are Scottish baronies?", line: "Plain answers to the common questions." },
  { href: "/pledge", title: "The Pledge", line: "A commitment, in honour, to keep a barony in the family." },
  { href: "/reading-room", title: "Read the papers", line: "The sources and the record, set out in full." },
  { href: CALENDLY_URL, title: "Ask the Secretary to call you", line: "Choose a time and we will telephone.", external: true },
];

/**
 * The main things a visitor comes to do, each a row that can be clicked anywhere, and the newsletter sign-up as the last cell.
 * Standard view: a compact grid, two across. Extra-large view (html.ez): tall rows, one per line.
 * Sizes are in globals.css (.ez-start, .ez-rows, .ez-row).
 */
export function EasyStart() {
  return (
    <section className="ez-start border-b border-parchment-300/70 bg-parchment-50" aria-labelledby="ez-start-h">
      <div className="ez-start-in mx-auto w-full px-5 sm:px-8">
        <h2 id="ez-start-h" className="ez-start-h text-center font-display text-navy">
          Where would you like to go?
        </h2>
        <ul className="ez-rows">
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
          {/* Last cell: the free newsletter, so the grid ends on a full row (owner 2026-10-05). */}
          <li>
            <div className="ez-row ez-row--form">
              <EmailSignup variant="block" className="w-full" />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
