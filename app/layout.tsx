import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import './refinements.css';
import { CartProvider } from '@/components/CartProvider';
import { Footer, Header } from '@/components/SiteChrome';
import { storeIsOpen } from '@/lib/store-readiness';
import { shareImage } from '@/lib/seo';

const siteUrl = 'https://www.morsemedia.co';
const homeShare = shareImage('/images/photos/autumn-overlook.webp', 'Autumn valley and lake in the Adirondacks framed by pine branches');
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() || 'G-Q60YZCS3S9';

export const metadata: Metadata = {
  title: {
    default: 'Morse Media | Fine Art Photography & Creative Studio',
    template: '%s | Morse Media',
  },
  description: 'Fine-art landscape, wildlife and architectural photography by Bradley Morse, plus photography, video, social content and design for New Hampshire businesses.',
  metadataBase: new URL(siteUrl),
  applicationName: 'Morse Media',
  keywords: ['fine art photography', 'New England photography', 'New Hampshire photographer', 'landscape prints', 'Morse Media', 'Bradley Morse'],
  authors: [{ name: 'Bradley Morse', url: siteUrl }],
  creator: 'Bradley Morse',
  publisher: 'Morse Media',
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  openGraph: {
    title: 'Morse Media | Fine Art Photography',
    description: 'Atmospheric photography and fine-art prints from New England and beyond.',
    type: 'website',
    siteName: 'Morse Media',
    url: '/',
    locale: 'en_US',
    images: [homeShare],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morse Media | Fine Art Photography',
    description: 'Atmospheric photography and fine-art prints from New England and beyond.',
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
      description: 'A New Hampshire creative studio offering fine-art photography prints, brand and real estate photography, video production, social media content and design.',
      email: 'hello@morsemedia.co',
      founder: { '@type': 'Person', name: 'Bradley Morse' },
      address: { '@type': 'PostalAddress', addressRegion: 'NH', addressCountry: 'US' },
      areaServed: [
        { '@type': 'State', name: 'New Hampshire' },
        { '@type': 'Place', name: 'New England' },
      ],
      knowsAbout: ['Fine art photography', 'Brand photography', 'Real estate photography', 'Video production', 'Social media content', 'Graphic design'],
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
    <html lang="en">
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
