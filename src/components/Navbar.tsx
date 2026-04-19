"use client";

import { Button } from "@/components/ui/button";
import { FiSearch, FiMonitor, FiBookOpen, FiGitBranch, FiInfo, FiMenu, FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

const links = [
  { label: "Browse", icon: FiMonitor },
  { label: "Docs", icon: FiBookOpen },
  { label: "Changelog", icon: FiGitBranch },
  { label: "About", icon: FiInfo },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center pt-5 px-4 xl:px-8 z-50">
        <nav
          className="relative flex items-center justify-between px-5 xl:px-8 h-14 rounded-full border border-[#32343b] w-full"
          style={{ backdropFilter: 'blur(12px)', background: 'rgba(14,11,26,0.5)' }}
        >
          {/* Logo */}
          <span className="font-bold text-base tracking-tight whitespace-nowrap">
            GFX <span className="text-[#8c5cff]">Browser</span>{" "}
            <span className="text-[#525252]">Ultimate</span>
          </span>

          {/* Links desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden xl:flex items-center gap-1 text-[13px]">
            {links.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="flex items-center justify-center gap-2 text-[#a0a0a0] hover:text-[#8c5cff] hover:bg-[#8c5cff]/10 transition-all cursor-pointer px-4 py-2 rounded-full leading-none"
              >
                <Icon size={14} className="shrink-0" />
                <span className="leading-none">{label}</span>
              </span>
            ))}
          </div>

          {/* Right desktop */}
          <div className="hidden xl:flex items-center gap-3">
            <div className="flex items-center gap-2 border border-[#32343b] rounded-full px-5 h-9 text-[12px] text-[#525252] cursor-pointer hover:border-[#8c5cff] transition-colors w-56">
              <FiSearch size={13} />
              <span>Search assets...</span>
              <kbd className="ml-auto text-[9px] text-[#a0a0a0] bg-[#1e1e24] border border-[#3a3a45] rounded px-1.5 py-0.5 shadow-[inset_0_-2px_0_#111116] font-mono tracking-wider">
                Ctrl K
              </kbd>
            </div>
            <Button size="sm" className="h-9 px-4 text-[12px] bg-[#8c5cff] hover:bg-[#7033ff] border-0 text-white rounded-full flex items-center gap-2">
              <FaGithub size={13} />
              Contribute
            </Button>
          </div>

          {/* Burger */}
          <button
            className="xl:hidden text-[#a0a0a0] hover:text-[#8c5cff] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="xl:hidden mx-4 mt-2 rounded-2xl border border-[#32343b] p-4 flex flex-col gap-2 z-40"
          style={{ backdropFilter: 'blur(12px)', background: 'rgba(14,11,26,0.9)' }}
        >
          {links.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="flex items-center gap-3 text-[#a0a0a0] hover:text-[#8c5cff] hover:bg-[#8c5cff]/10 transition-all cursor-pointer px-4 py-3 rounded-xl text-[13px]"
            >
              <Icon size={15} />
              {label}
            </span>
          ))}
          <div className="border-t border-[#32343b] my-2" />
          <div className="flex items-center gap-2 border border-[#32343b] rounded-full px-4 h-9 text-[12px] text-[#525252]">
            <FiSearch size={13} />
            <span>Search assets...</span>
          </div>
          <Button size="sm" className="h-9 text-[12px] bg-[#8c5cff] hover:bg-[#7033ff] border-0 text-white rounded-full flex items-center justify-center gap-2 mt-1">
            <FaGithub size={13} />
            Contribute
          </Button>
        </div>
      )}
    </>
  );
}