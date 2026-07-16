import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LightboxGallery from '@/components/LightboxGallery';
import { photos } from '@/data/site';

export const metadata: Metadata = { title: 'Portfolio', description: 'Selected photography and creative work by Morse Media.' };

export default function PortfolioPage() {
  return (
    <>
      <section className="page-hero">
        <Image src="/images/photos/old-hill-window.webp" alt="Abandoned buildings framed by a dark window" fill priority sizes="100vw" />
        <div className="page-hero__shade" />
        <div className="page-hero__copy"><p className="eyebrow">Selected work</p><h1>Images with a<br />sense of place.</h1><p>Landscape, wildlife, architecture and quiet observations from the road.</p></div>
      </section>
      <section className="content-section portfolio-section">
        <div className="section-heading"><div><p className="eyebrow">Photography portfolio</p><h2>Field notes in light and shadow.</h2></div><p>Click any image to open the full-screen gallery.</p></div>
        <LightboxGallery photos={photos} />
      </section>
      <section className="portfolio-cta">
        <div><p className="eyebrow">Creative services</p><h2>Need photography, video or design?</h2></div>
        <Link className="button button--solid" href="/contact">Discuss a project <ArrowRight /></Link>
      </section>
    </>
  );
}
