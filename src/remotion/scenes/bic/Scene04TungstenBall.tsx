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
    endFrame: 185,
    text: "The secret to its reliability is at the very tip: a sphere made of tungsten carbide...",
  },
  {
    startFrame: 185,
    endFrame: 390,
    text: "...ground and polished to a tolerance of zero-point-one microns, tighter than the pistons in a Formula One engine.",
  },
];

export const Scene04TungstenBall: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Macro camera push-in to the microscopic sphere
  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -20], {
    extrapolateRight: "clamp",
  });

  // Animated tolerance countdown from 5.0µm to 0.10µm
  const toleranceVal = interpolate(frame, [0, 90], [5.0, 0.1], {
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
      <Audio src={staticFile("audio/bic/bic_scene04_in.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/bic-scene-04-tungsten-ball.jpg"
        prevImage="images/bic-scene-03-moma-gallery.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Micro-Tolerance HUD Badge (Top Right) */}
      <div
        style={{
          position: "absolute",
          top: 130,
          right: 64,
          padding: "16px 28px",
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          border: "2px solid #38bdf8",
          borderRadius: 20,
          backdropFilter: "blur(16px)",
          boxShadow: "0 15px 30px rgba(0,0,0,0.5), 0 0 25px rgba(56, 189, 248, 0.25)",
          opacity: hudSpring * exitProgress,
          transform: `translateX(${(1 - hudSpring) * 40 + (1 - exitProgress) * 30}px)`,
          textAlign: "right",
          zIndex: 45,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, color: "#7dd3fc", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Spherical Tolerance
        </div>
        <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
          ±{toleranceVal.toFixed(2)} µm
        </div>
        <div style={{ fontSize: 15, color: "#38bdf8", fontWeight: 700 }}>
          Tighter than Formula 1 Engine Pistons
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Micro-Metallurgy"
        tagBg="rgba(8, 47, 73, 0.9)"
        tagColor="#7dd3fc"
        tagBorder="#0284c7"
        borderColor="#0284c7"
        glowColor="rgba(2, 132, 199, 0.25)"
        title="Tungsten Carbide Spherical Core"
        description="Near-diamond hardness • Perfectly spherical rotation across textured paper fibers"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
