import { Seal } from "./Seal";

/* Header lockup: the charter "free barony" seal (the logo) + the Association name. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Seal tone="ink" alt="Baronage of Scotland charter seal" className="h-12 w-11 sm:h-14 sm:w-12" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-medium tracking-tight text-navy sm:text-2xl">
          Baronage of Scotland
        </span>
        <span className="mt-1.5 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.34em] text-gold-deep">
          Association
        </span>
      </span>
    </span>
  );
}
