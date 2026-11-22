"use client";

import { useEffect, useState } from "react";
import { MAIL_API } from "@/lib/site";
import { EmailSignup } from "@/components/EmailSignup";

const BTN =
  "btn inline-flex cursor-pointer items-center justify-center rounded-sm bg-gold px-8 py-6 font-sans text-[1.05rem] font-medium uppercase tracking-[0.06em] text-navy-deep shadow-[0_10px_30px_-12px_rgba(201,162,75,0.7)] transition-all duration-300 hover:bg-gold-light disabled:opacity-60 sm:px-10 sm:tracking-[0.14em]";

/**
 * The /confirm/ page's logic. The emailed link only opens this page; nothing is confirmed until the reader presses the
 * button, which POSTs the token to the mail Worker (a mail scanner that merely fetches the link confirms no one).
 * The token is read from the address in the browser (window.location), since the site is a static export.
 */
export function ConfirmSubscription() {
  const [token, setToken] = useState<string | null | undefined>(undefined); // undefined until the page has loaded
  const [state, setState] = useState<"ready" | "working" | "bad" | "failed">("ready");

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("t"));
  }, []);

  async function confirm() {
    if (!token) return;
    setState("working");
    try {
      const r = await fetch(`${MAIL_API}/subscribe/confirm`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ t: token }),
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

  if (token === undefined) return <p className="mt-8 font-serif text-[1.6rem] leading-snug text-ink">One moment…</p>;

  if (!token || state === "bad") {
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

  return (
    <>
      <p className="mt-8 max-w-2xl font-serif text-[1.6rem] leading-snug text-ink sm:text-[1.9rem]">
        Please press the button to confirm your subscription to the free newsletter.
      </p>
      <button type="button" onClick={confirm} disabled={state === "working"} className={`${BTN} mt-10`}>
        {state === "working" ? "One moment…" : "Confirm my subscription"}
      </button>
      {state === "failed" && (
        <p role="alert" className="mt-6 max-w-xl text-[1.25rem] leading-relaxed text-oxblood">
          Sorry, that did not go through. Please press the button again.
        </p>
      )}
    </>
  );
}
