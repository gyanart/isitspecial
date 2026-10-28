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
    endFrame: 230,
    text: "Over three hundred million units have been cast since 1933.",
  },
  {
    startFrame: 230,
    endFrame: 475,
    text: "Exhibited permanently in London's Science Museum and New York's MoMA, it transformed espresso from a public café luxury into an everyday domestic ritual.",
  },
];

export const Scene03MoMAGallery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panX = interpolate(frame, [0, durationInFrames], [-20, 25], {
    extrapolateRight: "clamp",
  });

  // Production odometer counter: counts up to 300,000,000 units
  const counterVal = interpolate(frame, [15, 80], [0, 300000000], {
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
      <Audio src={staticFile("audio/moka/moka_scene03_in.mp3")} />

      <SceneBackground
        currentImage="images/moka-scene-03-moma-gallery.jpg"
        prevImage="images/moka-scene-02-alfonso-bialetti.jpg"
        transform={`translate(${panX}px, 0px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Top Right Production Telemetry HUD */}
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
            GLOBAL PRODUCTION TOTAL
          </div>
          <div style={{ color: "#ffffff", fontSize: 32, fontWeight: 800, fontFamily: "monospace", marginTop: 4 }}>
            {Math.floor(counterVal).toLocaleString()} <span style={{ fontSize: 18, color: "#60a5fa" }}>Pots Cast</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
            Permanent Collections: London Science Museum • New York MoMA
          </div>
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Design Museum Caliber"
        tagBg="rgba(30, 58, 138, 0.9)"
        tagColor="#93c5fd"
        tagBorder="#3b82f6"
        borderColor="#3b82f6"
        glowColor="rgba(59, 130, 246, 0.2)"
        title="300 Million Units Cast Worldwide"
        description="Permanently exhibited at New York MoMA • Democratic domestic espresso revolution"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
