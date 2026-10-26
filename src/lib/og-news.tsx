import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { OG_SIZE } from "@/lib/og-paper";
import { eventLine, lifeLine, titlesLine, type NewsPost } from "@/lib/news";

const asset = (...parts: string[]) => readFile(join(process.cwd(), ...parts));

/**
 * Link-preview card for a News post. An In Memoriam card is quiet: deep ink, the category, the name, the life dates and
 * the titles as on the Roll, the Association's seal in pale ink. A Congratulations card is the site's navy with gold:
 * the couple, or the child and his style, and the date. Other categories show their title.
 */
export async function renderNewsOgImage(post: NewsPost) {
  const [serif, sans, seal] = await Promise.all([
    asset("assets", "CormorantGaramond-SemiBold.ttf"),
    asset("assets", "Quicksand-Medium.ttf"),
    asset("public", "seal-light.png"),
  ]);
  const sealSrc = `data:image/png;base64,${seal.toString("base64")}`;
  // The notice's own photograph, when it has one, in place of the seal (owner: these will go on our socials).
  let photoSrc: string | null = null;
  if (post.photo) {
    const jpeg = await asset("public", post.photo.src.replace(/^\//, "").replace(/\.webp$/, ".jpg")).catch(() => null);
    if (jpeg) photoSrc = `data:image/jpeg;base64,${jpeg.toString("base64")}`;
  }
  const memoriam = post.category === "In Memoriam";
  const congrats = post.category === "Congratulations";
  const heading =
    memoriam
      ? post.title.replace(/^In Memoriam:\s*/, "")
      : congrats && post.kind === "marriage" && post.holder
        ? `${post.holder}${post.holder.includes(",") ? "," : ""} and ${post.spouse ?? ""}`.trim()
        : congrats && post.kind === "birth" && post.child
          ? `${post.child}${post.style ? `, ${post.style}` : ""}`
          : post.title;
  const dateLine = (memoriam && lifeLine(post)) || eventLine(post);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: congrats ? "#0a1024" : "#121212",
          backgroundImage: congrats
            ? "linear-gradient(155deg, #18264a 0%, #0f1832 45%, #0a1024 100%)"
            : "linear-gradient(160deg, #1d1d22 0%, #121214 55%, #0b0b0d 100%)",
          padding: 64,
          fontFamily: "Cormorant",
        }}
      >
        <div
          style={{
            display: "flex",
            height: congrats ? 3 : 1,
            backgroundColor: "rgba(230,207,147,0.45)",
            ...(congrats ? { backgroundImage: "linear-gradient(90deg, #936f24 0%, #c9a24b 45%, #e6cf93 100%)" } : {}),
          }}
        />
        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 40 }}>
            <div style={{ display: "flex", fontFamily: "Quicksand", fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: congrats ? "#e6cf93" : "#cfc6b4" }}>
              {post.category}
            </div>
            <div style={{ display: "flex", fontSize: heading.length > 48 ? 58 : heading.length > 34 ? 70 : 82, lineHeight: 1.05, color: "#f6f1e6", marginTop: 26, maxWidth: 800 }}>
              {heading}
            </div>
            {dateLine ? (
              <div style={{ display: "flex", fontSize: 36, color: congrats ? "#d9cdb2" : "#cfc6b4", marginTop: 22 }}>
                {dateLine}
              </div>
            ) : null}
            {(memoriam || congrats) && titlesLine(post) ? (
              <div style={{ display: "flex", fontFamily: "Quicksand", fontSize: 20, letterSpacing: 3, textTransform: "uppercase", color: "#9d9584", marginTop: 18 }}>
                {titlesLine(post)}
              </div>
            ) : null}
          </div>
          {photoSrc && post.photo ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoSrc}
                alt=""
                width={270}
                height={Math.round((270 * post.photo.height) / post.photo.width)}
                style={{ border: "1px solid rgba(207,198,180,0.35)", filter: "grayscale(15%)" }}
              />
              <div style={{ display: "flex", fontFamily: "Quicksand", fontSize: 13, color: "#8a8372", marginTop: 8 }}>
                {`Photograph: ${post.photo.credit}${post.photo.licence ? `, ${post.photo.licence}` : ""}`}
              </div>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={sealSrc} alt="" width={150} height={209} style={{ opacity: 0.55 }} />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(207,198,180,0.25)",
            paddingTop: 24,
            fontFamily: "Quicksand",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#9d9584",
          }}
        >
          <div style={{ display: "flex" }}>Baronage of Scotland Association</div>
          <div style={{ display: "flex" }}>www.baronage.com/news</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Cormorant", data: serif, style: "normal", weight: 400 },
        { name: "Quicksand", data: sans, style: "normal", weight: 500 },
      ],
    }
  );
}

