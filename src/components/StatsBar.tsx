"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";

const stats = [
  { value: "0", label: "assets" },
  { value: "0", label: "vanilla" },
  { value: "0", label: "DLC" },
  { value: "0", label: "modded" },
];

const footerLinks = [
  {
    label: "GitHub",
    icon: FaGithub,
    href: "https://github.com/RLLanonymous/HoI4GFXBrowserUltimate",
  },
  { label: "Docs", icon: FiBookOpen, href: "/docs" },
];

export default function StatsBar() {
  return (
    <div
      className="relative z-10 border-t border-[#242424]/60 px-4 sm:px-8 py-5 font-mono"
      style={{
        backdropFilter: "blur(12px)",
        background: "rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left */}
        <div className="flex flex-col text-center sm:text-left gap-1">
          <span className="text-[13px] font-semibold text-white">
            GFX Browser Ultimate
          </span>
          <span className="text-[11px] text-[#525252]">
            © 2026, All rights reserved
          </span>
        </div>

        {/* Center stats */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          {stats.map((s, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="text-[14px] font-semibold text-white">
                {s.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.08em] text-[#525252]">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          {footerLinks.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] text-[#525252] hover:text-white transition-colors"
            >
              <Icon size={13} />
              {label}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}