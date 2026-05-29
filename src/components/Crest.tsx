import type { SVGProps } from "react";

/**
 * Baronage of Scotland emblem — a monoline heraldic device:
 * a baronial coronet over a shield charged with a saltire and a mullet.
 * Inherits its colour from `currentColor`, so set it with a text-* class.
 */
export function Crest({ title = "Baronage of Scotland crest", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 96 112"
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <clipPath id="crest-shield">
          <path d="M16 30 L80 30 L80 64 C80 86 66 100 48 110 C30 100 16 86 16 64 Z" />
        </clipPath>
      </defs>

      {/* Coronet */}
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M26 22 L70 22 L66 8 L58 18 L48 4 L38 18 L30 8 Z" fill="none" />
        <circle cx="48" cy="4" r="2.6" fill="currentColor" stroke="none" />
        <circle cx="30" cy="8" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="66" cy="8" r="2.2" fill="currentColor" stroke="none" />
        <path d="M24 22 L72 22" />
      </g>

      {/* Shield outline + inner keepline */}
      <path
        d="M16 30 L80 30 L80 64 C80 86 66 100 48 110 C30 100 16 86 16 64 Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M22 35 L74 35 L74 63 C74 81 62 93 48 102 C34 93 22 81 22 63 Z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
        strokeLinejoin="round"
      />

      {/* Charges — saltire + chief + central mullet, clipped to the shield */}
      <g clipPath="url(#crest-shield)" stroke="currentColor" strokeLinecap="round">
        <line x1="22" y1="48" x2="74" y2="104" strokeWidth="2" opacity="0.85" />
        <line x1="74" y1="48" x2="22" y2="104" strokeWidth="2" opacity="0.85" />
        <line x1="16" y1="46" x2="80" y2="46" strokeWidth="1.4" opacity="0.7" />
      </g>

      {/* Mullet (heraldic star) on the chief */}
      <path
        d="M48 36.5 l1.9 4 4.4 .5 -3.3 3 .9 4.3 -3.9 -2.2 -3.9 2.2 .9 -4.3 -3.3 -3 4.4 -.5 Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
