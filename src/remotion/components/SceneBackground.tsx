import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

interface SceneBackgroundProps {
  currentImage: string;
  prevImage?: string;
  transform?: string;
  isLastScene?: boolean;
  fadeDurationFrames?: number;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  currentImage,
  prevImage,
  transform,
  isLastScene = false,
  fadeDurationFrames = 22,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade in current image: from 0 to 1 over fadeDurationFrames
  const fadeIn = interpolate(frame, [0, fadeDurationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Fade out to black ONLY on the final scene of the entire video
  const fadeOut = isLastScene
    ? interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    : 1;

  const currentOpacity = fadeIn * fadeOut;

  return (
    <>
      {/* 1. Underlying Previous Image: Held underneath during the cross-dissolve blend */}
      {prevImage && frame <= fadeDurationFrames + 4 && (
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

      {/* 2. Current Scene Image: Fades in transparently over previous image */}
      <AbsoluteFill
        style={{
          transform,
          transformOrigin: "center center",
          opacity: currentOpacity,
        }}
      >
        <Img
          src={staticFile(currentImage)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* 3. Cinematic Vignette Shadow */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.7) 0%, rgba(2,6,23,0) 25%, rgba(2,6,23,0) 65%, rgba(2,6,23,0.85) 100%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
};
