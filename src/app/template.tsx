"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

// True until the first page has mounted in this browser tab. The server always renders with it true.
let firstLoad = true;

/**
 * A template (unlike a layout) re-mounts on every navigation, so this wraps each
 * route in a quick cross-fade — the page content fades in while the persistent
 * header and footer stay put. Opacity-only (no transform) so it never disturbs
 * sticky/fixed elements; honours prefers-reduced-motion.
 *
 * The first page of a visit is NOT faded: it is served visible, so its content
 * paints at once instead of waiting, hidden, for the scripts to load and run.
 * Only later in-site navigations cross-fade.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [isFirst] = useState(() => firstLoad);

  useEffect(() => {
    firstLoad = false;
  }, []);

  return (
    <motion.div
      initial={isFirst ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
