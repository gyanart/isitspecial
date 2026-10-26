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
    endFrame: 140,
    text: "Drop a glass Chemex on granite and it shatters.",
  },
  {
    startFrame: 140,
    endFrame: 300,
    text: "The AeroPress is molded from food-grade polypropylene that can survive being run over by a truck.",
  },
];

export const Scene09PolypropyleneDurability: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Wide panoramic drone sweep settling on the gear
  const zoom = interpolate(frame, [0, durationInFrames], [1.10, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [15, -15], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/aeropress/aeropress_scene09_en.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/aeropress-scene-09-durability.jpg"
        prevImage="images/aeropress-scene-08-paper-membrane.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Durability Spec Badge */}
      <AnimatedStatBadge
        startFrame={25}
        exitLeadFrames={20}
        category="Material Durability"
        categoryColor="#6ee7b7"
        primaryText="Shatterproof"
        secondaryText="BPA-Free Polypropylene"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.25)"
      />

      {/* Bottom Lower-Third Card with Entry & Exit Text Animation */}
      <AnimatedCard
        startFrame={12}
        exitLeadFrames={22}
        tagText="Anti-Fragile Engineering"
        tagBg="rgba(6, 78, 59, 0.9)"
        tagColor="#6ee7b7"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.2)"
        title="Indestructible Construction"
        description="Glass Chemex and French presses shatter on tile. The AeroPress easily survives expeditions and flights"
        bottom={110}
      />

      {/* Closed Captions below card */}
      <CaptionBar captions={CAPTIONS} bottom={38} />

      <ProgressBar color="#10b981" />
    </AbsoluteFill>
  );
};
