import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import { Container, Section } from "@/components/primitives";
import { CoursePanel } from "@/components/CoursePanel";
import { COURSE_PARTS, courseStandfirst, courseSteps } from "@/lib/course";

/** The Baron's Course on its own page, for the header menu (owner 2026-10-23). The same panel as on the Reading Room. */
export const metadata: Metadata = pageMetadata({
  title: "The Baron’s Course",
  description: courseStandfirst(),
  path: "/the-barons-course/",
});

export default function BaronsCoursePage() {
  return (
    <>
      <section className="bg-navy-deep text-parchment-50 texture-saltire">
        <Container className="py-12 text-center sm:py-14">
          <p className="rise eyebrow eyebrow--light">Essential reading</p>
          <h1
            className="rise mt-4 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            The Baron’s Course
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-lg italic leading-relaxed text-parchment-200/85 sm:text-xl">
            Papers from the{" "}
            <Link href="/reading-room/" className="underline decoration-gold/60 underline-offset-4 hover:text-parchment-50">
              Reading Room
            </Link>
            , in the order to read them. Tick each one off as you go; this device remembers where you stopped.
          </p>
        </Container>
      </section>
      <Section tone="parchment" className="!pt-10 sm:!pt-12">
        <Container>
          <CoursePanel steps={courseSteps} parts={COURSE_PARTS} standfirst={courseStandfirst()} />
        </Container>
      </Section>
    </>
  );
}
