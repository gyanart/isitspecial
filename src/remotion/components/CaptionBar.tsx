import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

export interface CaptionSegment {
  text: string;
  startFrame: number;
  endFrame: number;
}

interface CaptionBarProps {
  captions: CaptionSegment[];
  bottom?: number;
  left?: number;
  maxWidth?: number;
}

export const CaptionBar: React.FC<CaptionBarProps> = ({
  captions,
  bottom = 38,
  left = 64,
  maxWidth = 1200,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Find currently active caption segment
  const activeSegment = captions.find(
    (c) => frame >= c.startFrame && frame < c.endFrame
  );

  if (!activeSegment) {
    return null;
  }

  // Segment-relative entrance animation
  const segmentAge = frame - activeSegment.startFrame;
  const enterSpring = spring({
    frame: segmentAge,
    fps,
    config: {
      damping: 14,
      mass: 0.5,
      stiffness: 110,
    },
  });

  // Segment exit fade (last 8 frames of segment or scene end)
  const exitFrames = 8;
  const exitProgress = interpolate(
    frame,
    [activeSegment.endFrame - exitFrames, activeSegment.endFrame],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.3, 0.0, 0.2, 1),
    }
  );

  const opacity = enterSpring * exitProgress;
  const translateY = (1 - enterSpring) * 16 + (1 - exitProgress) * 10;

  if (opacity <= 0.01) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left,
        display: "flex",
        alignItems: "center",
        gap: 14,
        maxWidth,
        padding: "10px 22px",
        backgroundColor: "rgba(15, 23, 42, 0.94)",
        border: "1.5px solid rgba(255, 255, 255, 0.2)",
        borderRadius: 14,
        backdropFilter: "blur(18px)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(16, 185, 129, 0.15)",
        opacity,
        transform: `translateY(${translateY}px)`,
        zIndex: 55,
        fontFamily: "Segoe UI, Inter, sans-serif",
      }}
    >
      {/* CC Indicator Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#10b981",
          color: "#020617",
          fontSize: 13,
          fontWeight: 900,
          padding: "3px 9px",
          borderRadius: 6,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          boxShadow: "0 0 10px rgba(16, 185, 129, 0.4)",
          flexShrink: 0,
        }}
      >
        CC
      </div>

      {/* Synchronized Voiceover Caption Text */}
      <span
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: "#f8fafc",
          letterSpacing: "0.01em",
          lineHeight: 1.3,
          textShadow: "0 2px 4px rgba(0,0,0,0.6)",
        }}
      >
        "{activeSegment.text}"
      </span>
    </div>
  );
};
