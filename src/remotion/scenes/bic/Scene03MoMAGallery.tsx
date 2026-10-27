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
    endFrame: 160,
    text: "With over one hundred billion units sold, it is the best-selling pen in human history...",
  },
  {
    startFrame: 160,
    endFrame: 320,
    text: "...earning a permanent spot in the design collection of the Museum of Modern Art in New York.",
  },
];

export const Scene03MoMAGallery: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow pedestal rise into the glass vitrine museum display
  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.20], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [15, -15], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/bic/bic_scene03_in.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/bic-scene-03-moma-gallery.jpg"
        prevImage="images/bic-scene-02-paris-origin.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Museum of Modern Art"
        tagBg="rgba(30, 58, 138, 0.9)"
        tagColor="#93c5fd"
        tagBorder="#3b82f6"
        borderColor="#3b82f6"
        glowColor="rgba(59, 130, 246, 0.25)"
        title="100 Billion Sold: Permanent MoMA Collection"
        description="The most successful writing instrument in history • Modernist design sculpture"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
