import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, GoldRule, Section } from "@/components/primitives";

export const metadata: Metadata = {
  title: "History of the Scottish Baronage",
  description:
    "One of the oldest noble classes in Scotland — feudal superiors of the Crown, defenders of sovereignty, and today a non-territorial dignity preserved in law.",
};

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="A Thousand Years of Heritage"
        title="History of the Scottish Baronage"
        intro="One of the oldest noble classes in Scotland — with origins in the medieval period, predating the peerage itself."
      />

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <p className="dropcap text-lg leading-relaxed text-ink-soft">
              Scottish barons were originally feudal superiors who held their lands directly from the Crown, granting
              them local authority and influence. Their role was vital to the governance and social fabric of medieval
              Scotland, and their class would shape the pivotal moments of the nation’s history.
            </p>
          </Reveal>

          <Reveal>
            <div className="prose-heritage mt-6">
              <h2>Among the Three Estates</h2>
              <p>
                Until the Union with England in 1707, Scottish barons held the right to sit in Parliament as part of the
                historic Three Estates, among the nobility of the Second Estate. They were distinct from the
                higher-ranking feudal lords and Lords of Parliament — the Scottish equivalent of English barons — a
                distinction that has remained clear throughout history, hence the term <strong>“minor barons.”</strong>
              </p>

              <h2>Defenders of Scottish sovereignty</h2>
              <p>
                The baronial class played a pivotal role during the Wars of Scottish Independence in the 13th and 14th
                centuries. Many were also knights, rendering military service and providing troops for the King. Barons
                stood as key defenders of Scottish sovereignty against English incursions — their dedication
                immortalised in events such as the Declaration of Arbroath.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="navy" className="text-center">
        <Container size="prose">
          <Reveal>
            <p className="eyebrow eyebrow--light">1320 · The Declaration of Arbroath</p>
            <blockquote className="mt-6 font-display text-2xl leading-snug text-parchment-50 sm:text-3xl">
              A letter sealed by some forty Scottish barons, affirming Scotland’s independence to the Pope and
              recognising Robert the Bruce as the country’s lawful king.
            </blockquote>
            <GoldRule className="mt-8" />
          </Reveal>
        </Container>
      </Section>

      <Section tone="parchment">
        <Container size="prose">
          <Reveal>
            <div className="prose-heritage">
              <h2>Justice and the Baron’s Court</h2>
              <p>
                As the feudal system gradually declined, the parliamentary duties of the minor barons receded to the
                senior nobility. Yet barons retained significant local governance, overseeing justice in their baron’s
                courts — resolving disputes, conducting trials, and administering the law within their lands.
              </p>

              <h2>From feudal tenure to personal dignity</h2>
              <p>
                Historically, baronial titles were tied to tenure — to the holding of land and castle. With the end of
                the feudal system in Scotland at the turn of the 21st century, these titles ceased to be feudal,
                becoming <strong>non-territorial personal dignities protected by law</strong>, no longer attached to the
                land.
              </p>
              <p>
                The Scotland Act 2000 enshrined the status of barons as a noble dignity, distinguishing it from the
                now-defunct feudal system. Today, titles in the Baronage of Scotland are passed down through
                generations — blending historical heritage with modern relevance — and remain a recognised part of the
                national heritage: a title of honour and history.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 flex flex-col items-center gap-4 border-t border-parchment-300/70 pt-10 text-center sm:flex-row sm:justify-center">
              <ButtonLink href="/proper-address" variant="outline">
                Forms of address
              </ButtonLink>
              <ButtonLink href="/the-roll" variant="gold">
                Verify on the Roll
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
