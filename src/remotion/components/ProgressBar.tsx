import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

interface ProgressBarProps {
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  color = "#10b981",
  height = 8,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progressPercent = Math.min(100, Math.max(0, (frame / durationInFrames) * 100));

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: `${progressPercent}%`,
        height,
        backgroundColor: color,
        boxShadow: `0 0 16px ${color}, 0 0 4px ${color}`,
        zIndex: 60,
      }}
    />
  );
};
