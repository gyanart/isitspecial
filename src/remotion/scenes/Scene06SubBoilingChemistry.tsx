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
    endFrame: 150,
    text: "Boiling water strips bitter chlorogenic acids from the bean.",
  },
  {
    startFrame: 150,
    endFrame: 345,
    text: "Adler discovered that under pneumatic pressure, coffee reaches peak natural sweetness at just eighty degrees Celsius.",
  },
];

export const Scene06SubBoilingChemistry: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slow downward tilt/zoom tracking the pouring water stream
  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -35], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/aeropress/aeropress_scene06_en.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/aeropress-scene-06-sub-boiling.jpg"
        prevImage="images/aeropress-scene-05-total-immersion.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Animated Precision Temperature Gauge */}
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
          opacity: tempSpring * exitProgress,
          transform: `translateX(${(1 - tempSpring) * 40 + (1 - exitProgress) * 30}px)`,
          textAlign: "right",
          zIndex: 45,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, color: "#7dd3fc", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Target Brew Temp
        </div>
        <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
          {currentTemp.toFixed(1)}°C
        </div>
        <div style={{ fontSize: 15, color: "#38bdf8", fontWeight: 700 }}>
          Zero Bitter Chlorogenic Acid
        </div>
      </div>

      {/* Bottom Lower-Third Card with Entry & Exit Text Animation */}
      <AnimatedCard
        startFrame={12}
        exitLeadFrames={22}
        tagText="Extraction Kinetics"
        tagBg="rgba(3, 105, 161, 0.9)"
        tagColor="#bae6fd"
        tagBorder="#38bdf8"
        borderColor="#38bdf8"
        glowColor="rgba(56, 189, 248, 0.2)"
        title="Sub-Boiling Water (80°C)"
        description="Adler proved boiling water extracts harsh astringency; pneumatic pressure unlocks peak sweetness at 80°C"
        bottom={110}
      />

      {/* Closed Captions below card */}
      <CaptionBar captions={CAPTIONS} bottom={38} />

      <ProgressBar color="#38bdf8" />
    </AbsoluteFill>
  );
};
