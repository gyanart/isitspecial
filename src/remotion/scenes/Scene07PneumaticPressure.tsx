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
    endFrame: 140,
    text: "With a gentle press of your hand, trapped air compresses...",
  },
  {
    startFrame: 140,
    endFrame: 295,
    text: "...forcing water through the slurry under zero-point-seven-five bar of pressure in under sixty seconds.",
  },
];

export const Scene07PneumaticPressure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Subtle vertical dolly following the descending plunger
  const panY = interpolate(frame, [0, durationInFrames], [-20, 20], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/aeropress/aeropress_scene07_en.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/aeropress-scene-07-pneumatic-pressure.jpg"
        prevImage="images/aeropress-scene-06-sub-boiling.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Dynamic Animated Pressure HUD Gauge */}
      <div
        style={{
          position: "absolute",
          top: 130,
          right: 64,
          padding: "16px 28px",
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          border: "2px solid #eab308",
          borderRadius: 20,
          backdropFilter: "blur(16px)",
          boxShadow: "0 15px 30px rgba(0,0,0,0.5), 0 0 25px rgba(234, 179, 8, 0.25)",
          opacity: gaugeSpring * exitProgress,
          transform: `translateX(${(1 - gaugeSpring) * 40 + (1 - exitProgress) * 30}px)`,
          textAlign: "right",
          zIndex: 45,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, color: "#fde047", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Pneumatic Chamber
        </div>
        <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
          {pressureValue.toFixed(2)} Bar
        </div>
        <div style={{ fontSize: 15, color: "#facc15", fontWeight: 700 }}>
          ~10.9 PSI Pneumatic Cylinder
        </div>
      </div>

      {/* Bottom Lower-Third Card with Entry & Exit Text Animation */}
      <AnimatedCard
        startFrame={12}
        exitLeadFrames={22}
        tagText="Fluid Mechanics"
        tagBg="rgba(113, 63, 18, 0.9)"
        tagColor="#fef08a"
        tagBorder="#eab308"
        borderColor="#eab308"
        glowColor="rgba(234, 179, 8, 0.2)"
        title="Pneumatic Air Column"
        description="Gentle human hand pressure compresses the air column, forcing concentrate evenly in < 60 seconds"
        bottom={110}
      />

      {/* Closed Captions below card */}
      <CaptionBar captions={CAPTIONS} bottom={38} />

      <ProgressBar color="#eab308" />
    </AbsoluteFill>
  );
};
