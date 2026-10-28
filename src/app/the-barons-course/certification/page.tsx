import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { ButtonLink, Container, GoldRule, Section } from "@/components/primitives";
import { Seal } from "@/components/Seal";
import { COURSE_NAME, COURSE_OG_IMAGE, COURSE_PATH, courseSteps, numberWord } from "@/lib/course";

/**
 * The Baron's Course Certificate: the page that describes it, under The Baron's Course in the menu (owner 2026-10-28:
 * "the certification only open to … members", then "supporters and patrons yes can take the test", "signed by The Baron of Drum Chief of his Name", "something they can
 * hang up on the wall", a badge for the member's website with no mention of the Roll, as members and Patrons need not
 * be barons). The test and the certificate themselves are not built yet (owner: "wait until we have some paying members
 * and membership area first but the sales page can go up now"), so this page says the test is still to open. The free
 * Certificate of Reading is gone (owner, same day: "it's only for members"). Prices stay on the Support page alone, as
 * on the Members page.
 */
const PATH = `${COURSE_PATH}certification/`;
const link = "text-oxblood underline decoration-oxblood/40 underline-offset-4 transition-colors hover:decoration-oxblood";

export const metadata: Metadata = pageMetadata({
  title: `${COURSE_NAME} Certificate`,
  description:
    "For members, Friends and Patrons of the Baronage of Scotland Association who read the papers of The Baron’s Course and pass its test: a certificate for the wall, signed by the Baron of Drum, and optionally a badge for their own website.",
  path: PATH,
  image: COURSE_OG_IMAGE,
});

function Specimen() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem] border-[3px] border-gold bg-parchment-50 p-2 shadow-[0_22px_48px_-30px_rgba(10,16,36,0.55)]">
      <div className="flex flex-col items-center border border-gold/60 px-5 pb-8 pt-10 text-center sm:px-10">
        <Seal tone="gold" size="sm" alt="" aria-hidden className="h-20 w-auto" />
        <p className="eyebrow mt-5">Baronage of Scotland Association</p>
        <p className="mt-4 font-display text-4xl leading-tight text-navy sm:text-5xl">{COURSE_NAME}</p>
        <p className="mt-1 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-gold-deep">Certificate</p>
        <p className="mt-8 font-serif text-lg italic text-ink-soft">This records that</p>
        <p className="mt-2 w-full max-w-sm border-b border-gold/60 pb-2 font-display text-3xl leading-tight text-oxblood sm:text-[2.1rem]">
          The Baron of Inverness
        </p>
        <p className="mt-5 max-w-sm font-serif text-lg leading-snug text-ink">
          has read all the papers of {COURSE_NAME} and passed its test
        </p>
        <div className="mt-10 grid w-full grid-cols-2 items-end gap-6 text-left">
          <div>
            <p className="border-b border-ink/40 pb-1 font-serif text-lg text-ink">28 October 2026</p>
            <p className="mt-1 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted">Date</p>
          </div>
          <div>
            <p className="h-8 border-b border-ink/40" />
            <p className="mt-1 font-serif text-base leading-tight text-ink">The Baron of Drum</p>
            <p className="font-serif text-sm italic leading-tight text-ink-soft">Chief of his Name</p>
          </div>
        </div>
        <p className="mt-8 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">
          Certificate No. 0001 · www.baronage.com
        </p>
      </div>
      <span aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden">
        <span className="-rotate-[18deg] font-sans text-5xl font-semibold uppercase tracking-[0.35em] text-oxblood/[0.13] sm:text-6xl">
          Specimen
        </span>
      </span>
    </div>
  );
}

function Badge({ name, no }: { name: string; no: string }) {
  return (
    <div className="w-[18.75rem] max-w-full shrink-0 border-[3px] border-gold bg-parchment-50 p-[5px] shadow-[0_14px_30px_-22px_rgba(10,16,36,0.55)]">
      <div className="flex flex-col items-center border border-gold/60 px-4 pb-3.5 pt-5 text-center">
        <Seal tone="gold" size="xs" alt="" aria-hidden className="h-12 w-auto" />
        <p className="mt-2.5 font-sans text-[0.58rem] font-bold uppercase tracking-[0.2em] text-gold-deep">
          Baronage of Scotland Association
        </p>
        <p className="mt-1.5 font-display text-[1.75rem] leading-none text-navy">{COURSE_NAME}</p>
        <p className="mt-3 border-b border-gold/60 pb-1 font-display text-[1.3rem] leading-tight text-oxblood">
          {name}
        </p>
        <p className="mt-2 font-serif text-base italic leading-snug text-ink-soft">read its papers and passed its test</p>
        <p className="mt-3 font-sans text-[0.6rem] font-bold uppercase tracking-[0.16em] text-gold-deep">
          Certificate No. {no} · www.baronage.com
        </p>
      </div>
    </div>
  );
}

