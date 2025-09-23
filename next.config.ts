// FILE: next.config.ts
import type { NextConfig } from "next";
const isGH = process.env.GITHUB_PAGES === "true";
const repo = "2025"; // ← 리포 이름

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGH ? `/${repo}` : undefined,
  assetPrefix: isGH ? `/${repo}/` : undefined,
  env: { NEXT_PUBLIC_BASE_PATH: isGH ? `/${repo}` : "" }, // ← 클라이언트에서 씀
};

export default nextConfig;
