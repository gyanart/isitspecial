#!/usr/bin/env python3
"""
Sequential Video Generation Orchestrator for 'Is It Special?'
Runs video generation sequentially one-by-one:
1. Generates 10s 1080p 16:9 video using Gemini Omni 1.1 Flash.
2. Waits for completion and verifies the downloaded raw MP4.
3. Automatically merges the dedicated English voiceover audio track with FFmpeg.
4. Pauses with a graceful buffer delay before triggering the next scene.
"""

import os
import sys
import time
import subprocess
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BASE_DIR, ".env"))

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY or "PASTE_YOUR" in API_KEY:
    print("❌ Error: GEMINI_API_KEY not configured in .env", flush=True)
    sys.exit(1)

GENERATE_SCRIPT = os.path.expanduser(
    r"~/.gemini/config/plugins/gemini-api/skills/gemini-omni-flash-api/scripts/video/generate_video.py"
)

# FFmpeg binary
import imageio_ffmpeg
FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()

AEROPRESS_SCENES = [
    {
        "scene": 1,
        "title": "The Luxury Contrast",
        "prompt": "A striking 16:9 split-screen studio composition. On the left, a luxury chrome Italian espresso machine with brass portafilters. On the right, a clean transparent AeroPress coffee maker on a dark oak counter. Cinematic dramatic studio rim lighting, 4k commercial product cinematography.",
        "image": os.path.join(BASE_DIR, "public", "images", "aeropress-scene-01-chrome-vs-syringe.jpg"),
        "audio": os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene01_en.mp3"),
        "raw_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene01_raw.mp4"),
        "final_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene01_final.mp4")
    },
    {
        "scene": 2,
        "title": "The Stanford Inventor",
        "prompt": "A cinematic 16:9 close-up shot of an engineer's workshop desk. Blueprints of aerodynamic flight rings and fluid flow diagrams laid out under a warm brass architect's lamp. In the center sits an early transparent prototype of the AeroPress cylinder next to measuring calipers and slide rule. Nostalgic warm Stanford engineering laboratory atmosphere, golden dust motes, shallow focus, 8k resolution.",
        "image": None,
        "audio": os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene02_en.mp3"),
        "raw_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene02_raw.mp4"),
        "final_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene02_final.mp4")
    },
    {
        "scene": 3,
        "title": "World Championship",
        "prompt": "A vibrant, high-energy 16:9 wide-angle shot of the World AeroPress Championship stage. Neon magenta and electric blue stage lights, colorful national flags, and barista competitors in clean canvas aprons standing at black podiums preparing their AeroPress plungers. Crowd cheering in soft background bokeh, atmospheric theatrical haze, 4k documentary style.",
        "image": None,
        "audio": os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene03_en.mp3"),
        "raw_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene03_raw.mp4"),
        "final_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene03_final.mp4")
    },
    {
        "scene": 4,
        "title": "Pour-Over Channeling",
        "prompt": "A hyper-detailed 16:9 macro scientific visualization of hot water pouring through a transparent conical glass coffee dripper filled with dark coffee grounds. Zoom in to show uneven channels and turbulent water crevices burrowing erratically through the coffee bed, highlighting defective flow dynamics. High-speed macro cinematography at 1000fps, dark scientific studio background.",
        "image": None,
        "audio": os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene04_en.mp3"),
        "raw_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene04_raw.mp4"),
        "final_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene04_final.mp4")
    },
    {
        "scene": 5,
        "title": "Total Immersion",
        "prompt": "A clean, luminous 16:9 macro shot looking directly through the clear cylindrical wall of an AeroPress chamber. Freshly ground dark roasted coffee particles bloom in perfect suspended immersion in crystal-clear hot water, with swirling golden-brown crema and tiny bubbles dancing in suspension. Warm diffused backlit studio glow, pristine water clarity, ultra-smooth fluid dynamics, 8k resolution.",
        "image": os.path.join(BASE_DIR, "public", "images", "aeropress-scene-05-total-immersion.jpg"),
        "audio": os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene05_en.mp3"),
        "raw_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene05_raw.mp4"),
        "final_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene05_final.mp4")
    },
    {
        "scene": 6,
        "title": "Sub-Boiling Extraction",
        "prompt": "A 16:9 macro studio shot of an elegant matte black gooseneck kettle pouring steaming water into an open AeroPress chamber. An analog dial thermometer reads precisely 80°C (176°F). Soft, ethereal steam wisps rise gently through cool moody morning light against a dark slate kitchen backsplash. Pristine temperature-controlled pour, slow motion, shallow depth of field.",
        "image": None,
        "audio": os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene06_en.mp3"),
        "raw_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene06_raw.mp4"),
        "final_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene06_final.mp4")
    },
    {
        "scene": 7,
        "title": "Pneumatic Plunger Force",
        "prompt": "A sleek, cinematic 16:9 medium shot of a barista's hands gracefully depressing the rubber plunger of an AeroPress resting over a clear server pitcher. Visible air pocket inside the chamber compressing smoothly downwards, forcing rich, amber-golden coffee concentrate out through the perforated cap in an even, mesmerizing stream. High-speed 120fps slow motion, directional studio softbox lighting.",
        "image": None,
        "audio": os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene07_en.mp3"),
        "raw_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene07_raw.mp4"),
        "final_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene07_final.mp4")
    },
    {
        "scene": 8,
        "title": "Micro-Paper Membrane",
        "prompt": "An extreme macro 16:9 shot comparing two glass coffee cups side by side on backlit frosted glass. On the left, a cloudy, murky French press coffee with visible silt sediment; on the right, crystal-clear, glowing ruby-amber AeroPress coffee with zero suspended fines. In the foreground, an unused circular white micro-paper filter rests crisply on a black slate disc. Pristine optical comparison, studio lighting.",
        "image": None,
        "audio": os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene08_en.mp3"),
        "raw_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene08_raw.mp4"),
        "final_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene08_final.mp4")
    },
    {
        "scene": 9,
        "title": "Polypropylene Durability",
        "prompt": "A rugged 16:9 outdoor adventure shot. An AeroPress strapped to the exterior compression straps of a weathered canvas hiking backpack sitting on a rocky granite mountain summit at sunrise. In the background, majestic pine forests and mist-covered valleys. Golden alpine morning glow glinting off the durable smoked-grey polymer cylinder. Rugged, indestructible outdoor gear aesthetic, 4k ultra-sharp photography.",
        "image": None,
        "audio": os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene09_en.mp3"),
        "raw_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene09_raw.mp4"),
        "final_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene09_final.mp4")
    },
    {
        "scene": 10,
        "title": "3-Second Squeegee Pop",
        "prompt": "A satisfying 16:9 slow-motion close-up shot over an open kitchen compost container. The perforated cap has been removed and the AeroPress plunger is pressed, popping out a perfectly formed, dense, dry circular cylindrical coffee puck. The transparent chamber walls emerge dry and squeegee-clean. High-speed 240fps slow motion, bright clean kitchen lighting, white subway tile background.",
        "image": None,
        "audio": os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene10_en.mp3"),
        "raw_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene10_raw.mp4"),
        "final_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene10_final.mp4")
    },
    {
        "scene": 11,
        "title": "Cost-Per-Use Equation",
        "prompt": "A clean, graphic 16:9 editorial studio shot. On a polished white marble tabletop, a chaotic pile of single-use disposable aluminium and plastic coffee pods sits on the left with a subtle graphic red cross-out, while a lone AeroPress sits next to a glass jar of specialty whole beans and a ceramic coffee cup. Bright high-key commercial lighting, minimalist financial infographics aesthetic, 4k.",
        "image": None,
        "audio": os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene11_en.mp3"),
        "raw_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene11_raw.mp4"),
        "final_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene11_final.mp4")
    },
    {
        "scene": 12,
        "title": "Final Masterpiece Verdict",
        "prompt": "A breathtaking hero 16:9 commercial beauty shot. The complete AeroPress assembled proudly in inverted brewing posture next to a steaming hand-blown glass server carafe filled with radiant ruby-amber specialty coffee. Rich morning sunlight streaming through a loft window, throwing brilliant amber caustic patterns across the dark walnut table. Premium editorial magazine cover aesthetic, 8k crisp resolution.",
        "image": None,
        "audio": os.path.join(BASE_DIR, "public", "audio", "aeropress", "aeropress_scene12_en.mp3"),
        "raw_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene12_raw.mp4"),
        "final_video": os.path.join(BASE_DIR, "public", "videos", "aeropress_scene12_final.mp4")
    }
]

