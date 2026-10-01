"use client";

import { useEffect, useState } from "react";

type Conn = { saveData?: boolean; effectiveType?: string };

/**
 * Background films are decoration: the poster paints first, and the film is only
 * fetched and started once the page has finished loading and had a moment to
 * settle. On data-saving or slow (2G/3G) connections, and for reduced-motion
 * visitors, the film never starts and the poster stays.
 */
export function useDeferredFilm(reduceMotion: boolean | null, delayMs = 1200) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const conn = (navigator as Navigator & { connection?: Conn }).connection;
    if (conn?.saveData || /(^|-)2g$|^3g$/.test(conn?.effectiveType ?? "")) return;

    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => setOn(true), delayMs);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
    };
  }, [reduceMotion, delayMs]);

  return on;
}
