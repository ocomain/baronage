"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Grid wrapper that suspends pointer/hover interaction during active scroll.
 *
 * Scrolling moves the cards under a stationary cursor, which would otherwise
 * fire each crossed card's hover flourish (27 staggered letter transitions) and
 * its shadow/transform transition — the source of the scroll jank. We set
 * pointer-events:none while the page is scrolling and restore it ~100ms after
 * scrolling stops. The armorial cards have no click targets, so this is
 * invisible to the user; hover works normally whenever the page is at rest.
 */
export function ArmorialGrid({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    const onScroll = () => {
      if (el.style.pointerEvents !== "none") el.style.pointerEvents = "none";
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        el.style.pointerEvents = "";
      }, 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
