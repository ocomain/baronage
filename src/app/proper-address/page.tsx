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
    ],
  },
  {
    id: "written",
    title: "Written Address",
    rows: [
      { label: "Envelope (territorial)", value: "(The Much Hon.) John Smith of [TD], Baron of [Barony]" },
      { label: "Salutation", value: "Dear Baron of Inverness — or Dear Baron" },
      { label: "Barony only", value: "Dear Inverness (never used for a lady)" },
    ],
  },
  {
    id: "verbal",
    title: "Verbal Address",
    rows: [
      { label: "Introduction", value: "The Baron of Inverness" },
      { label: "In conversation", value: "Baron — or simply ‘Inverness’" },
      { label: "Incorrect", value: "“Mr Smith”, “Esq.” or surname alone" },
    ],
  },
  {
    id: "ladies",
    title: "Ladies & Baronesses",
    intro:
      "A wife is the social equal of her husband, sharing his rank and the feminine form of his title by courtesy. A female baron holds the title in her own right.",
    rows: [
      { label: "Style", value: "Lady Lochaber — or Jane, Lady Lochaber" },
      { label: "Formal", value: "The Much Hon. the Baroness of Lochaber" },
      { label: "Salutation", value: "Dear Lady Lochaber — or Dear Baroness" },
      { label: "Dowager", value: "The Dowager Lady Inverness — or Margaret, Lady Inverness" },
    ],
  },
  {
    id: "children",
    title: "Children of a Baron",
    rows: [
      { label: "Heir", value: "Younger of [Barony] — e.g. Mr John Smith, Younger of Barony" },
      { label: "Eldest daughter", value: "Maid of [Barony]" },
      { label: "Wife of the heir", value: "Mrs Smith, Younger of Barony" },
    ],
  },
  {
    id: "higher",
    title: "Higher Dignities",
    intro:
      "Over 90% of titles are “Baron of”. A small number of rarer titles are Lord, Earl or Marquis. The prefix “The Much Hon.” distinguishes these from the peerage (whose holders use “The Rt Hon.”).",
    rows: [
      { label: "Lord", value: "The Much Hon. the Lord Lochaber (spoken: Lochaber)" },
      { label: "Earl", value: "The Much Hon. the Earl of Lochaber (spoken: The Earl)" },
      { label: "Heir to a higher dignity", value: "Younger of Lochaber / Maid of Lochaber" },
    ],
  },
  {
    id: "precedence",
    title: "Post-nominals & Precedence",
    intro:
      "A Crown-granted dignity takes precedence and generally stands alone; academic titles, if included, take a subordinate position.",
    rows: [
      { label: "With an honour", value: "The Baron of Inverness, CBE" },
      { label: "Also a knight", value: "Sir John Smith, Baron of Inverness" },
      { label: "With academic title", value: "The Baron of Inverness, Professor John Smith" },
    ],
  },
  {
    id: "digital",
    title: "Digital & Form Fields",
    intro: "How to enter a baronial title correctly into databases, online forms and digital directories.",
    rows: [
      { label: "Title field (free text)", value: "“The Much Honoured” or “The Baron of [Place]”" },
      { label: "Title field (drop-down)", value: "Select “Baron”, “Baroness” or “Lady”" },
      { label: "First name field", value: "Christian name — e.g. “John”" },
      { label: "Surname field", value: "“Baron of [Place]” or “of [Place]”" },
      { label: "Display / full name", value: "“The Much Hon. John Smith, Baron of Inverness”" },
      { label: "Email signature", value: "“John Smith, Baron of Inverness”" },
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
