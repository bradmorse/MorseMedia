import { notFound } from 'next/navigation';
import Link from 'next/link';
import { servicePages } from '@/data/services';
import { servicePackages } from '@/data/proof';
import { caseStudiesForService } from '@/data/case-studies';
import CaseStudyGrid from '@/components/CaseStudyGrid';
import { pageMetadata, siteUrl, jsonLd, breadcrumbs, startingPrice } from '@/lib/seo';

const serviceImages: Record<string, string> = {
  photography: '/images/photos/granite-run.webp',
  'video-production': '/images/photos/storm-over-lake.webp',
  'social-media': '/images/photos/valley-in-color.webp',
  'graphic-design': '/images/photos/old-hill-window.webp',
  'real-estate': '/images/photos/forgotten-house.webp',
};

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = servicePages.find((entry) => entry.slug === slug);
  if (!s) return {};
  const from = servicePackages.find((p) => p.service === slug && p.startingAt)?.startingAt;
  const description = `${s.intro} ${from ? `${from}. ` : ''}Based in New Hampshire and available across New England.`;
  return pageMetadata(`${s.name} in New Hampshire`, description, `/services/${slug}`, serviceImages[slug]);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = servicePages.find((entry) => entry.slug === slug);
  if (!s) notFound();
  const packages = servicePackages.filter((p) => p.service === slug);
  const offers = packages
    .map((p) => ({ p, price: startingPrice(p.startingAt) }))
    .filter((entry) => entry.price !== undefined)
    .map(({ p, price }) => ({
      '@type': 'Offer',
      name: p.name,
      description: p.description,
      priceCurrency: 'USD',
      price,
      priceSpecification: { '@type': 'PriceSpecification', minPrice: price, priceCurrency: 'USD' },
      url: `${siteUrl}/services/${slug}`,
    }));
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.name,
      serviceType: s.type,
      description: `${s.intro} ${s.copy}`,
      url: `${siteUrl}/services/${slug}`,
      provider: { '@id': `${siteUrl}/#business` },
      areaServed: [{ '@type': 'State', name: 'New Hampshire' }, { '@type': 'Place', name: 'New England' }],
      ...(offers.length ? { offers } : {}),
    },
    breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: s.name, path: `/services/${slug}` }]),
  ];
  const contactHref = `/contact?service=${encodeURIComponent(s.type)}`;

  return (
    <article className="detail-page content-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span>{s.name}</span></nav>
      <p className="eyebrow">New Hampshire · Available for travel</p>
      <h1>{s.name}</h1>
      <p className="detail-lead">{s.intro}</p>
      {packages.length > 0 && (
        <p className="detail-from">{packages.map((p) => `${p.name} · ${p.startingAt || 'Custom quote'}`).join('  /  ')}</p>
      )}
      <p>{s.copy}</p>
      <div className="detail-actions">
        <Link className="button button--solid" href={contactHref}>Tell me about your project</Link>
        {slug === 'real-estate'
          ? <Link className="text-link" href="/real-estate">Realtor guide, prep checklist &amp; FAQ ↗</Link>
          : packages.length > 0 && <Link className="text-link" href="/services#packages">Compare packages ↗</Link>}
      </div>
      <div className="service-detail-grid">
        <section><h2>What we can create.</h2><ul>{s.deliverables.map((d) => <li key={d}>{d}</li>)}</ul></section>
        <section><h2>How it comes together.</h2><ol>{s.steps.map((d) => <li key={d}>{d}</li>)}</ol></section>
      </div>
      {packages.length > 0 && (
        <section className="detail-packages" aria-label="Starting packages">
          {packages.map((p) => (
            <div key={p.name}>
              <p className="eyebrow">{p.kicker}</p>
              <h2>{p.name}</h2>
              <strong>{p.startingAt || 'Custom quote'}</strong>
              <p>{p.description}</p>
              <ul>{p.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link className="text-link" href={`/contact?service=${encodeURIComponent(p.inquiry)}`}>Ask about this package ↗</Link>
            </div>
          ))}
        </section>
      )}
      <CaseStudyGrid studies={caseStudiesForService(slug)} eyebrow="Recent projects" heading={`${s.type[0].toUpperCase()}${s.type.slice(1)} in practice.`} />
      <section className="editorial-note">
        <h2>Before we start.</h2>
        <p>{s.faq}</p>
        <Link className="text-link" href={slug === 'real-estate' ? '/contact?service=Real%20estate%20photography' : '/portfolio'}>{slug === 'real-estate' ? 'Ask about availability' : 'Explore selected client work'} ↗</Link>
      </section>
      <nav className="service-links" aria-label="Other creative services">
        {servicePages.filter((p) => p.slug !== slug).map((p) => <Link key={p.slug} href={`/services/${p.slug}`}>{p.name} ↗</Link>)}
      </nav>
    </article>
  );
}
