import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Camera, Clapperboard, Home } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import VideoEmbed from '@/components/VideoEmbed';
import HeroVideo from '@/components/HeroVideo';
import { heroFilm } from '@/data/hero';
import { NewsletterForm } from '@/components/Forms';
import { collections, featuredProducts } from '@/data/site';
import { servicePages, servicePath } from '@/data/services';
import { lowestStartingAt, showreel } from '@/data/proof';
import { areas } from '@/data/areas';
import { business } from '@/data/business';
import { storeIsOpen } from '@/lib/store-readiness';
import { PRINT_SHOP_ENABLED } from '@/data/features';

const homeTitle = 'Nashville Photographer & Videographer | Morse Media';

export const metadata: Metadata = {
  ...pageMetadata(
    homeTitle,
    'Nashville photographer and videographer for brand, headshot, event and real estate shoots plus cinematic video. Clear starting prices, 48-hour listings.',
    '/',
  ),
  title: { absolute: homeTitle },
};

const cardCopy: Record<string, { icon: typeof Camera; title: string; copy: string }> = {
  photography: { icon: Camera, title: 'Photography', copy: 'Brand, headshot, product and event photography built for the places it will be used.' },
  'video-production': { icon: Clapperboard, title: 'Video', copy: 'Brand films, social video and event recaps — planned, filmed and edited in house.' },
  'real-estate': { icon: Home, title: 'Real Estate', copy: 'Listing photos within 48 hours, with an optional walkthrough video from the same visit.' },
  'monthly-content': { icon: CalendarDays, title: 'Monthly Content', copy: 'A planned shoot every month, so your channels always have something real to post.' },
};

const services = servicePages.map((page) => ({ ...cardCopy[page.slug], href: servicePath(page.slug), from: lowestStartingAt(page.slug) }));

const clients = ["Love's Bedding & Furniture", "Love's Furniture Loft", 'Cash & Carry Furniture'];

const quoteHref = '/contact?service=Photo%20%2B%20video%20project';

const bookingSteps = [
  { step: '01 / Tell me about it', title: 'Send a few details.', copy: 'What you need, where and when — the form takes two minutes, or just email. Not sure what to book? Describe the goal and I will recommend a package.' },
  { step: '02 / Get a clear quote', title: 'Availability and a price in writing.', copy: 'You will hear back within two business days with dates, a recommended package and a written quote. Nothing is booked until you approve it.' },
  { step: '03 / Shoot and deliver', title: 'One planned visit, ready-to-use files.', copy: 'Photo, video or both in a single session, then edited files sized for your website, social channels, listings and ads.' },
];

const reasons = [
  { title: 'Photo and video, one crew', copy: 'Stills and motion are planned together, so one visit can cover your website, social channels and ads.' },
  { title: 'Clear starting prices', copy: 'Every service lists a starting price, and every quote is confirmed in writing before the shoot.' },
  { title: 'Fast, organized delivery', copy: 'Listing photos within 48 hours and galleries in about five business days, sized for every platform.' },
];

