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
    text: "Unlike modern espresso pumps pushing nine bars of mechanical force, the Moka pot is a pure thermodynamic steam engine.",
  },
  {
    startFrame: 260,
    endFrame: 560,
    text: "As water in the lower boiler heats, expanding trapped vapor generates one-point-five bars of pressure, forcing water upward through the coffee funnel.",
  },
];

export const Scene04ExplodedComponents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -20], {
    extrapolateRight: "clamp",
  });

  // Animated vapor pressure gauge: counts up to 1.50 bar
  const pressureVal = interpolate(frame, [15, 80], [0, 1.5], {
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
      <Audio src={staticFile("audio/moka/moka_scene04_in.mp3")} />

      <SceneBackground
        currentImage="images/moka-scene-04-exploded-components.png"
        prevImage="images/moka-scene-03-moma-gallery.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Top Right Pressure Dynamics HUD */}
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
            VAPOR PRESSURE TELEMETRY
          </div>
          <div style={{ color: "#ffffff", fontSize: 36, fontWeight: 800, fontFamily: "monospace", marginTop: 4 }}>
            {pressureVal.toFixed(2)} <span style={{ fontSize: 20, color: "#10b981" }}>bars (150 kPa)</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
            Natural Thermal Expansion • 0 Moving Pumps
          </div>
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Closed Boiler Thermodynamics"
        tagBg="rgba(6, 78, 59, 0.9)"
        tagColor="#34d399"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.2)"
        title="1.5 Bar Thermodynamic Steam Engine"
        description="Headspace vapor expands • Hot water forced upward through submerged funnel"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
