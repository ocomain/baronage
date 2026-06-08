const baronies = [
  { slug: "inneryne", name: "Inneryne" },
  { slug: "slains", name: "Slains" },
  { slug: "hailes", name: "Hailes" },
  { slug: "wigtown", name: "Wigtown" },
  { slug: "pittenweem", name: "Pittenweem" },
  { slug: "anstruther", name: "Anstruther" },
  { slug: "spens", name: "Spens" },
  { slug: "cowal", name: "Cowal" },
];

/**
 * Auto-scrolling, hover-to-pause showcase of baronial arms (pure CSS marquee).
 * The list is duplicated so the loop is seamless; each card owns its trailing
 * margin so translateX(-50%) aligns the second set exactly over the first.
 */
export function BaroniesCarousel() {
  const row = [...baronies, ...baronies];
  return (
    <div className="marquee py-2">
      <div className="marquee__track">
        {row.map((b, i) => (
          <figure
            key={`${b.slug}-${i}`}
            className="group mr-6 flex w-56 shrink-0 flex-col items-center rounded-sm border border-parchment-300/70 bg-parchment-50 px-6 pb-6 pt-8 text-center shadow-[0_18px_40px_-30px_rgba(10,16,36,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_26px_50px_-28px_rgba(10,16,36,0.6)]"
            aria-hidden={i >= baronies.length}
          >
            <div className="flex h-44 w-full items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/arms/${b.slug}.png`}
                alt={`Coat of arms — Barony of ${b.name}`}
                className="max-h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="mt-5 font-display text-xl text-navy">{b.name}</figcaption>
            <span className="mt-1.5 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-gold-deep">
              Scotland
            </span>
          </figure>
        ))}
      </div>
    </div>
  );
}
