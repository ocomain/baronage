/** The supporters shown in the homepage conveyor and on /supporters. */
export type Barony = {
  dignity: "Baron" | "Lord Baron" | "Earl Baron" | "Younger";
  name: string;
  img?: string;
  note?: string;
  /** shown on /supporters only, not in the homepage conveyor */
  pageOnly?: boolean;
  /** profile on roll.baronage.com */
  roll?: string;
};

export const baronies: Barony[] = [
  { dignity: "Baron", name: "Balvaird", roll: "https://roll.baronage.com/baron/brady-balvaird", img: "/arms/balvaird.webp" },
  { dignity: "Lord Baron", name: "Pittenweem", roll: "https://roll.baronage.com/claes-zangeberg.html", img: "/arms/pittenweem.webp" },
  { dignity: "Baron", name: "Inneryne", roll: "https://roll.baronage.com/baron/ronald-reisinger", img: "/arms/inneryne.webp" },
  {
    dignity: "Baron",
    name: "Drum",
    roll: "https://roll.baronage.com/baron/alexander-irvine",
    img: "/arms/drum.webp",
    note: "Chief of his Name",
  },
  { dignity: "Lord Baron", name: "Leslie", roll: "https://roll.baronage.com/baron/john-andrea", img: "/arms/leslie.webp" },
  { dignity: "Baron", name: "Bachuil", roll: "https://roll.baronage.com/baron/niall-livingstone-of-bachuil", img: "/arms/bachuil.webp" },
  { dignity: "Baron", name: "Bannockburn", roll: "https://roll.baronage.com/baron/hope-vere-anderson", img: "/arms/bannockburn.webp" },
  { dignity: "Baron", name: "Biggar", roll: "https://roll.baronage.com/baron/charles-ross-of-biggar", img: "/arms/biggar.webp" },
  { dignity: "Baron", name: "Menie", roll: "https://roll.baronage.com/baron/michael-woodley-of-menie", img: "/arms/menie.webp" },
  {
    dignity: "Baron",
    name: "Moncrieffe",
    img: "/arms/moncrieffe.webp",
    note: "Chief of his Name",
  },
  { dignity: "Baron", name: "Mugdock", roll: "https://roll.baronage.com/baron/luciano-lambertini", img: "/arms/mugdock.webp" },
  { dignity: "Baron", name: "Hartsyde", roll: "https://roll.baronage.com/baron/jean-guy-philip-boisserolles-de-st-julien", img: "/arms/hartsyde.webp" },
  { dignity: "Earl Baron", name: "Rothes", roll: "https://roll.baronage.com/dario-item.html", img: "/arms/rothes.webp" },
  { dignity: "Baron", name: "Stobo", roll: "https://roll.baronage.com/baron/william-jolly", img: "/arms/stobo.webp" },
  { dignity: "Baron", name: "Finavon", img: "/arms/finavon.webp", roll: "https://roll.baronage.com/baron/david-cairns", pageOnly: true },
  { dignity: "Younger", name: "Kinfauns", img: "/arms/kinfauns.webp", pageOnly: true },
];
