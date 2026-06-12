"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "./Wordmark";
import { ExternalArrow } from "./primitives";
import { navLinks, ROLL_URL, CALENDLY_URL } from "@/lib/site";

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 bg-parchment-50" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      {/* Utility bar */}
      <div className="hidden bg-navy-deep text-parchment-200/80 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-start px-8 py-2 font-inscribe text-[0.62rem] uppercase tracking-[0.24em]">
          <span className="text-parchment-200/75">
            We maintain{" "}
            <a
              href={ROLL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-colors hover:text-gold-light"
            >
              The Roll of Scottish Barons
            </a>{" "}
            an open-source title verification register
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

          <div className="flex items-center gap-3">
            <Link
              href="/members"
              className={`nav-link hidden font-sans text-[0.7rem] font-medium uppercase tracking-[0.13em] transition-colors lg:inline-block ${
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
          {navLinks.map((link) => {
            const cls = `nav-link font-sans text-[0.7rem] font-medium uppercase tracking-[0.13em] transition-colors ${
              isActive(link.href) ? "text-oxblood" : "text-navy/75 hover:text-navy"
            }`;
            return link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} data-active={isActive(link.href)} className={cls}>
                {link.label}
              </Link>
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
              style={{ top: "calc(4.75rem + env(safe-area-inset-top, 0px))", maxHeight: "calc(100svh - 4.75rem - env(safe-area-inset-top, 0px))" }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col divide-y divide-parchment-300/70">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-3.5 font-display text-lg text-navy"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={`block py-3.5 font-display text-lg ${
                          isActive(link.href) ? "text-oxblood" : "text-navy"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
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
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
