/* The Association's primary logo (matches roll.baronage.com) + "Association" lockup. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-col gap-1 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Baronage of Scotland" className="h-7 w-auto sm:h-8" />
      <span className="pl-0.5 font-sans text-[0.56rem] font-semibold uppercase tracking-[0.34em] text-gold-deep">
        Association
      </span>
    </span>
  );
}
