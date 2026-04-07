import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set up next-intl/config alias manually (same as createNextIntlPlugin but without the plugin)
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./src/i18n.ts",
    },
  },
  // Also for webpack (needed for some build paths)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "next-intl/config": require.resolve("./src/i18n.ts"),
    };
    return config;
  },
};

export default nextConfig;
