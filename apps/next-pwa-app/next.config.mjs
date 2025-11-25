import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev, // ✅ Disable PWA in dev to avoid unnecessary SW reload issues
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Tell Next.js we are intentionally using Webpack
  turbopack: {},

  // ✅ Required so next-pwa can hook into Webpack
  webpack: (config) => config,
};

export default withPWAConfig(nextConfig);
