import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Container, Section } from "@/components/primitives";
import { CoursePanel } from "@/components/CoursePanel";
import { COURSE_NAME, COURSE_OG_IMAGE, COURSE_PARTS, COURSE_PATH, courseStandfirst, courseSteps } from "@/lib/course";

/**
 * The Baron's Course on its own page, for the header menu (owner 2026-10-23). The full syllabus lives here only; the
 * header menu leads to it (the Reading Room banner was taken off on 24 Oct: "it is already clearly in the nav menu as
 * a main item"). No hero band (owner: "remove the hero section from the top of
 * the page"): the course's own panel carries the title.
 */
export const metadata: Metadata = pageMetadata({
  title: COURSE_NAME,
  description: courseStandfirst(),
  path: COURSE_PATH,
  image: COURSE_OG_IMAGE,
});

export default function BaronsCoursePage() {
  return (
    <Section tone="parchment" className="!pt-10 sm:!pt-14">
      <Container>
        <CoursePanel
          title={COURSE_NAME}
          steps={courseSteps}
          parts={COURSE_PARTS}
          standfirst={courseStandfirst()}
          path={COURSE_PATH}
        />
      </Container>
    </Section>
  );
}
