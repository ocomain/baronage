"use client";

import { useEffect } from "react";

/**
 * Keeps --header-h, the sticky header's real height, on <html>, so that in-page links in a paper
 * (footnotes, their back-links, section headings) stop below the header at every screen and text size.
 * See --paper-anchor-top in globals.css. Renders nothing.
 */
export function HeaderOffset() {
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const root = document.documentElement;
    const set = () => root.style.setProperty("--header-h", `${Math.round(header.getBoundingClientRect().height)}px`);
    set();
    // The header's height changes with the screen width, with the extra-large-text view (a class on <html>)
    // and with its own contents, so listen for all three.
    const ro = new ResizeObserver(set);
    ro.observe(header);
    const mo = new MutationObserver(set);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", set);
    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", set);
      root.style.removeProperty("--header-h");
    };
  }, []);
  return null;
}
