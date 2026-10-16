import type { Metadata } from 'next';

export const siteUrl = 'https://www.morsemedia.co';
export const defaultShareImage = '/images/photos/autumn-overlook.webp';

/**
 * Social networks (Facebook, LinkedIn, iMessage, Slack) preview JPGs far more reliably than WebP,
 * and expect a 1200 × 630 frame. Every photo in /images/photos has a matching crop in /images/og.
 */
export function shareImage(image = defaultShareImage, alt = 'Fine-art photography by Bradley Morse') {
  const match = /^\/images\/photos\/([a-z0-9-]+)\.webp$/.exec(image);
  const url = match ? `/images/og/${match[1]}.jpg` : image;
  return { url, width: 1200, height: 630, alt };
}

export function pageMetadata(title: string, description: string, path: string, image = defaultShareImage, imageAlt?: string): Metadata {
  const url = `${siteUrl}${path}`;
  const og = shareImage(image, imageAlt || title);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', siteName: 'Morse Media', locale: 'en_US', images: [og] },
    twitter: { card: 'summary_large_image', title, description, images: [og.url] },
  };
}

export function jsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c'); }

export function breadcrumbs(items: { name: string; path: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: siteUrl + item.path })) };
}

/** "From $1,400 / month" → 1400. Returns undefined when no number is present. */
export function startingPrice(label?: string) {
  const match = label ? /\$([\d,]+)/.exec(label) : null;
  return match ? Number(match[1].replace(/,/g, '')) : undefined;
}
