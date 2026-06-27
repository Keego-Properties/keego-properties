import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      "@/pages/admin": path.join(__dirname, "src/views/admin"),
      "@/pages": path.join(__dirname, "src/views"),
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/pages/admin": path.join(__dirname, "src/views/admin"),
      "@/pages": path.join(__dirname, "src/views"),
    };
    return config;
  },
};

export default nextConfig;
