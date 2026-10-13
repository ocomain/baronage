"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Opens a paper's footnotes in the same pop-up card as <Footnote> on the www pages, instead of
 * sending the reader to the list at the foot of the page.
 *
 * A paper's text is generated HTML, so this listens for clicks on its footnote numbers and shows the
 * matching note from the "Notes" list. Without JavaScript, and on paper, the number still leads to
 * the note in the list.
 */
export function PaperNotePopups() {
  const [note, setNote] = useState<{ n: string; html: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setNote(null);
    opener.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Leave modified clicks alone (open in a new tab, and so on).
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('.paper-body sup.fnref a[href^="#fn-"]');
      if (!(link instanceof HTMLAnchorElement)) return;
      const n = (link.getAttribute("href") ?? "").slice(4);
      const item = document.getElementById(`fn-${n}`);
      if (!item) return;
      const copy = item.cloneNode(true) as HTMLElement;
      copy.querySelectorAll(".fnback").forEach((back) => back.remove());
      e.preventDefault();
      opener.current = link;
      setNote({ n, html: copy.innerHTML.trim() });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!note) return;
    closeButton.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [note, close]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {note && (
        <motion.div
          className="no-print fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/45 p-4 backdrop-blur-[2px] sm:p-6"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Reference, note ${note.n}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto border border-gold/40 bg-parchment-50 p-6 text-left shadow-[0_30px_70px_-25px_rgba(8,12,28,0.6)] sm:p-8"
          >
            <div className="flex items-center justify-between gap-6 border-b border-parchment-300/70 pb-3">
              <span className="font-inscribe text-[0.7rem] uppercase tracking-[0.22em] text-gold-deep">
                Reference · Note {note.n}
              </span>
              <button
                ref={closeButton}
                type="button"
                onClick={close}
                aria-label="Close reference"
                className="-mr-1 -mt-1 cursor-pointer border-0 bg-transparent p-1 text-2xl leading-none text-muted transition-colors hover:text-oxblood"
              >
                ×
              </button>
            </div>
            <div
              className="paper-notes mt-4 font-serif text-[0.95rem] leading-relaxed text-ink-soft [&_strong]:text-navy"
              dangerouslySetInnerHTML={{ __html: note.html }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
