import Link from "next/link";
import { excerpt, longDate, postPath, type NewsPost } from "@/lib/news";

/**
 * The list of posts on /news/ and on each category page: date on the left, then the category, the title and the
 * opening sentence. In Memoriam posts carry the life dates under the title. Server component.
 */
export function NewsList({ posts, showCategory = true }: { posts: NewsPost[]; showCategory?: boolean }) {
  if (!posts.length) {
    return <p className="py-16 text-center font-serif text-xl italic text-ink-soft">There is no news here yet.</p>;
  }
  return (
    <ol className="divide-y divide-parchment-300/80 border-y border-parchment-300/80">
      {posts.map((p) => (
        <li key={p.slug} className="grid gap-x-10 gap-y-2 py-8 sm:grid-cols-[9.5rem_1fr] sm:py-10">
          <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted sm:pt-2">
            <time dateTime={p.published}>{longDate(p.published)}</time>
          </p>
          <div className="min-w-0">
            {showCategory && (
              <p className="flex items-center gap-2.5 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-ink">
                {p.category === "In Memoriam" && <span aria-hidden className="inline-block h-px w-6 bg-ink" />}
                {p.category}
              </p>
            )}
            <h2 className="mt-2 font-display text-[1.75rem] leading-tight text-navy sm:text-3xl">
              <Link href={postPath(p)} className="transition-colors hover:text-oxblood">
                {p.title}
              </Link>
            </h2>
            {p.born && p.died && (
              <p className="mt-1.5 font-serif text-lg text-ink-soft">
                {longDate(p.born)} – {longDate(p.died)}
              </p>
            )}
            <p className="mt-3 max-w-[62ch] font-serif text-lg leading-relaxed text-ink">{excerpt(p.text)}</p>
            <p className="mt-3">
              <Link
                href={postPath(p)}
                className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-oxblood underline decoration-oxblood/40 underline-offset-4 hover:decoration-oxblood"
              >
                {p.category === "In Memoriam" ? "Read the notice" : "Read more"} <span aria-hidden>→</span>
              </Link>
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** The category tabs above the list: All, then each category that has a post. */
export function NewsCategoryTabs({ current, categories }: { current: string | null; categories: { name: string; slug: string }[] }) {
  const tab = (active: boolean) =>
    `inline-flex items-center border px-3.5 py-2 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
      active ? "border-navy bg-navy text-parchment-50" : "border-parchment-300 bg-parchment-50 text-navy hover:border-gold"
    }`;
  return (
    <nav aria-label="News categories" className="mb-8 flex flex-wrap gap-2">
      <Link href="/news/" className={tab(current === null)} aria-current={current === null ? "page" : undefined}>
        All news
      </Link>
      {categories.map((c) => (
        <Link key={c.slug} href={`/news/${c.slug}/`} className={tab(current === c.slug)} aria-current={current === c.slug ? "page" : undefined}>
          {c.name}
        </Link>
      ))}
    </nav>
  );
}
