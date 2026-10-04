/*
 * Subscriber papers (components/SealedPaper). Kept in a plain module so that both the server shell
 * and the client component can read the values.
 */

/** Where the subscriber key is remembered once a subscriber's link has been opened on this device. */
export const KEY_STORE = "baronage-subscriber-key";

/** Class set on <html> before first paint when a key is at hand, so a subscriber never sees the sign-up box flash. */
export const UNSEALING = "unsealing";
