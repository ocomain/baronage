"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FadeImg } from "./FadeImg";

export type CouncilMember = {
  mark: string;
  name: string;
  also: string | null;
  img: string | null;
  pos?: string;
  fit?: "cover" | "contain";
  bg?: string;
  bio: string;
};

/** Council portrait card — tap/click opens a biography pop-up. */
export function CouncilCard({ m }: { m: CouncilMember }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const portrait = (large = false) =>
    m.img ? (
      m.fit === "contain" ? (
        <FadeImg
          src={m.img}
          alt={m.name}
          className={`h-full w-full object-contain p-4 transition duration-700 ${large ? "" : "group-hover:scale-[1.04]"}`}
        />
      ) : (
        <FadeImg
          src={m.img}
          alt={m.name}
          className={`h-full w-full object-cover transition duration-700 ${large ? "" : "group-hover:scale-105"}`}
          style={{ objectPosition: m.pos ?? "center" }}
        />
      )
    ) : (
      <span className="flex h-full w-full items-center justify-center font-display text-6xl text-gold-light/70">
        {m.mark}
      </span>
    );

  return (
    <>
      <figure className="group cursor-pointer text-center" onClick={() => setOpen(true)}>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[17rem] sm:max-w-[13rem]">
          <div
            className="absolute inset-0 translate-x-2 translate-y-2 border border-gold/50 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3"
            aria-hidden
          />
          <div
            className="relative h-full w-full overflow-hidden bg-navy-deep texture-saltire shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]"
            style={m.bg ? { backgroundColor: m.bg } : undefined}
          >
            {portrait()}
            <div className="pointer-events-none absolute inset-3 border border-gold/25" aria-hidden />
          </div>
        </div>
        <figcaption className="mt-6 sm:mt-5">
          <h3 className="font-display text-3xl leading-tight text-parchment-50 sm:text-xl">{m.name}</h3>
          {m.also && (
            <p className="mt-2 font-serif text-xl italic leading-snug text-gold-light sm:mt-1.5 sm:text-lg">{m.also}</p>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="mt-3 cursor-pointer border-0 bg-transparent p-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-light"
          >
            Read bio
          </button>
        </figcaption>
      </figure>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/55 p-4 backdrop-blur-[2px] sm:p-6"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={`Biography — ${m.name}`}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="relative max-h-[85vh] w-full max-w-md overflow-y-auto border border-gold/40 bg-parchment-50 shadow-[0_30px_70px_-25px_rgba(8,12,28,0.7)]"
                >
                  <div
                    className="relative h-64 w-full overflow-hidden bg-navy-deep texture-saltire"
                    style={m.bg ? { backgroundColor: m.bg } : undefined}
                  >
                    {portrait(true)}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close biography"
                    className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gold/40 bg-navy-deep/70 text-xl leading-none text-parchment-50 transition-colors hover:bg-oxblood"
                  >
                    ×
                  </button>
                  <div className="p-6 sm:p-8">
                    <h3 className="font-display text-2xl leading-tight text-navy">{m.name}</h3>
                    {m.also && <p className="mt-1.5 font-serif text-lg italic text-gold-deep">{m.also}</p>}
                    <div className="mt-4 h-px w-16 bg-gold/60" aria-hidden />
                    <p className="mt-4 leading-relaxed text-ink-soft">{m.bio}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
