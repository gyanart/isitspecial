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
import { AnimatedStatBadge } from "../components/AnimatedStatBadge";
import { CaptionBar, CaptionSegment } from "../components/CaptionBar";

const CAPTIONS: CaptionSegment[] = [
  {
    startFrame: 0,
    endFrame: 155,
    text: "In traditional pour-overs, water follows the path of least resistance.",
  },
  {
    startFrame: 155,
    endFrame: 325,
    text: "This channeling creates harsh bitter hotspots and sour under-extracted pockets.",
  },
];

export const Scene04ChannelingDefect: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Macro camera push-in to emphasize erratic channels
  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -25], {
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
      <Audio src={staticFile("audio/aeropress/aeropress_scene04_en.mp3")} />

      {/* Cinematic Background Image with Fade-In */}
      <AbsoluteFill
        style={{
          transform: `translateY(${panY}px) scale(${zoom})`,
          transformOrigin: "center center",
          opacity: imageOpacity,
        }}
      >
        <Img
          src={staticFile("images/aeropress-scene-04-channeling-defect.jpg")}
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
            "linear-gradient(180deg, rgba(2,6,23,0.75) 0%, rgba(2,6,23,0) 25%, rgba(2,6,23,0) 65%, rgba(2,6,23,0.88) 100%)",
          pointerEvents: "none",
        }}
      />

      <HeaderBadge />

      {/* Warning Defect Pill on Top Right with Entry & Exit Animation */}
      <AnimatedStatBadge
        startFrame={25}
        exitLeadFrames={20}
        category="Physical Limitation"
        categoryColor="#fca5a5"
        primaryText="Channeling Defect"
        secondaryText="Erratic Liquid Crevices"
        borderColor="#ef4444"
        glowColor="rgba(239, 68, 68, 0.3)"
      />

      {/* Bottom Lower-Third Card with Staggered Entry & Exit Text Animation */}
      <AnimatedCard
        startFrame={12}
        exitLeadFrames={22}
        tagText="The Pour-Over Flaw"
        tagBg="rgba(124, 45, 18, 0.9)"
        tagColor="#fdba74"
        tagBorder="#f97316"
        borderColor="#f97316"
        glowColor="rgba(249, 115, 22, 0.2)"
        title="The Path of Least Resistance"
        description="Gravity creates microscopic tunnels—yielding bitter hotspots & sour under-extraction"
        bottom={110}
      />

      {/* Closed Captions below card */}
      <CaptionBar captions={CAPTIONS} bottom={38} />

      <ProgressBar color="#f97316" />
    </AbsoluteFill>
  );
};
