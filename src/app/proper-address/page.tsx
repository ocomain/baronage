import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Proper Address for Scottish Barons",
  description:
    "Correct forms of address, salutation and precedence for Scottish Barons and Baronesses — written, verbal and digital — preserving the dignity of the title.",
};

type Row = { label: string; value: string };
type Group = { id: string; title: string; intro?: string; rows: Row[] };

const groups: Group[] = [
  {
    id: "forms",
    title: "The Correct Form",
    intro:
      "Most barons do not hold a territorial designation; the title alone is the preferred format. The honorific “The Much Honoured” (The Much Hon.) may precede the name to distinguish a Scottish Baron from a peer.",
    rows: [
      { label: "Standard", value: "The Baron of Inverness" },
      { label: "With honorific", value: "The Much Hon. the Baron of Inverness" },
      { label: "With family name", value: "John Smith, Baron of Inverness" },
      { label: "Pledged title (daily use)", value: "John, Baron of Inverness — or John Inverness" },
      { label: "With territorial designation", value: "John Smith of [TD], Baron of Inverness" },
      { label: "Over academic titles", value: "A Crown grant supersedes “Professor” or “Doctor” — the barony stands alone" },
    ],
  },
  {
    id: "written",
    title: "Written Address",
    rows: [
      { label: "Envelope (territorial)", value: "(The Much Hon.) John Smith of [TD], Baron of [Barony]" },
      { label: "Envelope (no designation)", value: "The Much Hon. the Baron of Inverness" },
      { label: "Salutation", value: "Dear Baron of Inverness — or Dear Baron" },
      { label: "Barony only", value: "Dear Inverness (never used for a lady)" },
    ],
  },
  {
    id: "verbal",
    title: "Verbal Address",
    rows: [
      { label: "Introduction (third person)", value: "The Baron of Inverness — and Lady Inverness" },
      { label: "In conversation", value: "Baron — or simply ‘Inverness’" },
      { label: "Incorrect", value: "“Mr Smith”, “Esq.” or the surname alone" },
    ],
  },
  {
    id: "ladies",
    title: "Ladies & Baronesses",
    intro:
      "A wife is the social equal of her husband, sharing his rank and the feminine form of his title by courtesy; upon marriage she assumes his style, and her title is reflected in a British passport as her legal name. A female baron holds the title in her own right.",
    rows: [
      { label: "Style", value: "Lady Lochaber — or Jane, Lady Lochaber" },
      { label: "Formal", value: "(The Much Hon.) the Baroness of Lochaber" },
      { label: "Salutation", value: "Dear Lady Lochaber — or Dear Baroness" },
      { label: "Highland clan-chiefs’ wives", value: "Some prefer the style “Madam”" },
    ],
  },
  {
    id: "children",
    title: "Children of a Baron",
    intro: "The heir is addressed with the courtesy style “Younger,” and the eldest daughter as “Maid.”",
    rows: [
      { label: "Heir (son)", value: "Younger of [Barony] — e.g. Mr John Smith, Younger of Barony" },
      { label: "Heir (spoken)", value: "Barony Yr — spoken simply “Barony”" },
      { label: "Eldest daughter", value: "Maid of [Barony] — Miss Jane Smith, Maid of Barony (some prefer “Maiden”)" },
      { label: "Wife of the heir", value: "Mrs Smith, Younger of Barony" },
      { label: "With a territorial designation", value: "Mr John Smith of [TD], yr — Miss Mary Smith of [TD]" },
    ],
  },
  {
    id: "higher",
    title: "Higher Dignities — Lord, Earl & Marquis",
    intro:
      "Over 90% of titles are “Baron of”. A small number are nobler dignities of baron — Lord, Earl or Marquis (the French spelling is used). A baron is a lord and a lord is a baron; the styles may be used interchangeably. The prefix “The Much Hon.” distinguishes these from the peerage (whose holders use “The Rt Hon.”).",
    rows: [
      { label: "Lord", value: "The Much Hon. the Lord Lochaber (spoken: Lochaber)" },
      { label: "Earl", value: "The Much Hon. the Earl of Lochaber (spoken: The Earl, or Lochaber)" },
      { label: "Marquis", value: "The Much Hon. the Marquis of Lochaber" },
      { label: "Versus a peer", value: "Peer: The Rt Hon. the Earl of Lochaber (spoken: Lord Lochaber)" },
      { label: "Heir to a higher dignity", value: "Younger of Lochaber (son) / Maid of Lochaber (eldest daughter)" },
      { label: "Pledged subsidiary titles", value: "Children may use junior titles by courtesy during the holder’s lifetime" },
    ],
  },
  {
    id: "dowager",
    title: "Widow & Dowager",
    intro:
      "Applies to Pledged bloodline titles, where the honour remains within the family. If a non-Pledged title is disponed to another family, the honour ceases and there can be no dowager.",
    rows: [
      { label: "Widow", value: "Retains “Lady [Barony]” — unless the new baron is married" },
      { label: "Dowager", value: "The Dowager Lady Inverness — or Margaret, Lady Inverness" },
      { label: "Condition", value: "The new baron must be related to the dowager" },
      { label: "On remarriage", value: "She takes her style from her new husband, forfeiting the former title" },
      { label: "Divorced (not remarried)", value: "May retain the former title, minus the prefix “The Much Honoured”" },
    ],
  },
  {
    id: "precedence",
    title: "Post-nominals, Rank & Precedence",
    intro:
      "A Crown-granted dignity takes precedence and generally stands alone. Where the holder is also a peer, baronet or knight, that title takes precedence; academic titles, if included, take a subordinate position.",
    rows: [
      { label: "With an honour", value: "The Baron of Inverness, CBE" },
      { label: "Also a knight", value: "Sir John Smith, Baron of Inverness" },
      { label: "Also a peer", value: "The Rt Hon. the Lord Inverness (the peerage takes precedence)" },
      { label: "Military rank", value: "Major The Much Hon. the Baron of Inverness DL" },
      { label: "With academic title", value: "The Baron of Inverness, Professor John Smith — or Prof Inverness" },
    ],
  },
  {
    id: "digital",
    title: "Digital & Form Fields",
    intro:
      "How to enter a baronial title correctly into databases, online forms and digital directories, preserving the dignity of the title.",
    rows: [
      { label: "Title field (free text)", value: "“The Much Honoured” — or “The Baron of [Place]”" },
      { label: "Title field (drop-down)", value: "Select “Baron”, “Baroness” or “Lady” as appropriate" },
      { label: "First name field", value: "Christian name — e.g. “John” (or “The Baron of [Place]”)" },
      { label: "Surname field", value: "“Baron of [Place]”, “[Family] The Baron of [Place]”, or “of [Place]”" },
      { label: "Display / full name", value: "“The Much Hon. John Smith, Baron of Inverness”" },
      { label: "Correspondence", value: "“Dear Baron of Inverness” — or “Dear The Much Hon. Baron of Inverness”" },
      { label: "Email signature", value: "“John Smith, Baron of Inverness”" },
      { label: "Worst case (Mr/Ms only)", value: "Enter “The Baron of [Place]” in the surname → “Mr The Baron of Inverness”" },
    ],
  },
];

