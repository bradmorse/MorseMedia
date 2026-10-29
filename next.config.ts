import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
];

// Mirrors PRINT_SHOP_ENABLED in data/features.ts (set NEXT_PUBLIC_PRINT_SHOP=on to relaunch the shop).
const printShopEnabled = process.env.NEXT_PUBLIC_PRINT_SHOP === 'on';
const pausedPrintShopRedirects = printShopEnabled
  ? []
  : ['/shop', '/shop/:path*', '/collections', '/collections/:path*', '/photography', '/photography/:path*', '/print-guide', '/shipping-returns', '/checkout', '/checkout/:path*', '/prints', '/store', '/gallery', '/gift', '/gift-cards']
      .map((source) => ({ source, destination: '/portfolio', permanent: false }));

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
      // Hero film files carry a version in their names (data/hero.ts), so they can be cached for a year.
      { source: '/video/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
  async redirects() {
    return [
      // While the print shop is paused these win (first match), and are temporary so search engines keep the URLs.
      ...pausedPrintShopRedirects,
      { source: '/prints', destination: '/shop', permanent: true },
      { source: '/store', destination: '/shop', permanent: true },
      { source: '/gallery', destination: '/photography', permanent: true },
      { source: '/pricing', destination: '/services#packages', permanent: true },
      { source: '/realtors', destination: '/real-estate', permanent: true },
      // Gift certificates were retired on October 28, 2026.
      { source: '/gift', destination: '/shop', permanent: true },
      { source: '/gift-cards', destination: '/shop', permanent: true },
      // October 28, 2026: moved to Nashville and dropped graphic design. Old URLs land on their closest page.
      { source: '/services/graphic-design', destination: '/services', permanent: true },
      { source: '/services/social-media', destination: '/services/monthly-content', permanent: true },
      { source: '/services/real-estate', destination: '/real-estate', permanent: true },
      { source: '/areas/:slug(seacoast|lakes-region|white-mountains|manchester-nashua-concord|monadnock)', destination: '/areas', permanent: true },
      { source: '/headshots', destination: '/services/photography', permanent: true },
      { source: '/video', destination: '/services/video-production', permanent: true },
    ];
  },
};

export default nextConfig;
