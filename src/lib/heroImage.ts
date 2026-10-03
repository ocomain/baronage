/** Screens up to this width are served the phone-sized twin of a hero or chapter image. */
export const PHONE_MEDIA = "(max-width: 640px)";

/** /images/x.webp → /images/x-960.webp. The twins are made by scripts/make-phone-images.py. */
export const phoneImage = (src: string) => src.replace(/\.webp$/, "-960.webp");

/**
 * For attributes that cannot be responsive (a video's poster): the file that suits this screen.
 * Client only; on the server it returns the full-size file.
 */
export const imageForScreen = (src: string) =>
  typeof window !== "undefined" && window.matchMedia(PHONE_MEDIA).matches ? phoneImage(src) : src;
