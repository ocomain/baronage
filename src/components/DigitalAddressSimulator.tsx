"use client";

import { useEffect, useState } from "react";

/**
 * A worked example for the Digital Address Guidelines, laid out as a real sign-up form.
 * The reader types into the form's own fields; the panel beside it shows how such a system
 * then builds a name, a greeting and a label from those fields. Presets fill the form with
 * the combinations the guidelines recommend for each kind of title field.
 */

type Holder = "baron" | "baroness";
type TitleMode = "dropdown" | "free" | "mrms";
type SigStyle = "short" | "formal" | "professional";
type Preset = { name: string; title: string; first: string; surname: string };

const labelCls = "font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep";
const fieldCls =
  "mt-1 w-full border border-navy/20 bg-white px-3 py-2 font-sans text-base text-ink shadow-[inset_0_1px_2px_rgba(8,12,28,0.06)] outline-none focus:border-gold";
const chipBase = "cursor-pointer border px-2.5 py-1 font-sans text-[0.72rem] tracking-wide transition-colors";
const chipOn = `${chipBase} border-gold bg-gold/15 text-navy`;
const chipOff = `${chipBase} border-parchment-300 bg-parchment-50 text-ink-soft hover:border-gold/60`;
const outBox = "border border-gold/40 bg-white px-5 py-4";

const DROPDOWN = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Baron", "Baroness", "Lady", "Lord", "Sir", "Prof"];
const MRMS = ["Mr", "Mrs", "Ms"];

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

function presetsFor(mode: TitleMode, holder: Holder, F: string, S: string, B: string): Preset[] {
  const R = holder === "baron" ? "Baron" : "Baroness";
  if (mode === "dropdown")
    return [
      { name: `${R} · of ${B}`, title: R, first: F, surname: `of ${B}` },
      { name: `${R} · ${S} of ${B}`, title: R, first: F, surname: `${S} of ${B}` },
      ...(holder === "baroness" ? [{ name: `Lady · ${B}`, title: "Lady", first: F, surname: B }] : []),
    ];
  if (mode === "free")
    return [
      { name: `${R} · of ${B}`, title: R, first: F, surname: `of ${B}` },
      { name: "The Much Honoured", title: "The Much Honoured", first: F, surname: `${S}, ${R} of ${B}` },
      { name: `The ${R} of ${B}`, title: `The ${R} of ${B}`, first: F, surname: S },
    ];
  return [
    { name: `Title in the surname`, title: holder === "baron" ? "Mr" : "Ms", first: F, surname: `The ${R} of ${B}` },
    { name: `Title across both names`, title: holder === "baron" ? "Mr" : "Ms", first: `The ${R} of`, surname: B },
  ];
}

