/**
 * The Guide page (/guide/) is a hub: it holds no articles of its own, only a short plain
 * line for each topic and a link to where it is treated in full. To add a topic (for example
 * a new Reading Room paper), add an entry here; the page picks it up.
 */
export type GuideEntry = {
  href: string;
  title: string;
  /** One or two plain sentences: the short answer, or what the reader will find. */
  summary: string;
  /** "Page" for a site page, "Paper" for a Reading Room paper. */
  kind: "Page" | "Paper";
};

export const guideEntries: GuideEntry[] = [
  {
    href: "/proper-address",
    title: "Proper Address",
    summary: "How to address a Scottish baron and his family: in speech, in letters and on forms.",
    kind: "Page",
  },
  {
    href: "/proper-address#children",
    title: "Children and heirs",
    summary: "“Younger”, “Maid”, and the styles of a baron’s sons and daughters.",
    kind: "Page",
  },
  {
    href: "/scottish-baronies-explained",
    title: "Baronies, Explained",
    summary: "Plain answers to the common questions: what a barony is, what changed in 2004, and how one passes.",
    kind: "Page",
  },
  {
    href: "/history",
    title: "History",
    summary: "A thousand years in eight short chapters, in the words of the record.",
    kind: "Page",
  },
  {
    href: "/reading-room/robes-and-insignia",
    title: "Robes, chapeau and insignia",
    summary: "The red robe of 1455, the chapeau and supporters: what a baron wore, and what the Lyon Register keeps of it.",
    kind: "Paper",
  },
];
