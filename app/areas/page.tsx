import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { areas } from '@/data/areas';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Areas Served Across New Hampshire', 'Photography, video, social media content and design for businesses on the Seacoast, in the Lakes Region, the White Mountains, the Monadnock Region and around Manchester, Nashua and Concord.', '/areas');

export default function AreasPage() {
  return (
    <div className="detail-page content-section">
      <p className="eyebrow">Areas served</p>
      <h1>Working across New Hampshire.</h1>
      <p className="detail-lead">Based in New Hampshire and available for travel throughout New England. Choose a region to see the work businesses there hire for most.</p>
      <div className="collection-card-grid areas-grid">
        {areas.map((area) => (
          <Link className="collection-card" href={`/areas/${area.slug}`} key={area.slug}>
            <div className="collection-card__image"><Image src={area.image} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 1180px) 33vw, 20vw" /></div>
            <span><strong>{area.name}</strong><ArrowRight /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
