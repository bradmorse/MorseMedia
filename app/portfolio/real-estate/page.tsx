import Link from 'next/link';
import ListingGallery from '@/components/ListingGallery';
import ListingVideo from '@/components/ListingVideo';
import { groupRanges, isoDuration, listingMeta, listings } from '@/data/real-estate-portfolio';
import { blurPlaceholders } from '@/data/blur-placeholders';
import { placeholdersFor } from '@/lib/blur';
import { breadcrumbs, jsonLd, pageMetadata, siteUrl } from '@/lib/seo';
import { dotList } from '@/lib/text';

// Link previews use the Morse Media logo card, like the main Portfolio page.
export const metadata = pageMetadata(
  'Real Estate Photography Portfolio',
  'Real estate photo and video by Morse Media: a video tour, exteriors, outdoor living and room-by-room interiors, MLS-ready. Now booking Nashville listings.',
  '/portfolio/real-estate',
);

const pad = (value: number) => String(value).padStart(2, '0');

export default function RealEstatePortfolioPage() {
  const schema = [
    ...listings.map((listing) => ({
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: listing.title,
      description: listing.summary,
      url: `${siteUrl}/portfolio/real-estate#${listing.slug}`,
      creator: { '@id': `${siteUrl}/#business` },
      image: listing.photos.map((photo) => ({ '@type': 'ImageObject', contentUrl: siteUrl + photo.src, caption: photo.caption, description: photo.alt, width: photo.width, height: photo.height })),
    })),
    ...listings.flatMap((listing) => (listing.video ? [{
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: `${listing.title} — ${listing.video.title}`,
      description: listing.video.description,
      thumbnailUrl: siteUrl + listing.video.poster,
      contentUrl: siteUrl + listing.video.src,
      uploadDate: listing.video.uploadDate,
      duration: isoDuration(listing.video.duration),
      width: listing.video.width,
      height: listing.video.height,
      creator: { '@id': `${siteUrl}/#business` },
    }] : [])),
    breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }, { name: 'Real estate portfolio', path: '/portfolio/real-estate' }]),
  ];

  return (
    <div className="detail-page content-section re-portfolio">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/portfolio">Portfolio</Link> / <span>Real estate</span></nav>
      <p className="eyebrow">Real estate portfolio</p>
      <h1>Listing photos, inside and out.</h1>
      <p className="detail-lead">Every listing is shot in one visit and delivered in the order it should be posted: exteriors first, then outdoor living, then a room-by-room walkthrough.</p>

      {listings.map((listing) => (
        <section className="re-listing" id={listing.slug} aria-labelledby={`${listing.slug}-title`} key={listing.slug}>
          <header className="re-listing__header">
            <div>
              <p className="eyebrow">{dotList(listingMeta(listing))}</p>
              <h2 id={`${listing.slug}-title`}>{listing.title}</h2>
              <p>{listing.summary}</p>
            </div>
            <ul className="re-listing__ranges" aria-label="Photo order">
              {groupRanges(listing).map((range) => (
                <li key={range.group}><span>{pad(range.first)}–{pad(range.last)}</span>{range.group}</li>
              ))}
            </ul>
          </header>
          {listing.video && <ListingVideo video={listing.video} listingTitle={listing.title} placeholder={blurPlaceholders[listing.video.poster]} />}
          <ListingGallery listing={listing} placeholders={placeholdersFor(listing.photos.map((photo) => photo.src))} />
        </section>
      ))}

      <section className="editorial-note re-portfolio__cta">
        <h2>Listing coming up?</h2>
        <p>Send the address or town, square footage and the date you want it live. Photos are delivered within 48 hours, ready for the MLS.</p>
        <div className="detail-actions">
          <Link className="button button--solid" href="/real-estate#book">Book a listing shoot</Link>
          <Link className="text-link" href="/real-estate#package">Packages and pricing ↗</Link>
        </div>
      </section>
    </div>
  );
}
