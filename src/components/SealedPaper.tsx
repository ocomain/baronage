"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { EmailSignup } from "./EmailSignup";
import { PaperBody } from "./PaperBody";
import { PrintButton } from "./PrintButton";
import { KEY_STORE, NEW_KEY_STORE, UNSEALING } from "@/lib/subscriber";

type FullPaper = { html: string; footnotesHtml: string; sourcesHtml: string };

const bytes = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

async function unseal(slug: string, key: string): Promise<FullPaper> {
  const res = await fetch(`/sealed/${slug}.json`);
  if (!res.ok) throw new Error("sealed paper not found");
  const { iv, data } = (await res.json()) as { iv: string; data: string };
  const raw = bytes(key.replace(/-/g, "+").replace(/_/g, "/"));
  const cryptoKey = await crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["decrypt"]);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytes(iv) }, cryptoKey, bytes(data));
  return JSON.parse(new TextDecoder().decode(plain));
}

/**
 * The keys to try, newest first: one still in the address (only when storage is blocked — otherwise the
 * inline script in app/layout has already moved it into storage), one that arrived in a link and has not
 * opened a paper yet, and the one remembered on this device. A mistyped or out-of-date link therefore
 * never locks out a subscriber whose device already holds a good key.
 */
function readKeys() {
  const fromHash = window.location.hash.match(/key=([A-Za-z0-9_-]+)/)?.[1];
  let fresh: string | null = null;
  let stored: string | null = null;
  try {
    fresh = localStorage.getItem(NEW_KEY_STORE);
    stored = localStorage.getItem(KEY_STORE);
  } catch {
    // Storage blocked (private window): the link still opens the paper for this visit.
  }
  const keys = [fromHash, fresh, stored].filter((k, i, all): k is string => !!k && all.indexOf(k) === i);
  return { keys, fromLink: !!(fromHash || fresh) };
}

/**
 * A subscriber paper. The page itself carries only the public text and the sign-up; the full text is an
 * encrypted file (public/sealed/<slug>.json), so it is in no page a search engine or AI crawler can read.
 * The link a subscriber is given ends in #key=…; opening it once unlocks every subscriber paper on that
 * device.
 */
export function SealedPaper({
  slug,
  mode,
  html,
  footnotesHtml,
  sourcesHtml,
}: {
  slug: string;
  /** "full": only the opening is public. "part": the paper is public except for some passages. */
  mode: "full" | "part";
  html: string;
  footnotesHtml: string;
  sourcesHtml: string;
}) {
  const [full, setFull] = useState<FullPaper | null>(null);
  const [badLink, setBadLink] = useState(false);

  // Arriving from another page of the site: hold the sign-up box back before the first paint.
  useLayoutEffect(() => {
    if (readKeys().keys.length) document.documentElement.classList.add(UNSEALING);
  }, []);

  useEffect(() => {
    const { keys, fromLink } = readKeys();
    let live = true;
    (async () => {
      for (const key of keys) {
        try {
          const paper = await unseal(slug, key);
          if (!live) return;
          try {
            localStorage.setItem(KEY_STORE, key);
            localStorage.removeItem(NEW_KEY_STORE);
          } catch {}
          if (/key=/.test(window.location.hash)) {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
          }
          setFull(paper);
          return;
        } catch {
          // Wrong key, or the sealed file did not load: try the next one.
        }
      }
      if (!live) return;
      try {
        localStorage.removeItem(NEW_KEY_STORE);
      } catch {}
      if (fromLink) setBadLink(true);
      document.documentElement.classList.remove(UNSEALING);
    })();
    return () => {
      live = false;
    };
  }, [slug]);

  if (full) {
    return (
      <>
        <PaperBody html={full.html} footnotesHtml={full.footnotesHtml} sourcesHtml={full.sourcesHtml} />
        {mode === "full" && (
          <p className="no-print mt-12">
            <PrintButton />
          </p>
        )}
      </>
    );
  }

  return (
    <PaperBody html={html} footnotesHtml={footnotesHtml} sourcesHtml={sourcesHtml}>
      <aside
        aria-labelledby="subscriber-paper"
        className="sealed-gate no-print mt-10 max-w-[68ch] border border-gold/40 bg-parchment-50 p-6 sm:p-8"
      >
        <p className="eyebrow">{mode === "full" ? "Free subscriber paper" : "Free for subscribers"}</p>
        <h2 id="subscriber-paper" className="mt-3 font-display text-2xl leading-tight text-navy sm:text-3xl">
          {mode === "full" ? "Read this paper free" : "Read the rest of this paper free"}
        </h2>
        <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
          {badLink ? "That link did not open the paper. Enter your email address below and we will send a fresh one. " : ""}
          <strong className="font-semibold text-navy">There is no charge.</strong> Enter your email address to receive the
          Association’s free newsletter. Confirm from the email we send you, and the link that follows opens the full
          paper. You can unsubscribe at any time.
        </p>
        <EmailSignup
          variant="block"
          label="Your email address"
          buttonLabel="Read free"
          sentMessage="Please check your inbox and confirm: the link that follows opens the full paper."
          className="mt-6"
        />
      </aside>
    </PaperBody>
  );
}
