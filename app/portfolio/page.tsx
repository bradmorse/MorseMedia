import Link from 'next/link';
import RecentGallery from '@/components/RecentGallery';
import CaseStudyGrid from '@/components/CaseStudyGrid';
import { caseStudies } from '@/data/case-studies';
import { pageMetadata } from '@/lib/seo';
import styles from './portfolio.module.css';

export const metadata = pageMetadata(
  'Commercial Photography & Video Portfolio',
  'Product photography, promotional video and short-form social content by Morse Media for retail brands. Now booking Nashville and Middle Tennessee shoots.',
  '/portfolio',
);

type Platform = 'Facebook' | 'Instagram' | 'YouTube';

type SocialLink = {
  platform: Platform;
  label: string;
  url: string;
};

type Brand = {
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  services: string[];
  links: SocialLink[];
  highlights: {
    title: string;
    description: string;
    linkLabel: string;
    url: string;
  }[];
};

const brands: Brand[] = [
  {
    name: "Love's Bedding & Furniture",
    shortName: 'LB',
    eyebrow: 'Retail furniture and bedding',
    description:
      'Brand-focused photo and video content created to support promotions, product education, customer engagement and in-store traffic.',
    services: ['Video production', 'Photography', 'Short-form social video', 'Social content'],
    links: [
      { platform: 'Facebook', label: "Love's Bedding & Furniture on Facebook", url: 'https://www.facebook.com/LovesBedding/' },
      { platform: 'Instagram', label: "Love's Bedding & Furniture on Instagram", url: 'https://www.instagram.com/lovesbeddingandfurniture/' },
      { platform: 'YouTube', label: "Love's Bedding & Furniture on YouTube", url: 'https://www.youtube.com/@lovesbeddingandfurniture' },
    ],
    highlights: [
      { title: 'Promotion and sale content', description: 'Photo and video content built around sales events, product packages and seasonal promotions.', linkLabel: 'View on Facebook', url: 'https://www.facebook.com/LovesBedding/' },
      { title: 'Video and short-form content', description: 'Commercial videos, product features and social-first edits produced for digital audiences.', linkLabel: 'Watch on YouTube', url: 'https://www.youtube.com/@lovesbeddingandfurniture' },
      { title: 'Brand photography', description: 'Product, showroom and lifestyle imagery created to give the brand a consistent visual presence.', linkLabel: 'View on Instagram', url: 'https://www.instagram.com/lovesbeddingandfurniture/' },
    ],
  },
  {
    name: "Love's Furniture Loft",
    shortName: 'LF',
    eyebrow: 'Furniture retail',
    description:
      'Social-first creative supporting furniture promotions, product discovery and local brand awareness with a polished, approachable retail style.',
    services: ['Retail video', 'Product photography', 'Social content'],
    links: [
      { platform: 'Facebook', label: "Love's Furniture Loft on Facebook", url: 'https://www.facebook.com/lovesfurnitureloft/' },
      { platform: 'Instagram', label: "Love's Furniture Loft on Instagram", url: 'https://www.instagram.com/loves_furniture_loft/' },
    ],
    highlights: [
      { title: 'Retail storytelling', description: 'Content that presents products in a useful, inviting way while keeping the local brand personality front and center.', linkLabel: 'View on Facebook', url: 'https://www.facebook.com/lovesfurnitureloft/' },
      { title: 'Short-form social video', description: 'Fast-moving edits designed for promotions, new arrivals and social engagement.', linkLabel: 'View on Instagram', url: 'https://www.instagram.com/loves_furniture_loft/' },
      { title: 'Product photography', description: 'Clean, accurate product imagery for new arrivals, social feeds and digital advertising.', linkLabel: 'Explore the work', url: 'https://www.facebook.com/lovesfurnitureloft/' },
    ],
  },
  {
    name: 'Cash & Carry Furniture',
    shortName: 'CC',
    eyebrow: 'Value-focused furniture retail',
    description:
      'Direct, energetic social media creative built around product value, timely promotions and an easy-to-understand customer message.',
    services: ['Promotional video', 'Product photography', 'Social media content'],
    links: [
      { platform: 'Facebook', label: 'Cash & Carry Furniture on Facebook', url: 'https://www.facebook.com/candcfurniturenh/' },
      { platform: 'Instagram', label: 'Cash & Carry Furniture on Instagram', url: 'https://www.instagram.com/cashandcarryfurniture/' },
    ],
    highlights: [
      { title: 'Offer-led video', description: 'Quick, high-energy edits that communicate price, availability and urgency in seconds.', linkLabel: 'View on Facebook', url: 'https://www.facebook.com/candcfurniturenh/' },
      { title: 'Product-focused content', description: 'Photography and video that make individual products easy to understand and shop.', linkLabel: 'View on Instagram', url: 'https://www.instagram.com/cashandcarryfurniture/' },
      { title: 'Always-on social content', description: 'A steady stream of photo and video posts that keeps the store visible between sales.', linkLabel: 'Explore the work', url: 'https://www.facebook.com/candcfurniturenh/' },
    ],
  },
];

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.7 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5H17V4.6c-.3 0-1.2-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.8V14h2.7v8h3.2Z" />
      </svg>
    );
  }

  if (platform === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.5" cy="6.6" r="1" className={styles.solidIconPart} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.2 7.2a2.8 2.8 0 0 0-2-2C17.4 4.7 12 4.7 12 4.7s-5.4 0-7.2.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.3 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.2.5 7.2.5s5.4 0 7.2-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.8 29 29 0 0 0-.5-4.8Z" />
      <path d="m10 15.2 5-3.2-5-3.2v6.4Z" className={styles.solidIconPart} />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  );
}

