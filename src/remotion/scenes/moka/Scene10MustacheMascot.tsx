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
    endFrame: 310,
    text: "In 1953, cartoonist Paul Campani created 'the little man with the mustache' modeled after Alfonso's son, Renato Bialetti, with his finger raised ordering an espresso.",
  },
  {
    startFrame: 310,
    endFrame: 615,
    text: "When Renato passed away in 2016, his ashes were placed inside an oversized Moka pot.",
  },
];

export const Scene10MustacheMascot: React.FC = () => {
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
      <Audio src={staticFile("audio/moka/moka_scene10_in.mp3")} />

      <SceneBackground
        currentImage="images/moka-scene-10-mustache-mascot.jpg"
        prevImage="images/moka-scene-09-stovetop-brewing.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Cultural Icon & Legend"
        tagBg="rgba(30, 41, 59, 0.9)"
        tagColor="#e2e8f0"
        tagBorder="#64748b"
        borderColor="#64748b"
        glowColor="rgba(100, 116, 139, 0.2)"
        title="L'omino coi Baffi • The Mustache Man"
        description="Drawn in 1953 by Paul Campani • Modeled on Renato Bialetti • An indelible Italian symbol"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
