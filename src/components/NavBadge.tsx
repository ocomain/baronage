import type { ReactNode } from "react";

/** Gold "New" pill beside a nav label — marks a recently added section. */
export function NavBadge({ children }: { children: ReactNode }) {
  return (
    <span
      aria-label="new section"
      className="ml-1.5 inline-block rounded-[2px] bg-gold px-1.5 py-[2px] align-middle font-sans text-[0.5rem] font-semibold uppercase leading-none tracking-[0.16em] text-navy-deep"
    >
      {children}
    </span>
  );
}
