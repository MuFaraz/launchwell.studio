import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Read once at module load (build time), so the images are prerendered.
const [extraBold, medium, logoSvg] = await Promise.all([
  readFile(join(process.cwd(), "assets/PlusJakartaSans-800.ttf")),
  readFile(join(process.cwd(), "assets/PlusJakartaSans-500.ttf")),
  readFile(join(process.cwd(), "public/launchwell-logo-white.svg"), "utf8"),
]);
// Drop the embedded metadata block; the renderer only needs the shapes.
const logo = `data:image/svg+xml;base64,${Buffer.from(logoSvg.replace(/<metadata>[\s\S]*?<\/metadata>/, "")).toString("base64")}`;

// Shared Open Graph card: white logo on navy, one big line, one small line.
export function renderOg({ title, kicker }: { title: string; kicker: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B1020",
          color: "#FFFFFF",
          padding: "72px 80px",
          fontFamily: "Jakarta",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={342} height={80} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.035em", maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 32, fontSize: 28, fontWeight: 500, color: "#A8B2C6" }}>
            <div style={{ width: 40, height: 4, background: "#5E9EFF", marginRight: 18 }} />
            {kicker}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Jakarta", data: extraBold, weight: 800, style: "normal" },
        { name: "Jakarta", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
