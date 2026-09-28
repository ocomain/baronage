"use client";

import { useEffect, useState } from "react";
import { NavBadge } from "./NavBadge";

type Item = { id: string; label: string; badge?: string };

/**
 * Chapter list fixed to the right edge on wide screens (≥1180px), after the
 * pattern on ocomain.org. It appears once the in-page menu (`anchorId`) has
 * scrolled away, sits just below the sticky site header, and marks the section
 * being read. Hidden on narrower screens, where the in-page menu does the job.
 */
export function SectionSidebar({ items, anchorId }: { items: Item[]; anchorId: string }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [top, setTop] = useState(140);

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
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items, anchorId]);

  return (
    <aside
      aria-label="On this page"
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
                <span>
                  {it.label}
                  {it.badge && <NavBadge>{it.badge}</NavBadge>}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
