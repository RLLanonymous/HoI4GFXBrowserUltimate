"use client";

interface GFXCardProps {
  name: string;
  image: string;
  IsDLC: boolean;
  IsMod: boolean;
}

export default function GFXCard({ name, image, IsDLC, IsMod }: GFXCardProps) {
  const badge = IsMod
    ? { label: 'MOD', color: '#8c5cff', bg: 'rgba(140,92,255,0.12)', border: 'rgba(140,92,255,0.3)' }
    : IsDLC
    ? { label: 'DLC', color: '#31e183', bg: 'rgba(49,225,131,0.12)', border: 'rgba(49,225,131,0.3)' }
    : { label: 'Vanilla', color: '#a0a0a0', bg: 'rgba(160,160,160,0.08)', border: 'rgba(160,160,160,0.2)' };

  return (
    <div
      style={{
        background: 'rgba(140,92,255,0.04)',
        border: '1px solid rgba(140,92,255,0.12)',
        borderRadius: '14px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(140,92,255,0.35)';
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(140,92,255,0.08)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(140,92,255,0.15)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(140,92,255,0.12)';
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(140,92,255,0.04)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Badge */}
      <span style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '9px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        color: badge.color,
        background: badge.bg,
        border: `1px solid ${badge.border}`,
        borderRadius: '6px',
        padding: '3px 7px',
      }}>
        {badge.label}
      </span>

      {/* Image */}
      <div style={{
        width: '72px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src={image}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Name */}
      <span style={{
        fontSize: '11px',
        color: '#a0a0a0',
        textAlign: 'center',
        lineHeight: 1.4,
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
    </div>
  );
}