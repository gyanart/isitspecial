import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene01SwissParadox } from "./scenes/casio/Scene01SwissParadox";
import { Scene02TokyoBlueprint } from "./scenes/casio/Scene02TokyoBlueprint";
import { Scene03ThreeMillionUnits } from "./scenes/casio/Scene03ThreeMillionUnits";
import { Scene04FeatherweightScale } from "./scenes/casio/Scene04FeatherweightScale";
import { Scene05QuartzOscillator } from "./scenes/casio/Scene05QuartzOscillator";
import { Scene06CR2016Battery } from "./scenes/casio/Scene06CR2016Battery";
import { Scene07TortureTest } from "./scenes/casio/Scene07TortureTest";
import { Scene08GasketHydrostaticSeal } from "./scenes/casio/Scene08GasketHydrostaticSeal";
import { Scene09DemographicChameleon } from "./scenes/casio/Scene09DemographicChameleon";
import { Scene10HonestFlawsLightStrap } from "./scenes/casio/Scene10HonestFlawsLightStrap";
import { Scene11SecretCasioDiagnostic } from "./scenes/casio/Scene11SecretCasioDiagnostic";
import { Scene12CostPerUseEquation } from "./scenes/casio/Scene12CostPerUseEquation";
import { Scene13VerdictMasterpiece } from "./scenes/casio/Scene13VerdictMasterpiece";

/**
 * 4-Minute (7,200 frames @ 30fps) Master Sequence for Casio F-91W Watch.
 * Clean, seamless optical cross-dissolve with zero dips to black.
 */
export const CasioMasterVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      <Series>
        {/* Scene 1: The Swiss Luxury Paradox (611 frames / ~20.37s) */}
        <Series.Sequence durationInFrames={611}>
          <Scene01SwissParadox />
        </Series.Sequence>

        {/* Scene 2: 1989 Tokyo Origin & Ryusuke Moriai (587 frames / ~19.57s) */}
        <Series.Sequence durationInFrames={587}>
          <Scene02TokyoBlueprint />
        </Series.Sequence>

        {/* Scene 3: 3 Million Units Per Year (535 frames / ~17.83s) */}
        <Series.Sequence durationInFrames={535}>
          <Scene03ThreeMillionUnits />
        </Series.Sequence>

        {/* Scene 4: The 21-Gram Featherweight (436 frames / ~14.53s) */}
        <Series.Sequence durationInFrames={436}>
          <Scene04FeatherweightScale />
        </Series.Sequence>

        {/* Scene 5: The 32,768 Hz Synthetic Quartz Heart (632 frames / ~21.07s) */}
        <Series.Sequence durationInFrames={632}>
          <Scene05QuartzOscillator />
        </Series.Sequence>

        {/* Scene 6: The 7-to-10 Year CR2016 Battery Paradox (605 frames / ~20.17s) */}
        <Series.Sequence durationInFrames={605}>
          <Scene06CR2016Battery />
        </Series.Sequence>

        {/* Scene 7: Accidental Indestructibility & Torture Tests (603 frames / ~20.10s) */}
        <Series.Sequence durationInFrames={603}>
          <Scene07TortureTest />
        </Series.Sequence>

        {/* Scene 8: The Gasket & Hydrostatic Seal (481 frames / ~16.03s) */}
        <Series.Sequence durationInFrames={481}>
          <Scene08GasketHydrostaticSeal />
        </Series.Sequence>

        {/* Scene 9: The Demographic Chameleon (550 frames / ~18.33s) */}
        <Series.Sequence durationInFrames={550}>
          <Scene09DemographicChameleon />
        </Series.Sequence>

        {/* Scene 10: The Flaws: Micro-Light & Resin Strap (623 frames / ~20.77s) */}
        <Series.Sequence durationInFrames={623}>
          <Scene10HonestFlawsLightStrap />
        </Series.Sequence>

        {/* Scene 11: The Secret 'CASIO' Hardware Diagnostic (578 frames / ~19.27s) */}
        <Series.Sequence durationInFrames={578}>
          <Scene11SecretCasioDiagnostic />
        </Series.Sequence>

        {/* Scene 12: The Mathematical Cost-Per-Use Equation (486 frames / ~16.20s) */}
        <Series.Sequence durationInFrames={486}>
          <Scene12CostPerUseEquation />
        </Series.Sequence>

        {/* Scene 13: The Special Score & Verdict (473 frames / ~15.77s) */}
        <Series.Sequence durationInFrames={473}>
          <Scene13VerdictMasterpiece />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
