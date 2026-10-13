"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ImgHTMLAttributes } from "react";

const noSubscription = () => () => {};

/**
 * An <img> that eases in once it has loaded, rather than popping into place.
 * The caller supplies the transition (e.g. `transition duration-700`).
 *
 * An image that is part of the page as served is shown at once and never hidden: served hidden, it
 * stayed invisible until the scripts had loaded and run, which on a slow phone was seconds after the
 * picture itself had arrived (the Council page's main picture appeared at 9.5 s; measured 2026-10-13).
 * Only images mounted later in the browser (the pop-up portrait, a page reached by an in-site link)
 * start transparent and fade in; those also cover the already-cached case by checking `complete`.
 */
export function FadeImg({ className = "", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  // True on the server and while the served page is being brought to life; false for a later mount in the browser.
  const fromServer = useSyncExternalStore(noSubscription, () => false, () => true);
  const [served] = useState(fromServer);
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
      className={`${className} ${served || loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}
