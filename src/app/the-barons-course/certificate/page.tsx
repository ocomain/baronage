import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/primitives";
import { COURSE_NAME, COURSE_PATH } from "@/lib/course";

/**
 * The free Certificate of Reading lived here (23–28 Oct 2026), printed by any reader who ticked every paper. The owner
 * dropped it on 28 Oct ("it's only for members"): the certificate is now for members, Friends and Patrons who pass the
 * course's test. This page stays so old links still arrive, kept out of search and sending the visitor on.
 */
const TO = `${COURSE_PATH}certification/`;

export const metadata: Metadata = {
  title: `Certificate in ${COURSE_NAME}`,
  robots: { index: false, follow: true },
  alternates: { canonical: TO },
};

export default function OldCertificatePage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${TO}`} />
      <Section tone="parchment">
        <Container>
          <p className="py-24 text-center font-serif text-xl text-navy">
            Please continue to{" "}
            <Link href={TO} className="text-oxblood underline decoration-oxblood/40 underline-offset-4">
              The Certificate
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
