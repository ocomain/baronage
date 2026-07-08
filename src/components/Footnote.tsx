"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

/**
 * A footnote marker that reveals its citation in a small pop-up card on click,
 * instead of sending the reader to a long list at the foot of the page.
 *
 * The card is rendered through a portal to <body> so it is never nested inside
 * the surrounding <p> (which would be invalid HTML) and always sits above the page.
 */
export function Footnote({
  n,
  children,
  label,
  triggerClassName,
  heading,
}: {
  n: number;
  children: ReactNode;
  /** Optional text trigger — renders instead of the superscript number. */
  label?: string;
  triggerClassName?: string;
  /** Optional heading for the pop-up card (defaults to "Reference · Note {n}"). */
  heading?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {label ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={triggerClassName ?? "cursor-pointer border-0 bg-transparent p-0 underline underline-offset-2"}
        >
          {label}
        </button>
      ) : (
      <sup className="text-[0.62em] leading-none">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={`Show footnote ${n}`}
          className="cursor-pointer border-0 bg-transparent p-0 font-sans font-semibold text-gold-deep underline decoration-dotted decoration-gold/40 underline-offset-2 transition-colors hover:text-oxblood"
        >
          {n}
        </button>
      </sup>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/45 p-4 backdrop-blur-[2px] sm:p-6"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={heading ?? `Footnote ${n}`}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto border border-gold/40 bg-parchment-50 p-6 text-left shadow-[0_30px_70px_-25px_rgba(8,12,28,0.6)] sm:p-8"
                >
                  <div className="flex items-center justify-between gap-6 border-b border-parchment-300/70 pb-3">
                    <span className="font-inscribe text-[0.7rem] uppercase tracking-[0.22em] text-gold-deep">
                      {heading ?? `Reference · Note ${n}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close footnote"
                      className="-mr-1 -mt-1 cursor-pointer border-0 bg-transparent p-1 text-2xl leading-none text-muted transition-colors hover:text-oxblood"
                    >
                      ×
                    </button>
                  </div>
                  <div className="mt-4 space-y-3 font-serif text-[0.95rem] leading-relaxed text-ink-soft [&_strong]:text-navy">
                    {children}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
