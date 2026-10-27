import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { HeaderBadge } from "../../components/HeaderBadge";
import { AnimatedCard } from "../../components/AnimatedCard";
import { CaptionBar, CaptionSegment } from "../../components/CaptionBar";
import { SceneBackground } from "../../components/SceneBackground";

const CAPTIONS: CaptionSegment[] = [
  {
    startFrame: 0,
    endFrame: 175,
    text: "At thirty cents and two miles of writing, each handwritten page costs less than zero-point-zero-zero-zero-one dollars in hardware...",
  },
  {
    startFrame: 175,
    endFrame: 370,
    text: "...an efficiency unmatched by any luxury fountain pen.",
  },
];

export const Scene11CostPerUse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Subtle downward tilt over manuscript stacks
  const zoom = interpolate(frame, [0, durationInFrames], [1.10, 1.20], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [10, -10], {
    extrapolateRight: "clamp",
  });

  // Animated CPU countdown
  const cpuValue = interpolate(frame, [0, 80], [0.05, 0.0001], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const savingsSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames - 3],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0.0, 0.2, 1) }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/bic/bic_scene11_in.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/bic-scene-11-cost-per-use.jpg"
        prevImage="images/bic-scene-10-billionaire-paradox.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Dynamic Animated CPU Pill (Top Right) */}
      <div
        style={{
          position: "absolute",
          top: 130,
          right: 64,
          padding: "16px 28px",
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          border: "2px solid #10b981",
          borderRadius: 20,
          backdropFilter: "blur(16px)",
          boxShadow: "0 15px 30px rgba(0,0,0,0.5), 0 0 25px rgba(16, 185, 129, 0.25)",
          opacity: savingsSpring * exitProgress,
          transform: `translateX(${(1 - savingsSpring) * 40 + (1 - exitProgress) * 30}px)`,
          textAlign: "right",
          zIndex: 45,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, color: "#6ee7b7", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Hardware Cost Per Page
        </div>
        <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
          ${cpuValue.toFixed(4)}
        </div>
        <div style={{ fontSize: 15, color: "#10b981", fontWeight: 700 }}>
          3,000 Meters per $0.30 Pen
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Micro-Economics"
        tagBg="rgba(6, 78, 59, 0.9)"
        tagColor="#6ee7b7"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.25)"
        title="Unrivaled Cost-Per-Use Equation"
        description="Fountain pen cleaning kits vs. zero maintenance • 100% ink evacuation to the last drop"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
