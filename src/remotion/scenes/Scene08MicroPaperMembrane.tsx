import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { HeaderBadge } from "../components/HeaderBadge";
import { ProgressBar } from "../components/ProgressBar";
import { AnimatedCard } from "../components/AnimatedCard";
import { AnimatedStatBadge } from "../components/AnimatedStatBadge";
import { CaptionBar, CaptionSegment } from "../components/CaptionBar";
import { SceneBackground } from "../components/SceneBackground";

const CAPTIONS: CaptionSegment[] = [
  {
    startFrame: 0,
    endFrame: 145,
    text: "Unlike the muddy silt of a French press, the AeroPress uses a micro-paper disc...",
  },
  {
    startFrame: 145,
    endFrame: 300,
    text: "...that captures bitter diterpenes and sediment, leaving you with silky clarity.",
  },
];

export const Scene08MicroPaperMembrane: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow rack focus/pan from paper disc to crystal clear cup
  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panX = interpolate(frame, [0, durationInFrames], [-20, 20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/aeropress/aeropress_scene08_en.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/aeropress-scene-08-paper-membrane.jpg"
        prevImage="images/aeropress-scene-07-pneumatic-pressure.jpg"
        transform={`translateX(${panX}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Optical Clarity Metric Badge */}
      <AnimatedStatBadge
        startFrame={25}
        exitLeadFrames={20}
        category="Purity Standard"
        categoryColor="#7dd3fc"
        primaryText="Zero Sediment"
        secondaryText="Traps Bitter Diterpenes & Silt"
        borderColor="#38bdf8"
        glowColor="rgba(56, 189, 248, 0.25)"
      />

      {/* Bottom Lower-Third Card with Staggered Entry & Exit Text Animation */}
      <AnimatedCard
        startFrame={12}
        exitLeadFrames={22}
        tagText="Filtration Science"
        tagBg="rgba(3, 105, 161, 0.9)"
        tagColor="#bae6fd"
        tagBorder="#38bdf8"
        borderColor="#38bdf8"
        glowColor="rgba(56, 189, 248, 0.2)"
        title="The Micro-Paper Membrane"
        description="Unlike the muddy sludge of French presses, micro-filtration delivers mirror-like cup clarity"
        bottom={110}
      />

      {/* Closed Captions below card */}
      <CaptionBar captions={CAPTIONS} bottom={38} />

      <ProgressBar color="#38bdf8" />
    </AbsoluteFill>
  );
};
