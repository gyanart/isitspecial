import asyncio
import os
import edge_tts
from mutagen.mp3 import MP3

VOICE = "en-IN-NeerjaExpressiveNeural"
RATE = "+6%"

SEGMENTS = [
    {
        "id": "seg01_hook",
        "text": "Why does a fifteen dollar digital watch from 1989 keep better time than a ten thousand dollar Swiss Rolex?",
        "title": "THE $10,000 SWISS PARADOX",
        "tag": "CASIO VS ROLEX",
        "metric_label": "PRICE CONTRAST",
        "metric_val": "$15 vs $10,000",
    },
    {
        "id": "seg02_origin",
        "text": "Designed in Tokyo by Ryusuke Moriai, it weighs just 21 grams. Zero CAD software. Over three million are sold every year.",
        "title": "1989 TOKYO DESIGN",
        "tag": "RYUSUKE MORIAI",
        "metric_label": "ANNUAL SALES",
        "metric_val": "3,000,000+ Units/Yr",
    },
    {
        "id": "seg03_quartz",
        "text": "Inside vibrates a synthetic quartz tuning fork at 32,768 hertz, stepped down by a 15-stage binary divider to one pulse per second.",
        "title": "32,768 HZ QUARTZ",
        "tag": "HOROLOGY SCIENCE",
        "metric_label": "OSCILLATION",
        "metric_val": "32,768 Hz ±1s/Day",
    },
    {
        "id": "seg04_durability",
        "text": "Its CR2016 battery lasts ten years. It has survived being frozen in ice, boiled in water, and run over by a five-ton truck.",
        "title": "ACCIDENTAL INDESTRUCTIBILITY",
        "tag": "TORTURE TESTS",
        "metric_label": "BATTERY LIFE",
        "metric_val": "7 - 10 Years",
    },
    {
        "id": "seg05_easteregg",
        "text": "Hold the right button for five seconds, and the screen reveals a secret hardware Easter egg spelling CASIO to expose fakes.",
        "title": "SECRET HARDWARE EASTER EGG",
        "tag": "SECURITY CHIP",
        "metric_label": "AUTHENTICITY",
        "metric_val": "CASIO Display",
    },
    {
        "id": "seg06_verdict",
        "text": "Costing half a cent per day, the Casio F-91W scores 9.6 out of 10 on the Special Index: A Modern Masterpiece.",
        "title": "THE SPECIAL VERDICT",
        "tag": "THE SPECIAL INDEX™",
        "metric_label": "SPECIAL SCORE",
        "metric_val": "9.6 / 10 Masterpiece",
    },
]

OUTPUT_DIR = os.path.join("public", "audio", "casio_short")
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def generate():
    total_sec = 0.0
    total_frames = 0
    manifest = []
    
    for i, seg in enumerate(SEGMENTS):
        filename = f"{seg['id']}.mp3"
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        communicate = edge_tts.Communicate(seg['text'], VOICE, rate=RATE)
        await communicate.save(filepath)
        
        audio = MP3(filepath)
        dur = audio.info.length
        # 0.15s breathing pad
        dur_padded = round(dur + 0.15, 2)
        frames = int(round(dur_padded * 30))
        
        total_sec += dur_padded
        total_frames += frames
        
        manifest.append({
            "segment": i + 1,
            "id": seg["id"],
            "title": seg["title"],
            "tag": seg["tag"],
            "filename": filename,
            "metric_label": seg["metric_label"],
            "metric_val": seg["metric_val"],
            "duration": dur_padded,
            "frames": frames,
        })
        print(f"Segment {i+1} ({seg['title']}): {dur:.2f}s -> {dur_padded}s ({frames} frames)")
        
    print(f"\nTotal Short Duration: {total_sec:.2f}s ({total_frames} frames @ 30fps, ~{total_sec} sec)")
    
    import json
    with open(os.path.join(OUTPUT_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump({"total_duration": total_sec, "total_frames": total_frames, "segments": manifest}, f, indent=2)

if __name__ == "__main__":
    asyncio.run(generate())
