import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://www.morsemedia.co';
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/checkout', '/api/'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
