import type { MetadataRoute } from 'next';
import { collections, products } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://morsemedia.co';
  const staticPages = [
    { path: '', priority: 1, changeFrequency: 'monthly' as const },
    { path: '/shop', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/collections', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/shipping-returns', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' as const },
  ];

  return [
    ...staticPages.map((page) => ({ url: `${siteUrl}${page.path}`, lastModified: new Date(), changeFrequency: page.changeFrequency, priority: page.priority })),
    ...collections.map((collection) => ({ url: `${siteUrl}/collections/${collection.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...products.map((product) => ({ url: `${siteUrl}/shop/${product.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 })),
  ];
}
