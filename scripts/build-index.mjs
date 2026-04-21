import { readdirSync, writeFileSync, statSync } from 'fs'
import { join, relative } from 'path'

const GFX_DIR = join(process.cwd(), 'public/gfx')
const OUTPUT = join(process.cwd(), 'public/gfx/index.info.json')
const BASE_PATH =
  process.env.NODE_ENV === "production"
    ? "/HoI4GFXBrowserUltimate"
    : ""

const entries = []

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)

    if (statSync(full).isDirectory()) {
      walk(full)
      continue
    }

    if (!entry.endsWith('.info.json')) continue
    if (entry === 'index.info.json') continue

    const rel = relative(GFX_DIR, full).replace(/\\/g, '/')
    const parts = rel.split('/')

    const type = parts[0]
    const country_tag = parts[1]
    const basename = entry.replace('.info.json', '')

    entries.push({
      type,
      country_tag,
      info: `${BASE_PATH}/gfx/${type}/${country_tag}/${entry}`,
      image: `${BASE_PATH}/gfx/${type}/${country_tag}/${basename}.png`,
    })
  }
}

walk(GFX_DIR)

// ensure directory exists implicitly via public/
writeFileSync(OUTPUT, JSON.stringify(entries, null, 2))

console.log(`[✓] index.info.json generated`)
console.log(`→ ${entries.length} assets indexed`)
console.log(`→ output: ${OUTPUT}`)