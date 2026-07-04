"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Content wrapped here is hidden by default and only shown when the page URL
 * carries this exact hash — a preview link for internal review, not access control:
 * the wrapped content still ships in the page's JS bundle regardless of the hash. */
const REVEAL_HASH = "#council-preview";

export function HiddenPreview({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => setShow(window.location.hash === REVEAL_HASH);
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  if (!show) return null;
  return <>{children}</>;
}
