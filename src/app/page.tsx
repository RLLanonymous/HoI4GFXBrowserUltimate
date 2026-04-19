import Link from "next/link";
import PurpleBackground from "@/components/PurpleBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', color: '#f0f0f0', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      <PurpleBackground />
      <Navbar />
      <Hero />
      <StatsBar />

    </div>
  );
}