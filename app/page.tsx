import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Camera, Clapperboard, PenTool, Share2 } from 'lucide-react';
import RecentGallery from '@/components/RecentGallery';
import ProductGrid from '@/components/ProductGrid';
import { NewsletterForm } from '@/components/Forms';
import { collections, featuredProducts, finishOptions, photos } from '@/data/site';
import { recentWork } from '@/data/recent-work';
import { storeIsOpen } from '@/lib/store-readiness';

export const metadata: Metadata = {
  ...pageMetadata('Morse Media | Fine Art Photography & Creative Services in New Hampshire', 'Original New England landscape photography and fine-art prints, plus brand and real estate photography, video, social content and design for New Hampshire businesses.', '/'),
  title: { absolute: 'Morse Media | Fine Art Photography & Creative Services in New Hampshire' },
};

const services = [
  { icon: Camera, title: 'Photography', copy: 'Brand, product, location and editorial imagery built for the places it will be used.', href: '/services/photography' },
  { icon: Clapperboard, title: 'Video', copy: 'Cinematic production and editing for brands, businesses and social campaigns.', href: '/services/video-production' },
  { icon: Share2, title: 'Social Media', copy: 'Planning, recurring content production and platform-ready creative for consistent visibility.', href: '/services/social-media' },
  { icon: PenTool, title: 'Design', copy: 'Graphic design, campaign creative and visual systems built to communicate clearly.', href: '/services/graphic-design' },
];

export default function HomePage() {
  const storeOpen = storeIsOpen();
  return (
    <>
      <section className="hero">
        <Image className="hero__image" src="/images/photos/autumn-overlook.webp" alt="Autumn valley and lake in the Adirondacks framed by pine branches" fill priority sizes="100vw" />
        <div className="hero__shade" />
        <div className="hero__copy">
          <p className="eyebrow">Fine art photography · Bradley Morse</p>
          <h1>Bring the wild<br />into your home.</h1>
          <div className="short-rule" />
          <p>Original photographs of places shaped by weather, time and quiet observation — made to order as fine-art prints.</p>
          <div className="hero__actions">
            <Link className="button button--solid" href="/shop">{storeOpen ? 'Shop prints' : 'Explore prints'}</Link>
            <Link className="text-link" href="/photography">See the latest work <ArrowRight /></Link>
          </div>
        </div>
        <span className="hero__caption">Adirondack Mountains · New York</span>
      </section>

      <section className="home-proof" aria-label="Morse Media at a glance">
        <div><strong>{photos.length + recentWork.length}</strong><span>Original photographs</span></div>
        <div><strong>{collections.length}</strong><span>Curated collections</span></div>
        <div><strong>{finishOptions.length}</strong><span>Made-to-order finishes</span></div>
        <div><strong>Personal</strong><span>Print & licensing inquiries</span></div>
      </section>

      <section className="content-section latest-work" id="latest-work">
        <div className="section-heading"><div><p className="eyebrow">New work / Autumn studies</p><h2>A season in full color.</h2></div><Link className="text-link" href="/photography">Explore the photographs <ArrowRight /></Link></div>
        <RecentGallery />
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div><p className="eyebrow">Explore collections</p><h2>Places worth remembering.</h2></div>
          <Link className="text-link" href="/collections">View all collections <ArrowRight /></Link>
        </div>
        <div className="collection-card-grid">
          {collections.map((collection) => (
            <Link className="collection-card" href={`/collections/${collection.slug}`} key={collection.slug}>
              <div className="collection-card__image"><Image src={collection.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1180px) 33vw, 20vw" /></div>
              <span><strong>{collection.name}</strong><ArrowRight /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="print-feature content-section">
        <div className="print-feature__intro">
          <p className="eyebrow">Fine art prints</p>
          <h2>Prints made to be lived with.</h2>
          <div className="short-rule" />
          <p>
            {storeOpen
              ? 'Each print is made to order on archival paper, canvas or metal, or framed and ready to hang — with secure checkout right here on the site.'
              : 'Each print is made to order on archival paper, canvas or metal, or framed and ready to hang. Choose a photograph and size, and you will receive a personal quote and timeline.'}
          </p>
          <Link className="button" href="/shop">See all prints</Link>
        </div>
        <ProductGrid products={featuredProducts.slice(0, 3)} />
      </section>

      <section className="editorial-split">
        <div className="editorial-split__image"><Image src="/images/photos/road-to-old-hill.webp" alt="Black and white view of an abandoned building beyond a discarded tire" fill sizes="(max-width: 900px) 100vw, 60vw" /></div>
        <div className="editorial-split__copy">
          <p className="eyebrow">Featured collection</p>
          <h2>Beauty remains after people leave.</h2>
          <p>The Forgotten Places collection studies architecture, decay and the visual memory held inside abandoned spaces.</p>
          <Link className="text-link" href="/collections/forgotten-places">Enter the collection <ArrowRight /></Link>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-section__logo"><Image src="/images/morse-media-logo.png" alt="" width={377} height={152} /></div>
        <div className="studio-section__intro">
          <p className="eyebrow">Creative studio</p>
          <h2>Capturing moments.<br />Telling stories.</h2>
          <p>Morse Media brings the same considered visual approach to photography, cinematic video and design for businesses.</p>
          <div className="detail-actions">
            <Link className="text-link" href="/services">Explore creative services <ArrowRight /></Link>
            <Link className="text-link" href="/real-estate">Real estate photography <ArrowRight /></Link>
          </div>
        </div>
        <div className="studio-services">
          {services.map(({ icon: Icon, title, copy, href }) => (
            <article key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link href={href} aria-label={`Explore ${title.toLowerCase()} services`}>Explore service <ArrowRight /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter-section">
        <div><p className="eyebrow">Stay inspired</p><p>New releases, field notes and occasional behind-the-scenes stories.</p></div>
        <NewsletterForm />
      </section>
    </>
  );
}
