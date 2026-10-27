import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
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
    endFrame: 310,
    text: "To remain intellectually honest, the F-91W has two flaws: its microscopic green illumination diode barely lights the hours digit in pitch darkness...",
  },
  {
    startFrame: 310,
    endFrame: 615,
    text: "...and its polyurethane strap oxidizes after four years. Fortunately, a durable nylon NATO strap costs five dollars.",
  },
];

export const Scene10HonestFlawsLightStrap: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [10, -20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/casio/casio_scene10_in.mp3")} />

      <SceneBackground
        currentImage="images/casio-scene-10-honest-flaws-light-strap.jpg"
        prevImage="images/casio-scene-09-demographic-chameleon.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      {/* Card 1: The Dim Micro-Light (0 - 305) */}
      {frame < 310 && (
        <AnimatedCard
          startFrame={15}
          exitLeadFrames={durationInFrames - 305}
          tagText="Honest Critique #1"
          tagBg="rgba(127, 29, 29, 0.9)"
          tagColor="#fca5a5"
          tagBorder="#ef4444"
          borderColor="#ef4444"
          glowColor="rgba(239, 68, 68, 0.2)"
          title="The Infamous Green Micro-LED"
          description="0.15 Lumens • Left-edge diode • Deliberate battery-saving trade-off"
          bottom={110}
        />
      )}

      {/* Card 2: The Strap Lifespan (310+) */}
      {frame >= 305 && (
        <AnimatedCard
          startFrame={312}
          exitLeadFrames={25}
          tagText="Honest Critique #2"
          tagBg="rgba(120, 53, 15, 0.9)"
          tagColor="#fde047"
          tagBorder="#eab308"
          borderColor="#eab308"
          glowColor="rgba(234, 179, 8, 0.2)"
          title="Polyurethane Strap Oxidation"
          description="3–4 Year lifespan • Easily upgraded with $5 Ballistic NATO strap"
          bottom={110}
        />
      )}

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
