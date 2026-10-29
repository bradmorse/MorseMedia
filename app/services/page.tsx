import Link from 'next/link';
import { servicePages, servicePath } from '@/data/services';
import { servicePackages, showreel, testimonials } from '@/data/proof';
import { business, areaServedSchema } from '@/data/business';
import VideoEmbed from '@/components/VideoEmbed';
import { ArrowRight, CalendarDays, Camera, Check, Clapperboard, Home, Layers } from 'lucide-react';
import { breadcrumbs, jsonLd, pageMetadata, siteUrl } from '@/lib/seo';
import styles from './services.module.css';

export const metadata = pageMetadata(
  'Photography & Video Services in Nashville',
  'Nashville photo and video packages with starting prices: brand shoots, headshots, events, real estate listings, brand films and monthly content.',
  '/services',
);

const services = [
  {
    id: 'photography',
    number: '01',
    icon: Camera,
    title: 'Photography',
    lead: 'Distinctive imagery that gives your business a stronger visual identity.',
    description:
      'From headshots and team portraits to product, location and event coverage, every shoot is planned around where the images will live and what they need to accomplish.',
    deliverables: ['Brand and lifestyle photography', 'Headshots and team portraits', 'Product, menu and interior photography', 'Event and conference coverage', 'Web, social and print-ready exports'],
    bestFor: 'Websites, social media, advertising, recruiting, press and events.',
  },
  {
    id: 'video-production',
    number: '02',
    icon: Clapperboard,
    title: 'Video Production',
    lead: 'Cinematic, purposeful video created for the way audiences watch today.',
    description:
      'Morse Media shapes a project from early concept through final delivery, combining careful shooting, pacing, sound and editing into video that feels polished without losing authenticity.',
    deliverables: ['Creative direction and shot planning', 'On-location filming and interviews', 'Brand films and commercial edits', 'Vertical cuts for Reels, TikTok and Shorts', 'Color grading, captions and audio cleanup'],
    bestFor: 'Brand films, product features, testimonials, recruiting, events and social.',
  },
  {
    id: 'real-estate',
    number: '03',
    icon: Home,
    title: 'Real Estate Photo & Video',
    lead: 'Listing media that earns the click, the showing and the offer.',
    description:
      'Bright, true-to-life interiors, clean exteriors and an optional cinematic walkthrough, captured in one visit and delivered ready for the MLS, listing sites and social media.',
    deliverables: ['Interior and exterior listing photography', 'Window and exposure blending', 'Cinematic walkthrough video', 'Twilight and detail images', 'MLS-ready files within 48 hours'],
    bestFor: 'Agents, brokerages, builders, short-term rentals and property managers.',
  },
  {
    id: 'monthly-content',
    number: '04',
    icon: CalendarDays,
    title: 'Monthly Content',
    lead: 'A repeatable stream of real photos and video for your channels.',
    description:
      'Instead of scrambling for something to post, one planned shoot each month captures your products, people, space and upcoming promotions — delivered in every size your channels need.',
    deliverables: ['A monthly shoot planned around your calendar', 'Edited photos sized for every platform', 'Short-form vertical videos', 'Seasonal and promotional content', 'A shared library organized by month'],
    bestFor: 'Restaurants, retailers, salons, gyms and local businesses that post often.',
  },
];

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();

const workflow = [
  { number: '01', title: 'Discover', copy: 'Clarify the audience, objective, scope, timeline and where the final work will be used.' },
  { number: '02', title: 'Plan', copy: 'Build the creative direction, shot list, locations and production schedule.' },
  { number: '03', title: 'Produce', copy: 'Photograph, film and edit the work with clear communication throughout.' },
  { number: '04', title: 'Deliver', copy: 'Provide organized, platform-ready files and refinements based on the agreed scope.' },
];

