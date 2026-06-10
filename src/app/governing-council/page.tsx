import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { FadeImg } from "@/components/FadeImg";
import { ButtonLink, Container, Eyebrow, GoldRule, Section } from "@/components/primitives";

export const metadata: Metadata = {
  title: "The Governing Council",
  description:
    "Distinguished, voluntary members entrusted with the leadership and strategic direction of the Baronage of Scotland Association.",
};

type Member = {
  mark: string;
  name: string;
  also: string | null;
  img: string | null;
  pos?: string;
  fit?: "cover" | "contain";
  bg?: string;
};

const members: Member[] = [
  { mark: "B", name: "Brady, Baron of Balvaird", also: null, img: "/council/balvaird.avif", pos: "center 25%" },
  { mark: "D", name: "Alexander, Baron of Drum", also: "Chief of his Name", img: "/council/Irvine.jpg", pos: "center 20%" },
  { mark: "K", name: "Antoin, Younger of Kinfauns", also: "Tanist Clan Commane", img: "/council/kinfauns.jpg", pos: "center 18%" },
  {
    mark: "M",
    name: "Gordon MacGregor, Esq",
    also: "Genealogist and author of the Red Book",
    img: "/council/red-book.png",
    fit: "contain",
    bg: "#8b1c08",
  },
];

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

function MemberFigure({ m }: { m: Member }) {
  return (
    <figure className="group text-center">
      <div className="relative mx-auto aspect-[3/4] w-full max-w-[13rem]">
        <div className="absolute inset-0 translate-x-2 translate-y-2 border border-gold/50 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3" aria-hidden />
        <div
          className="relative h-full w-full overflow-hidden bg-navy-deep texture-saltire shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]"
          style={m.bg ? { backgroundColor: m.bg } : undefined}
        >
          {m.img ? (
            m.fit === "contain" ? (
              <FadeImg
                src={m.img}
                alt={m.name}
                className="h-full w-full object-contain p-4 transition duration-700 group-hover:scale-[1.04]"
              />
            ) : (
              <FadeImg
                src={m.img}
                alt={m.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                style={{ objectPosition: m.pos ?? "center" }}
              />
            )
          ) : (
            <span className="flex h-full w-full items-center justify-center font-display text-6xl text-gold-light/70">
              {m.mark}
            </span>
          )}
          <div className="pointer-events-none absolute inset-3 border border-gold/25" aria-hidden />
        </div>
      </div>
      <figcaption className="mt-5">
        <h3 className="font-display text-xl leading-tight text-parchment-50">{m.name}</h3>
        {m.also && <p className="mt-1.5 font-serif text-lg italic leading-snug text-gold-light">{m.also}</p>}
      </figcaption>
    </figure>
  );
}

export default function GoverningCouncilPage() {
  return (
    <>
      {/* Hero — the council framed over an extended great-hall backdrop */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/great-hall.webp')" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10"
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

          <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 sm:mt-28 lg:grid-cols-4">
            {members.map((m, i) => (
              <Reveal key={m.mark} delay={(i % 4) * 0.08}>
                <MemberFigure m={m} />
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
