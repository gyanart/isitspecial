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
    text: "The AeroPress solves this through total immersion.",
  },
  {
    startFrame: 155,
    endFrame: 335,
    text: "Every microscopic ground is submerged simultaneously in a sealed chamber, delivering mathematical extraction symmetry.",
  },
];

export const Scene05TotalImmersion: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Gentle floating pan and zoom across the golden coffee bloom
  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panX = interpolate(frame, [0, durationInFrames], [-20, 20], {
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
      <Audio src={staticFile("audio/aeropress/aeropress_scene05_en.mp3")} />

      {/* Cinematic Background Image with Fade-In */}
      <AbsoluteFill
        style={{
          transform: `translateX(${panX}px) scale(${zoom})`,
          transformOrigin: "center center",
          opacity: imageOpacity,
        }}
      >
        <Img
          src={staticFile("images/aeropress-scene-05-total-immersion.jpg")}
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

      {/* Metric Badge with Entry & Exit Animation */}
      <AnimatedStatBadge
        startFrame={25}
        exitLeadFrames={20}
        category="Hydrodynamic Physics"
        categoryColor="#a7f3d0"
        primaryText="100% Immersion"
        secondaryText="Symmetric Particle Contact"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.3)"
      />

      {/* Bottom Lower-Third Card with Entry & Exit Text Animation */}
      <AnimatedCard
        startFrame={12}
        exitLeadFrames={22}
        tagText="Mathematical Symmetry"
        tagBg="rgba(6, 78, 59, 0.9)"
        tagColor="#34d399"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.2)"
        title="Total Immersion Extraction"
        description="Sealed chamber ensures equal osmotic saturation across every ground coffee granule"
        bottom={110}
      />

      {/* Closed Captions below card */}
      <CaptionBar captions={CAPTIONS} bottom={38} />

      <ProgressBar color="#10b981" />
    </AbsoluteFill>
  );
};
