import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "IPTV UK Subscription — Premium UK Streaming Service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #08090c 0%, #12141a 50%, #08090c 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glass card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 24,
            padding: "56px 80px",
            gap: 24,
            position: "relative",
          }}
        >
          {/* Live badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(232,57,42,0.15)",
              border: "1px solid rgba(232,57,42,0.4)",
              borderRadius: 100,
              padding: "6px 16px",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#E8392A",
              }}
            />
            <span style={{ color: "#E8392A", fontSize: 14, fontWeight: 600, letterSpacing: 2 }}>
              30,000+ CHANNELS · 100,000+ VODS
            </span>
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#F2F2F7",
              textAlign: "center",
              letterSpacing: "-1px",
              lineHeight: 1.05,
              textTransform: "uppercase",
            }}
          >
            IPTV UK
            <br />
            SUBSCRIPTION
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 22,
              color: "#B8B8C0",
              textAlign: "center",
              maxWidth: 600,
            }}
          >
            The UK&apos;s #1 Premium IPTV Service · Sky Sports · Premier League · 4K · from £9.99/mo
          </div>

          {/* Domain pill */}
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.20)",
              borderRadius: 100,
              padding: "10px 28px",
              marginTop: 8,
            }}
          >
            <span style={{ color: "#F2F2F7", fontSize: 18, fontWeight: 500 }}>
              iptvuksubscription.uk
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