/**
 * Link-preview card for the News page and its category pages (owner 2026-10-26: "meta sharing image needs fixing"):
 * navy and gold, the heading large, and the latest notices with their portraits, so a shared link shows the news itself.
 */
export async function renderNewsIndexOgImage(heading: string, eyebrow: string | null, posts: NewsPost[]) {
  const [serif, sans, seal] = await Promise.all([
    asset("assets", "CormorantGaramond-SemiBold.ttf"),
    asset("assets", "Quicksand-Medium.ttf"),
    asset("public", "seal-gold.png"),
  ]);
  const latest = posts.slice(0, 3);
  const photos = await Promise.all(
    latest.map(async (p) => {
      if (!p.photo) return null;
      const jpeg = await asset("public", p.photo.src.replace(/^\//, "").replace(/\.webp$/, ".jpg")).catch(() => null);
      return jpeg ? `data:image/jpeg;base64,${jpeg.toString("base64")}` : null;
    }),
  );
  const sealSrc = `data:image/png;base64,${seal.toString("base64")}`;
  const name = (p: NewsPost) => p.title.replace(/^(In Memoriam|Congratulations):\s*/, "");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a1024",
          backgroundImage: "linear-gradient(155deg, #18264a 0%, #0f1832 45%, #0a1024 100%)",
          padding: 64,
          fontFamily: "Cormorant",
        }}
      >
        <div style={{ display: "flex", height: 3, backgroundImage: "linear-gradient(90deg, #936f24 0%, #c9a24b 45%, #e6cf93 100%)" }} />
        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 32 }}>
            <div style={{ display: "flex", fontFamily: "Quicksand", fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#e6cf93" }}>
              {eyebrow ?? "Baronage of Scotland Association"}
            </div>
            <div style={{ display: "flex", fontSize: 120, lineHeight: 1, color: "#faf6ec", marginTop: 16 }}>{heading}</div>
            {latest.length ? (
              <div style={{ display: "flex", flexDirection: "column", marginTop: 22 }}>
                {latest.map((p) => (
                  <div key={p.slug} style={{ display: "flex", fontSize: 30, color: "#d9cdb2", marginTop: 6 }}>
                    {`${p.category === "In Memoriam" ? "In Memoriam" : p.category}: ${name(p)}`}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {photos.some(Boolean) ? (
            <div style={{ display: "flex" }}>
              {photos.filter((x): x is string => !!x).slice(0, 2).map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt="" width={170} height={212} style={{ objectFit: "cover", objectPosition: "top", marginLeft: 16, border: "1px solid rgba(230,207,147,0.45)" }} />
              ))}
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={sealSrc} alt="" width={150} height={209} />
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(201,162,75,0.35)", paddingTop: 24, fontFamily: "Quicksand", fontSize: 20, letterSpacing: 3, textTransform: "uppercase", color: "#b9ad93" }}>
          <div style={{ display: "flex" }}>Baronage of Scotland Association</div>
          <div style={{ display: "flex" }}>www.baronage.com/news</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Cormorant", data: serif, style: "normal", weight: 400 },
        { name: "Quicksand", data: sans, style: "normal", weight: 500 },
      ],
    }
  );
}