export default function PortfolioPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.container}>
          <p className={styles.eyebrow}>Commercial portfolio</p>
          <h1>Photo and video built to move brands forward.</h1>
          <p className={styles.heroCopy}>
            A selection of photography, promotional video and short-form social
            content produced for regional retail brands.
          </p>
          <div className={styles.capabilityRow} aria-label="Services">
            <span>Video production</span>
            <span>Photography</span>
            <span>Short-form social</span>
            <span>Real estate</span>
          </div>
          <Link className="text-link portfolio-hero-link" href="/photography">Looking for landscape photography? See the latest work ↗</Link>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <p className={styles.sectionLabel}>Selected client work</p>
            <div>
              <h2>Content made for real business goals.</h2>
              <p>
                Each brand required a distinct voice while sharing the same core
                objective: create clear, engaging content that supports promotions,
                strengthens recognition and brings customers into the store.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading"><div><p className="eyebrow">Approach</p><h2>One shoot. Every format.</h2></div></div>
        <div className="workflow-grid">
          <article><span>01 / Plan</span><h3>Start with the message.</h3><p>Define the offer, audience and channels. Build a shot list and asset plan around the campaign objective.</p></article>
          <article><span>02 / Produce</span><h3>Shoot stills and motion together.</h3><p>Plan photography and filming for the same visit, then edit for every format the campaign needs.</p></article>
          <article><span>03 / Refine</span><h3>Learn from the response.</h3><p>Use reporting and team feedback to inform the next round of content and creative decisions.</p></article>
        </div>
      </section>

      <div className={styles.caseStudyList}>
        {brands.map((brand, index) => (
          <article className={styles.caseStudy} key={brand.name}>
            <div className={styles.container}>
              <div className={styles.caseStudyHeader}>
                <div className={styles.brandMark} aria-hidden="true">
                  <span>{brand.shortName}</span>
                </div>
                <div className={styles.brandHeading}>
                  <p className={styles.caseNumber}>Client {String(index + 1).padStart(2, '0')}</p>
                  <p className={styles.brandEyebrow}>{brand.eyebrow}</p>
                  <h2>{brand.name}</h2>
                </div>
              </div>

              <div className={styles.caseStudyGrid}>
                <div className={styles.summaryColumn}>
                  <p className={styles.summary}>{brand.description}</p>

                  <div className={styles.serviceList} aria-label={`${brand.name} services`}>
                    {brand.services.map((service) => (
                      <span key={service}>{service}</span>
                    ))}
                  </div>

                  <div className={styles.socialBlock}>
                    <p className={styles.smallLabel}>See the work live</p>
                    <div className={styles.socialLinks}>
                      {brand.links.map((link) => (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={`${link.label} (opens in a new tab)`} key={link.url}>
                          <span className={styles.platformIcon}><PlatformIcon platform={link.platform} /></span>
                          <span>{link.platform}</span>
                          <ArrowIcon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.highlightGrid}>
                  {brand.highlights.map((highlight, highlightIndex) => (
                    <a href={highlight.url} target="_blank" rel="noopener noreferrer" className={styles.highlightCard} key={highlight.title} aria-label={`${highlight.title}: ${highlight.linkLabel} (opens in a new tab)`}>
                      <span className={styles.highlightNumber}>{String(highlightIndex + 1).padStart(2, '0')}</span>
                      <div>
                        <h3>{highlight.title}</h3>
                        <p>{highlight.description}</p>
                      </div>
                      <span className={styles.highlightLink}>{highlight.linkLabel}<ArrowIcon /></span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <CaseStudyGrid studies={caseStudies} eyebrow="In-depth projects" heading="From the brief to the finished work." />

      <section className="content-section">
        <div className="section-heading"><div><p className="eyebrow">Personal photography</p><h2>The eye behind the work.</h2></div><Link className="text-link" href="/photography">Explore the archive ↗</Link></div>
        <RecentGallery />
      </section>
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div>
              <p className={styles.eyebrow}>Work with Morse Media</p>
              <h2>Need photos and video that work as hard as you do?</h2>
            </div>
            <div className={styles.ctaActions}>
              <p>Now booking photography and video projects across Nashville and Middle Tennessee.</p>
              <Link href="/contact?service=Photo%20%2B%20video%20project" className={styles.primaryButton}>
                Start a project
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
