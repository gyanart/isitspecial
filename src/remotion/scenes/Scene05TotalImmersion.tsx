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
import { SceneBackground } from "../components/SceneBackground";

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

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/aeropress/aeropress_scene05_en.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/aeropress-scene-05-total-immersion.jpg"
        prevImage="images/aeropress-scene-04-channeling-defect.jpg"
        transform={`translateX(${panX}px) scale(${zoom})`}
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
