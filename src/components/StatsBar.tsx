"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FiBookOpen, FiInfo } from "react-icons/fi";

const stats = [
  { value: "0", label: "total assets", color: "#ffffff" },
  { value: "0", label: "vanilla", color: "#ffffff" },
  { value: "0", label: "mod", color: "#ffffff" },
  { value: "0", label: "nations", color: "#ffffff" },
];

const footerLinks = [
  { label: "GitHub", icon: FaGithub, href: "https://github.com/RLLanonymous/HoI4GFXBrowserUltimate" },
  { label: "Docs", icon: FiBookOpen, href: "#" },
  { label: "About", icon: FiInfo, href: "#" },
];

export default function StatsBar() {
  return (
    <div
      className="relative z-10 border-t border-[#242424]/60 px-8 py-5 flex items-center justify-between font-mono"
      style={{ backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.4)" }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-[13px] font-semibold text-white">GFX Browser Ultimate</span>
        <span className="text-[11px] text-[#525252]">© 2026 — All rights reserved</span>
      </div>

      <div className="flex items-center gap-8">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[20px] font-bold leading-none text-white">{s.value}</span>
            <span className="text-[10px] uppercase tracking-[0.1em] text-[#525252]">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5">
        {footerLinks.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12px] text-[#525252] hover:text-white transition-colors cursor-pointer"
          >
            <Icon size={13} />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}