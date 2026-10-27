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
    endFrame: 250,
    text: "Few objects bridge human demographics like the F-91W.",
  },
  {
    startFrame: 250,
    endFrame: 540,
    text: "It was worn by a young Barack Obama, embraced by NASA astronauts, issued to frontline military medics, and favored by hipster artists in Berlin and construction workers in Tokyo.",
  },
];

export const Scene09DemographicChameleon: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.24], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panX = interpolate(frame, [0, durationInFrames], [-20, 20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/casio/casio_scene09_in.mp3")} />

      <SceneBackground
        currentImage="images/casio-scene-09-demographic-chameleon.jpg"
        prevImage="images/casio-scene-08-gasket-hydrostatic-seal.jpg"
        transform={`translate(${panX}px, 0px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Cultural Phenomenon"
        tagBg="rgba(30, 41, 59, 0.9)"
        tagColor="#e2e8f0"
        tagBorder="#64748b"
        borderColor="#64748b"
        glowColor="rgba(100, 116, 139, 0.2)"
        title="The Demographic Chameleon"
        description="Presidents & Prime Ministers • NASA Astronauts • Military Medics • Urban Creators"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
