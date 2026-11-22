"use client";

import { useEffect, useState } from "react";
import { MAIL_API } from "@/lib/site";
import { EmailSignup } from "@/components/EmailSignup";

const BTN =
  "btn inline-flex cursor-pointer items-center justify-center rounded-sm bg-gold px-8 py-6 font-sans text-[1.05rem] font-medium uppercase tracking-[0.06em] text-navy-deep shadow-[0_10px_30px_-12px_rgba(201,162,75,0.7)] transition-all duration-300 hover:bg-gold-light disabled:opacity-60 sm:px-10 sm:tracking-[0.14em]";

/**
 * The /confirm/ page's logic. Owner 2026-11-22: "there should be no one last step button -- clicking confirm in the
 * email should confirm". So the page confirms by itself as soon as it opens in the reader's browser (a script POSTs the
 * token to the mail Worker), then goes on to /welcome/. A mail scanner that only fetches the link runs no script and
 * confirms no one; a scanner that runs scripts can. A button appears only if the confirmation fails, to try again.
 * The token is read from the address in the browser (window.location), since the site is a static export.
 */
export function ConfirmSubscription() {
  const [state, setState] = useState<"working" | "bad" | "failed">("working");
  const [token, setToken] = useState<string | null>(null);

  async function confirm(t: string) {
    setState("working");
    try {
      const r = await fetch(`${MAIL_API}/subscribe/confirm`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ t }),
      });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; welcome?: string; error?: string };
      if (r.ok && d.ok && d.welcome) {
        window.location.replace(d.welcome);
        return;
      }
      setState(r.status === 400 ? "bad" : "failed");
    } catch {
      setState("failed");
    }
  }

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("t");
    setToken(t);
    if (t) confirm(t);
    else setState("bad");
  }, []);

  if (state === "bad") {
    return (
      <>
        <p className="mt-8 max-w-2xl font-serif text-[1.6rem] leading-snug text-ink sm:text-[1.9rem]">
          This link has expired or is not complete. Please sign up again.
        </p>
        <div className="mt-8 w-full max-w-xl text-left">
          <EmailSignup variant="block" />
        </div>
      </>
    );
  }

  if (state === "failed" && token) {
    return (
      <>
        <p role="alert" className="mt-8 max-w-2xl font-serif text-[1.6rem] leading-snug text-ink sm:text-[1.9rem]">
          Sorry, that did not go through.
        </p>
        <button type="button" onClick={() => confirm(token)} className={`${BTN} mt-10`}>
          Try again
        </button>
      </>
    );
  }

  return <p className="mt-8 font-serif text-[1.6rem] leading-snug text-ink sm:text-[1.9rem]">One moment…</p>;
}
