import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { COURSE_NAME, courseStandfirst, courseSteps, numberWord } from "@/lib/course";
import { OG_SIZE } from "@/lib/og-paper";

const asset = (...parts: string[]) => readFile(join(process.cwd(), ...parts));

/**
 * Link-preview card for The Baron's Course (owner 2026-10-23: "pls fix meta sharing image"): navy, as the site's
 * mastheads, with the course's wax seal closed in gold and the Association's seal in it. The count follows the
 * published papers, as on the page.
 */
export async function renderCourseOgImage() {
  const [serif, serifItalic, sans, seal] = await Promise.all([
    asset("assets", "CormorantGaramond-SemiBold.ttf"),
    asset("assets", "CormorantGaramond-Italic.ttf"),
    asset("assets", "Quicksand-Medium.ttf"),
    asset("public", "seal-gold.png"),
  ]);
  const sealSrc = `data:image/png;base64,${seal.toString("base64")}`;
  const count = numberWord(courseSteps.length);

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
        <div
          style={{
            display: "flex",
            height: 3,
            backgroundImage: "linear-gradient(90deg, #936f24 0%, #c9a24b 45%, #e6cf93 100%)",
          }}
        />

        <div style={{ display: "flex", flex: 1, alignItems: "center", paddingTop: 8, paddingBottom: 8 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 36 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Quicksand",
                fontSize: 20,
                letterSpacing: 3.5,
                textTransform: "uppercase",
                color: "#e6cf93",
              }}
            >
              {`The Reading Room · ${count} papers, in order`}
            </div>
            <div style={{ display: "flex", fontSize: 88, lineHeight: 1.02, color: "#faf6ec", marginTop: 26 }}>
              {COURSE_NAME}
            </div>
            <div style={{ display: "flex", width: 132, height: 2, backgroundColor: "#c9a24b", marginTop: 26 }} />
            <div
              style={{
                display: "flex",
                fontFamily: "Cormorant Italic",
                fontSize: 30,
                lineHeight: 1.32,
                color: "#d9cdb2",
                marginTop: 20,
                maxWidth: 720,
              }}
            >
              {courseStandfirst()}
            </div>
          </div>

          {/* the course's wax seal, closed: a gold ring round oxblood wax, the Association's seal in it */}
          <div style={{ display: "flex", position: "relative", width: 260, height: 260, alignItems: "center", justifyContent: "center" }}>
            <svg width="260" height="260" viewBox="0 0 100 100" style={{ position: "absolute", top: 0, left: 0 }}>
              <circle cx="50" cy="50" r="46" fill="none" stroke="#c9a24b" strokeWidth="5" />
              <circle cx="50" cy="50" r="40" fill="#6e1423" />
              <circle cx="50" cy="50" r="36" fill="none" stroke="#e6cf93" strokeOpacity="0.45" strokeWidth="0.6" />
            </svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sealSrc} alt="" width={102} height={142} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(201,162,75,0.35)",
            paddingTop: 24,
            fontFamily: "Quicksand",
            fontSize: 21,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#b9ad93",
          }}
        >
          <div style={{ display: "flex" }}>Baronage of Scotland Association</div>
          <div style={{ display: "flex" }}>www.baronage.com</div>
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
