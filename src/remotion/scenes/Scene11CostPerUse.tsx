import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { HeaderBadge } from "../components/HeaderBadge";
import { ProgressBar } from "../components/ProgressBar";
import { AnimatedCard } from "../components/AnimatedCard";
import { CaptionBar, CaptionSegment } from "../components/CaptionBar";
import { SceneBackground } from "../components/SceneBackground";

const CAPTIONS: CaptionSegment[] = [
  {
    startFrame: 0,
    endFrame: 145,
    text: "At forty dollars and a fifteen-year lifespan, each cup costs less than three cents in hardware...",
  },
  {
    startFrame: 145,
    endFrame: 295,
    text: "...saving you thousands compared to disposable pods.",
  },
];

export const Scene11CostPerUse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.10, 1.20], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [10, -10], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/aeropress/aeropress_scene11_en.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/aeropress-scene-11-cost-per-use.jpg"
        prevImage="images/aeropress-scene-10-puck-ejection.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Dynamic Animated CPU Pill */}
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
          Hardware Cost Per Cup
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff", lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
          ${cpuValue.toFixed(2)}
        </div>
        <div style={{ fontSize: 15, color: "#10b981", fontWeight: 700 }}>
          Over 15-Year Expected Lifespan
        </div>
      </div>

      {/* Bottom Lower-Third Card with Entry & Exit Text Animation */}
      <AnimatedCard
        startFrame={12}
        exitLeadFrames={22}
        tagText="Economic Truth"
        tagBg="rgba(6, 78, 59, 0.9)"
        tagColor="#6ee7b7"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.2)"
        title="$0.03 Hardware Cost Per Use"
        description="At $40 for fifteen years of daily use, it saves thousands compared to disposable pods and café stops"
        bottom={110}
      />

      {/* Closed Captions below card */}
      <CaptionBar captions={CAPTIONS} bottom={38} />

      <ProgressBar color="#10b981" />
    </AbsoluteFill>
  );
};
