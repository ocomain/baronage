"use client";

import { useId, useState, type FormEvent } from "react";
import { PrintButton } from "./PrintButton";
import { SITE_URL } from "@/lib/site";

/** The Association's own sender for "Email to a friend": a small Worker in front of Resend (see ~/baronage-mail). */
const ENDPOINT = "https://baronage-mail.antoin-405.workers.dev/friend";
const NOTE_MAX = 400;
const FAILED = "Sorry, the message could not be sent just now.";

const LABEL = "block font-sans text-[0.95rem] font-semibold text-navy";
const FIELD =
  "mt-1.5 w-full rounded-sm border border-parchment-300 bg-white px-3.5 py-3 font-sans text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold";

/**
 * The buttons under a paper's title and at its foot: "Print this paper" and "Email to a friend". The second
 * opens a short form (friend's address, the sender's name and address, an optional note); the Association's
 * sender emails the friend once and keeps neither address. Without JavaScript the button is a plain mailto
 * link, and the same link is offered if a send fails. Hidden on paper.
 */
export function PaperActions({
  title,
  slug,
  showPrint = true,
  className = "",
}: {
  title: string;
  slug: string;
  /** A subscriber paper offers printing only once it has been opened (see SealedPaper). */
  showPrint?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [error, setError] = useState("");
  const id = useId();

  const url = `${SITE_URL}/reading-room/${slug}/`;
  const mailto = `mailto:?subject=${encodeURIComponent(`${title} (Baronage of Scotland Association)`)}&body=${encodeURIComponent(
    `I thought you would like to read this paper from the Reading Room of the Baronage of Scotland Association:\n\n${title}\n${url}\n`,
  )}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const field = (name: string) => String(f.get(name) ?? "");
    setState("sending");
    setError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        credentials: "omit",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          to: field("to"),
          name: field("name"),
          email: field("email"),
          comment: field("comment"),
          url,
          website: field("website"),
        }),
      });
      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState("sent");
        return;
      }
      setError(typeof data.error === "string" && data.error ? data.error : FAILED);
    } catch {
      setError(FAILED);
    }
    setState("failed");
  }

  return (
    <div className={`no-print ${className}`}>
      <div className="flex flex-wrap gap-3">
        {showPrint && <PrintButton />}
        <a
          href={mailto}
          role="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={(e) => {
            e.preventDefault();
            setOpen((o) => !o);
          }}
          className="inline-flex min-h-[3rem] cursor-pointer items-center gap-3 border-2 border-navy bg-parchment-50 px-5 py-2.5 font-sans text-[1.05rem] font-semibold text-navy transition-colors hover:border-oxblood hover:text-oxblood focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <svg aria-hidden viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="1.5" />
            <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
          </svg>
          Email to a friend
        </a>
      </div>

      {open && (
        <div id={`${id}-panel`} className="mt-4 max-w-xl border border-parchment-300 bg-parchment-100 p-4 sm:p-6">
          {state === "sent" ? (
            <div role="status">
              <p className="font-display text-2xl leading-tight text-navy">Sent. Thank you.</p>
              <p className="mt-2 font-sans text-[0.95rem] leading-relaxed text-ink-soft">
                Your friend will have it in a minute or two. If they reply, the reply comes to you.
              </p>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="mt-4 cursor-pointer font-sans text-[0.95rem] font-semibold text-oxblood underline decoration-oxblood/30 underline-offset-4 hover:text-oxblood-deep"
              >
                Send it to someone else
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <p className="font-display text-2xl leading-tight text-navy">Email this paper to a friend</p>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor={`${id}-to`} className={LABEL}>
                    Your friend’s email
                  </label>
                  <input id={`${id}-to`} name="to" type="email" required maxLength={254} autoComplete="off" className={FIELD} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${id}-name`} className={LABEL}>
                      Your name
                    </label>
                    <input id={`${id}-name`} name="name" type="text" required minLength={2} maxLength={60} autoComplete="name" className={FIELD} />
                  </div>
                  <div>
                    <label htmlFor={`${id}-email`} className={LABEL}>
                      Your email
                    </label>
                    <input id={`${id}-email`} name="email" type="email" required maxLength={254} autoComplete="email" className={FIELD} />
                  </div>
                </div>
                <div>
                  <label htmlFor={`${id}-comment`} className={LABEL}>
                    A short note <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <textarea id={`${id}-comment`} name="comment" rows={3} maxLength={NOTE_MAX} className={`${FIELD} resize-y`} />
                </div>
                {/* Left empty by people; filled in by robots. */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
              </div>
              <p className="mt-4 font-sans text-[0.88rem] leading-relaxed text-ink-soft">
                We send your friend one email with a link to this paper, and we keep neither address.
              </p>
              {state === "failed" && (
                <p role="alert" className="mt-3 border-l-4 border-oxblood bg-parchment-50 px-4 py-3 font-sans text-[0.95rem] leading-relaxed text-navy">
                  {error} You can also{" "}
                  <a href={mailto} className="font-semibold text-oxblood underline decoration-oxblood/30 underline-offset-4">
                    send it from your own email
                  </a>
                  .
                </p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="inline-flex min-h-[3rem] cursor-pointer items-center border-2 border-navy bg-navy px-6 py-2.5 font-sans text-[1.05rem] font-semibold text-parchment-50 transition-colors hover:border-oxblood hover:bg-oxblood disabled:cursor-wait disabled:opacity-70"
                >
                  {state === "sending" ? "Sending…" : "Send"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer font-sans text-[0.95rem] font-semibold text-ink-soft underline decoration-parchment-300 underline-offset-4 hover:text-oxblood"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
