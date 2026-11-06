import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { MemberLogin } from "@/components/MemberLogin";
import Link from "next/link";
import { ButtonLink, Container, Eyebrow, ExternalArrow, GoldRule, Section, SectionHeading } from "@/components/primitives";
import { PHONE_MEDIA, phoneImage } from "@/lib/heroImage";

export const metadata: Metadata = {
  alternates: { canonical: "/members/" },
  // owner 2026-11-06: "pls noindex this specific https://www.baronage.com/members/ page so this doesn't appear on waybackmachine or google".
  // Search engines: noindex + noarchive here (and off the sitemap); the Internet Archive's crawlers are refused in robots.ts.
  robots: { index: false, follow: true, noarchive: true, googleBot: { index: false, follow: true, noarchive: true } },
  title: "Member Login",
  description:
    "Sign in to the members’ area of the Baronage of Scotland Association, or request a call back to join — membership carries ownership and voting rights.",
};

const fullMembers = [
  "Barons who have proved their succession and whose names are on The Roll",
  "Heirs Apparent",
  "Second-generation Heirs Apparent",
  // owner 2026-10-20 (via the membership chat): Council members such as Gordon MacGregor are members; not barons only
  "Members of the Governing Council, and others the Council invites",
];

const associateMembers = [
  // owner 2026-10-20: associate membership is for barons too, if they so wish (the £250 rung on /support/)
  "Barons on the Roll who subscribe as associate members",
  "Heirs Presumptive",
  "Children of Barons",
  "The spouse or civil partner and surviving spouse or civil partner of a Full Member",
  "Junior Members",
];

// owner 2026-11-06: "pls add comic example Drum and link to his full burke's peerage style public page ... explaining full
// members optionally get these perks". Same cover cards as /comics/; both examples are the Baron of Drum's, on the Roll.
const fullMemberPerks = [
  {
    href: "https://roll.baronage.com/baron/alexander-irvine-of-drum",
    img: "/members/drum-page",
    alt: "The top of the Baron of Drum’s page on the Roll: his portrait, his arms and his name",
    eyebrow: "A page of your own",
    title: "Your page on the Roll",
    blurb:
      "A public page in the manner of a Burke’s Peerage entry, with your arms, honours, lineage and distinctions and the history of your barony.",
    label: "The Baron of Drum’s page",
  },
  {
    href: "https://roll.baronage.com/baron/alexander-irvine-of-drum/comic/",
    img: "/comics/drum",
    alt: "Comic panel: William de Irwyn, armour-bearer, follows King Robert the Bruce through the royal camp carrying the king’s helm and shield",
    eyebrow: "Illustrated Comic",
    title: "Your barony, illustrated",
    blurb:
      "The history of your barony drawn as a comic: its charters, battles and family legends told in chapters, on your page on the Roll.",
    label: "Drum Illustrated Comic",
  },
];

