import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
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
    endFrame: 240,
    text: "Compared to a plastic capsule pod machine that creates landfill waste and dies in four years, a thirty-five-dollar Moka pot lasts twenty-five years.",
  },
  {
    startFrame: 240,
    endFrame: 480,
    text: "Over a decade of daily coffee, your hardware cost is less than half a cent per cup.",
  },
];

export const Scene11CostPerUse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -18], {
    extrapolateRight: "clamp",
  });

  // Cost per cup countdown: $0.15 down to $0.0038
  const cpuVal = interpolate(frame, [10, 75], [0.15, 0.0038], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const hudSpring = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/moka/moka_scene11_in.mp3")} />

      <SceneBackground
        currentImage="images/moka-scene-11-cost-per-use.jpg"
        prevImage="images/moka-scene-10-mustache-mascot.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Top Right Live CPU Calculator HUD */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 70,
          zIndex: 40,
          transform: `translateY(${interpolate(hudSpring, [0, 1], [-30, 0])}px)`,
          opacity: hudSpring,
        }}
      >
        <div
          style={{
            background: "rgba(15, 23, 42, 0.88)",
            border: "1px solid rgba(16, 185, 129, 0.5)",
            borderRadius: 16,
            padding: "16px 24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 25px rgba(16, 185, 129, 0.2)",
            backdropFilter: "blur(12px)",
            textAlign: "right",
          }}
        >
          <div style={{ color: "#6ee7b7", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>
            THE SPECIAL INDEX™ CPU EQUATION
          </div>
          <div style={{ color: "#ffffff", fontSize: 36, fontWeight: 800, fontFamily: "monospace", marginTop: 4 }}>
            ${cpuVal.toFixed(4)} <span style={{ fontSize: 18, color: "#10b981" }}>/ cup</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
            $35 purchase ÷ 9,125 cups (25 years) • 0 Pod Waste
          </div>
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Anti-Disposable Economics"
        tagBg="rgba(6, 78, 59, 0.9)"
        tagColor="#34d399"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.2)"
        title="Less Than Half a Cent Per Cup"
        description="25+ Year lifespan • Beats $160 electronic pod machines • Zero microplastics"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
