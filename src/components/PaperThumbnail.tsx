const SEAL = "/images/seal-ink.png";

type Size = "md" | "sm" | "responsive";

/**
 * Deterministic string hash (FNV-1a) so the faux type-block below is stable
 * per paper (same title → same "printed sheet") rather than reshuffling on
 * every render or differing between server and client.
 */
function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Widths (%) for 6–8 faux justified-text bars, seeded from the paper's title. */
function fauxLineWidths(seed: string): number[] {
  const rand = mulberry32(hashString(seed));
  const count = 6 + Math.floor(rand() * 3); // 6–8
  return Array.from({ length: count }, (_, i) => {
    const isLast = i === count - 1;
    const base = isLast ? 34 : 58;
    const spread = isLast ? 30 : 38;
    return Math.round(base + rand() * spread);
  });
}

/**
 * Size specs, as literal (non-interpolated) Tailwind class strings so the
 * compiler's static scan can see every candidate — including the
 * "responsive" variant, which is one tile that is `sm` below the `sm:`
 * breakpoint and `md` from it up, rather than two tiles toggled by
 * `hidden`/`block` (which would double the tile count in the DOM).
 */
const SIZES: Record<
  Size,
  { width: string; padding: string; seal: string; sealMb: string; eyebrow: string; eyebrowMb: string; title: string; titleMb: string; lineGap: string }
> = {
  md: {
    width: "w-28", // 112px
    padding: "p-2.5",
    seal: "h-[15px] w-[15px]",
    sealMb: "mb-1.5",
    eyebrow: "text-[5.5px] tracking-[0.16em]",
    eyebrowMb: "mb-1",
    title: "text-[10px] leading-tight",
    titleMb: "mb-1.5",
    lineGap: "gap-[3px]",
  },
  sm: {
    width: "w-[72px]",
    padding: "p-1.5",
    seal: "h-[11px] w-[11px]",
    sealMb: "mb-1",
    eyebrow: "text-[4.5px] tracking-[0.12em]",
    eyebrowMb: "mb-0.5",
    title: "text-[7.5px] leading-tight",
    titleMb: "mb-1",
    lineGap: "gap-[2px]",
  },
  responsive: {
    width: "w-[72px] sm:w-28",
    padding: "p-1.5 sm:p-2.5",
    seal: "h-[11px] w-[11px] sm:h-[15px] sm:w-[15px]",
    sealMb: "mb-1 sm:mb-1.5",
    eyebrow: "text-[4.5px] tracking-[0.12em] sm:text-[5.5px] sm:tracking-[0.16em]",
    eyebrowMb: "mb-0.5 sm:mb-1",
    title: "text-[7.5px] leading-tight sm:text-[10px]",
    titleMb: "mb-1 sm:mb-1.5",
    lineGap: "gap-[2px] sm:gap-[3px]",
  },
};

/**
 * A decorative "offprint" thumbnail — a small portrait tile standing in for
 * the paper's first printed page, in the manner of Academia.edu's paper
 * rows. Pure HTML/CSS (plus the existing seal mark), deterministic per
 * paper so the same title always renders the same faux type-block.
 *
 * Purely decorative: aria-hidden throughout — the adjacent title link
 * already carries the paper's name for assistive tech. Lift on hover only
 * fires via `group-hover`, i.e. when an ancestor carries `className="group"`.
 */
export function PaperThumbnail({
  title,
  category,
  size = "md",
  className = "",
}: {
  title: string;
  category: string;
  size?: Size;
  className?: string;
}) {
  const cfg = SIZES[size];
  const lines = fauxLineWidths(title);

  return (
    <div
      aria-hidden
      className={`paper-thumbnail ${cfg.width} aspect-[3/4] flex-none overflow-hidden rounded-[2px] border border-parchment-300 bg-parchment-50 shadow-[0_10px_24px_-14px_rgba(19,30,58,0.45)] transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-px group-hover:shadow-[0_14px_30px_-14px_rgba(19,30,58,0.55)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 ${cfg.padding} ${className}`}
    >
      <div className="flex h-full flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SEAL} alt="" className={`flex-none object-contain opacity-70 ${cfg.seal} ${cfg.sealMb}`} />
        <p className={`w-full text-center font-sans font-semibold uppercase text-gold-deep/80 ${cfg.eyebrow} ${cfg.eyebrowMb}`}>
          {category}
        </p>
        <p className={`line-clamp-3 w-full text-center font-display text-navy ${cfg.title} ${cfg.titleMb}`}>{title}</p>
        <div className={`flex w-full flex-1 flex-col ${cfg.lineGap}`}>
          {lines.map((w, i) => (
            <span key={i} className="h-px bg-ink/[0.14]" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
