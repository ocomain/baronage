"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Seal } from "./Seal";
import { ButtonLink, Container } from "./primitives";
import { ROLL_URL } from "@/lib/site";

const HERO_IMG =
  "https://images.unsplash.com/photo-1651145447308-9cb5670705e9?auto=format&fit=crop&w=2400&q=80";

export function HeroHome() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.28]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-navy-deep text-parchment-50"
    >
      {/* Parallax photograph */}
      <motion.div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_IMG}')`, y: bgY, scale: bgScale }}
        aria-hidden
      />
      {/* Cinematic grade */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,28,0.62) 0%, rgba(8,12,28,0.34) 34%, rgba(8,12,28,0.55) 66%, rgba(8,12,28,0.95) 100%)",
        }}
        aria-hidden
      />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative w-full">
        <Container className="py-24 text-center">
          {/* Masthead */}
          <div className="rise mx-auto flex max-w-md items-center gap-4 text-gold-light/80">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="font-inscribe text-[0.62rem] uppercase tracking-[0.34em]">Edinburgh · Scotland</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          {/* Seal — gentle float */}
          <div className="rise mt-6 flex justify-center" style={{ animationDelay: "0.06s" }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Seal className="h-48 w-48 drop-shadow-[0_14px_40px_rgba(0,0,0,0.55)] sm:h-60 sm:w-60" />
            </motion.div>
          </div>

          <p
            className="rise mt-8 font-serif text-xl italic text-gold-light sm:text-2xl"
            style={{ animationDelay: "0.12s" }}
          >
            Preserving the noble heritage of Scottish Barons
          </p>

          <h1
            className="rise mt-3 font-display font-medium leading-[0.95] tracking-tight text-parchment-50"
            style={{ animationDelay: "0.18s", fontSize: "clamp(2.75rem, 8.5vw, 6.75rem)" }}
          >
            Baronage <span className="font-serif font-normal italic text-gold-light">of</span> Scotland
          </h1>
          <p
            className="rise mt-3 font-sans text-xs uppercase tracking-[0.5em] text-gold-light/90 sm:text-sm"
            style={{ animationDelay: "0.22s" }}
          >
            Association
          </p>

          <p
            className="rise mx-auto mt-8 max-w-xl text-lg leading-relaxed text-parchment-200/85"
            style={{ animationDelay: "0.3s" }}
          >
            One of the oldest noble classes in Scotland — predating the peerage and part of the historic Three Estates.
          </p>

          <div
            className="rise mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: "0.34s" }}
          >
            <ButtonLink href={ROLL_URL} variant="gold">
              Verify on the Roll
            </ButtonLink>
            <ButtonLink href="/history" variant="outlineLight">
              Discover the heritage
            </ButtonLink>
          </div>
        </Container>
      </motion.div>

      {/* Bottom motto + scroll cue */}
      <div className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-3">
        <p className="font-inscribe text-[0.6rem] uppercase tracking-[0.4em] text-gold/55">
          In Liberam Baroniam · Per Cartas Nostras
        </p>
        <motion.span
          className="h-8 w-px bg-gradient-to-b from-gold/0 to-gold/70"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </div>
    </section>
  );
}
