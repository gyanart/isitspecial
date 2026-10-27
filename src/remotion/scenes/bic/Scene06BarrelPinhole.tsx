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
    endFrame: 165,
    text: "Look closely at the clear barrel and you will notice a tiny pinhole.",
  },
  {
    startFrame: 165,
    endFrame: 370,
    text: "This is not a defect—it is an atmospheric barometric equalizer that prevents a vacuum from starving the tip of ink.",
  },
];

export const Scene06BarrelPinhole: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Macro camera push into the hexagonal barrel facet
  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.24], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -25], {
    extrapolateRight: "clamp",
  });

  const hudSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames - 3],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0.0, 0.2, 1) }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/bic/bic_scene06_in.mp3")} />

      {/* Cinematic Seamless Crossfade Background */}
      <SceneBackground
        currentImage="images/bic-scene-06-barrel-pinhole.jpg"
        prevImage="images/bic-scene-05-brass-socket.jpg"
        transform={`translateY(${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Barometric Equalizer HUD (Top Right) */}
      <div
        style={{
          position: "absolute",
          top: 130,
          right: 64,
          padding: "16px 28px",
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          border: "2px solid #38bdf8",
          borderRadius: 20,
          backdropFilter: "blur(16px)",
          boxShadow: "0 15px 30px rgba(0,0,0,0.5), 0 0 25px rgba(56, 189, 248, 0.25)",
          opacity: hudSpring * exitProgress,
          transform: `translateX(${(1 - hudSpring) * 40 + (1 - exitProgress) * 30}px)`,
          textAlign: "right",
          zIndex: 45,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, color: "#7dd3fc", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Barometric Equalizer
        </div>
        <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
          1.00 ATM
        </div>
        <div style={{ fontSize: 15, color: "#38bdf8", fontWeight: 700 }}>
          Zero Internal Vacuum Lock
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="Atmospheric Physics"
        tagBg="rgba(8, 47, 73, 0.9)"
        tagColor="#7dd3fc"
        tagBorder="#0284c7"
        borderColor="#0284c7"
        glowColor="rgba(2, 132, 199, 0.25)"
        title="Micro-Vented Polystyrene Barrel"
        description="Equalizes internal chamber pressure • Prevents tip starvation and cabin pressure leaks"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
