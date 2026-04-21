"use client"

const BASE_PATH =
  process.env.NODE_ENV === "production"
    ? "/HoI4GFXBrowserUltimate"
    : ""

interface GFXCardProps {
  name: string
  image: string
  IsDLC: boolean
  IsMod: boolean
}

export default function GFXCard({
  name,
  image,
  IsDLC,
  IsMod,
}: GFXCardProps) {
  const badge = IsMod
    ? {
        label: "MOD",
        color: "#a78bfa",
        bg: "rgba(167,139,250,0.08)",
        border: "rgba(167,139,250,0.2)",
      }
    : IsDLC
    ? {
        label: "DLC",
        color: "#34d399",
        bg: "rgba(52,211,153,0.08)",
        border: "rgba(52,211,153,0.2)",
      }
    : {
        label: "Vanilla",
        color: "#71717a",
        bg: "rgba(113,113,122,0.08)",
        border: "rgba(113,113,122,0.2)",
      }

  const finalImage = image.startsWith("http")
    ? image
    : `${BASE_PATH}${image}`

  return (
    <div
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
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
  )
}