const faqs = [
  { question: 'What types of clients do you work with?', answer: 'Morse Media works with local businesses, retailers, restaurants, real estate agents, professional firms, organizations and independent brands that need professional photography and video. Projects can be one-time shoots or ongoing monthly content.' },
  { question: 'Where are you available?', answer: `Morse Media is based in ${business.city} and works throughout ${business.region}, including Franklin, Brentwood, Murfreesboro, Hendersonville, Gallatin, Mt. Juliet and Lebanon. Travel for larger productions is available anywhere and is quoted up front.` },
  { question: 'Can you shoot photo and video at the same time?', answer: 'Yes. Many clients book both for the same visit — a brand session with a short video, or listing photos with a walkthrough. Planning them together saves time on site and keeps the look consistent.' },
  { question: 'How fast is delivery?', answer: 'Real estate photos are delivered within 48 hours. Brand and event galleries typically arrive within five business days, and video timelines are agreed in the quote, usually one to two weeks depending on revisions.' },
  { question: 'Can I use the photos and videos however I like?', answer: 'Standard business-use licensing is included with every package — your website, social channels, email, digital ads and printed marketing. Broadcast, resale and use by third parties are quoted separately.' },
  { question: 'How are projects priced?', answer: 'Starting prices for typical projects are listed above. Final pricing depends on scope, production time, travel, usage and deliverables, and you will receive a clear written estimate before any work begins.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: business.name,
  url: `${siteUrl}/services`,
  areaServed: areaServedSchema(),
  email: business.email,
  description: `Photography and video production services for businesses, brands and real estate agents in ${business.city} and ${business.region}.`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Photography & Video Services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.title, description: service.description, url: siteUrl + servicePath(service.id) },
    })),
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
};

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([serviceSchema, faqSchema, breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])]) }} />

      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroOrb} aria-hidden="true" />
        <div className={styles.container}>
          <p className={styles.eyebrow}>Photography &amp; video services · {business.baseShort}</p>
          <h1>Nashville photography and video, under one roof.</h1>
          <div className={styles.heroBottom}>
            <p>Morse Media creates brand photography, headshots, event coverage, real estate listings and cinematic video that help {business.city} businesses look as good as the work they do.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/contact?service=Photo%20%2B%20video%20project">Start a project <ArrowRight /></Link>
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
              <h2>One crew for stills and motion.</h2>
              <p>When photography and video are planned together, the shoot runs faster, the look stays consistent and every asset is more useful. Book a single service, combine them in one visit, or set up a monthly rhythm.</p>
              <div className={styles.overviewStats}>
                <div><strong>{servicePages.length}</strong><span>Photo and video services</span></div>
                <div><strong>1</strong><span>Point of contact from plan to delivery</span></div>
                <div><strong>48 hrs</strong><span>Real estate photo delivery</span></div>
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
                  <Link href={servicePath(id)} className={styles.cardLink}>More on {title.toLowerCase()} <ArrowRight /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.reportingSection}>
        <div className={styles.container}>
          <div className={styles.reportingCard}>
            <div className={styles.reportingIcon}><Layers aria-hidden="true" /></div>
            <div>
              <p className={styles.sectionLabel}>Built to be used</p>
              <h2>One shoot, every format you need.</h2>
            </div>
            <p>Every project is planned around where the work will appear — website banners, vertical video for Reels and TikTok, MLS listings, ads and print. You get organized, correctly sized files, not a folder of raw exports to sort through.</p>
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
        <section className={styles.packageSection} id="packages" aria-labelledby="packages-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionLabel}>Starting points</p>
                <h2 id="packages-heading">Clear starting prices, scoped to your project.</h2>
              </div>
              <p>Typical projects in {business.city} and {business.region}. Every quote is confirmed in writing before work begins.</p>
            </div>
            <div className={styles.packageGrid}>
              {servicePackages.map((pkg) => (
                <article className={styles.packageCard} key={pkg.name}>
                  <span className={styles.packageKicker}>{pkg.kicker}</span>
                  <h3>{pkg.name}</h3>
                  <p className={styles.packagePrice}>{pkg.startingAt || 'Custom quote'}</p>
                  <p className={styles.packageCopy}>{pkg.description}</p>
                  <ul>
                    {pkg.includes.map((item) => (
                      <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>
                    ))}
                  </ul>
                  <Link className={styles.cardLink} href={`/contact?service=${encodeURIComponent(pkg.inquiry)}`}>Request a quote <ArrowRight /></Link>
                </article>
              ))}
            </div>
            <p className={styles.packageNote}>Prices cover shoots in the greater {business.city} area. Longer travel, licensing beyond standard business use, rush delivery and additional shooting time are quoted separately. Photo and video booked together are scoped as one project.</p>
          </div>
        </section>
      )}

      {showreel.url && (
        <section className={styles.packageSection} aria-labelledby="reel-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionLabel}>Reel</p>
                <h2 id="reel-heading">See the work move.</h2>
              </div>
            </div>
            <VideoEmbed url={showreel.url} title={showreel.title} />
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className={styles.packageSection} aria-labelledby="testimonials-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionLabel}>Kind words</p>
                <h2 id="testimonials-heading">What clients say.</h2>
              </div>
            </div>
            <div className={styles.quoteGrid}>
              {testimonials.map((item) => (
                <figure className={styles.quoteCard} key={item.name}>
                  <blockquote>{item.quote}</blockquote>
                  <figcaption>{item.name}{item.role ? ` · ${item.role}` : ''}</figcaption>
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

      <nav className="content-section service-links" aria-label="Service details">{servicePages.map(s => <Link key={s.slug} href={servicePath(s.slug)}>{s.name} ↗</Link>)}<Link href="/areas">Areas served ↗</Link></nav>
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
