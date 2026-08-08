import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.salsify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.bfldr.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
