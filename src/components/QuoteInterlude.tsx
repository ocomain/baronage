"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A short quotation shown for a few seconds when a visitor clicks from one page of the site to another (owner
 * 2026-10-17: "a small loading screen with a quote"). The owner's own short versions of quotations on the About page,
 * word for word, with the "noble" words in gold as there, and no full stop at the end (his wish: it reads more fluidly). Never on the first page of a visit, which is the page search
 * engines judge; never for in-page links, links that open elsewhere, or back and forward; not shown where the device
 * asks for less motion. A tap or Esc skips it. A shuffled order is kept for the visit, so none repeats until all are seen.
 */
const QUOTES: { text: string; source: string }[] = [
  { text: "…every noble man, such as an earl, lord, knight and baron", source: "Parliament of Scotland · 1540" },
  { text: "…the nobility, earls, lords and barons…", source: "Parliament of Scotland · 1592" },
  {
    text: "the barons of this realm ought to have vote in Parliament as a part of the nobility",
    source: "Parliament of Scotland · 1567",
  },
  { text: "the 2000 Act… does not affect the noble nature of the dignity", source: "Lord Lyon Robin Blair · 2007" },
  {
    text: "the dignity of baron has a noble character in that it is a right which historically originated in a Crown grant",
    source: "Lord Lyon David Sellar · 2010",
  },
  {
    text: "Barony titles are conferred on “persons deserving of being raised to the nobility”",
    source: "Court of Session · Lady Wolffe · 2019",
  },
  {
    text: "allowing the “noble aspects of the barony title” to lapse was mentioned, but rejected",
    source: "Scottish Law Commission · 1999",
  },
  { text: "…a Barony, as we call it, do ennoble", source: "Mackenzie, Lord Advocate" },
  // Works, vol. II (1716), p. 534, read on the page image, which prints "Under the Word"; lower case for both here at
  // the owner's wish (2026-10-17).
  { text: "under the word Baron all our Nobility are comprehended", source: "Mackenzie, Lord Advocate" },
];

// Long enough to read (owner 2026-10-17: a second "doesn't stay long enough to read it", then "still not staying long
// enough"): three seconds and more for each word, so the shortest stays about 3.8 seconds and the longest about 5.7.
const readMs = (text: string) => 3000 + 130 * text.split(/\s+/).length;
const SPARE_MS = 3000; // taken down regardless this long after its reading time, should a page be slow
const ORDER_KEY = "bsa-quote-order";
const NEXT_KEY = "bsa-quote-next";

/** The "noble" words in gold, as on the About page. */
function Gold({ text }: { text: string }) {
  const parts = text.split(/(ennobl\w*|nobility|nobles?)/gi);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-foil not-italic">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function shuffled(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** The next quotation of this visit's shuffled order (storage can be unavailable: then any quotation at random). */
function nextQuote(): number {
  try {
    let order = JSON.parse(sessionStorage.getItem(ORDER_KEY) ?? "null") as number[] | null;
    let next = Number(sessionStorage.getItem(NEXT_KEY) ?? 0);
    if (!Array.isArray(order) || order.length !== QUOTES.length || !(next < order.length)) {
      order = shuffled(QUOTES.length);
      next = 0;
    }
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
    sessionStorage.setItem(NEXT_KEY, String(next + 1));
    return order[next];
  } catch {
    return Math.floor(Math.random() * QUOTES.length);
  }
}

const samePage = (a: string, b: string) => a.replace(/\/?$/, "/") === b.replace(/\/?$/, "/");

export function QuoteInterlude() {
  const pathname = usePathname();
  const [quote, setQuote] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  const [quick, setQuick] = useState(false); // closed by a tap or Esc: gone at once, without the fade
  const started = useRef(0);
  const showFor = useRef(0);
  const waiting = useRef(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  const hide = useCallback(() => {
    clearTimers();
    waiting.current = false;
    setShown(false);
  }, []);
  // A tap or click anywhere on it, or Esc, closes it straight away (owner 2026-10-17).
  const close = useCallback(() => {
    setQuick(true);
    hide();
  }, [hide]);

  // A click on a link to another page of this site puts a quotation up at once, before the page changes.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      let url: URL;
      try {
        url = new URL(a.href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin || samePage(url.pathname, location.pathname)) return;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      clearTimers();
      const n = nextQuote();
      setQuote(n);
      setQuick(false);
      setShown(true);
      started.current = Date.now();
      showFor.current = readMs(QUOTES[n].text);
      waiting.current = true;
      timers.current.push(window.setTimeout(hide, showFor.current + SPARE_MS));
    };
    // Capture phase: links that change page without reloading stop the click before it would reach a normal listener.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [hide]);

  // The new page has arrived: keep the quotation up for the rest of its second, then let it fade.
  useEffect(() => {
    if (!waiting.current) return;
    waiting.current = false;
    timers.current.push(window.setTimeout(hide, Math.max(0, showFor.current - (Date.now() - started.current))));
  }, [pathname, hide]);

  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shown, close]);

  if (quote === null) return null;
  const q = QUOTES[quote];
  return (
    <div
      aria-hidden
      onClick={close}
      className={`fixed inset-0 z-[3000] flex cursor-pointer items-center justify-center bg-navy-deep px-6 ${
        shown ? "opacity-100" : `pointer-events-none opacity-0 ${quick ? "" : "transition-opacity duration-500 ease-out"}`
      }`}
    >
      <figure className="max-w-3xl text-center">
        <span aria-hidden className="mx-auto mb-7 block h-px w-16 bg-gold/70" />
        <blockquote className="font-serif text-[1.7rem] italic leading-snug text-parchment-50 sm:text-4xl sm:leading-snug">
          <Gold text={q.text} />
        </blockquote>
        {/* One line on a phone: the longest source (the Court of Session's) a little smaller there so it fits
            (owner 2026-10-17); every source the same size on wider screens. */}
        <figcaption
          className={`mt-6 font-sans font-medium uppercase leading-snug text-parchment-200/60 sm:text-lg sm:tracking-[0.14em] ${
            q.source.length > 32 ? "text-[13px] tracking-[0.08em]" : "text-[15px] tracking-[0.12em]"
          }`}
        >
          {q.source}
        </figcaption>
      </figure>
    </div>
  );
}
