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
    endFrame: 290,
    text: "Inside sits a synthetic quartz tuning fork, laser-cut to oscillate precisely 32,768 times every second.",
  },
  {
    startFrame: 290,
    endFrame: 625,
    text: "An integrated CMOS circuit divides those vibrations down to exactly one electrical pulse per second, embarrassing the accuracy of hand-wound mechanical gears.",
  },
];

export const Scene05QuartzOscillator: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -25], {
    extrapolateRight: "clamp",
  });

  // Animated frequency counter reaching 32,768 Hz
  const freqVal = interpolate(frame, [10, 80], [0, 32768], {
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
      <Audio src={staticFile("audio/casio/casio_scene05_in.mp3")} />

      <SceneBackground
        currentImage="images/casio-scene-05-quartz-oscillator.jpg"
        prevImage="images/casio-scene-04-featherweight-scale.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Top Right Piezoelectric Oscillator HUD */}
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
            border: "1px solid rgba(139, 92, 246, 0.5)",
            borderRadius: 16,
            padding: "16px 24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 25px rgba(139, 92, 246, 0.2)",
            backdropFilter: "blur(12px)",
            textAlign: "right",
          }}
        >
          <div style={{ color: "#c4b5fd", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>
            PIEZOELECTRIC FREQUENCY
          </div>
          <div style={{ color: "#ffffff", fontSize: 36, fontWeight: 800, fontFamily: "monospace", marginTop: 4 }}>
            {Math.floor(freqVal).toLocaleString()} <span style={{ fontSize: 20, color: "#a78bfa" }}>Hz</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
            CMOS 2^15 Binary Frequency Divider • 1 Hz Output
          </div>
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Horological Electronics"
        tagBg="rgba(88, 28, 135, 0.9)"
        tagColor="#d8b4fe"
        tagBorder="#a855f7"
        borderColor="#a855f7"
        glowColor="rgba(168, 85, 247, 0.2)"
        title="32,768 Hz Synthetic Quartz Crystal"
        description="Laser-cut quartz tuning fork • High-stability CMOS division • ±1 sec/day precision"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
