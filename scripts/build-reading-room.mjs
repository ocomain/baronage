#!/usr/bin/env node
/**
 * Reading Room pipeline — converts content/reading-room/*.md (Markdown + YAML
 * front-matter) into src/generated/reading-room.ts, a typed array the routes
 * import at build time. Runs on `prebuild`/`predev` (see package.json).
 *
 *   node scripts/build-reading-room.mjs
 *
 * Per paper: [^n] footnotes become superscript links to an endnotes list,
 * headings get slugified ids, external links open in a new tab, tables are
 * wrapped for horizontal scrolling, and the trailing "### Authority & sources"
 * section is split out so the shell can render it in its own box.
 *
 * Subscriber papers: a paper marked `gated: true` keeps only its opening in
 * content/reading-room/. Its full text lives in content/reading-room-sealed/
 * (local only, never committed) and is published as public/sealed/<slug>.json,
 * encrypted with the subscriber key (key.txt in that local folder). The key
 * travels in the link subscribers are emailed: /reading-room/<slug>/#key=<key>.
 * A machine without the local folder (the deploy build) skips the sealing and
 * uses the committed sealed files.
 */
import { createCipheriv, createHash, randomBytes } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "content", "reading-room");
const OUT_FILE = path.join(ROOT, "src", "generated", "reading-room.ts");
const SEALED_DIR = path.join(ROOT, "content", "reading-room-sealed");
const SEALED_OUT = path.join(ROOT, "public", "sealed");

/** Editorial order of the index — only categories with papers are shown. */
const CATEGORIES = ["Heritage & Sources", "Words & Usage", "Robes & Insignia", "Law & Statutes", "The Lyon Court"];
const WPM = 230;

/* ------------------------------ helpers ------------------------------ */
const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const stripTags = (html) =>
  html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const slugify = (s) =>
  s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section";

function parseFrontMatter(raw, file) {
  const m = raw.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) throw new Error(`${file}: missing YAML front-matter`);
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.length >= 2 && ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))) {
      v = v.slice(1, -1).replace(/\\"/g, '"');
    }
    data[kv[1]] = v;
  }
  return { data, body: raw.slice(m[0].length) };
}

const isoDate = (v, field, file) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v || "")) throw new Error(`${file}: ${field} must be YYYY-MM-DD (got "${v}")`);
  return v;
};

