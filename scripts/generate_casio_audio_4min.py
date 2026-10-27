"""
13-Scene 4-Minute Master Audio Generator for Casio F-91W.
Target: ~228-232s raw voiceover + buffers = 240.0 seconds (4 minutes / 7,200 frames @ 30fps).
"""
import asyncio
import os
import edge_tts
from mutagen.mp3 import MP3

VOICE = "en-IN-NeerjaExpressiveNeural"
RATE = "+4%"

SCENES = [
    (
        "casio_scene01_in.mp3",
        "Walk into any Swiss horology boutique in Geneva or London, and you're met with mechanical tourbillons costing ten thousand dollars. Yet sitting quietly on convenience store racks across the globe for fifteen dollars is a small slab of molded resin that keeps better time: the Casio F-91W."
    ),
    (
        "casio_scene02_in.mp3",
        "Designed in Tokyo in 1989 by Casio engineer Ryusuke Moriai, the F-91W was conceived without CAD computers or marketing committees. Moriai crafted its understated rectangular profile to be flat, functional, and completely devoid of vanity."
    ),
    (
        "casio_scene03_in.mp3",
        "While modern electronics are obsolete in three years, Casio still manufactures and ships over three million F-91W watches every single year. Four decades later, it remains one of the most widely worn electronic devices in human history."
    ),
    (
        "casio_scene04_in.mp3",
        "Weighing an astonishing twenty-one grams, the watch virtually disappears on the human wrist. You can type for twelve hours, run a marathon, or sleep without feeling a single millimeter of drag or friction."
    ),
    (
        "casio_scene05_in.mp3",
        "Inside sits a synthetic quartz tuning fork, laser-cut to oscillate precisely 32,768 times every second. An integrated CMOS circuit divides those vibrations down to exactly one electrical pulse per second, embarrassing the accuracy of hand-wound mechanical gears."
    ),
    (
        "casio_scene06_in.mp3",
        "While modern smartwatches demand daily recharging cables and battery anxiety, the F-91W is powered by a single CR2016 lithium coin cell. Officially rated for seven years, owners routinely report ten to twelve years of continuous operation on the factory battery."
    ),
    (
        "casio_scene07_in.mp3",
        "Though modestly stamped 'Water Resist' for light rain, enthusiasts have subjected the F-91W to brutal abuse. It has been frozen solid in ice, boiled in bubbling kettles, run over by five-ton trucks, and submerged thirty meters deep without leaking a single drop."
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
        "To remain intellectually honest, the F-91W has two flaws: its microscopic green illumination diode barely lights the hours digit in pitch darkness, and its polyurethane strap oxidizes after four years. Fortunately, a durable nylon NATO strap costs five dollars."
    ),
    (
        "casio_scene11_in.mp3",
        "Because counterfeiters produce millions of fake copies, Casio baked in a secret hardware diagnostic. Hold down the bottom-right button for three seconds, and the LCD controller reveals the word 'C-A-S-I-O'. If those letters don't appear, you're holding a fake."
    ),
    (
        "casio_scene12_in.mp3",
        "When you calculate the mathematical cost-per-use, an eighteen-dollar purchase worn continuously across ten years works out to less than half a cent per day. It is quite literally the most cost-efficient precision timing instrument on planet Earth."
    ),
    (
        "casio_scene13_in.mp3",
        "Perfection in design is reached not when there is nothing left to add, but when there is nothing left to take away. With a Special Score of 9.6 out of 10, the Casio F-91W is an undeniable modern masterpiece."
    ),
]

async def generate():
    out_dir = os.path.join("public", "audio", "casio")
    os.makedirs(out_dir, exist_ok=True)
    
    total_raw = 0
    frame_list = []
    
    for idx, (filename, text) in enumerate(SCENES, 1):
        out_path = os.path.join(out_dir, filename)
        communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
        await communicate.save(out_path)
        
        audio = MP3(out_path)
        raw_dur = audio.info.length
        total_raw += raw_dur
        frame_list.append((idx, filename, round(raw_dur, 2)))
        print(f"Scene {idx:02d}: {filename} -> raw: {raw_dur:.2f}s")
        
    print("\n--- 13 SCENES SUMMARY ---")
    print(f"Total Raw Duration: {total_raw:.2f}s ({(total_raw/60):.2f} mins)")
    # Target is exactly 7,200 frames (240.0 seconds)
    target_frames = 7200
    # Distribute 7200 frames proportionally based on raw_dur
    proportional_frames = []
    current_sum = 0
    for idx, filename, raw_dur in frame_list:
        f = int(round((raw_dur / total_raw) * target_frames))
        proportional_frames.append((idx, filename, raw_dur, f))
        current_sum += f
        
    # Adjust difference on last scene
    diff = target_frames - current_sum
    if diff != 0:
        idx, filename, raw_dur, f = proportional_frames[-1]
        proportional_frames[-1] = (idx, filename, raw_dur, f + diff)
        
    print("\n--- EXACT PROPORTIONAL 7,200 FRAMES (4m 00s) ---")
    for idx, filename, raw_dur, f in proportional_frames:
        buf = (f / 30) - raw_dur
        print(f"Scene {idx:02d}: {f} frames ({f/30:.2f}s) | raw: {raw_dur:.2f}s | buffer: +{buf:.2f}s")
        
    print(f"\nTOTAL FRAMES: {sum(x[3] for x in proportional_frames)} == 7200 ({7200/30} seconds = 4.00 mins)!")

if __name__ == "__main__":
    asyncio.run(generate())
