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

const CAPTIONS: CaptionSegment[] = [{"startFrame": 0, "endFrame": 260, "text": "At three hundred degrees Fahrenheit, amino acids and reducing sugars undergo the Maillard reaction,"}, {"startFrame": 260, "endFrame": 532, "text": "generating hundreds of complex flavor compounds and a deep, crunchy restaurant-grade mahogany crust that chemical non-stick pans simply cannot replicate without burning their coating."}];

export const Scene06MaillardCrustSear: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [10, -10], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/lodge/lodge_scene06_in.mp3")} />

      <SceneBackground
        currentImage="images/lodge-scene-06-maillard-crust-sear.jpg"
        prevImage="images/lodge-scene-05-thermal-inertia-mass.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
        
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Culinary Chemistry"
        tagBg="rgba(120, 53, 15, 0.9)"
        tagColor="#fbbf24"
        tagBorder="#f59e0b"
        borderColor="rgba(245, 158, 11, 0.85)"
        glowColor="rgba(245, 158, 11, 0.2)"
        title="The Maillard Caramelization Reaction"
        description="Triggered @ 300°F+ • Amino acids & reducing sugars bind • Rich crunchy mahogany restaurant crust"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
