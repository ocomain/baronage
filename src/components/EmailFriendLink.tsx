import { SITE_URL } from "@/lib/site";

/**
 * "Email to a friend": opens the reader's own email with the paper's title and link filled in. The site
 * sends nothing and keeps no address. A plain link, so it works without JavaScript; the same size as the
 * print button, outlined so that printing stays the main action. Hidden on paper.
 */
export function EmailFriendLink({ title, slug, className = "" }: { title: string; slug: string; className?: string }) {
  const url = `${SITE_URL}/reading-room/${slug}/`;
  const subject = `${title} (Baronage of Scotland Association)`;
  const body = `I thought you would like to read this paper from the Reading Room of the Baronage of Scotland Association:\n\n${title}\n${url}\n`;
  const href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return (
    <a
      href={href}
      className={`inline-flex min-h-[3rem] cursor-pointer items-center gap-3 border-2 border-navy bg-parchment-50 px-5 py-2.5 font-sans text-[1.05rem] font-semibold text-navy transition-colors hover:border-oxblood hover:text-oxblood focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
      </svg>
      Email to a friend
    </a>
  );
}
