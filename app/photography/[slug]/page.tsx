import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { recentWork } from '@/data/recent-work';
import { pageMetadata, siteUrl, jsonLd, breadcrumbs, shareImage } from '@/lib/seo';

const stories: Record<string, string> = {
  'autumn-current': 'Soft water traces a path across the hard lines of the rock. Gold leaves bring warmth to the scene, while the darker forest holds the edges of the frame.',
  'valley-in-color': 'Red leaves frame the view like a window. Beyond them, the valley opens into layers of color and distant ridgelines, bringing a sense of depth to a fleeting season.',
  'granite-and-gold': 'The large granite forms give this image its structure. Water moves between them, connecting the quiet foreground to the cascade and autumn canopy above.',
  'through-the-mountains': 'The rails create a strong diagonal through the foreground, leading the eye toward a valley of fall color. Their geometry contrasts with the softer shapes of the mountains.',
};

export function generateStaticParams() {
  return recentWork.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = recentWork.find((entry) => entry.slug === slug);
  if (!p) return {};
  const description = `${stories[slug] || p.alt} An original New England autumn photograph by Bradley Morse, available as a print or for licensing.`;
  return pageMetadata(`${p.title} — Autumn Photography`, description, `/photography/${slug}`, p.image, p.alt);
}

export default async function PhotoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = recentWork.find((entry) => entry.slug === slug);
  if (!p) notFound();
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      name: p.title,
      description: stories[slug] || p.alt,
      contentUrl: siteUrl + p.image,
      thumbnailUrl: siteUrl + shareImage(p.image).url,
      creator: { '@type': 'Person', name: 'Bradley Morse' },
      creditText: 'Bradley Morse / Morse Media',
      copyrightNotice: '© Bradley Morse. All rights reserved.',
      license: `${siteUrl}/terms`,
      acquireLicensePage: `${siteUrl}/contact?service=Image%20licensing&photo=${slug}`,
    },
    breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Photography', path: '/photography' }, { name: p.title, path: `/photography/${slug}` }]),
  ];

  return (
    <article className="detail-page content-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/photography">Photography</Link> / {p.title}</nav>
      <div className="photo-story">
        <Image src={p.image} alt={p.alt} width={750} height={1000} priority sizes="(max-width: 800px) 90vw, 50vw" />
        <div>
          <p className="eyebrow">Autumn studies · Bradley Morse</p>
          <h1>{p.title}</h1>
          <p>{stories[slug]}</p>
          <p className="form-note">Interested in a print for your space, or licensing this photograph for a project? Share the size or intended use and you will receive a personal quote.</p>
          <div className="detail-actions">
            <Link className="button button--solid" href={`/contact?service=${encodeURIComponent('Print or order question')}&photo=${slug}`}>Ask about a print</Link>
            <Link className="button" href={`/contact?service=Image%20licensing&photo=${slug}`}>License this image</Link>
          </div>
        </div>
      </div>
      <nav className="service-links" aria-label="More autumn photographs">
        {recentWork.filter((q) => q.slug !== slug).map((q) => <Link key={q.slug} href={`/photography/${q.slug}`}>{q.title} ↗</Link>)}
      </nav>
    </article>
  );
}
