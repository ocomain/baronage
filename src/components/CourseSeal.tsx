/**
 * Essential Reading: a wax seal whose gold ring fills as the papers are read (owner 2026-10-23, "more visual and
 * gamified"). The count stands in the wax; when every paper is read the ring closes and the Association's seal takes
 * the count's place. Drawn in SVG, so it is sharp at any size and costs no image.
 */
export function CourseSeal({ done, total, size = 72, className = "" }: { done: number; total: number; size?: number; className?: string }) {
  const r = 45;
  const c = 2 * Math.PI * r;
  const frac = total ? Math.min(done / total, 1) : 0;
  const complete = total > 0 && done >= total;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={complete ? `All ${total} papers read` : `${done} of ${total} papers read`}
      className={`flex-none ${className}`}
    >
      {/* the ring: a pale track, and the gold that fills from the top, clockwise */}
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-parchment-300)" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="8"
        strokeLinecap={frac > 0 && frac < 1 ? "round" : "butt"}
        strokeDasharray={`${c * frac} ${c}`}
        transform="rotate(-90 50 50)"
        style={{ transition: "stroke-dasharray 0.8s ease" }}
      />
      {/* the wax */}
      <circle cx="50" cy="50" r="37" fill="var(--color-oxblood)" />
      <circle cx="50" cy="50" r="33" fill="none" stroke="var(--color-gold-light)" strokeOpacity="0.45" strokeWidth="1" />
      {complete ? (
        <image href="/seal-gold-xs.webp" x="33" y="26" width="34" height="48" preserveAspectRatio="xMidYMid meet" />
      ) : (
        <>
          <text
            x="50"
            y={done > 9 ? 56 : 58}
            textAnchor="middle"
            fill="var(--color-gold-light)"
            style={{ fontFamily: "var(--font-display)", fontSize: done > 9 ? 32 : 38 }}
          >
            {done}
          </text>
          <text
            x="50"
            y="73"
            textAnchor="middle"
            fill="var(--color-gold-light)"
            fillOpacity="0.85"
            style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em" }}
          >
            OF {total}
          </text>
        </>
      )}
    </svg>
  );
}

/** A small gold-ringed seal beside a part's heading once every paper in it is read. */
export function PartSeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" role="img" aria-label="Part read" className={`inline-block flex-none ${className}`}>
      <circle cx="12" cy="12" r="11" fill="var(--color-oxblood)" stroke="var(--color-gold)" strokeWidth="2" />
      <path d="M7.2 12.4l3.1 3 6.3-6.6" fill="none" stroke="var(--color-gold-light)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
