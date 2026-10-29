import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { PRINT_SHOP_ENABLED } from '@/data/features';

export const metadata = pageMetadata(
  'About Bradley Morse, Nashville Photographer',
  PRINT_SHOP_ENABLED
    ? 'Meet Bradley Morse, the Nashville photographer and filmmaker behind Morse Media: brand, event and real estate photography, video and fine-art prints.'
    : 'Meet Bradley Morse, the Nashville photographer and filmmaker behind Morse Media: brand, headshot, event and real estate photography and video.',
  '/about',
);

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <Image src="/images/photos/quiet-watch.webp" alt="Young buck in velvet antlers framed by leaves" fill priority sizes="100vw" />
        <div className="page-hero__shade page-hero__shade--strong" />
        <div className="page-hero__copy"><p className="eyebrow">About Morse Media</p><h1>Made for the<br />story behind it.</h1></div>
      </section>
      <section className="about-intro content-section">
        <div><p className="eyebrow">Photography · Video · Nashville, Tennessee</p><h2>A photo and video studio based in Nashville.</h2></div>
        <div><p>Morse Media is the studio of Bradley Morse, a Nashville-based photographer and filmmaker. The work began in New England — mountains, coastline, wildlife and forgotten places — and that same patient eye for light, weather and detail now goes into brand shoots, listings, events and films for businesses across Middle Tennessee.</p><p>Client work covers brand and headshot photography, real estate photo and video, event coverage and short-form video — built for retailers, real estate agents, professional firms and local businesses that need strong visuals on a steady schedule.{PRINT_SHOP_ENABLED && ' The print collection turns personal work into lasting pieces for homes, offices and hospitality spaces.'}</p><div className="detail-actions"><Link className="button button--solid" href="/contact?service=Photo%20%2B%20video%20project">Get a quote</Link><Link className="text-link" href="/services">Services &amp; pricing ↗</Link></div></div>
      </section>
      <section className="about-logo-section">
        <Image src="/images/morse-media-logo.png" alt="Morse Media logo" width={754} height={304} />
        <p>The mountain mark reflects the places that inspire the work: layered landscapes, strong geometry and the horizon line between exploration and home.</p>
      </section>
      <section className="about-values content-section">
        <article><span>01</span><h3>Atmosphere first</h3><p>Light, weather and mood are treated as part of the subject—not background decoration.</p></article>
        <article><span>02</span><h3>Built with intention</h3><p>Every frame and every edit should support the story and remove distraction.</p></article>
        <article><span>03</span><h3>Made to endure</h3><p>{PRINT_SHOP_ENABLED ? 'Photos, films and prints' : 'Photos and films'} are made to stay useful and relevant beyond a single campaign or trend.</p></article>
      </section>
    </>
  );
}