def merge_audio(raw_video, audio_path, output_path):
    """Merges video and voiceover audio using ffmpeg with aac encoding."""
    if not os.path.exists(raw_video) or not os.path.exists(audio_path):
        return False
    print(f"🎵 Merging English voiceover ({os.path.basename(audio_path)}) into video...", flush=True)
    cmd = [
        FFMPEG_EXE, "-y",
        "-i", raw_video,
        "-i", audio_path,
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        output_path
    ]
    res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return res.returncode == 0

def run_orchestrator():
    print("==================================================================", flush=True)
    print("🎬 AERO-PRESS SEQUENTIAL VIDEO GENERATOR (GOOGLE OMNI 1.1 FLASH)", flush=True)
    print("==================================================================", flush=True)
    
    os.makedirs(os.path.join(BASE_DIR, "public", "videos"), exist_ok=True)
    
    total = len(AEROPRESS_SCENES)
    
    for idx, item in enumerate(AEROPRESS_SCENES, start=1):
        s_num = item["scene"]
        s_title = item["title"]
        raw_out = item["raw_video"]
        final_out = item["final_video"]
        
        print(f"\n[{idx}/{total}] >>> PROCESSING SCENE {s_num:02d}: {s_title.upper()} <<<", flush=True)
        
        # Check if already rendered
        if os.path.exists(final_out) and os.path.getsize(final_out) > 100000:
            print(f"⏭️ Scene {s_num:02d} already completed ({os.path.basename(final_out)}). Skipping to next.", flush=True)
            continue
            
        # Build generation command
        cmd = [
            sys.executable,
            GENERATE_SCRIPT,
            item["prompt"],
            "--aspect-ratio", "16:9",
            "--resolution", "1080p",
            "--duration", "10",
            "--output", raw_out
        ]
        
        # Attach starting frame if available on disk
        if item["image"] and os.path.exists(item["image"]):
            print(f"🖼️ Using starting frame: {os.path.basename(item['image'])}", flush=True)
            cmd.extend(["--first-frame", item["image"]])
        else:
            print("📝 Text-to-video prompt mode (no starting frame)", flush=True)
            
        print(f"🚀 Sending request to Gemini Omni 1.1 Flash (duration 10s @ 1080p)...", flush=True)
        start_t = time.time()
        
        # Execute generate_video.py
        env = os.environ.copy()
        env["GEMINI_API_KEY"] = API_KEY
        proc = subprocess.run(cmd, env=env)
        elapsed = time.time() - start_t
        
        if proc.returncode == 0 and os.path.exists(raw_out):
            print(f"✅ Scene {s_num:02d} raw video generated in {elapsed:.1f}s ({os.path.getsize(raw_out):,} bytes)", flush=True)
            
            # Merge with English voiceover
            if item["audio"] and os.path.exists(item["audio"]):
                success = merge_audio(raw_out, item["audio"], final_out)
                if success:
                    print(f"🎉 Final video ready: {os.path.basename(final_out)} ({os.path.getsize(final_out):,} bytes)", flush=True)
            else:
                print(f"ℹ️ No audio track found, raw video saved at: {raw_out}", flush=True)
        else:
            print(f"⚠️ Warning: Generation failed or timed out for Scene {s_num:02d} (return code: {proc.returncode})", flush=True)
            
        # Cooldown buffer before next video to respect cloud concurrency
        if idx < total:
            print("⏳ Pausing 20 seconds before starting the next video in queue...", flush=True)
            time.sleep(20)

    print("\n🏁 All 12 AeroPress video generation cycles completed!", flush=True)

if __name__ == "__main__":
    run_orchestrator()
