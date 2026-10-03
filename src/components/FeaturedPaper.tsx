"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { PaperThumbnail } from "@/components/PaperThumbnail";
import { FEATURED_PAPER } from "@/lib/site";

const HREF = `/reading-room/${FEATURED_PAPER.slug}/`;
// Closed with X — hidden for the rest of this visit, on this site AND on the Roll, and shown again on the
// next visit. The two sites are separate origins and cannot see each other's storage, so the close is kept
// in a cookie on .baronage.com that both can read. It lasts 30 minutes and is renewed on every page view,
// which is what "the rest of the visit" means here. No personal information is stored.
const CLOSED_COOKIE = "bsa_fp_closed";
const VISIT_SECONDS = 30 * 60;
// Fallback when cookies are unavailable: this tab only.
const CLOSED_KEY = `bsa-featured-closed:${FEATURED_PAPER.slug}`;
// The card has already slid in this visit — show it at once on every later page.
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

function closedCookieSet(): boolean {
  try {
    return document.cookie.split("; ").includes(`${CLOSED_COOKIE}=${FEATURED_PAPER.slug}`);
  } catch {
    return false;
  }
}
/** Record (or renew) the close for this visit, across www and the Roll. */
function markClosed() {
  try {
    const host = location.hostname;
    const domain = host === "baronage.com" || host.endsWith(".baronage.com") ? "; domain=.baronage.com" : "";
    const secure = location.protocol === "https:" ? "; secure" : "";
    document.cookie = `${CLOSED_COOKIE}=${FEATURED_PAPER.slug}; max-age=${VISIT_SECONDS}; path=/; samesite=lax${secure}${domain}`;
  } catch {}
  if (!closedCookieSet()) writeKey("session", CLOSED_KEY, "1");
}
function isClosed(): boolean {
  return closedCookieSet() || readKey("session", CLOSED_KEY) !== null;
}

/**
 * Non-blocking featured-paper card. Slides in four seconds after a visitor arrives, or once they start
 * scrolling, then stays on every page of the visit until closed with X, which hides it for the rest of
 * that visit only, here and on the Roll — reading the paper does not close it, and Esc (which closes reference pop-ups) never
 * touches it. Hidden throughout the Reading Room. Sits beneath the mobile menu (z-30 under its z-40 overlay).
 * If it would cover a page's own floating menu (anything marked data-clear-of-featured-paper, e.g. the section
 * list on Proper Address), it slips away for the rest of that page. Not a close: nothing is stored, and it
 * shows again on the next page.
 */
export function FeaturedPaper() {
  const pathname = usePathname();
  const [eligible, setEligible] = useState(false);
  const [shown, setShown] = useState(false);
  const [cleared, setCleared] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Until 2026-09-28 a close was kept for good in localStorage; clear it so those visitors see the card again.
    try {
      localStorage.removeItem(CLOSED_KEY);
    } catch {}
  }, []);

  useEffect(() => {
    // Anywhere in the Reading Room (the index and every paper) the visitor is already among the papers.
    const inReadingRoom = pathname.replace(/\/?$/, "/").startsWith("/reading-room/");
    const closed = isClosed();
    if (closed) markClosed(); // still browsing: keep it closed for another 30 minutes
    const ok = !inReadingRoom && !closed;
    setEligible(ok);
    setCleared(false);
    if (!ok) setShown(false);
  }, [pathname]);

  // Never sit on top of a page's floating menu: if the two would overlap, the card slips away for this page.
  useEffect(() => {
    if (!shown || cleared) return;
    const check = () => {
      const card = ref.current?.getBoundingClientRect();
      if (!card) return;
      for (const el of document.querySelectorAll<HTMLElement>("[data-clear-of-featured-paper]")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || Number(getComputedStyle(el).opacity) < 0.5) continue;
        if (r.left < card.right && r.right > card.left && r.top < card.bottom && r.bottom > card.top) {
          setCleared(true);
          return;
        }
      }
    };
    check();
    const tick = window.setInterval(check, 800); // catches the menu fading in
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.clearInterval(tick);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [shown, cleared]);

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
    markClosed();
    setShown(false);
    setEligible(false);
  }, []);

  if (!eligible) return null;

  return (
    <aside
      ref={ref}
      aria-label="Featured paper"
      inert={!shown || cleared}
      className={`fixed inset-x-4 bottom-4 z-30 transition-all duration-500 ease-out motion-reduce:transition-none sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[24rem] ${
        shown && !cleared ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
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
