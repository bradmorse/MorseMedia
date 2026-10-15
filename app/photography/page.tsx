import type { Metadata } from 'next';
import Link from 'next/link';
import RecentGallery from '@/components/RecentGallery';
export const metadata: Metadata = { title: 'Latest Photography — Autumn Studies', description: 'Four original autumn photographs by Bradley Morse: flowing water, granite, mountain valleys and fall color.', alternates: { canonical: '/photography' }, openGraph: { images: ['/images/photos/autumn-current.webp'] } };
export default function PhotographyPage() {
  return <div className="photography-page content-section"><div className="photography-intro"><p className="eyebrow">Selected photography / 2026</p><h1>A season in<br /><em>full color.</em></h1><p>Water over granite. Leaves against the sky. A quieter look at the landscapes we pass through.</p></div><RecentGallery /><div className="photography-footer"><p>Original photographs by Bradley Morse.<br />For licensing, print inquiries or a project of your own.</p><Link href="/contact" className="button">Enquire about a photograph</Link></div></div>;
}
