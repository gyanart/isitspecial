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
    endFrame: 175,
    text: "Held in a precision-milled brass socket, this microscopic ball rotates smoothly as you drag it across paper...",
  },
  {
    startFrame: 175,
    endFrame: 370,
    text: "...pulling a controlled layer of viscous oil-based ink by pure capillary action.",
  },
];

export const Scene05BrassSocket: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Subtle lateral pan highlighting the brass housing grooves
  const panX = interpolate(frame, [0, durationInFrames], [-20, 25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/bic/bic_scene05_in.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/bic-scene-05-brass-socket.jpg"
        prevImage="images/bic-scene-04-tungsten-ball.jpg"
        transform={`translateX(${panX}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Capillary Fluid Dynamics"
        tagBg="rgba(120, 53, 15, 0.9)"
        tagColor="#fef08a"
        tagBorder="#eab308"
        borderColor="#eab308"
        glowColor="rgba(234, 179, 8, 0.25)"
        title="Precision Milled Brass Socket"
        description="Hydrodynamic lubrication • Zero leak viscosity formulation • Constant surface tension feed"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
