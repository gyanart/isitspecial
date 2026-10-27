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
    endFrame: 265,
    text: "Walk into any luxury stationery boutique and you will find hand-turned Italian resin pens priced upwards of six hundred dollars.",
  },
  {
    startFrame: 265,
    endFrame: 540,
    text: "Yet inside billions of bank counters, classrooms, and government offices sits a clear plastic tube costing thirty cents: the Bic Cristal.",
  },
];

export const Scene01LuxuryParadox: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow, sweeping lateral tracking shot (Left Montblanc -> Right Bic Cristal)
  const panX = interpolate(frame, [0, durationInFrames], [60, -80], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.22], {
    extrapolateRight: "clamp",
  });

  const panY = Math.sin((frame / durationInFrames) * Math.PI) * 12;

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/bic/bic_scene01_in.mp3")} />

      {/* Cinematic Seamless Crossfade Background (First scene fades in from black) */}
      <SceneBackground
        currentImage="images/bic-scene-01-luxury-paradox.jpg"
        transform={`translate(${panX}px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Card 1: The Status Quo ($600 Montblanc, frames 15 to 260) */}
      {frame < 265 && (
        <AnimatedCard
          startFrame={15}
          exitLeadFrames={durationInFrames - 260}
          tagText="The Status Quo"
          tagBg="rgba(120, 53, 15, 0.9)"
          tagColor="#fbbf24"
          tagBorder="#f59e0b"
          borderColor="rgba(245, 158, 11, 0.85)"
          glowColor="rgba(245, 158, 11, 0.2)"
          title="$600 Italian Resin Fountain Pen"
          description="Velvet-lined mahogany box • 14k gold nib • High maintenance bottled ink"
          bottom={110}
        />
      )}

      {/* Card 2: The 30-Cent Icon (frames 265 onwards) */}
      {frame >= 260 && (
        <AnimatedCard
          startFrame={268}
          exitLeadFrames={25}
          tagText="The 30-Cent Icon"
          tagBg="rgba(6, 78, 59, 0.9)"
          tagColor="#34d399"
          tagBorder="#10b981"
          borderColor="#10b981"
          glowColor="rgba(16, 185, 129, 0.2)"
          title="30-Cent Clear Polystyrene Tube"
          description="100 Billion Sold Worldwide • MoMA Permanent Collection Inductee"
          bottom={110}
        />
      )}

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
