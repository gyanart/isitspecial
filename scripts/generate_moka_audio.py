"""
Audio generation and frame duration calculator for Bialetti Moka Express 12-scene video.
Voice: en-IN-NeerjaExpressiveNeural (Cultured Indian English Female)
Rate: +4%
12 scenes modular standard (~2m 30s).
"""
import asyncio
import os
import edge_tts
from mutagen.mp3 import MP3

VOICE = "en-IN-NeerjaExpressiveNeural"
RATE = "+4%"

SCENES = [
    (
        "moka_scene01_in.mp3",
        "Walk into any luxury espresso bar in Rome or Milan, and you're surrounded by chrome dual-boiler machines costing upwards of three thousand dollars. Yet sitting on ninety percent of Italian kitchen stovetops is an angular aluminum pot costing thirty-five dollars: the Bialetti Moka Express."
    ),
    (
        "moka_scene02_in.mp3",
        "Invented in 1933 by Alfonso Bialetti in Omegna, Italy, the design was inspired by an unlikely machine: a primitive laundry boiler. Bialetti noticed boiling water rising through a central pipe and realized the exact same thermodynamic principle could brew concentrated coffee."
    ),
    (
        "moka_scene03_in.mp3",
        "Over three hundred million units have been cast since 1933. Exhibited permanently in London's Science Museum and New York's MoMA, it transformed espresso from a public café luxury into an everyday domestic ritual."
    ),
    (
        "moka_scene04_in.mp3",
        "Unlike modern espresso pumps pushing nine bars of mechanical force, the Moka pot is a pure thermodynamic steam engine. As water in the lower boiler heats, expanding trapped vapor generates one-point-five bars of pressure, forcing water upward through the coffee funnel."
    ),
    (
        "moka_scene05_in.mp3",
        "Liquid rises through the grounds at approximately ninety-five to one-hundred-two degrees Celsius, extracting deep lipids, aromatic oils, and melanoidins. It yields double the dissolved coffee solids of conventional drip brewing without a single electric wire."
    ),
    (
        "moka_scene06_in.mp3",
        "Its eight-sided geometry is not decorative; it is thermal physics. Die-cast aluminum has a thermal conductivity nearly ten times higher than stainless steel, diffusing burner heat evenly across eight facets to eliminate scorching hot spots."
    ),
    (
        "moka_scene07_in.mp3",
        "Bare aluminum naturally forms a protective microscopic passivating layer of aluminum oxide. Over months of brewing, coffee oils season the porous metal, which is why Italian households strictly ban dish soap and only rinse with warm water."
    ),
    (
        "moka_scene08_in.mp3",
        "Tucked onto the lower boiler wall is a spring-loaded brass inspection valve. If a user dangerously packs the coffee bed too tight, the valve automatically vents excess steam pressure, preventing boiler rupture."
    ),
    (
        "moka_scene09_in.mp3",
        "The common complaint that Moka coffee tastes bitter is user error. If you boil cold water from scratch on high heat, the metal burns the dry coffee grounds. The golden secret is simple: always fill the boiler with pre-boiled hot water and brew over gentle low heat."
    ),
    (
        "moka_scene10_in.mp3",
        "In 1953, cartoonist Paul Campani created 'the little man with the mustache' modeled after Alfonso's son, Renato Bialetti, with his finger raised ordering an espresso. When Renato passed away in 2016, his ashes were placed inside an oversized Moka pot."
    ),
    (
        "moka_scene11_in.mp3",
        "Compared to a plastic capsule pod machine that creates landfill waste and dies in four years, a thirty-five-dollar Moka pot lasts twenty-five years. Over a decade of daily coffee, your hardware cost is less than half a cent per cup."
    ),
    (
        "moka_scene12_in.mp3",
        "In an era of disposable electronics and fragile touchscreens, the Bialetti Moka Express is an enduring monument to honest Italian physics. With a Special Score of 9.1 out of 10, it is an undeniable True Gem."
    ),
]

async def generate():
    out_dir = os.path.join("public", "audio", "moka")
    os.makedirs(out_dir, exist_ok=True)
    
    total_raw = 0
    total_buffered = 0
    results = []
    
    for idx, (filename, text) in enumerate(SCENES, 1):
        out_path = os.path.join(out_dir, filename)
        communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
        await communicate.save(out_path)
        
        audio = MP3(out_path)
        raw_dur = audio.info.length
        # 0.8s transition buffer per scene
        buf_dur = raw_dur + 0.8
        frames = int(round(buf_dur * 30))
        
        total_raw += raw_dur
        total_buffered += buf_dur
        results.append((idx, filename, round(raw_dur, 2), frames))
        print(f"Scene {idx:02d}: {filename} -> raw: {raw_dur:.2f}s, frames: {frames}")
        
    print("\n--- BIALETTI MOKA SUMMARY ---")
    print(f"Total Raw Duration: {total_raw:.2f}s ({(total_raw/60):.2f} mins)")
    print(f"Total Buffered Duration: {total_buffered:.2f}s ({(total_buffered/60):.2f} mins)")
    print(f"Total Frames (@ 30 fps): {sum(r[3] for r in results)}")
    
    for idx, fn, r_dur, f in results:
        print(f"  Scene{idx:02d}: {f} frames ({f/30:.2f}s)")

if __name__ == "__main__":
    asyncio.run(generate())
