import fs from 'fs';

const downloads = [
  {
    target: 'public/images/moka-scene-01-cafe-contrast.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Bialetti_caffettiera_moka.jpg'
  },
  {
    target: 'public/images/moka-scene-02-alfonso-bialetti.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Alfonso_Bialetti.jpg'
  },
  {
    target: 'public/images/moka-scene-03-moma-gallery.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Bialetti_moka_express-made-in-italy.jpg'
  },
  {
    target: 'public/images/moka-scene-04-exploded-components.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Moka_pot_components_floating.png'
  },
  {
    target: 'public/images/moka-scene-05-espresso-extraction.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Bialetti_Moka_Express_in_action.jpg'
  },
  {
    target: 'public/images/moka-scene-06-octagonal-facets.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Bialetti_01_%28fcm%29.jpg'
  },
  {
    target: 'public/images/moka-scene-07-seasoned-patina.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Bialetti_04_%28fcm%29.jpg'
  },
  {
    target: 'public/images/moka-scene-08-safety-valve-gasket.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Bialetti-Ersatzteile_01_%28fcm%29.jpg'
  },
  {
    target: 'public/images/moka-scene-09-stovetop-brewing.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Espresso_pot_on_the_burner_-_Flickr_-_AZAdam.jpg'
  },
  {
    target: 'public/images/moka-scene-10-mustache-mascot.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Bialetti_%2841082398701%29.jpg'
  },
  {
    target: 'public/images/moka-scene-11-cost-per-use.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Moka_Pot_%2855013301353%29.jpg'
  },
  {
    target: 'public/images/moka-scene-12-verdict-masterpiece.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Bialetti_Moka_%2852899436677%29.jpg'
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
