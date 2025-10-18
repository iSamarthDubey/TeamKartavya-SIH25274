/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@kartavya/types', '@kartavya/utils', '@kartavya/ui-web'],
}

module.exports = nextConfig
