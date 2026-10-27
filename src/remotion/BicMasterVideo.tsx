import React from "react";
import { Series } from "remotion";
import { Scene01LuxuryParadox } from "./scenes/bic/Scene01LuxuryParadox";
import { Scene02ParisOrigin } from "./scenes/bic/Scene02ParisOrigin";
import { Scene03MoMAGallery } from "./scenes/bic/Scene03MoMAGallery";
import { Scene04TungstenBall } from "./scenes/bic/Scene04TungstenBall";
import { Scene05BrassSocket } from "./scenes/bic/Scene05BrassSocket";
import { Scene06BarrelPinhole } from "./scenes/bic/Scene06BarrelPinhole";
import { Scene07SafetyCap } from "./scenes/bic/Scene07SafetyCap";
import { Scene08HexagonalGeometry } from "./scenes/bic/Scene08HexagonalGeometry";
import { Scene09TwoMileLine } from "./scenes/bic/Scene09TwoMileLine";
import { Scene10DemocraticDesign } from "./scenes/bic/Scene10DemocraticDesign";
import { Scene11CostPerUse } from "./scenes/bic/Scene11CostPerUse";
import { Scene12VerdictMasterpiece } from "./scenes/bic/Scene12VerdictMasterpiece";

export const BIC_MASTER_VIDEO_DURATION_FRAMES = 4625; // ~154.2s (2m 34s) @ 30fps

export const BicMasterVideo: React.FC = () => {
  return (
    <Series>
      {/* Scene 01: The Luxury Paradox ($600 Montblanc vs $0.30 Bic, 18.17s) */}
      <Series.Sequence durationInFrames={545}>
        <Scene01LuxuryParadox />
      </Series.Sequence>

      {/* Scene 02: 1950 Paris Origin (Marcel Bich & László Bíró, 13.33s) */}
      <Series.Sequence durationInFrames={400}>
        <Scene02ParisOrigin />
      </Series.Sequence>

      {/* Scene 03: 100 Billion Sold & MoMA Permanent Collection (10.83s) */}
      <Series.Sequence durationInFrames={325}>
        <Scene03MoMAGallery />
      </Series.Sequence>

      {/* Scene 04: The 0.1-Micron Tungsten Carbide Ball (13.17s) */}
      <Series.Sequence durationInFrames={395}>
        <Scene04TungstenBall />
      </Series.Sequence>

      {/* Scene 05: The Milled Brass Socket & Capillary Feed (12.50s) */}
      <Series.Sequence durationInFrames={375}>
        <Scene05BrassSocket />
      </Series.Sequence>

      {/* Scene 06: Atmospheric Barometer Barrel Pinhole (12.50s) */}
      <Series.Sequence durationInFrames={375}>
        <Scene06BarrelPinhole />
      </Series.Sequence>

      {/* Scene 07: 1991 Ventilated Safety Cap (14.17s) */}
      <Series.Sequence durationInFrames={425}>
        <Scene07SafetyCap />
      </Series.Sequence>

      {/* Scene 08: Hexagonal Anti-Roll Geometry (12.83s) */}
      <Series.Sequence durationInFrames={385}>
        <Scene08HexagonalGeometry />
      </Series.Sequence>

      {/* Scene 09: 3 Kilometers of Continuous Writing (11.83s) */}
      <Series.Sequence durationInFrames={355}>
        <Scene09TwoMileLine />
      </Series.Sequence>

      {/* Scene 10: Democratic Design & The Billionaire Paradox (10.00s) */}
      <Series.Sequence durationInFrames={300}>
        <Scene10DemocraticDesign />
      </Series.Sequence>

      {/* Scene 11: True Cost-Per-Use Equation ($0.0001/page, 12.50s) */}
      <Series.Sequence durationInFrames={375}>
        <Scene11CostPerUse />
      </Series.Sequence>

      {/* Scene 12: The Special Index Score & Verdict (9.8/10, 12.33s) */}
      <Series.Sequence durationInFrames={370}>
        <Scene12VerdictMasterpiece />
      </Series.Sequence>
    </Series>
  );
};
