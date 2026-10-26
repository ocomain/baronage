import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";
import { Container, Section } from "@/components/primitives";
import { categorySlug, eventLine, excerpt, lifeLine, longDate, newsPosts, paragraphs, postPath, sourceLink, titlesLine } from "@/lib/news";

// Static export: every post is prerendered from content/news/; anything else is a 404. With no posts at all, one
// placeholder address that renders the 404 page, as the export needs at least one.
export const dynamicParams = false;

export function generateStaticParams() {
  return newsPosts.length
    ? newsPosts.map((p) => ({ category: categorySlug(p.category), slug: p.slug }))
    : [{ category: "in-memoriam", slug: "none" }];
}

type Props = { params: Promise<{ category: string; slug: string }> };

const getPost = (category: string, slug: string) => newsPosts.find((p) => p.slug === slug && categorySlug(p.category) === category);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: excerpt(post.text, 155),
    path: postPath(post),
    image: { url: `${SITE_URL}/og/news/${post.slug}.png`, width: 1200, height: 630, alt: post.title },
  });
}

const LINK = "underline decoration-gold/60 underline-offset-4 transition-colors hover:text-oxblood";

/**
 * One News post. An In Memoriam notice (owner 2026-10-26, on the model of the Constantinian Order's notices): the title,
 * the life dates and the titles as on the Roll, the notice itself (100 to 150 words), then the family's notice and the
 * Roll entry, and the sources. A quiet ink rule in place of the site's gold under the heading.
 */
