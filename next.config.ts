import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Next 16 only honours listed quality values; product pages request 90 for print previews.
    qualities: [75, 90],
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1600, 1920, 2048],
    minimumCacheTTL: 2_592_000,
  },
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }] },
    ];
  },
  async redirects() {
    return [
      { source: '/prints', destination: '/shop', permanent: true },
      { source: '/store', destination: '/shop', permanent: true },
      { source: '/gallery', destination: '/photography', permanent: true },
      { source: '/pricing', destination: '/services#packages', permanent: true },
      { source: '/realtors', destination: '/real-estate', permanent: true },
      { source: '/gift', destination: '/gift-cards', permanent: true },
    ];
  },
};

export default nextConfig;
