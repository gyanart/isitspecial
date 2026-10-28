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
    endFrame: 270,
    text: "The common complaint that Moka coffee tastes bitter is user error. If you boil cold water from scratch on high heat, the metal burns the dry coffee grounds.",
  },
  {
    startFrame: 270,
    endFrame: 570,
    text: "The golden secret is simple: always fill the boiler with pre-boiled hot water and brew over gentle low heat.",
  },
];

export const Scene09StovetopBrewing: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [15, -15], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/moka/moka_scene09_in.mp3")} />

      <SceneBackground
        currentImage="images/moka-scene-09-stovetop-brewing.jpg"
        prevImage="images/moka-scene-08-safety-valve-gasket.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Card 1: The Burnt Mud Mistake (0 - 265) */}
      {frame < 270 && (
        <AnimatedCard
          startFrame={15}
          exitLeadFrames={durationInFrames - 265}
          tagText="The Common Mistake"
          tagBg="rgba(127, 29, 29, 0.9)"
          tagColor="#fca5a5"
          tagBorder="#ef4444"
          borderColor="#ef4444"
          glowColor="rgba(239, 68, 68, 0.2)"
          title="Boiling Cold Water on High Heat"
          description="Overheats upper chamber • Scorches dry ground coffee • Produces bitter ash"
          bottom={110}
        />
      )}

      {/* Card 2: The Golden Italian Rule (270+) */}
      {frame >= 265 && (
        <AnimatedCard
          startFrame={272}
          exitLeadFrames={25}
          tagText="The Golden Rule"
          tagBg="rgba(6, 78, 59, 0.9)"
          tagColor="#34d399"
          tagBorder="#10b981"
          borderColor="#10b981"
          glowColor="rgba(16, 185, 129, 0.2)"
          title="Pre-Boil Water (80°C) + Low Heat"
          description="Brews in 90 seconds • Smooth chocolate crema • Zero scorched beans"
          bottom={110}
        />
      )}

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
