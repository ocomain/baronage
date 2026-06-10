"use client";

import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

/**
 * An <img> that eases in once it has loaded, rather than popping into place.
 * Also covers images that finished loading before hydration (checks `complete`),
 * so cached images still fade in instead of getting stuck transparent.
 * The caller supplies the transition (e.g. `transition duration-700`).
 */
export function FadeImg({ className = "", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      {...props}
      onLoad={() => setLoaded(true)}
      className={`${className} ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}
