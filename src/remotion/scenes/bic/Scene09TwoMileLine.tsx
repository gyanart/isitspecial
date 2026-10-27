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
    endFrame: 160,
    text: "Inside the clear polystyrene tube is enough viscous ink paste to draw an unbroken line three kilometers long...",
  },
  {
    startFrame: 160,
    endFrame: 350,
    text: "...nearly two full miles of continuous handwriting without a single skip.",
  },
];

export const Scene09TwoMileLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Aerial tracking shot across the parchment ribbon
  const zoom = interpolate(frame, [0, durationInFrames], [1.10, 1.20], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [20, -20], {
    extrapolateRight: "clamp",
  });

  // Animated odometer counting up to 3.00 km
  const kmValue = interpolate(frame, [0, 90], [0.0, 3.0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const hudSpring = spring({
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
      <Audio src={staticFile("audio/bic/bic_scene09_in.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/bic-scene-09-two-mile-line.jpg"
        prevImage="images/bic-scene-08-hexagonal-geometry.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* 3-Kilometer Odometer HUD (Top Right) */}
      <div
        style={{
          position: "absolute",
          top: 130,
          right: 64,
          padding: "16px 28px",
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          border: "2px solid #3b82f6",
          borderRadius: 20,
          backdropFilter: "blur(16px)",
          boxShadow: "0 15px 30px rgba(0,0,0,0.5), 0 0 25px rgba(59, 130, 246, 0.25)",
          opacity: hudSpring * exitProgress,
          transform: `translateX(${(1 - hudSpring) * 40 + (1 - exitProgress) * 30}px)`,
          textAlign: "right",
          zIndex: 45,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, color: "#93c5fd", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Unbroken Writing Distance
        </div>
        <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
          {kmValue.toFixed(2)} km
        </div>
        <div style={{ fontSize: 15, color: "#60a5fa", fontWeight: 700 }}>
          ~2.0 Miles of Continuous Ink
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Endurance Benchmark"
        tagBg="rgba(30, 58, 138, 0.9)"
        tagColor="#93c5fd"
        tagBorder="#3b82f6"
        borderColor="#3b82f6"
        glowColor="rgba(59, 130, 246, 0.25)"
        title="3 Kilometers on a Single Cartridge"
        description="High-density thixotropic paste ink • Zero blob formulation • 2 full miles of continuous script"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
