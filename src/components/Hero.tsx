"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";

export default function Hero() {
  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="max-w-2xl">

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-4 py-1.5">
            <span className="w-[7px] h-[7px] rounded-full bg-green-500 animate-pulse" />
            <span className="text-[12px] tracking-[3px] text-[#a4a4a4] font-mono">V1.0.0</span>
          </div>
        </div>

        <h1 className="text-5xl font-bold leading-[1.15] tracking-tight mb-5 font-mono text-white">
          The GFX Browser for<br />
          <span className="text-white">Hearts of Iron IV.</span>
        </h1>

        <p className="text-[#a4a4a4] text-[14px] leading-[1.8] mb-2 max-w-md mx-auto">
          Browse, search and download GFX assets from vanilla HOI4 and community mods.
        </p>
        <p className="text-[#525252] text-[13px] leading-[1.8] mb-10 tracking-[0.05em]">
          Focus · Portraits · Sprites · Ideologies
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="rounded-md bg-white text-black hover:bg-[#f0f0f0] font-semibold gap-2"
          >
            <Link href="/browse">
              Browse Assets
              <FiArrowRight size={14} />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="rounded-md border-[#242424] text-[#a4a4a4] bg-transparent hover:bg-white/10 hover:border-white/30 hover:text-white gap-2"
          >
            <Link href="/docs">
              <FiBookOpen size={14} />
              Read Docs
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}