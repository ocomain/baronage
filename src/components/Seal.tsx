import type { ImgHTMLAttributes } from "react";

type SealTone = "gold" | "light" | "ink";
/** Rendered widths: "xs" 100px (sharp to ~65px on screen: header, footer), "sm" 184px (to ~130px: homepage hero), "lg" 400px. */
type SealSize = "xs" | "sm" | "lg";

const DIMS: Record<SealSize, { w: number; h: number; suffix: string }> = {
  xs: { w: 100, h: 140, suffix: "-xs" },
  sm: { w: 184, h: 257, suffix: "-sm" },
  lg: { w: 400, h: 558, suffix: "" },
};

/**
 * The Association's seal (engraved charter device) — the user's own artwork,
 * processed to transparent images in gold / cream / ink tones. Served as WebP;
 * the original PNGs stay in /public for the Organisation logo and social cards.
 */
export function Seal({
  tone = "gold",
  size = "lg",
  className = "",
  alt = "Seal of the Baronage of Scotland",
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { tone?: SealTone; size?: SealSize }) {
  const d = DIMS[size];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/seal-${tone}${d.suffix}.webp`}
      width={d.w}
      height={d.h}
      decoding="async"
      alt={alt}
      className={`object-contain ${className}`}
      {...props}
    />
  );
}
