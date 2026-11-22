"use client";

import { useEffect, useState, type FormEvent } from "react";
import { MAIL_API } from "@/lib/site";

const BTN =
  "btn inline-flex cursor-pointer items-center justify-center rounded-sm bg-navy px-8 py-6 font-sans text-[1.05rem] font-medium uppercase tracking-[0.06em] text-parchment-50 transition-colors hover:bg-navy-deep disabled:opacity-60 sm:px-10 sm:tracking-[0.14em]";

/**
 * The /unsubscribe/ page's logic: the address (prefilled from ?e=) or a signed link (?t=) goes to the mail Worker,
 * which removes it from the list. Read from window.location because the site is a static export.
 */
export function UnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [state, setState] = useState<"ready" | "working" | "done">("ready");
  const [error, setError] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setEmail(q.get("e") ?? "");
    setToken(q.get("t") ?? "");
  }, []);

  async function leave(e: FormEvent) {
    e.preventDefault();
    setError("");
    setState("working");
    try {
      const r = await fetch(`${MAIL_API}/unsubscribe`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(token ? { t: token } : { email }),
      });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (r.ok && d.ok) {
        setState("done");
        return;
      }
      setError(
        r.status === 400 && d.error === "expired"
          ? "This link has expired. Please type your email address below instead."
          : d.error || "Sorry, that did not go through. Please try again.",
      );
      if (r.status === 400 && d.error === "expired") setToken("");
    } catch {
      setError("Sorry, that did not go through. Please try again.");
    }
    setState("ready");
  }

  if (state === "done") {
    return (
      <p role="status" className="mt-8 max-w-2xl font-serif text-[1.6rem] leading-snug text-ink sm:text-[1.9rem]">
        Done. You will receive no more emails from us.
      </p>
    );
  }

  return (
    <form onSubmit={leave} className="mt-8 flex w-full max-w-xl flex-col items-center">
      {!token && (
        <>
          <label htmlFor="unsub-email" className="font-serif text-[1.6rem] leading-snug text-ink">
            Your email address
          </label>
          <input
            id="unsub-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-4 w-full rounded-sm border border-parchment-300 bg-parchment-50 px-5 py-4 text-[1.4rem] text-ink outline-none focus:border-gold"
          />
        </>
      )}
      {token && (
        <p className="font-serif text-[1.6rem] leading-snug text-ink">Press the button to leave the newsletter.</p>
      )}
      <button type="submit" disabled={state === "working"} className={`${BTN} mt-8`}>
        {state === "working" ? "One moment…" : "Unsubscribe"}
      </button>
      {error && (
        <p role="alert" className="mt-6 text-[1.25rem] leading-relaxed text-oxblood">
          {error}
        </p>
      )}
    </form>
  );
}