/** The button: small, to sit beside other badges, such as the Roll's Enrolled card. */
function Button({ name, no }: { name: string; no: string }) {
  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-[5px] border border-gold bg-parchment-50 py-2.5 pl-3 pr-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <Seal tone="gold" size="xs" alt="" aria-hidden className="h-12 w-auto flex-none" />
      <div className="min-w-0 text-left">
        <p className="font-sans text-[1.15rem] font-semibold leading-tight text-navy">{COURSE_NAME}</p>
        <p className="mt-0.5 font-display text-[1.05rem] leading-tight text-oxblood">{name}</p>
        <p className="mt-1 font-sans text-[0.58rem] font-bold uppercase tracking-[0.16em] text-gold-deep">
          Passed · No. {no} · www.baronage.com
        </p>
      </div>
    </div>
  );
}

/** The line: one line of text in the website's own colours, here on a dark footer. */
function Line({ name }: { name: string }) {
  return (
    <p className="inline-flex max-w-full items-start gap-2.5 text-left font-serif text-[1.05rem] leading-snug text-parchment-100/85">
      <Seal tone="gold" size="xs" alt="" aria-hidden className="mt-0.5 h-6 w-auto flex-none" />
      <span className="underline decoration-parchment-100/30 underline-offset-4">
        {name} · {COURSE_NAME}, passed · Baronage of Scotland Association
      </span>
    </p>
  );
}

/**
 * The styles for a website, each with one of the owner's examples (2026-10-28: "show the different stamp versions for
 * their website"; examples to show it is not only for barons: a baron, an heir and someone who is neither).
 */
const STYLES: { title: string; hint: string; dark?: boolean; sample: ReactNode }[] = [
  { title: "The certificate", hint: "For an About page.", sample: <Badge name="The Baron of Inverness" no="0001" /> },
  { title: "The button", hint: "Small. Fits anywhere, beside other badges.", sample: <Button name="Younger of Edinburgh" no="0002" /> },
  { title: "The line", hint: "For a footer, in your website’s own colours.", dark: true, sample: <Line name="Jane Hoop" /> },
];

/** What a visitor sees on pointing at the badge, or tapping it on a phone. */
function Record() {
  const rows: [string, string][] = [
    ["Name", "Jane Hoop"],
    ["Course", `${COURSE_NAME}, all papers`],
    ["Test", "Passed"],
    ["Certificate", "No. 0003, signed by the Baron of Drum"],
  ];
  return (
    <div className="w-[22rem] max-w-full shrink-0 border border-gold bg-parchment-50 px-5 pb-4 pt-5 shadow-[0_18px_40px_-20px_rgba(10,16,36,0.45)]">
      <div className="flex items-center gap-3 border-b border-gold/60 pb-3">
        <Seal tone="gold" size="xs" alt="" aria-hidden className="h-11 w-auto" />
        <div>
          <p className="font-serif text-[0.72rem] uppercase tracking-[0.16em] text-oxblood">Baronage of Scotland Association</p>
          <p className="mt-0.5 font-sans text-[0.95rem] font-semibold text-[#166534]">✓ {COURSE_NAME}: passed</p>
        </div>
      </div>
      <dl className="mt-3 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1.5 font-serif text-base leading-snug">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="pt-0.5 text-[0.68rem] uppercase tracking-[0.14em] text-oxblood">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 border-t border-dotted border-gold pt-2.5">
        <p className="text-[0.68rem] uppercase tracking-[0.14em] text-oxblood">Official website</p>
        <p className="mt-0.5 font-serif text-[1.05rem]">✓ yourwebsite.com</p>
      </div>
      <p className="mt-3 text-center font-serif text-sm italic text-muted">Drawn live by www.baronage.com, and dated each day.</p>
    </div>
  );
}

const steps: { title: string; body: ReactNode }[] = [
  {
    title: "Read the papers",
    body: (
      <>
        Read the {numberWord(courseSteps.length)} papers of{" "}
        <Link href={COURSE_PATH} className={link}>
          {COURSE_NAME}
        </Link>
        . They are free and open to everyone.
      </>
    ),
  },
  {
    title: "Practise",
    body: (
      <>
        Try the weekly{" "}
        <Link href="/quiz/" className={link}>
          Reading Room Quiz
        </Link>
        : five new questions from the papers every Monday.
      </>
    ),
  },
  { title: "Join", body: <>Become a member of the Association, a Friend or a Patron.</> },
  {
    title: "Take the test",
    body: (
      <>
        Online: {numberWord(courseSteps.length)} questions, one from each paper. Ten right answers pass, and you may take it
        again whenever you like.
      </>
    ),
  },
];

