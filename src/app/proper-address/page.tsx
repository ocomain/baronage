import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Proper Address for Scottish Barons",
  description:
    "The correct forms of address, salutation and precedence for Scottish Barons and Baronesses — written, verbal and digital — preserving the dignity of the title.",
};

const NAV = [
  { id: "written", label: "Written Address" },
  { id: "salutation", label: "Salutation in Letters" },
  { id: "verbal", label: "Verbal Address" },
  { id: "children", label: "Children of a Baron" },
  { id: "special", label: "Special Considerations" },
  { id: "dowager", label: "Widow or Dowager" },
  { id: "higher", label: "Higher Dignities" },
  { id: "digital", label: "Digital Address Guidelines" },
];

/* ---- typographic primitives (serif, high-contrast, like the source) ---- */
function P({ children }: { children: ReactNode }) {
  return <p className="mt-6 font-serif text-xl leading-[1.8] text-ink">{children}</p>;
}
function Aside({ children }: { children: ReactNode }) {
  return <p className="mt-6 font-serif text-xl italic leading-[1.8] text-ink">{children}</p>;
}
/** Stand-alone bold form — same size as the bulleted forms. */
function FormLine({ children }: { children: ReactNode }) {
  return <p className="my-6 font-serif text-xl font-bold leading-snug text-navy">{children}</p>;
}
function Forms({ children }: { children: ReactNode }) {
  return <ul className="my-6 list-disc space-y-3 pl-7 marker:text-navy/50">{children}</ul>;
}
/** A bullet — regular weight; only the title forms inside are bold. */
function F({ children }: { children: ReactNode }) {
  return <li className="font-serif text-xl leading-snug text-ink">{children}</li>;
}
/** Bold title form. */
function S({ children }: { children: ReactNode }) {
  return <strong className="font-bold text-navy">{children}</strong>;
}
/** Italic connector. */
function Or() {
  return <em className="font-normal"> or </em>;
}
/** Italic note / parenthetical. */
function N({ children }: { children: ReactNode }) {
  return <em className="font-normal"> {children}</em>;
}
function Sec({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="font-display text-[1.7rem] font-medium leading-tight text-navy underline decoration-1 underline-offset-[0.32em] sm:text-[2.05rem]">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

const DIGITAL: { head: string; body: ReactNode }[] = [
  {
    head: "Title Field (Free Text)",
    body: "If the title field allows free text, type “The Much Honoured” as the prefix. Or type the title “The Baron of [Placename]”.",
  },
  {
    head: "Title Field (Drop-Down List)",
    body: "If the title field uses a drop-down list, select “Baron” or “Baroness” or “Lady” as appropriate. Example: Select “Baron” from the drop-down list.",
  },
  {
    head: "First Name Field",
    body: "Enter the christian name of the baron. Or type “The Baron of” or “The Much Honoured” or “The Baron of [Placename]” if the system primarily uses first names. Example: “John”.",
  },
  {
    head: "Surname Field",
    body: "Enter the full baronial title in the surname field, following the format “Baron of [Placename]” or optionally “[Familyname] The Baron of [Placename].” Example: “Baron of Inverness” or “Smith The Baron of Inverness”.",
  },
  {
    head: "Surname Field (if you selected, for example, Baron in the title field)",
    body: "If your title is already in the title field, put “of [Placename]” or “[Familyname] of [Placename]” to accurately represent the baronial title. Example: “of Inverness” or “Smith of Inverness”.",
  },
  {
    head: "Surname Field (if you typed “The Baron of [Placename]” in the first name field)",
    body: "The Much Honoured.",
  },
  {
    head: "Display Name or Full Name Field",
    body: "For systems that use a single display name or full name field, enter the name in the following format: “The Much Hon. John Smith, Baron of Inverness.” or “The Much Honoured Baron of Inverness” or “John The Baron of Inverness” or “John, Baron of Inverness”.",
  },
  {
    head: "Addressing the Baron in Correspondence",
    body: "In digital correspondence, ensure that the salutation reflects the correct title. Use “Dear Baron of Inverness” or “Dear The Much Hon. Baron of Inverness” — the prefix normally reserved for Mr or Dr would be replaced with The Much Hon. and surname Baron of Inverness.",
  },
  {
    head: "Email Signature",
    body: "If including the title in an email signature, format it as follows: “John Smith, Baron of Inverness” or “John The Baron of Inverness” or “John, Baron of Inverness”. However, Much Hon can be useful for replacing the Mr title field on digital platforms.",
  },
  {
    head: "Worst case",
    body: "Note that if the title field only allows for Mr / Ms, for example, by entering “The Baron of [Placename]” or “The Lady [Placename]” in the surname field ensures that it will at least format as: “Mr The Baron of Inverness” or “Ms The Lady Lochaber”.",
  },
];

export default function ProperAddressPage() {
  return (
    <>
      <PageHero
        eyebrow="Forms of Address & Precedence"
        title="Proper Address for Scottish Barons"
        intro="Addressing a Scottish Baron correctly honours a line of titleholders stretching back centuries — the correct forms, in written, verbal and digital use."
        image="/images/charter-seal.webp"
        position="center 40%"
      />

      {/* Lead */}
      <Section tone="white" className="pb-2 pt-14 sm:pt-16">
        <Container size="prose">
          <Reveal>
            <p className="font-serif text-2xl leading-[1.7] text-ink">
              Addressing a Scottish Baron correctly is a nod to any selfless contributions they’ve made, and to the
              long line of titleholders who carried it before—some stretching back over a thousand years. Each title
              represents generations of leadership, service, and heritage, and using it properly honours the enduring
              legacy of those who shaped Scotland’s history. Unfortunately, modern practices and digital forms often
              overlook these traditional distinctions, leading to common errors. Below, we outline the correct forms of
              address for a Scottish Baron in both written and spoken communication.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* In-page quick navigation */}
      <div className="border-y border-parchment-300/60 bg-white">
        <Container size="prose">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 py-4 text-sm">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="nav-link font-sans text-[0.66rem] uppercase tracking-[0.14em] text-navy/60 transition-colors hover:text-oxblood"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      {/* Sections */}
      <Section tone="white" className="pt-12 sm:pt-14">
        <Container size="prose">
          <div className="space-y-14">
            <Reveal>
              <Sec id="written" title="Written Address">
                <P>
                  When addressing a Scottish Baron in writing, for some barons they hold a territorial designation and
                  the correct format for the envelope or any formal correspondence would be the full territorial title:
                </P>
                <FormLine>(The Much Hon.) [First Name] [Surname] of [TD], Baron of [Barony]</FormLine>
                <P>
                  Some barons with a territorial designation choose not to use their baron title. However, most barons
                  do not hold a territorial designation and <em>just the title</em> is normally the <em>preferred</em>{" "}
                  format, for example (brackets are optional):
                </P>
                <Forms>
                  <F>
                    <S>
                      (The Much Honoured<Or />The) Baron of Inverness
                    </S>
                  </F>
                </Forms>
                <Aside>
                  Also correct: if the title is <Link href="/pledge" className="underline decoration-gold/60 underline-offset-2 transition-colors hover:text-oxblood">Pledged</Link> (a lifelong, hereditary honour rather than a temporary
                  office), the title can replace the second name for daily or professional use;{" "}
                  <strong className="font-bold">John, Baron of Inverness</strong> or{" "}
                  <strong className="font-bold">John Inverness</strong>. The holder may also retain their family name,
                  with or without TD, but is not typically used for daily life.
                </Aside>
                <div className="my-6 border-y border-parchment-300/70 py-6 text-center">
                  <p className="font-serif text-base italic leading-relaxed text-ink">
                    As published in{" "}
                    <a
                      href="https://announcements.telegraph.co.uk/marketplace/advert/livingstone-of-bachuil-notices_61304"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
                    >
                      The Telegraph
                    </a>{" "}
                    — the premier baron:
                  </p>
                  <p className="mt-3 font-serif text-xl font-bold text-navy">Niall, Baron of Bachuil</p>
                </div>
                <P>
                  Wives or female barons are entitled to <S>Lady</S> <em>or</em> <S>Baroness of</S>
                </P>
                <Forms>
                  <F>
                    <S>(The) Lady Lochaber</S>
                    <Or />
                    <S>Jane, Lady Lochaber</S>
                  </F>
                  <F>
                    <S>(The Much Honoured / The) Baroness of Lochaber</S>
                    <Or />
                    <S>(The Much Hon.) Jane Smith, Baroness of Lochaber</S>
                  </F>
                </Forms>
                <P>
                  A Scottish barony is a personal dignity held legally by the baron. It does not create a separate legal title for
                  a spouse. However, under British social custom, a wife is the legal and social equal of her husband in style and title.
                  She shares his rank and assumes the feminine form of his title by courtesy but does not hold it in her
                  own right. Upon marriage, she takes his style; if widowed or divorced, her title use follows
                  convention, not entitlement. As titles of nobility are considered part of a person’s name and
                  identity, her title is reflected in a British passport as her legal name.
                </P>
                <P>In cases where the Baron is entitled to post-nominal letters, these should follow, such as:</P>
                <Forms>
                  <F>
                    <S>The Baron of Inverness, CBE</S>
                  </F>
                </Forms>
                <P>
                  A title granted by the Crown, such as a Scottish Barony, supersedes academic titles like Professor or
                  Doctor and generally should not be used. The baronial title takes precedence and should stand alone
                  due to its higher rank. However, if an individual insists on including their academic title, it must
                  appear in a subordinate position. Here’s the correct format if an academic title is included:
                </P>
                <Forms>
                  <F>
                    <S>The Baron of Inverness, Professor John Smith</S>
                    <Or />
                    <S>Prof Baron of Inverness</S>
                    <Or />
                    <S>Prof Inverness</S>
                  </F>
                  <F>
                    <S>Dr The Lady Lochaber</S>{" "}
                    <S>(Jane Smith, 5th baroness)</S>
                    <Or />
                    <S>Dr Lady Lochaber</S>
                  </F>
                </Forms>
                <P>
                  For official and ceremonial purposes, the baronial title alone is the correct form, preserving the
                  dignity and precedence of the Crown-granted rank.
                </P>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="salutation" title="Salutation in Letters">
                <P>
                  When beginning a letter to a Scottish Baron, the salutation should reflect the dignity of the title.
                  The correct salutation is:
                </P>
                <Forms>
                  <F>
                    <S>Dear Baron of Inverness</S>
                    <Or />
                    <S>Dear Baron</S>
                  </F>
                  <F>
                    <S>Dear Lady Lochaber</S>
                    <Or />
                    <S>Dear Baroness of Lochaber</S>
                    <Or />
                    <S>Dear Baroness</S>
                  </F>
                </Forms>
                <P>
                  Alternatively, only the barony can be used: <S>Dear Inverness</S>, but this format is never for a lady.
                </P>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="verbal" title="Verbal Address">
                <P>In conversation, a Scottish Baron should be addressed by their title and the name of the barony:</P>
                <Forms>
                  <F>
                    Third person introduction <S>The Baron (of Inverness and Lady Inverness)</S> then
                  </F>
                  <F>
                    <S>Baron</S> <em>or</em> simply ‘<S>Inverness</S>’ may be used
                  </F>
                  <F>
                    <S>Baroness</S> <em>or</em> <S>Lady Inverness</S>
                  </F>
                </Forms>
                <P>
                  It is incorrect to refer to them simply by their surname or without the baronial designation, e.g.,
                  “Mr / Mrs Smith” or “Esq.” is certainly incorrect. Some wives of highland clan chief-barons prefer{" "}
                  <S>Madam</S>.
                </P>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="children" title="Addressing the Children of a Baron">
                <P>
                  The heir may be addressed with the courtesy title “Younger of Barony,” and oldest daughter “Maid”:
                </P>
                <Forms>
                  <F>
                    <S>Younger of Barony</S>
                    <Or />
                    <S>Mr John Smith, Younger of Barony</S>
                    <Or />
                    <S>Barony Yr</S>
                    <N>(spoken Barony)</N>
                  </F>
                  <F>
                    <S>Maid of Barony</S>
                    <Or />
                    <S>Miss Jane Smith, Maid of Barony</S>
                    <N>(some prefer Maiden)</N>
                  </F>
                  <F>
                    Wife of heir: <S>Mrs Smith, Younger of Barony</S>
                  </F>
                </Forms>
                <P>If a baron holds a territorial designation, the TD typically takes precedence:</P>
                <Forms>
                  <F>
                    <S>Mr John Smith of TD, yr</S>
                  </F>
                  <F>
                    Wife of heir: <S>Mrs Smith of TD, yr</S>
                  </F>
                  <F>
                    Younger daughters: <S>Miss Mary Smith of TD</S>
                  </F>
                </Forms>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="special" title="Special Considerations">
                <P>
                  If the Baron holds additional titles or ranks, the baronial title should take precedence in most forms
                  of address. However, in cases where the Baron is also a peer, baronet, or knight of the realm, that
                  title would take precedence. For example:
                </P>
                <Forms>
                  <F>
                    <S>The Rt Hon The Lord Inverness</S>
                    <N>(if a Scottish Baron is also a Peer)</N>
                  </F>
                </Forms>
                <P>For example, if the Baron is also a knight, they would be addressed as:</P>
                <Forms>
                  <F>
                    <S>Sir John Smith</S>
                    <Or />
                    <S>Sir John Smith, Baron of Inverness</S>
                  </F>
                </Forms>
                <P>For military titles, military titles go before the title, or for maximum formality:</P>
                <Forms>
                  <F>
                    <S>Major (The Baron of) Inverness</S>
                  </F>
                  <F>
                    <S>Major The Much Honoured Baron of Inverness DL</S>{" "}
                    <S>(John Smith, 5th baron)</S> <N>— post-nominals after title</N>
                  </F>
                </Forms>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="dowager" title="Widow or Dowager Baroness">
                <div className="mb-2 mt-2 border-y border-parchment-300/70 py-6 text-center">
                  <p className="font-serif text-base italic leading-relaxed text-ink">
                    The mother of the premier baron — also styled <strong className="font-bold not-italic text-navy">Madam</strong>{" "}
                    instead of Lady, as a Highland chiefly family:
                  </p>
                  <p className="mt-4 font-serif text-xl font-bold text-navy">
                    <a
                      href="https://www.clanlivingstone.info/LateChief.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-gold/50 underline-offset-4 transition-colors hover:text-oxblood"
                    >
                      The Dowager Madam Livingstone of Bachuil
                    </a>
                  </p>
                  <p className="mt-5 border-t border-parchment-300/60 pt-5 font-serif text-base italic leading-relaxed text-ink">
                    As published in{" "}
                    <a
                      href="https://announcements.telegraph.co.uk/marketplace/advert/livingstone-of-bachuil-notices_61304"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
                    >
                      The Telegraph
                    </a>
                    : <strong className="font-bold not-italic text-navy">Valerie, Madam Livingstone of Bachuil</strong>{" "}
                    and <strong className="font-bold not-italic text-navy">Niall, Baron of Bachuil</strong>
                  </p>
                </div>
                <P>
                  The following section applies only to Pledged bloodline titles; as the title of honour always remains
                  within the family. However, if a non-Pledged title is disponed to another family, the honour ceases
                  for all connected family members, meaning there can be no dowager or continued courtesy titles. Upon
                  the death of a Scottish Baron, the widow retains the style of “Lady [Barony]” unless the new Baron is
                  married. New baron must be related to the dowager. In such cases, she may choose to be styled as:
                </P>
                <Forms>
                  <F>
                    <S>The Dowager Lady Inverness</S>
                  </F>
                  <F>
                    <S>Margaret, Lady Inverness</S>
                  </F>
                </Forms>
                <P>
                  If she remarries, she would take her style from her new husband, forfeiting her previous title.
                  However, by long-standing social convention in Great Britain, a divorced wife who does not remarry may
                  choose to retain her former husband’s title, minus the prefix—no longer “The Much Honoured.”
                </P>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="higher" title="Higher dignities Lord, Earl and Marquis in the Baronage of Scotland">
                <P>
                  In Scotland marquis follows the french spelling as a rule. Over 90% of titles in the Baronage of
                  Scotland are Baron of, however there are a small number of very rare titles that are but nobler titles
                  of baron. Baron of somewhat distinguishes from peers (there are not many titles in the peerage that
                  use of for baron, for example many Irish peers are baron of). However, to distinguish Earl of or
                  Marquis of which could be confused with the peerage the prefix honorific style The Much Hon. (The Much
                  Honoured) can be put before the name, this prefix honorific is used to distinguish Scottish Barons from
                  honourifics attaching to peers.
                </P>
                <P>Earldom example:</P>
                <Forms>
                  <F>
                    Scottish baronial Earl: <S>The Much Honoured Earl Baron of Lochaber</S>
                    <N>(spoken Lochaber or The Earl)</N>
                  </F>
                  <F>
                    Peer: <S>The Right Hon The Earl of Lochaber</S>
                    <N>(spoken Lord Lochaber or The Earl)</N>
                  </F>
                </Forms>
                <P>
                  Note that for Lords in the Baronage of Scotland a baron is a lord and a lord is a baron and use can be
                  interchangeable or as per the preference of the holder, both are correct. While a Scots baron — that is
                  not a lord — is only ever called a baron. Earl and Marquis are baronies elevated to lordship and
                  earldom or marquisate therefore also interchangeable in address as baron/lord or earl — baron/lord or
                  marquis, but typically only the senior rank or lord is referenced e.g. The Earl. Higher dignities Lord,
                  Earl or Marquis can be addressed as Lord Lochaber (noting that medieval feudal lords, that were not
                  lords of parliament, but of higher dignity than baron were referred to with and without the of even in
                  the most formal documents such as crown charters) and earldoms are typically a combined earldom,
                  lordship and barony.
                </P>
                <div className="mt-8 border-y border-parchment-300/70 py-6 text-center">
                  <p className="font-serif text-base italic leading-relaxed text-ink">
                    William Borthwick, 1775 —{" "}
                    <a
                      href="https://archive.org/details/inquiryintoorigi00bortuoft/page/12/mode/2up?q=Lord+Barons"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-gold/50 underline-offset-2 transition-colors hover:text-oxblood"
                    >
                      An inquiry into the origin and limitations of the feudal dignities of Scotland
                    </a>
                  </p>
                  <figure className="mt-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/lord-baron.webp"
                      alt="Charter excerpt from Borthwick (1775): in 1416 William ‘Lord Graham’ receives the barony of Mellenok, and in 1420 ‘William Lord of Graham’ the lands of Aldmontrose."
                      width={584}
                      height={262}
                      className="mx-auto w-full max-w-[12rem] border border-navy/10 shadow-[0_14px_34px_-16px_rgba(8,12,28,0.4)]"
                    />
                  </figure>
                  <p className="mt-6 font-serif text-lg text-navy">
                    1416 William Lord Graham &gt;
                    <br />
                    1420 William Lord of Graham
                  </p>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    By definition a feudal lordship, as the additional Lord of Parliament honour was not created for
                    Lord Graham until 1445.
                  </p>
                </div>
                <P>Lordship example:</P>
                <Forms>
                  <F>
                    Scottish baronial Lord: <S>The Much Honoured Lord Lochaber or Baron of Lochaber</S> never Baron X
                    <N>(spoken Lochaber)</N>
                  </F>
                  <F>
                    Peer: <S>The Right Hon The Lord Lochaber</S>
                    <N>(spoken Lord Lochaber)</N>
                  </F>
                </Forms>
                <P>
                  The heir to these higher dignities is the same as a baron “Younger of Lochaber” for a son, and for the
                  oldest daughter “Maid of Lochaber”. Earls in the Baronage of Scotland, typically hold lordship or
                  barony subsidiary titles. For Pledged title holders, the Roll recommends special disposition allowing
                  their children use of their junior titles during their lifetimes, similar to courtesy titles in the
                  peerage but more like the Spanish nobility’s practice of subtitle transfer during a lifetime. This is a
                  one-time, irreversible process that lasts until death, after which the title reverts to the primary
                  succession of the senior title. For advice, contact us.
                </P>
              </Sec>
            </Reveal>

            <Reveal>
              <Sec id="digital" title="Digital Address Guidelines for Barons">
                <P>
                  When entering the title of a Baron into a digital system, it is important to ensure that the title is
                  displayed correctly and with proper respect for its historical and legal significance. Below are
                  recommended practices for filling out typical fields in computer systems, such as databases, online
                  forms, and digital directories. Always think of how it will be presented in that system:
                </P>
                <ol className="my-6 list-decimal space-y-4 pl-7 marker:font-inscribe marker:text-gold-deep">
                  {DIGITAL.map((d) => (
                    <li key={d.head} className="font-serif text-xl leading-[1.8] text-ink">
                      <S>{d.head}:</S> {d.body}
                    </li>
                  ))}
                </ol>
                <P>
                  By following these guidelines, you can ensure that baronial titles are correctly represented and
                  respected in digital systems, maintaining the dignity and historical heritage of the title.
                </P>
              </Sec>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
