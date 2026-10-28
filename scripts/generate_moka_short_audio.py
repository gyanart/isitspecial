import asyncio
import os
import edge_tts
from mutagen.mp3 import MP3

VOICE = "en-IN-NeerjaExpressiveNeural"
RATE = "+5%"

# 6 Punchy Segments designed for a 54-second YouTube Short (<60s hard ceiling)
SEGMENTS = [
    {
        "id": "seg01_hook",
        "text": "Why does a thirty-five dollar aluminum pot from 1933 out-brew a three thousand dollar espresso machine?",
        "title": "THE $3,000 PARADOX",
        "tag": "1933 VS 2026",
        "image": "images/moka-scene-01-cafe-contrast.jpg",
        "metric_label": "PRICE CONTRAST",
        "metric_val": "$35 vs $3,000",
    },
    {
        "id": "seg02_laundry",
        "text": "In 1933, Alfonso Bialetti watched his wife wash laundry with a boiler that forced hot water up a pipe. He took that exact physics to build the Moka Express.",
        "title": "THE LAUNDRY BOILER",
        "tag": "ALFONSO BIALETTI",
        "image": "images/moka-scene-02-alfonso-bialetti.jpg",
        "metric_label": "INVENTION ORIGIN",
        "metric_val": "Omegna, Italy 1933",
    },
    {
        "id": "seg03_pressure",
        "text": "Zero electric pumps. Expanding steam generates 1.5 bars of vapor pressure, driving hot water through the coffee basket at 95 degrees.",
        "title": "1.5 BARS OF STEAM",
        "tag": "THERMODYNAMICS",
        "image": "images/moka-scene-05-espresso-extraction.jpg",
        "metric_label": "VAPOR PRESSURE",
        "metric_val": "1.5 - 2.0 Bar",
    },
    {
        "id": "seg04_aluminum",
        "text": "Its octagonal aluminum body diffuses heat ten times faster than steel, while coffee oils create a protective patina. That is why Italians ban dish soap.",
        "title": "THE 8-SIDED SHIELD",
        "tag": "OCTAGONAL GEOMETRY",
        "image": "images/moka-scene-06-octagonal-facets.jpg",
        "metric_label": "CONDUCTIVITY",
        "metric_val": "205 W/m·K",
    },
    {
        "id": "seg05_cpu",
        "text": "Zero circuit boards to fry, zero plastic pods, and twenty-five years of daily coffee for less than half a cent per cup.",
        "title": "HEIRLOOM LIFESPAN",
        "tag": "COST-PER-USE",
        "image": "images/moka-scene-11-cost-per-use.jpg",
        "metric_label": "COST PER CUP",
        "metric_val": "$0.003 / Day",
    },
    {
        "id": "seg06_verdict",
        "text": "The Bialetti Moka Express scores 9.1 out of 10 on the Special Index: A True Gem.",
        "title": "THE SPECIAL VERDICT",
        "tag": "THE SPECIAL INDEX™",
        "image": "images/moka-scene-12-verdict-masterpiece.jpg",
        "metric_label": "SPECIAL SCORE",
        "metric_val": "9.1 / 10 True Gem",
    },
]

OUTPUT_DIR = os.path.join("public", "audio", "moka_short")
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def generate():
    total_duration = 0.0
    manifest = []
    
    for i, seg in enumerate(SEGMENTS):
        filename = f"{seg['id']}.mp3"
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        communicate = edge_tts.Communicate(seg['text'], VOICE, rate=RATE)
        await communicate.save(filepath)
        
        audio = MP3(filepath)
        duration = audio.info.length
        # 0.15s breathing pad
        duration_padded = round(duration + 0.15, 2)
        frames = int(round(duration_padded * 30))
        
        manifest.append({
            "index": i,
            "id": seg["id"],
            "filename": filename,
            "text": seg["text"],
            "title": seg["title"],
            "tag": seg["tag"],
            "image": seg["image"],
            "metric_label": seg["metric_label"],
            "metric_val": seg["metric_val"],
            "duration": duration_padded,
            "frames": frames,
        })
        
        total_duration += duration_padded
        print(f"[{i+1}/{len(SEGMENTS)}] {seg['id']}: {duration:.2f}s (+0.15s pad -> {duration_padded}s / {frames}f)")
        
    print(f"\nTotal Short Duration: {total_duration:.2f} seconds ({int(round(total_duration * 30))} frames @ 30fps)")
    
    # Save manifest as JSON
    import json
    with open(os.path.join(OUTPUT_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump({
            "total_duration": total_duration,
            "total_frames": int(round(total_duration * 30)),
            "segments": manifest
        }, f, indent=2)

if __name__ == "__main__":
    asyncio.run(generate())
