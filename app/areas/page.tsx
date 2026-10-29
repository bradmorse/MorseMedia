import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { areas } from '@/data/areas';
import { business } from '@/data/business';
import { breadcrumbs, jsonLd, pageMetadata, siteUrl } from '@/lib/seo';

export const metadata = pageMetadata(
  'Areas Served in Nashville & Middle Tennessee',
  'Photography and video across Middle Tennessee: Downtown and East Nashville, Franklin, Brentwood, Murfreesboro, Hendersonville, Gallatin and Mt. Juliet.',
  '/areas',
);

export default function AreasPage() {
  return (
    <div className="detail-page content-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([
        { '@context': 'https://schema.org', '@type': 'ItemList', name: `Areas served by ${business.name}`, itemListElement: areas.map((area, i) => ({ '@type': 'ListItem', position: i + 1, name: area.name, url: `${siteUrl}/areas/${area.slug}` })) },
        breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Areas served', path: '/areas' }]),
      ]) }} />
      <p className="eyebrow">Areas served</p>
      <h1>Working across {business.region}.</h1>
      <p className="detail-lead">Based in {business.city} and working throughout {business.counties.slice(0, -1).join(', ')} and {business.counties.at(-1)} counties, with travel available for larger productions. Choose an area to see what businesses there hire for most.</p>
      <div className="collection-card-grid areas-grid">
        {areas.map((area) => (
          <Link className="collection-card" href={`/areas/${area.slug}`} key={area.slug}>
            <div className="collection-card__image"><Image src={area.image} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 1180px) 50vw, 33vw" /></div>
            <span><strong>{area.name}</strong><ArrowRight /></span>
            <small className="areas-grid__towns">{area.towns.slice(0, 4).join(' · ')}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}
