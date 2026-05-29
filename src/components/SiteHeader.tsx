"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "./Wordmark";
import { navLinks, site } from "@/lib/site";

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
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-navy-deep text-parchment-200/80 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-2 text-[0.7rem] tracking-[0.18em] uppercase">
          <span>{site.established}</span>
          <a href={`mailto:${site.email}`} className="nav-link transition-colors hover:text-gold">
            {site.email}
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-gold/30 bg-parchment-50/95 shadow-[0_8px_30px_-18px_rgba(12,21,48,0.5)] backdrop-blur"
            : "border-transparent bg-parchment-50/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
          <Link href="/" aria-label="Baronage of Scotland — home" className="text-navy">
            <Wordmark crestClassName="text-gold-deep" crestSize={scrolled ? 34 : 40} />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/the-roll"
              className="hidden rounded-sm bg-gold px-5 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-navy-deep transition-colors hover:bg-gold-light lg:inline-flex"
            >
              Verify on the Roll
            </Link>
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={isActive(link.href)}
              className={`nav-link font-body text-[0.95rem] tracking-wide transition-colors ${
                isActive(link.href) ? "text-oxblood" : "text-navy/80 hover:text-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
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
              className="fixed inset-x-0 z-40 border-b border-gold/30 bg-parchment-50 px-6 pb-8 pt-4 shadow-heritage lg:hidden"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col divide-y divide-parchment-300/70">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block py-3.5 font-display text-lg ${
                        isActive(link.href) ? "text-oxblood" : "text-navy"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 block text-sm uppercase tracking-[0.18em] text-gold-deep"
              >
                {site.email}
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
