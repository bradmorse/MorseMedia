import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Camera, Clapperboard, PenTool, Share2 } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { NewsletterForm } from '@/components/Forms';
import { collections, featuredProducts } from '@/data/site';

const services = [
  { icon: Camera, title: 'Photography', copy: 'Brand, product, location and editorial imagery built for the places it will be used.', href: '/services#photography' },
  { icon: Clapperboard, title: 'Video', copy: 'Cinematic production and editing for brands, businesses and social campaigns.', href: '/services#video-production' },
  { icon: Share2, title: 'Social Media', copy: 'Strategy, recurring content production and platform-ready creative for consistent visibility.', href: '/services#social-media' },
  { icon: PenTool, title: 'Design', copy: 'Graphic design, campaign creative and visual systems built to communicate clearly.', href: '/services#graphic-design' },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <Image className="hero__image" src="/images/photos/autumn-overlook.webp" alt="Foggy autumn valley in the Adirondacks" fill priority sizes="100vw" />
        <div className="hero__shade" />
        <div className="hero__copy">
          <p className="eyebrow">Fine art photography</p>
          <h1>Bring the wild<br />into your home.</h1>
          <div className="short-rule" />
          <p>Museum-quality prints of places shaped by weather, time and quiet observation.</p>
          <div className="hero__actions">
            <Link className="button button--solid" href="/shop">Shop prints</Link>
            <Link className="text-link" href="/collections">Explore collections <ArrowRight /></Link>
          </div>
        </div>
        <span className="hero__caption">Adirondack Mountains · New York</span>
      </section>

      <section className="home-proof" aria-label="Morse Media store highlights">
        <div><strong>20</strong><span>Original photographs</span></div>
        <div><strong>5</strong><span>Curated collections</span></div>
        <div><strong>4</strong><span>Made-to-order finishes</span></div>
        <div><strong>Secure</strong><span>On-site Stripe checkout</span></div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div><p className="eyebrow">Explore collections</p><h2>Places worth remembering.</h2></div>
          <Link className="text-link" href="/collections">View all collections <ArrowRight /></Link>
        </div>
        <div className="collection-card-grid">
          {collections.map((collection) => (
            <Link className="collection-card" href={`/collections/${collection.slug}`} key={collection.slug}>
              <div className="collection-card__image"><Image src={collection.image} alt={collection.name} fill sizes="(max-width: 700px) 100vw, 20vw" /></div>
              <span><strong>{collection.name}</strong><ArrowRight /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="print-feature content-section">
        <div className="print-feature__intro">
          <p className="eyebrow">Fine art prints</p>
          <h2>Prints that last a lifetime.</h2>
          <div className="short-rule" />
          <p>Printed to order using archival papers, museum-grade inks and premium display materials, with secure checkout built directly into the site.</p>
          <Link className="button" href="/shop">Shop all prints</Link>
        </div>
        <ProductGrid products={featuredProducts.slice(0, 3)} />
      </section>

      <section className="editorial-split">
        <div className="editorial-split__image"><Image src="/images/photos/old-hill-window.webp" alt="Abandoned buildings viewed through an old window" fill sizes="(max-width: 900px) 100vw, 60vw" /></div>
        <div className="editorial-split__copy">
          <p className="eyebrow">Featured collection</p>
          <h2>Beauty remains after people leave.</h2>
          <p>The Forgotten Places collection studies architecture, decay and the visual memory held inside abandoned spaces.</p>
          <Link className="text-link" href="/collections/forgotten-places">Enter the collection <ArrowRight /></Link>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-section__logo"><Image src="/images/morse-media-logo.png" alt="Morse Media" width={377} height={152} /></div>
        <div className="studio-section__intro">
          <p className="eyebrow">Creative studio</p>
          <h2>Capturing moments.<br />Telling stories.</h2>
          <p>Morse Media brings the same considered visual approach to photography, cinematic video and design.</p>
          <Link className="text-link" href="/services">Explore creative services <ArrowRight /></Link>
        </div>
        <div className="studio-services">
          {services.map(({ icon: Icon, title, copy, href }) => (
            <article key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link href={href}>Explore service <ArrowRight /></Link>
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
