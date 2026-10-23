import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/primitives";
import { CourseCertificate } from "@/components/CourseCertificate";
import { COURSE_NAME, COURSE_PATH, courseSteps, numberWord } from "@/lib/course";

/**
 * The Baron's Course: the certificate of reading, for a reader who has ticked every paper on this device (owner
 * 2026-10-23). Out of search and out of the sitemap; the course page and the Reading Room banner lead here once
 * every paper is read.
 */
export const metadata: Metadata = {
  title: `${COURSE_NAME}: certificate of reading`,
  robots: { index: false, follow: true },
  alternates: { canonical: `${COURSE_PATH}certificate/` },
};

export default function EssentialReadingCertificatePage() {
  return (
    <Section tone="parchment" className="!py-12 sm:!py-16 print:!py-0">
      <Container>
        <div className="no-print mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow">{COURSE_NAME}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-navy sm:text-5xl">Your certificate of reading</h1>
          <p className="mt-4 font-serif text-lg italic leading-relaxed text-ink-soft sm:text-xl">
            For your own record, once you have read all {numberWord(courseSteps.length)} papers.{" "}
            <Link href={COURSE_PATH} className="not-italic text-oxblood underline decoration-oxblood/40 underline-offset-4">
              Back to the list
            </Link>
          </p>
        </div>
        <CourseCertificate
          steps={courseSteps.map(({ n, slug, title }) => ({ n, slug, title }))}
          name={COURSE_NAME}
          countWord={numberWord(courseSteps.length)}
        />
      </Container>
    </Section>
  );
}
