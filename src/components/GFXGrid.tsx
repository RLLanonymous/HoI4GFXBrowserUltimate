"use client"

import { useEffect, useState } from "react"
import GFXCard from "./GFXCard"

const BASE_PATH =
  process.env.NODE_ENV === "production"
    ? "/HoI4GFXBrowserUltimate"
    : ""

interface IndexEntry {
  info: string
  image: string
  type: string
  country_tag: string
}

interface GFXInfo {
  name: string
  IsDLC: boolean
  IsMod: boolean
}

interface GFXAsset extends IndexEntry, GFXInfo {}

interface GFXGridProps {
  filterType?: string
  filterCountryTag?: string
  filterMod?: boolean
  filterDLC?: boolean
  search?: string
}

export default function GFXGrid({
  filterType,
  filterCountryTag,
  filterMod,
  filterDLC,
  search,
}: GFXGridProps) {
  const [assets, setAssets] = useState<GFXAsset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BASE_PATH}/gfx/index.info.json`)
        const index: IndexEntry[] = await res.json()

        const filtered = index.filter((entry) => {
          if (filterType && entry.type !== filterType) return false
          if (
            filterCountryTag &&
            entry.country_tag !== filterCountryTag
          )
            return false
          return true
        })

        const full = await Promise.all(
          filtered.map(async (entry) => {
            const infoRes = await fetch(entry.info)
            const info: GFXInfo = await infoRes.json()
            return { ...entry, ...info }
          })
        )

        const seen = new Set<string>()
        const deduplicated = full.filter((a) => {
          if (seen.has(a.image)) return false
          seen.add(a.image)
          return true
        })

        const final = deduplicated.filter((a) => {
          if (filterMod !== undefined && a.IsMod !== filterMod)
            return false
          if (filterDLC !== undefined && a.IsDLC !== filterDLC)
            return false
          return true
        })

        setAssets(final)
      } catch (e) {
        console.error("Failed to load GFX:", e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [filterType, filterCountryTag, filterMod, filterDLC])

  const displayed = search
    ? assets.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase())
      )
    : assets

  if (loading)
    return (
      <div className="text-[#525252] text-sm text-center py-20">
        Loading assets...
      </div>
    )

  if (displayed.length === 0)
    return (
      <div className="text-[#525252] text-sm text-center py-20">
        No assets found.
      </div>
    )

  return (
    <div>
      <p className="text-xs text-[#525252] mb-4">
        <span className="text-white font-semibold">
          {displayed.length}
        </span>{" "}
        assets found
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
        {displayed.map((asset) => (
          <GFXCard
            key={asset.image}
            name={asset.name}
            image={asset.image}
            IsDLC={asset.IsDLC}
            IsMod={asset.IsMod}
          />
        ))}
      </div>
    </div>
  )
}