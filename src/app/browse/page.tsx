import NavBar from "@/components/NavBar";
import WhiteBackground from "@/components/WhiteBackground";
import StatsBar from "@/components/StatsBar";
import BrowseClient from "@/components/BrowseClient";

export const metadata = {
  title: "HoI4 GFX Browser Ultimate (In Browser)",
  description: "Browse GFX assets from Vanilla and Modded HoI4.",
};

export default function BrowsePage() {
  return (
    <div style={{ minHeight: '100vh', color: '#f0f0f0', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <WhiteBackground />
      <NavBar />
      <BrowseClient />
      <StatsBar />
    </div>
  );
}