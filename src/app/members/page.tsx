import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { MemberLogin } from "@/components/MemberLogin";
import { Container, GoldRule, Section, SectionHeading } from "@/components/primitives";
import { PHONE_MEDIA, phoneImage } from "@/lib/heroImage";

export const metadata: Metadata = {
  alternates: { canonical: "/members/" },
  title: "Member Login",
  description:
    "Sign in to the members’ area of the Baronage of Scotland Association, or request a call back to join — full membership carries ownership and voting rights.",
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
                <p className="mt-1 font-serif text-base italic text-gold-deep">Ownership &amp; voting rights</p>
                <GoldRule className="mt-4" align="start" />
                <MemberList items={fullMembers} />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="flex h-full flex-col border border-parchment-300/70 bg-parchment-50 p-7 sm:p-8">
                <h2 className="font-display text-2xl text-navy">Associate Membership</h2>
                <p className="mt-1 font-serif text-base italic text-muted">By subscription, or by association with a Full Member</p>
                <GoldRule className="mt-4" align="start" />
                <MemberList items={associateMembers} />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
