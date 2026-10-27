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
    endFrame: 290,
    text: "Walk into any Swiss horology boutique in Geneva or London, and you're met with mechanical tourbillons costing ten thousand dollars.",
  },
  {
    startFrame: 290,
    endFrame: 605,
    text: "Yet sitting quietly on convenience store racks across the globe for fifteen dollars is a small slab of molded resin that keeps better time: the Casio F-91W.",
  },
];

export const Scene01SwissParadox: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow lateral panning across the luxury vs resin contrast
  const panX = interpolate(frame, [0, durationInFrames], [40, -50], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.20], {
    extrapolateRight: "clamp",
  });

  const panY = Math.sin((frame / durationInFrames) * Math.PI) * 10;

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/casio/casio_scene01_in.mp3")} />

      <SceneBackground
        currentImage="images/casio-scene-01-swiss-paradox.jpg"
        transform={`translate(${panX}px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Card 1: $10,000 Swiss Mechanical (0 - 285) */}
      {frame < 290 && (
        <AnimatedCard
          startFrame={15}
          exitLeadFrames={durationInFrames - 285}
          tagText="The Luxury Standard"
          tagBg="rgba(120, 53, 15, 0.9)"
          tagColor="#fbbf24"
          tagBorder="#f59e0b"
          borderColor="rgba(245, 158, 11, 0.85)"
          glowColor="rgba(245, 158, 11, 0.2)"
          title="$10,000 Swiss Mechanical Chronometer"
          description="Hand-beveled tourbillon • 31 ruby jewels • ±2 to 4 seconds/day drift"
          bottom={110}
        />
      )}

      {/* Card 2: The $15 Icon (290+) */}
      {frame >= 285 && (
        <AnimatedCard
          startFrame={292}
          exitLeadFrames={25}
          tagText="The $15 Masterpiece"
          tagBg="rgba(6, 78, 59, 0.9)"
          tagColor="#34d399"
          tagBorder="#10b981"
          borderColor="#10b981"
          glowColor="rgba(16, 185, 129, 0.2)"
          title="Casio F-91W Digital Quartz"
          description="Molded black resin • 32,768 Hz quartz crystal • ±1.0 second/day precision"
          bottom={110}
        />
      )}

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
