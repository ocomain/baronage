export const site = {
  name: "Baronage of Scotland",
  legalName: "Baronage of Scotland Association",
  tagline: "The ancient nobility of Scotland — verified, recorded, and preserved for future generations.",
  email: "secretary@baronage.com",
  addressLines: ["5 South Charlotte Street", "Edinburgh", "EH2 4AN"],
  established: "Keepers of the Roll of Scottish Barons",
};

/** The live, existing register — a separate app we link out to. */
export const ROLL_URL = "https://roll.baronage.com/";

/** The Secretary's Calendly booking link — "Request a Call Back". */
export const CALENDLY_URL = "https://calendly.com/secretary-baronage/30min";

export type NavLink = { href: string; label: string; external?: boolean };

/** Primary navigation — mirrors the existing site menu. */
export const navLinks: NavLink[] = [
  { href: "/the-roll", label: "The Roll" },
  { href: "/history", label: "History" },
  { href: "/proper-address", label: "Proper Address" },
  { href: "/baronial-code", label: "Baronial Code" },
  { href: "/pledge", label: "The Pledge" },
  { href: "/charitable-trust", label: "Charitable Trust" },
  { href: "/governing-council", label: "Governing Council" },
  { href: "/about", label: "About" },
  { href: "/armorial", label: "Armorial" },
];
