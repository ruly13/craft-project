import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ["jsdom", "isomorphic-dompurify"],
};

export default nextConfig;
