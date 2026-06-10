"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Chapter = {
  id: string;
  numeral: string;
  tab: string;
  title: string;
  body: string;
  kind: "photo" | "emblem";
  src: string;
};

const chapters: Chapter[] = [
  {
    id: "origins",
    numeral: "I",
    tab: "Origins & the Crown",
    title: "Feudal superiors of the Crown",
    body: "Scottish barons were originally feudal superiors who held their lands directly from the Crown, granting them local authority and influence. Their role was vital to the governance and social fabric of medieval Scotland.",
    kind: "photo",
    src: "https://images.unsplash.com/photo-1651145447308-9cb5670705e9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "estates",
    numeral: "II",
    tab: "The Three Estates",
    title: "Among the Three Estates",
    body: "Until the Union with England in 1707, barons held the right to sit in Parliament as part of the historic Three Estates — distinct from the higher Lords of Parliament, a distinction preserved in the term “minor barons.”",
    kind: "photo",
    src: "https://images.unsplash.com/photo-1732008209481-3f5eed6b4ab5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sovereignty",
    numeral: "III",
    tab: "Defenders of Sovereignty",
    title: "Defenders of Scottish sovereignty",
    body: "During the Wars of Independence, barons — many of them knights — stood as key defenders of Scotland against English incursions. Their dedication was immortalised in the Declaration of Arbroath of 1320, sealed by some forty Scottish barons.",
    kind: "emblem",
    src: "/seal-gold.png",
  },
  {
    id: "dignity",
    numeral: "IV",
    tab: "A Dignity Preserved",
    title: "From feudal tenure to personal dignity",
    body: "With the end of the feudal system, baronial titles ceased to be territorial, becoming non-territorial personal dignities protected in Scots law and enshrined by the Scotland Act 2000 — passed down through generations to this day.",
    kind: "emblem",
    src: "/arms/slains.webp",
  },
];

export function InteractiveHistory() {
  const [active, setActive] = useState(0);
  const ch = chapters[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-14">
      {/* Chapter tabs */}
      <div className="flex flex-col gap-2.5">
        {chapters.map((c, i) => {
          const on = i === active;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-sm border px-5 py-4 text-left transition-all duration-300 ${
                on
                  ? "border-gold/70 bg-parchment-50 shadow-[0_14px_36px_-26px_rgba(10,16,36,0.55)]"
                  : "border-parchment-300/60 hover:border-gold/50 hover:bg-parchment-50/60"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="chapter-bar"
                  className="absolute inset-y-0 left-0 w-[3px] bg-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={`font-inscribe text-lg transition-colors ${on ? "text-gold-deep" : "text-gold/45 group-hover:text-gold/70"}`}
              >
                {c.numeral}
              </span>
              <span className={`font-display text-lg leading-tight transition-colors ${on ? "text-navy" : "text-ink-soft"}`}>
                {c.tab}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active chapter */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={ch.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 md:grid-cols-2 md:items-center md:gap-10"
          >
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-3 -z-10 border border-gold/30" aria-hidden />
              {ch.kind === "photo" ? (
                <div
                  className="aspect-[4/5] w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(10,16,36,0.18), rgba(10,16,36,0.42)), url('${ch.src}')`,
                  }}
                  role="img"
                  aria-label={ch.title}
                />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center bg-navy-deep texture-saltire">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ch.src} alt={ch.title} className="max-h-[78%] w-auto object-contain p-2" />
                </div>
              )}
            </div>

            <div>
              <span className="eyebrow">Chapter {ch.numeral}</span>
              <h3 className="mt-3 font-display text-3xl text-navy sm:text-[2.1rem]">{ch.title}</h3>
              <div className="gold-rule gold-rule--start mt-4 text-gold/70">
                <span className="gold-rule__gem" />
              </div>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{ch.body}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
