import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const HeaderBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Smooth entry animation for the brand pill
  const entrySpring = spring({
    frame,
    fps,
    config: {
      damping: 14,
      mass: 0.6,
      stiffness: 90,
    },
  });

  // Exit animation at the end of the scene
  const exitProgress = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames - 2],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 48,
        left: 64,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 24px",
        backgroundColor: "rgba(6, 78, 59, 0.88)",
        border: "2px solid #10b981",
        borderRadius: 9999,
        backdropFilter: "blur(14px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        zIndex: 50,
        opacity: entrySpring * exitProgress,
        transform: `translateY(${(1 - entrySpring) * -30 + (1 - exitProgress) * -20}px)`,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: "#10b981",
          boxShadow: "0 0 12px #10b981",
        }}
      />
      <span
        style={{
          fontSize: 22,
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
  );
};
