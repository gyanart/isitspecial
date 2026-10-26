import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

interface AnimatedStatBadgeProps {
  top?: number;
  right?: number;
  borderColor?: string;
  glowColor?: string;
  category: string;
  categoryColor?: string;
  primaryText: string;
  secondaryText: string;
  secondaryColor?: string;
  startFrame?: number;
  exitLeadFrames?: number;
  children?: React.ReactNode;
}

export const AnimatedStatBadge: React.FC<AnimatedStatBadgeProps> = ({
  top = 130,
  right = 64,
  borderColor = "#10b981",
  glowColor = "rgba(16, 185, 129, 0.25)",
  category,
  categoryColor = "#6ee7b7",
  primaryText,
  secondaryText,
  secondaryColor = "#ffffff",
  startFrame = 25,
  exitLeadFrames = 20,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entrance spring from the right
  const badgeSpring = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: {
      damping: 13,
      mass: 0.5,
      stiffness: 95,
    },
  });

  // Exit animation towards the end
  const exitStart = durationInFrames - exitLeadFrames;
  const exitEnd = durationInFrames - 3;
  const exitProgress = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0.0, 0.2, 1),
  });

  const totalOpacity = badgeSpring * exitProgress;
  const totalTranslateX = (1 - badgeSpring) * 45 + (1 - exitProgress) * 30;
  const totalBlur = Math.max((1 - badgeSpring) * 6, (1 - exitProgress) * 6);

  if (totalOpacity <= 0.001) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top,
        right,
        padding: "16px 28px",
        backgroundColor: "rgba(15, 23, 42, 0.92)",
        border: `2px solid ${borderColor}`,
        borderRadius: 20,
        backdropFilter: "blur(18px)",
        boxShadow: `0 15px 30px rgba(0,0,0,0.55), 0 0 25px ${glowColor}`,
        opacity: totalOpacity,
        transform: `translateX(${totalTranslateX}px)`,
        filter: totalBlur > 0.1 ? `blur(${totalBlur.toFixed(1)}px)` : "none",
        textAlign: "right",
        zIndex: 45,
        fontFamily: "Segoe UI, Inter, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 800,
          color: categoryColor,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {category}
      </div>
      <div
        style={{
          fontSize: 34,
          fontWeight: 900,
          color: "#ffffff",
          lineHeight: 1.15,
          margin: "2px 0",
        }}
      >
        {primaryText}
      </div>
      <div style={{ fontSize: 15, color: secondaryColor, fontWeight: 600 }}>
        {secondaryText}
      </div>
      {children}
    </div>
  );
};
