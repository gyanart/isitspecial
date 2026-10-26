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
    endFrame: 110,
    text: "Nine-point-seven out of ten.",
  },
  {
    startFrame: 110,
    endFrame: 325,
    text: "The AeroPress isn't just an affordable coffee maker—it is an authentic aerodynamic masterpiece for every kitchen.",
  },
];

export const Scene12SpecialScoreVerdict: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slow pedestal rise into the beauty shot
  const zoom = interpolate(frame, [0, durationInFrames], [1.10, 1.20], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [15, -15], {
    extrapolateRight: "clamp",
  });

  // Animated score counter climbing from 0.0 to 9.7
  const scoreValue = interpolate(frame, [15, 80], [0.0, 9.7], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const scorecardSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 100,
    },
  });

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames - 3],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.3, 0.0, 0.2, 1),
    }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/aeropress/aeropress_scene12_en.mp3")} />

      {/* Cinematic Seamless Crossfade Background (Final scene fades out at the very end) */}
      <SceneBackground
        currentImage="images/aeropress-scene-12-verdict-masterpiece.jpg"
        prevImage="images/aeropress-scene-11-cost-per-use.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
        isLastScene={true}
      />

      <HeaderBadge />

      {/* Top Right Special Score Card with Entry & Exit Motion */}
      <div
        style={{
          position: "absolute",
          top: 130,
          right: 64,
          padding: "20px 32px",
          backgroundColor: "rgba(15, 23, 42, 0.94)",
          border: "2px solid #10b981",
          borderRadius: 24,
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 35px rgba(16, 185, 129, 0.35)",
          opacity: scorecardSpring * exitProgress,
          transform: `translateX(${(1 - scorecardSpring) * 45 + (1 - exitProgress) * 30}px) scale(${0.95 + scorecardSpring * 0.05})`,
          textAlign: "right",
          zIndex: 45,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, color: "#6ee7b7", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          The Special Score
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "flex-end", gap: 6, margin: "4px 0" }}>
          <span style={{ fontSize: 62, fontWeight: 900, color: "#ffffff", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            {scoreValue.toFixed(1)}
          </span>
          <span style={{ fontSize: 24, fontWeight: 700, color: "#94a3b8" }}>/ 10</span>
        </div>
        <div
          style={{
            display: "inline-block",
            padding: "4px 12px",
            backgroundColor: "rgba(6, 78, 59, 0.9)",
            border: "1px solid #10b981",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 800,
            color: "#34d399",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Industrial Masterpiece
        </div>
      </div>

      {/* Bottom Lower-Third Card with Entry & Exit Text Animation */}
      <AnimatedCard
        startFrame={12}
        exitLeadFrames={22}
        tagText="The Final Verdict"
        tagBg="rgba(6, 78, 59, 0.9)"
        tagColor="#6ee7b7"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.2)"
        title="A Modern Aerodynamic Icon"
        description="Not just an affordable coffee maker—an authentic feat of fluid dynamics for every kitchen"
        bottom={110}
      />

      {/* Closed Captions below card */}
      <CaptionBar captions={CAPTIONS} bottom={38} />

      <ProgressBar color="#10b981" />
    </AbsoluteFill>
  );
};
