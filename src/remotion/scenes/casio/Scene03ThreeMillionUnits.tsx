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
    endFrame: 260,
    text: "While modern electronics are obsolete in three years, Casio still manufactures and ships over three million F-91W watches every single year.",
  },
  {
    startFrame: 260,
    endFrame: 530,
    text: "Four decades later, it remains one of the most widely worn electronic devices in human history.",
  },
];

export const Scene03ThreeMillionUnits: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panX = interpolate(frame, [0, durationInFrames], [-20, 30], {
    extrapolateRight: "clamp",
  });

  // Animated odometer counting up to 3,000,000 units/year
  const unitCounter = interpolate(frame, [15, 85], [0, 3000000], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const hudSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/casio/casio_scene03_in.mp3")} />

      <SceneBackground
        currentImage="images/casio-scene-03-three-million-units.jpg"
        prevImage="images/casio-scene-02-tokyo-blueprint.jpg"
        transform={`translate(${panX}px, 0px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Top Right Live Production Telemetry Card */}
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
            border: "1px solid rgba(59, 130, 246, 0.5)",
            borderRadius: 16,
            padding: "16px 24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 25px rgba(59, 130, 246, 0.2)",
            backdropFilter: "blur(12px)",
            textAlign: "right",
          }}
        >
          <div style={{ color: "#93c5fd", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>
            ANNUAL FACTORY OUTPUT
          </div>
          <div style={{ color: "#ffffff", fontSize: 32, fontWeight: 800, fontFamily: "monospace", marginTop: 4 }}>
            {Math.floor(unitCounter).toLocaleString()} <span style={{ fontSize: 18, color: "#60a5fa" }}>units/yr</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
            Continuous Production: 1989 – Present
          </div>
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Global Manufacturing Scale"
        tagBg="rgba(30, 58, 138, 0.9)"
        tagColor="#93c5fd"
        tagBorder="#3b82f6"
        borderColor="#3b82f6"
        glowColor="rgba(59, 130, 246, 0.2)"
        title="3 Million Units Shipped Annually"
        description="Over 100 Million units active worldwide • Zero planned obsolescence"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
