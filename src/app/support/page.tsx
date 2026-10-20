import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Container, GoldRule, Section } from "@/components/primitives";
import { SupportThanks } from "@/components/SupportThanks";
import { INDEX_COUNT, formatCount } from "@/lib/site";

/**
 * Support the Association (owner 2026-10-19, "ok publish", via the "Baron membership strategy" chat). The text is the
 * owner-approved text in ~/Documents/baronage/support-page-final-for-6baronage.txt, word for word. The only ask on www:
 * no payment button (gifts and Friends go by email), and never anything of this kind on roll.baronage.com.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/support/" },
  title: "Support the Association",
  description:
    "The Roll of Scottish Barons, the Reading Room and the Index are kept by volunteers. How to support the work of the Baronage of Scotland Association, a non-profit owned by its members.",
};

const SECRETARY = "secretary@baronage.com";
const mail =
  "font-medium text-oxblood underline decoration-oxblood/40 underline-offset-2 transition-colors hover:decoration-oxblood";
const Mail = () => (
  <a href={`mailto:${SECRETARY}`} className={mail}>
    {SECRETARY}
  </a>
);

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section>
        <h2 className="font-display text-3xl text-navy sm:text-[2.1rem]">
          {title}
        </h2>
        <GoldRule align="start" className="mt-4 text-gold/70" />
        <div className="mt-6 space-y-5 text-[1.08rem] leading-relaxed text-ink-soft">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

/**
 * A Stripe payment button at the end of its item: small, and plainly a way to pay, with a card mark (owner 2026-10-20:
 * the big gold buttons "look a bit out of place and not obvious to me that they are pay buttons … maybe should be
 * smaller on end of those sentences and more like a pay button"). Same tab: Stripe sends the visitor back here.
 */
const Pay = ({ href, children }: { href: string; children: ReactNode }) => (
  <>
    {" "}
    <a
      href={href}
      title="Secure payment by card, through Stripe"
      className="ml-1 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-navy px-3.5 py-1 align-middle font-sans text-[0.8rem] font-semibold leading-6 text-parchment-50 shadow-sm transition-colors hover:bg-oxblood focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="M2.5 9.5h19M6 15h4" />
      </svg>
      {children}
    </a>
  </>
);

