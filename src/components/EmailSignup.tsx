"use client";

import { useId, useState } from "react";
import { EMAIL_SIGNUP } from "@/lib/site";

/**
 * Email sign-up for the Association's papers and news. Posts straight to the Zoho Campaigns
 * sign-up form (into a hidden frame, so the visitor stays on the page); Zoho sends the
 * confirmation email. Renders nothing until EMAIL_SIGNUP.action is set in lib/site.
 */
export function EmailSignup({
  variant = "header",
  label = "Papers & news by email",
  sentMessage = "Thank you. Please check your inbox to confirm.",
  className = "",
}: {
  /** "header": the compact one-line form in the site header. "block": full width (mobile menu, subscriber papers). */
  variant?: "header" | "block";
  label?: string;
  sentMessage?: string;
  className?: string;
}) {
  const [sent, setSent] = useState(false);
  const id = useId();
  const frame = `signup-frame-${id.replace(/[^a-zA-Z0-9]/g, "")}`;

  if (!EMAIL_SIGNUP.action) return null;

  const block = variant === "block";

  return (
    <div className={className}>
      {/* The form stays mounted (only hidden) after sending: removing it mid-submit would cancel the post. */}
      <form
        action={EMAIL_SIGNUP.action}
        method="POST"
        target={frame}
        onSubmit={() => setSent(true)}
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
          {Object.entries(EMAIL_SIGNUP.hidden).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <button
            type="submit"
            className={`rounded-r-sm bg-navy font-sans font-semibold uppercase text-parchment-50 transition-colors hover:bg-navy-deep ${
              block ? "px-5 text-[0.68rem] tracking-[0.2em]" : "px-3.5 text-[0.58rem] tracking-[0.2em]"
            }`}
          >
            Sign up
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
