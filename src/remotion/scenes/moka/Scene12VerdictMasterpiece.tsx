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
    endFrame: 220,
    text: "In an era of disposable electronics and fragile touchscreens, the Bialetti Moka Express is an enduring monument to honest Italian physics.",
  },
  {
    startFrame: 220,
    endFrame: 470,
    text: "With a Special Score of 9.1 out of 10, it is an undeniable True Gem.",
  },
];

export const Scene12VerdictMasterpiece: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -20], {
    extrapolateRight: "clamp",
  });

  // Animated scorecard reveal: score counting up to 9.1 / 10
  const scoreVal = interpolate(frame, [15, 80], [0, 9.1], {
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
      <Audio src={staticFile("audio/moka/moka_scene12_in.mp3")} />

      <SceneBackground
        currentImage="images/moka-scene-12-verdict-masterpiece.jpg"
        prevImage="images/moka-scene-11-cost-per-use.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
        isLastScene={true}
      />

      <HeaderBadge />

      {/* Top Right Final Verdict Scorecard Badge */}
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
            background: "rgba(15, 23, 42, 0.92)",
            border: "1.5px solid rgba(16, 185, 129, 0.6)",
            borderRadius: 20,
            padding: "20px 28px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 35px rgba(16, 185, 129, 0.25)",
            backdropFilter: "blur(14px)",
            textAlign: "right",
          }}
        >
          <div style={{ color: "#6ee7b7", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>
            THE SPECIAL INDEX™ SCORE
          </div>
          <div style={{ color: "#ffffff", fontSize: 44, fontWeight: 900, fontFamily: "monospace", marginTop: 4 }}>
            {scoreVal.toFixed(1)} <span style={{ fontSize: 22, color: "#10b981" }}>/ 10</span>
          </div>
          <div style={{ color: "#34d399", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginTop: 4 }}>
            ★ TRUE GEM
          </div>
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="The Special Index™ Verdict"
        tagBg="rgba(6, 78, 59, 0.95)"
        tagColor="#34d399"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.3)"
        title="True Gem (9.1 / 10)"
        description="Enduring Italian thermodynamics • $35 heirloom durability • Zero single-use pods"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
