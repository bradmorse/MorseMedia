import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Image from 'next/image';
import { galleryPhotos } from '@/data/discovery';
import { ContactForm } from '@/components/Forms';

export const metadata = pageMetadata('Contact Morse Media — Project & Print Inquiries', 'Request photography, video, graphic design, social content or real-estate services. Enquire about original prints and image licensing.', '/contact');

const allowedProjectTypes = new Set([
  'Print or order question',
  'Photography',
  'Real estate photography',
  'Video production',
  'Social media content',
  'Graphic design',
  'Combined creative campaign',
  'Image licensing',
]);

const serviceTypeMap: Record<string, string> = {
  Photography: 'Photography',
  'Video Production': 'Video production',
  'Social Media Content': 'Social media content',
  'Graphic Design': 'Graphic design',
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string; photo?: string }> }) {
  const params = await searchParams;
  const requestedType = params.service ? serviceTypeMap[params.service] || params.service : 'Print or order question';
  const defaultType = allowedProjectTypes.has(requestedType) ? requestedType : 'Print or order question';
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
          <h2>Print questions, licensing or creative projects.</h2>
          <p>Share what you are working on, the deliverables you need and your ideal timeline. Typical replies arrive within two business days.</p>
          <a className="contact-email" href="mailto:hello@morsemedia.co">hello@morsemedia.co</a>
          <div className="contact-details"><span>Based in New England</span><span>Available for travel</span></div>
        </div>
        <ContactForm key={defaultType + (params.photo || "")} defaultType={defaultType} photoTitle={galleryPhotos.find(p=>p.slug===params.photo)?.title} />
      </section>
    </>
  );
}