export default function HomePage() {
  const storeOpen = storeIsOpen();
  return (
    <>
      <section className="hero">
        <Image className="hero__image hero__image--film" src={heroFilm.poster} alt={heroFilm.posterAlt} fill priority sizes="100vw" />
        <HeroVideo />
        <div className="hero__shade" />
        <div className="hero__copy">
          <p className="eyebrow">Photography &amp; video · {business.base}</p>
          <h1>Photo and video<br />for Nashville brands.</h1>
          <div className="short-rule" />
          <p>Brand photography, headshots, real estate listings and cinematic video for businesses across {business.region} — planned around where the work will be seen, and delivered ready to use.</p>
          <div className="hero__actions">
            <Link className="button button--solid" href={quoteHref}>Get a quote</Link>
            <Link className="text-link" href="/services">Services &amp; pricing <ArrowRight /></Link>
          </div>
        </div>
        <span className="hero__caption">{heroFilm.caption}</span>
      </section>

      <section className="home-proof" aria-label="Morse Media at a glance">
        <div><strong>{lowestStartingAt('real-estate') || 'Custom'}</strong><span>Real estate listings</span></div>
        <div><strong>48 hrs</strong><span>Listing photo delivery</span></div>
        <div><strong>Photo + video</strong><span>One visit, one crew</span></div>
        <div><strong>{business.region.replace('Tennessee', 'TN')}</strong><span>Nashville &amp; nearby counties</span></div>
      </section>

      <section className="studio-section">
        <div className="studio-section__logo"><Image src="/images/morse-media-logo-inline.png" alt="" width={210} height={57} /></div>
        <div className="studio-section__intro">
          <p className="eyebrow">What Morse Media does</p>
          <h2>Capturing moments.<br />Telling stories.</h2>
          <p>Photography and cinematic video for Nashville businesses, agents and organizations — one point of contact from the first call to the final files.</p>
          <div className="detail-actions">
            <Link className="text-link" href="/services#packages">Compare packages <ArrowRight /></Link>
            <Link className="text-link" href="/portfolio">See client work <ArrowRight /></Link>
          </div>
        </div>
        <div className="studio-services">
          {services.map(({ icon: Icon, title, copy, href, from }) => (
            <article key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              {from && <p className="studio-services__from">{from}</p>}
              <p>{copy}</p>
              <Link href={href} aria-label={`Explore ${title.toLowerCase()} services`}>Explore service <ArrowRight /></Link>
            </article>
          ))}
        </div>
      </section>

      {showreel.url && (
        <section className="content-section home-reel">
          <div className="section-heading"><div><p className="eyebrow">Reel</p><h2>See it move.</h2></div><Link className="text-link" href="/services/video-production">Video production <ArrowRight /></Link></div>
          <VideoEmbed url={showreel.url} title={showreel.title} />
        </section>
      )}

      <section className="content-section client-band">
        <div className="section-heading">
          <div><p className="eyebrow">Selected client work</p><h2>Content built for real businesses.</h2></div>
          <Link className="text-link" href="/portfolio">See the portfolio <ArrowRight /></Link>
        </div>
        <div className="client-band__body">
          <p>Product photography, promotional video and short-form social content for regional retail brands — planned around sales, new arrivals and the questions customers actually ask.</p>
          <ul aria-label="Clients">
            {clients.map((client) => <li key={client}>{client}</li>)}
          </ul>
        </div>
      </section>

      <section className="content-section area-strip">
        <div className="section-heading">
          <div><p className="eyebrow">Areas served</p><h2>Across Nashville and {business.region}.</h2></div>
          <p>Based in {business.city} and working throughout {business.counties.slice(0, -1).join(', ')} and {business.counties.at(-1)} counties, with travel available for larger productions.</p>
        </div>
        <nav className="service-links" aria-label="Areas served">
          {areas.map((area) => <Link key={area.slug} href={`/areas/${area.slug}`}>{area.name} ↗</Link>)}
          <Link href="/real-estate">Real estate photography for agents ↗</Link>
        </nav>
      </section>

      {PRINT_SHOP_ENABLED ? (
        <>
          <section className="print-feature content-section">
            <div className="print-feature__intro">
              <p className="eyebrow">Fine art prints</p>
              <h2>The eye behind the work.</h2>
              <div className="short-rule" />
              <p>
                Between client shoots, Bradley photographs mountains, coastline, wildlife and forgotten places.{' '}
                {storeOpen
                  ? 'Each print is made to order on archival paper, canvas or metal, or framed and ready to hang — with secure checkout right here on the site.'
                  : 'Each print is made to order on archival paper, canvas or metal, or framed and ready to hang. Choose a photograph and size for a personal quote and timeline.'}
              </p>
              <div className="detail-actions">
                <Link className="button" href="/shop">See all prints</Link>
                <Link className="text-link" href="/photography">Latest photography <ArrowRight /></Link>
              </div>
            </div>
            <ProductGrid products={featuredProducts.slice(0, 3)} />
          </section>

          <section className="content-section home-collections">
            <div className="section-heading">
              <div><p className="eyebrow">Explore collections</p><h2>Places worth remembering.</h2></div>
              <Link className="text-link" href="/collections">View all collections <ArrowRight /></Link>
            </div>
            <div className="collection-card-grid">
              {collections.map((collection) => (
                <Link className="collection-card" href={`/collections/${collection.slug}`} key={collection.slug}>
                  <div className="collection-card__image"><Image src={collection.image} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 1180px) 33vw, 20vw" /></div>
                  <span><strong>{collection.name}</strong><ArrowRight /></span>
                </Link>
              ))}
            </div>
          </section>

          <section className="newsletter-section">
            <div><p className="eyebrow">Stay in touch</p><p>New work, print releases and the occasional behind-the-scenes story from Nashville shoots.</p></div>
            <NewsletterForm />
          </section>
        </>
      ) : (
        <>
          <section className="content-section home-process">
            <div className="section-heading"><div><p className="eyebrow">How booking works</p><h2>From first message to final files.</h2></div><p>Three simple steps, and no obligation until you approve the quote.</p></div>
            <div className="workflow-grid">
              {bookingSteps.map((item) => (
                <article key={item.step}><span>{item.step}</span><h3>{item.title}</h3><p>{item.copy}</p></article>
              ))}
            </div>
          </section>

          <section className="about-values content-section home-why" aria-label="Why book Morse Media">
            {reasons.map((reason, index) => (
              <article key={reason.title}><span>0{index + 1}</span><h3>{reason.title}</h3><p>{reason.copy}</p></article>
            ))}
          </section>

          <section className="home-cta" aria-labelledby="home-cta-heading">
            <div>
              <p className="eyebrow">Now booking in {business.city}</p>
              <h2 id="home-cta-heading">Tell me about your next shoot.</h2>
            </div>
            <div>
              <p>Brand sessions, headshots, events, listings and video across {business.region}. You will hear back within two business days with availability and a quote.</p>
              <div className="detail-actions">
                <Link className="button button--solid" href={quoteHref}>Get a quote</Link>
                <Link className="text-link" href="/services#packages">Packages &amp; pricing <ArrowRight /></Link>
              </div>
              <a className="home-cta__email" href={`mailto:${business.email}`}>{business.email}</a>
            </div>
          </section>
        </>
      )}
    </>
  );
}
