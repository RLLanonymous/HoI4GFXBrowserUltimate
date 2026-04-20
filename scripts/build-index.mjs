import { readdirSync, writeFileSync, statSync } from 'fs';
import { join, relative } from 'path';

const GFX_DIR = './public/gfx';
const OUTPUT = './public/gfx/index.info.json';

const entries = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (entry.endsWith('.info.json') && entry !== 'index.info.json') {
      const rel = relative(GFX_DIR, full).replace(/\\/g, '/');
      const parts = rel.split('/');
      const type = parts[0];
    const country_tag = parts[1];
    const basename = entry.replace('.info.json', '');

    entries.push({
    info: `/gfx/${type}/${country_tag}/${entry}`,
    image: `/gfx/${type}/${country_tag}/${basename}.png`,
    type,
    country_tag,
        });
    }
  }
}

walk(GFX_DIR);
writeFileSync(OUTPUT, JSON.stringify(entries, null, 2));
console.log(`index.info.json has been successfully generated: ${entries.length} assets generated`);