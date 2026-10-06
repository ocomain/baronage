"use client";

import { useEffect, useState } from "react";

/**
 * "Extra large text" view, the same as on roll.baronage.com: the same question on a first visit,
 * the same "Text size" switch, and ONE answer for both sites. The answer is kept in a cookie on
 * .baronage.com (bsa_ez = 1 | 0, one year) that the Roll reads and writes too, with localStorage
 * "ez" as the fallback. While <html> has the class "ez", the rules at the foot of globals.css
 * enlarge text, buttons and click targets. Add ?ask=1 to the address to see the question again.
 */
const COOKIE = "bsa_ez";

function readChoice(): string | null {
  try {
    const m = document.cookie.match(/(?:^|; )bsa_ez=([01])/);
    if (m) return m[1];
  } catch {}
  try {
    return localStorage.getItem("ez");
  } catch {
    return null;
  }
}

function writeChoice(v: "1" | "0") {
  try {
    const host = location.hostname;
    const domain = host === "baronage.com" || host.endsWith(".baronage.com") ? "; domain=.baronage.com" : "";
    const secure = location.protocol === "https:" ? "; secure" : "";
    document.cookie = `${COOKIE}=${v}; max-age=31536000; path=/; samesite=lax${secure}${domain}`;
  } catch {}
  try {
    localStorage.setItem("ez", v);
  } catch {}
}

export function EasyRead() {
  const [on, setOn] = useState(false);
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    const stored = readChoice();
    setOn(stored === "1");
    document.documentElement.classList.toggle("ez", stored === "1");
    if (stored === null || /[?&]ask=1/.test(location.search)) setAsking(true);
  }, []);

  const choose = (v: boolean) => {
    writeChoice(v ? "1" : "0");
    setOn(v);
    setAsking(false);
    // The question closes (or the switch flips) in this frame; the page is re-laid out at the new size in
    // the next one. Doing both at once kept the tap waiting up to a second on long pages (measured 2026-10-06).
    requestAnimationFrame(() =>
      setTimeout(() => {
        document.documentElement.classList.toggle("ez", v);
        // label the visit in Microsoft Clarity, as the Roll does, so recordings can be filtered by text size
        try {
          (window as unknown as { clarity?: (...a: unknown[]) => void }).clarity?.("set", "text_size", v ? "extra-large" : "standard");
        } catch {}
        window.dispatchEvent(new Event("resize"));
      }, 0)
    );
  };

  useEffect(() => {
    document.documentElement.classList.toggle("ez-asking", asking);
    if (!asking) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAsking(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [asking]);

  // Sit above the featured-paper card while it is showing on narrow screens.
  useEffect(() => {
    const check = () => {
      const card = document.querySelector<HTMLElement>('aside[aria-label="Featured paper"]');
      const up = !!card && Number(getComputedStyle(card).opacity) > 0.5 && window.innerWidth < 1100;
      document.documentElement.classList.toggle("ez-card-up", up);
      if (up && card) document.documentElement.style.setProperty("--ez-card-h", `${Math.round(card.getBoundingClientRect().height)}px`);
    };
    check();
    const t = window.setInterval(check, 700);
    window.addEventListener("resize", check);
    return () => {
      window.clearInterval(t);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <>
      <div className="ez-switch" role="group" aria-label="Text size">
        <span className="ez-switch-l">Text size</span>
        <button type="button" aria-pressed={!on} onClick={() => choose(false)}>
          Standard
        </button>
        <button type="button" aria-pressed={on} onClick={() => choose(true)}>
          Extra large
        </button>
      </div>

      {asking && (
        <div className="ez-ask">
          <div className="ez-ask-card" role="dialog" aria-modal="true" aria-labelledby="ez-ask-h">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ez-ask-seal" src="/images/seal-ink.png" alt="" width={57} height={80} />
            <h2 id="ez-ask-h">Do you need extra large text?</h2>
            <div className="ez-ask-btns">
              <button type="button" className="ez-ask-yes" onClick={() => choose(true)} autoFocus>
                Yes, extra large text
              </button>
              <button type="button" className="ez-ask-no" onClick={() => choose(false)}>
                No, standard text
              </button>
            </div>
            <p className="ez-ask-note">
              You can change this at any time with the “Text size” switch at the bottom of the page.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
