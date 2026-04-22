"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ placeholder = "Search...", className = "" }: { placeholder?: string; className?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const val = inputRef.current?.value.trim();
      if (val) router.push(`/browse?q=${encodeURIComponent(val)}`);
      else router.push("/browse");
    }
  }

  return (
    <div className={`flex items-center border border-[#242424] rounded-md hover:border-white/30 transition-colors font-mono bg-transparent h-9 px-3 gap-2 w-72 ${className}`}>
      <FiSearch size={13} className="text-[#525252] shrink-0" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-white text-[12px] placeholder:text-[#525252] outline-none border-none font-mono"
      />
      <KbdGroup>
        <Kbd>Ctrl + K</Kbd>
      </KbdGroup>
    </div>
  );
}