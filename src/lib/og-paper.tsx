import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReadingRoomPaper } from "@/generated/reading-room";

export const OG_SIZE = { width: 1200, height: 630 };

const asset = (...parts: string[]) => readFile(join(process.cwd(), ...parts));

/** Trim a standfirst to two lines, stopping at a clause boundary where there is one. */
function clamp(text: string, max = 132) {
  if (text.length <= max) return text;
  const head = text.slice(0, max);
  const clause = Math.max(head.lastIndexOf(";"), head.lastIndexOf(" — "), head.lastIndexOf(":"));
  const cut = clause > max * 0.3 ? head.slice(0, clause) : head.slice(0, head.lastIndexOf(" "));
  return `${cut}…`;
}

/** Link-preview card for a Reading Room paper, in the offprint idiom of the index thumbnails. */
export async function renderPaperOgImage(paper: ReadingRoomPaper) {
  const [serif, serifItalic, sans, seal] = await Promise.all([
    asset("assets", "CormorantGaramond-SemiBold.ttf"),
    asset("assets", "CormorantGaramond-Italic.ttf"),
    asset("assets", "Quicksand-Medium.ttf"),
    asset("public", "images", "seal-ink.png"),
  ]);
  const sealSrc = `data:image/png;base64,${seal.toString("base64")}`;
  const standfirst = clamp(paper.subtitle ?? "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#faf6ec",
          backgroundImage: "linear-gradient(160deg, #faf6ec 0%, #f3ecdd 62%, #e7dcc4 100%)",
          padding: 64,
          fontFamily: "Cormorant",
        }}
      >
        {/* Gold hairline, as on the site's image bands */}
        <div
          style={{
            display: "flex",
            height: 3,
            backgroundImage: "linear-gradient(90deg, #936f24 0%, #c9a24b 45%, #e6cf93 100%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingTop: 46 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sealSrc} alt="" width={62} height={62} style={{ opacity: 0.85 }} />
            <div
              style={{
                display: "flex",
                fontFamily: "Quicksand",
                fontSize: 25,
                letterSpacing: 4.5,
                textTransform: "uppercase",
                color: "#936f24",
                marginLeft: 24,
              }}
            >
              {`The Reading Room · ${paper.category}`}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: paper.title.length > 42 ? 76 : 84,
              lineHeight: 1.06,
              color: "#131e3a",
              marginTop: 40,
              maxWidth: 1000,
            }}
          >
            {paper.title}
          </div>

          <div style={{ display: "flex", width: 132, height: 2, backgroundColor: "#c9a24b", marginTop: 30 }} />

          {standfirst ? (
            <div
              style={{
                display: "flex",
                fontFamily: "Cormorant Italic",
                fontSize: 32,
                lineHeight: 1.34,
                color: "#463d2d",
                marginTop: 22,
                maxWidth: 980,
              }}
            >
              {standfirst}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #d8c8a6",
            paddingTop: 26,
            fontFamily: "Quicksand",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#6f6452",
          }}
        >
          <div style={{ display: "flex" }}>Baronage of Scotland Association</div>
          <div style={{ display: "flex" }}>{paper.readingTime} read</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Cormorant", data: serif, style: "normal", weight: 400 },
        { name: "Cormorant Italic", data: serifItalic, style: "normal", weight: 400 },
        { name: "Quicksand", data: sans, style: "normal", weight: 500 },
      ],
    }
  );
}
