import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafafa",
          color: "#0a0a0a",
          fontFamily: "monospace",
          padding: 64,
          border: "12px solid #0a0a0a",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, letterSpacing: 4, opacity: 0.6 }}>
          <span>// EJBARi.ME</span>
          <span>SYSTEM:HUMAN</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: -4, lineHeight: 0.9 }}>HAMED</div>
          <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: -4, lineHeight: 0.9, marginTop: -8 }}>EJBARI</div>
          <div style={{ marginTop: 24, fontSize: 18, color: "#6b7280", letterSpacing: 2 }}>HEALTH TEACHER — SYSTEM ENGINEER — ZAHEDAN</div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 12, letterSpacing: 2, color: "#9ca3af" }}>
          <span>// HEALTH TEACHER</span>
          <span>// TECH NERD</span>
          <span>// SYSTEM:HUMAN</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
