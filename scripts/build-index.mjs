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

    if (!entry.endsWith(".info.json")) continue
    if (entry === "index.info.json") continue

    const rel = full
      .replace(GFX_DIR, "")
      .replace(/\\/g, "/")
      .replace(/^\//, "")

    const [type, country_tag, file] = rel.split("/")
    const basename = file.replace(".info.json", "")

    const base = BASE_PATH === "" ? "" : BASE_PATH

    entries.push({
      type,
      country_tag,

      info: `${base}/gfx/${type}/${country_tag}/${file}`,
      image: `${base}/gfx/${type}/${country_tag}/${basename}.png`,
    })
  }
}

walk(GFX_DIR)

writeFileSync(OUTPUT, JSON.stringify(entries, null, 2))

console.log(`[✓] index.info.json generated`)
console.log(`→ ${entries.length} assets indexed`)
console.log(`→ basePath: ${BASE_PATH}`)