import Link from 'next/link';
import { servicePages } from '@/data/services';
import { servicePackages, testimonials } from '@/data/proof';
import { ArrowRight, Camera, Check, Clapperboard, LineChart, PenTool, Share2 } from 'lucide-react';
import { jsonLd, pageMetadata, siteUrl } from '@/lib/seo';
import styles from './services.module.css';

export const metadata = pageMetadata(
  'Creative Services — Photography, Video, Social & Design',
  'Photography, video production, social media content and graphic design services from Morse Media in New Hampshire and across New England.',
  '/services',
  '/images/photos/forest-current.webp',
);

const services = [
  {
    id: 'photography',
    number: '01',
    icon: Camera,
    title: 'Photography',
    lead: 'Distinctive imagery that gives your business a stronger visual identity.',
    description:
      'From product and location photography to brand storytelling and editorial assignments, every shoot is planned around where the images will live and what they need to accomplish.',
    deliverables: ['Brand and lifestyle photography', 'Product and retail photography', 'Architecture and location imagery', 'Event and behind-the-scenes coverage', 'Web, social and print-ready exports'],
    bestFor: 'Campaigns, websites, social media, retail promotions and editorial use.',
  },
  {
    id: 'video-production',
    number: '02',
    icon: Clapperboard,
    title: 'Video Production',
    lead: 'Cinematic, purposeful video created for the way audiences watch today.',
    description:
      'Morse Media can shape a project from early concept through final delivery, combining thoughtful shooting, pacing, sound and editing into content that feels polished without losing authenticity.',
    deliverables: ['Creative direction and shot planning', 'On-location filming', 'Commercial and promotional edits', 'Short-form social cutdowns', 'Motion graphics and audio cleanup'],
    bestFor: 'Brand films, promotions, product features, events and social campaigns.',
  },
  {
    id: 'social-media',
    number: '03',
    icon: Share2,
    title: 'Social Media Content',
    lead: 'A repeatable stream of content built around your brand and business goals.',
    description:
      'Instead of posting for the sake of staying active, content is planned around promotions, customer questions, products, services and stories your audience will actually care about.',
    deliverables: ['Content strategy and campaign planning', 'Photo, video and graphic production', 'Platform-ready captions and assets', 'Content calendars and posting support', 'Performance reporting and recommendations'],
    bestFor: 'Retailers, local businesses and brands that need consistent ongoing content.',
  },
  {
    id: 'graphic-design',
    number: '04',
    icon: PenTool,
    title: 'Graphic Design',
    lead: 'Clear, cohesive design that makes information easier to notice and understand.',
    description:
      'Digital and print creative is designed to work as part of a larger visual system, helping every promotion, campaign and customer touchpoint feel connected to the same brand.',
    deliverables: ['Campaign and promotional graphics', 'Digital ads and social templates', 'Print materials and signage', 'Brand-aligned layouts and visual systems', 'Production-ready final files'],
    bestFor: 'Sales campaigns, social media, in-store materials, events and brand refreshes.',
  },
];

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();

const workflow = [
  { number: '01', title: 'Discover', copy: 'Clarify the audience, objective, scope, timeline and where the final work will be used.' },
  { number: '02', title: 'Plan', copy: 'Build the creative direction, shot list, content structure and production schedule.' },
  { number: '03', title: 'Produce', copy: 'Capture, design and edit the work with clear communication throughout the process.' },
  { number: '04', title: 'Deliver', copy: 'Provide organized, platform-ready files and refinements based on the agreed scope.' },
];

