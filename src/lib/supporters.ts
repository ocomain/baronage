/** The supporters shown in the homepage conveyor and on /supporters. */
export type Barony = {
  dignity: "Baron" | "Lord Baron" | "Earl Baron" | "Younger" | "Lord & Steward" | "Countess" | "Baroness";
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
  {
    dignity: "Baron",
    name: "Drum",
    roll: "https://roll.baronage.com/baron/alexander-irvine",
    img: "/arms/drum.webp",
    note: "Chief of his Name",
  },
  { dignity: "Baron", name: "Kirkbuddo", roll: "https://roll.baronage.com/baron/jean-yves-de-la-sabliere", img: "/arms/kirkbuddo.webp" },
  { dignity: "Baron", name: "Lundie", roll: "https://roll.baronage.com/baron/craig-ward", img: "/arms/lundie.webp" },
  { dignity: "Baron", name: "Crawfordjohn", img: "/arms/crawfordjohn.webp", pageOnly: true },
  { dignity: "Lord & Steward", name: "Garlies", img: "/arms/garlies.webp", pageOnly: true },
  { dignity: "Baroness", name: "Redcastle", img: "/arms/redcastle.webp", pageOnly: true },
  { dignity: "Baroness", name: "Greenan", img: "/arms/greenan.webp", pageOnly: true },
  { dignity: "Baron", name: "Culbin", img: "/arms/culbin.webp", pageOnly: true },
  { dignity: "Baron", name: "Bachuil", roll: "https://roll.baronage.com/baron/niall-livingstone-of-bachuil", img: "/arms/bachuil.webp", note: "Chief of his Name" },
  { dignity: "Lord Baron", name: "Leslie", roll: "https://roll.baronage.com/giacomo-merello.html", img: "/arms/leslie.webp" },
  { dignity: "Baron", name: "Bannockburn", roll: "https://roll.baronage.com/baron/hope-vere-anderson", img: "/arms/bannockburn.webp" },
  { dignity: "Baron", name: "Biggar", roll: "https://roll.baronage.com/baron/charles-ross-of-biggar", img: "/arms/biggar.webp" },
  { dignity: "Baron", name: "Balvill", roll: "https://roll.baronage.com/baron/mark-hopking", img: "/arms/balvill.webp" },
  {
    dignity: "Baron",
    name: "Moncrieffe",
    img: "/arms/moncrieffe.webp",
    note: "Chief of his Name",
  },
  { dignity: "Baron", name: "Mugdock", roll: "https://roll.baronage.com/baron/luciano-lambertini", img: "/arms/mugdock.webp" },
  { dignity: "Baron", name: "Hartsyde", roll: "https://roll.baronage.com/baron/jean-guy-philip-boisserolles-de-st-julien", img: "/arms/hartsyde.webp" },
  { dignity: "Earl Baron", name: "Rothes", roll: "https://roll.baronage.com/dario-item.html", img: "/arms/rothes.webp", pageOnly: true },
  { dignity: "Baron", name: "Stobo", roll: "https://roll.baronage.com/baron/william-jolly", img: "/arms/stobo.webp" },
  { dignity: "Baron", name: "Finavon", img: "/arms/finavon.webp", roll: "https://roll.baronage.com/baron/david-cairns", pageOnly: true },
  { dignity: "Younger", name: "Kinfauns", img: "/arms/kinfauns-arms.webp", pageOnly: true },
  { dignity: "Baron", name: "Gilmerton", img: "/arms/gilmerton.webp", pageOnly: true },
  { dignity: "Lord Baron", name: "Coupar", img: "/arms/coupar.webp", pageOnly: true },
];
