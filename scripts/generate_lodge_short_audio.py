import asyncio
import os
import edge_tts
from mutagen.mp3 import MP3

VOICE = "en-IN-NeerjaExpressiveNeural"
RATE = "+6%"

# 6 Tight, high-velocity segments tailored for a 54-57 second YouTube Short (<60s ceiling)
SEGMENTS = [
    {
        "id": "seg01_hook",
        "text": "Why does a twenty-five dollar piece of iron from Tennessee out-cook a three hundred dollar luxury non-stick pan?",
        "title": "THE $300 TEFLON PARADOX",
        "tag": "IRON VS TEFLON",
        "metric_label": "PRICE GAP",
        "metric_val": "$25 vs $300",
    },
    {
        "id": "seg02_foundry",
        "text": "Since 1896 in South Pittsburg, Tennessee, Lodge has poured 2,800-degree molten pig iron into sand molds. Zero shortcuts. Zero plastic.",
        "title": "1896 FOUNDRY ORIGIN",
        "tag": "SAND-CASTING",
        "metric_label": "FOUNDRY TEMP",
        "metric_val": "2,800°F Molten Iron",
    },
    {
        "id": "seg03_physics",
        "text": "Thin aluminum drops 150 degrees and boils meat. 5.4 pounds of dense iron holds thermal inertia, searing steaks with the Maillard reaction.",
        "title": "THERMAL INERTIA",
        "tag": "MAILLARD REACTION",
        "metric_label": "HEAT CAPACITY",
        "metric_val": "3.7 MJ/m³·K",
    },
    {
        "id": "seg04_chemistry",
        "text": "Heated past smoke point, vegetable oil polymerizes into a glassy carbon patina that gets slicker with every single cook.",
        "title": "POLYMERIZATION PATINA",
        "tag": "ORGANIC CHEMISTRY",
        "metric_label": "SURFACE COATING",
        "metric_val": "Cross-Linked Carbon",
    },
    {
        "id": "seg05_cpu",
        "text": "Scratched Teflon hits a landfill in three years. Cast iron can be restored with steel wool and lasts a century for one-fifth of a cent per meal.",
        "title": "100-YEAR LIFESPAN",
        "tag": "COST-PER-USE",
        "metric_label": "HARDWARE COST",
        "metric_val": "$0.002 / Meal",
    },
    {
        "id": "seg06_verdict",
        "text": "The Lodge Cast Iron Skillet scores 9.2 out of 10 on the Special Index: A True Gem.",
        "title": "THE SPECIAL VERDICT",
        "tag": "THE SPECIAL INDEX™",
        "metric_label": "SPECIAL SCORE",
        "metric_val": "9.2 / 10 • True Gem",
    },
]

OUTPUT_DIR = os.path.join("public", "audio", "lodge_short")
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
