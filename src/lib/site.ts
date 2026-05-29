export const site = {
  name: "Baronage of Scotland",
  legalName: "Baronage of Scotland Association",
  tagline: "Preserving the noble heritage of Scottish Barons in the modern era.",
  email: "secretary@baronage.com",
  addressLines: ["5 South Charlotte Street", "Edinburgh", "EH2 4AN"],
  established: "Keepers of the Roll of Scottish Barons",
};

/** The live, existing register — a separate app we link out to. */
export const ROLL_URL = "https://roll.baronage.com/";

export type NavLink = { href: string; label: string; external?: boolean };

/** Primary navigation — mirrors the existing site menu. */
export const navLinks: NavLink[] = [
  { href: ROLL_URL, label: "The Roll", external: true },
  { href: "/history", label: "History" },
  { href: "/proper-address", label: "Proper Address" },
  { href: "/baronial-code", label: "Baronial Code" },
  { href: "/oath", label: "Oath & Pledge" },
  { href: "/charitable-trust", label: "Charitable Trust" },
  { href: "/governing-council", label: "Governing Council" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
