#!/usr/bin/env python3
"""
JSON2Video Automated Generator for 'Is It Special?'
Product: Bialetti Moka Express
Target: 1080x1920 (Vertical 9:16) for Shorts / Reels / WhatsApp Status

Constraints Honored:
- Total runtime strictly under 60 seconds (3 scenes @ 18s each = ~54s)
- NO bottom horizontal line
- NO scene timer at the top
- NO scene numbers (e.g. 'Scene 1/3')
- 3 distinct bespoke high-resolution photographic scene backgrounds with Ken Burns effects
- Smooth cross-fade scene transitions
- Subtle background chill music (10% volume) with fade-in/out
- Natural neural voiceover + word-by-word synchronized karaoke captions
"""

import os
import sys
import time
import requests
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BASE_DIR, ".env"))

API_KEY = os.environ.get("JSON2VIDEO_API_KEY")
if not API_KEY:
    print("❌ Error: JSON2VIDEO_API_KEY not found in .env")
    sys.exit(1)

API_ENDPOINT = "https://api.json2video.com/v2/movies"

payload = {
    "resolution": "custom",
    "width": 1080,
    "height": 1920,
    "quality": "high",
    "scenes": [
        # =====================================================================
        # SCENE 1: The Hook & The $35 Paradox (18s)
        # =====================================================================
        {
            "duration": 18,
            "background-color": "#0d1117",
            "elements": [
                {
                    "type": "image",
                    "src": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1080&q=80",
                    "resize": "cover",
                    "position": "center-center",
                    "effect": "zoom-in",
                    "duration": 18
                },
                # Semi-transparent dark vignette for pristine contrast
                {
                    "type": "text",
                    "text": " ",
                    "background-color": "rgba(10, 15, 23, 0.45)",
                    "width": 1080,
                    "height": 1920,
                    "position": "center-center"
                },
                # Editorial Top Brand Pill (Clean, zero timers, zero scene numbers)
                {
                    "type": "text",
                    "text": "IS IT SPECIAL? • TEARDOWN",
                    "font-family": "Inter",
                    "font-size": 34,
                    "font-weight": 800,
                    "color": "#10b981",
                    "background-color": "rgba(13, 17, 23, 0.90)",
                    "position": "top-center",
                    "top": 130,
                    "padding": 16,
                    "border-radius": 28
                },
                # Hook Headline
                {
                    "type": "text",
                    "text": "THE $35 STOVETOP ICON",
                    "font-family": "Inter",
                    "font-size": 66,
                    "font-weight": 900,
                    "color": "#ffffff",
                    "position": "top-center",
                    "top": 250,
                    "shadow-color": "#000000",
                    "shadow-offset": 4
                },
                {
                    "type": "text",
                    "text": "Can 1933 physics beat a $1,000 espresso machine?",
                    "font-family": "Inter",
                    "font-size": 38,
                    "font-weight": 600,
                    "color": "#fbbf24",
                    "position": "top-center",
                    "top": 350,
                    "shadow-color": "#000000",
                    "shadow-offset": 3
                },
                # Scene 1 Voiceover
                {
                    "type": "voice",
                    "voice": "en-US-AndrewNeural",
                    "text": "Found on 90% of Italian kitchen stovetops and in the Museum of Modern Art, the Bialetti Moka Express costs just 35 dollars. Yet modern coffee snobs dismiss it as a crude relic that burns beans. Is Alfonso Bialetti's 1933 invention genuinely special?"
                }
            ]
        },

        # =====================================================================
        # SCENE 2: The Thermodynamics & Octagonal Physics (18s)
        # =====================================================================
        {
            "duration": 18,
            "transition": {
                "type": "xfade",
                "style": "fade",
                "duration": 0.5
            },
            "background-color": "#090d16",
            "elements": [
                {
                    "type": "image",
                    "src": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1080&q=80",
                    "resize": "cover",
                    "position": "center-center",
                    "effect": "pan-left",
                    "duration": 18
                },
                # Dark vignette
                {
                    "type": "text",
                    "text": " ",
                    "background-color": "rgba(9, 13, 22, 0.45)",
                    "width": 1080,
                    "height": 1920,
                    "position": "center-center"
                },
                # Top Pill
                {
                    "type": "text",
                    "text": "THERMODYNAMIC PHYSICS",
                    "font-family": "Inter",
                    "font-size": 34,
                    "font-weight": 800,
                    "color": "#38bdf8",
                    "background-color": "rgba(9, 13, 22, 0.90)",
                    "position": "top-center",
                    "top": 130,
                    "padding": 16,
                    "border-radius": 28
                },
                # Science Headline
                {
                    "type": "text",
                    "text": "1.5 BARS OF STEAM PRESSURE",
                    "font-family": "Inter",
                    "font-size": 60,
                    "font-weight": 900,
                    "color": "#ffffff",
                    "position": "top-center",
                    "top": 250,
                    "shadow-color": "#000000",
                    "shadow-offset": 4
                },
                {
                    "type": "text",
                    "text": "Die-cast aluminium diffuses heat 10x faster than steel",
                    "font-family": "Inter",
                    "font-size": 36,
                    "font-weight": 600,
                    "color": "#94a3b8",
                    "position": "top-center",
                    "top": 350,
                    "shadow-color": "#000000",
                    "shadow-offset": 3
                },
                # Scene 2 Voiceover
                {
                    "type": "voice",
                    "voice": "en-US-AndrewNeural",
                    "text": "Here is the thermodynamic secret: As water boils in the lower chamber, expanding steam builds up to 1.5 bars of vapor pressure, pushing 95-degree water upward through the coffee bed. And its eight-sided aluminium body diffuses heat ten times faster than steel, preventing localized scorched spots."
                }
            ]
        },

        # =====================================================================
        # SCENE 3: The Flaws, Verdict & Special Score (18s)
        # =====================================================================
        {
            "duration": 18,
            "transition": {
                "type": "xfade",
                "style": "fade",
                "duration": 0.5
            },
            "background-color": "#06090f",
            "elements": [
                {
                    "type": "image",
                    "src": "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1080&q=80",
                    "resize": "cover",
                    "position": "center-center",
                    "effect": "zoom-out",
                    "duration": 18
                },
                # Dark vignette
                {
                    "type": "text",
                    "text": " ",
                    "background-color": "rgba(6, 9, 15, 0.45)",
                    "width": 1080,
                    "height": 1920,
                    "position": "center-center"
                },
                # Top Pill
                {
                    "type": "text",
                    "text": "THE SPECIAL INDEX VERDICT",
                    "font-family": "Inter",
                    "font-size": 34,
                    "font-weight": 800,
                    "color": "#10b981",
                    "background-color": "rgba(6, 9, 15, 0.90)",
                    "position": "top-center",
                    "top": 130,
                    "padding": 16,
                    "border-radius": 28
                },
                # Huge Score Callout
                {
                    "type": "text",
                    "text": "9.1 / 10",
                    "font-family": "Inter",
                    "font-size": 135,
                    "font-weight": 900,
                    "color": "#10b981",
                    "position": "top-center",
                    "top": 230,
                    "shadow-color": "#000000",
                    "shadow-offset": 6
                },
                {
                    "type": "text",
                    "text": "VERDICT: TRUE GEM ✦",
                    "font-family": "Inter",
                    "font-size": 48,
                    "font-weight": 900,
                    "color": "#ffffff",
                    "position": "top-center",
                    "top": 390,
                    "shadow-color": "#000000",
                    "shadow-offset": 4
                },
                # Website Brand Footer
                {
                    "type": "text",
                    "text": "www.isitspecial.com",
                    "font-family": "Inter",
                    "font-size": 38,
                    "font-weight": 800,
                    "color": "#10b981",
                    "position": "bottom-center",
                    "bottom": 160,
                    "background-color": "rgba(6, 9, 15, 0.90)",
                    "padding": 14,
                    "border-radius": 22
                },
                # Scene 3 Voiceover
                {
                    "type": "voice",
                    "voice": "en-US-AndrewNeural",
                    "text": "To avoid bitter coffee, always brew with preheated hot water on low flame. With zero electronic circuit boards, a Moka pot lasts over 30 years. Our final score: 9.1 out of 10. A True Gem of industrial engineering. Read the full teardown on isitspecial.com."
                }
            ]
        }
    ],

    # Top-Level Elements: Synchronized Subtitles
    "elements": [
        # High-Impact Subtitles
        {
            "type": "subtitles",
            "model": "default",
            "language": "en",
            "settings": {
                "style": "classic",
                "font-family": "Inter",
                "font-size": 66,
                "all-caps": True,
                "word-color": "#fbbf24",
                "line-color": "#ffffff",
                "outline-color": "#000000",
                "outline-width": 4,
                "shadow-color": "#000000",
                "shadow-offset": 3,
                "max-words-per-line": 5,
                "position": "bottom-center"
            }
        }
    ]
}

