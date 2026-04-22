import { readdirSync, writeFileSync, statSync, existsSync } from "fs"
import { join } from "path"
import { execSync } from "child_process"

const BASE_PATH = process.env.BASE_PATH || ""
const GFX_DIR = join(process.cwd(), "public/gfx")
const OUTPUT = join(process.cwd(), "public/gfx/index.info.json")

const SUPPORTED_FORMATS = [".png", ".dds", ".tga"]
const NEEDS_PREVIEW = [".dds", ".tga"]

const entries = []

function generatePreview(fullPath, previewPath) {
  if (existsSync(previewPath)) return
  try {
    execSync(`magick convert "${fullPath}" "${previewPath}"`, { stdio: "pipe" })
    console.log(`  [preview] ${previewPath}`)
  } catch (e) {
    console.warn(`  [warn] preview failed for ${fullPath}`)
  }
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)

    if (statSync(full).isDirectory()) {
      walk(full)
      continue
    }

    const ext = entry.slice(entry.lastIndexOf(".")).toLowerCase()
    if (!SUPPORTED_FORMATS.includes(ext)) continue

    const rel = full
      .replace(GFX_DIR, "")
      .replace(/\\/g, "/")
      .replace(/^\//, "")

    const parts = rel.split("/")
    const source = parts[0]
    const filename = parts[parts.length - 1]
    const basename = filename.slice(0, filename.lastIndexOf("."))
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

    // Génère preview PNG si nécessaire
    let previewRel = rel
    if (NEEDS_PREVIEW.includes(ext)) {
      const previewFilename = basename + ".preview.png"
      const previewFull = full.replace(filename, previewFilename)
      previewRel = rel.replace(filename, previewFilename)
      generatePreview(full, previewFull)
    }

    entries.push({
      name: basename,
      format: ext.replace(".", ""),
      source,
      type,
      country_tag,
      IsMod,
      IsDLC,
      DLCId,
      mod_id,
      image: `${BASE_PATH}/gfx/${previewRel}`,
      original: `${BASE_PATH}/gfx/${rel}`,
    })
  }
}

walk(GFX_DIR)

writeFileSync(OUTPUT, JSON.stringify(entries, null, 2))

console.log(`[✓] index.info.json generated`)
console.log(`→ ${entries.length} assets indexed`)
console.log(`→ basePath: "${BASE_PATH}"`)