/** An item with its picture beside it (stacked on a phone). `src` is the path without ".webp"; a 640px copy sits beside it. */
function Pictured({ src, alt, caption, children }: { src: string; alt: string; caption?: string; children: ReactNode }) {
  return (
    <div className="grid items-start gap-5 sm:grid-cols-[13rem_1fr] sm:gap-7">
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${src}.webp`}
          srcSet={`${src}-640.webp 640w, ${src}.webp 1024w`}
          sizes="(min-width: 640px) 208px, 100vw"
          alt={alt}
          width={1024}
          height={688}
          loading="lazy"
          decoding="async"
          className="w-full rounded-sm border border-gold/40"
        />
        {caption && <figcaption className="mt-2 text-center font-serif text-sm italic text-muted">{caption}</figcaption>}
      </figure>
      <p>{children}</p>
    </div>
  );
}

const Lead = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-navy">{children}</strong>
);

const objectives: ReactNode[] = [
  "To keep the Roll of Scottish Barons, the public, evidenced record of the baronage of Scotland, and to verify the entries on it.",
  "To advocate for the dignities of the baronage of Scotland, one of the historic Three Estates, and for the legal protection of its rights and heritage.",
  "To represent barons in their dealings with government, and to seek a royal warrant recognising the Roll.",
  <>
    To offer barons the Pledge, an undertaking in honour by which a barony is
    treated by the Roll as hereditary and not <em>in commercio</em>, under the
    Baronial Code.
  </>,
  "To publish research on the law and history of the baronage, and to keep the descriptors of baronial titles in line with the law since 2004.",
  // owner 2026-10-19: "page left our peerage when mentioning other bodies of Scottish nobility -- also we are working
  // internationally with nobiliary organisations attending their events and advocacy for the baronage"
  "To work with the other bodies of the Scottish nobility, the peerage, the chiefs, the baronetage and the Court of the Lord Lyon, and with baronial and noble associations at home; and to work internationally with nobiliary organisations, attending their events and advocating for the baronage.",
];

export default function SupportPage() {
  return (
    <>
      <SupportThanks />
      <PageHero
        eyebrow="Baronage of Scotland Association · Non-Profit"
        // the heading only (owner 2026-10-20: "yes just the heading title, not menu or anywhere else")
        title="Support the Baronage"
        // the same header as the other pages (owner 2026-10-19): upright standfirst, a photograph as rich as theirs
        intro={`The Roll of Scottish Barons, the Reading Room and the Index of ${formatCount(INDEX_COUNT)} Known Scottish Baronies are kept by volunteers. Nobody is paid. Your support pays for the work itself.`}
        // owner 2026-10-19: the Contact page's hero image; 2026-10-20: set in motion on Higgsfield, silent ("no audio")
        video={{
          webm: "/videos/support-loch.webm",
          mp4: "/videos/support-loch.mp4",
          poster: "/images/hero-loch-castle.webp",
        }}
      />

      <Section tone="parchment">
        <Container size="prose">
          {/* each Part sits in its own Reveal, so the gap between them is set here */}
          <div className="space-y-16">
            <Part title="Who does the work">
              <p>
                The Baronage of Scotland Association is a non-profit owned by
                its members. Its Governing Council and the Keepers of the Roll
                serve unpaid, and the sites you are reading are built and kept
                by them. Listing on the Roll is free, and no gift to the
                Association has any bearing on it.
              </p>
            </Part>

            <Part title="Our purpose">
              <p>
                The Association exists to restore the standing of the baronage
                of Scotland, as the baronetage restored its own a century ago.
                Baronetcies had been sold and abused; in 1898 the baronets
                formed a body, and in 1910{" "}
                <Link
                  href="/reading-room/official-roll-of-the-baronetage-1910/"
                  className={mail}
                >
                  a Royal Warrant
                </Link>{" "}
                gave them an official Roll, “divers abuses” having “crept into
                the said Order”. The baronage has the same need and the same
                answer: a Roll kept by its own body, verified against the public
                record, and in time officially recognised by royal warrant.
              </p>
            </Part>

            <Part title="Our objectives">
              <ol className="space-y-4">
                {objectives.map((o, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[2.2rem_1fr] items-baseline gap-x-3"
                  >
                    <span className="font-inscribe text-xl leading-none text-gold-deep">
                      {i + 1}.
                    </span>
                    <span>{o}</span>
                  </li>
                ))}
              </ol>
            </Part>

            <Part title="Why the work costs money">
              <p>
                The baronage is a fraction of the size of the baronetage, so a
                nominal subscription cannot carry it. Its objectives are
                advocacy and record: they need lawyers, genealogists, heralds
                and scholars of Scots law, and liaison with the bodies the
                baronage sits beside: the peerage, the chiefs, the baronetage
                and the Court of the Lord Lyon. {/* owner 2026-10-19 */}All of our material is vetted by
                experts, and this all costs money and resources. The Association’s members and friends pay
                for that work.
              </p>
            </Part>

            <Part title="What your support pays for">
              {/* pictures made on Higgsfield, owner 2026-10-20 ("yes"); no people in them */}
              <Pictured src="/images/support/sealed-letter" alt="A letter closed with a red wax seal, beside a fountain pen">
                <Lead>Recognition.</Lead> Representations to government on the recognition of the dignity of baron in
                official records, including counsel’s opinion where it is needed.
              </Pictured>
              <Pictured
                src="/images/support/printed-roll"
                alt="A bound volume in oxblood leather, titled in gilt The Roll of Scottish Barons"
                caption="The printed Roll, as it is planned"
              >
                {/* owner 2026-10-19: "published bound edition"; 2026-10-20: "akin to burke's peerage style entries"; not "the first printed record", as Douglas's Baronage of Scotland (1798) makes "the first printed record" untrue */}
                <Lead>The printed Roll.</Lead> A published bound edition of the Roll of Scottish Barons, akin to Burke’s Peerage
                style entries.
              </Pictured>
              <Pictured src="/images/support/registers" alt="An old land register open on a reading desk in an archive">
                <Lead>The Index.</Lead> Research in the Register of Sasines and the Register of the Great Seal for the
                Index of {formatCount(INDEX_COUNT)} Known Scottish Baronies: record searches and legal fees.
              </Pictured>
            </Part>

            {/* "Ways to help" and "Recognition": the owner's figures of 2026-10-19, word for word from
                ~/Documents/baronage/support-page-ways-to-help-v2-2026-10-19.txt (via the membership chat) */}
            <Part title="Ways to help">
              {/* the free rung first (owner 2026-10-19: "it should also have Roll listing Pledged or not Free in the ladder") */}
              <p>
                <Lead>Entry on the Roll.</Lead> Free, pledged or not. Every holder of a Scottish barony may{" "}
                <a href="https://roll.baronage.com/verification" target="_blank" rel="noopener noreferrer" className={mail}>
                  verify the entry
                </a>{" "}
                and be recorded on the Roll at no charge, and may take the Pledge or leave it. No gift to the Association has
                any bearing on it.
              </p>
              <p>
                {/* Stripe payment buttons: owner 2026-10-20, via the membership chat. A chosen amount cannot recur in
                    Stripe, so "once or monthly" went from the gift. Same tab: Stripe sends the visitor back here. */}
                <Lead>A gift.</Lead> A single gift of £500, or any amount you choose. Write to <Mail /> for details
                or donate through this link:
                {/* owner 2026-10-20: "or donate rather" (was "Give") */}
                <Pay href="https://donate.stripe.com/14A8wPety7UE12B5poeZ20p">Donate</Pay>
              </p>
              {/* Patron between the gift and the Friend (owner 2026-10-20: "fits better … and makes the fees below it look
                  cheaper"); then (owner: "all the benefits below … not accurate now") "all that Friends and associate members have" */}
              <p>
                <Lead>Patron.</Lead> £1,000 a year, open to anyone. Patrons have all that Friends and associate members have, are named on this
                page with their consent, and may have their coat of arms shown on the Armorial page.
                {/* Patron payment link: owner-approved 2026-10-20, via the membership chat */}
                <Pay href="https://buy.stripe.com/bJecN5716a2M8v32dceZ20r">Become a Patron</Pay>
              </p>
              <p>
                <Lead>Friend of the Association.</Lead> £100 a year, open to anyone with an interest in the baronage,
                baron or not. Friends receive the newsletter and the subscriber papers and a copy of the printed Roll
                when it is published, and are named in the annual list of Friends if they wish. Write to <Mail /> to
                join.
                <Pay href="https://buy.stripe.com/cNiaEXfxC7UE26F7xweZ20q">Become a Friend</Pay>
              </p>
              <p>
                {/* the Gathering: owner 2026-10-19, "sound more fun / regal, say it's where barons will wear baronial robes" */}
                {/* owner 2026-10-20 (via the membership chat): votes stay with Full Membership. "Full" was dropped for an
                    hour, then kept: both are members, full members the inner rank, "a bit like the noblemen peers and the
                    rest of the noblesse" */}
                <Lead>Associate member.</Lead> £250 a year, for barons entered on the Roll. Associate members have the
                Members’ Chamber, with its muniments room and heir access, a place at the Barons’ Gathering, the
                Association’s annual assembly, where barons attend in their baronial robes, and the Association’s
                meetups. Full membership, with ownership and voting rights, is by arrangement with the Secretary.
                {/* owner-approved 2026-10-20, via the membership chat */}
                No joining fee for associate members who join before the first Barons’ Gathering in 2027. From then, £250 to
                join.
              </p>
              {/* owner 2026-10-20: "the dinner with the robes is excellent"; captioned, as the Gathering has not yet been held */}
              <figure className="!mt-8 !mb-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/support/barons-gathering.webp"
                  srcSet="/images/support/barons-gathering-960.webp 960w, /images/support/barons-gathering.webp 1600w"
                  sizes="(min-width: 800px) 768px, 100vw"
                  alt="A candlelit castle hall laid for dinner, crimson baronial robes draped over the chairs, Scottish banners on the walls"
                  width={1600}
                  height={1062}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-sm border border-gold/40 shadow-[0_22px_48px_-30px_rgba(10,16,36,0.55)]"
                />
                <figcaption className="mt-3 text-center font-serif text-base italic text-muted">
                  The Barons’ Gathering with baronial robes, as it is planned for 2027
                </figcaption>
              </figure>
              <p>
                {/* owner 2026-10-19 ("ok"), via the membership chat; still no figure on this item. 2026-10-20 owner: "for Google",
                    "name and title", "add online notability displayed by a third party authority" */}
                <Lead>Full member and benefactor.</Lead> For barons who wish to carry the work: all of the above, and a
                dedicated page for Google under your own name and title in the manner of a Burke’s Peerage entry, with your
                arms, honours,
                lineage and distinctions and the history of your barony, together with the figures on how often your
                name and barony are found on Google, your online notability displayed by third-party authorities, and the
                standing of a founding benefactor. Full membership carries ownership and voting rights, and eligibility
                for nomination to the Governing Council and its committees as vacancies arise. By arrangement with the
                Secretary: <Mail />
              </p>
            </Part>

            <Part title="Recognition">
              <p>
                Patrons and benefactors are named on this page with their consent. Where their arms are recorded by a
                heraldic authority, they may be shown on the Armorial page, under their own heading and with the
                reference, alongside the arms already there.
              </p>
            </Part>

            <Part title="Accountability">
              <p>
                {/* owner 2026-10-19: the yearly-statement sentence deleted; then "agreed on new wording" for the second sentence */}
                The Association is a non-profit association, not a registered
                charity, so Gift Aid cannot be claimed on gifts to it. Gifts are received on the Association’s behalf
                and applied to its work.
              </p>
            </Part>
          </div>

          <Reveal>
            <div className="mt-16 border-t border-parchment-300/70 pt-10 text-center">
              <GoldRule className="mb-8" />
              <p className="font-serif text-xl italic leading-relaxed text-navy">
                Questions, or a gift by other means: <Mail />
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
