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
    endFrame: 260,
    text: "Because counterfeiters produce millions of fake copies, Casio baked in a secret hardware diagnostic.",
  },
  {
    startFrame: 260,
    endFrame: 570,
    text: "Hold down the bottom-right button for three seconds, and the LCD controller reveals the word 'C-A-S-I-O'. If those letters don't appear, you're holding a fake.",
  },
];

export const Scene11SecretCasioDiagnostic: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.14, 1.25], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [0, -20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/casio/casio_scene11_in.mp3")} />

      <SceneBackground
        currentImage="images/casio-scene-11-secret-casio-diagnostic.jpg"
        prevImage="images/casio-scene-10-honest-flaws-light-strap.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={22}
        tagText="Secret Hardware Easter Egg"
        tagBg="rgba(6, 78, 59, 0.9)"
        tagColor="#34d399"
        tagBorder="#10b981"
        borderColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.2)"
        title="Hardware ROM Check: 'C A S I O'"
        description="Hold Button C for 3 seconds • Built-in counterfeit test • Instant authentication"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
