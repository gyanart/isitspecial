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

const CAPTIONS: CaptionSegment[] = [{"startFrame": 0, "endFrame": 330, "text": "In a world poisoned by planned obsolescence and disposable cookware, the Lodge Cast Iron Skillet is a triumph of honest American metallurgy."}, {"startFrame": 330, "endFrame": 681, "text": "It is cheaper than dinner for two, cooks better with every passing decade, and will outlive your grandchildren. On the Special Index, it earns an exceptional 9.2 out of 10: A True Gem."}];

export const Scene12VerdictTrueGem: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [10, -10], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/lodge/lodge_scene12_in.mp3")} />

      <SceneBackground
        currentImage="images/lodge-scene-12-verdict-true-gem.jpg"
        prevImage="images/lodge-scene-11-cost-per-use.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
        isLastScene={true}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Special Index Verdict"
        tagBg="rgba(6, 78, 59, 0.9)"
        tagColor="#34d399"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.25)"
        title="Special Score: 9.2 / 10 • True Gem"
        description="Thermal Mass: 10/10 • Longevity: 10/10 • Repairability: 10/10 • Ergonomics: 7.5/10"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
