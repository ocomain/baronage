import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Container, Section } from "@/components/primitives";
import { QuizPage } from "@/components/ReadingRoomQuiz";
import { quizzes } from "@/lib/quiz-bank";
import { dayMonth, quizFor } from "@/lib/quiz";

export const metadata: Metadata = pageMetadata({
  title: "The Reading Room Quiz",
  description: "Five questions a week from the Reading Room papers of the Baronage of Scotland Association.",
  path: "/quiz/",
});

/** The Reading Room Quiz (owner 2026-10-28): no hero, the quiz itself from the first line. */
export default function QuizRoute() {
  const quiz = quizFor(quizzes);
  return (
    <Section tone="parchment" className="!pt-10 sm:!pt-12">
      <Container>
        {quiz ? (
          <QuizPage quiz={quiz} />
        ) : (
          // Before the first Monday (the page is not in the menu or the sitemap until then).
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-5xl leading-[1.02] text-navy sm:text-6xl">The Reading Room Quiz</h1>
            <p className="mt-3 font-serif text-2xl italic leading-snug text-ink-soft">
              The first five questions open on Monday {quizzes[0] ? dayMonth(quizzes[0].week) : ""}.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
