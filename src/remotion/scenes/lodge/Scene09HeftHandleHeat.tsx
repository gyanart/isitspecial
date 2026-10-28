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

const CAPTIONS: CaptionSegment[] = [{"startFrame": 0, "endFrame": 280, "text": "Cast iron demands respect. At five and a half pounds, single-handed wrist tossing is impossible."}, {"startFrame": 280, "endFrame": 617, "text": "Furthermore, iron conducts heat into the entire handle, requiring a silicone sleeve or folded towel. And long, acidic tomato reductions will strip the natural seasoning."}];

export const Scene09HeftHandleHeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.22], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.0, 0.2, 1),
  });

  const panY = interpolate(frame, [0, durationInFrames], [10, -10], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden", fontFamily: "Segoe UI, Inter, sans-serif" }}>
      <Audio src={staticFile("audio/lodge/lodge_scene09_in.mp3")} />

      <SceneBackground
        currentImage="images/lodge-scene-09-heft-handle-heat.jpg"
        prevImage="images/lodge-scene-08-anti-fragile-restoration.jpg"
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
        
      />

      <HeaderBadge />

      <AnimatedCard
        startFrame={15}
        exitLeadFrames={25}
        tagText="The Honest Friction"
        tagBg="rgba(120, 53, 15, 0.9)"
        tagColor="#fbbf24"
        tagBorder="#f59e0b"
        borderColor="rgba(245, 158, 11, 0.85)"
        glowColor="rgba(245, 158, 11, 0.2)"
        title="5.4 lbs Weight & 400°F Handle Heat"
        description="Requires serious forearm strength • Handle conducts full burner heat • Sensitive to long acidic wine/tomato simmers"
        bottom={110}
      />

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
