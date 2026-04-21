import type { NextConfig } from "next"
import { BASE_PATH } from "./config/site"

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ""

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  images: { unoptimized: true },
  experimental: {
  globalNotFound: true,
   },
}

export default nextConfig