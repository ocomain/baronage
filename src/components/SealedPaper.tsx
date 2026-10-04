"use client";

import { useEffect, useState } from "react";
import { EmailSignup } from "./EmailSignup";
import { PaperBody } from "./PaperBody";
import { PrintButton } from "./PrintButton";
import { KEY_STORE, UNSEALING } from "@/lib/subscriber";


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
 * A subscriber paper. The page itself carries only the opening and the sign-up; the full text is an
 * encrypted file (public/sealed/<slug>.json), so it is in no page a search engine or AI crawler can read.
 * The link in the subscriber's email ends in #key=…; opening it once unlocks every subscriber paper on
 * that device.
 */
export function SealedPaper({ slug, teaserHtml }: { slug: string; teaserHtml: string }) {
  const [full, setFull] = useState<FullPaper | null>(null);
  const [badLink, setBadLink] = useState(false);

  useEffect(() => {
    const fromLink = window.location.hash.match(/key=([A-Za-z0-9_-]+)/)?.[1];
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY_STORE);
    } catch {
      // Storage blocked (private window): the link still opens the paper for this visit.
    }
    // The key in the link is tried first; a key already remembered on this device is the fallback,
    // so a mistyped or out-of-date link never locks out a subscriber.
    const keys = [fromLink, stored].filter((k, i, all): k is string => !!k && all.indexOf(k) === i);
    let live = true;
    (async () => {
      for (const key of keys) {
        try {
          const paper = await unseal(slug, key);
          if (!live) return;
          try {
            localStorage.setItem(KEY_STORE, key);
          } catch {}
          if (fromLink) window.history.replaceState(null, "", window.location.pathname + window.location.search);
          setFull(paper);
          return;
        } catch {
          // Wrong key, or the sealed file did not load: try the next one.
        }
      }
      if (!live) return;
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
        <p className="no-print mt-12">
          <PrintButton />
        </p>
      </>
    );
  }

  return (
    <>
      <PaperBody html={teaserHtml} />
      <aside
        aria-labelledby="subscriber-paper"
        className="sealed-gate no-print mt-10 max-w-[68ch] border border-gold/40 bg-parchment-50 p-6 sm:p-8"
      >
        <p className="eyebrow">Subscriber paper</p>
        <h2 id="subscriber-paper" className="mt-3 font-display text-2xl leading-tight text-navy sm:text-3xl">
          The full paper is sent to subscribers
        </h2>
        <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
          {badLink ? "That link did not open the paper. Enter your email address below and we will send a fresh one. " : ""}
          Enter your email address to join the Association’s mailing list. The link in the confirmation email opens
          the full paper, and new papers and news will follow as they are published. You can unsubscribe at any time.
        </p>
        <EmailSignup
          variant="block"
          label="Your email address"
          sentMessage="Thank you. Please check your inbox: the link in our email opens the full paper."
          className="mt-6"
        />
      </aside>
    </>
  );
}
