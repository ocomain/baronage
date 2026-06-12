"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Seal } from "./Seal";
import { Container } from "./primitives";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  video,
  position = "center",
  scrim = "default",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Optional full-bleed cinematic photograph behind the masthead. */
  image?: string;
  /** Optional full-bleed looping film, used in place of the photograph. Poster doubles as the reduced-motion fallback. */
  video?: { mp4: string; webm?: string; poster: string };
  position?: string;
  /** "strong" darkens the wash for bright imagery so light text stays legible. */
  scrim?: "default" | "strong";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const hasMedia = Boolean(image || video);

  // Same motion language as the homepage hero, a touch quieter:
  // spring-smoothed drift on scroll + a very slow ambient breathe.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.5, restDelta: 0.0005 });
  const bgY = useTransform(progress, [0, 1], ["0%", reduceMotion || !hasMedia ? "0%" : "10%"]);

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden bg-navy-deep text-parchment-50 ${
        hasMedia ? "flex min-h-[58vh] items-end" : ""
      }`}
    >
      {hasMedia ? (
        <>
          <motion.div className="absolute inset-0 -z-20" style={{ y: bgY }} aria-hidden>
            {video && !reduceMotion ? (
              <motion.div
                className="h-full w-full"
                initial={{ scale: 1.1 }}
                animate={{ scale: [1.1, 1.16, 1.1] }}
                transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
              >
                <video
                  className="h-full w-full object-cover"
                  style={{ objectPosition: position }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={video.poster}
                >
                  {video.webm && <source src={video.webm} type="video/webm" />}
                  <source src={video.mp4} type="video/mp4" />
                </video>
              </motion.div>
            ) : (
              <motion.div
                className="h-full w-full bg-cover"
                style={{ backgroundImage: `url('${video ? video.poster : image}')`, backgroundPosition: position }}
                initial={{ scale: 1.1 }}
                animate={reduceMotion ? undefined : { scale: [1.1, 1.16, 1.1] }}
                transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.div>
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                scrim === "strong"
                  ? "linear-gradient(180deg, rgba(8,12,28,0.74) 0%, rgba(8,12,28,0.66) 45%, rgba(8,12,28,0.94) 100%)"
                  : "linear-gradient(180deg, rgba(8,12,28,0.45) 0%, rgba(8,12,28,0.38) 45%, rgba(8,12,28,0.9) 100%)",
            }}
            aria-hidden
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 -z-10 texture-saltire opacity-70" aria-hidden />
          <Seal
            className="pointer-events-none absolute -right-16 top-1/2 -z-10 hidden h-[26rem] w-[26rem] -translate-y-1/2 opacity-[0.07] md:block"
            aria-hidden
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden />
      <Container className={image ? "py-16 sm:py-20" : "py-24 sm:py-28"}>
        <div className="max-w-3xl">
          <p className="rise eyebrow eyebrow--light">{eyebrow}</p>
          <h1
            className="rise mt-5 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {title}
          </h1>
          <div className="rise mt-7 h-px w-24 bg-gradient-to-r from-gold to-transparent" style={{ animationDelay: "0.14s" }} />
          {intro && (
            <p
              className="rise mt-7 max-w-2xl text-lg leading-relaxed text-parchment-200/85"
              style={{ animationDelay: "0.2s" }}
            >
              {intro}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
