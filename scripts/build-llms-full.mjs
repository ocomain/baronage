// Generates out/llms-full.txt — a plain-markdown mirror of the Scottish
// Baronies, Explained FAQ page, for LLM consumption.
//
// Runs as a postbuild step (see package.json) so it is always derived from
// the built HTML (out/scottish-baronies-explained/index.html) and can never
// drift from the live page's visible copy.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const SITE_URL = "https://www.baronage.com";
const SOURCE_PAGE = `${SITE_URL}/scottish-baronies-explained/`;
const OUT_DIR = path.join(process.cwd(), "out");
const SRC_HTML = path.join(OUT_DIR, "scottish-baronies-explained", "index.html");
const DEST_TXT = path.join(OUT_DIR, "llms-full.txt");

function fail(msg) {
  console.error(`[build-llms-full] ${msg}`);
  process.exit(1);
}

if (!existsSync(SRC_HTML)) {
  fail(`Source file not found: ${SRC_HTML} — run "next build" first.`);
}

const html = readFileSync(SRC_HTML, "utf8");

/** Decode a small set of HTML entities (numeric + the named ones this page
 * actually uses — smart quotes, dashes, ampersand, etc). */
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function resolveUrl(href) {
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("#")) return `${SOURCE_PAGE}${href}`;
  if (href.startsWith("/")) return `${SITE_URL}${href}`;
  return `${SOURCE_PAGE}${href}`;
}

/** Convert a fragment of inner HTML (no block-level tags) into plain
 * markdown: <em>/<i> -> *x*, <strong>/<b> -> **x**, <a> -> [x](url),
 * everything else stripped, entities decoded, whitespace collapsed. */
function inlineToMarkdown(fragment) {
  let s = fragment;

  // Strip React hydration comment markers (whitespace placeholders).
  s = s.replace(/<!--\s*-->/g, "");

  // Links — non-greedy, links in this content never nest.
  s = s.replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, inner) => {
    const text = inlineToMarkdown(inner);
    return `[${text}](${resolveUrl(decodeEntities(href))})`;
  });

  // Emphasis / strong.
  s = s.replace(/<(?:em|i)(?:\s[^>]*)?>([\s\S]*?)<\/(?:em|i)>/gi, (_, inner) => `*${inlineToMarkdown(inner).trim()}*`);
  s = s.replace(/<(?:strong|b)(?:\s[^>]*)?>([\s\S]*?)<\/(?:strong|b)>/gi, (_, inner) => `**${inlineToMarkdown(inner).trim()}**`);

  // Anything else (span, sup, button, etc) — drop tags, keep text.
  s = s.replace(/<[^>]+>/g, "");

  s = decodeEntities(s);
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

/** Pull out the top-level "paragraph" fragments from an answer body: <p>,
 * <blockquote>, <figcaption>, and the standalone linked-button div
 * (`<div class="mt-6">…</div>`, used for ButtonLink call-outs). Order is
 * preserved; nav/TOC/footer/scripts are outside this slice entirely. */
function extractParagraphs(bodyHtml) {
  const re =
    /<p[^>]*>([\s\S]*?)<\/p>|<blockquote[^>]*>([\s\S]*?)<\/blockquote>|<figcaption[^>]*>([\s\S]*?)<\/figcaption>|<div class="mt-6">([\s\S]*?)<\/div>/g;
  const paragraphs = [];
  let m;
  while ((m = re.exec(bodyHtml)) !== null) {
    const raw = m[1] ?? m[2] ?? m[3] ?? m[4] ?? "";
    const text = inlineToMarkdown(raw);
    if (text) paragraphs.push(text);
  }
  return paragraphs;
}

// --- dateModified, from the first FAQPage JSON-LD block --------------------
const ldMatch = html.match(/<script type="application\/ld\+json">(\{[\s\S]*?"@type":"FAQPage"[\s\S]*?\})<\/script>/);
if (!ldMatch) fail("Could not find FAQPage JSON-LD block.");
const dateModifiedMatch = ldMatch[1].match(/"dateModified":"([^"]+)"/);
if (!dateModifiedMatch) fail("Could not find dateModified in FAQPage JSON-LD.");
const dateModified = dateModifiedMatch[1];

// --- Each FAQ section --------------------------------------------------
const articleRe = /<article id="[^"]*"[^>]*>([\s\S]*?)<\/article>/g;
const sections = [];
let am;
while ((am = articleRe.exec(html)) !== null) {
  const articleHtml = am[1];

  const qMatch = articleHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
  if (!qMatch) continue;
  const question = inlineToMarkdown(qMatch[1]);

  const bodyMatch = articleHtml.match(
    /<div class="mt-5 leading-relaxed text-ink-soft">([\s\S]*?)<\/div><p class="mt-6">/
  );
  if (!bodyMatch) fail(`Could not find answer body for question: "${question}"`);
  const bodyParagraphs = extractParagraphs(bodyMatch[1]);

  const authorityMatch = articleHtml.match(/<p hidden="">Authority: ([\s\S]*?)<\/p>/);
  const authorityText = authorityMatch ? inlineToMarkdown(authorityMatch[1]) : "";

  sections.push({ question, bodyParagraphs, authorityText });
}

if (sections.length === 0) fail("No FAQ sections found — page structure may have changed.");

// --- Assemble the markdown file -----------------------------------------
const lines = [];
lines.push("# Scottish Baronies, Explained — Baronage of Scotland Association");
lines.push("");
lines.push(`> Source: ${SOURCE_PAGE} · Last modified: ${dateModified}`);
lines.push("");

for (const section of sections) {
  lines.push(`## ${section.question}`);
  lines.push("");
  for (const p of section.bodyParagraphs) {
    lines.push(p);
    lines.push("");
  }
  if (section.authorityText) {
    lines.push(`Authority: ${section.authorityText}`);
    lines.push("");
  }
}

const output = lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
writeFileSync(DEST_TXT, output, "utf8");
console.log(`[build-llms-full] Wrote ${DEST_TXT} (${sections.length} questions).`);
