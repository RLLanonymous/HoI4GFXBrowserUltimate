import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "HoI4 GFX Browser Ultimate",
  description: "Browse and download GFX assets for Hearts of Iron IV. Focus icons, portraits, sprites and more.",
  keywords: ["HOI4", "Hearts of Iron IV", "GFX", "mod", "focus icons", "portraits"],
  openGraph: {
    title: "HoI4 GFX Browser Ultimate",
    description: "Browse vanilla & mod GFX assets for HOI4.",
    url: "https://rllanonymous.is-a.dev",
    siteName: "GFX Browser Ultimate",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}