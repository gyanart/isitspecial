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
import { Thumbnail } from "./Thumbnail";
import { BicMasterVideo, BIC_MASTER_VIDEO_DURATION_FRAMES } from "./BicMasterVideo";
import { BicThumbnail } from "./BicThumbnail";
import { CasioMasterVideo } from "./CasioMasterVideo";
import { CasioThumbnail } from "./CasioThumbnail";

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

      {/* 2. Video 2: Bic Cristal Master Video Essay (~2m 34s) */}
      <Composition
        id="BicCristalMaster"
        component={BicMasterVideo}
        durationInFrames={BIC_MASTER_VIDEO_DURATION_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 3. Video 3: Casio F-91W 4-Minute Master Video Essay (7,200 frames @ 30fps) */}
      <Composition
        id="CasioMaster"
        component={CasioMasterVideo}
        durationInFrames={7200}
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

      {/* 3. YouTube Thumbnail Compositions (1920x1080 Full HD with Viral Hook Stickers) */}
      <Composition
        id="ThumbnailWin"
        component={() => <Thumbnail variant="how-did-it-win" />}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ThumbnailBeat"
        component={() => <Thumbnail variant="it-beat-this" />}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ThumbnailBetter"
        component={() => <Thumbnail variant="better-coffee" />}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 4. Bic Cristal YouTube Thumbnail Compositions */}
      <Composition
        id="BicThumbnailBeat"
        component={() => <BicThumbnail variant="it-beat-600" />}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BicThumbnailLegal"
        component={() => <BicThumbnail variant="how-is-this-legal" />}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BicThumbnailMoMA"
        component={() => <BicThumbnail variant="moma-bought-this" />}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 5. Casio F-91W YouTube Thumbnail Compositions */}
      <Composition
        id="CasioThumbnailBeat"
        component={() => <CasioThumbnail variant="it-beat-10000" />}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CasioThumbnailWhy"
        component={() => <CasioThumbnail variant="why-is-this-15" />}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CasioThumbnailRolex"
        component={() => <CasioThumbnail variant="rolex-killer" />}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
