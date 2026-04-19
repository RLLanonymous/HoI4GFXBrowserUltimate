"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";

export default function Hero() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '5rem 1.5rem' }}>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '42rem' }}>

        {/* Badge V1.0.0 */}
        <div className="flex items-center justify-center mb-8">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(140, 92, 255, 0.08)',
            border: '1px solid rgba(140, 92, 255, 0.2)',
            borderRadius: '9999px',
            padding: '6px 14px',
          }}>
            <span className="w-[7px] h-[7px] rounded-full bg-[#31e183] animate-pulse" />
            <span className="text-[13px] tracking-[3px] text-[#a0a0a0]">V1.0.0</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold leading-[1.15] tracking-tight mb-5">
          The GFX Browser for<br />
          <span style={{
            background: 'linear-gradient(135deg, #8c5cff 0%, #b48fff 50%, #7033ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Hearts of Iron IV.
          </span>
        </h1>

        {/* Description */}
        <p style={{ color: 'rgba(240,240,240,0.7)', fontSize: '14px', lineHeight: '1.8', marginBottom: '8px', maxWidth: '28rem', margin: '0 auto 8px' }}>
          Browse, search and download GFX assets from vanilla HOI4 and community mods.
        </p>
        <p style={{ color: 'rgba(240,240,240,0.35)', fontSize: '13px', lineHeight: '1.8', marginBottom: '2.5rem', letterSpacing: '0.05em' }}>
          Focus · Portraits · Spirits · Ideologies
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <Link href="/browse">
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '42px',
              padding: '0 28px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, #8c5cff 0%, #7033ff 100%)',
              border: '1px solid rgba(140,92,255,0.4)',
              borderRadius: '9999px',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(140,92,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 35px rgba(140,92,255,0.5), inset 0 1px 0 rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(140,92,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              Browse Assets
              <FiArrowRight size={14} />
            </button>
          </Link>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '42px',
            padding: '0 28px',
            fontSize: '13px',
            fontWeight: 500,
            color: 'rgba(240,240,240,0.7)',
            background: 'rgba(140,92,255,0.05)',
            border: '1px solid rgba(140,92,255,0.2)',
            borderRadius: '9999px',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(140,92,255,0.12)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(140,92,255,0.4)';
              (e.currentTarget as HTMLButtonElement).style.color = '#f0f0f0';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(140,92,255,0.05)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(140,92,255,0.2)';
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(240,240,240,0.7)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            <FiBookOpen size={14} />
            Read Docs
          </button>
        </div>

      </div>
    </div>
  );
}