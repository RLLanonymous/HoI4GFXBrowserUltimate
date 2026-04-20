"use client";

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
      <kbd className="text-[10px] text-[#a4a4a4] bg-[#1d1d1d] border border-[#333] border-b-2 rounded-sm px-1.5 py-0.5 font-mono shrink-0">
        Ctrl + K
      </kbd>
    </div>
  );
}