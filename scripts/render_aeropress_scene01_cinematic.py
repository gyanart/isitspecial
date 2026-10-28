#!/usr/bin/env python3
"""
Cinematic 16:9 1080p Video Renderer for 'Is It Special?'
Renders Scene 01: The Luxury Contrast ($15,000 Chrome vs. $40 Plastic Syringe)
Combining:
- 100% Quality JPEG source image
- Dynamic lateral Ken Burns camera pan (left chrome machine -> right AeroPress)
- Synced lower-third frosted glass cards matching voiceover beats
- Neural English voiceover (en-US-AriaNeural)
- 1080p 16:9 30fps H.264/AAC output
"""

import os
import sys
import math
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGE_PATH = os.path.join(BASE_DIR, "public", "images", "aeropress-scene-01-chrome-vs-syringe.jpg")
AUDIO_PATH = os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene01_en.mp3")
OUTPUT_DIR = os.path.join(BASE_DIR, "public", "videos")
OUTPUT_VIDEO = os.path.join(OUTPUT_DIR, "aeropress_scene01_cinematic_1080p.mp4")

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Video Specs
WIDTH = 1920
HEIGHT = 1080
FPS = 30
DURATION_SEC = 11.62
TOTAL_FRAMES = int(DURATION_SEC * FPS)

# Fonts
def get_font(name, size):
    font_path = os.path.join(r"C:\Windows\Fonts", name)
    if os.path.exists(font_path):
        return ImageFont.truetype(font_path, size)
    return ImageFont.load_default()

FONT_BADGE = get_font("segoeuib.ttf", 26)
FONT_HEADING = get_font("segoeuib.ttf", 44)
FONT_SUBTEXT = get_font("segoeui.ttf", 28)
FONT_TAG = get_font("segoeuib.ttf", 22)

# Colors
EMERALD = (16, 185, 129)
EMERALD_BG = (6, 78, 59, 230)
AMBER = (245, 158, 11)
AMBER_BG = (120, 53, 15, 230)
TEXT_WHITE = (255, 255, 255)
TEXT_MUTED = (203, 213, 225)

# Pre-render the two cards
def create_cards():
    w, h = 940, 160
    
    # Card 1: 0.0s - 5.5s (The $15,000 Chrome Machine)
    c1 = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d1 = ImageDraw.Draw(c1)
    d1.rounded_rectangle([0, 0, w, h], radius=24, fill=(15, 23, 42, 220), outline=(245, 158, 11, 200), width=2)
    # Tag Pill
    d1.rounded_rectangle([30, 20, 240, 55], radius=12, fill=(120, 53, 15, 240))
    d1.text((45, 24), "THE STATUS QUO", font=FONT_TAG, fill=AMBER)
    # Text
    d1.text((30, 68), "$15,000 Chrome Commercial Machine", font=FONT_HEADING, fill=TEXT_WHITE)
    d1.text((30, 118), "15-bar steam boilers • 120 kg brass locomotive", font=FONT_SUBTEXT, fill=TEXT_MUTED)

    # Card 2: 5.5s - End (The $40 Plastic Syringe)
    c2 = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(c2)
    d2.rounded_rectangle([0, 0, w, h], radius=24, fill=(15, 23, 42, 220), outline=(16, 185, 129, 220), width=2)
    # Tag Pill
    d2.rounded_rectangle([30, 20, 260, 55], radius=12, fill=(6, 78, 59, 240))
    d2.text((45, 24), "THE 40-DOLLAR ICON", font=FONT_TAG, fill=EMERALD)
    # Text
    d2.text((30, 68), "$40 Aerodynamic Plastic Syringe", font=FONT_HEADING, fill=TEXT_WHITE)
    d2.text((30, 118), "World AeroPress Championship Winner • 60+ Nations", font=FONT_SUBTEXT, fill=TEXT_MUTED)

    return c1, c2