function MemberList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
          <span className="mt-2 h-1.5 w-1.5 flex-none rotate-45 bg-gold" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function MembersPage() {
  return (
    <>
      {/* Login — a focused, atmospheric panel rather than a standard sub-page hero */}
      <section className="relative isolate flex flex-col items-center overflow-hidden px-4 pb-12 pt-8 sm:pt-10">
        {/* A real image (phones get the 960px twin), so the browser finds it at once and loads it first. */}
        <picture aria-hidden>
          <source media={PHONE_MEDIA} srcSet={phoneImage("/images/great-hall.webp")} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/great-hall.webp"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
        </picture>
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(180deg, rgba(8,12,28,0.82) 0%, rgba(8,12,28,0.9) 100%)" }}
          aria-hidden
        />
        <MemberLogin />
        <a
          href="#eligibility"
          className="mt-7 inline-flex items-center gap-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-parchment-200/85 transition-colors hover:text-gold"
        >
          Who can become a member
          <span aria-hidden>↓</span>
        </a>
      </section>

      {/* Who can join */}
      <Section tone="parchment" id="eligibility">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Membership"
              title="Who can become a member"
              intro="Full membership gives ownership and voting rights. Membership is open to the following."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            <Reveal className="h-full">
              <div className="flex h-full flex-col border border-parchment-300/70 bg-parchment-50 p-7 sm:p-8">
                <h2 className="font-display text-2xl text-navy">Full Membership</h2>
                {/* owner 2026-10-20: "nomination", not "election": Council seats are filled by the Council */}
                <p className="mt-1 font-serif text-base italic text-gold-deep">
                  Ownership &amp; voting rights · Eligible for nomination to the Council and committees
                </p>
                <GoldRule className="mt-4" align="start" />
                <MemberList items={fullMembers} />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="flex h-full flex-col border border-parchment-300/70 bg-parchment-50 p-7 sm:p-8">
                <h2 className="font-display text-2xl text-navy">Associate Membership</h2>
                {/* owner 2026-10-20 ("yes to all"): associate members may be invited onto committees, not the Council */}
                <p className="mt-1 font-serif text-base italic text-muted">
                  By subscription, or by association with a Full Member · May be invited to serve on committees
                </p>
                <GoldRule className="mt-4" align="start" />
                <MemberList items={associateMembers} />
              </div>
            </Reveal>
          </div>
          {/* Full members' optional extras, each with the Baron of Drum's as the example (owner 2026-11-06) */}
          <div className="mt-20">
            <Reveal>
              <div className="text-center">
                <Eyebrow>Full Membership</Eyebrow>
                <h2 className="mt-3 font-display text-[2.2rem] leading-tight text-navy sm:text-[2.5rem]">
                  For full members, if they wish
                </h2>
                <GoldRule className="mt-5" />
                <p className="mx-auto mt-6 max-w-2xl text-[1.2rem] leading-relaxed text-ink-soft">
                  A full member may also have a page of their own on the Roll and their barony drawn as an Illustrated
                  Comic. Both examples here are the Baron of Drum’s.
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
              {fullMemberPerks.map((c, i) => (
                <Reveal key={c.href} delay={i * 0.08}>
                  <article className="flex h-full flex-col">
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="group/cover block">
                      <span className="relative block">
                        <span
                          className="absolute inset-0 translate-x-2 translate-y-2 border border-gold/50 transition-transform duration-500 group-hover/cover:translate-x-3 group-hover/cover:translate-y-3"
                          aria-hidden
                        />
                        <span className="relative block overflow-hidden border border-gold/40 bg-navy-deep shadow-[0_24px_50px_-24px_rgba(8,12,28,0.6)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`${c.img}-720.webp`}
                            srcSet={`${c.img}-720.webp 720w, ${c.img}-1200.webp 1200w`}
                            sizes="(min-width: 1024px) 540px, 100vw"
                            alt={c.alt}
                            width={1200}
                            height={675}
                            loading="lazy"
                            decoding="async"
                            className="block aspect-[16/9] w-full object-cover transition duration-700 group-hover/cover:scale-[1.04]"
                          />
                        </span>
                      </span>
                    </a>
                    <div className="mt-9 flex flex-1 flex-col">
                      <Eyebrow>{c.eyebrow}</Eyebrow>
                      <h3 className="mt-3 font-display text-[2rem] leading-tight text-navy sm:text-[2.3rem]">{c.title}</h3>
                      <p className="mt-4 text-[1.2rem] leading-relaxed text-ink-soft">{c.blurb}</p>
                      <div className="mt-auto pt-7">
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-8 py-4 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-navy-deep shadow-[0_10px_30px_-12px_rgba(201,162,75,0.7)] transition-all duration-300 hover:bg-gold-light"
                        >
                          {c.label}
                          <ExternalArrow />
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
          {/* How to join: prices, terms and the pay buttons stay on the Support page alone, so they cannot drift
              (owner 2026-10-20: "ok" to linking there rather than a second pay button) */}
          <Reveal>
            <div className="mt-12 flex flex-col items-center gap-6 text-center">
              <p className="text-lg text-ink-soft">
                To join, see the ways to help on the{" "}
                <Link
                  href="/support/"
                  className="font-medium text-oxblood underline decoration-oxblood/40 underline-offset-2 transition-colors hover:decoration-oxblood"
                >
                  Support page
                </Link>
                .
              </p>
              <ButtonLink href="/support/#associate-member">Become an Associate Member</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
