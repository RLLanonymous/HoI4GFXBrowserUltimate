"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import GFXGrid from "@/components/GFXGrid";
import { FiSearch } from "react-icons/fi";

const GFX_TYPES = ["All", "focus", "ideas", "ideology", "portrait", "flags"];
const COUNTRY_TAGS = ["All", "GER", "FRA", "ENG", "SOV", "USA", "ITA", "JAP"];
const SOURCES = ["All", "Vanilla", "Mod"];

export default function BrowseClient() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [filterTag, setFilterTag] = useState<string | undefined>(undefined);
  const [filterMod, setFilterMod] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams]);

  function handleSource(src: string) {
    if (src === "All")      { setFilterMod(undefined);}
    else if (src === "Mod") { setFilterMod(true);}
    else                    { setFilterMod(false);}
  }

  const activeSource = filterMod === true ? "Mod" : filterMod === false ? "Vanilla" : "All";

  return (
    <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 10 }}>

      {/* Sidebar */}
      <aside style={{
        width: '200px',
        borderRight: '1px solid #242424',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        <div>
          <p style={{ fontSize: '9px', letterSpacing: '2px', color: '#525252', marginBottom: '8px', textTransform: 'uppercase' }}>Type</p>
          {GFX_TYPES.map(t => (
            <button key={t} onClick={() => setFilterType(t === "All" ? undefined : t)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', fontSize: '12px',
                padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                background: (filterType ?? "All") === t ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: (filterType ?? "All") === t ? '#ffffff' : '#a4a4a4',
                transition: 'all 0.15s',
              }}
            >{t}</button>
          ))}
        </div>

        <div>
          <p style={{ fontSize: '9px', letterSpacing: '2px', color: '#525252', marginBottom: '8px', textTransform: 'uppercase' }}>Source</p>
          {SOURCES.map(s => (
            <button key={s} onClick={() => handleSource(s)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', fontSize: '12px',
                padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                background: activeSource === s ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: activeSource === s ? '#ffffff' : '#a4a4a4',
                transition: 'all 0.15s',
              }}
            >{s}</button>
          ))}
        </div>

        <div>
          <p style={{ fontSize: '9px', letterSpacing: '2px', color: '#525252', marginBottom: '8px', textTransform: 'uppercase' }}>Nation</p>
          {COUNTRY_TAGS.map(tag => (
            <button key={tag} onClick={() => setFilterTag(tag === "All" ? undefined : tag)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', fontSize: '12px',
                padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                background: (filterTag ?? "All") === tag ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: (filterTag ?? "All") === tag ? '#ffffff' : '#a4a4a4',
                transition: 'all 0.15s',
              }}
            >{tag}</button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>Browse Assets</h1>
          <p style={{ fontSize: '12px', color: '#525252' }}>Focus icons, portraits, sprites and ideologies. Vanilla &amp; mods.</p>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          border: '1px solid #242424', borderRadius: '8px',
          padding: '0 12px', height: '40px', maxWidth: '480px',
        }}>
          <FiSearch size={14} color="#525252" />
          <input
            type="text"
            placeholder="Search assets by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, background: 'transparent', border: 'none',
              outline: 'none', color: '#f0f0f0', fontSize: '13px', fontFamily: 'monospace',
            }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ color: '#525252', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>×</button>
          )}
        </div>

        <GFXGrid
          filterType={filterType}
          filterCountryTag={filterTag}
          filterMod={filterMod}
          search={search}
        />
      </main>
    </div>
  );
}