import Link from "next/link";
import { eventLine, excerpt, lifeLine, longDate, postPath, type NewsPost } from "@/lib/news";

/**
 * The News pages laid out like a magazine (owner 2026-10-26: "should look like a magazine this page with list of
 * news"): the newest post leads, large, with its photograph beside the headline; the rest follow as picture cards, three
 * across on a computer. A post's photograph carries its credit wherever it appears; a post without one gets a quiet tile
 * in its place (ink for In Memoriam, navy and gold for Congratulations). Server component.
 */
export function NewsList({ posts, showCategory = true }: { posts: NewsPost[]; showCategory?: boolean }) {
  if (!posts.length) {
    return <p className="py-16 text-center font-serif text-xl italic text-ink-soft">There are no announcements here yet.</p>;
  }
  // Every post an equal card, side by side (owner 2026-10-26: "make them smaller and display equally side by side
  // don't show black crop"): an upright photo frame, no lead story, no dark mount.
  return (
    <ol className="grid gap-x-10 gap-y-12 md:grid-cols-2">
      {posts.map((p) => (
        <Card key={p.slug} post={p} showCategory={showCategory} />
      ))}
    </ol>
  );
}

/** "In Memoriam: James, 16th Earl of Lindsay" -> ["In Memoriam", "James, 16th Earl of Lindsay"]; other titles whole. */
function splitTitle(p: NewsPost): [string | null, string] {
  const m = p.title.match(/^(In Memoriam|Congratulations):\s*(.+)$/);
  return m ? [m[1], m[2]] : [null, p.title];
}

function Kicker({ post, showCategory }: { post: NewsPost; showCategory: boolean }) {
  // The category is said once: when the title opens with it, it stands small in italics above the name instead.
  if (splitTitle(post)[0]) showCategory = false;
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

/**
 * The post's photograph in a frame of the given shape, or the category's tile; the credit sits under a photograph.
 * "cover" fills the frame (the upright lead frame suits a portrait); "mount" shows the whole photograph centred on a dark
 * mount, so a portrait in a landscape card is never cut off at the chin (owner 2026-10-26: "pic looks strange way it's
 * cut off").
 */
function Picture({ post, frame, sizes, fit = "cover" }: { post: NewsPost; frame: string; sizes: string; fit?: "cover" | "mount" }) {
  if (post.photo) {
    const memoriam = post.category === "In Memoriam";
    const mount = memoriam ? "bg-[linear-gradient(160deg,#1d1d22,#0b0b0d)]" : "bg-[linear-gradient(155deg,#18264a,#0a1024)]";
    return (
      <figure>
        <Link
          href={postPath(post)}
          tabIndex={-1}
          aria-hidden
          className={`block overflow-hidden border border-parchment-300 ${fit === "mount" ? `${mount} flex items-center justify-center p-3` : "bg-parchment-100"} ${frame}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.photo.src}
            alt=""
            width={post.photo.width}
            height={post.photo.height}
            sizes={sizes}
            loading="lazy"
            decoding="async"
            className={`transition-transform duration-500 hover:scale-[1.02] ${
              fit === "mount" ? "h-full w-auto max-w-full object-contain shadow-[0_10px_24px_-12px_rgba(0,0,0,0.7)]" : "h-full w-full object-cover object-top"
            } ${memoriam ? "grayscale-[15%]" : ""}`}
          />
        </Link>
        {post.photo.credit && (
          <figcaption className="mt-1.5 font-sans text-[0.58rem] leading-snug tracking-[0.03em] text-muted">
            {post.photo.credit}
            {post.photo.licence && `, ${post.photo.licence}`}
          </figcaption>
        )}
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

function Card({ post, showCategory }: { post: NewsPost; showCategory: boolean }) {
  // Two equal columns of notices (owner 2026-10-26). In each: the title, twice the old size ("main heading text twice
  // the size really large"), across the column; under it the portrait on the left and the text beside it.
  return (
    <li className="min-w-0">
      <Kicker post={post} showCategory={showCategory} />
      <h3 className="mt-3 font-display text-navy">
        <Link href={postPath(post)} className="transition-colors hover:text-oxblood">
          {/* owner 2026-10-26: "In Memoriam" smaller and in italics, so the name and title read on one line */}
          {splitTitle(post)[0] && (
            <span className="block font-serif text-xl italic text-ink-soft">
              {splitTitle(post)[0]}
              <span className="sr-only">: </span>
            </span>
          )}
          <span className="block text-[2.5rem] leading-[1.08]">{splitTitle(post)[1]}</span>
        </Link>
      </h3>
      <div className="mt-5 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-5">
        <Picture post={post} frame="aspect-[4/5]" sizes="(min-width: 768px) 20vw, 40vw" />
        <div className="min-w-0">
          {dateLine(post) && <p className="font-serif text-lg text-ink-soft">{dateLine(post)}</p>}
          <p className="mt-3 line-clamp-5 font-serif text-lg leading-relaxed text-ink">{excerpt(post.text, 220)}</p>
          <p className="mt-3">
            <Link
              href={postPath(post)}
              className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-oxblood underline decoration-oxblood/40 underline-offset-4 hover:decoration-oxblood"
            >
              {readLabel(post)} <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
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
    <nav aria-label="Announcement categories" className="mb-10 flex flex-wrap gap-2">
      <Link href="/news/" className={tab(current === null)} aria-current={current === null ? "page" : undefined}>
        All announcements
      </Link>
      {categories.map((c) => (
        <Link key={c.slug} href={`/news/${c.slug}/`} className={tab(current === c.slug)} aria-current={current === c.slug ? "page" : undefined}>
          {c.name}
        </Link>
      ))}
    </nav>
  );
}
