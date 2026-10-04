/**
 * The body of a Reading Room paper: the generated text at reading measure, the endnotes, and the
 * "Authority & sources" box. Shared by the server shell and by SealedPaper (subscriber papers).
 */
export function PaperBody({ html, footnotesHtml, sourcesHtml }: { html: string; footnotesHtml?: string; sourcesHtml?: string }) {
  return (
    <>
      <div
        className="prose-heritage paper-body mt-10 max-w-[68ch] text-[1.05rem] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {footnotesHtml && (
        <section aria-labelledby="notes" className="mt-12 max-w-[68ch] border-t border-parchment-300/70 pt-8">
          <h2 id="notes" className="font-display text-2xl text-navy">
            Notes
          </h2>
          <div
            className="paper-notes mt-4 text-sm leading-relaxed text-ink-soft"
            dangerouslySetInnerHTML={{ __html: footnotesHtml }}
          />
        </section>
      )}

      {sourcesHtml && (
        <aside
          aria-labelledby="authority-sources"
          className="mt-12 max-w-[68ch] border border-gold/40 bg-parchment-50 p-6 sm:p-8"
        >
          <div className="border-b border-parchment-300/70 pb-3">
            <h2
              id="authority-sources"
              className="font-inscribe text-[0.7rem] font-normal uppercase tracking-[0.22em] text-gold-deep"
            >
              Authority &amp; sources
            </h2>
          </div>
          <div
            className="paper-sources mt-4 space-y-3 font-serif text-[0.95rem] leading-relaxed text-ink-soft [&_strong]:text-navy"
            dangerouslySetInnerHTML={{ __html: sourcesHtml }}
          />
        </aside>
      )}
    </>
  );
}
