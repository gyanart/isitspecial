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

const CAPTIONS: CaptionSegment[] = [{"startFrame": 0, "endFrame": 280, "text": "Unlike modern stamped aluminum pans pressed in seconds, every Lodge skillet is born from a cupola furnace roaring at 2,800 degrees Fahrenheit."}, {"startFrame": 280, "endFrame": 604, "text": "Molten pig iron and recycled steel are poured into single-use green sand molds, creating the skillet's signature textured, pebble-grain surface."}];

export const Scene03MoltenIronPour: React.FC = () => {
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
      <Audio src={staticFile("audio/lodge/lodge_scene03_in.mp3")} />

      <SceneBackground
        currentImage="images/lodge-scene-03-molten-iron-pour.jpg"
        prevImage="images/lodge-scene-02-tennessee-origin.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
        
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Sand-Casting Metallurgy"
        tagBg="rgba(120, 53, 15, 0.9)"
        tagColor="#fbbf24"
        tagBorder="#f59e0b"
        borderColor="rgba(245, 158, 11, 0.85)"
        glowColor="rgba(245, 158, 11, 0.2)"
        title="2,800°F Cupola Furnace Pour"
        description="Molten pig iron & recycled steel • Single-use green sand molds • Signature pebble-grain finish"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