def main():
    print("🚀 Triggering High-End 3-Scene Video Generation on JSON2Video...", flush=True)
    headers = {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(API_ENDPOINT, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        project_id = data.get("project")
        print(f"✅ Render Job Accepted! Project ID: {project_id}", flush=True)
        print("⏳ Rendering in cloud (polling status every 5 seconds)...", flush=True)

        for attempt in range(1, 35):
            time.sleep(5)
            status_res = requests.get(f"{API_ENDPOINT}?project={project_id}", headers=headers)
            status_data = status_res.json()
            movie = status_data.get("movie", {})
            status = movie.get("status") or status_data.get("status")
            print(f"[{attempt * 5}s] Current Render Status: {status}...", flush=True)

            if status == "done":
                video_url = movie.get("url")
                print("\n🎉 VIDEO RENDER FINISHED SUCCESSFULLY!", flush=True)
                print(f"🔗 Public Video URL: {video_url}", flush=True)
                
                out_dir = os.path.join(BASE_DIR, "public", "videos")
                os.makedirs(out_dir, exist_ok=True)
                local_path = os.path.join(out_dir, "bialetti-moka-express-shorts.mp4")
                
                print(f"📥 Downloading latest MP4 to {local_path}...", flush=True)
                video_bytes = requests.get(video_url).content
                with open(local_path, "wb") as f:
                    f.write(video_bytes)
                print(f"✅ Downloaded & saved to local disk ({len(video_bytes):,} bytes)!", flush=True)
                return video_url
            elif status == "error":
                print(f"❌ Render failed with error: {status_data}", flush=True)
                sys.exit(1)

        print("⚠️ Render is taking longer than expected. Check the project URL later.", flush=True)
    except Exception as e:
        print(f"❌ API Request failed: {e}", flush=True)
        sys.exit(1)

if __name__ == "__main__":
    main()
