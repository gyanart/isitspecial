import asyncio
import os
import edge_tts
from mutagen.mp3 import MP3

VOICE = "en-IN-NeerjaExpressiveNeural"
RATE = "+4%"

SCENES = [
    {
        "id": "lodge_scene01_in",
        "title": "The $300 Teflon Paradox",
        "text": "Walk into any luxury culinary boutique in New York, Paris, or Tokyo, and you are surrounded by walls of pastel-colored non-stick pans costing up to three hundred dollars. Yet inside professional restaurant kitchens, chefs rely on a heavy, raw black disk from Tennessee that costs twenty-five dollars: The Lodge Cast Iron Skillet."
    },
    {
        "id": "lodge_scene02_in",
        "title": "1896 South Pittsburg, Tennessee",
        "text": "In 1896, Joseph Lodge established the Blacklock Foundry in the quiet Appalachian town of South Pittsburg, Tennessee. After a devastating fire in 1910, the company reorganized as Lodge Manufacturing, surviving two World Wars and the Great Depression by refusing to cut metallurgical corners."
    },
    {
        "id": "lodge_scene03_in",
        "title": "The 2,800°F Sand-Casting Foundry",
        "text": "Unlike modern stamped aluminum pans pressed in seconds, every Lodge skillet is born from a cupola furnace roaring at 2,800 degrees Fahrenheit. Molten pig iron and recycled steel are poured into single-use green sand molds, creating the skillet's signature textured, pebble-grain surface."
    },
    {
        "id": "lodge_scene04_in",
        "title": "The Thermodynamic Flaw of Teflon",
        "text": "Why do lightweight non-stick pans produce gray, soggy meat? Thermal mass. When a cold piece of protein hits a thin aluminum pan, the surface temperature plunges by over one hundred and fifty degrees instantly. Instead of searing, the steak boils in its own escaping moisture."
    },
    {
        "id": "lodge_scene05_in",
        "title": "5.4 Pounds of Thermal Inertia",
        "text": "A ten-and-a-quarter-inch Lodge skillet packs 5.4 pounds of dense iron with a massive volumetric heat capacity of 3.7 megajoules per cubic meter Kelvin. When your steak hits the iron, the surface temperature barely flinches, locking in juices with pure thermodynamic inertia."
    },
    {
        "id": "lodge_scene06_in",
        "title": "The Maillard Caramelization Reaction",
        "text": "At three hundred degrees Fahrenheit, amino acids and reducing sugars undergo the Maillard reaction, generating hundreds of complex flavor compounds and a deep, crunchy restaurant-grade mahogany crust that chemical non-stick pans simply cannot replicate without burning their coating."
    },
    {
        "id": "lodge_scene07_in",
        "title": "The Polymerization Chemistry Patina",
        "text": "Cast iron is not naturally non-stick. Its magic comes from organic chemistry. When thin layers of unsaturated vegetable oils are heated past their smoke point, triglycerides undergo thermal polymerization and cross-linking, bonding directly to the iron pores as an indestructible, glassy carbon barrier."
    },
    {
        "id": "lodge_scene08_in",
        "title": "The Anti-Fragile Restoration Miracle",
        "text": "When a chemical non-stick pan scratches or chips, toxic micro-plastics flake into your food and the pan must be thrown away. But cast iron is indestructible. If left in rain and covered in rust, an hour with steel wool, coarse salt, and a fresh coat of oil restores it to factory perfection."
    },
    {
        "id": "lodge_scene09_in",
        "title": "The Honest Friction: Heft & Heat",
        "text": "Cast iron demands respect. At five and a half pounds, single-handed wrist tossing is impossible. Furthermore, iron conducts heat into the entire handle, requiring a silicone sleeve or folded towel. And long, acidic tomato reductions will strip the natural seasoning."
    },
    {
        "id": "lodge_scene10_in",
        "title": "The Two-Minute Maintenance Ritual",
        "text": "Ignore the myths: you can clean cast iron in sixty seconds. Rinse with hot water, gently brush away residue, place it on the stove burner on medium heat for two minutes until bone dry, and wipe a microscopic drop of neutral oil across the surface. That is the entire secret."
    },
    {
        "id": "lodge_scene11_in",
        "title": "The True Cost-Per-Use Equation",
        "text": "A thirty-five dollar non-stick pan lasts three years before peeling, costing four hundred dollars across thirty years of replacement trash. A twenty-five dollar Lodge skillet lasts for four generations. Over fifty years of daily cooking, your hardware cost is less than one-fifth of a cent per meal."
    },
    {
        "id": "lodge_scene12_in",
        "title": "The Special Index Score & Verdict",
        "text": "In a world poisoned by planned obsolescence and disposable cookware, the Lodge Cast Iron Skillet is a triumph of honest American metallurgy. It is cheaper than dinner for two, cooks better with every passing decade, and will outlive your grandchildren. On the Special Index, it earns an exceptional 9.2 out of 10: A True Gem."
    }
]

OUTPUT_DIR = os.path.join("public", "audio", "lodge")
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def generate():
    total_sec = 0.0
    total_frames = 0
    manifest = []
    
    for i, sc in enumerate(SCENES):
        filename = f"{sc['id']}.mp3"
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        communicate = edge_tts.Communicate(sc['text'], VOICE, rate=RATE)
        await communicate.save(filepath)
        
        audio = MP3(filepath)
        dur = audio.info.length
        # 0.25s breathing pad
        dur_padded = round(dur + 0.25, 2)
        frames = int(round(dur_padded * 30))
        
        total_sec += dur_padded
        total_frames += frames
        
        manifest.append({
            "scene": i + 1,
            "id": sc["id"],
            "title": sc["title"],
            "filename": filename,
            "duration": dur_padded,
            "frames": frames,
        })
        print(f"Scene {i+1:02d} ({sc['title']}): {dur:.2f}s -> {dur_padded}s ({frames} frames)")
        
    print(f"\nTotal Master Duration: {total_sec:.2f}s ({total_frames} frames @ 30fps, ~{total_sec/60:.2f} min)")
    
    import json
    with open(os.path.join(OUTPUT_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump({"total_duration": total_sec, "total_frames": total_frames, "scenes": manifest}, f, indent=2)

if __name__ == "__main__":
    asyncio.run(generate())
