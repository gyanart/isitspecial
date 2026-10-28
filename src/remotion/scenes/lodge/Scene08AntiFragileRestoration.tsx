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

const CAPTIONS: CaptionSegment[] = [{"startFrame": 0, "endFrame": 290, "text": "When a chemical non-stick pan scratches or chips, toxic micro-plastics flake into your food and the pan must be thrown away. But cast iron is indestructible."}, {"startFrame": 290, "endFrame": 608, "text": "If left in rain and covered in rust, an hour with steel wool, coarse salt, and a fresh coat of oil restores it to factory perfection."}];

export const Scene08AntiFragileRestoration: React.FC = () => {
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
      <Audio src={staticFile("audio/lodge/lodge_scene08_in.mp3")} />

      <SceneBackground
        currentImage="images/lodge-scene-08-anti-fragile-restoration.jpg"
        prevImage="images/lodge-scene-07-polymerization-patina.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
        
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Anti-Fragility"
        tagBg="rgba(6, 78, 59, 0.9)"
        tagColor="#34d399"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.2)"
        title="The Infinite Restoration Miracle"
        description="Scratched Teflon is dead forever • Rusty 100-year cast iron restores with steel wool, salt & oil in 60 minutes"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
