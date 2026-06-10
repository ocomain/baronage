import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { CouncilCard, type CouncilMember } from "@/components/CouncilCard";
import { ButtonLink, Container, Eyebrow, GoldRule, Section } from "@/components/primitives";

export const metadata: Metadata = {
  title: "The Governing Council",
  description:
    "Distinguished, voluntary members entrusted with the leadership and strategic direction of the Baronage of Scotland Association.",
};

const members: CouncilMember[] = [
  {
    mark: "B",
    name: "Brady, Baron of Balvaird",
    formal: "The Baron of Balvaird",
    alt: "Brady Brim-DeForest of Balvaird and Blairlogie, Baron of Balvaird",
    also: null,
    img: "/council/balvaird.avif",
    pos: "center 25%",
    popPos: "center 12%",
    bio: "Brady Brim-DeForest of Balvaird and Blairlogie, Baron of Balvaird is a serial entrepreneur and author — co-founder of six startups and former CEO of TheoremOne, which he grew into a four-hundred-strong global technology consultancy before its merger with Media.Monks. Balvaird is the author of Smaller is Better and an investor in frontier technology through Late Stage Capital. Balvaird succeeded to the barony in 2017 — a title confirmed by James VI in 1624 and recognised by the Lord Lyon in 2020 — and has pledged it as a hereditary title upon the Roll.",
  },
  {
    mark: "D",
    name: "Alexander, Baron of Drum",
    formal: "The Baron of Drum",
    alt: "Alexander Irvine of Drum, 27th Baron of Drum",
    also: "Chief of his Name",
    alsoProminent: true,
    img: "/council/Irvine.jpg",
    pos: "center 20%",
    popPos: "center 10%",
    bio: "Alexander Irvine of Drum, 27th Baron of Drum succeeded his father in 2019 and is Chief of the Name and Arms of Irvine of Drum. The barony descends from the Royal Charter granted to William de Irwyn by Robert the Bruce in 1323, with Drum Castle in Aberdeenshire its caput for seven centuries. Drum is Patron of the Clan Irwin Association, and the barony is pledged as a hereditary title upon the Roll.",
  },
  {
    mark: "K",
    name: "Antoin, Younger of Kinfauns",
    formal: "The Younger of Kinfauns",
    alt: "Antoin Commane, Younger of Kinfauns",
    also: "Tanist Clan Commane",
    img: "/council/kinfauns.jpg",
    pos: "center 18%",
    popPos: "center 14%",
    bio: "Antoin Commane, Younger of Kinfauns is heir to the Lordship of Kinfauns — a dignity with origins around 1340, granted by James III in 1487 — and Tanist of Clan Commane, an Irish clan recognised under the patronage of the President of Ireland. From the family seat at Newhall, County Clare, the family are custodians of Killone Abbey and the Holy Well of St John the Baptist. Kinfauns’ father has pledged the lordship as a hereditary title upon the Roll.",
  },
  {
    mark: "M",
    name: "Gordon MacGregor, Esq",
    alt: "Gordon MacGregor, genealogist and author of the Red Book of Scotland",
    also: "Genealogist and author of the Red Book",
    img: "/council/red-book.png",
    fit: "contain",
    bg: "#8b1c08",
    bio: "Gordon MacGregor is one of Scotland\u2019s foremost genealogists, with over thirty years of commissioned research including work for the Court of the Lord Lyon. He is the author of the Red Book of Scotland — a nine-volume, 9,500-page account of the families who shaped Scotland from the medieval era to the present — held by the National Records of Scotland and the National Library of Scotland.",
  },
];

const councilJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Governing Council of the Baronage of Scotland Association",
  itemListElement: members.map((m, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      name: m.alt ?? m.name,
      alternateName: m.formal ?? m.name,
      description: m.bio,
      ...(m.img ? { image: `https://baronage.com${m.img}` } : {}),
      affiliation: {
        "@type": "Organization",
        name: "Baronage of Scotland Association",
        url: "https://baronage.com",
      },
    },
  })),
};

const stewardship = [
  {
    numeral: "I",
    title: "Chancellor & Council",
    body: "An elected Chancellor and Governing Council, serving a biannual term, voted in at the members’ meeting.",
  },
  {
    numeral: "II",
    title: "Keepers of the Roll",
    body: "Researchers, genealogists and scholars who vet and verify entries with accuracy and legal precision.",
  },
  {
    numeral: "III",
    title: "Future Oversight",
    body: "We intend to transfer oversight to government supervisors, ensuring proper checks and balances.",
  },
];

export default function GoverningCouncilPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(councilJsonLd) }} />
      {/* Hero — the council framed over an extended great-hall backdrop */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/great-hall.webp')" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 sm:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,12,28,0.8) 0%, rgba(8,12,28,0.28) 30%, rgba(8,12,28,0.42) 62%, rgba(8,12,28,0.9) 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 hidden sm:block"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,12,28,0.88) 0%, rgba(8,12,28,0.5) 34%, rgba(8,12,28,0.66) 64%, rgba(8,12,28,0.93) 100%)",
          }}
          aria-hidden
        />

        <Container className="relative pt-28 pb-20 sm:pt-32 sm:pb-24">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow light>The Governing Council</Eyebrow>
              <h1 className="mt-5 font-display text-5xl leading-[1.05] text-parchment-50 sm:text-6xl">
                Stewards of the Association
              </h1>
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-parchment-200/85">
                A distinguished, voluntary body entrusted with the leadership and direction of the Association —
                keepers of the Roll and the honour it preserves.
              </p>
              <GoldRule className="mt-8" />
            </div>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-12 sm:mt-28 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m, i) => (
              <Reveal key={m.mark} delay={(i % 4) * 0.08}>
                <CouncilCard m={m} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-14 text-center font-serif text-lg italic text-parchment-200/75">
              An honourable body, owned by its members — a not-for-profit.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Stewardship */}
      <Section tone="parchment">
        <Container>
          <Reveal>
            <Eyebrow>Governance</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-4xl text-navy sm:text-5xl">Steering the legacy and the future</h2>
          </Reveal>
          <div className="mt-12 border-t border-navy/15">
            {stewardship.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-navy/15 py-8 sm:grid-cols-[5rem_1fr] sm:gap-x-10">
                  <span className="font-inscribe text-3xl text-gold/70 sm:text-4xl">{s.numeral}</span>
                  <div>
                    <h3 className="text-2xl text-navy sm:text-3xl">{s.title}</h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing */}
      <Section tone="navy">
        <Container size="prose">
          <Reveal>
            <div className="text-center">
              <GoldRule className="mb-8" />
              <h2 className="text-3xl text-parchment-50 sm:text-4xl">Three entities, one purpose</h2>
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-parchment-200/85">
                The Association, the Roll, and the Scottish charity in formation are three separate entities, working in
                liaison with all baronage stakeholders. Memorandums of Understanding signed with stakeholder
                organisations are to be announced at forthcoming press events.
              </p>
              <div className="mt-9 flex justify-center">
                <ButtonLink href="/about" variant="outlineLight">
                  About the Association
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
