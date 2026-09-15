"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PaperThumbnail } from "@/components/PaperThumbnail";
import { FEATURED_PAPER } from "@/lib/site";

const HREF = `/reading-room/${FEATURED_PAPER.slug}/`;
// Both keyed by slug, so featuring a different paper shows the card again to visitors who closed the last one.
// localStorage: closed with X — never shown again.
const CLOSED_KEY = `bsa-featured-closed:${FEATURED_PAPER.slug}`;
// sessionStorage: the card has already slid in this visit — show it at once on every later page.
const REVEALED_KEY = `bsa-featured-revealed:${FEATURED_PAPER.slug}`;

// Storage can be unavailable (private windows, blocked site data); the card then simply behaves as first-visit.
function readKey(kind: "local" | "session", key: string): string | null {
  try {
    return (kind === "local" ? localStorage : sessionStorage).getItem(key);
  } catch {
    return null;
  }
}
function writeKey(kind: "local" | "session", key: string, value: string) {
  try {
    (kind === "local" ? localStorage : sessionStorage).setItem(key, value);
  } catch {}
}

/**
 * Non-blocking featured-paper card. Slides in four seconds after a visitor arrives, or once they start
 * scrolling, then stays on every page of the visit until closed with X — reading the paper does not close it.
 * Hidden while on the paper itself. Sits beneath the mobile menu (z-30 under its z-40 overlay).
 */
export function FeaturedPaper() {
  const pathname = usePathname();
  const [eligible, setEligible] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onPaper = pathname.replace(/\/?$/, "/") === HREF;
    const ok = !onPaper && readKey("local", CLOSED_KEY) === null;
    setEligible(ok);
    if (!ok) setShown(false);
  }, [pathname]);

  useEffect(() => {
    if (!eligible || shown) return;
    const reveal = () => {
      writeKey("session", REVEALED_KEY, "1");
      setShown(true);
    };
    if (readKey("session", REVEALED_KEY) !== null) {
      reveal();
      return;
    }
    const timer = window.setTimeout(reveal, 4000);
    const onScroll = () => {
      if (window.scrollY > 300) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [eligible, shown]);

  const dismiss = useCallback(() => {
    writeKey("local", CLOSED_KEY, "1");
    setShown(false);
    setEligible(false);
  }, []);

  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shown, dismiss]);

  if (!eligible) return null;

  return (
    <aside
      aria-label="Featured paper"
      inert={!shown}
      className={`fixed inset-x-4 bottom-4 z-30 transition-all duration-500 ease-out motion-reduce:transition-none sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[24rem] ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="relative border border-gold/50 bg-parchment-50 p-4 pr-11 shadow-[0_24px_60px_-24px_rgba(10,16,36,0.55)] sm:p-5 sm:pr-12">
        <span className="pointer-events-none absolute inset-1.5 border border-gold/20" aria-hidden />
        <div className="relative flex items-start gap-4">
          <Link href={HREF} tabIndex={-1} aria-hidden className="hidden shrink-0 min-[380px]:block">
            <PaperThumbnail title={FEATURED_PAPER.title} category={FEATURED_PAPER.category} size="sm" />
          </Link>
          <div className="min-w-0">
            <p className="eyebrow text-[0.6rem]">Featured paper</p>
            <p className="mt-1.5 font-display text-lg leading-snug text-navy sm:text-xl">{FEATURED_PAPER.title}</p>
            <Link
              href={HREF}
              className="mt-3 inline-flex items-center gap-1.5 bg-navy px-3.5 py-2 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-parchment-50 transition-colors hover:bg-oxblood"
            >
              Read the paper <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        {/* Desktop only: a full-width footer line, so the label never wraps beside the thumbnail. */}
        <Link
          href="/reading-room"
          className="relative mt-4 hidden whitespace-nowrap border-t border-parchment-300/70 pt-3 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-gold-deep transition-colors hover:text-oxblood sm:-mr-7 sm:block"
        >
          More papers in the Reading Room <span aria-hidden>→</span>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close featured paper"
          className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center font-sans text-xl leading-none text-ink-soft transition-colors hover:text-oxblood"
        >
          ×
        </button>
      </div>
    </aside>
  );
}
