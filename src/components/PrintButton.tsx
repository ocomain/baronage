"use client";

/** Opens the browser's print dialog (which also offers "Save as PDF"). Hidden on paper. */
export function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className} aria-label="Print this paper or save it as a PDF">
      Print
    </button>
  );
}
