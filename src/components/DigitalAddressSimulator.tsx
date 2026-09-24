"use client";

import { useMemo, useState } from "react";

/**
 * A worked example for the Digital Address Guidelines: the reader describes the form they are
 * filling in, types their own names, and sees what to enter in each field and how the system
 * will then display it.
 */

type Holder = "baron" | "baroness";
type TitleField = "free" | "dropdown" | "mrms";

type Suggestion = { label: string; value: string };

const inputCls =
  "w-full border border-navy/20 bg-white/80 px-3 py-2 font-serif text-lg text-ink shadow-[inset_0_1px_2px_rgba(8,12,28,0.06)] outline-none focus:border-gold";
const chipBase =
  "cursor-pointer border px-2.5 py-1 font-sans text-[0.72rem] tracking-wide transition-colors";
const chipOn = `${chipBase} border-gold bg-gold/15 text-navy`;
const chipOff = `${chipBase} border-parchment-300 bg-parchment-50 text-ink-soft hover:border-gold/60`;

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
        <span className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">{label}</span>
        {hint && <span className="font-serif text-sm italic text-muted">{hint}</span>}
      </div>
      <div className={`${inputCls} mt-1 min-h-[2.75rem]`} aria-live="polite">
        {value || <span className="text-muted">—</span>}
      </div>
      {options.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={`Options for ${label}`}>
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
      )}
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

  const F = first.trim() || "John";
  const S = surname.trim() || "Smith";
  const B = barony.trim() || "Inverness";
  const rank = holder === "baron" ? "Baron" : "Baroness";
  const lady = holder === "baron" ? null : `Lady ${B}`;

  // Suggestions per field, depending on the kind of title field the system offers.
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
    if (titleField === "free" && title === `The ${rank} of ${B}`) return [{ label: F, value: F }];
    return [{ label: F, value: F }];
  }, [titleField, F, rank, B, title]);
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
    // free text title
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

  const displayOptions = [
    `The Much Hon ${rank} of ${B}`,
    `The ${rank} of ${B}`,
    `${F}, ${rank} of ${B}`,
    `The ${rank}`,
    ...(pledged ? [`${F} ${B}`] : []),
  ];
  const signatureOptions = [`${F} ${S}, ${rank} of ${B}`, `The ${rank} of ${B}`, `${F}, ${rank} of ${B}`, `The ${rank}`];
  const salutation = holder === "baron" ? `Dear ${rank} of ${B}` : `Dear Lady ${B}`;

  const radio = (checked: boolean) =>
    `${chipBase} ${checked ? "border-gold bg-gold/15 text-navy" : "border-parchment-300 bg-parchment-50 text-ink-soft hover:border-gold/60"}`;

  return (
    <div className="mt-8 border border-parchment-300/70 bg-parchment-50 p-6 sm:p-8">
      <p className="font-inscribe text-[0.68rem] uppercase tracking-[0.22em] text-gold-deep">Worked example</p>
      <p className="mt-2 font-serif text-lg leading-relaxed text-ink">
        Describe the form you are filling in and type your own names. The fields below show what to enter, and the
        line beneath them shows how the system will then display you.
      </p>

      {/* 1. Your details */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">First name</span>
          <input className={`${inputCls} mt-1`} value={first} onChange={(e) => setFirst(e.target.value)} />
        </label>
        <label className="block">
          <span className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">Family name</span>
          <input className={`${inputCls} mt-1`} value={surname} onChange={(e) => setSurname(e.target.value)} />
        </label>
        <label className="block">
          <span className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">Barony</span>
          <input className={`${inputCls} mt-1`} value={barony} onChange={(e) => setBarony(e.target.value)} />
        </label>
      </div>

      {/* 2. The system */}
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <span className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">Holder</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <button type="button" className={radio(holder === "baron")} onClick={() => setHolder("baron")} aria-pressed={holder === "baron"}>
              Baron
            </button>
            <button type="button" className={radio(holder === "baroness")} onClick={() => setHolder("baroness")} aria-pressed={holder === "baroness"}>
              Baroness
            </button>
          </div>
        </div>
        <div className="sm:col-span-2">
          <span className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">The form’s title field</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <button type="button" className={radio(titleField === "dropdown")} onClick={() => setTitleField("dropdown")} aria-pressed={titleField === "dropdown"}>
              Drop-down list with Baron / Baroness / Lady
            </button>
            <button type="button" className={radio(titleField === "free")} onClick={() => setTitleField("free")} aria-pressed={titleField === "free"}>
              Free text
            </button>
            <button type="button" className={radio(titleField === "mrms")} onClick={() => setTitleField("mrms")} aria-pressed={titleField === "mrms"}>
              Only Mr / Ms
            </button>
          </div>
        </div>
      </div>
      <label className="mt-4 flex items-center gap-2 font-serif text-base text-ink">
        <input type="checkbox" checked={pledged} onChange={(e) => setPledged(e.target.checked)} className="accent-gold-deep" />
        The title is Pledged (hereditary), so it may replace the family name in daily use
      </label>

      {/* 3. What to enter */}
      <div className="mt-8 border-t border-parchment-300/70 pt-6">
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

      {/* 4. Output */}
      <div className="mt-8 border border-gold/40 bg-white/70 px-5 py-4">
        <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">
          How the system will display you
        </p>
        <p className="mt-2 font-display text-2xl leading-snug text-navy sm:text-3xl" aria-live="polite">
          {rendered}
        </p>
        {titleField === "mrms" && (
          <p className="mt-2 font-serif text-base italic text-muted">
            Worst case: the system forces Mr or Ms, so the title is carried in the name fields and reads as above.
          </p>
        )}
      </div>

      {/* 5. Other fields */}
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <div>
          <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">Display or full name</p>
          <ul className="mt-2 space-y-1 font-serif text-base text-ink">
            {displayOptions.map((o) => (
              <li key={o}>“{o}”</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">Email signature</p>
          <ul className="mt-2 space-y-1 font-serif text-base text-ink">
            {signatureOptions.map((o) => (
              <li key={o}>“{o}”</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">Salutation</p>
          <p className="mt-2 font-serif text-base text-ink">“{salutation}”</p>
          <p className="mt-1 font-serif text-sm italic text-muted">
            Never “Mr {S}”, “{rank} {S}” or “{rank} {B}”.
          </p>
        </div>
      </div>
    </div>
  );
}
