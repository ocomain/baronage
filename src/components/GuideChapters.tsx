"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Footnote } from "@/components/Footnote";
import { HeaderOffset } from "@/components/HeaderOffset";
import { PHONE_MEDIA, phoneImage } from "@/lib/heroImage";

/**
 * The Guide explainers (Robes & Chapeau, Court & Officers, Arms & Flags) use the History page's
 * storybook: full-viewport plates that scroll over one another, each with one line of context,
 * one quotation from the record linked to its source, and where it helps a drawing. Owner
 * 2026-10-11: the Guide links should open short visual pages, not the academic papers.
 *
 * Two differences from History. The picture's subject sits on the right, so on wide screens the
 * wash is dark under the words and clears towards the right. And a plate may be taller than the
 * screen (a small phone, or the extra-large text view): its sticky offset is then set so the
 * reader scrolls to its foot before the next plate covers it, and nothing is ever cut off.
 */
export type GuideChapter = {
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
  /** keeps the right-hand side of the picture darker (for a plate that carries a drawing there) */
  dark?: boolean;
  /** a drawing shown beside the words (under them on phones) */
  figure?: ReactNode;
  /** gives the figure a wider column on wide screens (for a long flag or a wide diagram) */
  figureWide?: boolean;
};

export const ChapterLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline decoration-gold-light/50 underline-offset-4 transition-colors hover:text-parchment-50"
  >
    {children}
  </a>
);

export function GuideChapters({ chapters, label = "Chapter" }: { chapters: GuideChapter[]; label?: string }) {
  const reduceMotion = useReducedMotion();
  const plates = useRef<(HTMLElement | null)[]>([]);

  // A plate taller than the screen sticks by its foot, not its head (see the note above).
  useEffect(() => {
    const els = plates.current.filter((el): el is HTMLElement => !!el);
    const set = () => els.forEach((el) => (el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`));
    set();
    const ro = new ResizeObserver(set);
    els.forEach((el) => ro.observe(el));
    window.addEventListener("resize", set);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", set);
    };
  }, []);

  // As on History: each plate names its own view timeline; the plate before sinks back and is hidden as it arrives.
  const last = chapters.length - 1;
  return (
    <div className="bg-navy-deep" style={{ timelineScope: chapters.map((_, i) => `--plate-${i}`).join(", ") } as CSSProperties}>
      <HeaderOffset />
      {chapters.map((c, i) => (
        <section
          key={c.numeral}
          ref={(el) => {
            plates.current[i] = el;
          }}
          // mt on every plate but the first: the plate before holds, whole and still, for that much scrolling (as on History)
          className={`sticky top-0 flex min-h-[100svh] items-center overflow-hidden border-t border-gold/30 ${i > 0 ? "mt-[30svh]" : ""} ${i < last ? "plate-sink" : ""}`}
          style={{ viewTimelineName: `--plate-${i}`, ...(i < last ? { animationTimeline: `--plate-${i + 1}` } : {}) } as CSSProperties}
          aria-label={`${label} ${c.numeral}: ${c.title}`}
        >
          {i < last && (
            <div
              aria-hidden
              className="plate-shade pointer-events-none absolute inset-0 z-10 bg-navy-deep opacity-0"
              style={{ animationTimeline: `--plate-${i + 1}` } as CSSProperties}
            />
          )}
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
          {/* Narrow screens: the words run across the picture, so the wash is even. */}
          <div
            className="absolute inset-0 -z-10 lg:hidden"
            style={{ background: "linear-gradient(180deg, rgba(10,16,36,0.84) 0%, rgba(10,16,36,0.7) 45%, rgba(10,16,36,0.9) 100%)" }}
            aria-hidden
          />
          {/* Wide screens: dark under the words on the left, clearing towards the picture's subject on the right. */}
          <div
            className="absolute inset-0 -z-10 hidden lg:block"
            style={{
              background: `linear-gradient(90deg, rgba(10,16,36,0.95) 0%, rgba(10,16,36,0.88) 36%, rgba(10,16,36,${c.dark ? 0.7 : 0.38}) 68%, rgba(10,16,36,${c.dark ? 0.62 : 0.22}) 100%)`,
            }}
            aria-hidden
          />

          <div
            className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-28 sm:px-8 lg:flex-row lg:items-center lg:gap-16"
            style={{ paddingTop: "calc(var(--header-h, 6rem) + 1.75rem)" }}
          >
            <motion.div
              className="max-w-2xl lg:flex-1"
              // The first plate's words show at once: a fade waits for the page's scripts, and a reader can scroll past
              // before they arrive (owner 2026-10-18, "Held of the Crown"). The rest start fading in a little before
              // they come into view.
              initial={reduceMotion || i === 0 ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0, once: true, margin: "0px 0px 20% 0px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-inscribe text-[0.7rem] uppercase tracking-[0.28em] text-gold">
                {label} {c.numeral} · {c.years}
              </p>
              <h2 className="mt-4 font-display text-4xl leading-[1.04] text-parchment-50 sm:text-6xl">{c.title}</h2>
              <div className="mt-6 h-px w-24 bg-gradient-to-r from-gold to-transparent" aria-hidden />
              <p className="mt-6 max-w-xl text-base leading-relaxed text-parchment-200/90 sm:text-lg">{c.lead}</p>
              <figure className="mt-6 border-l-2 border-gold/70 pl-5 sm:pl-6">
                <blockquote className="font-serif text-[1.35rem] italic leading-snug text-gold-light sm:text-3xl sm:leading-snug">
                  “{c.quote}”
                </blockquote>
                <figcaption className="mt-3 font-sans text-[0.62rem] uppercase tracking-[0.18em] text-parchment-200/80 sm:text-xs">
                  <ChapterLink href={c.source.href}>{c.source.label}</ChapterLink>
                </figcaption>
              </figure>
            </motion.div>
            {c.figure && (
              <motion.div
                className={`shrink-0 ${c.figureWide ? "lg:w-[30rem]" : "lg:w-[22rem]"}`}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.15, once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {c.figure}
              </motion.div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

/** A drawing with its one-line caption, for a chapter's `figure`. */
export function Drawing({ src, alt, caption, className = "" }: { src: string; alt: string; caption: ReactNode; className?: string }) {
  return (
    <figure className={`text-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mx-auto h-auto w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]" loading="lazy" decoding="async" />
      <figcaption className="mt-4 font-sans text-[0.68rem] uppercase tracking-[0.18em] text-parchment-200/85">{caption}</figcaption>
    </figure>
  );
}

/** A document or diagram shown as a small framed plate, with its caption (for a chapter's `figure`). */
export function Facsimile({ src, alt, caption, className = "" }: { src: string; alt: string; caption: ReactNode; className?: string }) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="mx-auto h-auto max-h-[70svh] w-auto max-w-full rounded-sm lg:max-h-[50svh] border border-gold/40 bg-parchment-50 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.75)]"
      />
      <figcaption className="mt-3 text-center font-sans text-[0.72rem] leading-relaxed text-parchment-200/85">{caption}</figcaption>
    </figure>
  );
}

/** A numbered reference marker for a chapter's words: the usual pop-up, lightened so it reads on a dark plate. */
export function Ref({ n, children }: { n: number; children: ReactNode }) {
  return (
    <span className="[&_button]:text-gold-light [&_button]:decoration-gold-light/60">
      <Footnote n={n}>{children}</Footnote>
    </span>
  );
}
