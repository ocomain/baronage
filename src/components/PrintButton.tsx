"use client";

/**
 * Opens the browser's print dialog (which also offers "Save as PDF"). A large, plain,
 * high-contrast button: many readers of the papers are older. Hidden on paper.
 */
export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`inline-flex min-h-[3rem] cursor-pointer items-center gap-3 border-2 border-navy bg-navy px-5 py-2.5 font-sans text-[1.05rem] font-semibold text-parchment-50 transition-colors hover:border-oxblood hover:bg-oxblood focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9V3h12v6" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <path d="M6 14h12v7H6z" />
      </svg>
      Print this paper
    </button>
  );
}
