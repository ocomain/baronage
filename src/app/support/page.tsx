import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Container, GoldRule, Section } from "@/components/primitives";

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
      <PageHero
        eyebrow="Baronage of Scotland Association · Non-Profit"
        title="Support the Association"
        intro={
          <em>
            The Roll of Scottish Barons, the Reading Room and the Index of Known
            Scottish Baronies are kept by volunteers. Nobody is paid. Your
            support pays for the work itself.
          </em>
        }
        image="/images/glen-mist.webp"
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
                Baronetcies had been sold and assumed; in 1898 the baronets
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
                record, and in time recognised by royal warrant.
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
              <p>
                <Lead>Recognition.</Lead> Representations to government on the
                recognition of the dignity of baron in official records,
                including counsel’s opinion where it is needed.
              </p>
              <p>
                <Lead>The printed Roll.</Lead> A bound edition of the Roll of
                Scottish Barons, the first printed record of the baronage since
                Debrett’s ceased to list it.
              </p>
              <p>
                <Lead>The Index.</Lead> Research in the Register of Sasines and
                the Register of the Great Seal for the Index of Known Scottish
                Baronies: archive fees, copies and travel.
              </p>
            </Part>

            <Part title="Three ways to help">
              <p>
                <Lead>A gift.</Lead> Any amount, once or monthly. Write to{" "}
                <Mail /> and the Secretary will send the details.
              </p>
              <p>
                <Lead>Friend of the Association.</Lead> £50 a year, open to
                anyone with an interest in the baronage, baron or not. Friends
                receive the newsletter and the subscriber papers, and are named
                in the annual list of Friends if they wish. Write to <Mail /> to
                join.
              </p>
              <p>
                <Lead>Membership.</Lead> Barons entered on the Roll may join the
                Association, which they then own: one member, one vote. Details
                from the Secretary: <Mail />
              </p>
            </Part>

            <Part title="Recognition">
              <p>
                Benefactors are named on this page with their consent. A
                benefactor whose arms are recorded by a heraldic authority may
                have them shown on the Armorial page, under their own heading
                and with the reference, alongside the arms already there.
              </p>
            </Part>

            <Part title="Accountability">
              <p>
                The Association is a non-profit association, not a registered
                charity, so Gift Aid cannot be claimed on gifts to it. Each year
                it publishes a short statement of what was received and what it
                paid for.
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
