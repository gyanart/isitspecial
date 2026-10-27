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
    endFrame: 210,
    text: "Perfection in design is reached not when there is nothing left to add, but when there is nothing left to take away.",
  },
  {
    startFrame: 210,
    endFrame: 465,
    text: "With a Special Score of 9.6 out of 10, the Casio F-91W is an undeniable modern masterpiece.",
  },
];

export const Scene13VerdictMasterpiece: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -20], {
    extrapolateRight: "clamp",
  });

  // Animated final scorecard reveal: score counting up to 9.6 / 10
  const scoreVal = interpolate(frame, [15, 80], [0, 9.6], {
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
      <Audio src={staticFile("audio/casio/casio_scene13_in.mp3")} />

      <SceneBackground
        currentImage="images/casio-scene-13-verdict-masterpiece.jpg"
        prevImage="images/casio-scene-12-cost-per-use-equation.jpg"
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
            ★ MODERN MASTERPIECE
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
        title="Modern Masterpiece (9.6 / 10)"
        description="Perfection by subtraction • Indestructible everyday utility • Global industrial icon"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
