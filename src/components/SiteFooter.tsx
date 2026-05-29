import Link from "next/link";
import { Seal } from "./Seal";
import { GoldRule } from "./primitives";
import { navLinks, site, ROLL_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-parchment-200/80 texture-saltire">
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
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-gold transition-colors hover:text-gold-light"
            >
              {site.email}
            </a>
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
              An open, verified register of the Baronage of Scotland — free for life to verify an entry.
            </p>
            <a
              href={ROLL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-light"
            >
              Verify a title →
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-parchment-200/15 pt-6 text-center text-xs tracking-wide text-parchment-200/55">
          <p>
            © {new Date().getFullYear()} {site.legalName} (baronage.com). A non-profit honourable body owned by its
            members.
          </p>
        </div>
      </div>
    </footer>
  );
}
