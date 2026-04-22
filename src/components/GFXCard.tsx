"use client"

import { useState } from "react"
import { BASE_PATH } from "../../config/site"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FiCopy, FiDownload } from "react-icons/fi"

interface GFXCardProps {
  name: string
  image: string
  original: string
  format: string
  IsMod: boolean
}

export default function GFXCard({
  name,
  image,
  original,
  format,
  IsMod,
}: GFXCardProps) {
  const [copied, setCopied] = useState(false)

  const badge = IsMod
    ? {
        label: "MOD",
        color: "#a78bfa",
        bg: "rgba(167,139,250,0.08)",
        border: "rgba(167,139,250,0.2)",
      }
    : {
        label: "VANILLA",
        color: "#0D87D1",
        bg: "rgba(7,92,145,0.08)",
        border: "rgba(15,55,79,0.2)",
      }

  const finalImage =
    image.startsWith("http") || image.startsWith(BASE_PATH)
      ? image
      : `${BASE_PATH}${image}`

  const finalOriginal =
    original.startsWith("http") || original.startsWith(BASE_PATH)
      ? original
      : `${BASE_PATH}${original}`

  function handleClick() {
    navigator.clipboard.writeText(name)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload(e: React.MouseEvent) {
    e.stopPropagation()
    const a = document.createElement("a")
    a.href = finalOriginal
    a.download = `${name}.${format}`
    a.click()
  }

  return (
    <>
      {copied && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 99999,
            minWidth: "300px",
          }}
        >
          <Alert className="bg-black border-[#222] text-white shadow-2xl">
            <FiCopy className="text-[#34d399]" />
            <AlertTitle className="text-white">
              Copied to clipboard !
            </AlertTitle>
            <AlertDescription className="text-[#888]">
              <span className="font-mono text-[11px]">{name}</span>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div
        onClick={handleClick}
        style={{
          background: "#111111",
          border: "1px solid #222222",
          borderRadius: "12px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.15s ease",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement
          el.style.border = "1px solid #333333"
          el.style.background = "#161616"
          el.style.transform = "translateY(-1px)"
          el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.4)"
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement
          el.style.border = "1px solid #222222"
          el.style.background = "#111111"
          el.style.transform = "translateY(0)"
          el.style.boxShadow = "none"
        }}
      >
        {/* Download button */}
        <button
          onClick={handleDownload}
          title={`Download .${format}`}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            width: "22px",
            height: "22px",
            borderRadius: "4px",
            border: "1px solid #333",
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.15s",
            color: "#888",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.background = "#222"
            el.style.color = "#fff"
            el.style.borderColor = "#444"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.background = "#1a1a1a"
            el.style.color = "#888"
            el.style.borderColor = "#333"
          }}
        >
          <FiDownload size={11} />
        </button>

        {/* Badge */}
        <span
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            color: badge.color,
            background: badge.bg,
            border: `1px solid ${badge.border}`,
            borderRadius: "4px",
            padding: "2px 6px",
          }}
        >
          {badge.label}
        </span>

        {/* Image */}
        <div
          style={{
            width: "72px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={finalImage}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement
              el.style.display = "none"
              el.parentElement!.innerHTML = `
                <div style="width:72px;height:72px;border:1px dashed #333;border-radius:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;">
                  <span style="font-size:9px;color:#525252;font-family:monospace">.${format}</span>
                  <span style="font-size:8px;color:#333;font-family:monospace">no preview</span>
                </div>
              `
            }}
          />
        </div>

        {/* Name */}
        <span
          style={{
            fontSize: "11px",
            color: "#888888",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </span>
      </div>
    </>
  )
}