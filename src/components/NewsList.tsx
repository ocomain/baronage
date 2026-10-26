import Link from "next/link";
import { eventLine, excerpt, lifeLine, longDate, paragraphs, postPath, type NewsPost } from "@/lib/news";

/**
 * The News pages laid out like a magazine (owner 2026-10-26: "should look like a magazine this page with list of
 * news"): the newest post leads, large, with its photograph beside the headline; the rest follow as picture cards, three
 * across on a computer. A post's photograph carries its credit wherever it appears; a post without one gets a quiet tile
 * in its place (ink for In Memoriam, navy and gold for Congratulations). Server component.
 */
export function NewsList({ posts, showCategory = true }: { posts: NewsPost[]; showCategory?: boolean }) {
  if (!posts.length) {
    return <p className="py-16 text-center font-serif text-xl italic text-ink-soft">There is no news here yet.</p>;
  }
  const [lead, ...rest] = posts;
  return (
    <>
      <Lead post={lead} showCategory={showCategory} />
      {rest.length > 0 && (
        <ol className="mt-14 grid gap-x-8 gap-y-14 border-t border-parchment-300/80 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Card key={p.slug} post={p} showCategory={showCategory} />
          ))}
        </ol>
      )}
    </>
  );
}

function Kicker({ post, showCategory }: { post: NewsPost; showCategory: boolean }) {
  const rule = post.category === "In Memoriam" ? "bg-ink" : "bg-gold";
  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.2em]">
      {showCategory && (
        <>
          <span aria-hidden className={`inline-block h-px w-6 ${rule}`} />
          <span className="text-ink">{post.category}</span>
          <span aria-hidden className="text-muted">·</span>
        </>
      )}
      <time dateTime={post.published} className="text-muted">
        {longDate(post.published)}
      </time>
    </p>
  );
}

const dateLine = (p: NewsPost) => lifeLine(p) ?? eventLine(p);
const readLabel = (p: NewsPost) => (p.category === "In Memoriam" ? "Read the notice" : "Read more");

/** The post's photograph in a frame of the given shape, or the category's tile; the credit sits under a photograph. */
function Picture({ post, frame, sizes }: { post: NewsPost; frame: string; sizes: string }) {
  if (post.photo) {
    return (
      <figure>
        <Link href={postPath(post)} tabIndex={-1} aria-hidden className={`block overflow-hidden border border-parchment-300 bg-parchment-100 ${frame}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.photo.src}
            alt=""
            width={post.photo.width}
            height={post.photo.height}
            sizes={sizes}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02] ${
              post.category === "In Memoriam" ? "grayscale-[15%]" : ""
            }`}
          />
        </Link>
        <figcaption className="mt-1.5 font-sans text-[0.58rem] leading-snug tracking-[0.03em] text-muted">
          {post.photo.credit}, {post.photo.licence}
        </figcaption>
      </figure>
    );
  }
  const memoriam = post.category === "In Memoriam";
  return (
    <Link
      href={postPath(post)}
      tabIndex={-1}
      aria-hidden
      className={`flex flex-col items-center justify-center gap-4 ${frame} ${
        memoriam
          ? "bg-[linear-gradient(160deg,#1d1d22,#0b0b0d)] text-[#cfc6b4]"
          : "bg-[linear-gradient(155deg,#18264a,#0a1024)] text-gold-light"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/seal-light-sm.webp" alt="" width={184} height={257} className="h-20 w-auto opacity-60 sm:h-24" />
      <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.24em]">{post.category}</span>
    </Link>
  );
}

function Lead({ post, showCategory }: { post: NewsPost; showCategory: boolean }) {
  const paras = paragraphs(post.text);
  return (
    <article className="grid items-start gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
      <Picture post={post} frame="aspect-[4/5]" sizes="(min-width: 768px) 40vw, 100vw" />
      <div className="min-w-0 md:pt-2">
        <Kicker post={post} showCategory={showCategory} />
        <h2 className="mt-4 font-display text-[2.2rem] leading-[1.06] text-navy sm:text-5xl">
          <Link href={postPath(post)} className="transition-colors hover:text-oxblood">
            {post.title}
          </Link>
        </h2>
        {dateLine(post) && <p className="mt-3 font-display text-xl text-ink-soft sm:text-2xl">{dateLine(post)}</p>}
        <div className={`mt-5 h-[5px] w-24 border-y ${post.category === "In Memoriam" ? "border-ink/70" : "border-gold"}`} aria-hidden />
        <p className="mt-6 font-serif text-xl leading-relaxed text-ink">{paras[0]}</p>
        {paras[1] && <p className="mt-4 hidden font-serif text-xl leading-relaxed text-ink-soft md:block">{paras[1]}</p>}
        <p className="mt-6">
          <Link
            href={postPath(post)}
            className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-oxblood underline decoration-oxblood/40 underline-offset-4 hover:decoration-oxblood"
          >
            {readLabel(post)} <span aria-hidden>→</span>
          </Link>
        </p>
      </div>
    </article>
  );
}

function Card({ post, showCategory }: { post: NewsPost; showCategory: boolean }) {
  return (
    <li className="flex min-w-0 flex-col">
      <Picture post={post} frame="aspect-[4/3]" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
      <div className="mt-5">
        <Kicker post={post} showCategory={showCategory} />
        <h3 className="mt-3 font-display text-2xl leading-snug text-navy">
          <Link href={postPath(post)} className="transition-colors hover:text-oxblood">
            {post.title}
          </Link>
        </h3>
        {dateLine(post) && <p className="mt-1.5 font-serif text-lg text-ink-soft">{dateLine(post)}</p>}
        <p className="mt-3 line-clamp-3 font-serif text-lg leading-relaxed text-ink">{excerpt(post.text, 180)}</p>
        <p className="mt-3">
          <Link
            href={postPath(post)}
            className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-oxblood underline decoration-oxblood/40 underline-offset-4 hover:decoration-oxblood"
          >
            {readLabel(post)} <span aria-hidden>→</span>
          </Link>
        </p>
      </div>
    </li>
  );
}

/** The category tabs above the list: All, then each category that has a post. */
export function NewsCategoryTabs({ current, categories }: { current: string | null; categories: { name: string; slug: string }[] }) {
  const tab = (active: boolean) =>
    `inline-flex items-center border px-3.5 py-2 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
      active ? "border-navy bg-navy text-parchment-50" : "border-parchment-300 bg-parchment-50 text-navy hover:border-gold"
    }`;
  return (
    <nav aria-label="News categories" className="mb-10 flex flex-wrap gap-2">
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
