import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Full-bleed square (iOS rounds the corners itself): white tile, orange U, dark arrow.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFFFFF" }}>
        <svg width="180" height="180" viewBox="0 0 120 120">
          <path d="M33 60 V74 a27 27 0 0 0 54 0 V60" fill="none" stroke="#FF7A3D" strokeWidth="11" strokeLinecap="round" />
          <path
            d="M60 82 V22 M45.5 36.5 L60 22 L74.5 36.5"
            fill="none"
            stroke="#0E0A16"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
