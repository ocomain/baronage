import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Container, ExternalArrow, Eyebrow, GoldRule, Section } from "@/components/primitives";

/**
 * Every Illustrated Comic in one place (owner 2026-11-06: "a comics page not on main navigation"). Linked from the
 * footer's small print, beside Copyright and Privacy; not in the header menu. A new comic = one entry in COMICS,
 * with a 16:9 cover at /comics/<name>-1200.webp and -720.webp.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/comics/" },
  title: "Illustrated Comics",
  description:
    "The histories of Scottish baronies drawn as Illustrated Comics, from their charters, battles and family legends: the Barons of Drum and the Lords of Kinfauns.",
};

type Comic = {
  href: string;
  /** Cover base path: `${img}-1200.webp` and `${img}-720.webp` */
  img: string;
  alt: string;
  eyebrow: string;
  title: string;
  blurb: string;
  span: string;
  label: string;
};

const COMICS: Comic[] = [
  {
    href: "https://roll.baronage.com/baron/alexander-irvine-of-drum/comic/",
    img: "/comics/drum",
    alt: "Comic panel: William de Irwyn, armour-bearer, follows King Robert the Bruce through the royal camp carrying the king’s helm and shield",
    eyebrow: "Barony of Drum",
    title: "The Barons of Drum",
    blurb: "Seven centuries in eleven panels, from the Bruce’s armour-bearer to a barony kept in the family.",
    span: "Five chapters · 1323 to today",
    label: "Drum Comic",
  },
  {
    href: "https://www.lordkinfauns.com/comic/",
    img: "/comics/kinfauns",
    alt: "Comic panel: Sir Thomas kneels by the loch at Lochmaben, his sword held up like a cross, and swears to avenge Wallace",
    eyebrow: "Lordship of Kinfauns",
    title: "The Lords of Kinfauns",
    blurb: "The pirate-knight Thomas de Longueville, who fought beside Wallace and the Bruce, and the lords who came after him.",
    span: "Eight chapters · about 1300 to today",
    label: "Kinfauns Comic",
  },
];

export default function ComicsPage() {
  return (
    <>
      <PageHero
        eyebrow="The Baronage, Illustrated"
        title="Illustrated Comics"
        intro="The histories of Scottish baronies, drawn as comics from their charters, their battles and the legends their families tell."
      />

      <Section tone="parchment">
        <Container>
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
            {COMICS.map((c, i) => (
              <Reveal key={c.href} delay={i * 0.08}>
                <article className="flex h-full flex-col">
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="group/cover block">
                    <span className="relative block">
                      <span
                        className="absolute inset-0 translate-x-2 translate-y-2 border border-gold/50 transition-transform duration-500 group-hover/cover:translate-x-3 group-hover/cover:translate-y-3"
                        aria-hidden
                      />
                      <span className="relative block overflow-hidden border border-gold/40 bg-navy-deep shadow-[0_24px_50px_-24px_rgba(8,12,28,0.6)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${c.img}-720.webp`}
                          srcSet={`${c.img}-720.webp 720w, ${c.img}-1200.webp 1200w`}
                          sizes="(min-width: 1024px) 540px, 100vw"
                          alt={c.alt}
                          width={1200}
                          height={675}
                          loading={i === 0 ? "eager" : "lazy"}
                          decoding="async"
                          className="block aspect-[16/9] w-full object-cover transition duration-700 group-hover/cover:scale-[1.04]"
                        />
                      </span>
                    </span>
                  </a>
                  <div className="mt-9 flex flex-1 flex-col">
                    <Eyebrow>{c.eyebrow}</Eyebrow>
                    <h2 className="mt-3 font-display text-[2.2rem] leading-tight text-navy sm:text-[2.5rem]">{c.title}</h2>
                    <p className="mt-4 text-[1.2rem] leading-relaxed text-ink-soft">{c.blurb}</p>
                    <p className="mt-3 font-serif text-[1.2rem] italic text-gold-deep">{c.span}</p>
                    <div className="mt-auto pt-7">
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-8 py-4 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-navy-deep shadow-[0_10px_30px_-12px_rgba(201,162,75,0.7)] transition-all duration-300 hover:bg-gold-light"
                      >
                        {c.label}
                        <ExternalArrow />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container size="prose">
          <Reveal>
            <div className="text-center">
              <Eyebrow light>For members of the Baronage of Scotland Association</Eyebrow>
              <h2 className="mt-4 text-3xl text-parchment-50 sm:text-4xl">Your barony, illustrated</h2>
              <GoldRule className="mt-6" />
              <p className="mx-auto mt-7 max-w-2xl text-[1.2rem] leading-relaxed text-parchment-200/90">
                Members of the Association can have their own barony drawn as an Illustrated Comic: its charters,
                battles and family legends told in chapters, on the baron’s page on the Roll, to share with the family
                and to hand down to the heirs.
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-[1.2rem] leading-relaxed text-parchment-200/90">
                Listing on the Roll is free, as it always has been. Illustrated Comics are drawn for members of the
                Association.
              </p>
              <div className="mt-9 flex justify-center">
                <Link
                  href="/members/#eligibility"
                  className="btn inline-flex items-center justify-center gap-2 rounded-sm border border-gold/50 px-8 py-4 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-parchment-50 transition-all duration-300 hover:border-gold hover:bg-gold/10"
                >
                  About membership
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
