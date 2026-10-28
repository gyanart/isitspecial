import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

interface LodgeThumbnailProps {
  variant?: "it-beat-300" | "why-is-this-25" | "teflon-killer";
}

export const LodgeThumbnail: React.FC<LodgeThumbnailProps> = ({
  variant = "it-beat-300",
}) => {
  const hookText =
    variant === "why-is-this-25"
      ? "WHY IS THIS $25?"
      : variant === "teflon-killer"
      ? "THE TEFLON KILLER?"
      : "IT BEAT $300.";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        overflow: "hidden",
        fontFamily: "Impact, Segoe UI Black, Montserrat, sans-serif",
      }}
    >
      {/* 1. Background Image: High contrast macro searing scene */}
      <AbsoluteFill>
        <Img
          src={staticFile("images/lodge-scene-06-maillard-crust-sear.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(1.15) saturate(1.20) brightness(0.92)",
          }}
        />
      </AbsoluteFill>

      {/* 2. Cinematic Vignette & Bottom/Top Gradient */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.70) 0%, rgba(2,6,23,0.10) 40%, rgba(2,6,23,0.25) 60%, rgba(2,6,23,0.92) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 3. Left Side Status Quo Price Tag: $300 in Crimson */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 90,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(185, 28, 28, 0.95)",
            border: "3px solid #ef4444",
            padding: "8px 24px",
            borderRadius: 14,
            boxShadow: "0 10px 30px rgba(239, 68, 68, 0.5)",
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 2,
              fontFamily: "Segoe UI, Montserrat, sans-serif",
            }}
          >
            LUXURY TEFLON
          </span>
        </div>
        <div
          style={{
            fontSize: 100,
            color: "#ef4444",
            lineHeight: 1.0,
            marginTop: 10,
            textShadow:
              "0 4px 20px rgba(0,0,0,0.9), 0 0 30px rgba(239,68,68,0.6)",
          }}
        >
          $300
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#fca5a5",
            fontWeight: 700,
            letterSpacing: 1,
            marginTop: -6,
            fontFamily: "Segoe UI, sans-serif",
          }}
        >
          (Flakes in 3 Years)
        </div>
      </div>

      {/* 4. Right Side Lodge Skillet Price Tag: $25.00 in Glowing Emerald */}
      <div
        style={{
          position: "absolute",
          top: 90,
          right: 90,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(6, 78, 59, 0.95)",
            border: "3px solid #10b981",
            padding: "8px 24px",
            borderRadius: 14,
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.5)",
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 2,
              fontFamily: "Segoe UI, Montserrat, sans-serif",
            }}
          >
            LODGE CAST IRON
          </span>
        </div>
        <div
          style={{
            fontSize: 100,
            color: "#10b981",
            lineHeight: 1.0,
            marginTop: 10,
            textShadow:
              "0 4px 20px rgba(0,0,0,0.9), 0 0 30px rgba(16,185,129,0.7)",
          }}
        >
          $25.00
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#6ee7b7",
            fontWeight: 700,
            letterSpacing: 1,
            marginTop: -6,
            fontFamily: "Segoe UI, sans-serif",
          }}
        >
          (Lasts 100 Years)
        </div>
      </div>

      {/* 5. Center-Bottom Main Hook Sticker (High CTR Impact) */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            backgroundColor: "#facc15",
            padding: "16px 52px",
            borderRadius: 22,
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.9), 0 0 40px rgba(250, 204, 21, 0.6)",
            transform: "rotate(-1.5deg)",
            border: "5px solid #000000",
          }}
        >
          <span
            style={{
              fontSize: 88,
              color: "#000000",
              letterSpacing: 1,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            {hookText}
          </span>
        </div>
      </div>

      {/* 6. Brand Quality Header (Discrete & Authentic) */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 15,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            padding: "8px 24px",
            borderRadius: 9999,
            backdropFilter: "blur(12px)",
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
              color: "#ffffff",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 3,
              fontFamily: "Segoe UI, Montserrat, sans-serif",
            }}
          >
            IS IT SPECIAL? • THE SPECIAL INDEX™
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
