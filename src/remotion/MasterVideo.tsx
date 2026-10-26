import React from "react";
import { Series } from "remotion";
import { Scene01LuxuryContrast } from "./scenes/Scene01LuxuryContrast";
import { Scene02Origin } from "./scenes/Scene02Origin";
import { Scene03WorldChampionship } from "./scenes/Scene03WorldChampionship";
import { Scene04ChannelingDefect } from "./scenes/Scene04ChannelingDefect";
import { Scene05TotalImmersion } from "./scenes/Scene05TotalImmersion";
import { Scene06SubBoilingChemistry } from "./scenes/Scene06SubBoilingChemistry";
import { Scene07PneumaticPressure } from "./scenes/Scene07PneumaticPressure";
import { Scene08MicroPaperMembrane } from "./scenes/Scene08MicroPaperMembrane";
import { Scene09PolypropyleneDurability } from "./scenes/Scene09PolypropyleneDurability";
import { Scene10SqueegeePuckEjection } from "./scenes/Scene10SqueegeePuckEjection";
import { Scene11CostPerUse } from "./scenes/Scene11CostPerUse";
import { Scene12SpecialScoreVerdict } from "./scenes/Scene12SpecialScoreVerdict";

export const MASTER_VIDEO_DURATION_FRAMES = 3995; // ~133.2s (2m 13s) @ 30fps

export const MasterVideo: React.FC = () => {
  return (
    <Series>
      {/* Scene 01: The Luxury Contrast (11.67s) */}
      <Series.Sequence durationInFrames={350}>
        <Scene01LuxuryContrast />
      </Series.Sequence>

      {/* Scene 02: The Stanford Aerodynamics Origin (12.33s) */}
      <Series.Sequence durationInFrames={370}>
        <Scene02Origin />
      </Series.Sequence>

      {/* Scene 03: World AeroPress Championship (11.83s) */}
      <Series.Sequence durationInFrames={355}>
        <Scene03WorldChampionship />
      </Series.Sequence>

      {/* Scene 04: The Channeling Defect (11.00s) */}
      <Series.Sequence durationInFrames={330}>
        <Scene04ChannelingDefect />
      </Series.Sequence>

      {/* Scene 05: Total Immersion Uniformity (11.67s) */}
      <Series.Sequence durationInFrames={350}>
        <Scene05TotalImmersion />
      </Series.Sequence>

      {/* Scene 06: Sub-Boiling Extraction Chemistry (12.33s) */}
      <Series.Sequence durationInFrames={370}>
        <Scene06SubBoilingChemistry />
      </Series.Sequence>

      {/* Scene 07: Pneumatic Air Pressure (10.00s) */}
      <Series.Sequence durationInFrames={300}>
        <Scene07PneumaticPressure />
      </Series.Sequence>

      {/* Scene 08: The Micro-Paper Membrane (10.33s) */}
      <Series.Sequence durationInFrames={310}>
        <Scene08MicroPaperMembrane />
      </Series.Sequence>

      {/* Scene 09: Polypropylene Durability (10.17s) */}
      <Series.Sequence durationInFrames={305}>
        <Scene09PolypropyleneDurability />
      </Series.Sequence>

      {/* Scene 10: 3-Second Squeegee Puck Ejection (10.67s) */}
      <Series.Sequence durationInFrames={320}>
        <Scene10SqueegeePuckEjection />
      </Series.Sequence>

      {/* Scene 11: True Cost-Per-Use Equation (10.17s) */}
      <Series.Sequence durationInFrames={305}>
        <Scene11CostPerUse />
      </Series.Sequence>

      {/* Scene 12: The Special Index Score & Verdict (11.00s) */}
      <Series.Sequence durationInFrames={330}>
        <Scene12SpecialScoreVerdict />
      </Series.Sequence>
    </Series>
  );
};
