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
    text: "Liquid rises through the grounds at approximately ninety-five to one-hundred-two degrees Celsius, extracting deep lipids, aromatic oils, and melanoidins.",
  },
  {
    startFrame: 260,
    endFrame: 530,
    text: "It yields double the dissolved coffee solids of conventional drip brewing without a single electric wire.",
  },
];

export const Scene05EspressoExtraction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -20], {
    extrapolateRight: "clamp",
  });

  // Animated extraction temperature gauge: 20°C up to 98°C
  const tempVal = interpolate(frame, [15, 80], [20, 98.5], {
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
      <Audio src={staticFile("audio/moka/moka_scene05_in.mp3")} />

      <SceneBackground
        currentImage="images/moka-scene-05-espresso-extraction.jpg"
        prevImage="images/moka-scene-04-exploded-components.png"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Top Right Extraction Chemistry HUD */}
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
            border: "1px solid rgba(245, 158, 11, 0.5)",
            borderRadius: 16,
            padding: "16px 24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 25px rgba(245, 158, 11, 0.2)",
            backdropFilter: "blur(12px)",
            textAlign: "right",
          }}
        >
          <div style={{ color: "#fcd34d", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>
            EXTRACTION WATER TEMPERATURE
          </div>
          <div style={{ color: "#ffffff", fontSize: 36, fontWeight: 800, fontFamily: "monospace", marginTop: 4 }}>
            {tempVal.toFixed(1)} <span style={{ fontSize: 20, color: "#f59e0b" }}>°C</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
            Concentrated Lipids & Melanoidins • 2x Drip Coffee TDS
          </div>
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Thermal Fluid Extraction"
        tagBg="rgba(120, 53, 15, 0.9)"
        tagColor="#fde047"
        tagBorder="#eab308"
        borderColor="#eab308"
        glowColor="rgba(234, 179, 8, 0.2)"
        title="Sub-Boiling Espresso Chemistry"
        description="Extracts rich aromatic oils & crema • 2x dissolved solids of pour-over • Zero electronics"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
