"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "./primitives";

/**
 * Full-bleed cinematic photograph band with a gentle scroll parallax and a
 * graded overlay — the art-book "image is the design" device used between
 * editorial sections (quotes, calls to action, atmosphere breaks).
 */
export function ImageBand({
  image,
  children,
  className = "",
  size = "prose",
  overlay,
  position = "center",
  align = "center",
}: {
  image: string;
  children: ReactNode;
  className?: string;
  size?: "default" | "prose" | "wide";
  overlay?: string;
  position?: string;
  align?: "center" | "start";
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section
      ref={ref}
      className={`relative isolate flex items-center overflow-hidden bg-navy-deep py-32 text-parchment-50 sm:py-44 ${className}`}
    >
      {/* Parallax photograph (scaled so the vertical drift never reveals an edge) */}
      <motion.div
        className="absolute inset-0 -z-20 bg-cover"
        style={{ backgroundImage: `url('${image}')`, backgroundPosition: position, y, scale: 1.18 }}
        aria-hidden
      />
      {/* Cinematic grade */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            overlay ??
            "linear-gradient(180deg, rgba(8,12,28,0.74) 0%, rgba(8,12,28,0.5) 48%, rgba(8,12,28,0.85) 100%)",
        }}
        aria-hidden
      />
      {/* Editorial hairlines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

      <Container size={size} className={`relative ${align === "center" ? "text-center" : "text-left"}`}>
        {children}
      </Container>
    </section>
  );
}
