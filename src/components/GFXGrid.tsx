"use client"

import { useEffect, useState } from "react"
import GFXCard from "./GFXCard"
import { BASE_PATH } from "../../config/site"

interface GFXAsset {
  name: string
  image: string
  original: string
  type: string
  format: string
  country_tag: string
  source: "Vanilla" | "DLC" | "MOD"
  IsMod: boolean
  mod_id: string | null
}

interface GFXGridProps {
  filterType?: string
  filterCountryTag?: string
  filterMod?: boolean
  search?: string
}

export default function GFXGrid({
  filterType,
  filterCountryTag,
  filterMod,
  search,
}: GFXGridProps) {
  const [assets, setAssets] = useState<GFXAsset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BASE_PATH}/gfx/index.info.json`)
        const index: GFXAsset[] = await res.json()

        const filtered = index.filter((entry) => {
          if (filterType && entry.type !== filterType) return false
          if (filterCountryTag && entry.country_tag !== filterCountryTag) return false
          if (filterMod !== undefined && entry.IsMod !== filterMod) return false
          return true
        })

        const seen = new Set<string>()
        const deduplicated = filtered.filter((a) => {
          if (seen.has(a.image)) return false
          seen.add(a.image)
          return true
        })

        setAssets(deduplicated)
      } catch (e) {
        console.error("Failed to load GFX:", e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [filterType, filterCountryTag, filterMod])

  const displayed = search
    ? assets.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
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
        <span className="text-white font-semibold">{displayed.length}</span> assets found
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
        {displayed.map((asset) => (
        <GFXCard
          key={asset.image}
          name={asset.name}
          image={asset.image}
          original={asset.original}
          format={asset.format}
          IsMod={asset.IsMod}
        />
        ))}
      </div>
    </div>
  )
}