"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PHONE_MEDIA, phoneImage } from "@/lib/heroImage";

type Chapter = {
  numeral: string;
  years: string;
  title: string;
  /** one short line of context */
  lead: ReactNode;
  /** the record's own words */
  quote: string;
  source: { label: string; href: string };
  img: string;
  pos?: string;
  /** stronger wash for bright imagery */
  dark?: boolean;
};

const RPS = "https://www.rps.ac.uk/trans/";
// Sir George Mackenzie, Observations … as to Precedency (1680), in Works, vol. ii (1722), p. 545
const MACKENZIE = "https://archive.org/details/bim_eighteenth-century_the-works-of-that-eminen_mackenzie-george-sir_1716_2/page/n552";

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline decoration-gold-light/50 underline-offset-4 transition-colors hover:text-parchment-50"
  >
    {children}
  </a>
);

const chapters: Chapter[] = [
  {
    numeral: "I",
    years: "From the 1100s",
    title: "Held of the Crown",
    lead: "The baron held both the dignity of the title and the legal authority over his lands, often possessing the right of “pit and gallows” — the power of life and death.",
    quote: "With us all are called Barons who hold their Lands of the King in libera baronia, and who have Power of Pit and Gallows",
    source: { label: "Sir George Mackenzie, Lord Advocate · 1680", href: MACKENZIE },
    img: "/images/king-david.webp",
    pos: "center 20%",
  },
  {
    numeral: "II",
    years: "1320",
    title: "Defenders of Scottish sovereignty",
    lead: "The Declaration of Arbroath was sealed by eight earls and about forty barons.",
    quote: "It is in truth not for glory, nor riches, nor honours that we are fighting, but for freedom alone",
    source: {
      label: "Declaration of Arbroath · 6 April 1320",
      href: "https://www.nrscotland.gov.uk/learning-and-events/the-declaration-of-arbroath/",
    },
    img: "/images/knight-helm.webp",
  },
  {
    numeral: "III",
    years: "1428 – 1587",
    title: "The duty lifted, the right kept",
    lead: (
      <>
        Barons were members of Parliament, bound to attend on pain of fines. From 1587 two commissioners a shire{" "}
        <A href={`${RPS}1587/7/143`}>“shall relieve”</A> the rest, who were{" "}
        <A href={MACKENZIE}>“by no express Law discharged to come”</A>.
      </>
    ),
    quote: "the small barons and freeholders need not come to parliaments",
    source: { label: "Parliament of Scotland · 1428", href: `${RPS}1428/3/3` },
    img: "/images/cathedral.webp",
  },
  {
    numeral: "IV",
    years: "1540",
    title: "Named among the noblemen",
    lead: (
      <>
        In 1592 Parliament wrote again of <A href={`${RPS}1592/4/72`}>“the nobility, earls, lords and barons”</A>.
      </>
    ),
    quote: "every noble man, such as an earl, lord, knight and baron",
    source: { label: "Parliament of Scotland · 1540", href: `${RPS}1540/12/30` },
    img: "/images/scribe.webp",
  },
  {
    numeral: "V",
    years: "1560 – 1567",
    title: "A vote, by right",
    lead: (
      <>
        In 1560 the barons petitioned:{" "}
        <A href={`${RPS}A1560/8/2`}>“we ought to be heard, to reason and to vote”</A>. In 1567 Parliament declared it.
      </>
    ),
    quote: "the barons of this realm ought to have vote in parliament as a part of the nobility",
    source: { label: "Parliament of Scotland · 1567", href: `${RPS}1567/12/45` },
    img: "/images/charter-seal.webp",
    dark: true,
  },
  {
    numeral: "VI",
    years: "1707",
    title: "A protest for the barons",
    lead: "As the Union was voted, George Lockhart of Carnwath protested that nothing in the treaty",
    quote:
      "shall prejudice the barons of this kingdom from their full representation in parliament as now by law established, nor in any of their privileges",
    source: { label: "Parliament of Scotland · 7 January 1707", href: `${RPS}1706/10/214` },
    img: "/images/great-hall.webp",
    pos: "center 60%",
  },
  {
    numeral: "VII",
    years: "1746",
    title: "The baron keeps his court",
    lead: "The great heritable jurisdictions were abolished. The baron court remained, for small debts and smaller crimes:",
    quote:
      "a fine not exceeding twenty shillings sterling, or by setting the delinquent in the stocks, for any time not exceeding three hours, in the day-time",
    source: {
      label: "Heritable Jurisdictions Act · 1746 · s. 17",
      href: "https://archive.org/details/dli.calcutta.10089/page/n153",
    },
    img: "/images/castle-eilean-donan.webp",
  },
  {
    numeral: "VIII",
    years: "2004 — Present",
    title: "A personal dignity",
    lead: "Feudal tenure ended on 28 November 2004. The dignity did not.",
    quote: "nothing in this Act affects the dignity of baron",
    source: {
      label: "Abolition of Feudal Tenure etc. (Scotland) Act 2000 · s. 63",
      href: "https://www.legislation.gov.uk/asp/2000/5/section/63",
    },
    img: "/images/craighall.webp",
    pos: "center 30%",
    dark: true,
  },
];

