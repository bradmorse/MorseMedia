import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import './refinements.css';
import { CartProvider } from '@/components/CartProvider';
import { Footer, Header } from '@/components/SiteChrome';
import { storeIsOpen } from '@/lib/store-readiness';
import { shareImage } from '@/lib/seo';
import { areaServedSchema, business } from '@/data/business';
import { servicePages, servicePath } from '@/data/services';
import { PRINT_SHOP_ENABLED } from '@/data/features';

const printsNote = PRINT_SHOP_ENABLED ? ' — plus original fine-art prints' : '';

const siteUrl = 'https://www.morsemedia.co';
const homeShare = shareImage('/images/photos/autumn-overlook.webp', 'Autumn valley and lake in the Adirondacks framed by pine branches');
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() || 'G-Q60YZCS3S9';

export const metadata: Metadata = {
  title: {
    default: 'Morse Media | Nashville Photography & Video',
    template: '%s | Morse Media',
  },
  description: `Nashville photographer and videographer Bradley Morse: brand, headshot, event and real estate photography, cinematic video and monthly content for Middle Tennessee businesses${printsNote}.`,
  metadataBase: new URL(siteUrl),
  applicationName: 'Morse Media',
  keywords: ['Nashville photographer', 'Nashville videographer', 'Nashville real estate photography', 'Nashville brand photography', 'Nashville headshots', 'Franklin TN photographer', 'Middle Tennessee video production', 'Nashville event photographer', 'Morse Media', 'Bradley Morse'],
  authors: [{ name: 'Bradley Morse', url: siteUrl }],
  creator: 'Bradley Morse',
  publisher: 'Morse Media',
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  openGraph: {
    title: 'Morse Media | Nashville Photography & Video',
    description: `Brand, real estate and event photography and cinematic video in Nashville and Middle Tennessee${printsNote}.`,
    type: 'website',
    siteName: 'Morse Media',
    url: '/',
    locale: 'en_US',
    images: [homeShare],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morse Media | Nashville Photography & Video',
    description: `Brand, real estate and event photography and cinematic video in Nashville and Middle Tennessee${printsNote}.`,
    images: [homeShare.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d1412',
  colorScheme: 'dark',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${siteUrl}/#business`,
      name: 'Morse Media',
      url: siteUrl,
      logo: `${siteUrl}/images/morse-media-logo.png`,
      image: `${siteUrl}/images/og/autumn-overlook.jpg`,
      description: `A ${business.city} photography and video studio offering brand, headshot, event and real estate photography, video production and monthly content${PRINT_SHOP_ENABLED ? ', plus fine-art photography prints' : ''}.`,
      email: business.email,
      founder: { '@type': 'Person', name: business.owner },
      address: { '@type': 'PostalAddress', addressLocality: business.city, addressRegion: business.stateCode, addressCountry: 'US' },
      areaServed: areaServedSchema(),
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: business.email, areaServed: 'US', availableLanguage: 'English' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Photography & video services',
        itemListElement: servicePages.map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service.name, url: siteUrl + servicePath(service.slug) },
        })),
      },
      knowsAbout: ['Brand photography', 'Headshot photography', 'Event photography', 'Real estate photography', 'Real estate video', 'Video production', 'Videography', 'Fine art photography'],
      priceRange: '$$',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Morse Media',
      publisher: { '@id': `${siteUrl}/#business` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const storeOpen = storeIsOpen();
  return (
    <html lang="en-US">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }}
        />
        <CartProvider>
          <Header storeOpen={storeOpen} />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
