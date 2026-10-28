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
    endFrame: 290,
    text: "Invented in 1933 by Alfonso Bialetti in Omegna, Italy, the design was inspired by an unlikely machine: a primitive laundry boiler.",
  },
  {
    startFrame: 290,
    endFrame: 600,
    text: "Bialetti noticed boiling water rising through a central pipe and realized the exact same thermodynamic principle could brew concentrated coffee.",
  },
];

export const Scene02AlfonsoBialetti: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [15, -15], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/moka/moka_scene02_in.mp3")} />

      <SceneBackground
        currentImage="images/moka-scene-02-alfonso-bialetti.jpg"
        prevImage="images/moka-scene-01-cafe-contrast.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Industrial Design Lore"
        tagBg="rgba(30, 58, 138, 0.9)"
        tagColor="#93c5fd"
        tagBorder="#3b82f6"
        borderColor="#3b82f6"
        glowColor="rgba(59, 130, 246, 0.2)"
        title="Omegna, Italy • 1933 Origin"
        description="Inventor: Alfonso Bialetti • Inspired by 'lisciveuse' steam laundry boilers"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
