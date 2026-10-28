import { execSync } from 'child_process';
import fs from 'fs';

const scenes = Array.from({ length: 16 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `casio_scene${num}_in.mp3`;
});

let totalSeconds = 0;
let totalFrames = 0;

const results = [];

for (const s of scenes) {
  const path = `public/audio/casio/${s}`;
  const out = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${path}"`).toString().trim();
  const dur = parseFloat(out);
  // Add 1.0 second buffer for comfortable transition spacing
  const durWithBuffer = dur + 1.0;
  const frames = Math.ceil(durWithBuffer * 30);
  results.push({ scene: s, duration: dur, frames, durWithBuffer });
  totalSeconds += durWithBuffer;
  totalFrames += frames;
}

console.log(JSON.stringify(results, null, 2));
console.log(`Total duration: ${totalSeconds.toFixed(2)}s (${(totalSeconds/60).toFixed(2)} min), Total frames: ${totalFrames}`);
