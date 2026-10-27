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
    text: "In 1991, Bic added a ventilated hole to the top of the cap...",
  },
  {
    startFrame: 175,
    endFrame: 420,
    text: "...a life-saving design allowing air to pass through in case a child accidentally swallows it, keeping airways open for medical help.",
  },
];

export const Scene07SafetyCap: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Macro camera dolly past the cap's ventilation aperture
  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [-15, 20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/bic/bic_scene07_in.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/bic-scene-07-safety-cap.jpg"
        prevImage="images/bic-scene-06-barrel-pinhole.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Life-Safety Engineering"
        tagBg="rgba(127, 29, 29, 0.9)"
        tagColor="#fca5a5"
        tagBorder="#ef4444"
        borderColor="#ef4444"
        glowColor="rgba(239, 68, 68, 0.3)"
        title="1991: The Ventilated Safety Cap"
        description="International ISO 11540 safety standard • Unobstructed airway passage prevents asphyxiation"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
