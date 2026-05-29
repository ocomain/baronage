import { Seal } from "./Seal";
import { Container } from "./primitives";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-parchment-50">
      <div className="absolute inset-0 -z-10 texture-saltire opacity-70" aria-hidden />
      <Seal
        className="pointer-events-none absolute -right-16 top-1/2 -z-10 hidden h-[26rem] w-[26rem] -translate-y-1/2 opacity-[0.07] md:block"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden />
      <Container className="py-24 sm:py-28">
        <div className="max-w-3xl">
          <p className="rise eyebrow eyebrow--light">{eyebrow}</p>
          <h1
            className="rise mt-5 font-display leading-[1.02] text-parchment-50"
            style={{ animationDelay: "0.08s", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {title}
          </h1>
          <div className="rise mt-7 h-px w-24 bg-gradient-to-r from-gold to-transparent" style={{ animationDelay: "0.14s" }} />
          {intro && (
            <p
              className="rise mt-7 max-w-2xl text-lg leading-relaxed text-parchment-200/85"
              style={{ animationDelay: "0.2s" }}
            >
              {intro}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