/* ------------------------------ markdown ------------------------------ */
function makeMarked(ids) {
  const md = new Marked({ gfm: true, breaks: false });
  md.use({
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        let id = slugify(stripTags(html));
        let n = 1;
        while (ids.has(id)) id = `${slugify(stripTags(html))}-${++n}`;
        ids.add(id);
        return `<h${depth} id="${id}">${html}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//i.test(href);
        const attrs = [`href="${escapeAttr(href)}"`];
        // A link title of exactly "nofollow" is a flag, not a tooltip: the site declines to pass ranking to that page.
        const nofollow = title === "nofollow";
        if (title && !nofollow) attrs.push(`title="${escapeAttr(title)}"`);
        if (external) attrs.push('target="_blank"', `rel="${nofollow ? "nofollow " : ""}noopener noreferrer"`);
        return `<a ${attrs.join(" ")}>${text}</a>`;
      },
      table(token) {
        const cell = (c, tag) => {
          const align = c.align ? ` style="text-align:${c.align}"` : "";
          return `<${tag}${align}>${this.parser.parseInline(c.tokens)}</${tag}>`;
        };
        const head = `<tr>${token.header.map((c) => cell(c, "th")).join("")}</tr>`;
        const body = token.rows.map((r) => `<tr>${r.map((c) => cell(c, "td")).join("")}</tr>`).join("\n");
        return `<div class="table-wrap"><table><thead>${head}</thead><tbody>${body}</tbody></table></div>\n`;
      },
    },
  });
  return md;
}

/** Pull `[^n]: text` definitions (with indented continuation lines) out of the body. */
function extractFootnoteDefs(body) {
  const defs = new Map();
  const lines = body.split("\n");
  const kept = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\[\^([^\]\s]+)\]:\s*(.*)$/);
    if (!m) {
      kept.push(lines[i]);
      continue;
    }
    const parts = [m[2]];
    while (i + 1 < lines.length && /^(?: {2,}|\t)\S/.test(lines[i + 1])) parts.push(lines[++i].trim());
    defs.set(m[1], parts.join(" ").trim());
  }
  return { defs, body: kept.join("\n") };
}

/** Replace `[^n]` references with superscript anchors; returns labels in order of first use. */
function linkFootnoteRefs(body, defs, file) {
  const order = [];
  const seen = new Map();
  const out = body.replace(/\[\^([^\]\s]+)\]/g, (_, label) => {
    if (!defs.has(label)) throw new Error(`${file}: footnote [^${label}] has no definition`);
    if (!seen.has(label)) {
      seen.set(label, 0);
      order.push(label);
    }
    const count = seen.get(label) + 1;
    seen.set(label, count);
    const id = count === 1 ? `fnref-${label}` : `fnref-${label}-${count}`;
    return `<sup class="fnref" id="${id}"><a href="#fn-${label}" aria-label="Footnote ${label}">${label}</a></sup>`;
  });
  // Two markers with nothing between them ("[^5][^6]") would read as one number ("56"): mark the second,
  // and the stylesheet puts a comma before it.
  const spaced = out.replace(/<\/sup><sup class="fnref"/g, '</sup><sup class="fnref fnref--adj"');
  return { body: spaced, order };
}

/** Split the trailing "### Authority & sources" section (and any `---` rule before it) from the body. */
function splitSources(body) {
  const re = /^(?:-{3,}[ \t]*\r?\n\s*)?#{2,4}[ \t]+Authority\s*&\s*sources[ \t]*\r?\n/im;
  const m = body.match(re);
  if (!m) return { body, sources: "" };
  const start = m.index;
  const after = body.slice(start + m[0].length);
  const next = after.search(/^#{1,3}[ \t]+\S/m);
  const sources = next === -1 ? after : after.slice(0, next);
  const rest = next === -1 ? "" : after.slice(next);
  return { body: (body.slice(0, start) + rest).replace(/\s+$/, "") + "\n", sources: sources.trim() };
}

const countWords = (text) => (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu) || []).length;

/* ------------------------------ build ------------------------------ */
async function buildPaper(file, dir = CONTENT_DIR) {
  const raw = await readFile(path.join(dir, file), "utf8");
  const { data, body: fmBody } = parseFrontMatter(raw, file);

  for (const key of ["title", "subtitle", "slug", "meta_description", "category", "published"]) {
    if (!data[key]) throw new Error(`${file}: front-matter "${key}" is required`);
  }
  const slug = data.slug.replace(/^\/+|\/+$/g, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${file}: slug "${data.slug}" must be a bare kebab-case slug`);
  if (slug !== path.basename(file, ".md")) console.warn(`  ! ${file}: slug "${slug}" differs from the file name`);
  if (!CATEGORIES.includes(data.category)) {
    throw new Error(`${file}: category "${data.category}" is not one of: ${CATEGORIES.join(", ")}`);
  }
  const published = isoDate(data.published, "published", file);
  const reviewed = data.reviewed ? isoDate(data.reviewed, "reviewed", file) : published;
  if (data.emblem && !data.emblem.startsWith("/images/")) throw new Error(`${file}: emblem must be a path under /images`);

  // Drop a leading HTML comment (implementation notes) and a leading H1 that duplicates the title.
  let body = fmBody.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
  body = body.replace(/^\s*#[ \t]+[^\n]*\n+/, "");

  const fn = extractFootnoteDefs(body);
  const split = splitSources(fn.body);
  const refs = linkFootnoteRefs(split.body, fn.defs, file);
  for (const label of fn.defs.keys()) {
    if (!refs.order.includes(label)) console.warn(`  ! ${file}: footnote [^${label}] is defined but never referenced`);
  }

  const ids = new Set(["notes", "authority-sources"]);
  const md = makeMarked(ids);
  const html = md.parse(refs.body).trim();
  const sourcesHtml = split.sources ? md.parse(split.sources).trim() : "";
  const footnotesHtml = refs.order.length
    ? `<ol class="footnotes">\n${refs.order
        .map(
          (label) =>
            `<li id="fn-${label}">${md.parseInline(fn.defs.get(label))} <a href="#fnref-${label}" class="fnback" aria-label="Back to reference ${label}">↩</a></li>`
        )
        .join("\n")}\n</ol>`
    : "";

  const wordCount = countWords(stripTags(html));
  const readingTime = data.reading_time || `${Math.max(1, Math.round(wordCount / WPM))} min`;

  return {
    slug,
    title: data.title,
    subtitle: data.subtitle,
    description: data.meta_description,
    category: data.category,
    readingTime,
    published,
    reviewed,
    emblem: data.emblem || null,
    gated: data.gated === "true",
    html,
    sourcesHtml,
    footnotesHtml,
    wordCount,
  };
}

/** Encrypt the full text of each subscriber paper into public/sealed/ (only where the local folder exists). */
async function sealPapers(papers) {
  if (existsSync(SEALED_DIR)) {
    const keyFile = path.join(SEALED_DIR, "key.txt");
    if (!existsSync(keyFile)) await writeFile(keyFile, `${randomBytes(32).toString("base64url")}\n`, { mode: 0o600 });
    const key = Buffer.from((await readFile(keyFile, "utf8")).trim(), "base64url");
    if (key.length !== 32) throw new Error("content/reading-room-sealed/key.txt must hold a 32-byte base64url key");
    await mkdir(SEALED_OUT, { recursive: true });
    for (const file of (await readdir(SEALED_DIR)).filter((f) => f.endsWith(".md")).sort()) {
      const full = await buildPaper(file, SEALED_DIR);
      if (!papers.some((p) => p.slug === full.slug && p.gated)) {
        throw new Error(`reading-room-sealed/${file}: content/reading-room/${full.slug}.md must exist with "gated: true"`);
      }
      const plain = Buffer.from(JSON.stringify({ html: full.html, footnotesHtml: full.footnotesHtml, sourcesHtml: full.sourcesHtml }));
      // The IV is taken from the text itself, so an unchanged paper seals to the same bytes (no churn in git).
      const iv = createHash("sha256").update(plain).digest().subarray(0, 12);
      const cipher = createCipheriv("aes-256-gcm", key, iv);
      const data = Buffer.concat([cipher.update(plain), cipher.final(), cipher.getAuthTag()]);
      await writeFile(
        path.join(SEALED_OUT, `${full.slug}.json`),
        `${JSON.stringify({ iv: iv.toString("base64"), data: data.toString("base64") })}\n`
      );
      console.log(`  sealed ${full.slug}  ${full.wordCount} words`);
    }
  }
  for (const p of papers.filter((p) => p.gated)) {
    if (!existsSync(path.join(SEALED_OUT, `${p.slug}.json`))) {
      throw new Error(`${p.slug} is gated but public/sealed/${p.slug}.json is missing`);
    }
  }
}

async function main() {
  const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".md")).sort();
  const papers = [];
  for (const file of files) papers.push(await buildPaper(file));
  await sealPapers(papers);

  const slugs = new Set();
  for (const p of papers) {
    if (slugs.has(p.slug)) throw new Error(`duplicate slug "${p.slug}"`);
    slugs.add(p.slug);
  }
  papers.sort(
    (a, b) =>
      CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category) ||
      a.published.localeCompare(b.published) ||
      a.title.localeCompare(b.title)
  );

  const out = `// GENERATED by scripts/build-reading-room.mjs from content/reading-room/*.md — do not edit by hand.
// Regenerate with \`npm run build:reading-room\` (runs automatically on prebuild/predev).

export type ReadingRoomCategory = (typeof readingRoomCategories)[number];

export type ReadingRoomPaper = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: ReadingRoomCategory;
  readingTime: string;
  published: string;
  reviewed: string;
  emblem: string | null;
  /** Subscriber paper: \`html\` holds only the opening; the full text is in public/sealed/<slug>.json. */
  gated: boolean;
  html: string;
  sourcesHtml: string;
  footnotesHtml: string;
  wordCount: number;
};

/** Editorial order of the index. */
export const readingRoomCategories = ${JSON.stringify(CATEGORIES)} as const;

export const readingRoomPapers: ReadingRoomPaper[] = ${JSON.stringify(papers, null, 2)};
`;
  await mkdir(path.dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, out);
  console.log(`reading-room: ${papers.length} paper(s) → ${path.relative(ROOT, OUT_FILE)}`);
  for (const p of papers) console.log(`  ${p.slug}  [${p.category}]  ${p.wordCount} words · ${p.readingTime}`);
}

main().catch((err) => {
  console.error(`reading-room: ${err.message}`);
  process.exit(1);
});
