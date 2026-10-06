export const site = {
  name: "Baronage of Scotland",
  legalName: "Baronage of Scotland Association",
  tagline: "The ancient nobility of the Baronage of Scotland — verified, recorded, and preserved for future generations.",
  email: "secretary@baronage.com",
  addressLines: ["5 South Charlotte Street", "Edinburgh", "EH2 4AN"],
  established: "Keepers of the Roll of Scottish Barons",
};

/** Canonical production origin (no trailing slash). www is the live GitHub Pages domain; the apex 301-redirects to it. */
export const SITE_URL = "https://www.baronage.com";

/**
 * The Reading Room paper promoted by the slide-in card (components/FeaturedPaper).
 * To feature another paper, change these three fields; visitors who closed the old card will see the new one.
 */
export const FEATURED_PAPER = {
  slug: "innes-of-learney-1945",
  title: "The Lord Lyon’s Case for the Baronage",
  category: "Heritage & Sources",
} as const;

/** The live, existing register — a separate app we link out to. */
export const ROLL_URL = "https://roll.baronage.com/";
/** The Index of Scottish Baronies: council member Balvaird's research index, a sub-site like the Roll (public beta since 5 October 2026). */
export const INDEX_URL = "https://baronies.baronage.com/";

/** Roll API origin (no trailing slash) — D1-backed endpoints, e.g. /api/stats. */
export const ROLL_API = "https://roll.baronage.com";

/** The Secretary's Calendly booking link — "Request a Call Back". */
export const CALENDLY_URL = "https://calendly.com/secretary-baronage/30min";

/**
 * Email sign-up (components/EmailSignup, shown in the header and the mobile menu).
 * `action`, `emailField` and the `hidden` fields come from the embed code of the Zoho Campaigns
 * sign-up form. While `action` is empty the form is not shown anywhere.
 */
export const EMAIL_SIGNUP: { action: string; emailField: string; hidden: Record<string, string> } = {
  // Zoho Campaigns (EU): list "Papers and news", form "Website sign-up".
  action: "https://zcv2-zcmp.maillist-manage.eu/weboptin.zc",
  emailField: "CONTACT_EMAIL",
  hidden: {
    submitType: "optinCustomView",
    emailReportId: "",
    formType: "QuickForm",
    zx: "14ae56fdcb",
    zcvers: "2.0",
    oldListIds: "",
    mode: "OptinCreateView",
    zcld: "140f5995a1afea32",
    zctd: "",
    zc_trackCode: "ZCFORMVIEW",
    zc_formIx: "3zf3eb8dfbad4a3e935f2b447cf6bdea2ad6d74bb03cadb27da66f5e9f94f4ec54",
  },
};

export type NavLink = { href: string; label: string; external?: boolean; /** Small "New" pill shown beside the label in the header only. */ badge?: string };

/** Primary navigation — mirrors the existing site menu. */
export const navLinks: NavLink[] = [
  { href: "/the-roll", label: "The Roll" },
  { href: INDEX_URL, label: "Index of Baronies", external: true },
  { href: "/sbr-vs-roll", label: "SBR v Roll" },
  { href: "/history", label: "History" },
  { href: "/scottish-baronies-explained", label: "Baronies Explained" },
  { href: "/proper-address", label: "Proper Address" },
  { href: "/baronial-code", label: "Baronial Code" },
  { href: "/pledge", label: "The Pledge" },
  { href: "/charitable-trust", label: "Charitable Trust" },
  { href: "/governing-council", label: "Governing Council" },
  { href: "/about", label: "About" },
  { href: "/armorial", label: "Armorial" },
  { href: "/reading-room", label: "Reading Room", badge: "New" },
];

export type NavMenuItem = NavLink & {
  children?: NavLink[];
  /** Desktop drop-down starts with the parent page itself (visitors do not expect the heading to be a link). Not for Guide, which has no page of its own. */
  selfInList?: boolean;
  /** Wording for that first entry, where it should say more than the heading does. */
  selfLabel?: string;
};

/**
 * Header menu (owner 2026-10-05: the ten-item row was crowded). Seven items; an item with
 * children opens a short list on desktop and shows it indented in the phone menu. The parent
 * is itself a page, so nothing is reachable only through a drop-down.
 */
export const navMenu: NavMenuItem[] = [
  {
    href: "/the-roll",
    label: "The Roll",
    selfInList: true,
    children: [
      { href: "/sbr-vs-roll", label: "SBR v Roll" },
      { href: INDEX_URL, label: "Index of 1,872 baronies", external: true, badge: "New" },
    ],
  },
  {
    // "Guide" is a heading only: clicking it opens the FAQ explainer (owner 2026-10-05). There is no /guide/ page.
    href: "/scottish-baronies-explained",
    label: "Guide",
    children: [
      { href: "/scottish-baronies-explained", label: "Baronies Explained" },
      { href: "/proper-address", label: "Proper Address" },
      { href: "/history", label: "History" },
      { href: "/reading-room/robes-and-insignia", label: "Robes & Chapeau" },
      { href: "/reading-room/the-barons-court-and-its-officers", label: "Court & Officers" },
      { href: "/reading-room/heraldry-and-flags-of-a-baron", label: "Arms & Flags" },
    ],
  },
  { href: "/pledge", label: "The Pledge", selfInList: true, children: [{ href: "/baronial-code", label: "Baronial Code" }] },
  { href: "/about", label: "About", selfInList: true, selfLabel: "About & Nobility", children: [{ href: "/governing-council", label: "Governing Council" }] },
  { href: "/armorial", label: "Armorial" },
  { href: "/reading-room", label: "Reading Room", badge: "New" },
  // Back in the main row, right of Reading Room (owner 2026-10-06: there is space again on desktop).
  { href: "/members", label: "Member’s Chamber" },
];
