"use client";

import { useMemo, useState } from "react";

/**
 * A worked example for the Digital Address Guidelines: the reader describes the form they are
 * filling in, types their own names, and sees what to enter in each field and how the system
 * will then display it. The output panel stays in view beside the inputs on wide screens.
 */

type Holder = "baron" | "baroness";
type TitleField = "free" | "dropdown" | "mrms";
type SigStyle = "formal" | "short" | "pledged";

type Suggestion = { label: string; value: string };

const labelCls = "font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep";
const inputCls =
  "w-full border border-navy/20 bg-white/80 px-3 py-2 font-serif text-lg text-ink shadow-[inset_0_1px_2px_rgba(8,12,28,0.06)] outline-none focus:border-gold";
const chipBase = "cursor-pointer border px-2.5 py-1 font-sans text-[0.72rem] tracking-wide transition-colors";
const chipOn = `${chipBase} border-gold bg-gold/15 text-navy`;
const chipOff = `${chipBase} border-parchment-300 bg-parchment-50 text-ink-soft hover:border-gold/60`;
const outBox = "border border-gold/40 bg-white px-5 py-4";

function Chips<T extends string>({
  options,
  value,
  onPick,
  ariaLabel,
}: {
  options: { label: string; value: T }[];
  value: T;
  onPick: (v: T) => void;
  ariaLabel: string;
}) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-1.5" role="group" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.label}
          type="button"
          onClick={() => onPick(o.value)}
          className={o.value === value ? chipOn : chipOff}
          aria-pressed={o.value === value}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Field({
  label,
  hint,
  options,
  value,
  onPick,
}: {
  label: string;
  hint?: string;
  options: Suggestion[];
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className={labelCls}>{label}</span>
        {hint && <span className="font-serif text-sm italic text-muted">{hint}</span>}
      </div>
      <div className={`${inputCls} mt-1 min-h-[2.75rem]`} aria-live="polite">
        {value || <span className="text-muted">—</span>}
      </div>
      {options.length > 1 && <Chips options={options} value={value} onPick={onPick} ariaLabel={`Options for ${label}`} />}
    </div>
  );
}

