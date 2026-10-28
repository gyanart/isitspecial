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
    endFrame: 220,
    text: "Tucked onto the lower boiler wall is a spring-loaded brass inspection valve.",
  },
  {
    startFrame: 220,
    endFrame: 440,
    text: "If a user dangerously packs the coffee bed too tight, the valve automatically vents excess steam pressure, preventing boiler rupture.",
  },
];

export const Scene08SafetyValveGasket: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/moka/moka_scene08_in.mp3")} />

      <SceneBackground
        currentImage="images/moka-scene-08-safety-valve-gasket.jpg"
        prevImage="images/moka-scene-07-seasoned-patina.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Fail-Safe Mechanical Engineering"
        tagBg="rgba(120, 53, 15, 0.9)"
        tagColor="#fef08a"
        tagBorder="#eab308"
        borderColor="#eab308"
        glowColor="rgba(234, 179, 8, 0.2)"
        title="Patented Brass Pressure Relief Valve"
        description="Spring-loaded safety release vents at >3.0 bars • Prevents dangerous boiler over-pressurization"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
