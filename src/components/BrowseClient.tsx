"use client";

import { useState } from "react";
import GFXGrid from "@/components/GFXGrid";
import { FiSearch } from "react-icons/fi";

const GFX_TYPES = ["All", "focus", "ideas", "ideology", "portrait", "flags"];
const COUNTRY_TAGS = ["All", "GER", "FRA", "ENG", "SOV", "USA", "ITA", "JAP"];
const SOURCES = ["All", "Vanilla", "DLC", "Mod"];

export default function BrowseClient() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [filterTag, setFilterTag] = useState<string | undefined>(undefined);
  const [filterMod, setFilterMod] = useState<boolean | undefined>(undefined);
  const [filterDLC, setFilterDLC] = useState<boolean | undefined>(undefined);

  function handleSource(src: string) {
    if (src === "All") { setFilterMod(undefined); setFilterDLC(undefined); }
    else if (src === "Mod") { setFilterMod(true); setFilterDLC(undefined); }
    else if (src === "DLC") { setFilterMod(undefined); setFilterDLC(true); }
    else { setFilterMod(false); setFilterDLC(false); }
  }

  const activeSource = filterMod === true ? "Mod" : filterDLC === true ? "DLC" : filterMod === false ? "Vanilla" : "All";

  return (
    <div style={{ flex: 1, display: 'flex', gap: '0', position: 'relative', zIndex: 10 }}>

      {/* Sidebar */}
      <aside style={{
        width: '200px',
        borderRight: '1px solid #242424',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        {/* Type */}
        <div>
          <p style={{ fontSize: '9px', letterSpacing: '2px', color: '#525252', marginBottom: '8px', textTransform: 'uppercase' }}>Type</p>
          {GFX_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t === "All" ? undefined : t)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                fontSize: '12px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: (filterType ?? "All") === t ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: (filterType ?? "All") === t ? '#ffffff' : '#a4a4a4',
                transition: 'all 0.15s',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Source */}
        <div>
          <p style={{ fontSize: '9px', letterSpacing: '2px', color: '#525252', marginBottom: '8px', textTransform: 'uppercase' }}>Source</p>
          {SOURCES.map(s => (
            <button
              key={s}
              onClick={() => handleSource(s)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                fontSize: '12px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: activeSource === s ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: activeSource === s ? '#ffffff' : '#a4a4a4',
                transition: 'all 0.15s',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Nation */}
        <div>
          <p style={{ fontSize: '9px', letterSpacing: '2px', color: '#525252', marginBottom: '8px', textTransform: 'uppercase' }}>Nation</p>
          {COUNTRY_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag === "All" ? undefined : tag)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                fontSize: '12px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: (filterTag ?? "All") === tag ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: (filterTag ?? "All") === tag ? '#ffffff' : '#a4a4a4',
                transition: 'all 0.15s',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Header */}
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
            Browse Assets
          </h1>
          <p style={{ fontSize: '12px', color: '#525252' }}>
            Focus icons, portraits, sprites and ideologies. Vanilla &amp; mods.
          </p>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid #242424',
          borderRadius: '8px',
          padding: '0 12px',
          height: '40px',
          background: 'transparent',
          maxWidth: '480px',
        }}>
          <FiSearch size={14} color="#525252" />
          <input
            type="text"
            placeholder="Search assets by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f0f0f0',
              fontSize: '13px',
              fontFamily: 'monospace',
            }}
          />
        </div>

        {/* Grid */}
        <GFXGrid
          filterType={filterType}
          filterCountryTag={filterTag}
          filterMod={filterMod}
          filterDLC={filterDLC}
          search={search}
        />
      </main>
    </div>
  );
}