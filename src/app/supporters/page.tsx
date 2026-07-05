import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/supporters/" },
  title: "Armorial",
  robots: { index: false },
};

/** Legacy URL — the armorial moved to /armorial. */
export default function SupportersRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/armorial/" />
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="leading-relaxed text-ink-soft">
          The armorial has moved.{" "}
          <Link href="/armorial" className="text-oxblood underline">
            Continue to the Armorial
          </Link>
          .
        </p>
      </div>
    </>
  );
}
