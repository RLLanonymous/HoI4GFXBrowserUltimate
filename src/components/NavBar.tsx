"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiBookOpen, FiHome, FiInfo, FiMenu, FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import SearchBar from "@/components/SearchBar";

const GITHUB_URL = "https://github.com/RLLanonymous/HoI4GFXBrowserUltimate";

const links = [
  { label: "Home", href: "/", icon: FiHome },
  { label: "Browse", href: "/browse", icon: AiFillFolderOpen },
  { label: "Docs", href: "/docs", icon: FiBookOpen },
  { label: "About", href: "/about", icon: FiInfo },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center pt-5 px-4 xl:px-8 z-50">
        <nav
          className="relative flex items-center justify-between px-5 xl:px-8 h-14 rounded-lg border border-[#242424] w-full"
          style={{ backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.6)" }}
        >
          <span className="font-mono flex items-center gap-2">
            <span className="text-[#525252] text-sm">Lanonymous /</span>
            <span className="font-bold text-base text-white">GFX Browser</span>
            <span className="text-[10px] bg-white text-black px-2 py-0.5 rounded-sm font-bold tracking-wider">ULTIMATE</span>
          </span>

          <div className="absolute left-1/2 -translate-x-1/2 hidden xl:flex items-center gap-1 text-[13px]">
            {links.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 text-[#a4a4a4] hover:text-white hover:bg-white/10 transition-all cursor-pointer px-4 py-2 rounded-md leading-none"
              >
                <Icon size={14} className="shrink-0" />
                <span className="leading-none">{label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-3">
            <SearchBar placeholder="Search documentation..." />
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-[12px] rounded-md border-[#242424] bg-transparent text-white hover:bg-white/10 hover:text-white gap-2 font-mono"
              asChild
            >
              <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <FaGithub size={13} />
                Contribute
              </Link>
            </Button>
          </div>

          <button
            className="xl:hidden text-[#a4a4a4] hover:text-white transition-colors cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div
          className="xl:hidden mx-4 mt-2 rounded-lg border border-[#242424] p-4 flex flex-col gap-2 z-40"
          style={{ backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.9)" }}
        >
          {links.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 text-[#a4a4a4] hover:text-white hover:bg-white/10 transition-all cursor-pointer px-4 py-3 rounded-md text-[13px]"
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
          <div className="border-t border-[#242424] my-2" />
          <div className="w-full">
            <SearchBar placeholder="Search..." className="w-full" />
          </div>
          <div className="flex gap-2 mt-1">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-[12px] rounded-md border-[#242424] bg-transparent text-white hover:bg-white/10 gap-2"
              asChild
            >
              <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <FaGithub size={13} />
                Contribute
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}