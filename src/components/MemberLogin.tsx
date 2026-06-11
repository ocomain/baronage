"use client";

import { useState } from "react";
import { Seal } from "./Seal";
import { ExternalArrow } from "./primitives";
import { CALENDLY_URL } from "@/lib/site";

const fieldClass =
  "mt-2 w-full border border-parchment-300 bg-parchment-50 px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-gold focus:ring-1 focus:ring-gold/40";

export function MemberLogin() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative w-full max-w-md border border-gold/30 bg-parchment-50/95 p-8 shadow-[0_40px_90px_-35px_rgba(8,12,28,0.85)] backdrop-blur-sm sm:p-10">
      <div className="pointer-events-none absolute inset-3 border border-gold/15" aria-hidden />

      <div className="flex flex-col items-center text-center">
        <Seal tone="ink" className="h-36 w-36 sm:h-44 sm:w-44" />
        <h1 className="eyebrow mt-6">Member’s Area</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="mt-8"
      >
        <label className="block text-sm font-medium text-ink">
          Email
          <input type="email" name="email" autoComplete="email" required className={fieldClass} />
        </label>
        <label className="mt-5 block text-sm font-medium text-ink">
          Password
          <input type="password" name="password" autoComplete="current-password" required className={fieldClass} />
        </label>
        <div className="mt-3 text-right">
          <a href="/contact" className="text-xs text-muted underline underline-offset-2 transition-colors hover:text-oxblood">
            Forgotten your password?
          </a>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-navy px-8 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-parchment-50 transition-colors hover:bg-navy-deep"
        >
          Sign in
        </button>

        {submitted ? (
          <p className="mt-5 text-center text-sm leading-relaxed text-ink-soft">
            The members’ portal is being prepared. New members are enrolled following a call with the Secretary —
            please request a call back below.
          </p>
        ) : null}
      </form>

      <div className="mt-7 border-t border-parchment-300/70 pt-6 text-center">
        <p className="text-sm text-ink-soft">Not yet a member?</p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-deep transition-colors hover:text-oxblood"
        >
          Request a Call Back for access
          <ExternalArrow className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
