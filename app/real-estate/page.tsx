import Link from 'next/link';
import { CalendarCheck, Clock, Home, Layers } from 'lucide-react';
import BeforeAfter from '@/components/BeforeAfter';
import CaseStudyGrid from '@/components/CaseStudyGrid';
import { ContactForm } from '@/components/Forms';
import { caseStudiesForService } from '@/data/case-studies';
import { servicePackages } from '@/data/proof';
import { addOns, comparisons, faqs, prepChecklist } from '@/data/real-estate';
import { breadcrumbs, jsonLd, pageMetadata, siteUrl, startingPrice } from '@/lib/seo';

const listing = servicePackages.find((p) => p.service === 'real-estate');

export const metadata = pageMetadata(
  'Real Estate Photography for New Hampshire Agents',
  `Listing photography for New Hampshire realtors: ${listing?.includes[0] || 'edited interior and exterior images'}, MLS-ready files and 48-hour delivery.${listing?.startingAt ? ` ${listing.startingAt}.` : ''}`,
  '/real-estate',
  '/images/photos/storm-over-lake.webp',
);

export default function RealEstatePage() {
  const price = startingPrice(listing?.startingAt);
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Real Estate Listing Photography',
      serviceType: 'Real estate photography',
      description: listing?.description,
      url: `${siteUrl}/real-estate`,
      provider: { '@id': `${siteUrl}/#business` },
      areaServed: { '@type': 'State', name: 'New Hampshire' },
      audience: { '@type': 'BusinessAudience', name: 'Real estate agents and brokerages' },
      ...(price ? { offers: { '@type': 'Offer', price, priceCurrency: 'USD', priceSpecification: { '@type': 'PriceSpecification', minPrice: price, priceCurrency: 'USD' } } } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
    breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Real estate photography', path: '/real-estate' }]),
  ];

  return (
    <div className="re-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />

      <section className="re-hero content-section">
        <p className="eyebrow">Real estate photography · New Hampshire</p>
        <h1>Listing photos that<br />earn the showing.</h1>
        <p className="detail-lead">Bright, true-to-life interiors and clean exteriors, delivered ready for the MLS — so your listing looks its best the day it goes live.</p>
        <div className="detail-actions">
          <Link className="button button--solid" href="#book">Book a listing shoot</Link>
          <Link className="text-link" href="#package">See what’s included ↗</Link>
        </div>
        <ul className="re-stats" aria-label="At a glance">
          <li><Home aria-hidden="true" /><strong>{listing?.startingAt || 'Custom quote'}</strong><span>Homes up to 2,500 sq ft</span></li>
          <li><Clock aria-hidden="true" /><strong>48 hours</strong><span>Standard delivery</span></li>
          <li><Layers aria-hidden="true" /><strong>25–35 images</strong><span>Edited and color-corrected</span></li>
          <li><CalendarCheck aria-hidden="true" /><strong>MLS-ready</strong><span>Plus web and print sizes</span></li>
        </ul>
      </section>

      {listing && (
        <section className="content-section re-package" id="package">
          <div>
            <p className="eyebrow">The listing package</p>
            <h2>{listing.name}</h2>
            <p className="re-package__price">{listing.startingAt || 'Custom quote'}</p>
            <p>{listing.description}</p>
            <ul>{listing.includes.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <p className="eyebrow">Add-ons</p>
            <div className="re-addons">
              {addOns.map((addOn) => (
                <article key={addOn.name}>
                  <h3>{addOn.name}</h3>
                  <p>{addOn.description}</p>
                  <small>{addOn.price || 'Priced with your quote'}</small>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {comparisons.length > 0 && (
        <section className="content-section re-compare">
          <div className="section-heading"><div><p className="eyebrow">Before & after</p><h2>Every room, edited by hand.</h2></div><p>Drag the slider to compare the camera file with the delivered photo.</p></div>
          <div className="re-compare__grid">{comparisons.map((comparison) => <BeforeAfter comparison={comparison} key={comparison.after.src} />)}</div>
        </section>
      )}

      <CaseStudyGrid studies={caseStudiesForService('real-estate')} eyebrow="Recent listings" heading="Real homes, real results." />

      <section className="content-section">
        <div className="section-heading"><div><p className="eyebrow">How it works</p><h2>From booking to live listing.</h2></div></div>
        <div className="workflow-grid">
          <article><span>01 / Book</span><h3>Send the address and date.</h3><p>Share the property location, approximate square footage and your listing deadline. Availability and the package are confirmed by email.</p></article>
          <article><span>02 / Shoot</span><h3>One visit, every angle.</h3><p>Interiors, exteriors and any add-ons are photographed in a single visit, scheduled around the best light for the home.</p></article>
          <article><span>03 / Deliver</span><h3>Files within 48 hours.</h3><p>Edited, color-corrected images arrive by download link in MLS-ready and full web sizes.</p></article>
        </div>
      </section>

      <section className="content-section re-prep">
        <div className="section-heading"><div><p className="eyebrow">For your sellers</p><h2>Get the home photo-ready.</h2></div><p>Forward this list to homeowners before the shoot. Ten minutes of prep makes a visible difference.</p></div>
        <div className="re-prep__grid">
          {prepChecklist.map((group) => (
            <article key={group.area}>
              <h3>{group.area}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section re-faq">
        <div className="section-heading"><div><p className="eyebrow">Questions</p><h2>Good to know.</h2></div></div>
        <div className="re-faq__list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="content-section contact-layout re-book" id="book">
        <div className="contact-layout__intro">
          <p className="eyebrow">Book a shoot</p>
          <h2>Tell me about the listing.</h2>
          <p>Include the address or town, square footage and the date you want the listing live. You will get availability and a confirmed quote within two business days — usually sooner.</p>
          <a className="contact-email" href="mailto:hello@morsemedia.co?subject=Real%20estate%20photography">hello@morsemedia.co</a>
        </div>
        <ContactForm defaultType="Real estate photography" />
      </section>
    </div>
  );
}
