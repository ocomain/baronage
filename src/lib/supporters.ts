/** The supporters shown in the homepage conveyor and on /supporters. */
export type Barony = { dignity: "Baron" | "Lord Baron" | "Earl Baron"; name: string; img?: string; note?: string };

export const baronies: Barony[] = [
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
  { dignity: "Baron", name: "Menie", img: "/arms/menie.webp" },
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
