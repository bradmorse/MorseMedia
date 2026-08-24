import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { Footer, Header } from '@/components/SiteChrome';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://morsemedia.co';

export const metadata: Metadata = {
  title: {
    default: 'Morse Media | Fine Art Photography',
    template: '%s | Morse Media',
  },
  description: 'Fine-art landscape, wildlife and architectural photography prints, plus cinematic video and design by Morse Media.',
  metadataBase: new URL(siteUrl),
  applicationName: 'Morse Media',
  keywords: ['fine art photography', 'New England photography', 'landscape prints', 'Morse Media', 'photography prints'],
  authors: [{ name: 'Morse Media' }],
  creator: 'Morse Media',
  publisher: 'Morse Media',
  openGraph: {
    title: 'Morse Media | Fine Art Photography',
    description: 'Atmospheric photography and museum-quality prints from New England and beyond.',
    type: 'website',
    siteName: 'Morse Media',
    url: '/',
    images: [{ url: '/images/photos/autumn-overlook.webp', alt: 'Foggy autumn mountains and lakes in the Adirondacks' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morse Media | Fine Art Photography',
    description: 'Atmospheric photography and museum-quality prints from New England and beyond.',
    images: ['/images/photos/autumn-overlook.webp'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0c0e0f',
  colorScheme: 'dark',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Morse Media',
  url: siteUrl,
  logo: `${siteUrl}/images/morse-media-logo.png`,
  description: 'A New England creative studio offering fine-art photography prints, photography, video and design.',
  email: 'hello@morsemedia.co',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }}
        />
        <CartProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
      <GoogleAnalytics gaId="G-Q60YZCS3S9" />
    </html>
  );
}
