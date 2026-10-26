import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { HeaderBadge } from "../components/HeaderBadge";
import { ProgressBar } from "../components/ProgressBar";
import { AnimatedCard } from "../components/AnimatedCard";
import { CaptionBar, CaptionSegment } from "../components/CaptionBar";
import { SceneBackground } from "../components/SceneBackground";

const CAPTIONS: CaptionSegment[] = [
  {
    startFrame: 0,
    endFrame: 180,
    text: "Invented in 2005 by Alan Adler, a retired Stanford aerodynamics lecturer who created the world-record Aerobie flying ring...",
  },
  {
    startFrame: 180,
    endFrame: 350,
    text: "...the AeroPress was born in a physics lab.",
  },
];

export const Scene02Origin: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Cinematic slow camera push into the workshop blueprints
  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -30], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/aeropress/aeropress_scene02_en.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/aeropress-scene-02-stanford-lab.jpg"
        prevImage="images/aeropress-scene-01-chrome-vs-syringe.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Lower Card with Entry & Exit Text Animation */}
      <AnimatedCard
        startFrame={12}
        exitLeadFrames={22}
        tagText="Stanford Aerodynamics Lab • 2005"
        tagBg="rgba(3, 105, 161, 0.9)"
        tagColor="#bae6fd"
        tagBorder="#38bdf8"
        borderColor="#38bdf8"
        glowColor="rgba(56, 189, 248, 0.2)"
        title="Invented by Alan Adler"
        description="Creator of the Guinness World Record Aerobie • Applied Fluid Dynamics"
        bottom={110}
      />

      {/* Closed Captions below card */}
      <CaptionBar captions={CAPTIONS} bottom={38} />

      <ProgressBar color="#38bdf8" />
    </AbsoluteFill>
  );
};
