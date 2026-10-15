import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './portfolio.module.css';

export const metadata: Metadata = {
  title: 'Commercial Portfolio',
  description:
    'Commercial social media, video production, photography and graphic design work by Morse Media for New Hampshire furniture retailers.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Commercial Portfolio | Morse Media',
    description:
      'Selected commercial social media, video, photography and design work produced by Morse Media.',
    url: '/portfolio',
    type: 'website',
  },
};

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
      'Brand-focused social content created to support promotions, product education, customer engagement and in-store traffic across video, photography and graphic design.',
    services: [
      'Social media strategy',
      'Video production',
      'Photography',
      'Graphic design',
      'Campaign creative',
    ],
    links: [
      {
        platform: 'Facebook',
        label: "Love's Bedding & Furniture on Facebook",
        url: 'https://www.facebook.com/LovesBedding/',
      },
      {
        platform: 'Instagram',
        label: "Love's Bedding & Furniture on Instagram",
        url: 'https://www.instagram.com/lovesbeddingandfurniture/',
      },
      {
        platform: 'YouTube',
        label: "Love's Bedding & Furniture on YouTube",
        url: 'https://www.youtube.com/@lovesbeddingandfurniture',
      },
    ],
    highlights: [
      {
        title: 'Promotional campaigns',
        description:
          'Sale announcements, product packages and seasonal retail creative designed for fast, clear communication.',
        linkLabel: 'View campaign content',
        url: 'https://www.facebook.com/LovesBedding/',
      },
      {
        title: 'Video and short-form content',
        description:
          'Commercial videos, product features and social-first edits produced for digital audiences.',
        linkLabel: 'Watch on YouTube',
        url: 'https://www.youtube.com/@lovesbeddingandfurniture',
      },
      {
        title: 'Brand photography',
        description:
          'Product, showroom and lifestyle imagery created to give the brand a consistent visual presence.',
        linkLabel: 'View on Instagram',
        url: 'https://www.instagram.com/lovesbeddingandfurniture/',
      },
    ],
  },
  {
    name: "Love's Furniture Loft",
    shortName: 'LF',
    eyebrow: 'Furniture retail',
    description:
      'Social-first creative supporting furniture promotions, product discovery and local brand awareness with a polished, approachable retail style.',
    services: [
      'Social content',
      'Retail video',
      'Product photography',
      'Promotional design',
    ],
    links: [
      {
        platform: 'Facebook',
        label: "Love's Furniture Loft on Facebook",
        url: 'https://www.facebook.com/lovesfurnitureloft/',
      },
      {
        platform: 'Instagram',
        label: "Love's Furniture Loft on Instagram",
        url: 'https://www.instagram.com/loves_furniture_loft/',
      },
    ],
    highlights: [
      {
        title: 'Retail storytelling',
        description:
          'Content that presents products in a useful, inviting way while keeping the local brand personality front and center.',
        linkLabel: 'View on Facebook',
        url: 'https://www.facebook.com/lovesfurnitureloft/',
      },
      {
        title: 'Short-form social video',
        description:
          'Fast-moving edits designed for promotions, new arrivals and social engagement.',
        linkLabel: 'View on Instagram',
        url: 'https://www.instagram.com/loves_furniture_loft/',
      },
      {
        title: 'Graphic campaign assets',
        description:
          'Consistent promotional graphics built for social feeds, digital advertising and store events.',
        linkLabel: 'Explore the work',
        url: 'https://www.facebook.com/lovesfurnitureloft/',
      },
    ],
  },
  {
    name: 'Cash & Carry Furniture',
    shortName: 'CC',
    eyebrow: 'Value-focused furniture retail',
    description:
      'Direct, energetic social media creative built around product value, timely promotions and an easy-to-understand customer message.',
    services: [
      'Social media content',
      'Promotional video',
      'Product photography',
      'Sales graphics',
    ],
    links: [
      {
        platform: 'Facebook',
        label: 'Cash & Carry Furniture on Facebook',
        url: 'https://www.facebook.com/candcfurniturenh/',
      },
      {
        platform: 'Instagram',
        label: 'Cash & Carry Furniture on Instagram',
        url: 'https://www.instagram.com/cashandcarryfurniture/',
      },
    ],
    highlights: [
      {
        title: 'Offer-led creative',
        description:
          'Clear, high-impact content designed to communicate price, availability and urgency quickly.',
        linkLabel: 'View on Facebook',
        url: 'https://www.facebook.com/candcfurniturenh/',
      },
      {
        title: 'Product-focused content',
        description:
          'Photography and video that make individual products easy to understand and shop.',
        linkLabel: 'View on Instagram',
        url: 'https://www.instagram.com/cashandcarryfurniture/',
      },
      {
        title: 'Consistent retail branding',
        description:
          'Repeatable visual systems that keep sale content recognizable across platforms.',
        linkLabel: 'Explore the work',
        url: 'https://www.facebook.com/candcfurniturenh/',
      },
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
          <Link className="text-link" href="/photography">Explore latest landscape photography ↗</Link>
          <h1>Creative work built to move brands forward.</h1>
          <p className={styles.heroCopy}>
            A selection of social media, video production, photography and graphic
            design work produced for New Hampshire furniture retailers.
          </p>
          <div className={styles.capabilityRow} aria-label="Creative services">
            <span>Social strategy</span>
            <span>Video production</span>
            <span>Photography</span>
            <span>Graphic design</span>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <p className={styles.sectionLabel}>Selected client work</p>
            <div>
              <h2>Content designed for real business goals.</h2>
              <p>
                Each brand required a distinct voice while sharing the same core
                objective: create clear, engaging content that supports promotions,
                strengthens recognition and brings customers into the store.
              </p>
            </div>
          </div>
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
                  <p className={styles.caseNumber}>
                    Case study {String(index + 1).padStart(2, '0')}
                  </p>
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
                    <p className={styles.smallLabel}>Featured channels</p>
                    <div className={styles.socialLinks}>
                      {brand.links.map((link) => (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.socialLink}
                          aria-label={`${link.label} — opens in a new tab`}
                          key={link.url}
                        >
                          <span className={styles.platformIcon}>
                            <PlatformIcon platform={link.platform} />
                          </span>
                          <span>{link.platform}</span>
                          <ArrowIcon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.highlightGrid}>
                  {brand.highlights.map((highlight, highlightIndex) => (
                    <a
                      href={highlight.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.highlightCard}
                      key={highlight.title}
                      aria-label={`${highlight.linkLabel} — opens in a new tab`}
                    >
                      <span className={styles.highlightNumber}>
                        {String(highlightIndex + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3>{highlight.title}</h3>
                        <p>{highlight.description}</p>
                      </div>
                      <span className={styles.highlightLink}>
                        {highlight.linkLabel}
                        <ArrowIcon />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div>
              <p className={styles.eyebrow}>Work with Morse Media</p>
              <h2>Need creative that looks good and works hard?</h2>
            </div>
            <div className={styles.ctaActions}>
              <p>
                Let&apos;s talk about photography, video, social content or design
                for your next campaign.
              </p>
              <Link href="/contact" className={styles.primaryButton}>
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
