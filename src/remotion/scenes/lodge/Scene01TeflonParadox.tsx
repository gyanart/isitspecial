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

const CAPTIONS: CaptionSegment[] = [{"startFrame": 0, "endFrame": 315, "text": "Walk into any luxury culinary boutique in New York, Paris, or Tokyo, and you are surrounded by walls of pastel-colored non-stick pans costing up to three hundred dollars."}, {"startFrame": 315, "endFrame": 666, "text": "Yet inside professional restaurant kitchens, chefs rely on a heavy, raw black disk from Tennessee that costs twenty-five dollars: The Lodge Cast Iron Skillet."}];

export const Scene01TeflonParadox: React.FC = () => {
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
      <Audio src={staticFile("audio/lodge/lodge_scene01_in.mp3")} />

      <SceneBackground
        currentImage="images/lodge-scene-01-teflon-contrast.jpg"
        
        transform={`translate(0px, ${panY}px) scale(${zoom})`}
        
      />

      <HeaderBadge />

      {frame < 320 && (
        <AnimatedCard
          startFrame={15}
          exitLeadFrames={durationInFrames - 315}
          tagText="The Status Quo"
          tagBg="rgba(120, 53, 15, 0.9)"
          tagColor="#fbbf24"
          tagBorder="#f59e0b"
          borderColor="rgba(245, 158, 11, 0.85)"
          glowColor="rgba(245, 158, 11, 0.2)"
          title="$300 Luxury Chemical Non-Stick Pans"
          description="PTFE / Ceramic coatings • Delicate polymer layer • 2-to-3 year landfill lifespan"
          bottom={110}
        />
      )}

      {frame >= 315 && (
        <AnimatedCard
          startFrame={322}
          exitLeadFrames={25}
          tagText="The Appalachian Icon"
          tagBg="rgba(6, 78, 59, 0.9)"
          tagColor="#34d399"
          tagBorder="#10b981"
          borderColor="#10b981"
          glowColor="rgba(16, 185, 129, 0.2)"
          title="$25 Lodge Cast Iron Skillet (10.25-Inch)"
          description="5.4 lbs dense molten iron • Zero chemical coatings • Multi-generational heirloom"
          bottom={110}
        />
      )}

      <CaptionBar captions={CAPTIONS} bottom={38} />
    </AbsoluteFill>
  );
};
