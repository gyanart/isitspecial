import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcPath = 'C:/Users/gyana/.gemini/antigravity/brain/61ff74c8-c526-430f-bd19-c85aa589803d/.user_uploaded/media_1792908424505_65f492ff.png';

async function generate() {
  console.log('Generating brand icons from uploaded image...');
  
  if (!fs.existsSync(srcPath)) {
    throw new Error(`Source image not found at ${srcPath}`);
  }

  // 1. High-res logo.png (512x512)
  await sharp(srcPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 95, compressionLevel: 9 })
    .toFile('public/logo.png');
  console.log('✓ public/logo.png (512x512)');

  // 2. High-res logo.webp
  await sharp(srcPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 95 })
    .toFile('public/logo.webp');
  console.log('✓ public/logo.webp (512x512)');

  // 3. Android / PWA icon-512.png
  await sharp(srcPath)
    .resize(512, 512)
    .png()
    .toFile('public/icon-512.png');
  console.log('✓ public/icon-512.png (512x512)');

  // 4. Android / PWA icon-192.png
  await sharp(srcPath)
    .resize(192, 192)
    .png()
    .toFile('public/icon-192.png');
  console.log('✓ public/icon-192.png (192x192)');

  // 5. Apple Touch Icon (180x180)
  await sharp(srcPath)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');
  console.log('✓ public/apple-touch-icon.png (180x180)');

  // 6. Apple Touch Icon Precomposed fallback
  await sharp(srcPath)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon-precomposed.png');
  console.log('✓ public/apple-touch-icon-precomposed.png (180x180)');

  // 7. Favicon 32x32
  const buf32 = await sharp(srcPath)
    .resize(32, 32)
    .png()
    .toBuffer();
  fs.writeFileSync('public/favicon-32x32.png', buf32);
  console.log('✓ public/favicon-32x32.png');

  // 8. Favicon 16x16
  const buf16 = await sharp(srcPath)
    .resize(16, 16)
    .png()
    .toBuffer();
  fs.writeFileSync('public/favicon-16x16.png', buf16);
  console.log('✓ public/favicon-16x16.png');

  // 9. Favicon 48x48
  const buf48 = await sharp(srcPath)
    .resize(48, 48)
    .png()
    .toBuffer();

  // 10. Multi-size ICO (16, 32, 48)
  const images = [
    { width: 16, height: 16, buffer: buf16 },
    { width: 32, height: 32, buffer: buf32 },
    { width: 48, height: 48, buffer: buf48 }
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(images.length, 4); // count

  let offset = 6 + images.length * 16;
  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width, 0);
    entry.writeUInt8(img.height, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...images.map(img => img.buffer)]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  console.log('✓ public/favicon.ico (Multi-size 16/32/48 ICO)');

  // 11. Modern SVG favicon embedding high-res 128x128 PNG as data-URI
  const buf128 = await sharp(srcPath)
    .resize(128, 128)
    .png()
    .toBuffer();
  const b64 = buf128.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <image href="data:image/png;base64,${b64}" width="128" height="128" />
</svg>
`;
  fs.writeFileSync('public/favicon.svg', svgContent);
  console.log('✓ public/favicon.svg (embedded high-res PNG)');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
