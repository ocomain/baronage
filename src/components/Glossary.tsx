import { Children, Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { glossary } from "@/lib/glossary";

/**
 * Links words of the glossary of "Scottish Baronies, Explained" to their entry (owner 2026-10-18: "any mentions of
 * other words in glossary should link or even better tooltip on desktop if it's a short description"). The first
 * mention of a term in each answer becomes a link to its entry; where the entry is short, a pointer held over the link
 * on a computer shows it (a CSS tooltip, `.gloss` in globals.css); on a phone a tap goes to the entry.
 * Never inside headings, links, struck-out words or reference numbers.
 */

/** The same slug as the page uses for the glossary's anchors (`term-…`). */
const slugify = (q: string) =>
  q
    .toLowerCase()
    .replace(/[“”"?]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The words that stand for each entry in the text (any case). */
const ALIASES: Record<string, string[]> = {
  "Scottish feudal barony": ["Scottish feudal barony", "Scottish feudal baronies", "feudal barony", "feudal baronies"],
  "Quondam feudal barony": ["quondam feudal barony", "quondam feudal baronies"],
  "Scottish barony": ["Scottish barony", "Scottish baronies"],
  "Minor baron": ["minor baron", "minor barons"],
  "Barones majores / minores": ["barones majores", "barones minores"],
  "Constitutional baron": ["constitutional baron", "constitutional barons"],
  Laird: ["laird", "lairds"],
  Freeholder: ["freeholder", "freeholders"],
  "Incorporeal hereditament": ["incorporeal hereditament", "incorporeal hereditaments"],
  Caput: ["caput"],
  Peerage: ["peerage"],
  "Lord of Parliament": ["lord of parliament", "lords of parliament"],
  Baronetcy: ["baronetcy", "baronetcies"],
  Knighthood: ["knighthood"],
  Esquire: ["esquire", "esquires"],
  "Register of Sasines": ["register of sasines"],
  "Territorial designation (TD)": ["territorial designation", "territorial designations"],
  "Of that Ilk": ["of that ilk"],
  "Representer (of a House)": ["representer"],
  "For aught yet seen": ["for aught yet seen"],
  "Of the genus of barony": ["of the genus of barony"],
  Additaments: ["additaments", "additament"],
  "Nobility clause": ["nobility clause"],
  "Comes · Dominus · Baro": ["comes de", "dominus de", "baro de"],
  "Hoch-adel": ["hoch-adel", "hoch adel", "hochadel"],
};

/** Entries short enough to show in a tooltip. */
const TIP_MAX = 400;

const byTerm = new Map(glossary.map((g) => [g.term, g]));
const termOf = new Map<string, string>();
for (const [term, words] of Object.entries(ALIASES)) {
  if (!byTerm.has(term)) continue;
  for (const w of words) termOf.set(w.toLowerCase(), term);
}
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Longest first, so "Scottish feudal barony" wins over "Scottish barony"; words may run over a line break.
const PATTERN = new RegExp(
  `\\b(${[...termOf.keys()]
    .sort((a, b) => b.length - a.length)
    .map((w) => escape(w).replace(/ /g, "\\s+"))
    .join("|")})\\b(?!\\s+Register)`, // not the "Scottish Barony Register", which is a name
  "gi",
);

/** A word of the glossary, linked to its entry; short entries show as a tooltip on a computer. */
export function GlossaryTerm({ term, children }: { term: string; children: ReactNode }) {
  const g = byTerm.get(term);
  if (!g) return <>{children}</>;
  const tip = g.def.length <= TIP_MAX ? `${g.term}: ${g.def}` : undefined;
  return (
    <a href={`#term-${slugify(g.term)}`} className="gloss" data-tip={tip}>
      {children}
    </a>
  );
}

function linkTerms(text: string, used: Set<string>): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(PATTERN)) {
    const term = termOf.get(m[0].toLowerCase().replace(/\s+/g, " "));
    if (!term || used.has(term)) continue;
    used.add(term);
    if (m.index! > last) parts.push(text.slice(last, m.index));
    parts.push(
      <GlossaryTerm key={`${term}-${m.index}`} term={term}>
        {m[0]}
      </GlossaryTerm>,
    );
    last = m.index! + m[0].length;
  }
  if (!parts.length) return text;
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** Elements whose words are left alone. Components (links, reference numbers, tables) are never entered either. */
const SKIP = new Set(["a", "h1", "h2", "h3", "h4", "h5", "h6", "sup", "s", "button", "code", "script", "style"]);

/** Links the first mention of each glossary term in `node`; `used` carries the terms already linked in this answer. */
export function glossify(node: ReactNode, used: Set<string>): ReactNode {
  if (typeof node === "string") return linkTerms(node, used);
  if (Array.isArray(node)) return Children.map(node, (c) => glossify(c, used));
  if (!isValidElement(node)) return node;
  const el = node as ReactElement<{ children?: ReactNode }>;
  const host = typeof el.type === "string" && !SKIP.has(el.type);
  if (!(host || el.type === Fragment) || el.props.children === undefined) return el;
  return cloneElement(el, undefined, Children.map(el.props.children, (c) => glossify(c, used)));
}
