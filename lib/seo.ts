import type { Metadata } from 'next';
export const siteUrl = 'https://www.morsemedia.co';
export function pageMetadata(title: string, description: string, path: string, image = '/images/photos/autumn-overlook.webp'): Metadata {
  return { title, description, alternates: { canonical: `${siteUrl}${path}` }, openGraph: { title, description, url: `${siteUrl}${path}`, type: 'website', images: [{ url: image }] }, twitter: { card: 'summary_large_image', title, description, images: [image] } };
}
export function jsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
export function breadcrumbs(items: {name:string;path:string}[]) { return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,item:siteUrl+item.path}))}; }
