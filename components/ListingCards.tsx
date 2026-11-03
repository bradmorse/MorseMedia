import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { groupRanges, previewPhotos, type Listing } from '@/data/real-estate-portfolio';
import { blurProps } from '@/lib/blur';
import { dotList } from '@/lib/text';

/** Preview of each real estate listing (lead photo plus three more), linking to /portfolio/real-estate. */
export default function ListingCards({ listings, eyebrow, heading, intro }: { listings: Listing[]; eyebrow: string; heading: string; intro?: string }) {
  if (!listings.length) return null;
  return (
    <section className="content-section listing-cards" aria-label={eyebrow}>
      <div className="section-heading">
        <div><p className="eyebrow">{eyebrow}</p><h2>{heading}</h2></div>
        {intro && <p>{intro}</p>}
      </div>
      {listings.map((listing) => {
        const { lead, extras } = previewPhotos(listing);
        return (
          <Link className="listing-card" href={`/portfolio/real-estate#${listing.slug}`} key={listing.slug}>
            <span className="listing-card__photos">
              <span className="listing-card__lead"><Image src={lead.src} alt={lead.alt} fill sizes="(max-width: 900px) 100vw, 60vw" {...blurProps(lead.src)} /></span>
              {extras.map((photo) => (
                <span className="listing-card__extra" key={photo.src}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 33vw, 20vw" {...blurProps(photo.src)} /></span>
              ))}
            </span>
            <span className="listing-card__text">
              <span className="listing-card__meta">{dotList([`${listing.photos.length} photos`, listing.location])}</span>
              <strong>{listing.title}</strong>
              <span className="listing-card__summary">{listing.summary}</span>
              <span className="listing-card__ranges">{groupRanges(listing).map((range) => <span key={range.group}>{range.group} <em>{range.count}</em></span>)}</span>
              <span className="text-link">View the full listing <ArrowUpRight aria-hidden="true" /></span>
            </span>
          </Link>
        );
      })}
    </section>
  );
}