export default function CourseCertificationPage() {
  return (
    <Section tone="parchment" className="!pt-10 sm:!pt-14">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{COURSE_NAME}</p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-navy sm:text-6xl">The Certificate</h1>
          <p className="mt-5 font-serif text-xl italic leading-relaxed text-ink-soft sm:text-2xl">
            For members, Friends and Patrons of the Association who read the papers and pass the course’s test: a signed
            certificate for the wall and, optionally, a badge for your own website.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
          <Specimen />
          <div>
            <h2 className="font-display text-4xl leading-tight text-navy">For the wall</h2>
            <GoldRule className="mt-4" align="start" />
            <ul className="mt-6 space-y-4 font-serif text-xl leading-relaxed text-ink-soft">
              <li>Your name, the course and the date, with its own number.</li>
              <li>Signed by the Baron of Drum, Chief of his Name.</li>
              <li>Made to be framed and hung.</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
          <div className="flex justify-center lg:order-2">
            <Record />
          </div>
          <div className="lg:order-1">
            <h2 className="font-display text-4xl leading-tight text-navy">For your website</h2>
            <GoldRule className="mt-4" align="start" />
            <ul className="mt-6 space-y-4 font-serif text-xl leading-relaxed text-ink-soft">
              <li>Optional: a certificate, a button or a line for your website, drawn live by the Association.</li>
              <li>Visitors who point at it, or tap it on a phone, see the Association’s record of it.</li>
              <li>
                It shows in full only on your own website. A copy anywhere else shows only <i>Not registered for this website</i>.
              </li>
            </ul>
          </div>
        </div>

        <h3 className="mt-14 text-center font-display text-3xl leading-tight text-navy">Three styles to choose from</h3>
        <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
          {STYLES.map((st) => (
            <div key={st.title} className="flex flex-col">
              <p className="font-display text-2xl leading-tight text-navy">{st.title}</p>
              <p className="mt-1 font-serif text-lg leading-snug text-ink-soft">{st.hint}</p>
              <div
                className={`mt-4 flex min-h-[13rem] flex-1 md:min-h-[23rem] items-center justify-center border px-4 py-8 ${
                  st.dark ? "border-navy-deep bg-navy-deep" : "border-parchment-300 bg-white"
                }`}
              >
                {st.sample}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center font-serif text-lg italic text-muted">
          Not only for barons: the same badge for a baron, an heir, a Friend or a Patron.
        </p>

        <div className="mx-auto mt-20 max-w-3xl">
          <h2 className="text-center font-display text-4xl leading-tight text-navy">How to earn it</h2>
          <GoldRule className="mt-4" />
          <ol className="mt-8 border-t border-parchment-300">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.6rem_minmax(0,1fr)] gap-4 border-b border-parchment-300 py-5">
                <span className="font-display text-3xl leading-none text-gold-deep">{i + 1}</span>
                <div>
                  <p className="font-display text-2xl leading-tight text-navy">{s.title}</p>
                  <p className="mt-1 font-serif text-xl leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl leading-tight text-navy">Who may take it</h2>
              <p className="mt-3 font-serif text-xl leading-relaxed text-ink-soft">
                Members of the Association, Friends and Patrons. You need not be a baron: heirs (“Younger of”), Friends and
                Patrons may all take it.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl leading-tight text-navy">What it is</h2>
              <p className="mt-3 font-serif text-xl leading-relaxed text-ink-soft">
                A record that you have read {COURSE_NAME} and passed its test. It is not a professional qualification, and it
                does not confer or confirm any title.
              </p>
            </div>
          </div>

          <div className="mt-14 border border-parchment-300 border-t-[3px] border-t-gold bg-parchment-50 px-6 py-8 text-center sm:px-10">
            <p className="font-serif text-xl leading-relaxed text-ink">
              The test will open to members, Friends and Patrons. Join now, and you can take it as soon as it opens.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/support/#associate-member">Become an Associate Member</ButtonLink>
              <ButtonLink href="/support/" variant="outline">
                Become a Friend
              </ButtonLink>
              <ButtonLink href="/support/" variant="outline">
                Become a Patron
              </ButtonLink>
            </div>
            <p className="mt-5 font-serif text-base italic text-muted">
              Prices and terms are on the{" "}
              <Link href="/support/" className={link}>
                Support page
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
