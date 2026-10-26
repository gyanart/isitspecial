import React from "react";

interface ProgressBarProps {
  color?: string;
  height?: number;
}

/**
 * ProgressBar component:
 * Kept for interface compatibility; returns null per user request
 * (removing the bottom horizontal progress timeline line moving left to right).
 */
export const ProgressBar: React.FC<ProgressBarProps> = () => {
  return null;
};
