"use client";

import { useEffect, useRef } from "react";
import { markRead } from "@/lib/courseProgress";

/** At the foot of a course paper: once the reader reaches it, the paper is ticked as read on the course panel. */
export function CourseMarkRead({ slug }: { slug: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        markRead(slug);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [slug]);
  return <span ref={ref} aria-hidden className="block h-px" />;
}
