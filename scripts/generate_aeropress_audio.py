import asyncio
import edge_tts
import os

VOICEOVERS = {
    1: "Walk into a high-end specialty café and you'll find fifteen-thousand-dollar chrome espresso machines. Yet the champion of global coffee tournaments is a forty-dollar plastic syringe.",
    2: "Invented in 2005 by Alan Adler, a retired Stanford aerodynamics lecturer who created the world-record Aerobie flying ring, the AeroPress was born in a physics lab.",
    3: "Today, competitors from over sixty nations compete in the annual World AeroPress Championship, proving that simple engineering out-extracts complex multi-thousand-dollar machinery.",
    4: "In traditional pour-overs, water follows the path of least resistance. This channeling creates harsh bitter hotspots and sour under-extracted pockets.",
    5: "The AeroPress solves this through total immersion. Every microscopic ground is submerged simultaneously in a sealed chamber, delivering mathematical extraction symmetry.",
    6: "Boiling water strips bitter chlorogenic acids from the bean. Adler discovered that under pneumatic pressure, coffee reaches peak natural sweetness at just eighty degrees Celsius.",
    7: "With a gentle press of your hand, trapped air compresses, forcing water through the slurry under zero-point-seven-five bar of pressure in under sixty seconds.",
    8: "Unlike the muddy silt of a French press, the AeroPress uses a micro-paper disc that captures bitter diterpenes and sediment, leaving you with silky clarity.",
    9: "Drop a glass Chemex on granite and it shatters. The AeroPress is molded from food-grade polypropylene that can survive being run over by a truck.",
    10: "Cleanup takes three seconds. The silicone seal acts as a squeegee, and a final push ejects a solid, dry coffee puck straight into your compost.",
    11: "At forty dollars and a fifteen-year lifespan, each cup costs less than three cents in hardware, saving you thousands compared to disposable pods.",
    12: "Nine-point-seven out of ten. The AeroPress isn't just an affordable coffee maker, it is an authentic aerodynamic masterpiece for every kitchen."
}

async def generate_all():
    out_dir = os.path.join("public", "audio", "aeropress")
    os.makedirs(out_dir, exist_ok=True)
    voice = "en-US-AriaNeural"
    
    print(f"🎙️ Generating 12 English Voiceovers using {voice}...")
    for scene_num, script in VOICEOVERS.items():
        filename = f"aeropress_scene{scene_num:02d}_en.mp3"
        dest = os.path.join(out_dir, filename)
        comm = edge_tts.Communicate(script, voice)
        await comm.save(dest)
        print(f"✅ Scene {scene_num:02d} voiceover saved: {dest} ({os.path.getsize(dest):,} bytes)")

if __name__ == "__main__":
    asyncio.run(generate_all())
