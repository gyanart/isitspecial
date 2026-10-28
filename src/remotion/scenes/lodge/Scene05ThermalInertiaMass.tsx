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

const CAPTIONS: CaptionSegment[] = [{"startFrame": 0, "endFrame": 280, "text": "A ten-and-a-quarter-inch Lodge skillet packs 5.4 pounds of dense iron with a massive volumetric heat capacity of 3.7 megajoules per cubic meter Kelvin."}, {"startFrame": 280, "endFrame": 570, "text": "When your steak hits the iron, the surface temperature barely flinches, locking in juices with pure thermodynamic inertia."}];

export const Scene05ThermalInertiaMass: React.FC = () => {
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
      <Audio src={staticFile("audio/lodge/lodge_scene05_in.mp3")} />

      <SceneBackground
        currentImage="images/lodge-scene-05-thermal-inertia-mass.jpg"
        prevImage="images/lodge-scene-04-thermal-drop-flaw.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
        
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Thermal Dynamics"
        tagBg="rgba(6, 78, 59, 0.9)"
        tagColor="#34d399"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.2)"
        title="5.4 Pounds of Volumetric Heat Capacity"
        description="3.7 MJ/m³·K volumetric thermal inertia • Absorbs immense energy • Surface temp does not flinch"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
