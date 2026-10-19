"use client";

import { useEffect, useState } from "react";

/**
 * The thank-you notice on /support/ after a Stripe payment: each payment link sends the visitor back to
 * /support/?thanks=gift, ?thanks=friend or ?thanks=patron (owner 2026-10-20, via the membership chat).
 * Read after the page loads, as the site is a static export.
 */
const NOTES: Record<string, string> = {
  gift: "Thank you. Your gift has been received, and the Secretary will be in touch.",
  friend: "Thank you for becoming a Friend of the Association.",
  patron: "Thank you for becoming a Patron.",
};

export function SupportThanks() {
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("thanks") ?? "";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from the address after the page loads
    if (NOTES[key]) setNote(NOTES[key]);
  }, []);

  if (!note) return null;
  return (
    <div role="status" className="border-b border-gold/50 bg-parchment-50">
      <p className="mx-auto flex max-w-3xl items-start justify-center gap-4 px-6 py-5 text-center font-serif text-xl leading-snug text-navy sm:text-2xl">
        <span>{note}</span>
        <button
          type="button"
          onClick={() => setNote(null)}
          aria-label="Close"
          className="mt-0.5 shrink-0 font-sans text-base leading-none text-muted transition-colors hover:text-oxblood"
        >
          ✕
        </button>
      </p>
    </div>
  );
}