export default function ProperAddressPage() {
  return (
    <>
      <PageHero
        eyebrow="Forms of Address & Precedence"
        title="Proper Address for Scottish Barons"
        intro="Addressing a Scottish Baron correctly honours a line of titleholders stretching back centuries. The correct forms, in written, verbal and digital use."
      />

      {/* In-page quick navigation */}
      <div className="border-b border-parchment-300/70 bg-parchment-50">
        <Container>
          <nav className="flex gap-x-6 gap-y-2 overflow-x-auto py-4 text-sm whitespace-nowrap">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="nav-link shrink-0 text-navy/75 transition-colors hover:text-oxblood"
              >
                {g.title}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      <Section tone="parchment" className="py-16 sm:py-20">
        <Container size="prose">
          <div className="space-y-16">
            {groups.map((g) => (
              <Reveal key={g.id} as="section">
                <section id={g.id} className="scroll-mt-44">
                  <h2 className="font-display text-2xl text-navy sm:text-3xl">{g.title}</h2>
                  <div className="gold-rule gold-rule--start mt-4 text-gold/70">
                    <span className="gold-rule__gem" />
                  </div>
                  {g.intro && <p className="mt-5 leading-relaxed text-ink-soft">{g.intro}</p>}
                  <dl className="mt-6 divide-y divide-parchment-300/70 border-y border-parchment-300/70">
                    {g.rows.map((row) => (
                      <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[0.6fr_1.4fr] sm:gap-6">
                        <dt className="eyebrow pt-1 text-gold-deep">{row.label}</dt>
                        <dd className="font-serif text-lg text-navy">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
