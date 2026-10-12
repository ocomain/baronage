"use client";

import { useEffect, useState } from "react";
import { INDEX_COUNT, INDEX_COUNT_URL, formatCount } from "@/lib/site";

/** One request per page load, shared by every place that prints the figure. Resolves to null if it cannot be read. */
let pending: Promise<number | null> | null = null;
function load(): Promise<number | null> {
  if (!pending) {
    pending = fetch(INDEX_COUNT_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: unknown) => {
        const n = (d as { baronies?: unknown } | null)?.baronies;
        return typeof n === "number" && Number.isInteger(n) && n > 0 ? n : null;
      })
      .catch(() => null);
  }
  return pending;
}

/**
 * Text that contains the Index's count of baronies, such as "Index of 1,871 baronies". The figure written at build
 * time ({@link INDEX_COUNT}) is kept if JavaScript is off or the Index is unreachable; the Index's own live figure
 * from {@link INDEX_COUNT_URL} replaces it on mount.
 */
export function IndexCountText({ text }: { text: string }) {
  const [n, setN] = useState(INDEX_COUNT);

  useEffect(() => {
    let mounted = true;
    load().then((live) => {
      if (mounted && live) setN(live);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return <>{text.replace(formatCount(INDEX_COUNT), formatCount(n))}</>;
}
