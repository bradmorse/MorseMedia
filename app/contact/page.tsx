import { Suspense } from 'react';
import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import { ContactForm } from '@/components/Forms';
import ContactFormFromQuery from '@/components/ContactFormFromQuery';
import { business } from '@/data/business';

export const metadata = pageMetadata('Book a Photo or Video Shoot in Nashville', 'Book brand, headshot, event or real estate photography and video in Nashville and Middle Tennessee. Ask about fine-art prints and image licensing, too.', '/contact', '/images/photos/coastline-dusk.webp');

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <Image src="/images/photos/coastline-dusk.webp" alt="Dark Maine coastline at dusk" fill priority sizes="100vw" />
        <div className="page-hero__shade page-hero__shade--strong" />
        <div className="page-hero__copy"><p className="eyebrow">Get in touch</p><h1>Let’s make<br />something lasting.</h1></div>
      </section>
      <section className="contact-layout content-section">
        <div className="contact-layout__intro">
          <p className="eyebrow">Morse Media</p>
          <h2>Photo and video projects, prints or licensing.</h2>
          <p>Share what you are working on, the deliverables you need and your ideal timeline. Typical replies arrive within two business days.</p>
          <a className="contact-email" href={`mailto:${business.email}`}>{business.email}</a>
          <div className="contact-details"><span>Based in {business.base}</span><span>Serving {business.region}</span><span>Available for travel</span></div>
        </div>
        <Suspense fallback={<ContactForm />}>
          <ContactFormFromQuery />
        </Suspense>
      </section>
    </>
  );
}
