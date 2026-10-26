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
    endFrame: 175,
    text: "Today, competitors from over sixty nations compete in the annual World AeroPress Championship...",
  },
  {
    startFrame: 175,
    endFrame: 350,
    text: "...proving that simple engineering out-extracts complex multi-thousand-dollar machinery.",
  },
];

export const Scene03WorldChampionship: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Lateral tracking pan
  const panX = interpolate(frame, [0, durationInFrames], [40, -40], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/aeropress/aeropress_scene03_en.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/aeropress-scene-03-world-championship.jpg"
        prevImage="images/aeropress-scene-02-stanford-lab.jpg"
        transform={`translateX(${panX}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Floating Animated Tournament Stat Badge */}
      <AnimatedStatBadge
        startFrame={25}
        exitLeadFrames={20}
        category="Tournament Metric"
        categoryColor="#f472b6"
        primaryText="60+ Nations"
        secondaryText="Annual Global Circuit"
        borderColor="#ec4899"
        glowColor="rgba(236, 72, 153, 0.25)"
      />

      {/* Lower Card with Entry & Exit Text Animation */}
      <AnimatedCard
        startFrame={12}
        exitLeadFrames={22}
        tagText="Global Barista Phenomenon"
        tagBg="rgba(88, 28, 135, 0.9)"
        tagColor="#e9d5ff"
        tagBorder="#a855f7"
        borderColor="#a855f7"
        glowColor="rgba(168, 85, 247, 0.2)"
        title="World AeroPress Championship"
        description="Proving pure fluid physics out-extracts complex multi-thousand-dollar gear"
        bottom={110}
      />

      {/* Closed Captions below card */}
      <CaptionBar captions={CAPTIONS} bottom={38} />

      <ProgressBar color="#a855f7" />
    </AbsoluteFill>
  );
};
