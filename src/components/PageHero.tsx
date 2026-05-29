import { Crest } from "./Crest";
import { Container, GoldRule } from "./primitives";

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
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden />
      <Container className="py-20 text-center sm:py-24">
        <div className="rise flex justify-center">
          <Crest className="text-gold" style={{ width: 50, height: (50 * 112) / 96 }} />
        </div>
        <p className="rise eyebrow eyebrow--light mt-6" style={{ animationDelay: "0.06s" }}>
          {eyebrow}
        </p>
        <h1
          className="rise mx-auto mt-4 max-w-3xl text-balance text-4xl text-parchment-50 sm:text-5xl"
          style={{ animationDelay: "0.12s" }}
        >
          {title}
        </h1>
        <div className="rise mt-7" style={{ animationDelay: "0.18s" }}>
          <GoldRule />
        </div>
        {intro && (
          <p
            className="rise mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-parchment-200/85"
            style={{ animationDelay: "0.24s" }}
          >
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}
