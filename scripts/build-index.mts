import { readdirSync, writeFileSync, statSync, existsSync } from "fs"
import { join } from "path"
import { execSync } from "child_process"
import { platform } from "os"

const BASE_PATH: string = process.env.BASE_PATH || ""
const GFX_DIR: string = join(process.cwd(), "public/gfx")
const OUTPUT: string = join(process.cwd(), "public/gfx/index.info.json")

const SUPPORTED_FORMATS: string[] = [".png", ".dds", ".tga"]
const NEEDS_PREVIEW: string[] = [".dds", ".tga"]

interface GFXEntry {
  name: string
  format: string
  source: string
  type: string
  country_tag: string
  IsMod: boolean
  mod_id: string | null
  image: string
  original: string
}

const entries: GFXEntry[] = []

function generatePreview(fullPath: string, previewPath: string): void {
  if (existsSync(previewPath)) return
  try {
    const cmd = platform() === "win32"
      ? `magick convert "${fullPath}" "${previewPath}"`
      : `convert "${fullPath}" "${previewPath}"`
    execSync(cmd, { stdio: "pipe" })
    console.log(`  [preview] ${previewPath}`)
  } catch (e: unknown) {
    const err = e as { message: string; stderr?: Buffer }
    console.warn(`  [warn] preview failed for ${fullPath}`)
    console.warn(`  [error] ${err.message}`)
    console.warn(`  [stderr] ${err.stderr?.toString()}`)
  }
}

function walk(dir: string): void {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)

    if (statSync(full).isDirectory()) {
      walk(full)
      continue
    }

    if (entry.includes(".preview.")) continue

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
    let DLCId: string | null = null
    let mod_id: string | null = null

    if (source === "MOD") {
      IsMod = true
      mod_id = parts[1]
    }

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