import type { SVGProps } from "react";

let _id = 0;

/**
 * The Baronage seal — a beaded ring carrying the charter motto
 * "IN LIBERAM BARONIAM · PER CARTAS NOSTRAS" around a charged shield.
 * Rendered in gold foil. Scales crisply to any size.
 */
export function Seal({
  title = "Seal of the Baronage of Scotland",
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) {
  const uid = `seal-${_id++}`;
  const gold = `${uid}-gold`;
  const top = `${uid}-top`;
  const bot = `${uid}-bot`;
  const clip = `${uid}-shield`;

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a6620" />
          <stop offset="35%" stopColor="#e6cf93" />
          <stop offset="60%" stopColor="#c9a24b" />
          <stop offset="82%" stopColor="#f2e6c2" />
          <stop offset="100%" stopColor="#9c7a2e" />
        </linearGradient>
        <path id={top} d="M 28,100 A 72,72 0 0 1 172,100" fill="none" />
        <path id={bot} d="M 172,100 A 72,72 0 0 0 28,100" fill="none" />
        <clipPath id={clip}>
          <path d="M70,66 L130,66 L130,99 C130,125 113,143 100,151 C87,143 70,125 70,99 Z" />
        </clipPath>
      </defs>

      <g stroke={`url(#${gold})`} fill="none">
        {/* Rings */}
        <circle cx="100" cy="100" r="95" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="88" strokeWidth="3" strokeDasharray="0.5 5.1" strokeLinecap="round" />
        <circle cx="100" cy="100" r="82" strokeWidth="0.9" />
        <circle cx="100" cy="100" r="62.5" strokeWidth="0.9" />

        {/* Shield */}
        <path
          d="M70,66 L130,66 L130,99 C130,125 113,143 100,151 C87,143 70,125 70,99 Z"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <g clipPath={`url(#${clip})`} strokeWidth="1.8" opacity="0.85">
          <line x1="70" y1="78" x2="130" y2="151" strokeLinecap="round" />
          <line x1="130" y1="78" x2="70" y2="151" strokeLinecap="round" />
          <line x1="70" y1="76" x2="130" y2="76" strokeWidth="1.2" opacity="0.7" />
        </g>
      </g>

      {/* Mullet (star) on the chief */}
      <path
        d="M100 68.5 l1.7 3.6 4 .5 -3 2.7 .8 3.9 -3.5-2 -3.5 2 .8-3.9 -3-2.7 4-.5 Z"
        fill={`url(#${gold})`}
      />

      {/* Side lozenges separating the motto */}
      <g fill={`url(#${gold})`}>
        <rect x="25" y="97" width="6" height="6" transform="rotate(45 28 100)" />
        <rect x="169" y="97" width="6" height="6" transform="rotate(45 172 100)" />
      </g>

      {/* Circular motto */}
      <g fill={`url(#${gold})`} style={{ fontFamily: "var(--font-inscribe)", fontWeight: 600 }}>
        <text fontSize="11.5" letterSpacing="2.4" textAnchor="middle">
          <textPath href={`#${top}`} startOffset="50%">
            IN LIBERAM BARONIAM
          </textPath>
        </text>
        <text fontSize="11.5" letterSpacing="2.4" textAnchor="middle">
          <textPath href={`#${bot}`} startOffset="50%">
            PER CARTAS NOSTRAS
          </textPath>
        </text>
      </g>
    </svg>
  );
}
