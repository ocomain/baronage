import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { OG_SIZE } from "@/lib/og-paper";
import { longDate, type NewsPost } from "@/lib/news";

const asset = (...parts: string[]) => readFile(join(process.cwd(), ...parts));

/**
 * Link-preview card for a News post. An In Memoriam card is quiet: deep ink, the category, the name, the life dates and
 * the titles as on the Roll, the Association's seal in pale ink. Other categories show their title on the same ground.
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
  const heading = memoriam && post.name ? post.name : post.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#121212",
          backgroundImage: "linear-gradient(160deg, #1d1d22 0%, #121214 55%, #0b0b0d 100%)",
          padding: 64,
          fontFamily: "Cormorant",
        }}
      >
        <div style={{ display: "flex", height: 1, backgroundColor: "rgba(230,207,147,0.45)" }} />
        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 40 }}>
            <div style={{ display: "flex", fontFamily: "Quicksand", fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#cfc6b4" }}>
              {post.category}
            </div>
            <div style={{ display: "flex", fontSize: heading.length > 34 ? 70 : 82, lineHeight: 1.05, color: "#f6f1e6", marginTop: 26, maxWidth: 800 }}>
              {heading}
            </div>
            {memoriam && post.born && post.died ? (
              <div style={{ display: "flex", fontSize: 36, color: "#cfc6b4", marginTop: 22 }}>
                {`${longDate(post.born)} – ${longDate(post.died)}`}
              </div>
            ) : null}
            {memoriam && post.titles?.length ? (
              <div style={{ display: "flex", fontFamily: "Quicksand", fontSize: 20, letterSpacing: 3, textTransform: "uppercase", color: "#9d9584", marginTop: 18 }}>
                {post.titles.join(" · ")}
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
                {`Photograph: ${post.photo.credit}, ${post.photo.licence}`}
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
