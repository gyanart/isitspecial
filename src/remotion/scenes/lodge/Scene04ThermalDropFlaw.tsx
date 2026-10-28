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

const CAPTIONS: CaptionSegment[] = [{"startFrame": 0, "endFrame": 270, "text": "Why do lightweight non-stick pans produce gray, soggy meat? Thermal mass."}, {"startFrame": 270, "endFrame": 603, "text": "When a cold piece of protein hits a thin aluminum pan, the surface temperature plunges by over one hundred and fifty degrees instantly. Instead of searing, the steak boils in its own escaping moisture."}];

export const Scene04ThermalDropFlaw: React.FC = () => {
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
      <Audio src={staticFile("audio/lodge/lodge_scene04_in.mp3")} />

      <SceneBackground
        currentImage="images/lodge-scene-04-thermal-drop-flaw.jpg"
        prevImage="images/lodge-scene-03-molten-iron-pour.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
        
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="The Physics Defect"
        tagBg="rgba(127, 29, 29, 0.9)"
        tagColor="#f87171"
        tagBorder="#ef4444"
        borderColor="#ef4444"
        glowColor="rgba(239, 68, 68, 0.25)"
        title="Thin Aluminum Thermal Drop (-150°F)"
        description="Low thermal mass causes instantaneous heat collapse • Meat boils in moisture rather than searing"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
