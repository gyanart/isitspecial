import fs from 'fs';
import path from 'path';

// Simple MP3 duration estimator by parsing Xing/VBRI header or frame bitrates
function getMp3Duration(filePath) {
  const buffer = fs.readFileSync(filePath);
  let offset = 0;
  // skip ID3v2 if present
  if (buffer.toString('ascii', 0, 3) === 'ID3') {
    const size = (buffer[6] << 21) | (buffer[7] << 14) | (buffer[8] << 7) | buffer[9];
    offset = 10 + size;
  }
  
  // Search for MPEG sync frame: 11 set bits (0xFF followed by 0xE0 or higher)
  while (offset < buffer.length - 4) {
    if (buffer[offset] === 0xFF && (buffer[offset + 1] & 0xE0) === 0xE0) {
      break;
    }
    offset++;
  }
  
  // Estimate via standard bitrate for AriaNeural (typically 48kbps or 64kbps CBR/VBR)
  // Let's print buffer size minus header
  const dataSize = buffer.length - offset;
  return { fileSize: buffer.length, dataSize };
}

for (let i = 1; i <= 12; i++) {
  const name = `aeropress_scene${String(i).padStart(2, '0')}_en.mp3`;
  const p = path.join('public', 'audio', 'aeropress', name);
  const info = getMp3Duration(p);
  console.log(`${name}: ${info.fileSize} bytes`);
}