/**
 * The history of the baronage as a storybook: each chapter is a full-viewport
 * plate that the next scrolls over. Each plate carries one line of context and
 * one quotation from the record, linked to its source. Pure sticky stacking
 * (no scroll-hijack), so it degrades gracefully.
 */
export function HistoryChapters() {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      {chapters.map((c, i) => (
        <section
          key={c.numeral}
          className="sticky top-0 flex h-[100svh] items-center overflow-hidden border-t border-gold/30"
          aria-label={`Chapter ${c.numeral}: ${c.title}`}
        >
          {/* A real image, not a CSS background: the first plate loads at once with priority, the rest as they near the screen. */}
          <picture aria-hidden>
            <source media={PHONE_MEDIA} srcSet={phoneImage(c.img)} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.img}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding={i === 0 ? "sync" : "async"}
              className="absolute inset-0 -z-20 h-full w-full object-cover"
              style={{ objectPosition: c.pos ?? "center" }}
            />
          </picture>
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: c.dark
                ? "linear-gradient(180deg, rgba(10,16,36,0.93) 0%, rgba(10,16,36,0.88) 45%, rgba(10,16,36,0.96) 100%)"
                : "linear-gradient(180deg, rgba(10,16,36,0.82) 0%, rgba(10,16,36,0.66) 45%, rgba(10,16,36,0.9) 100%)",
            }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -right-6 bottom-0 -z-10 font-display text-[clamp(14rem,36vw,30rem)] leading-none text-parchment-50/[0.07] sm:right-6"
            aria-hidden
          >
            {c.numeral}
          </span>

          <div className="mx-auto w-full max-w-6xl px-6 pt-16 sm:px-8 sm:pt-28">
            <motion.div
              className="max-w-2xl"
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-inscribe text-[0.7rem] uppercase tracking-[0.28em] text-gold">
                Chapter {c.numeral} · {c.years}
              </p>
              <h2 className="mt-4 font-display text-4xl leading-[1.04] text-parchment-50 sm:text-6xl">{c.title}</h2>
              <div className="mt-6 h-px w-24 bg-gradient-to-r from-gold to-transparent" aria-hidden />
              <p className="mt-6 max-w-xl text-base leading-relaxed text-parchment-200/90 sm:text-lg">{c.lead}</p>
              <figure className="mt-6 border-l-2 border-gold/70 pl-5 sm:pl-6">
                <blockquote className="font-serif text-[1.35rem] italic leading-snug text-gold-light sm:text-3xl sm:leading-snug">
                  “{c.quote}”
                </blockquote>
                <figcaption className="mt-3 font-sans text-[0.62rem] uppercase tracking-[0.18em] text-parchment-200/80 sm:text-xs">
                  <A href={c.source.href}>{c.source.label}</A>
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
