import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin } from 'lucide-react';
import { areas, getArea } from '@/data/areas';
import { servicePackages } from '@/data/proof';
import { servicePages, servicePath } from '@/data/services';
import { business } from '@/data/business';
import { breadcrumbs, jsonLd, pageMetadata, siteUrl } from '@/lib/seo';

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return pageMetadata(area.title, area.description, `/areas/${slug}`);
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();
  const focus = area.focus.flatMap((entry) => {
    const service = servicePages.find((page) => page.slug === entry.service);
    return service ? [{ ...entry, service }] : [];
  });
  const packages = area.focus.flatMap((entry) => servicePackages.filter((p) => p.service === entry.service).slice(0, 1));
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Photography and video — ${area.name}, ${business.region}`,
      url: `${siteUrl}/areas/${slug}`,
      provider: { '@id': `${siteUrl}/#business` },
      serviceType: focus.map((entry) => entry.service.type),
      areaServed: area.towns.map((town) => (area.neighborhoods
        ? { '@type': 'Place', name: `${town}, ${business.city}, ${business.stateCode}` }
        : { '@type': 'City', name: `${town}, ${business.stateCode}` })),
    },
    breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Areas served', path: '/areas' }, { name: area.name, path: `/areas/${slug}` }]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <section className="page-hero">
        <Image src={area.image} alt="" fill priority sizes="100vw" />
        <div className="page-hero__shade page-hero__shade--strong" />
        <div className="page-hero__copy">
          <p className="eyebrow"><MapPin aria-hidden="true" className="inline-icon" /> {area.name} · {business.region}</p>
          <h1>{area.headline}</h1>
        </div>
      </section>

      <section className="about-intro content-section">
        <div><p className="eyebrow">Morse Media in {area.name}</p><h2>Local work, made to a high standard.</h2></div>
        <div>
          <p>{area.intro}</p>
          <p className="area-towns"><strong>{area.neighborhoods ? 'Neighborhoods' : 'Towns'} served include</strong> {area.towns.join(' · ')}</p>
          <div className="detail-actions">
            <Link className="button button--solid" href={`/contact?service=${encodeURIComponent(focus[0]?.service.type || 'Photo + video project')}`}>Start a project</Link>
            <Link className="text-link" href="/portfolio">See client work ↗</Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading"><div><p className="eyebrow">What {area.name} businesses hire for</p><h2>Where the work makes a difference.</h2></div></div>
        <div className="area-focus">
          {focus.map((entry, index) => (
            <article key={entry.service.slug}>
              <span>0{index + 1}</span>
              <h3>{entry.service.name}</h3>
              <p>{entry.why}</p>
              <Link className="text-link" href={servicePath(entry.service.slug)}>Explore the service <ArrowRight /></Link>
            </article>
          ))}
        </div>
      </section>

      {packages.length > 0 && (
        <section className="content-section">
          <div className="section-heading"><div><p className="eyebrow">Starting points</p><h2>Clear prices, scoped to your project.</h2></div><Link className="text-link" href="/services#packages">All packages <ArrowRight /></Link></div>
          <div className="detail-packages">
            {packages.map((p) => (
              <div key={p.name}>
                <p className="eyebrow">{p.kicker}</p>
                <h2>{p.name}</h2>
                <strong>{p.startingAt || 'Custom quote'}</strong>
                <p>{p.description}</p>
                <Link className="text-link" href={`/contact?service=${encodeURIComponent(p.inquiry)}`}>Ask about this package ↗</Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="content-section editorial-note">
        <h2>Planning ahead.</h2>
        <p>{area.planningNote} Travel and scheduling details are confirmed with every quote.</p>
        <nav className="service-links" aria-label="Other areas served">
          {areas.filter((entry) => entry.slug !== slug).map((entry) => <Link key={entry.slug} href={`/areas/${entry.slug}`}>{entry.name} ↗</Link>)}
        </nav>
      </section>
    </>
  );
}
