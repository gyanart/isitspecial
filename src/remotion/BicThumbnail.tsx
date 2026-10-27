import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

interface BicThumbnailProps {
  variant?: "how-is-this-legal" | "it-beat-600" | "moma-bought-this";
}

export const BicThumbnail: React.FC<BicThumbnailProps> = ({
  variant = "it-beat-600",
}) => {
  const hookText =
    variant === "how-is-this-legal"
      ? "HOW IS THIS LEGAL?"
      : variant === "moma-bought-this"
      ? "MOMA BOUGHT THIS?"
      : "IT BEAT $600.";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        overflow: "hidden",
        fontFamily: "Impact, Segoe UI Black, Montserrat, sans-serif",
      }}
    >
      {/* 1. Background Image with high contrast pop */}
      <AbsoluteFill>
        <Img
          src={staticFile("images/bic-scene-01-luxury-paradox.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(1.10) saturate(1.18) brightness(0.96)",
          }}
        />
      </AbsoluteFill>

      {/* 2. Cinematic Vignette & Bottom/Top Gradient */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.65) 0%, rgba(2,6,23,0.1) 40%, rgba(2,6,23,0.2) 60%, rgba(2,6,23,0.88) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 3. Left Side Price Tag: $600 (Over the Montblanc) */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 90,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 4,
          padding: "16px 28px",
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          border: "4px solid #ef4444",
          borderRadius: 22,
          boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 35px rgba(239, 68, 68, 0.4)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#fca5a5",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: "Segoe UI, Inter, sans-serif",
          }}
        >
          Status Quo
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            textShadow: "0 4px 10px rgba(0,0,0,0.8)",
          }}
        >
          $600
        </div>
      </div>

      {/* 4. Right Side Price Tag: $0.30 (Over the Bic Cristal) */}
      <div
        style={{
          position: "absolute",
          top: 90,
          right: 90,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
          padding: "16px 28px",
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          border: "4px solid #10b981",
          borderRadius: 22,
          boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 35px rgba(16, 185, 129, 0.45)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#6ee7b7",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: "Segoe UI, Inter, sans-serif",
          }}
        >
          Bic Cristal
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "#34d399",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            textShadow: "0 4px 10px rgba(0,0,0,0.8)",
          }}
        >
          $0.30
        </div>
      </div>

      {/* 5. Central Viral Hook Sticker (Large, Bold, High-CTR) */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "18px 48px",
          backgroundColor: "#facc15", // Electric YouTube yellow
          borderRadius: 24,
          boxShadow:
            "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(250, 204, 21, 0.4), inset 0 2px 4px rgba(255,255,255,0.6)",
          border: "5px solid #000000",
        }}
      >
        <span
          style={{
            fontSize: 78,
            fontWeight: 900,
            color: "#000000",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          {hookText}
        </span>
      </div>

      {/* 6. Brand Quality Pill (Top Center) */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 20px",
          backgroundColor: "rgba(6, 78, 59, 0.9)",
          border: "2px solid #10b981",
          borderRadius: 9999,
          boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#10b981",
            boxShadow: "0 0 10px #10b981",
          }}
        />
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "Segoe UI, Inter, sans-serif",
          }}
        >
          Is It Special?
        </span>
      </div>
    </AbsoluteFill>
  );
};
