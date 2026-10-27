import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

interface CasioThumbnailProps {
  variant?: "it-beat-10000" | "why-is-this-15" | "rolex-killer";
}

export const CasioThumbnail: React.FC<CasioThumbnailProps> = ({
  variant = "it-beat-10000",
}) => {
  const hookText =
    variant === "why-is-this-15"
      ? "WHY IS THIS $15?"
      : variant === "rolex-killer"
      ? "THE ROLEX KILLER?"
      : "IT BEAT $10,000.";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        overflow: "hidden",
        fontFamily: "Impact, Segoe UI Black, Montserrat, sans-serif",
      }}
    >
      {/* 1. Background Image: Crisp macro Casio scene */}
      <AbsoluteFill>
        <Img
          src={staticFile("images/casio-scene-13-verdict-masterpiece.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(1.12) saturate(1.15) brightness(0.95)",
          }}
        />
      </AbsoluteFill>

      {/* 2. Vignette & Contrast Overlay */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.65) 0%, rgba(2,6,23,0.05) 40%, rgba(2,6,23,0.2) 60%, rgba(2,6,23,0.90) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 3. Left Side Status Quo Price Tag: $10,000 in Crimson */}
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
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: "Segoe UI, Inter, sans-serif",
          }}
        >
          SWISS LUXURY
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "#ef4444",
            lineHeight: 1,
            letterSpacing: -1,
            textShadow: "0 4px 18px rgba(239,68,68,0.5)",
          }}
        >
          $10,000
        </div>
      </div>

      {/* 4. Right Side Product Price Tag: $15 in Emerald Green */}
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
          boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 35px rgba(16, 185, 129, 0.4)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#6ee7b7",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: "Segoe UI, Inter, sans-serif",
          }}
        >
          CASIO F-91W
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "#10b981",
            lineHeight: 1,
            letterSpacing: -1,
            textShadow: "0 4px 18px rgba(16,185,129,0.5)",
          }}
        >
          $15.00
        </div>
      </div>

      {/* 5. Center-Bottom Viral Hook Sticker in Electric Yellow */}
      <div
        style={{
          position: "absolute",
          bottom: 75,
          left: "50%",
          transform: "translateX(-50%) rotate(-1.5deg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "22px 64px",
          backgroundColor: "#facc15",
          border: "6px solid #000000",
          borderRadius: 28,
          boxShadow: "0 25px 60px rgba(0,0,0,0.95), 0 0 40px rgba(250, 204, 21, 0.6)",
        }}
      >
        <span
          style={{
            fontSize: 92,
            fontWeight: 900,
            color: "#000000",
            letterSpacing: 3,
            lineHeight: 1,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {hookText}
        </span>
      </div>

      {/* 6. Top Center Brand Pill: IS IT SPECIAL? */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 24px",
          backgroundColor: "rgba(15, 23, 42, 0.90)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 9999,
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#10b981",
            boxShadow: "0 0 10px #10b981",
          }}
        />
        <span
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: 2.5,
            textTransform: "uppercase",
            fontFamily: "Segoe UI, Inter, sans-serif",
          }}
        >
          IS IT SPECIAL? • THE SPECIAL INDEX™
        </span>
      </div>
    </AbsoluteFill>
  );
};
