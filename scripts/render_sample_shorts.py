"""
Automated Video Renderer for 'Is It Special?' YouTube Shorts / Reels
Generates a 1080x1920 30fps vertical video combining:
- Neural voiceover audio (Edge-TTS)
- Dynamic Ken Burns zooming product photography
- Synchronized editorial typography and verdict cards
- Sleek brand headers and live progress timeline
"""

import os
import sys
import math
import subprocess
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# 1. Output & Asset Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_PATH = os.path.join(BASE_DIR, "public", "audio", "bic-cristal-ballpoint-pen-verdict-en.mp3")
HERO_IMAGE_PATH = os.path.join(BASE_DIR, "public", "images", "bic-pen.webp")
OUTPUT_DIR = os.path.join(BASE_DIR, "public", "videos")
OUTPUT_VIDEO = os.path.join(OUTPUT_DIR, "bic-cristal-shorts-sample.mp4")

os.makedirs(OUTPUT_DIR, exist_ok=True)

# 2. Video Specs
WIDTH = 1080
HEIGHT = 1920
FPS = 30
DURATION_SEC = 33.34
TOTAL_FRAMES = int(DURATION_SEC * FPS)

# 3. Fonts
def get_font(name, size):
    font_path = os.path.join(r"C:\Windows\Fonts", name)
    if os.path.exists(font_path):
        return ImageFont.truetype(font_path, size)
    return ImageFont.load_default()

FONT_BRAND = get_font("segoeuib.ttf", 38)
FONT_TAG = get_font("segoeuib.ttf", 30)
FONT_HEADING_LG = get_font("segoeuib.ttf", 54)
FONT_BODY = get_font("segoeui.ttf", 36)
FONT_SCORE = get_font("impact.ttf", 140)
FONT_SERIF = get_font("georgiab.ttf", 44)
FONT_SMALL = get_font("segoeuib.ttf", 26)

# 4. Color Palette
BG_COLOR = (11, 15, 23)        # #0b0f17
CARD_BG = (18, 24, 38)         # #121826
CARD_BORDER = (35, 46, 68)     # #232e44
EMERALD = (16, 185, 129)       # #10b981
EMERALD_BG = (6, 78, 59)       # #064e3b
AMBER = (245, 158, 11)         # #f59e0b
TEXT_WHITE = (255, 255, 255)
TEXT_MUTED = (156, 163, 175)   # #9ca3af

