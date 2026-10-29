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

export const CASIO_SHORT_DURATION_FRAMES = 1722;

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

  const scale = interpolate(frame, [0, 400], [1.02, 1.10], {
    extrapolateRight: "clamp",
  });

  const imageOpacity = prevImage
    ? interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" })
    : 1;

  const cardTranslateY = interpolate(frame, [0, 18], [30, 0], {
    extrapolateRight: "clamp",
  });
  const cardOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fadeOutOpacity = isLastScene
    ? interpolate(frame, [240, 280], [1, 0], { extrapolateRight: "clamp" })
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
      <Audio src={staticFile(audioFile)} />

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

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.2) 35%, rgba(2,6,23,0.4) 65%, rgba(2,6,23,0.95) 100%)",
        }}
      />

      {/* Top Header Pill */}
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

      {/* Cinema Card Container */}
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

      {/* Dynamic HUD Telemetry Card */}
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

      {/* Captions Container */}
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

      {/* Bottom Brand Anchor */}
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

export const CasioShortVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      <Series>
        {/* Segment 1: The $10,000 Swiss Paradox (231 frames / ~7.70s) */}
        <Series.Sequence durationInFrames={231}>
          <ShortSegment
            audioFile="audio/casio_short/seg01_hook.mp3"
            image="images/casio-scene-01-swiss-paradox.jpg"
            tag="THE PARADOX"
            title="$15 Casio vs $10,000 Rolex"
            caption="Why does a $15 digital watch from 1989 keep better time than a $10,000 Swiss Rolex?"
            metricLabel="PRICE CONTRAST"
            metricValue="$15 vs $10,000"
          />
        </Series.Sequence>

        {/* Segment 2: 1989 Tokyo Origin (300 frames / ~10.00s) */}
        <Series.Sequence durationInFrames={300}>
          <ShortSegment
            audioFile="audio/casio_short/seg02_origin.mp3"
            image="images/casio-scene-02-tokyo-blueprint.jpg"
            prevImage="images/casio-scene-01-swiss-paradox.jpg"
            tag="1989 ORIGIN"
            title="Tokyo Minimalist Design"
            caption="Designed in Tokyo by Ryusuke Moriai, it weighs just 21 grams. Zero CAD software. Over 3 million are sold every year."
            metricLabel="ANNUAL SALES"
            metricValue="3,000,000+ Units/Yr"
          />
        </Series.Sequence>

        {/* Segment 3: 32,768 Hz Quartz Tuning Fork (339 frames / ~11.30s) */}
        <Series.Sequence durationInFrames={339}>
          <ShortSegment
            audioFile="audio/casio_short/seg03_quartz.mp3"
            image="images/casio-scene-05-quartz-oscillator.jpg"
            prevImage="images/casio-scene-02-tokyo-blueprint.jpg"
            tag="HOROLOGY SCIENCE"
            title="32,768 Hz Synthetic Quartz"
            caption="Inside vibrates a synthetic quartz tuning fork at 32,768 hertz, stepped down by a 15-stage binary divider to one pulse per second."
            metricLabel="OSCILLATION"
            metricValue="32,768 Hz ±1s/Day"
          />
        </Series.Sequence>

        {/* Segment 4: Torture Tests & 10-Year Battery (322 frames / ~10.73s) */}
        <Series.Sequence durationInFrames={322}>
          <ShortSegment
            audioFile="audio/casio_short/seg04_durability.mp3"
            image="images/casio-scene-07-torture-test.jpg"
            prevImage="images/casio-scene-05-quartz-oscillator.jpg"
            tag="TORTURE TESTS"
            title="Accidental Indestructibility"
            caption="Its CR2016 battery lasts ten years. It has survived being frozen in ice, boiled in water, and run over by a five-ton truck."
            metricLabel="BATTERY LIFE"
            metricValue="7 - 10 Years"
          />
        </Series.Sequence>

        {/* Segment 5: Secret CASIO Hardware Diagnostic (250 frames / ~8.33s) */}
        <Series.Sequence durationInFrames={250}>
          <ShortSegment
            audioFile="audio/casio_short/seg05_easteregg.mp3"
            image="images/casio-scene-11-secret-casio-diagnostic.jpg"
            prevImage="images/casio-scene-07-torture-test.jpg"
            tag="SECURITY CHIP"
            title="Secret Easter Egg Diagnostic"
            caption="Hold the right button for five seconds, and the screen reveals a secret hardware Easter egg spelling CASIO to expose fakes."
            metricLabel="AUTHENTICITY"
            metricValue="CASIO Display"
          />
        </Series.Sequence>

        {/* Segment 6: Special Verdict (280 frames / ~9.33s) */}
        <Series.Sequence durationInFrames={280}>
          <ShortSegment
            audioFile="audio/casio_short/seg06_verdict.mp3"
            image="images/casio-scene-13-verdict-masterpiece.jpg"
            prevImage="images/casio-scene-11-secret-casio-diagnostic.jpg"
            tag="SPECIAL INDEX™"
            title="The Unvarnished Verdict"
            caption="Costing half a cent per day, the Casio F-91W scores 9.6 out of 10 on the Special Index: A Modern Masterpiece."
            metricLabel="SPECIAL SCORE"
            metricValue="9.6 / 10 Masterpiece"
            isLastScene={true}
          />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
