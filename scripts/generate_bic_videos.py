#!/usr/bin/env python3
"""
Automated Batch Video Generator for 'Is It Special?' Bic Cristal 5-Part Video
Uses the Google GenAI Interactions API (gemini-omni-1.1-flash) with local starting frame images.
"""

import os
import sys
import subprocess
from dotenv import load_dotenv

# 1. Load Environment Variables from project .env
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BASE_DIR, ".env"))

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY or "PASTE_YOUR" in API_KEY:
    print("❌ Error: GEMINI_API_KEY is not configured yet in .env file.")
    print("👉 Please open the .env file in the project root and replace PASTE_YOUR_GEMINI_API_KEY_HERE with your key.")
    print("   Get your API key at: https://aistudio.google.com/")
    sys.exit(1)

# 2. Path to official generate_video.py script
GENERATE_SCRIPT = os.path.expanduser(
    r"~/.gemini/config/plugins/gemini-api/skills/gemini-omni-flash-api/scripts/video/generate_video.py"
)

JOBS = [
    {
        "part": 1,
        "name": "Luxury Paradox",
        "prompt": "A cinematic, split-composition 16:9 studio shot transitioning from a dark mahogany luxury desk to a clean industrial slate pedestal. On the left, an ornate gold-accented luxury fountain pen resting in a velvet box; the camera smoothly pans right to focus on a lone, transparent hexagonal Bic Cristal ballpoint pen with a blue cap. Pristine commercial rim lighting, shallow depth of field, 50mm anamorphic lens, slow cinematic tracking shot, 4k photorealistic product commercial.",
        "image": os.path.join(BASE_DIR, "public", "images", "bic-part1-luxury-paradox.jpg"),
        "output": os.path.join(BASE_DIR, "public", "videos", "bic-part1-luxury-paradox.mp4")
    },
    {
        "part": 2,
        "name": "Tungsten Sphere",
        "prompt": "Extreme macro probe lens shot (Laowa 24mm style) inside a high-tech dark studio. The camera slowly glides towards the brass point of a Bic Cristal pen, revealing the perfectly spherical tungsten carbide ball rotating smoothly in microscopic slow motion. Micro-reflections of cool studio lights bouncing off the polished steel-grey alloy and golden brass socket. 16:9 widescreen, hyper-detailed metallic textures, volumetric soft haze, photorealistic engineering macro.",
        "image": os.path.join(BASE_DIR, "public", "images", "bic-part2-tungsten-ball.jpg"),
        "output": os.path.join(BASE_DIR, "public", "videos", "bic-part2-tungsten-ball.mp4")
    },
    {
        "part": 3,
        "name": "Barometric Pinhole",
        "prompt": "Crisp 16:9 close-up tracking shot along the clear faceted polystyrene hexagonal barrel of a Bic Cristal pen. The camera follows a glowing beam of warm golden light highlighting the microscopic circular pinhole in the center of the barrel wall. Inside, the dense deep blue viscous paste ink slowly advances. Translucent plastic refractions, clean white marble desktop background, rack focus from the barrel texture to the ink level, 8k resolution.",
        "image": os.path.join(BASE_DIR, "public", "images", "bic-part3-barrel-pinhole.jpg"),
        "output": os.path.join(BASE_DIR, "public", "videos", "bic-part3-barrel-pinhole.mp4")
    },
    {
        "part": 4,
        "name": "Vented Safety Cap",
        "prompt": "A museum-grade editorial showcase shot. A translucent blue Bic pen cap floats gently in air, rotating 45 degrees under a directional spotlight to clearly reveal the safety ventilation aperture at the crown. The background smoothly shifts into a clean, minimalist New York gallery wall with soft diffused gallery spotlights. 16:9 widescreen, cinematic slow rotation, subtle dust motes in the light beam, modern architectural design aesthetic.",
        "image": os.path.join(BASE_DIR, "public", "images", "bic-part4-safety-cap.jpg"),
        "output": os.path.join(BASE_DIR, "public", "videos", "bic-part4-safety-cap.mp4")
    },
    {
        "part": 5,
        "name": "Verdict Hero",
        "prompt": "Dynamic low-angle hero shot of the complete Bic Cristal pen lying proudly on a matte slate surface alongside an open notebook filled with fluid handwritten sketches. Warm atmospheric rim lighting highlights the pristine hexagonal edges. The camera glides up smoothly to a wide beauty shot as dramatic golden bokeh fills the background. High-end commercial product cinematography, 16:9 widescreen, 4k ultra-crisp render.",
        "image": os.path.join(BASE_DIR, "public", "images", "bic-part5-verdict-hero.jpg"),
        "output": os.path.join(BASE_DIR, "public", "videos", "bic-part5-verdict-hero.mp4")
    }
]

def main():
    print("🚀 Starting Automated Google Video Generation Pipeline...")
    print(f"🔑 Loaded GEMINI_API_KEY from .env (length: {len(API_KEY)})")
    
    os.makedirs(os.path.join(BASE_DIR, "public", "videos"), exist_ok=True)

    for job in JOBS:
        print(f"\n=======================================================")
        print(f"🎬 Generating Part {job['part']}: {job['name']}")
        print(f"🖼️ First Frame: {job['image']}")
        print(f"🎥 Output Path: {job['output']}")
        print(f"=======================================================")
        
        cmd = [
            sys.executable,
            GENERATE_SCRIPT,
            job["prompt"],
            "--first-frame", job["image"],
            "--aspect-ratio", "16:9",
            "--resolution", "1080p",
            "--duration", "10",
            "--output", job["output"]
        ]
        
        res = subprocess.run(cmd)
        if res.returncode != 0:
            print(f"⚠️ Part {job['part']} encountered an error (exit code {res.returncode})")
        else:
            print(f"✅ Part {job['part']} rendered successfully!")

if __name__ == "__main__":
    main()
