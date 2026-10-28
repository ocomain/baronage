import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Container, Section } from "@/components/primitives";
import { QuizPage } from "@/components/ReadingRoomQuiz";
import { quizzes } from "@/lib/quiz-bank";
import { londonDate, quizFor } from "@/lib/quiz";

export const metadata: Metadata = pageMetadata({
  title: "The Reading Room Quiz",
  description: "Five questions a week from the Reading Room papers of the Baronage of Scotland Association.",
  path: "/quiz/",
});

/** The Reading Room Quiz (owner 2026-10-28): no hero, the quiz itself from the first line. */
export default function QuizRoute() {
  const initial = quizFor(quizzes, londonDate());
  return (
    <Section tone="parchment" className="!pt-10 sm:!pt-12">
      <Container>
        {initial && <QuizPage quizzes={quizzes} initialNo={initial.no} />}
      </Container>
    </Section>
  );
}
