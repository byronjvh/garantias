import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      // Add both your Codespaces URL and localhost
      allowedOrigins: ['scaling-space-guacamole-gvgg7w7gpw6hwwxr-3000.app.github.dev', 'localhost:3000'],
    },
  },
};

export default nextConfig;
