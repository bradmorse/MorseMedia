import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import PhotoExplorer from '@/components/PhotoExplorer';
import RecentGallery from '@/components/RecentGallery';
export const metadata = pageMetadata('Landscape & Fine Art Photography', 'Browse original landscape, wildlife, architecture and autumn photography by Bradley Morse, filtered by subject, color, orientation and location.', '/photography', '/images/photos/valley-in-color.webp');
export default function PhotographyPage() {
  return <div className="photography-page content-section"><div className="photography-intro"><p className="eyebrow">Selected photography / 2026</p><h1>A season in<br /><em>full color.</em></h1><p>Water over granite. Leaves against the sky. A quieter look at the landscapes we pass through.</p></div><RecentGallery /><section className="explorer-section"><p className="eyebrow">The full archive</p><h2>Find your kind of quiet.</h2><PhotoExplorer /></section><div className="photography-footer"><p>Original photographs by Bradley Morse.<br />For licensing, print inquiries or a project of your own.</p><Link href="/contact" className="button">Inquire about a photograph</Link></div></div>;
}
