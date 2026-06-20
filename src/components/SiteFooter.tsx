import Link from "next/link";
import { Seal } from "./Seal";
import { GoldRule, ExternalArrow } from "./primitives";
import { navLinks, site, ROLL_URL, CALENDLY_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t-2 border-gold/40 text-parchment-200/80">
      {/* Full-bleed castle backdrop — a static image section, the same treatment as the hero */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/castle-eilean-donan.webp')" }}
        aria-hidden
      />
      {/* Dark wash to keep the footer content legible over the image */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,28,0.88) 0%, rgba(8,12,28,0.80) 45%, rgba(8,12,28,0.95) 100%)",
        }}
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <Seal className="h-16 w-16" />
          <p className="mt-4 font-display text-3xl text-parchment-50">Baronage of Scotland Association</p>
          <p className="mt-3 max-w-md font-serif text-lg italic text-parchment-200/70">{site.tagline}</p>
          <GoldRule className="mt-6" />
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="eyebrow eyebrow--light">Contact</h3>
            <address className="mt-4 not-italic leading-relaxed">
              {site.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-4 flex flex-col items-start gap-3">
              <a href={`mailto:${site.email}`} className="text-gold transition-colors hover:text-gold-light">
                {site.email}
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-light"
              >
                Request a Call Back
                <ExternalArrow className="h-3 w-3" />
              </a>
            </div>
          </div>

          <nav className="lg:col-span-2">
            <h3 className="eyebrow eyebrow--light">Explore</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navLinks.map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-gold">
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow eyebrow--light">The Roll</h3>
            <p className="mt-4 text-sm leading-relaxed text-parchment-200/70">
              The Roll is a separate, public register at roll.baronage.com — free, for life, to verify an entry. Opens
              in a new window.
            </p>
            <a
              href={ROLL_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Opens the Roll register (roll.baronage.com) in a new window"
              className="mt-4 inline-flex items-center gap-1.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-light"
            >
              Verify Title on the Roll
              <ExternalArrow className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-parchment-200/15 pt-6 text-center text-xs leading-relaxed tracking-wide text-parchment-200/55">
          <p className="mx-auto max-w-3xl">
            <span className="font-semibold text-parchment-200/75">Legal Status:</span> The Baronage of Scotland
            Association is a non-profit honourable body owned by the members, not a charity. A separate, independent
            charitable entity is being formed for donations from barons going to good causes in collaboration with other
            stakeholders.
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} {site.legalName} (baronage.com). ·{" "}
            <a
              href="https://roll.baronage.com/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-parchment-200/30 underline-offset-2 transition-colors hover:text-parchment-100"
            >
              Copyright &amp; Database Rights
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
