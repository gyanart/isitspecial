import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Series,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const LODGE_SHORT_DURATION_FRAMES = 1715;

interface ShortSegmentProps {
  audioFile: string;
  image: string;
  prevImage?: string;
  tag: string;
  title: string;
  caption: string;
  metricLabel: string;
  metricValue: string;
  isLastScene?: boolean;
}

const ShortSegment: React.FC<ShortSegmentProps> = ({
  audioFile,
  image,
  prevImage,
  tag,
  title,
  caption,
  metricLabel,
  metricValue,
  isLastScene = false,
}) => {
  const frame = useCurrentFrame();

  // 1. Ken Burns Gentle Zoom (1.02 -> 1.10)
  const scale = interpolate(frame, [0, 400], [1.02, 1.10], {
    extrapolateRight: "clamp",
  });

  // 2. Optical Cross-Dissolve: Fade currentImage in over prevImage (0 -> 1 over 20 frames)
  const imageOpacity = prevImage
    ? interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" })
    : 1;

  // 3. Card & HUD Entry Animation (Pop & Fade)
  const cardTranslateY = interpolate(frame, [0, 18], [30, 0], {
    extrapolateRight: "clamp",
  });
  const cardOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 4. End of Video Fade to Black (Only on the very last scene)
  const fadeOutOpacity = isLastScene
    ? interpolate(frame, [165, 199], [1, 0], { extrapolateRight: "clamp" })
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        overflow: "hidden",
        fontFamily: "'Segoe UI', -apple-system, Roboto, sans-serif",
        opacity: fadeOutOpacity,
      }}
    >
      {/* Voiceover Track */}
      <Audio src={staticFile(audioFile)} />

      {/* 1. LAYER A: Previous Scene Background (Guarantees transparent dissolve with NO black flash) */}
      {prevImage && (
        <AbsoluteFill>
          <Img
            src={staticFile(prevImage)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(20px) brightness(0.35)",
              transform: "scale(1.15)",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 2. LAYER B: Current Scene Blurred Ambient Backdrop */}
      <AbsoluteFill style={{ opacity: imageOpacity }}>
        <Img
          src={staticFile(image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(22px) brightness(0.32)",
            transform: `scale(${scale * 1.05})`,
          }}
        />
      </AbsoluteFill>

      {/* 3. Dark Gradient Overlay for High Readability */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.2) 35%, rgba(2,6,23,0.4) 65%, rgba(2,6,23,0.95) 100%)",
        }}
      />

      {/* 4. Top Header Branding Pill */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 24px",
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: "1.5px solid rgba(16, 185, 129, 0.4)",
            borderRadius: 9999,
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 10px #10b981",
            }}
          />
          <span
            style={{
              color: "#ffffff",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            IS IT SPECIAL?
          </span>
          <span style={{ color: "#64748b", fontSize: 18 }}>•</span>
          <span
            style={{
              color: "#34d399",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            {tag}
          </span>
        </div>
      </div>

      {/* 5. Center Focused Visual Card (16:9 Cinema Container in 9:16 Frame) */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 48,
          right: 48,
          height: 800,
          borderRadius: 28,
          overflow: "hidden",
          border: "2px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
          zIndex: 20,
          backgroundColor: "#0f172a",
        }}
      >
        {/* Previous Image Underneath (Layer A) */}
        {prevImage && (
          <AbsoluteFill>
            <Img
              src={staticFile(prevImage)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </AbsoluteFill>
        )}

        {/* Current Image Fading In (Layer B) */}
        <AbsoluteFill style={{ opacity: imageOpacity }}>
          <Img
            src={staticFile(image)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${scale})`,
            }}
          />
        </AbsoluteFill>

        {/* Inner Card Top Left Title Badge */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            padding: "8px 18px",
            backgroundColor: "rgba(2, 6, 23, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 12,
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              color: "#f8fafc",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            {title}
          </span>
        </div>
      </div>

      {/* 6. Dynamic HUD Telemetry Card */}
      <div
        style={{
          position: "absolute",
          top: 1080,
          left: 48,
          right: 48,
          transform: `translateY(${cardTranslateY}px)`,
          opacity: cardOpacity,
          zIndex: 25,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 32px",
            backgroundColor: "rgba(15, 23, 42, 0.88)",
            border: "1.5px solid rgba(16, 185, 129, 0.35)",
            borderRadius: 20,
            backdropFilter: "blur(16px)",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div>
            <div
              style={{
                color: "#94a3b8",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              {metricLabel}
            </div>
            <div
              style={{
                color: "#10b981",
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: -0.5,
                marginTop: 2,
              }}
            >
              {metricValue}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              borderRadius: 12,
            }}
          >
            <span style={{ color: "#34d399", fontSize: 16, fontWeight: 800 }}>
              VERIFIED DATA
            </span>
          </div>
        </div>
      </div>

      {/* 7. Captions Container (High Contrast, Bold Mobile Subtitles) */}
      <div
        style={{
          position: "absolute",
          top: 1250,
          left: 48,
          right: 48,
          height: 380,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 30,
        }}
      >
        <div
          style={{
            padding: "24px 32px",
            backgroundColor: "rgba(2, 6, 23, 0.85)",
            border: "1.5px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 24,
            backdropFilter: "blur(20px)",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: 38,
              lineHeight: 1.35,
              fontWeight: 800,
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            {caption}
          </p>
        </div>
      </div>

      {/* 8. Bottom Brand Call-to-Action */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              color: "#34d399",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            THE SPECIAL INDEX™
          </span>
        </div>
        <span
          style={{
            color: "#94a3b8",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          www.isitspecial.com
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const LodgeShortVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      <Series>
        {/* Segment 1: The $300 Teflon Paradox (218 frames / ~7.25s) */}
        <Series.Sequence durationInFrames={218}>
          <ShortSegment
            audioFile="audio/lodge_short/seg01_hook.mp3"
            image="images/lodge-scene-01-teflon-contrast.jpg"
            tag="THE PARADOX"
            title="$25 Iron vs $300 Teflon"
            caption="Why does a $25 piece of iron from Tennessee out-cook a $300 luxury non-stick pan?"
            metricLabel="PRICE GAP"
            metricValue="$25 vs $300"
          />
        </Series.Sequence>

        {/* Segment 2: 1896 Sand-Casting Foundry Origin (398 frames / ~13.25s) */}
        <Series.Sequence durationInFrames={398}>
          <ShortSegment
            audioFile="audio/lodge_short/seg02_foundry.mp3"
            image="images/lodge-scene-03-molten-iron-pour.jpg"
            prevImage="images/lodge-scene-01-teflon-contrast.jpg"
            tag="1896 ORIGIN"
            title="2,800°F Sand-Casting Foundry"
            caption="Since 1896 in South Pittsburg, Tennessee, Lodge has poured 2,800-degree molten pig iron into sand molds. Zero shortcuts. Zero plastic."
            metricLabel="FOUNDRY TEMP"
            metricValue="2,800°F Molten Iron"
          />
        </Series.Sequence>

        {/* Segment 3: Thermal Inertia & Maillard Reaction (347 frames / ~11.57s) */}
        <Series.Sequence durationInFrames={347}>
          <ShortSegment
            audioFile="audio/lodge_short/seg03_physics.mp3"
            image="images/lodge-scene-06-maillard-crust-sear.jpg"
            prevImage="images/lodge-scene-03-molten-iron-pour.jpg"
            tag="THERMAL DYNAMICS"
            title="Thermal Inertia & Searing"
            caption="Thin aluminum drops 150 degrees and boils meat. 5.4 pounds of dense iron holds thermal inertia, searing steaks with the Maillard reaction."
            metricLabel="HEAT CAPACITY"
            metricValue="3.7 MJ/m³·K"
          />
        </Series.Sequence>

        {/* Segment 4: Polymerization Patina Chemistry (251 frames / ~8.38s) */}
        <Series.Sequence durationInFrames={251}>
          <ShortSegment
            audioFile="audio/lodge_short/seg04_chemistry.mp3"
            image="images/lodge-scene-07-polymerization-patina.jpg"
            prevImage="images/lodge-scene-06-maillard-crust-sear.jpg"
            tag="ORGANIC CHEMISTRY"
            title="The Natural Carbon Patina"
            caption="Heated past smoke point, vegetable oil polymerizes into a glassy carbon patina that gets slicker with every single cook."
            metricLabel="SURFACE COATING"
            metricValue="Cross-Linked Carbon"
          />
        </Series.Sequence>

        {/* Segment 5: 100-Year Lifespan & Cost-Per-Use (302 frames / ~10.06s) */}
        <Series.Sequence durationInFrames={302}>
          <ShortSegment
            audioFile="audio/lodge_short/seg05_cpu.mp3"
            image="images/lodge-scene-08-anti-fragile-restoration.jpg"
            prevImage="images/lodge-scene-07-polymerization-patina.jpg"
            tag="ECONOMICS"
            title="100-Year Anti-Fragility"
            caption="Scratched Teflon hits a landfill in three years. Cast iron can be restored with steel wool and lasts a century for one-fifth of a cent per meal."
            metricLabel="HARDWARE COST"
            metricValue="$0.002 / Meal"
          />
        </Series.Sequence>

        {/* Segment 6: Special Scorecard & Verdict (199 frames / ~6.63s) */}
        <Series.Sequence durationInFrames={199}>
          <ShortSegment
            audioFile="audio/lodge_short/seg06_verdict.mp3"
            image="images/lodge-scene-12-verdict-true-gem.jpg"
            prevImage="images/lodge-scene-08-anti-fragile-restoration.jpg"
            tag="SPECIAL INDEX™"
            title="The Unvarnished Verdict"
            caption="The Lodge Cast Iron Skillet scores 9.2 out of 10 on the Special Index: A True Gem."
            metricLabel="SPECIAL SCORE"
            metricValue="9.2 / 10 • True Gem"
            isLastScene={true}
          />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
