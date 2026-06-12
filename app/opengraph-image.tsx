import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ayush Deuja — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0a0b10",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(129,140,248,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(79,70,229,0.12)",
            border: "1px solid rgba(129,140,248,0.3)",
            borderRadius: 999,
            padding: "8px 20px",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              color: "#818cf8",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            Full Stack Developer · Biratnagar, Nepal
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#ededf0",
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          Ayush Deuja
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 24,
            fontSize: 26,
            color: "#71717a",
            maxWidth: 760,
            lineHeight: 1.5,
          }}
        >
          Building scalable APIs, web and mobile applications with NestJS, Next.js, React Native and .NET.
        </div>

        {/* Tech pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 44,
            flexWrap: "wrap",
          }}
        >
          {["NestJS", "Next.js", "React Native", ".NET", "PostgreSQL"].map(
            (tech) => (
              <div
                key={tech}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "8px 18px",
                  color: "#a1a1aa",
                  fontSize: 18,
                }}
              >
                {tech}
              </div>
            )
          )}
        </div>

        {/* URL watermark */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            color: "#4f46e5",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          ayushdeuja.com.np
        </div>
      </div>
    ),
    size
  );
}
