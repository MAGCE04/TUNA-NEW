/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure we're not using stale cache
  generateEtags: false,
  // Disable image optimization to prevent caching issues
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: '',
};

module.exports = nextConfig;