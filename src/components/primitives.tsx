import Link from "next/link";
import type { ReactNode } from "react";

/* ----------------------------- Container ----------------------------- */
export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "prose" | "wide";
}) {
  const max =
    size === "prose" ? "max-w-3xl" : size === "wide" ? "max-w-7xl" : "max-w-6xl";
  return <div className={`mx-auto w-full ${max} px-6 sm:px-8 ${className}`}>{children}</div>;
}

/* ----------------------------- Section ----------------------------- */
const tones = {
  parchment: "bg-parchment text-ink texture-parchment",
  cream: "bg-parchment-50 text-ink",
  navy: "bg-navy text-parchment-100 texture-saltire",
  navyDeep: "bg-navy-deep text-parchment-100 texture-saltire",
  oxblood: "bg-oxblood text-parchment-100",
} as const;

export function Section({
  children,
  className = "",
  tone = "parchment",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof tones;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}

/* ----------------------------- Eyebrow ----------------------------- */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow--light" : ""}`}>{children}</p>;
}

/* ----------------------------- GoldRule ----------------------------- */
export function GoldRule({ className = "", align = "center" }: { className?: string; align?: "center" | "start" }) {
  return (
    <div className={`gold-rule ${align === "start" ? "gold-rule--start" : ""} ${className}`} aria-hidden>
      <span className="gold-rule__gem" />
    </div>
  );
}

/* ------------------------- Section heading ------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "start";
  light?: boolean;
  className?: string;
}) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignment} max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-4 text-3xl sm:text-4xl md:text-[2.75rem] ${light ? "text-parchment-50" : "text-navy"}`}>
        {title}
      </h2>
      <GoldRule className="mt-6" align={align} />
      {intro && (
        <p className={`mt-6 text-lg leading-relaxed ${light ? "text-parchment-200/90" : "text-ink-soft"}`}>{intro}</p>
      )}
    </div>
  );
}

/* ----------------------------- Buttons ----------------------------- */
type ButtonVariant = "gold" | "outline" | "outlineLight" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  gold: "bg-gold text-navy-deep hover:bg-gold-light shadow-[0_10px_30px_-12px_rgba(201,162,75,0.7)]",
  outline: "border border-navy/30 text-navy hover:border-gold hover:text-gold-deep",
  outlineLight: "border border-gold/50 text-parchment-50 hover:border-gold hover:bg-gold/10",
  ghost: "text-gold-deep hover:text-oxblood",
};

export function ButtonLink({
  href,
  children,
  variant = "gold",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  const isInternal = href.startsWith("/");
  const isHttp = href.startsWith("http");
  const cls = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm px-8 py-4 font-sans text-[0.68rem] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${buttonStyles[variant]} ${className}`;
  if (isInternal) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}
