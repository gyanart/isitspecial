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
    text: "Walk into any luxury espresso bar in Rome or Milan, and you're surrounded by chrome dual-boiler machines costing upwards of three thousand dollars.",
  },
  {
    startFrame: 280,
    endFrame: 580,
    text: "Yet sitting on ninety percent of Italian kitchen stovetops is an angular aluminum pot costing thirty-five dollars: the Bialetti Moka Express.",
  },
];

export const Scene01CafeContrast: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const panX = interpolate(frame, [0, durationInFrames], [40, -50], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.22], {
    extrapolateRight: "clamp",
  });

  const panY = Math.sin((frame / durationInFrames) * Math.PI) * 10;

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/moka/moka_scene01_in.mp3")} />

      <SceneBackground
        currentImage="images/moka-scene-01-cafe-contrast.jpg"
        transform={`translate(${panX}px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Card 1: $3,000 Commercial Chrome Machine (0 - 275) */}
      {frame < 280 && (
        <AnimatedCard
          startFrame={15}
          exitLeadFrames={durationInFrames - 275}
          tagText="The Status Quo"
          tagBg="rgba(120, 53, 15, 0.9)"
          tagColor="#fbbf24"
          tagBorder="#f59e0b"
          borderColor="rgba(245, 158, 11, 0.85)"
          glowColor="rgba(245, 158, 11, 0.2)"
          title="$3,000 Commercial Dual-Boiler Espresso"
          description="Rotary pumps • 9 bars mechanical force • High maintenance electric circuits"
          bottom={110}
        />
      )}

      {/* Card 2: The $35 Italian Stovetop Icon (280+) */}
      {frame >= 275 && (
        <AnimatedCard
          startFrame={282}
          exitLeadFrames={25}
          tagText="The Stovetop Legend"
          tagBg="rgba(6, 78, 59, 0.9)"
          tagColor="#34d399"
          tagBorder="#10b981"
          borderColor="#10b981"
          glowColor="rgba(16, 185, 129, 0.2)"
          title="$35 Die-Cast Aluminum Moka Express"
          description="Found on 90% of Italian kitchen stovetops • 1.5 bars pure steam pressure"
          bottom={110}
        />
      )}

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