const faqs = [
  { question: 'What types of clients do you work with?', answer: 'Morse Media works with retailers, local businesses, organizations and independent brands that need professional visual content. Projects can be one-time campaigns or ongoing creative support.' },
  { question: 'Where are you available?', answer: 'Morse Media is based in New Hampshire and is available for regional assignments and travel. Remote editing, design and content-planning work can be handled from anywhere.' },
  { question: 'Can services be combined?', answer: 'Yes. Many projects are strongest when photography, video, social content and graphic design are planned together. A custom scope can combine only the services the project actually needs.' },
  { question: 'Do you offer ongoing social media support?', answer: 'Yes. Ongoing support can include content planning, recurring production, platform-ready assets, posting assistance and performance reporting.' },
  { question: 'How are projects priced?', answer: 'Pricing depends on scope, production time, travel, usage and final deliverables. After a brief conversation, you will receive a clear project estimate before work begins.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Morse Media',
  url: `${siteUrl}/services`,
  areaServed: 'New England',
  email: 'hello@morsemedia.co',
  description: 'Photography, video production, social media content and graphic design services for businesses and brands.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Creative Services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.title, description: service.description, url: `${siteUrl}/services/${service.id}` },
    })),
  },
};

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }} />

      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroOrb} aria-hidden="true" />
        <div className={styles.container}>
          <p className={styles.eyebrow}>Creative services</p>
          <h1>Strategy, production and design under one roof.</h1>
          <div className={styles.heroBottom}>
            <p>Morse Media creates photography, video, social content and graphic design that help businesses communicate clearly and look consistent.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/contact?service=Combined%20creative%20campaign">Start a project <ArrowRight /></Link>
              <Link className={styles.secondaryButton} href="/portfolio">View portfolio <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.overviewSection}>
        <div className={styles.container}>
          <div className={styles.overviewGrid}>
            <p className={styles.sectionLabel}>How Morse Media helps</p>
            <div>
              <h2>One visual partner. A more connected brand.</h2>
              <p>When photography, video, social media and design are planned together, the work feels more consistent and each asset becomes more useful. Services can be booked individually or combined into a custom campaign.</p>
              <div className={styles.overviewStats}>
                <div><strong>4</strong><span>Core creative services</span></div>
                <div><strong>1</strong><span>Point of contact from plan to delivery</span></div>
                <div><strong>Flexible</strong><span>Project or ongoing support</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection} aria-labelledby="services-heading">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionLabel}>Capabilities</p>
              <h2 id="services-heading">Services built around the work you need.</h2>
            </div>
            <p>Every engagement begins with the objective, not a preset package. The final scope is shaped around your audience, timeline and delivery needs.</p>
          </div>

          <div className={styles.serviceList}>
            {services.map(({ id, number, icon: Icon, title, lead, description, deliverables, bestFor }) => (
              <article className={styles.serviceCard} id={id} key={id}>
                <div className={styles.serviceTopline}>
                  <span>{number}</span>
                  <Icon aria-hidden="true" />
                </div>
                <div className={styles.serviceTitle}>
                  <h3>{title}</h3>
                  <p>{lead}</p>
                </div>
                <div className={styles.serviceDetails}>
                  <p>{description}</p>
                  <ul>
                    {deliverables.map((deliverable) => (
                      <li key={deliverable}><Check aria-hidden="true" /><span>{deliverable}</span></li>
                    ))}
                  </ul>
                  <div className={styles.bestFor}>
                    <span>Best for</span>
                    <p>{bestFor}</p>
                  </div>
                  <Link href={`/services/${id}`} className={styles.cardLink}>More on {title.toLowerCase()} <ArrowRight /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.reportingSection}>
        <div className={styles.container}>
          <div className={styles.reportingCard}>
            <div className={styles.reportingIcon}><LineChart aria-hidden="true" /></div>
            <div>
              <p className={styles.sectionLabel}>Creative with purpose</p>
              <h2>Good content should do more than look polished.</h2>
            </div>
            <p>For ongoing work, performance can be reviewed through practical reporting and recommendations. The goal is to learn what resonates, improve the next round and make the creative investment more useful over time.</p>
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionLabel}>Process</p>
              <h2>A clear path from idea to delivery.</h2>
            </div>
            <p>The process stays structured enough to keep work moving while leaving room for creative decisions along the way.</p>
          </div>
          <div className={styles.processGrid}>
            {workflow.map((step) => (
              <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      {servicePackages.length > 0 && (
        <section className="proof-section" aria-labelledby="packages-heading">
          <div className={styles.container}>
            <p className={styles.sectionLabel}>Packages</p>
            <h2 id="packages-heading">Starting points, scoped to your project.</h2>
            <div className="proof-grid">
              {servicePackages.map((pkg) => (
                <article className="proof-card" key={pkg.name}>
                  <h3>{pkg.name}</h3>
                  <p className="proof-card__price">{pkg.startingAt || 'Custom quote'}</p>
                  <p>{pkg.description}</p>
                  <ul>{pkg.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="proof-section" aria-labelledby="testimonials-heading">
          <div className={styles.container}>
            <p className={styles.sectionLabel}>Kind words</p>
            <h2 id="testimonials-heading">What clients say.</h2>
            <div className="proof-grid">
              {testimonials.map((item) => (
                <figure className="proof-card proof-quote" key={item.name}>
                  <blockquote>{item.quote}</blockquote>
                  <figcaption>{item.name}{item.role ? `, ${item.role}` : ''}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqGrid}>
            <div className={styles.faqIntro}>
              <p className={styles.sectionLabel}>Frequently asked questions</p>
              <h2>What to know before getting started.</h2>
              <p>Have a different question? Send a note and include any timeline, location or deliverables you already have in mind.</p>
              <Link className={styles.secondaryButton} href="/contact">Ask a question <ArrowRight /></Link>
            </div>
            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <nav className="content-section service-links" aria-label="Service details">{servicePages.map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.name} ↗</Link>)}</nav>
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div>
              <p className={styles.eyebrow}>Start a conversation</p>
              <h2>Tell me what you are building.</h2>
            </div>
            <div>
              <p>Share the project, goal and approximate timeline. Morse Media will follow up with the right questions and a clear next step.</p>
              <Link className={styles.primaryButton} href="/contact">Start a project <ArrowRight /></Link>
              {bookingUrl && <a className={styles.secondaryButton} href={bookingUrl} target="_blank" rel="noopener noreferrer">Book a call <ArrowRight /></a>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
