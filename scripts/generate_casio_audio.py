"""
Audio generation script for Casio F-91W 4-minute video essay.
Voice: en-IN-NeerjaExpressiveNeural (Cultured Indian English Female)
Rate: +4%
16 scenes totaling ~4 minutes.
"""
import asyncio
import os
import edge_tts

VOICE = "en-IN-NeerjaExpressiveNeural"
RATE = "+4%"

SCENES = [
    (
        "casio_scene01_in.mp3",
        "Walk into any Swiss horology boutique in Geneva or London, and you are met with hand-beveled mechanical tourbillons costing upwards of ten thousand dollars. Yet sitting quietly on convenience store racks across the globe for fifteen dollars is a small slab of molded resin that keeps better time: the Casio F-91W."
    ),
    (
        "casio_scene02_in.mp3",
        "Designed in Tokyo in 1989 by Casio engineer Ryusuke Moriai, the F-91W was conceived without CAD computers or marketing committees. Moriai crafted the small rectangular profile to be flat, functional, and completely devoid of vanity."
    ),
    (
        "casio_scene03_in.mp3",
        "Most consumer electronics are rendered obsolete within three years. Four decades later, Casio still manufactures and sells over three million F-91W watches every single year. It is one of the most widely produced electronic devices in human history."
    ),
    (
        "casio_scene04_in.mp3",
        "Weighing an astonishing twenty-one grams, the watch virtually disappears on the human wrist. You can type at a keyboard for twelve hours, run a marathon, or sleep without feeling a single millimeter of drag or friction."
    ),
    (
        "casio_scene05_in.mp3",
        "Inside the module sits a microscopic synthetic quartz tuning fork, laser-cut to oscillate precisely 32,768 times every second. An integrated CMOS circuit divides those vibrations down to exactly one electrical pulse per second, destroying the accuracy of multi-gear mechanical springs."
    ),
    (
        "casio_scene06_in.mp3",
        "While modern smartwatches demand daily recharging cables and battery anxiety, the F-91W is powered by a single CR2016 lithium coin cell. Officially rated for seven years, real-world owners routinely report ten to twelve years of continuous operation on the factory battery."
    ),
    (
        "casio_scene07_in.mp3",
        "Though modestly stamped 'Water Resist' for light splashes, enthusiasts have subjected the F-91W to brutal abuse. It has been frozen solid in blocks of ice, boiled in bubbling kettles, run over by five-ton trucks, and submerged thirty meters underwater without taking in a single droplet."
    ),
    (
        "casio_scene08_in.mp3",
        "The secret to its survival lies in four simple corner screws clamping a stainless steel plate against an oiled rubber O-ring gasket. As hydrostatic pressure increases, the water pressure actually presses the caseback tighter against the internal gasket seal."
    ),
    (
        "casio_scene09_in.mp3",
        "No object bridges human demographics quite like the F-91W. It was worn famously by a young Barack Obama, embraced by NASA astronauts, issued to frontline military units, and worn by hipster architects in Berlin and construction workers in Mumbai."
    ),
    (
        "casio_scene10_in.mp3",
        "That unshakeable reliability also led to dark notoriety. Military intelligence documents in Guantanamo Bay revealed the F-91W was identified as the signature timer for explosive devices, precisely because its digital alarm countdown never drifted and never failed."
    ),
    (
        "casio_scene11_in.mp3",
        "To remain intellectually honest, the F-91W has one legendary flaw: its microscopic green illumination diode. Emitting from the far left edge, it barely lights up the hours digit in pitch darkness. Casio refused to change it, because a brighter backlight would kill the seven-year battery."
    ),
    (
        "casio_scene12_in.mp3",
        "Its second vulnerability is the resin strap. Under prolonged ultraviolet sunlight and sweat, polyurethane oxidizes and eventually snaps after three to four years. Fortunately, millions of owners swap it for a five-dollar ballistic nylon NATO strap that lasts a lifetime."
    ),
    (
        "casio_scene13_in.mp3",
        "Because counterfeiters produce millions of fake copies, Casio baked in a secret hardware diagnostic. Hold down the bottom-right button for three seconds, and the LCD controller reveals the word 'C-A-S-I-O'. If those letters don't appear, you're holding a fake."
    ),
    (
        "casio_scene14_in.mp3",
        "A luxury mechanical watch requires a five-hundred-dollar service overhaul every five years just to maintain accuracy. The F-91W costs fifteen dollars once, runs for a decade without maintenance, and keeps time more reliably than a machine costing three hundred times as much."
    ),
    (
        "casio_scene15_in.mp3",
        "When you calculate the mathematical cost-per-use, an eighteen-dollar purchase worn continuously across ten years works out to less than half a cent per day. It is quite literally the most cost-efficient precision timing instrument on planet Earth."
    ),
    (
        "casio_scene16_in.mp3",
        "Perfection in design is reached not when there is nothing left to add, but when there is nothing left to take away. With a Special Score of 9.6 out of 10, the Casio F-91W is an undeniable modern masterpiece."
    ),
]

async def generate():
    out_dir = os.path.join("public", "audio", "casio")
    os.makedirs(out_dir, exist_ok=True)
    
    for filename, text in SCENES:
        out_path = os.path.join(out_dir, filename)
        print(f"Generating {filename}...")
        communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
        await communicate.save(out_path)
        print(f"Saved: {out_path}")

if __name__ == "__main__":
    asyncio.run(generate())
