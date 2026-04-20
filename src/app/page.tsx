import Link from "next/link";
import WhiteBackground from "@/components/WhiteBackground";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";

export const metadata = {
  title: "HoI4 GFX Browser Ultimate",
  description: "A GFX Browser for Vanilla And Modded HoI4 GFX.",
};

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', color: '#f0f0f0', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      <WhiteBackground />
      <NavBar />
      <Hero />
      <StatsBar />

    </div>
  );
}