"use client";

import { useEffect, useState } from "react";
import { ROLL_API } from "@/lib/site";

type Stats = { verified: number; dignities: number; unverified: number; pledged: number };

/**
 * Last-known counts from the Roll's D1 database (27 September 2026). Rendered at
 * build time and kept if JavaScript is off or the API is unreachable; the live
 * values from {@link ROLL_API}/api/stats replace them on mount.
 */
const FALLBACK: Stats = { verified: 244, dignities: 325, unverified: 197, pledged: 137 };
/** The date the FALLBACK figures were taken; replaced by today's date once live figures load. */
const FALLBACK_DATE = "27 September 2026";
const today = () =>
  new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" });

const isStats = (d: unknown): d is Stats =>
  !!d &&
  typeof (d as Stats).verified === "number" &&
  typeof (d as Stats).dignities === "number" &&
  typeof (d as Stats).unverified === "number" &&
  typeof (d as Stats).pledged === "number";

/** The Roll's live figures, written as a sentence for running text. */
export function RollCounts() {
  const [s, setS] = useState<Stats>(FALLBACK);
  const [asOf, setAsOf] = useState(FALLBACK_DATE);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`${ROLL_API}/api/stats`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => {
        if (isStats(d)) {
          setS(d);
          setAsOf(today());
        }
      })
      .catch(() => {
        /* keep FALLBACK */
      });
    return () => ctrl.abort();
  }, []);

  return (
    <>
      As of {asOf} it records <span className="tabular-nums">{s.verified}</span> verified holders with{" "}
      <span className="tabular-nums">{s.dignities}</span> dignities in the baronage of Scotland between them;{" "}
      <span className="tabular-nums">{s.pledged}</span> of the holders are entered as pledged hereditary, and a
      further <span className="tabular-nums">{s.unverified}</span> claims await verification and are not on the Roll.
    </>
  );
}
