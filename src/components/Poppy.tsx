"use client";

import { useEffect, useState } from "react";

/**
 * A remembrance poppy beside the header lockup (owner 2026-11-02, after Burke's Peerage: "use an actual poppy"). The
 * picture is a photograph of a Royal British Legion paper poppy by Philip Stevens, public domain, Wikimedia Commons
 * ("Royal British Legion's Paper Poppy - white background.jpg"), cut out of its white ground. Shown only from
 * 25 October to 11 November, judged by the visitor's own date, so the static site needs no rebuild to take it down;
 * it is placed over the header, so it moves nothing.
 */
const SHOW_FROM = { month: 9, day: 25 }; // 25 October (months count from 0)
const SHOW_TO = { month: 10, day: 11 }; // 11 November, Armistice Day

function inSeason(d: Date) {
  const m = d.getMonth();
  const day = d.getDate();
  return (m === SHOW_FROM.month && day >= SHOW_FROM.day) || (m === SHOW_TO.month && day <= SHOW_TO.day);
}

export function Poppy({ className = "" }: { className?: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(inSeason(new Date())), []);
  if (!show) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/poppy.webp"
      alt=""
      title="We will remember them" // Binyon, "For the Fallen": on hover only (owner 2026-11-02)
      width={136}
      height={200}
      decoding="async"
      className={`no-print select-none ${className}`}
    />
  );
}
