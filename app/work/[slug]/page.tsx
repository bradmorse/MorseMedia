import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '@/data/case-studies';
import { servicePages, servicePath } from '@/data/services';
import { breadcrumbs, jsonLd, pageMetadata, siteUrl } from '@/lib/seo';
import { videoEmbed } from '@/lib/video';

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata(`${study.title} — Case Study`, `${study.summary} ${study.client}${study.location ? `, ${study.location}` : ''}.`, `/work/${slug}`, study.cover.src, study.cover.alt);
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const service = servicePages.find((entry) => entry.slug === study.service);
  const embed = videoEmbed(study.videoUrl);
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: study.title,
      description: study.summary,
      url: `${siteUrl}/work/${slug}`,
      image: siteUrl + study.cover.src,
      creator: { '@id': `${siteUrl}/#business` },
      about: study.client,
      ...(study.year ? { dateCreated: study.year } : {}),
    },
    breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }, { name: study.title, path: `/work/${slug}` }]),
  ];

  return (
    <article className="detail-page content-section case-study-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/portfolio">Portfolio</Link> / <span>{study.client}</span></nav>
      <p className="eyebrow">{[service?.type, study.industry, study.location, study.year].filter(Boolean).join(' · ')}</p>
      <h1>{study.title}</h1>
      <p className="detail-lead">{study.summary}</p>
      <div className="case-study-page__cover"><Image src={study.cover.src} alt={study.cover.alt} fill priority sizes="100vw" /></div>
      <div className="service-detail-grid">
        <section><h2>The brief.</h2><p>{study.challenge}</p></section>
        <section><h2>The approach.</h2><p>{study.approach}</p></section>
      </div>
      {embed && (
        <div className="case-study-page__video">
          <iframe src={embed} title={`${study.title} video`} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        </div>
      )}
      {study.gallery && study.gallery.length > 0 && (
        <div className="case-study-page__gallery">
          {study.gallery.map((image) => <figure key={image.src}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /></figure>)}
        </div>
      )}
      <div className="service-detail-grid">
        <section>
          <h2>The outcome.</h2>
          <p>{study.outcome}</p>
          {study.results && study.results.length > 0 && <ul>{study.results.map((result) => <li key={result}>{result}</li>)}</ul>}
        </section>
        <section><h2>Delivered.</h2><ul>{study.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></section>
      </div>
      {study.testimonial && (
        <blockquote className="case-study-page__quote">
          <p>“{study.testimonial.quote}”</p>
          <footer>{study.testimonial.name}{study.testimonial.role ? `, ${study.testimonial.role}` : ''}</footer>
        </blockquote>
      )}
      <section className="editorial-note">
        <h2>Planning something similar?</h2>
        <p>Share the goal, timeline and where the work will be used, and you will get a clear scope and quote.</p>
        <div className="detail-actions">
          <Link className="button button--solid" href={`/contact?service=${encodeURIComponent(service?.type || 'Photo + video project')}`}>Start a project</Link>
          {service && <Link className="text-link" href={servicePath(service.slug)}>About {service.name.toLowerCase()} ↗</Link>}
        </div>
      </section>
    </article>
  );
}
