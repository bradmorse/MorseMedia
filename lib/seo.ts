import type { Metadata } from 'next';

export const siteUrl = 'https://www.morsemedia.co';
/** Link-preview card (1200 × 630): the Morse Media logo on the site's dark background. */
export const brandShareImage = '/images/og/morse-media-share.jpg';
export const brandShareAlt = 'Morse Media logo: photography and video in Nashville, TN';
export const defaultShareImage = brandShareImage;

/**
 * Social networks (Facebook, LinkedIn, iMessage, Slack) preview JPGs far more reliably than WebP,
 * and expect a 1200 × 630 frame. Every photo in /images/photos has a matching crop in /images/og.
 */
export function shareImage(image = defaultShareImage, alt = brandShareAlt) {
  const match = /^\/images\/photos\/([a-z0-9-]+)\.webp$/.exec(image);
  const url = match ? `/images/og/${match[1]}.jpg` : image;
  return { url, width: 1200, height: 630, alt };
}

/** Trims a description to a search-snippet length (~155 characters) at a word boundary. */
export function snippet(text: string, max = 155) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:—–-]+$/, '')}…`;
}

export function pageMetadata(title: string, fullDescription: string, path: string, image = defaultShareImage, imageAlt?: string): Metadata {
  const url = `${siteUrl}${path}`;
  const description = snippet(fullDescription);
  const og = shareImage(image, imageAlt || (image === brandShareImage ? brandShareAlt : title));
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
