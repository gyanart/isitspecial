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
    endFrame: 165,
    text: "The iconic hexagonal barrel was borrowed from classic wood pencils.",
  },
  {
    startFrame: 165,
    endFrame: 380,
    text: "It provides a natural three-finger tripod grip and mathematically stops the pen from rolling off inclined desks.",
  },
];

export const Scene08HexagonalGeometry: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Isometric camera drift across the faceted row
  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panX = interpolate(frame, [0, durationInFrames], [-25, 25], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/bic/bic_scene08_in.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/bic-scene-08-hexagonal-geometry.jpg"
        prevImage="images/bic-scene-07-safety-cap.jpg"
        transform={`translateX(${panX}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Ergonomic Geometry"
        tagBg="rgba(6, 78, 59, 0.9)"
        tagColor="#6ee7b7"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.25)"
        title="Hexagonal Anti-Roll Cross-Section"
        description="Pencil tripod ergonomics • Zero roll on inclined drafting surfaces • Faceted structural rigidity"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
