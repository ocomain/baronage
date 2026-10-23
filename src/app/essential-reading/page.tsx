import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/primitives";
import { COURSE_NAME, COURSE_PATH } from "@/lib/course";

/**
 * The course was called "Essential Reading" and lived here for an afternoon (23 Oct 2026) before the owner put the
 * name "The Baron's Course" back. This page stays so links of that afternoon still arrive, kept out of search and
 * sending the visitor on.
 */
export const metadata: Metadata = {
  title: COURSE_NAME,
  robots: { index: false, follow: true },
  alternates: { canonical: COURSE_PATH },
};

export default function OldCoursePage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${COURSE_PATH}`} />
      <Section tone="parchment">
        <Container>
          <p className="py-24 text-center font-serif text-xl text-navy">
            Please continue to{" "}
            <Link href={COURSE_PATH} className="text-oxblood underline decoration-oxblood/40 underline-offset-4">
              {COURSE_NAME}
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
