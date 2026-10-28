import fs from 'fs';
import path from 'path';

const downloads = [
  {
    target: 'public/images/casio-scene-01-swiss-paradox.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Tourbillon.jpg'
  },
  {
    target: 'public/images/casio-scene-02-tokyo-blueprint.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Casio_F-91W_Japan_U_%2C_modelo_fabricado_en_1989.jpg'
  },
  {
    target: 'public/images/casio-scene-03-three-million-units.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Casio_F-91W_watch_%282023%29_%28packaging_and_contents%29_%28i%29.jpg'
  },
  {
    target: 'public/images/casio-scene-04-featherweight-scale.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Casio_F-91W_watch_%282023%29_%28closeup_with_ruler_and_objects_for_scale%29.jpg'
  },
  {
    target: 'public/images/casio-scene-05-quartz-oscillator.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Casio_F-91W_watch_internals_%28all_disassemble_1%29.jpg'
  },
  {
    target: 'public/images/casio-scene-06-cr2016-battery.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Casio_F-91W_watch_internals_%28battery_visible%29.jpg'
  },
  {
    target: 'public/images/casio-scene-07-torture-test.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Casio_F-91W_watch.jpg'
  },
  {
    target: 'public/images/casio-scene-08-gasket-hydrostatic-seal.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Casio_F-91W_digital_watch_backplate_%28i%29.jpg'
  },
  {
    target: 'public/images/casio-scene-09-demographic-chameleon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Casio_F-91W_82T38575.jpg'
  },
  {
    target: 'public/images/casio-scene-10-honest-flaws-light-strap.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Casio_F-91W_watch_%282023%29_%28LED_light%29.jpg'
  },
  {
    target: 'public/images/casio-scene-11-secret-casio-diagnostic.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Casio_F-91_Module_593_Displaying_CASIo.jpg'
  },
  {
    target: 'public/images/casio-scene-12-cost-per-use-equation.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Casio_F-91W_watch_%282023%29_%28left-hand_side_and_strap%29.jpg'
  },
  {
    target: 'public/images/casio-scene-13-verdict-masterpiece.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Casio_F-91W_watch_%282023%29_%28front_closeup_-_time%29_%28minor_retouch%29.jpg'
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
