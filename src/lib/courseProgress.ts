/**
 * The Baron's Course: which papers this reader has read, kept on this device only (localStorage). No account and
 * nothing sent anywhere. Storage can be missing or blocked (private windows, cleared site data), so every read and
 * write is guarded and the course simply starts unread.
 */
export const COURSE_STORE = "baronage.course.read";
export const COURSE_EVENT = "baronage-course-progress";

export function readProgress(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(COURSE_STORE) ?? "[]");
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Saves the list and tells open panels; where storage is blocked nothing is announced, so a panel keeps its own ticks. */
export function writeProgress(slugs: string[]) {
  try {
    localStorage.setItem(COURSE_STORE, JSON.stringify([...new Set(slugs)]));
    window.dispatchEvent(new Event(COURSE_EVENT));
  } catch {}
}

export function markRead(slug: string) {
  const read = readProgress();
  if (!read.includes(slug)) writeProgress([...read, slug]);
}