export function DigitalAddressSimulator() {
  const [holder, setHolder] = useState<Holder>("baron");
  const [titleField, setTitleField] = useState<TitleField>("dropdown");
  const [first, setFirst] = useState("John");
  const [surname, setSurname] = useState("Smith");
  const [barony, setBarony] = useState("Inverness");
  const [pledged, setPledged] = useState(false);
  const [sig, setSig] = useState<SigStyle>("formal");

  const F = first.trim() || "John";
  const S = surname.trim() || "Smith";
  const B = barony.trim() || "Inverness";
  const rank = holder === "baron" ? "Baron" : "Baroness";
  const lady = holder === "baron" ? null : `Lady ${B}`;

  const titleOptions: Suggestion[] = useMemo(() => {
    if (titleField === "free")
      return [
        { label: "The Much Honoured", value: "The Much Honoured" },
        { label: `The ${rank} of ${B}`, value: `The ${rank} of ${B}` },
      ];
    if (titleField === "dropdown")
      return holder === "baron"
        ? [{ label: "Baron", value: "Baron" }]
        : [
            { label: "Baroness", value: "Baroness" },
            { label: "Lady", value: "Lady" },
          ];
    return holder === "baron" ? [{ label: "Mr", value: "Mr" }] : [{ label: "Ms", value: "Ms" }];
  }, [titleField, holder, rank, B]);
  const [titlePick, setTitlePick] = useState<string | null>(null);
  const title = titleOptions.some((o) => o.value === titlePick) ? (titlePick as string) : titleOptions[0].value;

  const firstOptions: Suggestion[] = useMemo(() => {
    if (titleField === "mrms")
      return [
        { label: F, value: F },
        { label: `The ${rank} of`, value: `The ${rank} of` },
      ];
    return [{ label: F, value: F }];
  }, [titleField, F, rank]);
  const [firstPick, setFirstPick] = useState<string | null>(null);
  const firstVal = firstOptions.some((o) => o.value === firstPick) ? (firstPick as string) : firstOptions[0].value;

  const surnameOptions: Suggestion[] = useMemo(() => {
    if (titleField === "dropdown")
      return [
        { label: `of ${B}`, value: `of ${B}` },
        { label: `${S} of ${B}`, value: `${S} of ${B}` },
      ];
    if (titleField === "mrms")
      return firstVal === `The ${rank} of`
        ? [{ label: B, value: B }]
        : [
            { label: `The ${rank} of ${B}`, value: `The ${rank} of ${B}` },
            ...(lady ? [{ label: `The ${lady}`, value: `The ${lady}` }] : []),
          ];
    if (title === `The ${rank} of ${B}`) return [{ label: S, value: S }];
    return [
      { label: `${S}, ${rank} of ${B}`, value: `${S}, ${rank} of ${B}` },
      { label: `${rank} of ${B}`, value: `${rank} of ${B}` },
      { label: `${S} The ${rank} of ${B}`, value: `${S} The ${rank} of ${B}` },
    ];
  }, [titleField, B, S, rank, lady, firstVal, title]);
  const [surnamePick, setSurnamePick] = useState<string | null>(null);
  const surnameVal = surnameOptions.some((o) => o.value === surnamePick)
    ? (surnamePick as string)
    : surnameOptions[0].value;

  const rendered = [title, firstVal, surnameVal].filter(Boolean).join(" ");
  const salutation = holder === "baron" ? `Dear ${rank} of ${B}` : `Dear Lady ${B}`;
  const displayOptions = [
    `The Much Hon ${rank} of ${B}`,
    `The ${rank} of ${B}`,
    `${F}, ${rank} of ${B}`,
    `The ${rank}`,
    ...(pledged ? [`${F} ${B}`] : []),
  ];

  // Email: the from-name is short; the signature carries the full style.
  const email = {
    formal: { from: `The ${rank} of ${B}`, signoff: "Yours sincerely,", lines: [`${F} ${S}`, `The Much Honoured ${rank} of ${B}`] },
    short: { from: `The ${rank}`, signoff: "Kind regards,", lines: [`${F}, ${rank} of ${B}`, `The Much Honoured ${rank} of ${B}`] },
    pledged: { from: `${F} ${B}`, signoff: "Kind regards,", lines: [`${F} ${B}`, `The Much Honoured ${rank} of ${B}`] },
  }[sig];
  const addr = `${F.toLowerCase()}@${B.toLowerCase().replace(/[^a-z]/g, "")}.scot`;

  return (
    <div className="mt-8 border border-parchment-300/70 bg-parchment-50 p-6 sm:p-8">
      <p className="font-inscribe text-[0.68rem] uppercase tracking-[0.22em] text-gold-deep">Worked example</p>
      <p className="mt-2 font-serif text-lg leading-relaxed text-ink">
        Describe the form you are filling in and type your own names. The fields show what to enter; the panel shows
        how the system will then display you.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* Inputs */}
        <div>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className={labelCls}>First name</span>
              <input className={`${inputCls} mt-1`} value={first} onChange={(e) => setFirst(e.target.value)} />
            </label>
            <label className="block">
              <span className={labelCls}>Family name</span>
              <input className={`${inputCls} mt-1`} value={surname} onChange={(e) => setSurname(e.target.value)} />
            </label>
            <label className="block">
              <span className={labelCls}>Barony</span>
              <input className={`${inputCls} mt-1`} value={barony} onChange={(e) => setBarony(e.target.value)} />
            </label>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[auto_1fr]">
            <div>
              <span className={labelCls}>Holder</span>
              <Chips
                ariaLabel="Holder"
                value={holder}
                onPick={setHolder}
                options={[
                  { label: "Baron", value: "baron" },
                  { label: "Baroness", value: "baroness" },
                ]}
              />
            </div>
            <div>
              <span className={labelCls}>The form’s title field</span>
              <Chips
                ariaLabel="Title field type"
                value={titleField}
                onPick={setTitleField}
                options={[
                  { label: "Drop-down with Baron / Baroness / Lady", value: "dropdown" },
                  { label: "Free text", value: "free" },
                  { label: "Only Mr / Ms", value: "mrms" },
                ]}
              />
            </div>
          </div>
          <label className="mt-4 flex items-center gap-2 font-serif text-base text-ink">
            <input type="checkbox" checked={pledged} onChange={(e) => setPledged(e.target.checked)} className="accent-gold-deep" />
            The title is Pledged (hereditary), so it may replace the family name in daily use
          </label>

          <div className="mt-6 border-t border-parchment-300/70 pt-5">
            <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-navy/70">What to enter</p>
            <div className="mt-4 grid gap-5 sm:grid-cols-3">
              <Field
                label="Title"
                hint={titleField === "dropdown" ? "select" : titleField === "mrms" ? "forced" : "type"}
                options={titleOptions}
                value={title}
                onPick={setTitlePick}
              />
              <Field label="First name" options={firstOptions} value={firstVal} onPick={setFirstPick} />
              <Field label="Surname" options={surnameOptions} value={surnameVal} onPick={setSurnamePick} />
            </div>
          </div>
        </div>

        {/* Output, kept in view */}
        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className={outBox}>
            <p className={labelCls}>How the system will display you</p>
            <p className="mt-2 font-display text-2xl leading-snug text-navy sm:text-[1.7rem]" aria-live="polite">
              {rendered}
            </p>
            {titleField === "mrms" && (
              <p className="mt-2 font-serif text-sm italic text-muted">
                Worst case: the system forces Mr or Ms, so the title is carried in the name fields.
              </p>
            )}
          </div>
          <div className={outBox}>
            <p className={labelCls}>Salutation</p>
            <p className="mt-2 font-display text-2xl leading-snug text-navy">{salutation}</p>
            <p className="mt-1.5 font-serif text-sm italic text-muted">
              Never “Mr {S}”, “{rank} {S}” or “{rank} {B}”.
            </p>
          </div>
          <div className={outBox}>
            <p className={labelCls}>Display or full name field</p>
            <ul className="mt-2 space-y-1 font-serif text-base text-ink">
              {displayOptions.map((o) => (
                <li key={o}>“{o}”</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Email signature */}
      <div className="mt-10 border-t border-parchment-300/70 pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-navy/70">Email signature</p>
          <Chips
            ariaLabel="Signature style"
            value={sig}
            onPick={setSig}
            options={[
              { label: "Formal", value: "formal" },
              { label: "Short from-name", value: "short" },
              ...(pledged ? [{ label: "Pledged, daily use", value: "pledged" as SigStyle }] : []),
            ]}
          />
        </div>
        <p className="mt-2 font-serif text-base leading-relaxed text-ink">
          Keep the from-name short and let the signature carry the full style. “The {rank}” as a from-name reads well
          in a crowded inbox; the signature beneath says who that is.
        </p>
        <div className="mt-4 border border-navy/15 bg-white shadow-[0_14px_34px_-24px_rgba(8,12,28,0.5)]">
          <div className="border-b border-parchment-300/70 px-5 py-3 font-sans text-sm text-ink-soft">
            <p>
              <span className="inline-block w-16 text-muted">From</span>
              <span className="text-navy">{email.from}</span> <span className="text-muted">&lt;{addr}&gt;</span>
            </p>
            <p>
              <span className="inline-block w-16 text-muted">To</span>The Secretary, Baronage of Scotland Association
            </p>
            <p>
              <span className="inline-block w-16 text-muted">Subject</span>The Roll
            </p>
          </div>
          <div className="px-5 py-5 font-serif text-base leading-relaxed text-ink">
            <p>Dear Secretary,</p>
            <p className="mt-3 text-muted">…</p>
            <p className="mt-3">{email.signoff}</p>
            <div className="mt-5 border-l-2 border-gold/60 pl-4">
              {email.lines.map((l, i) => (
                <p key={l} className={i === 0 ? "font-semibold text-navy" : "text-ink-soft"}>
                  {l}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
