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
    text: "Though modestly stamped 'Water Resist' for light rain, enthusiasts have subjected the F-91W to brutal abuse.",
  },
  {
    startFrame: 280,
    endFrame: 595,
    text: "It has been frozen solid in ice, boiled in bubbling kettles, run over by five-ton trucks, and submerged thirty meters deep without leaking a single drop.",
  },
];

export const Scene07TortureTest: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panX = interpolate(frame, [0, durationInFrames], [-20, 30], {
    extrapolateRight: "clamp",
  });

  // Simulated water depth counter: 0 down to 30.0 meters
  const depthMeters = interpolate(frame, [15, 85], [0, 30.0], {
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
      <Audio src={staticFile("audio/casio/casio_scene07_in.mp3")} />

      <SceneBackground
        currentImage="images/casio-scene-07-torture-test.jpg"
        prevImage="images/casio-scene-06-cr2016-battery.jpg"
        transform={`translate(${panX}px, 0px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Top Right Pressure & Torture Telemetry HUD */}
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
            border: "1px solid rgba(14, 165, 233, 0.5)",
            borderRadius: 16,
            padding: "16px 24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 25px rgba(14, 165, 233, 0.2)",
            backdropFilter: "blur(12px)",
            textAlign: "right",
          }}
        >
          <div style={{ color: "#7dd3fc", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>
            EXTREME TORTURE TEST
          </div>
          <div style={{ color: "#ffffff", fontSize: 36, fontWeight: 800, fontFamily: "monospace", marginTop: 4 }}>
            {depthMeters.toFixed(1)} <span style={{ fontSize: 20, color: "#38bdf8" }}>meters</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
            Frozen (-18°C) • Boiled (100°C) • 5-Ton Truck • Zero Water Intrusion
          </div>
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Accidental Indestructibility"
        tagBg="rgba(3, 105, 161, 0.9)"
        tagColor="#7dd3fc"
        tagBorder="#0284c7"
        borderColor="#0284c7"
        glowColor="rgba(2, 132, 199, 0.2)"
        title="Torture-Tested Around the Globe"
        description="Hydrostatic pressure resistance • Shock-absorbing resin cavity • 0.00% leakage"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