def main():
    print("🎬 Starting 16:9 Cinematic Video Render (Scene 01: Chrome vs. Syringe)...", flush=True)
    print(f"Loading Source Image: {IMAGE_PATH}", flush=True)
    print(f"Loading Voiceover Audio: {AUDIO_PATH}", flush=True)
    
    # Load and prepare wide high-res canvas for camera pan
    raw_img = Image.open(IMAGE_PATH).convert("RGB")
    src_w, src_h = raw_img.size
    
    # Scale up so height is larger than 1080 to allow vertical headroom + horizontal pan
    target_h = int(HEIGHT * 1.15)  # 1242
    target_w = int(src_w * (target_h / src_h))  # ~2225
    scaled_img = raw_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Max horizontal pan distance
    max_pan_x = target_w - WIDTH  # ~305 pixels
    max_pan_y = target_h - HEIGHT # ~162 pixels
    
    card1, card2 = create_cards()
    
    # Top Branding Pill (pre-rendered)
    pill_w, pill_h = 440, 56
    badge = Image.new("RGBA", (pill_w, pill_h), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(badge)
    b_draw.rounded_rectangle([0, 0, pill_w, pill_h], radius=28, fill=(6, 78, 59, 220), outline=EMERALD, width=2)
    b_draw.ellipse([20, 20, 36, 36], fill=EMERALD)
    b_draw.text((48, 12), "IS IT SPECIAL? • SCENE 01 / 12", font=FONT_BADGE, fill=TEXT_WHITE)

    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    
    cmd = [
        ffmpeg_exe,
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",                     # Pipe raw frames from stdin
        "-i", AUDIO_PATH,              # Add English voiceover audio
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "veryfast",
        "-crf", "18",                  # Ultra-crisp visual fidelity
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        OUTPUT_VIDEO
    ]

    print(f"Encoding with FFmpeg -> {OUTPUT_VIDEO}", flush=True)
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    try:
        for frame_idx in range(TOTAL_FRAMES):
            t = frame_idx / FPS
            progress = frame_idx / TOTAL_FRAMES
            
            # Smooth ease-in-out curve for camera pan
            # S-curve: smoothstep
            smooth_p = progress * progress * (3.0 - 2.0 * progress)
            
            # Pan from left (x=0, showing chrome machine) to right (x=max_pan_x, showing AeroPress)
            crop_x = int(max_pan_x * smooth_p)
            crop_y = int(max_pan_y * 0.5)  # Vertically centered
            
            # Crop 1920x1080 window
            frame = scaled_img.crop((crop_x, crop_y, crop_x + WIDTH, crop_y + HEIGHT))
            
            # Top-Left Branding Badge
            frame.paste(badge, (70, 50), badge)
            
            # Bottom Lower-Third Card (transitions at 5.5s)
            card_x = 70
            card_y = HEIGHT - 240
            if t < 5.5:
                frame.paste(card1, (card_x, card_y), card1)
            else:
                frame.paste(card2, (card_x, card_y), card2)
                
            # Animated Emerald Progress Bar along bottom edge
            draw = ImageDraw.Draw(frame)
            bar_w = int(WIDTH * progress)
            draw.rectangle([0, HEIGHT - 8, bar_w, HEIGHT], fill=EMERALD)
            
            # Send raw frame bytes
            proc.stdin.write(frame.tobytes())
            
            if frame_idx % 60 == 0:
                pct = int(progress * 100)
                print(f"Rendered {frame_idx}/{TOTAL_FRAMES} frames ({pct}%) @ {t:.1f}s", flush=True)

        proc.stdin.close()
        proc.wait()
        
        file_size_mb = os.path.getsize(OUTPUT_VIDEO) / (1024 * 1024)
        print(f"✅ Video render complete: {OUTPUT_VIDEO}", flush=True)
        print(f"📦 Final file size: {file_size_mb:.2f} MB", flush=True)
        
    except Exception as e:
        print(f"❌ Error during render: {e}", flush=True)
        if proc.stdin:
            proc.stdin.close()
        proc.kill()
        sys.exit(1)

if __name__ == "__main__":
    main()
