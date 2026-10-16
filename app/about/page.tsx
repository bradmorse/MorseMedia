import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = pageMetadata('About Bradley Morse — Photography, Video & Design', 'Meet Bradley Morse, the New Hampshire creative behind Morse Media photography, video production and design.', '/about', '/images/photos/quiet-watch.webp');

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <Image src="/images/photos/quiet-watch.webp" alt="Young buck in velvet antlers framed by leaves" fill priority sizes="100vw" />
        <div className="page-hero__shade page-hero__shade--strong" />
        <div className="page-hero__copy"><p className="eyebrow">About Morse Media</p><h1>Made for the<br />story behind it.</h1></div>
      </section>
      <section className="about-intro content-section">
        <div><p className="eyebrow">Photography · Video · Design</p><h2>A multidisciplinary creative studio rooted in New England.</h2></div>
        <div><p>Morse Media is the studio of Bradley Morse, a New Hampshire photographer, filmmaker and designer. The work is shaped by travel, changing weather, forgotten spaces and the quiet details that make a place memorable.</p><p>The print collection turns those observations into lasting pieces for homes, offices and hospitality spaces. Client work brings the same visual approach to brands, campaigns and personal stories.</p><Link className="button" href="/contact">Start a project</Link></div>
      </section>
      <section className="about-logo-section">
        <Image src="/images/morse-media-logo.png" alt="Morse Media logo" width={754} height={304} />
        <p>The mountain mark reflects the places that inspire the work: layered landscapes, strong geometry and the horizon line between exploration and home.</p>
      </section>
      <section className="about-values content-section">
        <article><span>01</span><h3>Atmosphere first</h3><p>Light, weather and mood are treated as part of the subject—not background decoration.</p></article>
        <article><span>02</span><h3>Built with intention</h3><p>Every frame, edit and design choice should support the story and remove distraction.</p></article>
        <article><span>03</span><h3>Made to endure</h3><p>Prints and creative work are designed to feel relevant beyond a single campaign or trend.</p></article>
      </section>
    </>
  );
}
