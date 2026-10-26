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

  // Smooth image crossfade: fade in at start, fade out at end
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }
  );
  const imageOpacity = fadeIn * fadeOut;

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/aeropress/aeropress_scene02_en.mp3")} />

      {/* Cinematic Background Image with Fade-In */}
      <AbsoluteFill
        style={{
          transform: `translateY(${panY}px) scale(${zoom})`,
          transformOrigin: "center center",
          opacity: imageOpacity,
        }}
      >
        <Img
          src={staticFile("images/aeropress-scene-02-stanford-lab.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* Cinematic Vignette */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.7) 0%, rgba(2,6,23,0) 25%, rgba(2,6,23,0) 65%, rgba(2,6,23,0.85) 100%)",
          pointerEvents: "none",
        }}
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
