import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { HeaderBadge } from "../components/HeaderBadge";
import { ProgressBar } from "../components/ProgressBar";
import { AnimatedCard } from "../components/AnimatedCard";
import { CaptionBar, CaptionSegment } from "../components/CaptionBar";

const CAPTIONS: CaptionSegment[] = [
  {
    startFrame: 0,
    endFrame: 165,
    text: "Walk into a high-end specialty café and you'll find fifteen-thousand-dollar chrome espresso machines.",
  },
  {
    startFrame: 165,
    endFrame: 345,
    text: "Yet the champion of global coffee tournaments is a forty-dollar plastic syringe.",
  },
];

export const Scene01LuxuryContrast: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Cinematic Camera Pan (Left Chrome Machine -> Right AeroPress)
  const panX = interpolate(frame, [0, durationInFrames], [0, -320], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const zoom = interpolate(frame, [0, durationInFrames], [1.15, 1.22], {
    extrapolateRight: "clamp",
  });

  // Vertical breathing camera crane
  const panY = Math.sin((frame / durationInFrames) * Math.PI) * 15;

  // Smooth image crossfade: fade in at start, fade out at end
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }
  );
  const imageOpacity = fadeIn * fadeOut;

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile("audio/aeropress/aeropress_scene01_en.mp3")} />

      {/* Background Photography with Camera Motion & Smooth Fade-In */}
      <AbsoluteFill
        style={{
          transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
          transformOrigin: "center center",
          opacity: imageOpacity,
        }}
      >
        <Img
          src={staticFile("images/aeropress-scene-01-chrome-vs-syringe.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* Cinematic Vignette Shadow */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.7) 0%, rgba(2,6,23,0) 25%, rgba(2,6,23,0) 65%, rgba(2,6,23,0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Clean Brand Badge */}
      <HeaderBadge />

      {/* Card 1: The Status Quo (Frames 10 to 165) */}
      {frame < 168 && (
        <AnimatedCard
          startFrame={10}
          exitLeadFrames={durationInFrames - 162}
          tagText="The Status Quo"
          tagBg="rgba(120, 53, 15, 0.9)"
          tagColor="#fbbf24"
          tagBorder="#f59e0b"
          borderColor="rgba(245, 158, 11, 0.85)"
          glowColor="rgba(245, 158, 11, 0.2)"
          title="$15,000 Chrome Commercial Machine"
          description="15-bar steam boilers • 120 kg polished brass locomotive"
          bottom={110}
        />
      )}

      {/* Card 2: The Underdog Icon (Frames 168 onwards to scene end) */}
      {frame >= 165 && (
        <AnimatedCard
          startFrame={168}
          exitLeadFrames={20}
          tagText="The 40-Dollar Icon"
          tagBg="rgba(6, 78, 59, 0.9)"
          tagColor="#34d399"
          tagBorder="#10b981"
          borderColor="#10b981"
          glowColor="rgba(16, 185, 129, 0.2)"
          title="$40 Aerodynamic Plastic Syringe"
          description="World AeroPress Championship Winner • 60+ Nations Worldwide"
          bottom={110}
        />
      )}

      {/* Closed Captions matching the exact voiceover (positioned below card) */}
      <CaptionBar captions={CAPTIONS} bottom={38} />

      {/* Live Animated Emerald Progress Timeline */}
      <ProgressBar />
    </AbsoluteFill>
  );
};