export function DigitalAddressSimulator() {
  const [holder, setHolder] = useState<Holder>("baron");
  const [mode, setMode] = useState<TitleMode>("dropdown");
  const [first, setFirst] = useState("John");
  const [surname, setSurname] = useState("Smith");
  const [barony, setBarony] = useState("Inverness");
  const [pledged, setPledged] = useState(false);
  const [sig, setSig] = useState<SigStyle>("short");

  const F = first.trim() || "John";
  const S = surname.trim() || "Smith";
  const B = barony.trim() || "Inverness";
  const R = holder === "baron" ? "Baron" : "Baroness";

  // The mock form's own fields, which the reader can also edit directly.
  const presets = presetsFor(mode, holder, F, S, B);
  const [presetIdx, setPresetIdx] = useState(0);
  const [fTitle, setFTitle] = useState(presets[0].title);
  const [fFirst, setFFirst] = useState(presets[0].first);
  const [fSurname, setFSurname] = useState(presets[0].surname);
  const applyPreset = (i: number) => {
    const p = presetsFor(mode, holder, F, S, B)[i] ?? presetsFor(mode, holder, F, S, B)[0];
    setPresetIdx(i);
    setFTitle(p.title);
    setFFirst(p.first);
    setFSurname(p.surname);
  };
  // Re-apply the chosen preset whenever the names, holder or form type change.
  useEffect(() => {
    const list = presetsFor(mode, holder, F, S, B);
    const i = Math.min(presetIdx, list.length - 1);
    setPresetIdx(i);
    setFTitle(list[i].title);
    setFFirst(list[i].first);
    setFSurname(list[i].surname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, holder, F, S, B]);

  const displayOptions = [
    `The Much Hon ${R} of ${B}`,
    `The ${R} of ${B}`,
    `${F}, ${R} of ${B}`,
    `The ${R}`,
    ...(pledged ? [`${F} ${B}`] : []),
  ];
  const [fDisplay, setFDisplay] = useState(displayOptions[0]);
  useEffect(() => {
    if (!displayOptions.includes(fDisplay)) setFDisplay(displayOptions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [F, B, R, pledged]);

  // What a typical system builds from those fields.
  const join = (...xs: string[]) => xs.map((x) => x.trim()).filter(Boolean).join(" ");
  const profile = join(fTitle, fFirst, fSurname);
  const greeting = `Dear ${join(fTitle, fSurname)}`;
  const correct = holder === "baron" ? `Dear ${R} of ${B}` : `Dear Lady ${B}`;
  const greetingOk = greeting === correct || greeting === `Dear ${R} of ${B}` || greeting === `Dear Lady ${B}`;

  const email = {
    short: { from: `The ${R}`, user: "thebaron", signoff: "Kind regards,", lines: [`${F}, ${R} of ${B}`, `The Much Honoured ${R} of ${B}`] },
    formal: { from: `The ${R} of ${B}`, user: "thebaron", signoff: "Yours sincerely,", lines: [`${F} ${S}`, `The Much Honoured ${R} of ${B}`] },
    professional: { from: `${F} ${B}`, user: F.toLowerCase().replace(/[^a-z]/g, ""), signoff: "Kind regards,", lines: [`${F} ${B}`, `The ${R} of ${B}`] },
  }[sig];
  const addr = `${email.user}@${B.toLowerCase().replace(/[^a-z]/g, "")}.scot`;

  const titleList = mode === "dropdown" ? DROPDOWN : MRMS;

  return (
    <div className="mt-8 border border-parchment-300/70 bg-parchment-50 p-6 sm:p-8">
      <p className="font-inscribe text-[0.68rem] uppercase tracking-[0.22em] text-gold-deep">Worked example</p>
      <p className="mt-2 font-serif text-lg leading-relaxed text-ink">
        Type your own names, choose the kind of title field the system offers, and fill in the form as you would on a
        real site. The panel shows what that system will make of it.
      </p>

      {/* Your details and the system */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className={labelCls}>Your first name</span>
          <input className={fieldCls} value={first} onChange={(e) => setFirst(e.target.value)} />
        </label>
        <label className="block">
          <span className={labelCls}>Your family name</span>
          <input className={fieldCls} value={surname} onChange={(e) => setSurname(e.target.value)} />
        </label>
        <label className="block">
          <span className={labelCls}>Your barony</span>
          <input className={fieldCls} value={barony} onChange={(e) => setBarony(e.target.value)} />
        </label>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-[auto_1fr]">
        <div>
          <span className={labelCls}>You are</span>
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
          <span className={labelCls}>The system’s title field</span>
          <Chips
            ariaLabel="Title field type"
            value={mode}
            onPick={(m) => {
              setMode(m);
              setPresetIdx(0);
            }}
            options={[
              { label: "Drop-down that includes Baron / Baroness / Lady", value: "dropdown" },
              { label: "Free text", value: "free" },
              { label: "Only Mr / Mrs / Ms", value: "mrms" },
            ]}
          />
        </div>
      </div>
      <label className="mt-3 flex items-center gap-2 font-serif text-base text-ink">
        <input type="checkbox" checked={pledged} onChange={(e) => setPledged(e.target.checked)} className="accent-gold-deep" />
        The title is Pledged (hereditary), so it may replace the family name in daily use
      </label>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
        {/* The mock form */}
        <div className="border border-navy/15 bg-white shadow-[0_14px_34px_-24px_rgba(8,12,28,0.5)]">
          <div className="border-b border-parchment-300/70 px-5 py-3">
            <p className="font-sans text-sm font-semibold text-navy">Create your account</p>
            <p className="font-sans text-xs text-muted">Step 1 of 3 · Your details</p>
          </div>
          <div className="space-y-4 px-5 py-5">
            <div>
              <span className={labelCls}>Recommended entries</span>
              <Chips
                ariaLabel="Recommended entries"
                value={String(presetIdx)}
                onPick={(v) => applyPreset(Number(v))}
                options={presets.map((p, i) => ({ label: p.name, value: String(i) }))}
              />
            </div>
            <label className="block">
              <span className="font-sans text-xs font-medium text-ink-soft">Title</span>
              {mode === "free" ? (
                <input className={fieldCls} value={fTitle} onChange={(e) => setFTitle(e.target.value)} />
              ) : (
                <select className={fieldCls} value={fTitle} onChange={(e) => setFTitle(e.target.value)}>
                  {titleList.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              )}
            </label>
            <label className="block">
              <span className="font-sans text-xs font-medium text-ink-soft">First name</span>
              <input className={fieldCls} value={fFirst} onChange={(e) => setFFirst(e.target.value)} />
            </label>
            <label className="block">
              <span className="font-sans text-xs font-medium text-ink-soft">Surname</span>
              <input className={fieldCls} value={fSurname} onChange={(e) => setFSurname(e.target.value)} />
            </label>
            <label className="block">
              <span className="font-sans text-xs font-medium text-ink-soft">Display name (if the system has one)</span>
              <select className={fieldCls} value={fDisplay} onChange={(e) => setFDisplay(e.target.value)}>
                {displayOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <div className="pt-1">
              <span className="inline-block cursor-default border border-navy bg-navy px-4 py-2 font-sans text-sm font-semibold text-parchment-50">
                Continue
              </span>
            </div>
          </div>
        </div>

        {/* What the system makes of it */}
        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className={outBox}>
            <p className={labelCls}>Your name as the system shows it</p>
            <p className="mt-2 font-display text-2xl leading-snug text-navy sm:text-[1.7rem]" aria-live="polite">
              {profile}
            </p>
            <p className="mt-1 font-sans text-xs text-muted">Title + first name + surname, as most profiles and labels are built.</p>
          </div>
          <div className={outBox}>
            <p className={labelCls}>The greeting in its emails</p>
            <p className="mt-2 font-display text-2xl leading-snug text-navy" aria-live="polite">
              {greeting}
            </p>
            <p className={`mt-1.5 font-serif text-sm italic ${greetingOk ? "text-gold-deep" : "text-oxblood"}`}>
              {greetingOk
                ? "Correct."
                : mode === "mrms"
                  ? `Worst case: the system forces Mr or Ms, so the title travels in the name fields. Aim for “${correct}” wherever the form allows it.`
                  : `Aim for “${correct}”: try another recommended entry.`}
            </p>
            <p className="mt-1 font-sans text-xs text-muted">Title + surname, as automated emails usually greet you.</p>
          </div>
          <div className={outBox}>
            <p className={labelCls}>Display name, where shown</p>
            <p className="mt-2 font-display text-2xl leading-snug text-navy">{fDisplay}</p>
          </div>
          <p className="font-serif text-sm italic text-muted">
            Never “Mr {S}”, “{R} {S}” or “{R} {B}”. Salutation in letters: “{correct}”.
          </p>
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
              { label: "Short from-name", value: "short" },
              { label: "Formal", value: "formal" },
              { label: "Professional", value: "professional" },
            ]}
          />
        </div>
        <p className="mt-2 font-serif text-base leading-relaxed text-ink">
          {sig === "professional"
            ? `For working correspondence the title can be played down: “${F} ${B}” as the from-name, the title stated once in the signature. This form treats the barony as the family name, which the Roll recommends for Pledged titles.`
            : `Keep the from-name short and let the signature carry the full style. “The ${R}” as a from-name reads well in a crowded inbox; the signature beneath says who that is.`}
        </p>
        <div className="mt-4 border border-navy/15 bg-white shadow-[0_14px_34px_-24px_rgba(8,12,28,0.5)]">
          <div className="border-b border-parchment-300/70 px-5 py-3 font-sans text-sm text-ink-soft">
            <p>
              <span className="inline-block w-16 text-muted">From</span>
              <span className="text-navy">{email.from}</span> <span className="text-muted">&lt;{addr}&gt;</span>
            </p>
            <p>
              <span className="inline-block w-16 text-muted">To</span>Secretary
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
