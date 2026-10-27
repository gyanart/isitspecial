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
    endFrame: 210,
    text: "Introduced in Paris in December 1950 by Marcel Bich, who bought the patent rights from Hungarian inventor László Bíró...",
  },
  {
    startFrame: 210,
    endFrame: 395,
    text: "...the Cristal democratized human literacy across one hundred and sixty nations.",
  },
];

export const Scene02ParisOrigin: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow push-in to the 1950 French engineering drafting table
  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -25], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/bic/bic_scene02_in.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/bic-scene-02-paris-origin.jpg"
        prevImage="images/bic-scene-01-luxury-paradox.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Industrial Heritage"
        tagBg="rgba(120, 53, 15, 0.9)"
        tagColor="#fef08a"
        tagBorder="#eab308"
        borderColor="#eab308"
        glowColor="rgba(234, 179, 8, 0.25)"
        title="1950: The Clichy Workshop"
        description="Marcel Bich acquires Bíró patents • Transforming luxury ballpoints into mass democratization"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
