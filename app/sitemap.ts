import { recentWork } from '@/data/recent-work';
import { servicePages } from '@/data/services';
import type { MetadataRoute } from 'next';
import { collections, products } from '@/data/site';

const siteUrl = 'https://www.morsemedia.co';
const lastModified = new Date('2026-10-15');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: '', priority: 1, changeFrequency: 'monthly' as const },
    { path: '/shop', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/collections', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/photography', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/print-guide', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/shipping-returns', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' as const },
  ];

  return [
    ...staticPages.map((page) => ({ url: `${siteUrl}${page.path || '/'}`, lastModified, changeFrequency: page.changeFrequency, priority: page.priority })),
    ...servicePages.map((s) => ({ url: `${siteUrl}/services/${s.slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...collections.map((collection) => ({ url: `${siteUrl}/collections/${collection.slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...recentWork.map((p) => ({ url: `${siteUrl}/photography/${p.slug}`, lastModified, images: [siteUrl + p.image], priority: 0.7 })),
    ...products.map((product) => ({ url: `${siteUrl}/shop/${product.slug}`, lastModified, images: [siteUrl + product.image], changeFrequency: 'monthly' as const, priority: 0.75 })),
  ];
}
