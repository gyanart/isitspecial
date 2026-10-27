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
    endFrame: 230,
    text: "The secret to its survival lies in four simple corner screws clamping a stainless steel plate against an oiled rubber O-ring gasket.",
  },
  {
    startFrame: 230,
    endFrame: 475,
    text: "Under external water pressure, the seal actually compresses tighter against the internal resin frame.",
  },
];

export const Scene08GasketHydrostaticSeal: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [15, -20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/casio/casio_scene08_in.mp3")} />

      <SceneBackground
        currentImage="images/casio-scene-08-gasket-hydrostatic-seal.jpg"
        prevImage="images/casio-scene-07-torture-test.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Mechanical Enclosure Design"
        tagBg="rgba(71, 85, 105, 0.9)"
        tagColor="#cbd5e1"
        tagBorder="#94a3b8"
        borderColor="#94a3b8"
        glowColor="rgba(148, 163, 184, 0.2)"
        title="4 Corner Screws & Silicone O-Ring"
        description="Hydrostatic pressure-assisted clamp • Stainless backplate • Self-tightening seal"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
