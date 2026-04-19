"use client";

import { FaGithub } from "react-icons/fa";
import { FiBookOpen, FiInfo } from "react-icons/fi";

const stats = [
  { value: "0", label: "total assets", color: "#f0f0f0" },
  { value: "0", label: "vanilla", color: "#f0f0f0" },
  { value: "0", label: "mod", color: "#8c5cff" },
  { value: "0", label: "nations", color: "#f0f0f0" },
];

const links = [
  { label: "GitHub", icon: FaGithub },
  { label: "Docs", icon: FiBookOpen },
  { label: "About", icon: FiInfo },
];

export default function StatsBar() {
  return (
    <div
      style={{
        borderTop: '1px solid rgba(50,52,59,0.6)',
        backdropFilter: 'blur(12px)',
        background: 'rgba(14,11,26,0.5)',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Left branding */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ color: '#f0f0f0', fontSize: '13px', fontWeight: 600 }}>
          GFX Browser Ultimate
        </span>
        <span style={{ color: '#525252', fontSize: '11px' }}>
          © 2026 — All rights reserved
        </span>
      </div>

      {/* Center stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: s.color, fontSize: '20px', fontWeight: 700, lineHeight: 1 }}>
              {s.value}
            </span>
            <span style={{ color: '#525252', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Right links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {links.map(({ label, icon: Icon }) => (
          <span
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#525252',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = '#f0f0f0'}
            onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = '#525252'}
          >
            <Icon size={13} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}