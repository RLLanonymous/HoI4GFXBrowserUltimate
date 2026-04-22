import { readdirSync, writeFileSync, statSync } from "fs"
import { join } from "path"

const BASE_PATH = process.env.BASE_PATH || ""
const GFX_DIR = join(process.cwd(), "public/gfx")
const OUTPUT = join(process.cwd(), "public/gfx/index.info.json")

const entries = []

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)

    if (statSync(full).isDirectory()) {
      walk(full)
      continue
    }

    if (!entry.endsWith(".png") && !entry.endsWith(".dds")) continue

    const rel = full
      .replace(GFX_DIR, "")
      .replace(/\\/g, "/")
      .replace(/^\//, "")

    const parts = rel.split("/")
    const source = parts[0]
    const filename = parts[parts.length - 1]
    const basename = filename.replace(/\.(png|dds)$/, "")
    const country_tag = parts[parts.length - 2]
    const type = parts[parts.length - 3]

    let IsMod = false
    let IsDLC = false
    let DLCId = null
    let mod_id = null

    if (source === "MOD") {
      IsMod = true
      mod_id = parts[1]
    } else if (source === "DLC") {
      IsDLC = true
      DLCId = parts[1]
    }

    entries.push({
      name: basename,
      source,
      type,
      country_tag,
      IsMod,
      IsDLC,
      DLCId,
      mod_id,
      image: `${BASE_PATH}/gfx/${rel}`,
    })
  }
}

walk(GFX_DIR)

writeFileSync(OUTPUT, JSON.stringify(entries, null, 2))

console.log(`[✓] index.info.json generated`)
console.log(`→ ${entries.length} assets indexed`)
console.log(`→ basePath: "${BASE_PATH}"`)