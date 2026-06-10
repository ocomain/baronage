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
  { dignity: "Baron", name: "Plean", img: "/arms/plean.webp" },
  { dignity: "Lord Baron", name: "Leslie", img: "/arms/leslie.webp" },
  { dignity: "Baron", name: "Bachuil", img: "/arms/bachuil.webp" },
  { dignity: "Baron", name: "Bannockburn", img: "/arms/bannockburn.webp" },
  { dignity: "Baron", name: "Biggar" },
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
  const row = [...baronies, ...baronies];
  return (
    <div className="marquee py-2">
      <div className="marquee__track">
        {row.map((b, i) => (
          <figure
            key={`${b.name}-${i}`}
            className="group mr-6 flex w-56 shrink-0 flex-col items-center rounded-sm border border-parchment-300/70 bg-parchment-50 px-6 pb-6 pt-8 text-center shadow-[0_18px_40px_-30px_rgba(10,16,36,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_26px_50px_-28px_rgba(10,16,36,0.6)]"
            aria-hidden={i >= baronies.length}
          >
            <div className="flex h-44 w-full items-center justify-center">
              {b.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={b.img}
                  alt={`Coat of arms — ${b.dignity} of ${b.name}`}
                  decoding="async"
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
