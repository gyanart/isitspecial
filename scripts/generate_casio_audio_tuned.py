"""
Audio generation and duration tuning for Casio F-91W 4-minute video essay.
Voice: en-IN-NeerjaExpressiveNeural (Cultured Indian English Female)
Rate: +4%
Target: Exactly 4 minutes (240s / ~7,200 frames @ 30fps).
"""
import asyncio
import os
import edge_tts
from mutagen.mp3 import MP3

VOICE = "en-IN-NeerjaExpressiveNeural"
RATE = "+4%"

# 14 polished scenes designed to hit ~240s total runtime (including scene buffers)
SCENES = [
    (
        "casio_scene01_in.mp3",
        "Walk into any Swiss horology boutique in Geneva or London, and you're met with hand-beveled mechanical tourbillons costing upwards of ten thousand dollars. Yet sitting quietly on convenience store racks across the globe for fifteen dollars is a small slab of molded resin that keeps better time: the Casio F-91W."
    ),
    (
        "casio_scene02_in.mp3",
        "Designed in Tokyo in 1989 by Casio engineer Ryusuke Moriai, the F-91W was conceived without CAD computers or marketing focus groups. Moriai crafted its understated rectangular profile to be flat, functional, and completely devoid of vanity."
    ),
    (
        "casio_scene03_in.mp3",
        "While modern electronics are rendered obsolete within three years, Casio still manufactures and ships over three million F-91W watches every single year. Four decades after its release, it remains one of the most widely worn electronic devices in human history."
    ),
    (
        "casio_scene04_in.mp3",
        "Weighing an astonishing twenty-one grams, the watch virtually disappears on the human wrist. You can type for twelve hours, climb a mountain, or sleep without feeling a single millimeter of drag or friction."
    ),
    (
        "casio_scene05_in.mp3",
        "Inside sits a synthetic quartz tuning fork, laser-cut to oscillate precisely 32,768 times every second. An integrated CMOS circuit divides those vibrations down to exactly one electrical pulse per second, embarrassing the accuracy of hand-wound mechanical gears."
    ),
    (
        "casio_scene06_in.mp3",
        "While smartwatches demand daily recharging cables and battery anxiety, the F-91W is powered by a single CR2016 lithium coin cell. Officially rated for seven years, owners routinely report ten to twelve years of continuous operation on the factory battery."
    ),
    (
        "casio_scene07_in.mp3",
        "Though modestly stamped 'Water Resist' for light rain, enthusiasts have subjected the F-91W to brutal abuse. It has been frozen solid in ice, boiled in bubbling water, run over by five-ton trucks, and submerged thirty meters deep without leaking a single drop."
    ),
    (
        "casio_scene08_in.mp3",
        "The secret to its survival lies in four simple corner screws clamping a stainless steel plate against an oiled rubber O-ring gasket. Under external water pressure, the seal actually compresses tighter against the internal resin frame."
    ),
    (
        "casio_scene09_in.mp3",
        "Few objects bridge human demographics like the F-91W. It was worn by a young Barack Obama, embraced by NASA astronauts, issued to frontline military medics, and favored by hipster artists in Berlin and construction workers in Tokyo."
    ),
    (
        "casio_scene10_in.mp3",
        "That unshakeable reliability also led to dark notoriety. Military intelligence documents in Guantanamo Bay revealed the F-91W was identified as the signature timer for explosive devices, precisely because its digital alarm circuit never drifted and never failed."
    ),
    (
        "casio_scene11_in.mp3",
        "To remain intellectually honest, the F-91W has two flaws: its microscopic green illumination diode barely lights the hours digit in pitch darkness, and its polyurethane strap oxidizes after four years. Fortunately, a durable nylon NATO strap costs five dollars."
    ),
    (
        "casio_scene12_in.mp3",
        "Because counterfeiters produce millions of fake copies, Casio baked in a secret hardware diagnostic. Hold down the bottom-right button for three seconds, and the LCD controller reveals the word 'C-A-S-I-O'. If those letters don't appear, you're holding a fake."
    ),
    (
        "casio_scene13_in.mp3",
        "A luxury mechanical watch requires a five-hundred-dollar overhaul every five years just to maintain accuracy. The F-91W costs fifteen dollars once, runs for a decade without maintenance, and keeps time more reliably than a machine costing three hundred times as much."
    ),
    (
        "casio_scene14_in.mp3",
        "When you calculate the mathematical cost-per-use, an eighteen-dollar purchase worn continuously across ten years works out to less than half a cent per day. It is quite literally the most cost-efficient precision timing instrument on planet Earth."
    ),
    (
        "casio_scene15_in.mp3",
        "Perfection in design is reached not when there is nothing left to add, but when there is nothing left to take away. With a Special Score of 9.6 out of 10, the Casio F-91W is an undeniable modern masterpiece."
    ),
]

async def generate():
    out_dir = os.path.join("public", "audio", "casio")
    os.makedirs(out_dir, exist_ok=True)
    
    total_raw = 0
    total_buffered = 0
    frame_list = []
    
    for idx, (filename, text) in enumerate(SCENES, 1):
        out_path = os.path.join(out_dir, filename)
        communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
        await communicate.save(out_path)
        
        audio = MP3(out_path)
        raw_dur = audio.info.length
        # 0.8s buffer per scene
        buf_dur = raw_dur + 0.8
        frames = int(round(buf_dur * 30))
        
        total_raw += raw_dur
        total_buffered += buf_dur
        frame_list.append((idx, filename, round(raw_dur, 2), frames))
        print(f"Scene {idx:02d}: {filename} -> raw: {raw_dur:.2f}s, frames: {frames}")
        
    print("\n--- RESULTS ---")
    print(f"Total Raw Duration: {total_raw:.2f}s")
    print(f"Total Buffered Duration: {total_buffered:.2f}s ({(total_buffered/60):.2f} mins)")
    print(f"Total Frames (@ 30 fps): {sum(f[3] for f in frame_list)}")
    print(f"Target: 240s (4.00 mins) = 7,200 frames")

if __name__ == "__main__":
    asyncio.run(generate())
