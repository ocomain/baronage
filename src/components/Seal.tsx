import type { ImgHTMLAttributes } from "react";

type SealTone = "gold" | "light" | "ink";

const SRC: Record<SealTone, string> = {
  gold: "/seal-gold.png",
  light: "/seal-light.png",
  ink: "/seal-ink.png",
};

/**
 * The Association's seal (engraved charter device) — the user's own artwork,
 * processed to transparent PNGs in gold / cream / ink tones.
 */
export function Seal({
  tone = "gold",
  className = "",
  alt = "Seal of the Baronage of Scotland",
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { tone?: SealTone }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={SRC[tone]} alt={alt} className={`object-contain ${className}`} {...props} />;
}
