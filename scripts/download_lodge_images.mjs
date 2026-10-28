import fs from 'fs';

const downloads = [
  {
    target: 'public/images/lodge-scene-01-teflon-contrast.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Lodge_skillet.jpg'
  },
  {
    target: 'public/images/lodge-scene-02-tennessee-origin.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Iron-foundry%2C_Varnsdorf.jpg'
  },
  {
    target: 'public/images/lodge-scene-03-molten-iron-pour.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/In-stream_inoculation_addition_while_molten_cast_iron_is_poured_to_a_green_sand_mold_in_a_foundry_in_Bangladesh.jpg'
  },
  {
    target: 'public/images/lodge-scene-04-thermal-drop-flaw.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Liat_Portal_for_Foodie_Disorder_-_Steak_Preparation_in_Skillet.jpg'
  },
  {
    target: 'public/images/lodge-scene-05-thermal-inertia-mass.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Griswold_cast_iron_skillet.jpg'
  },
  {
    target: 'public/images/lodge-scene-06-maillard-crust-sear.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Pan-fried_Rib_Eye_Steak.JPG'
  },
  {
    target: 'public/images/lodge-scene-07-polymerization-patina.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Seasoning_Iron_Skillets_2_%282626669117%29.jpg'
  },
  {
    target: 'public/images/lodge-scene-08-anti-fragile-restoration.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Seasoning_Iron_Skillets_3_%282626670255%29.jpg'
  },
  {
    target: 'public/images/lodge-scene-09-heft-handle-heat.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Cast_iron_dutch_baby_on_oven_mitts.jpg'
  },
  {
    target: 'public/images/lodge-scene-10-maintenance-ritual.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Seasoning_Iron_Skillets_1_%282626670763%29.jpg'
  },
  {
    target: 'public/images/lodge-scene-11-cost-per-use.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Castiron-skillets.jpg'
  },
  {
    target: 'public/images/lodge-scene-12-verdict-true-gem.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Seared_and_roasted_Pork_Tenderloin_in_Cast_Iron_Skillet.jpg'
  }
];

const headers = {
  'User-Agent': 'IsItSpecialBot/1.0 (editorial@isitspecial.com; research & editorial fair use)'
};

async function downloadAll() {
  console.log(`Starting download of ${downloads.length} Lodge cast iron photography assets...`);
  
  for (let i = 0; i < downloads.length; i++) {
    const item = downloads[i];
    try {
      console.log(`[${i + 1}/${downloads.length}] Downloading: ${item.target}...`);
      const res = await fetch(item.url, { headers });
      if (!res.ok) {
        console.error(`  ❌ Failed with status ${res.status}: ${item.url}`);
        continue;
      }
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(item.target, Buffer.from(buffer));
      const sizeMb = (buffer.byteLength / 1024 / 1024).toFixed(2);
      console.log(`  ✅ Saved: ${item.target} (${sizeMb} MB)`);
    } catch (err) {
      console.error(`  ❌ Error downloading ${item.target}:`, err.message);
    }
  }
  console.log('All downloads completed!');
}

downloadAll();
