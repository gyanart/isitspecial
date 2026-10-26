import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

interface AnimatedCardProps {
  tagText: string;
  tagBg?: string;
  tagColor?: string;
  tagBorder?: string;
  title: string;
  description: string;
  borderColor?: string;
  glowColor?: string;
  startFrame?: number;
  exitLeadFrames?: number;
  width?: number | string;
  left?: number;
  bottom?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  tagText,
  tagBg = "rgba(6, 78, 59, 0.9)",
  tagColor = "#34d399",
  tagBorder = "#10b981",
  title,
  description,
  borderColor = "#10b981",
  glowColor = "rgba(16, 185, 129, 0.2)",
  startFrame = 10,
  exitLeadFrames = 22,
  width = 1020,
  left = 64,
  bottom = 110,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. Card Container Entrance Spring
  const cardSpring = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: {
      damping: 14,
      mass: 0.6,
      stiffness: 90,
    },
  });

  // 2. Staggered Text Entrance Springs
  // Tag entrance
  const tagSpring = spring({
    frame: Math.max(0, frame - (startFrame + 4)),
    fps,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 100,
    },
  });

  // Title entrance
  const titleSpring = spring({
    frame: Math.max(0, frame - (startFrame + 10)),
    fps,
    config: {
      damping: 13,
      mass: 0.6,
      stiffness: 95,
    },
  });

  // Description entrance
  const descSpring = spring({
    frame: Math.max(0, frame - (startFrame + 18)),
    fps,
    config: {
      damping: 14,
      mass: 0.6,
      stiffness: 90,
    },
  });

  // 3. Exit Animation (Triggers near scene end)
  const exitStart = durationInFrames - exitLeadFrames;
  const exitEnd = durationInFrames - 3;
  const exitProgress = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0.0, 0.2, 1),
  });

  const exitTranslateY = (1 - exitProgress) * 36;
  const exitBlur = (1 - exitProgress) * 6;

  // Combine entrance and exit
  const totalOpacity = cardSpring * exitProgress;
  const totalTranslateY = (1 - cardSpring) * 60 + exitTranslateY;
  const totalScale = 0.96 + cardSpring * 0.04;
  const totalBlur = Math.max((1 - cardSpring) * 8, exitBlur);

  if (totalOpacity <= 0.001) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left,
        width,
        padding: "24px 32px",
        backgroundColor: "rgba(15, 23, 42, 0.90)",
        border: `2px solid ${borderColor}`,
        borderRadius: 24,
        backdropFilter: "blur(18px)",
        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.65), 0 0 30px ${glowColor}`,
        opacity: totalOpacity,
        transform: `translateY(${totalTranslateY}px) scale(${totalScale})`,
        filter: totalBlur > 0.1 ? `blur(${totalBlur.toFixed(1)}px)` : "none",
        zIndex: 40,
        fontFamily: "Segoe UI, Inter, sans-serif",
      }}
    >
      {/* 1. Animated Tag Badge */}
      <div
        style={{
          display: "inline-block",
          padding: "5px 14px",
          backgroundColor: tagBg,
          border: `1px solid ${tagBorder}`,
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 800,
          color: tagColor,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 10,
          opacity: tagSpring,
          transform: `translateY(${(1 - tagSpring) * 16}px)`,
          filter: tagSpring < 0.95 ? `blur(${(1 - tagSpring) * 4}px)` : "none",
        }}
      >
        {tagText}
      </div>

      {/* 2. Animated Title Heading */}
      <h2
        style={{
          fontSize: 42,
          fontWeight: 800,
          color: "#ffffff",
          margin: "0 0 8px 0",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          opacity: titleSpring,
          transform: `translateY(${(1 - titleSpring) * 22}px)`,
          filter: titleSpring < 0.95 ? `blur(${(1 - titleSpring) * 6}px)` : "none",
        }}
      >
        {title}
      </h2>

      {/* 3. Animated Description Paragraph */}
      <p
        style={{
          fontSize: 25,
          color: "#cbd5e1",
          margin: 0,
          fontWeight: 400,
          lineHeight: 1.35,
          opacity: descSpring,
          transform: `translateY(${(1 - descSpring) * 18}px)`,
          filter: descSpring < 0.95 ? `blur(${(1 - descSpring) * 4}px)` : "none",
        }}
      >
        {description}
      </p>
    </div>
  );
};
