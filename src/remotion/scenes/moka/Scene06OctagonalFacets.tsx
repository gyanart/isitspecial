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
    endFrame: 250,
    text: "Its eight-sided geometry is not decorative; it is thermal physics.",
  },
  {
    startFrame: 250,
    endFrame: 525,
    text: "Die-cast aluminum has a thermal conductivity nearly ten times higher than stainless steel, diffusing burner heat evenly across eight facets to eliminate scorching hot spots.",
  },
];

export const Scene06OctagonalFacets: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panX = interpolate(frame, [0, durationInFrames], [-20, 20], {
    extrapolateRight: "clamp",
  });

  // Thermal conductivity counter: 16 W/mK (steel) up to 205 W/mK (die-cast aluminum)
  const thermalVal = interpolate(frame, [15, 80], [16, 205], {
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
      <Audio src={staticFile("audio/moka/moka_scene06_in.mp3")} />

      <SceneBackground
        currentImage="images/moka-scene-06-octagonal-facets.jpg"
        prevImage="images/moka-scene-05-espresso-extraction.jpg"
        transform={`translate(${panX}px, 0px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Top Right Metallurgy & Heat Transfer HUD */}
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
            border: "1px solid rgba(239, 68, 68, 0.5)",
            borderRadius: 16,
            padding: "16px 24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 25px rgba(239, 68, 68, 0.2)",
            backdropFilter: "blur(12px)",
            textAlign: "right",
          }}
        >
          <div style={{ color: "#fca5a5", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>
            THERMAL CONDUCTIVITY
          </div>
          <div style={{ color: "#ffffff", fontSize: 36, fontWeight: 800, fontFamily: "monospace", marginTop: 4 }}>
            {Math.floor(thermalVal)} <span style={{ fontSize: 20, color: "#ef4444" }}>W/(m·K)</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
            vs. Stainless Steel: 16 W/(m·K) • 12.8x Faster Heat Transfer
          </div>
        </div>
      </div>

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Art Deco Thermal Engineering"
        tagBg="rgba(127, 29, 29, 0.9)"
        tagColor="#fca5a5"
        tagBorder="#ef4444"
        borderColor="#ef4444"
        glowColor="rgba(239, 68, 68, 0.2)"
        title="8-Sided Octagonal Heat Diffuser"
        description="Die-cast aluminum facets spread flame heat evenly • Eliminates localized hot spots"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
