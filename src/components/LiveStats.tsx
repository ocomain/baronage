"use client";

import { useEffect, useState } from "react";
import { ROLL_API } from "@/lib/site";

type Stats = { verified: number; unverified: number; pledged: number };

/**
 * Last-known counts from the Roll's D1 database. Rendered at build time and
 * shown verbatim if JavaScript is off or the API is unreachable — so the figures
 * are never blank and never wrong by more than the gap since the last deploy.
 * The live values from {@link ROLL_API}/api/stats replace these on mount.
 */
const FALLBACK: Stats = { verified: 201, unverified: 200, pledged: 91 };

const isStats = (d: unknown): d is Stats =>
  !!d &&
  typeof (d as Stats).verified === "number" &&
  typeof (d as Stats).unverified === "number" &&
  typeof (d as Stats).pledged === "number";

export function LiveStats() {
  const [stats, setStats] = useState<Stats>(FALLBACK);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`${ROLL_API}/api/stats`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => {
        if (isStats(d)) setStats(d);
      })
      .catch(() => {
        /* keep FALLBACK — network error, CORS, or API down */
      });
    return () => ctrl.abort();
  }, []);

  const items = [
    { value: stats.verified, label: "Verified Barons" },
    { value: stats.unverified, label: "Unverified Holders" },
    { value: stats.pledged, label: "Pledged Hereditary" },
  ];

  return (
    <div className="grid grid-cols-1 divide-y divide-parchment-300/70 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {items.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center px-6 py-4 text-center sm:py-1.5">
          <span className="font-display text-5xl leading-none text-navy tabular-nums sm:text-6xl">
            {stat.value}
          </span>
          <span className="mt-2 font-inscribe text-xs uppercase tracking-[0.22em] text-muted">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
