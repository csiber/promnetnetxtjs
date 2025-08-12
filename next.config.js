/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Disable Next.js image optimization for Cloudflare compatibility
    unoptimized: true,
  },
};

module.exports = nextConfig;
