"use client";

import { useEffect, useRef } from "react";

type Barony = { dignity: "Baron" | "Lord Baron" | "Earl Baron"; name: string; img?: string; note?: string };

/**
 * Featured barons of the Roll. Where we hold the granted arms artwork the coat
 * of arms is shown; otherwise an engraved escutcheon placeholder stands in
 * until the arms are supplied (drop a PNG into /public/arms/<name>.png).
 */
const baronies: Barony[] = [
  { dignity: "Baron", name: "Balvaird", img: "/arms/balvaird.webp" },
  { dignity: "Lord Baron", name: "Pittenweem", img: "/arms/pittenweem.webp" },
  { dignity: "Baron", name: "Inneryne", img: "/arms/inneryne.webp" },
  {
    dignity: "Baron",
    name: "Drum",
    img: "/arms/drum.webp",
    note: "Chief of his Name",
  },
  { dignity: "Lord Baron", name: "Leslie", img: "/arms/leslie.webp" },
  { dignity: "Baron", name: "Bachuil", img: "/arms/bachuil.webp" },
  { dignity: "Baron", name: "Bannockburn", img: "/arms/bannockburn.webp" },
  { dignity: "Baron", name: "Biggar", img: "/arms/biggar.webp" },
  { dignity: "Baron", name: "Menie" },
  {
    dignity: "Baron",
    name: "Moncrieffe",
    img: "/arms/moncrieffe.webp",
    note: "Chief of his Name",
  },
  { dignity: "Baron", name: "Mugdock", img: "/arms/mugdock.webp" },
  { dignity: "Baron", name: "Hartsyde", img: "/arms/hartsyde.webp" },
  { dignity: "Earl Baron", name: "Rothes", img: "/arms/rothes.webp" },
  { dignity: "Baron", name: "Stobo", img: "/arms/stobo.webp" },
];

/** Engraved escutcheon placeholder — a gold-edged shield bearing the initial. */
function CrestPlaceholder({ initial }: { initial: string }) {
  return (
    <svg viewBox="0 0 100 120" className="h-40 w-auto" role="img" aria-hidden>
      <defs>
        <linearGradient id="crest-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6cf93" />
          <stop offset="0.5" stopColor="#c9a24b" />
          <stop offset="1" stopColor="#936f24" />
        </linearGradient>
      </defs>
      <path
        d="M12 12 H88 V58 C88 90 50 110 50 110 C50 110 12 90 12 58 Z"
        fill="#0a1024"
        stroke="url(#crest-gold)"
        strokeWidth="2.5"
      />
      <path
        d="M19 19 H81 V56 C81 83 50 100 50 100 C50 100 19 83 19 56 Z"
        fill="none"
        stroke="#c9a24b"
        strokeOpacity="0.3"
        strokeWidth="0.75"
      />
      <text
        x="50"
        y="64"
        textAnchor="middle"
        fontFamily="var(--font-cormorant), serif"
        fontStyle="italic"
        fontSize="40"
        fill="url(#crest-gold)"
      >
        {initial}
      </text>
    </svg>
  );
}

/**
 * Auto-scrolling, hover-to-pause showcase of featured barons (pure CSS marquee).
 * The list is duplicated so the loop is seamless.
 */
export function BaroniesCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  // Auto-glide on a real scroll container — so drag (desktop), swipe (mobile)
  // and wheel all work natively; the duplicated list lets the loop wrap
  // seamlessly in either direction.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let pos = -1; // float accumulator — Safari rounds scrollLeft, which stalls sub-pixel steps
    let last = performance.now();
    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    let moved = false;

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const half = el.scrollWidth / 2;
      if (!dragging) {
        // resync after any user scroll, then advance the float accumulator
        if (pos < 0 || Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
        pos += Math.min(dt, 50) * 0.035; // ~35px/s; clamped so tab-switches never jump
        if (half > 0) {
          if (pos >= half) pos -= half;
          else if (pos <= 0) pos += half;
        }
        el.scrollLeft = pos;
      } else if (half > 0) {
        // user is in control — keep the loop seamless at the edges only
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        else if (el.scrollLeft <= 0) el.scrollLeft += half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // touch pans natively
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const up = () => {
      dragging = false;
    };
    const swallowClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", swallowClick, true);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", swallowClick, true);
    };
  }, []);

  const row = [...baronies, ...baronies];
  return (
    <div className="marquee">
      <div
        ref={ref}
        className="marquee__scroll flex cursor-grab select-none overflow-x-auto py-2 active:cursor-grabbing"
      >
        {row.map((b, i) => (
          <figure
            key={`${b.name}-${i}`}
            className="group mr-6 flex w-56 shrink-0 flex-col items-center rounded-sm border border-parchment-300/70 bg-parchment-50 px-6 pb-6 pt-8 text-center shadow-[0_18px_40px_-30px_rgba(10,16,36,0.5)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_26px_50px_-28px_rgba(10,16,36,0.6)]"
            aria-hidden={i >= baronies.length}
          >
            <div className="flex h-44 w-full items-center justify-center">
              {b.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={b.img}
                  alt={`Coat of arms — ${b.dignity} of ${b.name}`}
                  decoding="async"
                  width={160}
                  height={160}
                  className="h-40 w-40 object-contain transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="transition-transform duration-500 group-hover:scale-105">
                  <CrestPlaceholder initial={b.name.charAt(0)} />
                </div>
              )}
            </div>
            <figcaption className="mt-5 text-center">
              <span className="block font-sans text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-gold-deep">
                {b.dignity} of
              </span>
              <span className="mt-1 block font-display text-xl text-navy">{b.name}</span>
              {b.note ? (
                <span className="mx-auto mt-1.5 block font-serif text-base italic leading-snug text-gold-deep">
                  {b.note}
                </span>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