export default async function NewsPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) notFound();
  const memoriam = post.category === "In Memoriam";
  const paras = paragraphs(post.text);
  const sources = (post.source_urls ?? []).map(sourceLink);
  const url = `${SITE_URL}${postPath(post)}`;
  const organisation = { "@type": "Organization", name: "Baronage of Scotland Association", url: SITE_URL };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.published,
    author: organisation,
    publisher: organisation,
    articleSection: post.category,
    mainEntityOfPage: url,
    image: `${SITE_URL}/og/news/${post.slug}.png`,
    ...(memoriam && post.name
      ? {
          about: {
            "@type": "Person",
            name: post.name,
            ...(post.born ? { birthDate: post.born } : {}),
            ...(post.died ? { deathDate: post.died } : {}),
            ...(post.place ? { deathPlace: post.place } : {}),
            ...(post.roll_url ? { sameAs: post.roll_url } : {}),
            ...(post.photo ? { image: `${SITE_URL}${post.photo.src}` } : {}),
          },
        }
      : {}),
  };

  return (
    <Section tone="parchment" className="!py-12 sm:!py-16">
      <Container size="prose">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article className="max-w-[62ch]">
          <nav aria-label="Breadcrumb" className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-muted">
            <Link href="/news/" className="text-gold-deep underline decoration-gold/50 underline-offset-4 hover:text-oxblood">
              News
            </Link>
            <span aria-hidden> · </span>
            <Link href={`/news/${categorySlug(post.category)}/`} className="text-ink underline decoration-ink/30 underline-offset-4 hover:text-oxblood">
              {post.category}
            </Link>
          </nav>

          <header className={`mt-6 ${post.photo ? "flex flex-col gap-6 sm:flex-row-reverse sm:items-start sm:gap-9" : ""}`}>
            {post.photo && (
              <figure className="w-40 flex-none sm:w-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.photo.src}
                  alt={post.photo.alt}
                  width={post.photo.width}
                  height={post.photo.height}
                  className={`h-auto w-full border border-parchment-300 shadow-[0_18px_36px_-26px_rgba(10,16,36,0.6)] ${memoriam ? "grayscale-[15%]" : ""}`}
                />
                <figcaption className="mt-2 font-sans text-[0.62rem] leading-snug tracking-[0.04em] text-muted">
                  {post.photo.caption && <span className="block pb-1 font-serif text-[0.8rem] italic tracking-normal text-ink-soft">{post.photo.caption}</span>}
                  Photograph:{" "}
                  <a href={post.photo.source_url} target="_blank" rel="noopener noreferrer" className="underline decoration-muted/40 underline-offset-2 hover:text-oxblood">
                    {post.photo.credit}
                  </a>
                  {post.photo.licence && ", "}
                  {!post.photo.licence ? null : post.photo.licence_url ? (
                    <a href={post.photo.licence_url} target="_blank" rel="noopener noreferrer license" className="underline decoration-muted/40 underline-offset-2 hover:text-oxblood">
                      {post.photo.licence}
                    </a>
                  ) : (
                    post.photo.licence
                  )}
                </figcaption>
              </figure>
            )}
            <div className="min-w-0 flex-1">
            {/* owner 2026-10-26: "In Memoriam" small and in italics above the name, as on the News page */}
            {(() => {
              const m = post.title.match(/^(In Memoriam|Congratulations):\s*(.+)$/);
              return (
                <h1 className="font-display text-navy">
                  {m && (
                    <span className="block font-serif text-2xl italic text-ink-soft">
                      {m[1]}
                      <span className="sr-only">: </span>
                    </span>
                  )}
                  <span className="block text-4xl leading-[1.08] sm:text-5xl">{m ? m[2] : post.title}</span>
                </h1>
              );
            })()}
            {memoriam && post.died && (
              <p className="mt-4 font-display text-2xl text-ink-soft sm:text-[1.7rem]">
                {post.born ? (
                  <>
                    <time dateTime={post.born}>{longDate(post.born)}</time> – <time dateTime={post.died}>{longDate(post.died)}</time>
                  </>
                ) : (
                  <>
                    Died <time dateTime={post.died}>{longDate(post.died)}</time>
                  </>
                )}
              </p>
            )}
            {eventLine(post) && <p className="mt-4 font-display text-2xl text-ink-soft sm:text-[1.7rem]">{eventLine(post)}</p>}
            {(memoriam || post.kind) && titlesLine(post) ? (
              <p className="mt-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted">{titlesLine(post)}</p>
            ) : null}
            {/* the mourning rule: a double ink hairline where other pages have gold */}
            <div aria-hidden className={`mt-7 h-[5px] w-28 border-y ${memoriam ? "border-ink/70" : "border-gold"}`} />
            </div>
          </header>

          <div className="mt-8 space-y-5 font-serif text-[1.25rem] leading-relaxed text-ink">
            {paras.map((p, i) =>
              memoriam && i === paras.length - 1 && p.split(/\s+/).length <= 8 ? (
                <p key={i} className="pt-2 italic text-ink-soft">
                  {p}
                </p>
              ) : (
                <p key={i}>{p}</p>
              ),
            )}
          </div>

          {(post.family_notice_url || post.roll_url) && (
            <ul className="mt-10 space-y-3 border-l-4 border-gold bg-parchment-100 px-6 py-5 font-serif text-lg text-navy">
              {post.family_notice_url && (
                <li>
                  <a href={post.family_notice_url} target="_blank" rel="noopener noreferrer" className={LINK}>
                    {post.family_notice_label || (post.kind ? "The family’s announcement" : "The family’s notice")}
                  </a>{" "}
                  <span aria-hidden className="text-muted">↗</span>
                </li>
              )}
              {post.roll_url && (
                <li>
                  <a href={post.roll_url} className={LINK}>
                    On the Roll of Scottish Barons
                  </a>{" "}
                  <span aria-hidden className="text-muted">→</span>
                </li>
              )}
            </ul>
          )}

          {sources.length > 0 && (
            <p className="mt-8 font-serif text-base leading-relaxed text-ink-soft">
              <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted">Sources </span>
              {sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && "; "}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={LINK}>
                    {s.label}
                  </a>
                </span>
              ))}
              .
            </p>
          )}

          <p className="mt-10 border-t border-parchment-300/80 pt-5 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">
            <time dateTime={post.published}>{longDate(post.published)}</time> · Baronage of Scotland Association
          </p>
          <p className="mt-6">
            <Link href="/news/" className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-oxblood underline decoration-oxblood/40 underline-offset-4 hover:decoration-oxblood">
              <span aria-hidden>←</span> All news
            </Link>
          </p>
        </article>
      </Container>
    </Section>
  );
}
