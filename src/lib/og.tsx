import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Read once at module load (build time), so the images are prerendered.
const [semibold, regular, logoSvg] = await Promise.all([
  readFile(join(process.cwd(), "assets/Inter-600.ttf")),
  readFile(join(process.cwd(), "assets/Inter-400.ttf")),
  readFile(join(process.cwd(), "public/launchwell-logo-white.svg"), "utf8"),
]);
const logo = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

// Shared Open Graph card: Dark Premium palette, logo, one big line, one small line.
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
          backgroundColor: "#0E0A16",
          backgroundImage:
            "radial-gradient(circle at 92% 0%, rgba(124,92,255,0.45), rgba(255,122,61,0.18) 35%, transparent 60%), radial-gradient(circle at 0% 100%, rgba(192,75,216,0.22), transparent 45%)",
          color: "#F4F1FA",
          padding: "72px 80px",
          fontFamily: "Inter",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={342} height={80} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 66, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.04em", maxWidth: 1020 }}>
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 34, fontSize: 28, fontWeight: 400, color: "#B8B0C8" }}>
            <div
              style={{
                width: 56,
                height: 4,
                borderRadius: 4,
                backgroundImage: "linear-gradient(100deg, #7C5CFF 0%, #C04BD8 45%, #FF7A3D 100%)",
                marginRight: 18,
              }}
            />
            {kicker}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: semibold, weight: 600, style: "normal" },
        { name: "Inter", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