# 5. Build Base Background
def create_base_canvas():
    base = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(base)
    
    # Subtle radial/vertical glow gradient at the top and middle
    for y in range(HEIGHT):
        factor = math.sin((y / HEIGHT) * math.pi) * 0.3
        r = int(11 + 15 * factor)
        g = int(15 + 25 * factor)
        b = int(23 + 40 * factor)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))
    
    # Header Branding Pill
    pill_w = 440
    pill_h = 70
    pill_x = (WIDTH - pill_w) // 2
    pill_y = 110
    draw.rounded_rectangle(
        [pill_x, pill_y, pill_x + pill_w, pill_y + pill_h],
        radius=35,
        fill=EMERALD_BG,
        outline=EMERALD,
        width=2
    )
    # Circle indicator dot
    draw.ellipse([pill_x + 25, pill_y + 25, pill_x + 45, pill_y + 45], fill=EMERALD)
    draw.text((pill_x + 60, pill_y + 16), "IS IT SPECIAL?", font=FONT_BRAND, fill=TEXT_WHITE)

    # Subtitle above the product
    sub_text = "INDUSTRIAL DESIGN & VERDICT REPORT"
    bbox = draw.textbbox((0, 0), sub_text, font=FONT_SMALL)
    sub_w = bbox[2] - bbox[0]
    draw.text(((WIDTH - sub_w) // 2, pill_y + 90), sub_text, font=FONT_SMALL, fill=TEXT_MUTED)

    # Bottom Branding Footer
    footer_text = "www.isitspecial.com"
    f_bbox = draw.textbbox((0, 0), footer_text, font=FONT_BRAND)
    f_w = f_bbox[2] - f_bbox[0]
    draw.text(((WIDTH - f_w) // 2, 1780), footer_text, font=FONT_BRAND, fill=EMERALD)

    tagline = "Read the unvarnished deep dive • Link in comments"
    t_bbox = draw.textbbox((0, 0), tagline, font=FONT_SMALL)
    t_w = t_bbox[2] - t_bbox[0]
    draw.text(((WIDTH - t_w) // 2, 1840), tagline, font=FONT_SMALL, fill=TEXT_MUTED)

    return base

# 6. Pre-render 5 Synced Text Cards
def create_card_images():
    cards = []
    
    # Card 1: 0.0s - 6.8s (The Question)
    c1 = Image.new("RGBA", (WIDTH, 520), (0, 0, 0, 0))
    d1 = ImageDraw.Draw(c1)
    bx, by, bw, bh = 60, 20, WIDTH - 120, 480
    d1.rounded_rectangle([bx, by, bx + bw, by + bh], radius=32, fill=(18, 24, 38, 240), outline=(245, 158, 11, 200), width=2)
    # Badge
    d1.rounded_rectangle([bx + 40, by + 40, bx + 260, by + 90], radius=16, fill=(120, 53, 15, 200))
    d1.text((bx + 60, by + 48), "THE PARADOX", font=FONT_TAG, fill=AMBER)
    d1.text((bx + 40, by + 120), "30-Cent Disposable Plastic...", font=FONT_HEADING_LG, fill=TEXT_WHITE)
    d1.text((bx + 40, by + 190), "Or Genuinely Special?", font=FONT_HEADING_LG, fill=AMBER)
    d1.text((bx + 40, by + 280), "Why luxury $600 pens dry out and clog,", font=FONT_BODY, fill=TEXT_MUTED)
    d1.text((bx + 40, by + 330), "while 100 billion of these write flawlessly.", font=FONT_BODY, fill=TEXT_MUTED)
    cards.append(c1)

    # Card 2: 6.8s - 13.0s (The Verdict)
    c2 = Image.new("RGBA", (WIDTH, 520), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(c2)
    d2.rounded_rectangle([bx, by, bx + bw, by + bh], radius=32, fill=(18, 24, 38, 240), outline=(16, 185, 129, 200), width=2)
    d2.rounded_rectangle([bx + 40, by + 40, bx + 260, by + 90], radius=16, fill=EMERALD_BG)
    d2.text((bx + 60, by + 48), "OUR VERDICT", font=FONT_TAG, fill=EMERALD)
    d2.text((bx + 40, by + 120), "Pure Industrial Perfection", font=FONT_HEADING_LG, fill=TEXT_WHITE)
    d2.text((bx + 40, by + 200), "Invented by Marcel Bich in Paris, 1950.", font=FONT_BODY, fill=TEXT_MUTED)
    d2.text((bx + 40, by + 260), "Over 100 Billion units manufactured,", font=FONT_BODY, fill=TEXT_WHITE)
    d2.text((bx + 40, by + 320), "making it the #1 sold writing tool in human history.", font=FONT_BODY, fill=TEXT_MUTED)
    cards.append(c2)

    # Card 3: 13.0s - 21.0s (Micro-Engineering)
    c3 = Image.new("RGBA", (WIDTH, 520), (0, 0, 0, 0))
    d3 = ImageDraw.Draw(c3)
    d3.rounded_rectangle([bx, by, bx + bw, by + bh], radius=32, fill=(18, 24, 38, 240), outline=(56, 189, 248, 200), width=2)
    d3.rounded_rectangle([bx + 40, by + 40, bx + 360, by + 90], radius=16, fill=(12, 74, 110, 200))
    d3.text((bx + 60, by + 48), "MICRO-ENGINEERING", font=FONT_TAG, fill=(56, 189, 248))
    d3.text((bx + 40, by + 120), "0.1-Micron Tungsten Sphere", font=FONT_HEADING_LG, fill=TEXT_WHITE)
    d3.text((bx + 40, by + 195), "• Tighter tolerances than Formula 1 engine pistons", font=FONT_BODY, fill=TEXT_MUTED)
    d3.text((bx + 40, by + 255), "• Barometric pinhole equalizes air pressure", font=FONT_BODY, fill=TEXT_MUTED)
    d3.text((bx + 40, by + 315), "• 2 full miles (3 km) of continuous unbroken ink", font=FONT_BODY, fill=(56, 189, 248))
    cards.append(c3)

    # Card 4: 21.0s - 26.5s (Museum Collection)
    c4 = Image.new("RGBA", (WIDTH, 520), (0, 0, 0, 0))
    d4 = ImageDraw.Draw(c4)
    d4.rounded_rectangle([bx, by, bx + bw, by + bh], radius=32, fill=(18, 24, 38, 240), outline=(168, 85, 247, 200), width=2)
    d4.rounded_rectangle([bx + 40, by + 40, bx + 320, by + 90], radius=16, fill=(88, 28, 135, 200))
    d4.text((bx + 60, by + 48), "CULTURAL ICON", font=FONT_TAG, fill=(192, 132, 252))
    d4.text((bx + 40, by + 120), "MoMA Permanent Collection", font=FONT_HEADING_LG, fill=TEXT_WHITE)
    d4.text((bx + 40, by + 195), "Enshrined in New York's Museum of Modern Art.", font=FONT_BODY, fill=TEXT_MUTED)
    d4.text((bx + 40, by + 255), "\"The wealthiest billionaire cannot buy a pen", font=FONT_SERIF, fill=(216, 180, 254))
    d4.text((bx + 40, by + 315), " that writes with a smoother ball bearing.\"", font=FONT_SERIF, fill=(216, 180, 254))
    cards.append(c4)

    # Card 5: 26.5s - End (Score & Final Verdict)
    c5 = Image.new("RGBA", (WIDTH, 520), (0, 0, 0, 0))
    d5 = ImageDraw.Draw(c5)
    d5.rounded_rectangle([bx, by, bx + bw, by + bh], radius=32, fill=(18, 24, 38, 255), outline=EMERALD, width=3)
    # Score block on right
    d5.text((bx + 50, by + 45), "FINAL VERDICT", font=FONT_TAG, fill=EMERALD)
    d5.text((bx + 50, by + 105), "Everyday Miracle", font=FONT_HEADING_LG, fill=TEXT_WHITE)
    d5.text((bx + 50, by + 185), "Cost-per-use: $0.0001 per page", font=FONT_BODY, fill=TEXT_MUTED)
    d5.text((bx + 50, by + 240), "Unbeatable democratic utility.", font=FONT_BODY, fill=TEXT_MUTED)
    
    # Big glowing score
    score_txt = "9.7"
    d5.text((WIDTH - 360, by + 70), score_txt, font=FONT_SCORE, fill=EMERALD)
    d5.text((WIDTH - 340, by + 230), "OUT OF 10", font=FONT_BRAND, fill=TEXT_WHITE)
    cards.append(c5)

    return cards

def main():
    print(f"🎬 Starting Automated Video Render...")
    print(f"Loading assets:")
    print(f" - Audio: {AUDIO_PATH}")
    print(f" - Hero: {HERO_IMAGE_PATH}")
    
    base_canvas = create_base_canvas()
    cards = create_card_images()
    
    # Load and prepare hero image
    raw_hero = Image.open(HERO_IMAGE_PATH).convert("RGB")
    hero_w, hero_h = raw_hero.size

    # Showcase box coords
    box_x = 60
    box_y = 260
    box_w = WIDTH - 120
    box_h = 580

    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    
    # FFmpeg pipe setup
    cmd = [
        ffmpeg_exe,
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",                     # Pipe raw frames from stdin
        "-i", AUDIO_PATH,              # Add voiceover audio track
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "veryfast",
        "-crf", "20",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        OUTPUT_VIDEO
    ]

    print(f"Launching FFmpeg: {OUTPUT_VIDEO}", flush=True)
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    try:
        for frame_idx in range(TOTAL_FRAMES):
            t = frame_idx / FPS
            
            # 1. Start with base canvas copy
            frame = base_canvas.copy()
            
            # 2. Ken Burns Zoom on Hero Image
            # Scale factor from 1.00 to 1.15 smoothly over duration
            progress = frame_idx / TOTAL_FRAMES
            zoom = 1.0 + 0.12 * progress
            
            # Crop center of hero with zoom
            cw = int(hero_w / zoom)
            ch = int(hero_h / zoom)
            cx = (hero_w - cw) // 2
            cy = (hero_h - ch) // 2
            
            cropped = raw_hero.crop((cx, cy, cx + cw, cy + ch))
            resized_hero = cropped.resize((box_w, box_h), Image.Resampling.BILINEAR)
            
            # Paste into showcase frame
            frame.paste(resized_hero, (box_x, box_y))
            
            # Draw frame border over image
            draw = ImageDraw.Draw(frame)
            draw.rounded_rectangle(
                [box_x, box_y, box_x + box_w, box_y + box_h],
                radius=24,
                outline=(51, 65, 85),
                width=3
            )

            # 3. Choose Card based on timestamps
            card_y = 880
            if t < 6.8:
                frame.paste(cards[0], (0, card_y), cards[0])
            elif t < 13.0:
                frame.paste(cards[1], (0, card_y), cards[1])
            elif t < 21.0:
                frame.paste(cards[2], (0, card_y), cards[2])
            elif t < 26.5:
                frame.paste(cards[3], (0, card_y), cards[3])
            else:
                frame.paste(cards[4], (0, card_y), cards[4])

            # 4. Animated Progress Bar at Bottom (y = 1910)
            bar_w = int(WIDTH * progress)
            draw.rectangle([0, 1910, bar_w, 1920], fill=EMERALD)

            # Send raw bytes to ffmpeg
            proc.stdin.write(frame.tobytes())

            if frame_idx % 150 == 0:
                percent = int((frame_idx / TOTAL_FRAMES) * 100)
                print(f"Rendered {frame_idx}/{TOTAL_FRAMES} frames ({percent}%) @ {t:.1f}s", flush=True)

        proc.stdin.close()
        proc.wait()
        print(f"✅ Video successfully rendered: {OUTPUT_VIDEO}", flush=True)
        size_mb = os.path.getsize(OUTPUT_VIDEO) / (1024 * 1024)
        print(f"📦 File size: {size_mb:.2f} MB", flush=True)

    except Exception as e:
        print(f"❌ Error during rendering: {e}")
        if proc.stdin:
            proc.stdin.close()
        proc.kill()
        sys.exit(1)

if __name__ == "__main__":
    main()
