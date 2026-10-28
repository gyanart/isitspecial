import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene01CafeContrast } from "./scenes/moka/Scene01CafeContrast";
import { Scene02AlfonsoBialetti } from "./scenes/moka/Scene02AlfonsoBialetti";
import { Scene03MoMAGallery } from "./scenes/moka/Scene03MoMAGallery";
import { Scene04ExplodedComponents } from "./scenes/moka/Scene04ExplodedComponents";
import { Scene05EspressoExtraction } from "./scenes/moka/Scene05EspressoExtraction";
import { Scene06OctagonalFacets } from "./scenes/moka/Scene06OctagonalFacets";
import { Scene07SeasonedPatina } from "./scenes/moka/Scene07SeasonedPatina";
import { Scene08SafetyValveGasket } from "./scenes/moka/Scene08SafetyValveGasket";
import { Scene09StovetopBrewing } from "./scenes/moka/Scene09StovetopBrewing";
import { Scene10MustacheMascot } from "./scenes/moka/Scene10MustacheMascot";
import { Scene11CostPerUse } from "./scenes/moka/Scene11CostPerUse";
import { Scene12VerdictMasterpiece } from "./scenes/moka/Scene12VerdictMasterpiece";

export const MOKA_MASTER_VIDEO_DURATION_FRAMES = 6428;

/**
 * 12-Scene Master Sequence for Bialetti Moka Express Stovetop Coffee Maker (~3m 34s).
 * Seamless optical cross-dissolve with zero dips to black.
 */
export const MokaMasterVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      <Series>
        {/* Scene 1: $3,000 Machine vs $35 Moka Pot (586 frames / ~19.53s) */}
        <Series.Sequence durationInFrames={586}>
          <Scene01CafeContrast />
        </Series.Sequence>

        {/* Scene 2: 1933 Alfonso Bialetti & The Laundry Boiler (607 frames / ~20.23s) */}
        <Series.Sequence durationInFrames={607}>
          <Scene02AlfonsoBialetti />
        </Series.Sequence>

        {/* Scene 3: 300 Million Sold & MoMA Permanent Collection (482 frames / ~16.07s) */}
        <Series.Sequence durationInFrames={482}>
          <Scene03MoMAGallery />
        </Series.Sequence>

        {/* Scene 4: 1.5 Bar Thermodynamic Steam Engine (565 frames / ~18.83s) */}
        <Series.Sequence durationInFrames={565}>
          <Scene04ExplodedComponents />
        </Series.Sequence>

        {/* Scene 5: Sub-Boiling Extraction Dynamics (537 frames / ~17.90s) */}
        <Series.Sequence durationInFrames={537}>
          <Scene05EspressoExtraction />
        </Series.Sequence>

        {/* Scene 6: Octagonal Aluminum Heat Diffusion (533 frames / ~17.77s) */}
        <Series.Sequence durationInFrames={533}>
          <Scene06OctagonalFacets />
        </Series.Sequence>

        {/* Scene 7: Aluminum Oxide Shield & Nonna's Soap Ban (514 frames / ~17.13s) */}
        <Series.Sequence durationInFrames={514}>
          <Scene07SeasonedPatina />
        </Series.Sequence>

        {/* Scene 8: Brass Safety Valve & Gasket (445 frames / ~14.83s) */}
        <Series.Sequence durationInFrames={445}>
          <Scene08SafetyValveGasket />
        </Series.Sequence>

        {/* Scene 9: The Golden Rule: Preheating on Stove (576 frames / ~19.20s) */}
        <Series.Sequence durationInFrames={576}>
          <Scene09StovetopBrewing />
        </Series.Sequence>

        {/* Scene 10: Renato Bialetti & Mustache Mascot Lore (621 frames / ~20.70s) */}
        <Series.Sequence durationInFrames={621}>
          <Scene10MustacheMascot />
        </Series.Sequence>

        {/* Scene 11: True Cost-Per-Use Equation ($0.003/cup) (486 frames / ~16.20s) */}
        <Series.Sequence durationInFrames={486}>
          <Scene11CostPerUse />
        </Series.Sequence>

        {/* Scene 12: The Special Score & Verdict (9.1 / 10 True Gem) (476 frames / ~15.87s) */}
        <Series.Sequence durationInFrames={476}>
          <Scene12VerdictMasterpiece />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
