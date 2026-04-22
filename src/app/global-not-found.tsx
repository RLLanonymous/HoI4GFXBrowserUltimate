import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FiArrowRight, FiHome } from 'react-icons/fi'
import WhiteBackground from '@/components/WhiteBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden">

        {/* Background */}
        <WhiteBackground />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
          <div className="max-w-xl">

            {/* Badge */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-4 py-1.5">
                <span className="w-[7px] h-[7px] rounded-full bg-red-500 animate-pulse" />
                <span className="text-[12px] tracking-[3px] text-[#a4a4a4] font-mono">
                  ERROR 404
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-6xl font-bold tracking-tight mb-5 font-mono">
              Page not found.
            </h1>

            {/* Description */}
            <p className="text-[#a4a4a4] text-[14px] leading-[1.8] mb-10 max-w-md mx-auto">
              The page you are trying to access doesn’t exist or has been moved.
            </p>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">

            <Button
              asChild
              size="lg"
              variant="default"
              className="!bg-white !text-black hover:!bg-white/90 hover:!text-black gap-2"
            >
              <a href="/">
                Go Home
                <FiHome size={14} />
              </a>
            </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}