import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Container, GoldRule, Section } from "@/components/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Baronage of Scotland Association — Secretary, registered office in Edinburgh, and requests for a call back or meeting.",
};

const inputClass =
  "mt-2 w-full border border-parchment-300 bg-parchment-50 px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-gold focus:ring-1 focus:ring-gold/40";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact the Association"
        intro="For membership, the Roll, the Pledge, or the work of the baronage — the Secretary will be glad to hear from you."
      />

      <Section tone="parchment">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Details */}
            <Reveal>
              <div className="space-y-8">
                <div>
                  <h2 className="eyebrow">Secretary</h2>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-3 block font-display text-2xl text-navy transition-colors hover:text-oxblood"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <h2 className="eyebrow">Registered Office</h2>
                  <address className="mt-3 not-italic leading-relaxed text-ink-soft">
                    {site.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
                <div>
                  <h2 className="eyebrow">In Person</h2>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    Meeting rooms are available at our Edinburgh address on request.
                  </p>
                </div>
                <GoldRule align="start" />
              </div>
            </Reveal>

            {/* Form (Netlify Forms — active once deployed) */}
            <Reveal delay={0.1}>
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                action="/contact?sent=1"
                className="border border-parchment-300/70 bg-parchment-50 p-7 sm:p-9"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Do not fill this out: <input name="bot-field" />
                  </label>
                </p>

                <h2 className="font-display text-2xl text-navy">Send a message</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-ink">
                    Name
                    <input type="text" name="name" required autoComplete="name" className={inputClass} />
                  </label>
                  <label className="block text-sm font-medium text-ink">
                    Email
                    <input type="email" name="email" required autoComplete="email" className={inputClass} />
                  </label>
                </div>
                <label className="mt-5 block text-sm font-medium text-ink">
                  Subject
                  <input type="text" name="subject" className={inputClass} />
                </label>
                <label className="mt-5 block text-sm font-medium text-ink">
                  Message
                  <textarea name="message" rows={5} required className={inputClass} />
                </label>
                <button
                  type="submit"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-8 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-navy-deep transition-colors hover:bg-gold-light"
                >
                  Send to the Secretary
                </button>
                <p className="mt-4 text-xs text-muted">
                  Or email us directly at{" "}
                  <a href={`mailto:${site.email}`} className="text-oxblood underline">
                    {site.email}
                  </a>
                  .
                </p>
              </form>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
