import type { Metadata } from "next";
import Link from "next/link";
import { Drawing, GuideChapters, type GuideChapter } from "@/components/GuideChapters";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, Section } from "@/components/primitives";

export const metadata: Metadata = {
  alternates: { canonical: "/robes-and-chapeau/" },
  title: "Robes and Chapeau of a Scottish Baron",
  description:
    "The red robe of 1455, the five-buttoned mantle, the chapeau and supporters: what a Scottish baron wore, in five short chapters from the record.",
};

const INNES = "http://journals.socantscot.org/index.php/psas/article/download/8229/8197/";
const MACKENZIE = "https://archive.org/details/bim_eighteenth-century_the-works-of-that-eminen_mackenzie-george-sir_1716_2/page/n552";

const chapters: GuideChapter[] = [
  {
    numeral: "I",
    years: "1455",
    title: "The red robe",
    lead: "Parliament gave the lords of parliament, barons among them, a red mantle open at the front. The earls’ was brown, furred with white.",
    quote: "a mantle likewise of red, open at the front, lined with silk or furred with grey ‘gris’ fur or ‘pured’ fur",
    source: { label: "Parliament of Scotland · 4 August 1455", href: "https://www.rps.ac.uk/trans/1455/8/12" },
    img: "/images/guide/robe-of-state.webp",
    pos: "76% 50%",
  },
  {
    numeral: "II",
    years: "1606",
    title: "Five buttons",
    lead: "The older travelling mantle was circular and fastened on the right shoulder: three buttons for a freeholder, five for a baron. In 1606 the Privy Council put lords and barons alike into new robes “in red, lined white” for the Riding of Parliament.",
    quote: "nather Commissioners of Burows nor Barons rode, for vant of furnitur",
    source: { label: "Lyon’s record of the Riding · 1606 · Innes of Learney, 1945, pp. 127–129", href: INNES },
    img: "/images/guide/mantle-five-buttons.webp",
    pos: "78% 50%",
  },
  {
    numeral: "III",
    years: "1650",
    title: "The chapeau",
    lead: "The baron’s cap, red and turned up with white fur, is the ancestor of the heraldic cap of maintenance. When the Roslin vault was opened in 1650, the Baron of Roslin lay in his armour still wearing it.",
    quote: "laying in his armour with a red velvet cap on his head … nothing was spoiled except a piece of the white furring that went round the cap",
    source: { label: "The opening of the Roslin vault · 1650 · Innes of Learney, 1945, pp. 148–157", href: INNES },
    img: "/images/guide/vault-armour-cap.webp",
    pos: "58% 50%",
    dark: true,
    figure: (
      <div className="grid grid-cols-2 items-end gap-6 lg:grid-cols-1 lg:gap-10">
        <Drawing src="/images/guide/chapeau-gules.svg" alt="A red chapeau turned up with ermine" caption={<>Chapeau gules, furred ermine<br />the baron’s cap</>} />
        <Drawing src="/images/guide/chapeau-azure.svg" alt="A blue chapeau turned up with ermine" caption={<>Chapeau azure<br />representatives of baronial houses</>} className="lg:w-2/3 lg:mx-auto" />
      </div>
    ),
  },
  {
    numeral: "IV",
    years: "1680",
    title: "Supporters",
    lead: (
      <>
        The old barons bore supporters, though they were not lords, because they had been heritable counsellors to the
        King in Parliament. In 1673 “sundry barons” took the Lord Lyon to court to keep them.
      </>
    ),
    quote: "our old Barons, who are not Lords, and hold only their Lands in free Barony, have Supporters in their Atchievement",
    source: { label: "Sir George Mackenzie, Lord Advocate · 1680", href: MACKENZIE },
    img: "/images/guide/supporters-in-stone.webp",
    pos: "74% 50%",
  },
  {
    numeral: "V",
    years: "Since 2004",
    title: "Today",
    lead: "Under the Lord Lyon’s guidance of 2010, a red chapeau already granted passes to the heir, and the blue chapeau and supporters stay with the representatives of baronial houses. A baron petitioning today receives the helm assigned to barons.",
    quote: "the dignity of baron, though retained, shall not attach to the land",
    source: { label: "Abolition of Feudal Tenure etc. (Scotland) Act 2000, s. 63", href: "https://www.legislation.gov.uk/asp/2000/5/section/63" },
    img: "/images/guide/register-room.webp",
  },
];

const sources = [
  { label: "Innes of Learney, “The Robes of the Feudal Baronage of Scotland”, Proceedings of the Society of Antiquaries of Scotland, 1945", href: INNES },
  { label: "Act of 4 August 1455 on the habits of earls and lords of parliament · RPS 1455/8/12", href: "https://www.rps.ac.uk/trans/1455/8/12" },
  { label: "Sir George Mackenzie, Observations … as to Precedency, 1680", href: MACKENZIE },
  { label: "Lord Lyon’s guidance on baronial additaments, 5 January 2010 (archived)", href: "https://web.archive.org/web/20100925150122/http://www.lyon-court.com:80/lordlyon/616.html" },
];

export default function RobesAndChapeauPage() {
  return (
    <>
      <section className="bg-navy-deep text-parchment-50 texture-saltire">
        <Container className="py-10 text-center sm:py-12">
          <p className="rise eyebrow eyebrow--light">Guide · In Five Chapters</p>
          <h1
            className="rise mt-4 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            Robes and Chapeau
          </h1>
          <p className="rise mt-4 font-serif text-lg italic text-parchment-200/75" style={{ animationDelay: "0.16s" }}>
            What a Scottish baron wore, in the words of the record.
          </p>
        </Container>
      </section>

      <GuideChapters chapters={chapters} />

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <blockquote className="border-l-2 border-gold pl-6 font-serif text-2xl italic leading-relaxed text-navy sm:pl-8">
              What a baron wore was fixed by statute and by grant. Who is entitled to it depends on who holds the dignity,
              and that is what the Roll records.
            </blockquote>
          </Reveal>
          <Reveal>
            <p className="mt-10 font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">Read further</p>
            <ul className="mt-3 space-y-2 text-lg">
              <li>
                <Link
                  href="/reading-room/robes-and-insignia"
                  className="text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:text-oxblood-deep"
                >
                  The full paper: Robes, chapeau and insignia of the baronage
                </Link>
              </li>
              <li>
                <Link
                  href="/reading-room/innes-of-learney-1945"
                  className="text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:text-oxblood-deep"
                >
                  The Lord Lyon’s Case for the Baronage
                </Link>
              </li>
            </ul>
            <p className="mt-8 font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">Sources</p>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
              {sources.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-4 hover:text-oxblood">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section tone="navy" className="text-center">
        <Container size="prose">
          <Reveal>
            <GoldRule className="mb-8" />
            <h2 className="text-3xl text-parchment-50 sm:text-4xl">The arms that go with it</h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-parchment-200/85">
              The helm, the banner and the four flags a baron may fly.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/reading-room/heraldry-and-flags-of-a-baron" variant="gold">
                Arms &amp; Flags
              </ButtonLink>
              <ButtonLink href="/proper-address" variant="outlineLight">
                How to address a baron
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
