"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { EMAIL_SIGNUP } from "@/lib/site";

/** The trap: a field people never see, which sign-up bots fill in like any other. */
const TRAP = "website";
/** A person needs longer than this to type an address and press the button; a bot does not. */
const MIN_MS = 3000;

/**
 * Email sign-up for the Association's free newsletter (papers and news). Posts straight to the Zoho Campaigns
 * sign-up form (into a hidden frame, so the visitor stays on the page); Zoho sends the
 * confirmation email. Renders nothing until EMAIL_SIGNUP.action is set in lib/site.
 *
 * Bot trap (owner 2026-10-28, after junk sign-ups in October): Zoho's address is not in the page's HTML, only set
 * when a person sends the form, so a bot reading the HTML has nowhere to post. A sign-up that fills in the hidden
 * field, or comes within three seconds of the form appearing, is dropped, and is shown the same "check your
 * inbox" message, so the bot learns nothing.
 */
export function EmailSignup({
  variant = "header",
  // owner 2026-10-19: the papers and the Council's policy statements will go out by email ("Decrees by email" floated;
  // "decree" is a court's word, so "declarations")
  label = "Free papers & declarations",
  sentMessage = "Please check your inbox to confirm.",
  buttonLabel = "Sign up",
  className = "",
}: {
  /** "header": the compact one-line form in the site header. "block": full width (mobile menu, subscriber papers). */
  variant?: "header" | "block";
  label?: string;
  sentMessage?: string;
  buttonLabel?: string;
  className?: string;
}) {
  const [sent, setSent] = useState(false);
  const shownAt = useRef(0);
  const id = useId();
  const frame = `signup-frame-${id.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  if (!EMAIL_SIGNUP.action) return null;

  function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const trap = form.elements.namedItem(TRAP) as HTMLInputElement | null;
    if (!trap?.value && Date.now() - shownAt.current >= MIN_MS) {
      if (trap) trap.disabled = true; // not sent to Zoho
      form.action = EMAIL_SIGNUP.action;
      form.submit();
    }
    setSent(true);
  }

  const block = variant === "block";

  return (
    <div className={className}>
      {/* The form stays mounted (only hidden) after sending: removing it mid-submit would cancel the post. */}
      <form
        method="POST"
        target={frame}
        onSubmit={send}
        className={sent ? "hidden" : ""}
      >
        <label
          htmlFor={`${id}-email`}
          className={`block font-sans font-semibold uppercase leading-none text-gold-deep ${
            block ? "text-[0.68rem] tracking-[0.2em]" : "text-[0.55rem] tracking-[0.24em]"
          }`}
        >
          {label}
        </label>
        <div className={`flex ${block ? "mt-3" : "mt-[6px] h-[34px]"}`}>
          <input
            id={`${id}-email`}
            type="email"
            name={EMAIL_SIGNUP.emailField}
            autoComplete="email"
            required
            placeholder="Email address"
            className={`min-w-0 rounded-l-sm border border-r-0 border-parchment-300 bg-parchment-50 text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold ${
              block ? "flex-1 px-4 py-3 text-base" : "w-40 px-3 text-[0.8rem] xl:w-60"
            }`}
          />
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor={`${id}-${TRAP}`}>Leave this empty</label>
            <input id={`${id}-${TRAP}`} type="text" name={TRAP} tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>
          {Object.entries(EMAIL_SIGNUP.hidden).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <button
            type="submit"
            className={`rounded-r-sm bg-navy font-sans font-semibold uppercase text-parchment-50 transition-colors hover:bg-navy-deep ${
              block ? "px-5 text-[0.68rem] tracking-[0.2em]" : "px-3.5 text-[0.58rem] tracking-[0.2em]"
            }`}
          >
            {buttonLabel}
          </button>
        </div>
      </form>
      <p
        role="status"
        className={`font-display leading-snug text-navy ${block ? "text-lg" : "max-w-[17rem] text-[1.05rem]"} ${
          sent ? "" : "hidden"
        }`}
      >
        {sentMessage}
      </p>
      <iframe name={frame} title="Email sign-up" tabIndex={-1} aria-hidden className="hidden" />
    </div>
  );
}
