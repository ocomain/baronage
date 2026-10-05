"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavBadge } from "./NavBadge";
import { Wordmark } from "./Wordmark";
import { EmailSignup } from "./EmailSignup";
import { ExternalArrow } from "./primitives";
import { navMenu, ROLL_URL, CALENDLY_URL } from "@/lib/site";


function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  // Desktop drop-down currently open (the parent item's href), if any.
  const [menu, setMenu] = useState<string | null>(null);
  // Phone menu: which group (Guide, The Pledge, About) is unfolded, if any.
  const [group, setGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [headerBottom, setHeaderBottom] = useState(76);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  // Opening the phone menu unfolds the group the current page belongs to; otherwise all are folded.
  useEffect(() => {
    if (!open) return;
    const here = navMenu.find((item) => item.children && groupActive(item));
    setGroup(here ? here.href : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  // Anchor the mobile drawer to the header's actual bottom edge. The site-wide
  // banner sits above the sticky header and scrolls away, so the header's bottom
  // in the viewport shifts (banner visible ≈115px, scrolled ≈81px, tablet adds
  // the utility bar) — a hardcoded offset clipped the first drawer link.
  useEffect(() => {
    if (!open) return;
    const measure = () => {
      const el = headerRef.current;
      if (el) setHeaderBottom(el.getBoundingClientRect().bottom);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  // The header shows navMenu: seven items, three of them with a short list beneath (Guide,
  // The Pledge, About). Charitable Trust stays in the footer only. Member's Chamber is not
  // part of this row on desktop — it renders in the top row, just left of the gold "Verify
  // Title on the Roll" button — but is listed in the mobile drawer below.
  // A parent is marked active on its own page and on its children's pages; a Reading Room
  // paper listed under Guide leaves "Reading Room" as the active item.
  // A page listed under Guide that has a menu item of its own (About) stays under its own item.
  const groupActive = (item: (typeof navMenu)[number]) =>
    isActive(item.href) ||
    (item.children ?? []).some(
      (c) => !c.href.startsWith("/reading-room") && !navMenu.some((top) => top.href === c.href) && isActive(c.href)
    );

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-parchment-50" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      {/* Utility bar */}
      <div className="hidden bg-navy-deep text-parchment-200/80 md:block">
        {/* Large for older readers: grows with the window but stays inside the content column. */}
        <div className="mx-auto flex max-w-6xl items-center justify-start px-8 py-2.5 font-inscribe text-[clamp(0.66rem,1.1vw,0.9rem)] uppercase tracking-[0.16em]">
          <span className="text-parchment-200/75 lg:whitespace-nowrap">
            We maintain{" "}
            <a
              href={ROLL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-colors hover:text-gold-light"
            >
              The Roll of Scottish Barons
            </a>{" "}
            {/* Verified entries on the Roll marked as peers, counted 2026-10-04: 41 hereditary, 2 life peers, the Duke of Rothesay. */}
            — now with 44 peers verified holding Scottish baronies
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`relative z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-gold/30 bg-parchment-50 md:bg-parchment-50/95 shadow-[0_8px_30px_-18px_rgba(12,21,48,0.5)] backdrop-blur"
            : "border-transparent bg-parchment-50 md:bg-parchment-50/80 md:backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
          <Link href="/" aria-label="Baronage of Scotland Association — home" className="text-navy">
            <Wordmark />
          </Link>

          <EmailSignup className="hidden lg:block" />

          <div className="flex items-center gap-3">
            <Link
              href="/members"
              data-active={isActive("/members")}
              className={`nav-link hidden pr-2 font-sans text-[0.7rem] font-medium uppercase tracking-[0.13em] transition-colors lg:inline-flex ${
                isActive("/members") ? "text-oxblood" : "text-navy/75 hover:text-navy"
              }`}
            >
              Member’s Chamber
            </Link>
            <a
              href={ROLL_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Opens the Roll register (roll.baronage.com) in a new window"
              className="hidden items-center gap-1.5 rounded-sm bg-gold px-5 py-3 font-sans text-[0.6rem] font-medium uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-gold-light lg:inline-flex"
            >
              Verify Title on the Roll
              <ExternalArrow className="h-3 w-3" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-navy/20 text-navy transition-colors hover:border-gold hover:text-gold-deep lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-[5px]">
                <span className={`h-px w-6 bg-current transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`h-px w-6 bg-current transition ${open ? "opacity-0" : ""}`} />
                <span className={`h-px w-6 bg-current transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Desktop nav row */}
        <nav className="mx-auto hidden max-w-6xl items-center justify-center gap-x-7 gap-y-2 px-8 pb-4 lg:flex lg:flex-wrap">
          {navMenu.map((item) => {
            const active = groupActive(item);
            const cls = `nav-link inline-flex items-center font-sans text-[0.7rem] font-medium uppercase tracking-[0.1em] transition-colors ${
              active ? "text-oxblood" : "text-navy/75 hover:text-navy"
            }`;
            const badge = item.badge ? <NavBadge>{item.badge}</NavBadge> : null;
            if (!item.children) {
              return (
                <Link key={item.href} href={item.href} data-active={active} className={cls}>
                  {item.label}
                  {badge}
                </Link>
              );
            }
            const shown = menu === item.href;
            return (
              <div
                key={item.href}
                className="relative flex items-center"
                onMouseEnter={() => setMenu(item.href)}
                onMouseLeave={() => setMenu((m) => (m === item.href ? null : m))}
                onFocus={() => setMenu(item.href)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMenu((m) => (m === item.href ? null : m));
                }}
              >
                <Link
                  href={item.href}
                  data-active={active}
                  aria-haspopup="true"
                  aria-expanded={shown}
                  onClick={() => setMenu(null)}
                  className={cls}
                >
                  {item.label}
                  <svg viewBox="0 0 12 12" aria-hidden className="ml-1.5 h-2.5 w-2.5 opacity-70">
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                {/* The list sits flush under the row (pt-3 bridges the gap, so the pointer never leaves it). */}
                <div
                  className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-opacity duration-150 ${
                    shown ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <ul className="min-w-[15rem] border border-gold/40 bg-parchment-50 py-2 shadow-[0_18px_40px_-20px_rgba(12,21,48,0.55)]">
                    {/* Where selfInList is set, the parent page comes first in its own list: visitors do not expect the heading itself to be a link. */}
                    {(item.selfInList ? [{ href: item.href, label: item.selfLabel ?? item.label, external: false }, ...item.children] : item.children).map((c) => (
                      <li key={c.href}>
                        {c.external ? (
                          <a
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Opens ${c.href.replace(/^https?:\/\//, "").replace(/\/$/, "")} in a new window`}
                            onClick={() => setMenu(null)}
                            className="flex items-center gap-1.5 px-5 py-3 font-sans text-[0.74rem] font-medium uppercase tracking-[0.1em] text-navy/80 transition-colors hover:bg-parchment-100 hover:text-navy"
                          >
                            {c.label}
                            <ExternalArrow className="h-3 w-3" />
                          </a>
                        ) : (
                          <Link
                            href={c.href}
                            onClick={() => setMenu(null)}
                            className={`block px-5 py-3 font-sans text-[0.74rem] font-medium uppercase tracking-[0.1em] transition-colors hover:bg-parchment-100 ${
                              (c.href === item.href ? pathname === item.href || pathname === item.href + "/" : isActive(c.href)) ? "text-oxblood" : "text-navy/80 hover:text-navy"
                            }`}
                          >
                            {c.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 top-0 z-40 bg-navy-deep/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="fixed inset-x-0 z-40 overflow-y-auto border-b border-gold/30 bg-parchment-50 px-6 pb-8 pt-4 shadow-heritage lg:hidden"
              style={{ top: headerBottom, maxHeight: `calc(100svh - ${headerBottom}px)` }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col divide-y divide-parchment-300/70">
                {navMenu.map((item) => {
                  if (!item.children) {
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center py-3.5 font-display text-lg ${
                            isActive(item.href) ? "text-oxblood" : "text-navy"
                          }`}
                        >
                          {item.label}
                          {item.badge && <NavBadge>{item.badge}</NavBadge>}
                        </Link>
                      </li>
                    );
                  }
                  // A group: tapping the heading unfolds its list (it does not leave the page).
                  const unfolded = group === item.href;
                  const entries = item.selfInList
                    ? [{ href: item.href, label: item.selfLabel ?? item.label, external: false }, ...item.children]
                    : item.children;
                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={() => setGroup(unfolded ? null : item.href)}
                        aria-expanded={unfolded}
                        className={`flex w-full items-center justify-between py-3.5 text-left font-display text-lg ${
                          groupActive(item) ? "text-oxblood" : "text-navy"
                        }`}
                      >
                        {item.label}
                        <svg
                          viewBox="0 0 12 12"
                          aria-hidden
                          className={`h-4 w-4 transition-transform ${unfolded ? "rotate-180" : ""}`}
                        >
                          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {unfolded && (
                        <ul className="mb-3 ml-1 border-l border-gold/40 pl-4">
                          {entries.map((c) => (
                            <li key={c.href}>
                              {c.external ? (
                                <a
                                  href={c.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 py-3 font-serif text-lg text-navy/80"
                                >
                                  {c.label}
                                  <ExternalArrow className="h-3.5 w-3.5" />
                                </a>
                              ) : (
                                <Link
                                  href={c.href}
                                  className={`block py-3 font-serif text-lg ${
                                    (c.href === item.href ? pathname === item.href || pathname === item.href + "/" : isActive(c.href))
                                      ? "text-oxblood"
                                      : "text-navy/80"
                                  }`}
                                >
                                  {c.label}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/members"
                    className={`block py-3.5 font-display text-lg ${
                      isActive("/members") ? "text-oxblood" : "text-navy"
                    }`}
                  >
                    Member’s Chamber
                  </Link>
                </li>
              </ul>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block text-sm uppercase tracking-[0.18em] text-gold-deep"
              >
                Request a Call Back
              </a>
              <EmailSignup variant="block" className="mt-7 border-t border-parchment-300/70 pt-6" />
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
