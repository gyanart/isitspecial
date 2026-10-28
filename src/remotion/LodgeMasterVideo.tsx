import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene01TeflonParadox } from "./scenes/lodge/Scene01TeflonParadox";
import { Scene02TennesseeOrigin } from "./scenes/lodge/Scene02TennesseeOrigin";
import { Scene03MoltenIronPour } from "./scenes/lodge/Scene03MoltenIronPour";
import { Scene04ThermalDropFlaw } from "./scenes/lodge/Scene04ThermalDropFlaw";
import { Scene05ThermalInertiaMass } from "./scenes/lodge/Scene05ThermalInertiaMass";
import { Scene06MaillardCrustSear } from "./scenes/lodge/Scene06MaillardCrustSear";
import { Scene07PolymerizationPatina } from "./scenes/lodge/Scene07PolymerizationPatina";
import { Scene08AntiFragileRestoration } from "./scenes/lodge/Scene08AntiFragileRestoration";
import { Scene09HeftHandleHeat } from "./scenes/lodge/Scene09HeftHandleHeat";
import { Scene10MaintenanceRitual } from "./scenes/lodge/Scene10MaintenanceRitual";
import { Scene11CostPerUse } from "./scenes/lodge/Scene11CostPerUse";
import { Scene12VerdictTrueGem } from "./scenes/lodge/Scene12VerdictTrueGem";

export const LODGE_MASTER_VIDEO_DURATION_FRAMES = 7346;

/**
 * 12-Scene Master Sequence for Lodge Cast Iron Skillet (~4m 05s / 7,346 frames @ 30fps).
 * Optical cross-dissolve with zero dips to black.
 */
export const LodgeMasterVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      <Series>
        {/* Scene 1: The $300 Teflon Paradox (666 frames / ~22.20s) */}
        <Series.Sequence durationInFrames={666}>
          <Scene01TeflonParadox />
        </Series.Sequence>

        {/* Scene 2: 1896 South Pittsburg, Tennessee (618 frames / ~20.60s) */}
        <Series.Sequence durationInFrames={618}>
          <Scene02TennesseeOrigin />
        </Series.Sequence>

        {/* Scene 3: The 2,800°F Sand-Casting Foundry (604 frames / ~20.13s) */}
        <Series.Sequence durationInFrames={604}>
          <Scene03MoltenIronPour />
        </Series.Sequence>

        {/* Scene 4: The Thermodynamic Flaw of Teflon (603 frames / ~20.10s) */}
        <Series.Sequence durationInFrames={603}>
          <Scene04ThermalDropFlaw />
        </Series.Sequence>

        {/* Scene 5: 5.4 Pounds of Thermal Inertia (570 frames / ~19.00s) */}
        <Series.Sequence durationInFrames={570}>
          <Scene05ThermalInertiaMass />
        </Series.Sequence>

        {/* Scene 6: The Maillard Caramelization Reaction (532 frames / ~17.73s) */}
        <Series.Sequence durationInFrames={532}>
          <Scene06MaillardCrustSear />
        </Series.Sequence>

        {/* Scene 7: The Polymerization Chemistry Patina (650 frames / ~21.67s) */}
        <Series.Sequence durationInFrames={650}>
          <Scene07PolymerizationPatina />
        </Series.Sequence>

        {/* Scene 8: The Anti-Fragile Restoration Miracle (608 frames / ~20.27s) */}
        <Series.Sequence durationInFrames={608}>
          <Scene08AntiFragileRestoration />
        </Series.Sequence>

        {/* Scene 9: The Honest Friction: Heft & Heat (617 frames / ~20.57s) */}
        <Series.Sequence durationInFrames={617}>
          <Scene09HeftHandleHeat />
        </Series.Sequence>

        {/* Scene 10: The Two-Minute Maintenance Ritual (598 frames / ~19.93s) */}
        <Series.Sequence durationInFrames={598}>
          <Scene10MaintenanceRitual />
        </Series.Sequence>

        {/* Scene 11: The True Cost-Per-Use Equation (599 frames / ~19.97s) */}
        <Series.Sequence durationInFrames={599}>
          <Scene11CostPerUse />
        </Series.Sequence>

        {/* Scene 12: The Special Index Score & Verdict (681 frames / ~22.70s) */}
        <Series.Sequence durationInFrames={681}>
          <Scene12VerdictTrueGem />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
