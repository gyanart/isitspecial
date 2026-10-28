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
    endFrame: 240,
    text: "Bare aluminum naturally forms a protective microscopic passivating layer of aluminum oxide.",
  },
  {
    startFrame: 240,
    endFrame: 510,
    text: "Over months of brewing, coffee oils season the porous metal, which is why Italian households strictly ban dish soap and only rinse with warm water.",
  },
];

export const Scene07SeasonedPatina: React.FC = () => {
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
      <Audio src={staticFile("audio/moka/moka_scene07_in.mp3")} />

      <SceneBackground
        currentImage="images/moka-scene-07-seasoned-patina.jpg"
        prevImage="images/moka-scene-06-octagonal-facets.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Material Science & Care"
        tagBg="rgba(30, 41, 59, 0.9)"
        tagColor="#cbd5e1"
        tagBorder="#64748b"
        borderColor="#64748b"
        glowColor="rgba(100, 116, 139, 0.2)"
        title="Aluminium Oxide Shield & Coffee Seasoning"
        description="Natural Al2O3 passivation prevents metallic taste • Italian nonna soap ban (water only)"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
