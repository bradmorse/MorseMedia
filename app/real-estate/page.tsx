import Link from 'next/link';
import { CalendarCheck, Clock, Home, Layers } from 'lucide-react';
import BeforeAfter from '@/components/BeforeAfter';
import CaseStudyGrid from '@/components/CaseStudyGrid';
import { ContactForm } from '@/components/Forms';
import { caseStudiesForService } from '@/data/case-studies';
import { servicePackages } from '@/data/proof';
import { addOns, comparisons, faqs, prepChecklist } from '@/data/real-estate';
import { areas } from '@/data/areas';
import { areaServedSchema, business } from '@/data/business';
import { servicePages } from '@/data/services';
import { breadcrumbs, jsonLd, pageMetadata, siteUrl, startingPrice } from '@/lib/seo';

const packages = servicePackages.filter((p) => p.service === 'real-estate');
const listing = packages[0];
const page = servicePages.find((s) => s.slug === 'real-estate');

export const metadata = pageMetadata(
  page?.seoTitle || 'Nashville Real Estate Photography & Video',
  page?.seoDescription || `Listing photography and walkthrough video for ${business.city} and ${business.region} agents.`,
  '/real-estate',
);

export default function RealEstatePage() {
  const offers = packages
    .map((p) => ({ p, price: startingPrice(p.startingAt) }))
    .filter((entry) => entry.price !== undefined)
    .map(({ p, price }) => ({ '@type': 'Offer', name: p.name, description: p.description, price, priceCurrency: 'USD', priceSpecification: { '@type': 'PriceSpecification', minPrice: price, priceCurrency: 'USD' } }));
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Real Estate Listing Photography & Video',
      serviceType: 'Real estate photography',
      description: listing?.description,
      url: `${siteUrl}/real-estate`,
      provider: { '@id': `${siteUrl}/#business` },
      areaServed: areaServedSchema(),
      audience: { '@type': 'BusinessAudience', name: 'Real estate agents, brokerages and builders' },
      ...(offers.length ? { offers } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    },
    breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Real estate photo & video', path: '/real-estate' }]),
  ];

  return (
    <div className="re-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />

      <section className="re-hero content-section">
        <p className="eyebrow">Real estate photo &amp; video · {business.city} &amp; {business.region}</p>
        <h1>Nashville listing photos{' '}<br />that earn the showing.</h1>
        <p className="detail-lead">Bright, true-to-life interiors, clean exteriors and an optional cinematic walkthrough, delivered ready for the MLS — so your listing looks its best the day it goes live.</p>
        <p className="re-hero__areas">Serving agents in {business.city}, {areas.filter((a) => !a.neighborhoods).map((a) => a.towns[0]).join(', ')} and nearby towns.</p>
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

      {packages.length > 0 && (
        <section className="content-section re-package" id="package">
          <div className="section-heading"><div><p className="eyebrow">Listing packages</p><h2>Photos, or photos and video.</h2></div><p>Either package is captured in a single visit. Not sure you need video? Book photos now and add a walkthrough later while the home is still staged.</p></div>
          <div className="detail-packages">
            {packages.map((p) => (
              <div key={p.name}>
                <p className="eyebrow">{p.kicker}</p>
                <h2>{p.name}</h2>
                <strong>{p.startingAt || 'Custom quote'}</strong>
                <p>{p.description}</p>
                <ul>{p.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                <Link className="text-link" href="#book">Book this package ↗</Link>
              </div>
            ))}
          </div>
          <p className="eyebrow re-addons__label">Add-ons</p>
          <div className="re-addons re-addons--row">
            {addOns.map((addOn) => (
              <article key={addOn.name}>
                <h3>{addOn.name}</h3>
                <p>{addOn.description}</p>
                <small>{addOn.price || 'Priced with your quote'}</small>
              </article>
            ))}
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
          <article><span>02 / Shoot</span><h3>One visit, every angle.</h3><p>Interiors, exteriors, video and any add-ons are captured in a single visit, scheduled around the best light for the home.</p></article>
          <article><span>03 / Deliver</span><h3>Photos within 48 hours.</h3><p>Edited, color-corrected images arrive by download link in MLS-ready and full web sizes. Walkthrough video follows within three business days.</p></article>
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
          <a className="contact-email" href="mailto:hello@morsemedia.co?subject=Real%20estate%20photo%20%26%20video">hello@morsemedia.co</a>
        </div>
        <ContactForm defaultType="Real estate photo & video" />
      </section>
    </div>
  );
}
