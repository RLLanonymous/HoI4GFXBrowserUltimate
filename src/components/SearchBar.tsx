"use client";

import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ placeholder = "Search...", className = "" }: { placeholder?: string; className?: string }) {
  return (
    <div className={`flex items-center border border-[#242424] rounded-md hover:border-white/30 transition-colors font-mono bg-transparent h-9 px-3 gap-2 w-72 ${className}`}>
      <FiSearch size={13} className="text-[#525252] shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-transparent text-white text-[12px] placeholder:text-[#525252] outline-none border-none font-mono"
      />
      <KbdGroup>
        <Kbd>Ctrl + K</Kbd>
      </KbdGroup>
    </div>
  );
}