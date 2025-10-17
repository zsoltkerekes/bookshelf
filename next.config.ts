import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    domains: ["archive.org", "covers.openlibrary.org"],
  },
};

export default nextConfig;
