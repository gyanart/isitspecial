import React from "react";
import { Composition } from "remotion";
import { MasterVideo, MASTER_VIDEO_DURATION_FRAMES } from "./MasterVideo";
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

export const Root: React.FC = () => {
  return (
    <>
      {/* 1. Master Sequence: Full 12-Scene Cinematic Video Essay (~2m 11s) */}
      <Composition
        id="AeroPressMaster"
        component={MasterVideo}
        durationInFrames={MASTER_VIDEO_DURATION_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 2. Individual Scene Compositions (Can be rendered as individual Shorts / Reels) */}
      <Composition
        id="Scene01"
        component={Scene01LuxuryContrast}
        durationInFrames={350}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene02"
        component={Scene02Origin}
        durationInFrames={355}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene03"
        component={Scene03WorldChampionship}
        durationInFrames={355}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene04"
        component={Scene04ChannelingDefect}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene05"
        component={Scene05TotalImmersion}
        durationInFrames={340}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene06"
        component={Scene06SubBoilingChemistry}
        durationInFrames={350}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene07"
        component={Scene07PneumaticPressure}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene08"
        component={Scene08MicroPaperMembrane}
        durationInFrames={305}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene09"
        component={Scene09PolypropyleneDurability}
        durationInFrames={305}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene10"
        component={Scene10SqueegeePuckEjection}
        durationInFrames={320}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene11"
        component={Scene11CostPerUse}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene12"
        component={Scene12SpecialScoreVerdict}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
