import type { NextConfig } from "next"
import { BASE_PATH } from "./config/site"

const isProd = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
  output: "export",

  basePath: isProd ? BASE_PATH : "",
  assetPrefix: isProd ? BASE_PATH : "",

  images: { unoptimized: true },
  experimental: {
  globalNotFound: true,
   },
}

export default nextConfig