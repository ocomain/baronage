"use client";

import { useEffect, useState } from "react";
import { NavBadge } from "./NavBadge";

type Item = { id: string; label: string; badge?: string };

/**
 * Section navigation for long pages, after the pattern on ocomain.org.
 *  - Wide screens (≥1180px): a chapter list fixed to the right edge, just below
 *    the sticky site header, marking the section being read.
 *  - Narrower screens: a "Sections" pill fixed bottom-right that opens a
 *    full-screen list; picking a section closes it and jumps there.
 * Both appear once the in-page menu (`anchorId`) has scrolled away. The pill
 * lifts above the featured-paper card whenever that card is on screen; the
 * list is marked so the card slips away rather than overlap it.
 */
export function SectionSidebar({ items, anchorId }: { items: Item[]; anchorId: string }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [top, setTop] = useState(140);
  const [fabBottom, setFabBottom] = useState(24);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const header = document.querySelector("header");
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
      setTop(Math.max(24, Math.round(headerBottom + 24)));

      const anchor = document.getElementById(anchorId);
      setVisible(anchor ? anchor.getBoundingClientRect().bottom < headerBottom : window.scrollY > 600);

      // The section being read: the last one whose heading has passed a line
      // a third of the way down the screen.
      const line = window.innerHeight / 3;
      let current = items[0]?.id ?? "";
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);

      // Keep the pill clear of the featured-paper card when it is showing.
      const card = document.querySelector<HTMLElement>('aside[aria-label="Featured paper"]');
      const cardTop = card && Number(getComputedStyle(card).opacity) > 0.5 ? card.getBoundingClientRect().top : null;
      setFabBottom(cardTop !== null && cardTop < window.innerHeight ? Math.round(window.innerHeight - cardTop + 12) : 24);
    };
    update();
    const tick = window.setInterval(update, 800); // catches the card sliding in or being closed
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.clearInterval(tick);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items, anchorId]);

  // While the list is open: Esc closes it and the page behind does not scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const label = (it: Item) => (
    <span>
      {it.label}
      {it.badge && <NavBadge>{it.badge}</NavBadge>}
    </span>
  );

  return (
    <>
      {/* Wide screens: fixed chapter list on the right */}
      <aside
        aria-label="On this page"
        data-clear-of-featured-paper
        style={{ top, maxHeight: `calc(100vh - ${top + 40}px)` }}
        className={`fixed right-4 z-40 hidden w-[160px] overflow-y-auto border-l-2 border-gold bg-parchment-50/95 py-3 pl-3 pr-2.5 shadow-[0_10px_30px_-18px_rgba(12,21,48,0.45)] backdrop-blur-sm transition-opacity duration-300 min-[1180px]:block ${
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ol className="space-y-2">
          {items.map((it) => {
            const on = it.id === active;
            return (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`flex gap-1.5 font-serif text-[0.95rem] leading-tight transition-colors ${
                    on ? "font-semibold text-oxblood" : "text-navy/75 hover:text-oxblood"
                  }`}
                >
                  <span aria-hidden="true" className={on ? "text-oxblood" : "text-gold-deep"}>
                    —
                  </span>
                  {label(it)}
                </a>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Narrower screens: "Sections" pill and full-screen list */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        style={{ bottom: `calc(${fabBottom}px + env(safe-area-inset-bottom, 0px))` }}
        className={`fixed right-4 z-40 inline-flex items-center gap-2 rounded-full border-2 border-gold bg-navy-deep px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-parchment-50 shadow-[0_12px_28px_-12px_rgba(8,12,28,0.7)] transition-[opacity,bottom] duration-300 active:scale-[0.97] min-[1180px]:hidden ${
          visible && !open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span aria-hidden="true" className="text-sm leading-none">
          ☰
        </span>
        Sections
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Sections on this page"
          className="fixed inset-0 z-[70] overflow-y-auto bg-navy-deep/[0.97] px-6 pb-28 pt-6 backdrop-blur-md min-[1180px]:hidden"
        >
          <div className="mx-auto max-w-md">
            <div className="flex items-center justify-between">
              <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold">On this page</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close section list"
                className="flex h-11 w-11 items-center justify-center text-3xl leading-none text-parchment-50/80 transition-colors hover:text-parchment-50"
              >
                ×
              </button>
            </div>
            <ol className="mt-4 space-y-1">
              {items.map((it) => {
                const on = it.id === active;
                return (
                  <li key={it.id}>
                    <a
                      href={`#${it.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={on ? "true" : undefined}
                      className={`flex gap-3 border-l-2 py-2.5 pl-3 font-serif text-xl leading-snug transition-colors ${
                        on ? "border-gold font-semibold text-parchment-50" : "border-transparent text-parchment-50/80 hover:text-parchment-50"
                      }`}
                    >
                      <span aria-hidden="true" className="text-gold">
                        —
                      </span>
                      {label(it)}
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
