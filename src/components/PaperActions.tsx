"use client";

import { useId, useState, type FormEvent } from "react";
import { PrintButton } from "./PrintButton";
import { SITE_URL } from "@/lib/site";

/** The Association's own sender for "Email to a friend": a small Worker in front of Resend (see ~/baronage-mail). */
const ENDPOINT = "https://baronage-mail.antoin-405.workers.dev/friend";
/** The same Worker signs the sender up for the newsletter when they ask for it after a send (Zoho then asks them to confirm). */
const NEWSLETTER_ENDPOINT = "https://baronage-mail.antoin-405.workers.dev/newsletter";
const NOTE_MAX = 400;
/** The most friends one send may go to; the Worker holds the same figure. */
const FRIENDS_MAX = 50;
const ADDRESS = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FAILED = "Sorry, the message could not be sent just now.";

const LABEL = "block font-sans text-[0.95rem] font-semibold text-navy";
const FIELD =
  "mt-1.5 w-full rounded-sm border border-parchment-300 bg-white px-3.5 py-3 font-sans text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold";

/**
 * The buttons under a paper's title and at its foot: "Print this paper" and "Email to a friend". The second
 * opens a short form (one friend's address or several, the sender's name and address, an optional note); the
 * Association's sender emails each friend once, separately, so no friend sees another's address, and keeps none
 * of the addresses (owner 2026-10-13: "I want to send papers to many people"). Once it has gone, the sender is offered the free
 * newsletter with a button of their own (owner 2026-10-13; never a ticked box, never the friend's address), and
 * "Send it to someone else" brings the form back with their own name and address still filled in. Without
 * JavaScript the button is a plain mailto link, and the same link is offered if a send fails. Hidden on paper.
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
  // The sender's own name and address, kept while the panel is open: for the newsletter button and the next send.
  const [sender, setSender] = useState({ name: "", email: "" });
  // The newsletter button on the "sent" screen: "done" once Zoho has been asked to send its confirmation email.
  const [newsletter, setNewsletter] = useState<"idle" | "sending" | "done" | "failed">("idle");
  // How many friends the last send went to, for the words on the "sent" screen.
  const [sentTo, setSentTo] = useState(1);
  const id = useId();

  const url = `${SITE_URL}/reading-room/${slug}/`;
  const mailto = `mailto:?subject=${encodeURIComponent(`${title} (Baronage of Scotland Association)`)}&body=${encodeURIComponent(
    `I thought you would like to read this paper from the Reading Room of the Baronage of Scotland Association:\n\n${title}\n${url}\n`,
  )}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const field = (name: string) => String(f.get(name) ?? "");
    // One address or several, with commas, semicolons, spaces or new lines between them; repeats are dropped.
    const friends = [...new Map(field("to").split(/[\s,;]+/).filter(Boolean).map((a) => [a.toLowerCase(), a])).values()];
    const wrong = friends.find((a) => !ADDRESS.test(a));
    const problem = !friends.length
      ? "Please give your friend’s email address."
      : wrong
        ? `Please check this address: ${wrong}`
        : friends.length > FRIENDS_MAX
          ? `Please send to no more than ${FRIENDS_MAX} people at a time.`
          : "";
    if (problem) {
      setError(problem);
      setState("failed");
      return;
    }
    setState("sending");
    setError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        credentials: "omit",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          to: friends,
          name: field("name"),
          email: field("email"),
          comment: field("comment"),
          url,
          website: field("website"),
        }),
      });
      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setSender({ name: field("name"), email: field("email") });
        setSentTo(friends.length);
        setState("sent");
        return;
      }
      setError(typeof data.error === "string" && data.error ? data.error : FAILED);
    } catch {
      setError(FAILED);
    }
    setState("failed");
  }

  async function askForNewsletter() {
    setNewsletter("sending");
    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        credentials: "omit",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: sender.email }),
      });
      const data: { ok?: boolean } = await res.json().catch(() => ({}));
      setNewsletter(res.ok && data.ok ? "done" : "failed");
    } catch {
      setNewsletter("failed");
    }
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
                {sentTo > 1 ? `Your ${sentTo} friends` : "Your friend"} will have it in a minute or two. If they reply, the reply comes to you.
              </p>
              {newsletter === "done" ? (
                <p className="mt-4 font-sans text-[0.95rem] leading-relaxed text-navy">Please check your inbox to confirm the newsletter.</p>
              ) : (
                <div className="mt-5 border-t border-parchment-300 pt-5">
                  {/* Plainly for the sender, and only the sender (owner 2026-10-13: "it is not clear"). */}
                  <p className="font-display text-xl leading-tight text-navy">For you: the free newsletter</p>
                  <p className="mb-4 mt-1.5 font-sans text-[0.95rem] leading-relaxed text-ink-soft">
                    We would send it to you at <span className="break-all font-semibold text-navy">{sender.email}</span>. Your friends
                    are not signed up to anything.
                  </p>
                  <button
                    type="button"
                    onClick={askForNewsletter}
                    disabled={newsletter === "sending"}
                    className="inline-flex min-h-[3rem] cursor-pointer items-center bg-navy px-6 py-2.5 font-sans text-[1.05rem] font-semibold text-parchment-50 transition-colors hover:bg-navy-deep disabled:cursor-wait disabled:opacity-70"
                  >
                    {newsletter === "sending" ? "One moment…" : "Yes, send me the free newsletter"}
                  </button>
                  <p className="mt-2 font-sans text-[0.88rem] leading-relaxed text-ink-soft">We will email you once to confirm.</p>
                  {newsletter === "failed" && (
                    <p role="alert" className="mt-2 font-sans text-[0.95rem] leading-relaxed text-navy">
                      Sorry, that did not go through. You can sign up with the form at the top of the page.
                    </p>
                  )}
                </div>
              )}
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
                  <textarea
                    id={`${id}-to`}
                    name="to"
                    rows={2}
                    required
                    maxLength={4000}
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    inputMode="email"
                    aria-describedby={`${id}-to-hint`}
                    className={`${FIELD} resize-y`}
                  />
                  <p id={`${id}-to-hint`} className="mt-1.5 font-sans text-[0.88rem] leading-relaxed text-ink-soft">
                    To send it to several people, put a comma between the addresses.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${id}-name`} className={LABEL}>
                      Your name
                    </label>
                    <input id={`${id}-name`} name="name" type="text" required minLength={2} maxLength={60} autoComplete="name" defaultValue={sender.name} className={FIELD} />
                  </div>
                  <div>
                    <label htmlFor={`${id}-email`} className={LABEL}>
                      Your email
                    </label>
                    <input id={`${id}-email`} name="email" type="email" required maxLength={254} autoComplete="email" defaultValue={sender.email} className={FIELD} />
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
                We send each friend one email with a link to this paper, separately, so no friend sees another’s
                address. We keep none of the addresses.
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
