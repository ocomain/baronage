"use client";

import { motion, useReducedMotion } from "framer-motion";

type Page = {
  numeral: string;
  years: string;
  title: string;
  body: string;
  img: string;
  pos?: string;
  /** stronger wash for bright imagery */
  dark?: boolean;
};

const pages: Page[] = [
  {
    numeral: "I",
    years: "From the 1100s",
    title: "Feudal superiors of the Crown",
    body: "Scottish barons were originally feudal superiors who held their lands directly from the Crown, granting them local authority and influence. Their role was vital to the governance and social fabric of medieval Scotland.",
    img: "/images/king-david.webp",
    pos: "center 20%",
  },
  {
    numeral: "II",
    years: "Until 1707",
    title: "Among the Three Estates",
    body: "Until the Union with England in 1707, barons held the right to sit in Parliament as part of the historic Three Estates — distinct from the higher Lords of Parliament, a distinction preserved in the term “minor barons.”",
    img: "/images/cathedral.webp",
  },
  {
    numeral: "III",
    years: "1296 – 1357 · Arbroath 1320",
    title: "Defenders of Scottish sovereignty",
    body: "During the Wars of Independence, barons — many of them knights — stood as key defenders of Scotland against English incursions. Their dedication was immortalised in the Declaration of Arbroath of 1320, sealed by some forty Scottish barons.",
    img: "/images/knight-helm.webp",
  },
  {
    numeral: "IV",
    years: "2000 — Present",
    title: "From feudal tenure to personal dignity",
    body: "With the end of the feudal system, baronial titles ceased to be territorial, becoming non-territorial personal dignities protected in Scots law and enshrined by the Scotland Act 2000 — passed down through generations to this day.",
    img: "/images/craighall.webp",
    pos: "center 30%",
    dark: true,
  },
];

/**
 * A storybook of the baronage — each chapter is a full-viewport plate that the
 * next chapter scrolls over, like pages settling on top of one another.
 * Pure sticky stacking (no scroll-hijack), so it degrades gracefully.
 */
export function HistoryStory() {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      {pages.map((p, i) => (
        <section
          key={p.numeral}
          className="sticky top-0 flex h-[100svh] items-center overflow-hidden border-t border-gold/30"
          aria-label={`Chapter ${p.numeral}: ${p.title}`}
        >
          {/* Plate imagery */}
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{ backgroundImage: `url('${p.img}')`, backgroundPosition: p.pos ?? "center" }}
            aria-hidden
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: p.dark
                ? "linear-gradient(180deg, rgba(10,16,36,0.88) 0%, rgba(10,16,36,0.74) 45%, rgba(10,16,36,0.92) 100%)"
                : "linear-gradient(180deg, rgba(10,16,36,0.78) 0%, rgba(10,16,36,0.55) 45%, rgba(10,16,36,0.85) 100%)",
            }}
            aria-hidden
          />
          {/* Giant numeral watermark */}
          <span
            className="pointer-events-none absolute -right-6 bottom-0 -z-10 font-display text-[clamp(14rem,36vw,30rem)] leading-none text-parchment-50/[0.07] sm:right-6"
            aria-hidden
          >
            {p.numeral}
          </span>

          <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
            <motion.div
              className="max-w-2xl"
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-inscribe text-[0.7rem] uppercase tracking-[0.28em] text-gold">
                Chapter {p.numeral} · {p.years}
              </p>
              <h3 className="mt-5 font-display text-4xl leading-[1.04] text-parchment-50 sm:text-6xl">{p.title}</h3>
              <div className="mt-7 h-px w-24 bg-gradient-to-r from-gold to-transparent" aria-hidden />
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-parchment-200/90 sm:text-xl">{p.body}</p>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
