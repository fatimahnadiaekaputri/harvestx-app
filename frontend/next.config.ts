import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during production build
    ignoreDuringBuilds: true,
  },
  // Other configuration options here
};

export default nextConfig;
