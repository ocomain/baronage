import { Seal } from "./Seal";

/* Header lockup: the charter "free barony" seal (the logo) + the Association name. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Seal tone="ink" alt="Baronage of Scotland charter seal" className="h-[50px] w-[46px]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[clamp(1.25rem,6vw,1.5rem)] font-medium text-navy sm:text-2xl">
          Baronage of Scotland
        </span>
        <span className="mt-1.5 flex items-baseline gap-2 whitespace-nowrap">
          <span className="font-sans text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold-deep">Association</span>
          <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-muted">Non-profit</span>
        </span>
      </span>
    </span>
  );
}
