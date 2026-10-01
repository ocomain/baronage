"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** stagger delay in seconds */
  delay?: number;
  as?: "div" | "li" | "section" | "span";
};

/**
 * Fade + rise on scroll into view.
 *
 * Content is served visible. After the page has loaded, a block that is still
 * below the screen is hidden and then revealed as it scrolls in; a block already
 * on screen is left alone, so nothing the reader can see ever waits for scripts.
 * Plain CSS transitions (see .reveal-* in globals.css); respects reduced motion.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"static" | "hidden" | "show">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight - 80) return; // already on screen

    setState("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("show");
          io.disconnect();
        }
      },
      { rootMargin: "-80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";
  const cls = [className, state === "hidden" ? "reveal-hidden" : state === "show" ? "reveal-show" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cls || undefined}
      style={state === "show" && delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
