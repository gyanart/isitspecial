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
    endFrame: 280,
    text: "Designed in Tokyo in 1989 by Casio engineer Ryusuke Moriai, the F-91W was conceived without CAD computers or marketing committees.",
  },
  {
    startFrame: 280,
    endFrame: 580,
    text: "Moriai crafted its understated rectangular profile to be flat, functional, and completely devoid of vanity.",
  },
];

export const Scene02TokyoBlueprint: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [15, -20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/casio/casio_scene02_in.mp3")} />

      <SceneBackground
        currentImage="images/casio-scene-02-tokyo-blueprint.jpg"
        prevImage="images/casio-scene-01-swiss-paradox.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Industrial Design Lore"
        tagBg="rgba(30, 58, 138, 0.9)"
        tagColor="#93c5fd"
        tagBorder="#3b82f6"
        borderColor="#3b82f6"
        glowColor="rgba(59, 130, 246, 0.2)"
        title="Tokyo, Japan • 1989 Origin"
        description="Chief Designer: Ryusuke Moriai • 0% CAD • Hand-drafted rectangular geometry"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
