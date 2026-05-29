import { Crest } from "./Crest";

type WordmarkProps = {
  /** "row" for header lockup, "stack" for hero/footer */
  layout?: "row" | "stack";
  className?: string;
  crestClassName?: string;
  /** size of the crest in px */
  crestSize?: number;
};

export function Wordmark({
  layout = "row",
  className = "",
  crestClassName = "text-gold",
  crestSize = 40,
}: WordmarkProps) {
  if (layout === "stack") {
    return (
      <span className={`flex flex-col items-center text-center ${className}`}>
        <Crest className={crestClassName} style={{ width: crestSize, height: (crestSize * 112) / 96 }} />
        <span className="mt-4 font-display text-2xl leading-none tracking-tight sm:text-3xl">
          The Baronage of Scotland
        </span>
        <span className="eyebrow mt-2 text-[0.6rem]">Association</span>
      </span>
    );
  }

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Crest className={crestClassName} style={{ width: crestSize, height: (crestSize * 112) / 96 }} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-tight sm:text-xl">The Baronage of Scotland</span>
        <span className="eyebrow mt-1 text-[0.55rem]">Association</span>
      </span>
    </span>
  );
}
