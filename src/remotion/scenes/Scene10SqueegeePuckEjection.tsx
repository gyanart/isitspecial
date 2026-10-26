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
    text: "Cleanup takes three seconds. The silicone seal acts as a squeegee...",
  },
  {
    startFrame: 140,
    endFrame: 315,
    text: "...and a final push ejects a solid, dry coffee puck straight into your compost.",
  },
];

export const Scene10SqueegeePuckEjection: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow motion tracking downwards
  const panY = interpolate(frame, [0, durationInFrames], [-15, 20], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/aeropress/aeropress_scene10_en.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/aeropress-scene-10-puck-ejection.jpg"
        prevImage="images/aeropress-scene-09-durability.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* 3-Second Speed Badge */}
      <AnimatedStatBadge
        startFrame={25}
        exitLeadFrames={20}
        category="Maintenance Ritual"
        categoryColor="#86efac"
        primaryText="3-Second Cleanup"
        secondaryText="Self-Cleaning Squeegee Action"
        borderColor="#22c55e"
        glowColor="rgba(34, 197, 94, 0.25)"
      />

      {/* Bottom Lower-Third Card with Entry & Exit Text Animation */}
      <AnimatedCard
        startFrame={12}
        exitLeadFrames={22}
        tagText="Zero Friction Routine"
        tagBg="rgba(20, 83, 45, 0.9)"
        tagColor="#86efac"
        tagBorder="#22c55e"
        borderColor="#22c55e"
        glowColor="rgba(34, 197, 94, 0.2)"
        title="The Puck Ejection Ritual"
        description="The rubber seal squeegees the chamber spotless. One push pops a dry puck straight into compost"
        bottom={110}
      />

      {/* Closed Captions below card */}
      <CaptionBar captions={CAPTIONS} bottom={38} />

      <ProgressBar color="#22c55e" />
    </AbsoluteFill>
  );
};
