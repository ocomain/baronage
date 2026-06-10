"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * A template (unlike a layout) re-mounts on every navigation, so this wraps each
 * route in a quick cross-fade — the page content fades in while the persistent
 * header and footer stay put. Opacity-only (no transform) so it never disturbs
 * sticky/fixed elements; honours prefers-reduced-motion.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
