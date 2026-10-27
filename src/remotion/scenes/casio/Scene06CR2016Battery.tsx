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
    endFrame: 280,
    text: "While modern smartwatches demand daily recharging cables and battery anxiety, the F-91W is powered by a single CR2016 lithium coin cell.",
  },
  {
    startFrame: 280,
    endFrame: 600,
    text: "Officially rated for seven years, owners routinely report ten to twelve years of continuous operation on the factory battery.",
  },
];

export const Scene06CR2016Battery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [10, -20], {
    extrapolateRight: "clamp",
  });

  // Battery life counter: counts from 0 up to 10.0+ Years
  const batteryYears = interpolate(frame, [15, 85], [0, 10.5], {
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
      <Audio src={staticFile("audio/casio/casio_scene06_in.mp3")} />

      <SceneBackground
        currentImage="images/casio-scene-06-cr2016-battery.jpg"
        prevImage="images/casio-scene-05-quartz-oscillator.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Top Right Energy Telemetry HUD */}
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
            border: "1px solid rgba(234, 179, 8, 0.5)",
            borderRadius: 16,
            padding: "16px 24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 25px rgba(234, 179, 8, 0.2)",
            backdropFilter: "blur(12px)",
            textAlign: "right",
          }}
        >
          <div style={{ color: "#fef08a", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>
            POWER RESILIENCE TELEMETRY
          </div>
          <div style={{ color: "#ffffff", fontSize: 36, fontWeight: 800, fontFamily: "monospace", marginTop: 4 }}>
            {batteryYears.toFixed(1)} <span style={{ fontSize: 20, color: "#facc15" }}>Years</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
            CR2016 3V Lithium Cell • 90mAh Capacity • Zero Recharging
          </div>
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Ultra-Low Power CMOS"
        tagBg="rgba(113, 63, 18, 0.9)"
        tagColor="#fef08a"
        tagBorder="#eab308"
        borderColor="#eab308"
        glowColor="rgba(234, 179, 8, 0.2)"
        title="The 7-to-10 Year Battery Paradox"
        description="Single CR2016 coin cell • Outlasts 1000 smartphone recharge cycles"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
