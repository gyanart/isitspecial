import fs from 'fs';

const downloads = [
  {
    target: 'public/images/moka-scene-06-octagonal-facets.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Bialetti_Mokka_1_tz_%2852914977153%29.jpg'
  },
  {
    target: 'public/images/moka-scene-07-seasoned-patina.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Moka_crema1.JPG'
  },
  {
    target: 'public/images/moka-scene-08-safety-valve-gasket.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Coffee_squirted_from_a_moka_pot.jpg'
  },
  {
    target: 'public/images/moka-scene-09-stovetop-brewing.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Espresso_pot_on_the_burner_-_Flickr_-_AZAdam.jpg'
  },
  {
    target: 'public/images/moka-scene-10-mustache-mascot.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Bialetti_Moka_%2852899436677%29.jpg'
  },
  {
    target: 'public/images/moka-scene-11-cost-per-use.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Moka_Pot_%2855013301353%29.jpg'
  },
  {
    target: 'public/images/moka-scene-12-verdict-masterpiece.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Bialetti_Moka_induction_%2852898653042%29.jpg'
  }
];

async function run() {
  for (const item of downloads) {
    console.log(`Downloading ${item.target}...`);
    try {
      const res = await fetch(item.url, {
        headers: { 'User-Agent': 'IsItSpecialBot/1.0 (contact@isitspecial.com)' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = await res.arrayBuffer();
      fs.writeFileSync(item.target, Buffer.from(buf));
      console.log(`Saved ${item.target} (${buf.byteLength} bytes)`);
    } catch (e) {
      console.error(`Failed ${item.target}:`, e.message);
    }
  }
}

run();
