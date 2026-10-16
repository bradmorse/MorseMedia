import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/data/case-studies';

/** Cards linking to /work/<slug>. Renders nothing until real case studies are added. */
export default function CaseStudyGrid({ studies, eyebrow = 'Case studies', heading = 'Projects, start to finish.' }: { studies: CaseStudy[]; eyebrow?: string; heading?: string }) {
  if (!studies.length) return null;
  return (
    <section className="content-section case-study-section" aria-label={eyebrow}>
      <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{heading}</h2></div></div>
      <div className="case-study-grid">
        {studies.map((study) => (
          <Link className="case-study-card" href={`/work/${study.slug}`} key={study.slug}>
            <span className="case-study-card__image"><Image src={study.cover.src} alt={study.cover.alt} fill sizes="(max-width: 700px) 100vw, 33vw" /></span>
            <span className="case-study-card__meta">{[study.industry, study.location, study.year].filter(Boolean).join(' · ')}</span>
            <strong>{study.title}</strong>
            <span className="case-study-card__summary">{study.summary}</span>
            <span className="text-link">Read the project <ArrowUpRight /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
