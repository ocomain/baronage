"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Seal } from "./Seal";
import { ButtonLink, Container } from "./primitives";
import { ROLL_URL } from "@/lib/site";

const POSTER = "/videos/hero-poster.webp";

export function HeroHome() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Glide the scroll value through a spring so the parallax eases and settles
  // instead of tracking the scrollbar 1:1 — this is what makes it feel fluid.
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.5, restDelta: 0.0005 });

  const bgY = useTransform(progress, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);
  const contentY = useTransform(progress, [0, 1], [0, reduceMotion ? 0 : -80]);
  const contentOpacity = useTransform(progress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[calc(100svh-9rem)] items-center overflow-hidden bg-navy-deep text-parchment-50"
    >
      {/* Poster loads instantly while the film arrives */}
      <link rel="preload" as="image" href={POSTER} fetchPriority="high" />

      {/* Eilean Donan at dusk — slow aerial film, drifting gently with scroll */}
      <motion.div className="absolute inset-0 -z-20" style={{ y: bgY }} aria-hidden>
        {reduceMotion ? (
          <div
            className="h-full w-full scale-[1.08] bg-cover bg-center"
            style={{ backgroundImage: `url('${POSTER}')` }}
          />
        ) : (
          <video
            className="h-full w-full scale-[1.08] object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={POSTER}
          >
            <source src="/videos/hero-loch.webm" type="video/webm" />
            <source src="/videos/hero-loch.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

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
        <Container className="py-10 text-center">
          {/* Masthead */}
          <div className="rise mx-auto flex max-w-md items-center gap-4 text-gold-light/80">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="font-inscribe text-[0.62rem] uppercase tracking-[0.34em]">In Liberam Baroniam · Per Cartas Nostras</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          {/* Seal — gentle float */}
          <div className="rise mt-5 flex justify-center" style={{ animationDelay: "0.06s" }}>
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Seal className="h-24 w-24 drop-shadow-[0_14px_40px_rgba(0,0,0,0.55)] sm:h-32 sm:w-32" />
            </motion.div>
          </div>

          <h1
            className="rise mt-5 font-display font-medium leading-[0.95] tracking-tight text-parchment-50"
            style={{ animationDelay: "0.14s", fontSize: "clamp(2.5rem, 6.5vw, 5.25rem)" }}
          >
            Baronage <span className="font-serif font-normal italic text-gold-light">of</span> Scotland
          </h1>
          <p
            className="rise mt-3 font-sans text-xs uppercase tracking-[0.5em] text-gold-light/90 sm:text-sm"
            style={{ animationDelay: "0.2s" }}
          >
            Association
          </p>

          <p
            className="rise mx-auto mt-6 max-w-2xl text-base leading-relaxed text-parchment-200/85 sm:text-lg"
            style={{ animationDelay: "0.26s" }}
          >
            The ancient nobility of Scotland — verified, recorded, and preserved for future generations.
          </p>

          <div className="rise mt-8 flex justify-center" style={{ animationDelay: "0.32s" }}>
            <ButtonLink href={ROLL_URL} variant="gold">
              Verify Title on the Roll
            </ButtonLink>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
