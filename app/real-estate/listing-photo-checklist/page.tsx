import Link from 'next/link';
import ChecklistActions from '@/components/ChecklistActions';
import { business } from '@/data/business';
import { listingPrepPage, prepLeaveToMe, prepRooms, prepTimeline, type PrepGroup } from '@/data/listing-prep';
import { brandShareImage, breadcrumbs, jsonLd, pageMetadata, siteUrl } from '@/lib/seo';

export const metadata = pageMetadata(listingPrepPage.title, listingPrepPage.description, listingPrepPage.path);

const pageUrl = siteUrl + listingPrepPage.path;

/** One checklist group: real checkboxes, so sellers can tick items off on a phone, and boxes show when printed. */
function Checklist({ group, id }: { group: PrepGroup; id: string }) {
  return (
    <article className="prep-group" aria-labelledby={id}>
      <h3 id={id}>{group.title}</h3>
      {group.intro && <p>{group.intro}</p>}
      <ul>
        {group.items.map((item, index) => (
          <li key={item}>
            <label><input type="checkbox" name={`${id}-${index}`} /> <span>{item}</span></label>
          </li>
        ))}
      </ul>
    </article>
  );
}

const slug = (text: string) => text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function ListingPhotoChecklistPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: listingPrepPage.title,
      description: listingPrepPage.description,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      image: siteUrl + brandShareImage,
      datePublished: listingPrepPage.published,
      dateModified: listingPrepPage.updated,
      author: { '@type': 'Person', name: business.owner, url: `${siteUrl}/about` },
      publisher: { '@id': `${siteUrl}/#business` },
      about: 'Preparing a home for real estate listing photography and video',
    },
    breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Real estate photo & video', path: '/real-estate' }, { name: 'Listing photo checklist', path: listingPrepPage.path }]),
  ];

  return (
    <div className="detail-page content-section prep-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/real-estate">Real estate</Link> / <span>Listing photo checklist</span></nav>
      <p className="eyebrow">For sellers and listing agents</p>
      <h1>Get the home ready for listing photos.</h1>
      <p className="detail-lead">A room-by-room checklist for the day before and the morning of the shoot. Most of it takes an hour or two, and it shows in every photo.</p>
      <ChecklistActions title={listingPrepPage.title} url={pageUrl} />

      <section className="prep-section" aria-labelledby="prep-when">
        <h2 id="prep-when">When to do what</h2>
        <div className="prep-grid prep-grid--two">
          {prepTimeline.map((group) => <Checklist group={group} id={`prep-${slug(group.title)}`} key={group.title} />)}
        </div>
      </section>

      <section className="prep-section" aria-labelledby="prep-rooms">
        <h2 id="prep-rooms">Room by room</h2>
        <div className="prep-grid">
          {prepRooms.map((group) => <Checklist group={group} id={`prep-${slug(group.title)}`} key={group.title} />)}
        </div>
      </section>

      <section className="prep-section prep-leave" aria-labelledby="prep-leave">
        <h2 id="prep-leave">Don’t worry about these</h2>
        <div className="prep-leave__grid">
          {prepLeaveToMe.map((item) => (
            <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>
          ))}
        </div>
      </section>

      <section className="editorial-note prep-cta">
        <h2>Listing coming up?</h2>
        <p>Send the address or town, square footage and the date you want it live. Photos are delivered within 48 hours, ready for the MLS.</p>
        <div className="detail-actions">
          <Link className="button button--solid" href="/real-estate#book">Book a listing shoot</Link>
          <Link className="text-link" href="/portfolio/real-estate">See a full listing shoot ↗</Link>
        </div>
      </section>
    </div>
  );
}
