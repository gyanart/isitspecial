import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
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
    endFrame: 140,
    text: "The Bic Cristal is democratic design at its zenith...",
  },
  {
    startFrame: 140,
    endFrame: 295,
    text: "...the wealthiest billionaire on earth cannot purchase a pen that lays down a smoother ball bearing.",
  },
];

export const Scene10DemocraticDesign: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow pedestal drift across the executive marble desk
  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [-10, 15], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/bic/bic_scene10_in.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/bic-scene-10-billionaire-paradox.jpg"
        prevImage="images/bic-scene-09-two-mile-line.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Democratic Design"
        tagBg="rgba(88, 28, 135, 0.9)"
        tagColor="#d8b4fe"
        tagBorder="#a855f7"
        borderColor="#a855f7"
        glowColor="rgba(168, 85, 247, 0.25)"
        title="The Billionaire Paradox"
        description="Zero hierarchy • Used identically by schoolchildren and heads of state on international treaties"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
