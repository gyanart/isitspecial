import asyncio
import edge_tts
import subprocess
import os

VOICEOVERS = {
    1: "Walk into any luxury stationery boutique and you will find hand-turned Italian resin pens priced upwards of six hundred dollars. Yet inside billions of bank counters, classrooms, and government offices sits a clear plastic tube costing thirty cents: the Bic Cristal.",
    2: "Introduced in Paris in December 1950 by Marcel Bich, who bought the patent rights from Hungarian inventor László Bíró, the Cristal democratized human literacy across one hundred and sixty nations.",
    3: "With over one hundred billion units sold, it is the best-selling pen in human history, earning a permanent spot in the design collection of the Museum of Modern Art in New York.",
    4: "The secret to its reliability is at the very tip: a sphere made of tungsten carbide, ground and polished to a tolerance of zero-point-one microns, tighter than the pistons in a Formula One engine.",
    5: "Held in a precision-milled brass socket, this microscopic ball rotates smoothly as you drag it across paper, pulling a controlled layer of viscous oil-based ink by pure capillary action.",
    6: "Look closely at the clear barrel and you will notice a tiny pinhole. This is not a defect—it is an atmospheric barometric equalizer that prevents a vacuum from starving the tip of ink.",
    7: "In 1991, Bic added a ventilated hole to the top of the cap—a life-saving design allowing air to pass through in case a child accidentally swallows it, keeping airways open for medical help.",
    8: "The iconic hexagonal barrel was borrowed from classic wood pencils. It provides a natural three-finger tripod grip and mathematically stops the pen from rolling off inclined desks.",
    9: "Inside the clear polystyrene tube is enough viscous ink paste to draw an unbroken line three kilometers long—nearly two full miles of continuous handwriting without a single skip.",
    10: "The Bic Cristal is democratic design at its zenith: the wealthiest billionaire on earth cannot purchase a pen that lays down a smoother ball bearing.",
    11: "At thirty cents and two miles of writing, each handwritten page costs less than zero-point-zero-zero-zero-one dollars in hardware—an efficiency unmatched by any luxury fountain pen.",
    12: "Nine-point-eight out of ten. The Bic Cristal isn't cheap disposable plastic—it is an undisputed triumph of micro-precision engineering and a modern design masterpiece."
}

async def generate_all():
    out_dir = os.path.join("public", "audio", "bic")
    os.makedirs(out_dir, exist_ok=True)
    voice = "en-IN-NeerjaExpressiveNeural"
    ffmpeg_bin = os.path.join("node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe")
    
    print(f"🎙️ Generating 12 Indian Female Voiceovers for Bic Cristal using {voice}...")
    for scene_num, script in VOICEOVERS.items():
        filename = f"bic_scene{scene_num:02d}_in.mp3"
        dest = os.path.join(out_dir, filename)
        comm = edge_tts.Communicate(script, voice, rate="+4%")
        await comm.save(dest)
        
        # Get duration
        res = subprocess.run([ffmpeg_bin, "-i", dest], stderr=subprocess.PIPE, text=True)
        duration_line = [l.strip() for l in res.stderr.splitlines() if "Duration:" in l]
        d_str = duration_line[0] if duration_line else "unknown"
        print(f"✅ Scene {scene_num:02d}: {dest} | {d_str}")

if __name__ == "__main__":
    asyncio.run(generate_all())
