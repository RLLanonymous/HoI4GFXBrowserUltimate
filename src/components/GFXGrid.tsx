"use client";

import { useEffect, useState } from "react";
import GFXCard from "./GFXCard";

interface IndexEntry {
  info: string;
  image: string;
  type: string;
  country_tag: string;
}

interface GFXInfo {
  name: string;
  description?: string;
  IsDLC: boolean;
  IsMod: boolean;
  DLCId?: string;
  mod_name?: string;
}

interface GFXAsset extends IndexEntry, GFXInfo {}

interface GFXGridProps {
  filterType?: string;
  filterCountryTag?: string;
  filterMod?: boolean;
  filterDLC?: boolean;
  search?: string;
}

export default function GFXGrid({ filterType, filterCountryTag, filterMod, filterDLC, search }: GFXGridProps) {
  const [assets, setAssets] = useState<GFXAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const indexRes = await fetch('/gfx/index.info.json');
      const index: IndexEntry[] = await indexRes.json();

      const filtered = index.filter(entry => {
        if (filterType && entry.type !== filterType) return false;
        if (filterCountryTag && entry.country_tag !== filterCountryTag) return false;
        return true;
      });

      const full = await Promise.all(
        filtered.map(async entry => {
          const res = await fetch(entry.info);
          const info: GFXInfo = await res.json();
          return { ...entry, ...info };
        })
      );

      const seen = new Set<string>();
      const deduplicated = full.filter(a => {
        if (seen.has(a.image)) return false;
        seen.add(a.image);
        return true;
      });

      const final = deduplicated.filter(a => {
        if (filterMod !== undefined && a.IsMod !== filterMod) return false;
        if (filterDLC !== undefined && a.IsDLC !== filterDLC) return false;
        return true;
      });

      setAssets(final);
      setLoading(false);
    }

    load();
  }, [filterType, filterCountryTag, filterMod, filterDLC]);

  const displayed = search
    ? assets.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
    : assets;

  if (loading) return (
    <div style={{ color: '#525252', fontSize: '13px', textAlign: 'center', padding: '80px' }}>
      Loading assets...
    </div>
  );

  if (displayed.length === 0) return (
    <div style={{ color: '#525252', fontSize: '13px', textAlign: 'center', padding: '80px' }}>
      No assets found.
    </div>
  );

  return (
    <div>
      <p style={{ fontSize: '11px', color: '#525252', marginBottom: '16px' }}>
        <span style={{ color: '#f0f0f0', fontWeight: 600 }}>{displayed.length}</span> assets found
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '12px',
      }}>
        {displayed.map(asset => (
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
  );
}