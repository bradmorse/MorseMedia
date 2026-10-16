import { redirect } from 'next/navigation';
import CaseStudyGrid from '@/components/CaseStudyGrid';
import { caseStudies } from '@/data/case-studies';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Client Work & Case Studies', 'Photography, video, social media and design projects for New Hampshire businesses, from the brief to the finished work.', '/work');

export default function WorkPage() {
  if (!caseStudies.length) redirect('/portfolio');
  return (
    <div className="detail-page content-section work-index">
      <p className="eyebrow">Client work</p>
      <h1>Projects, start to finish.</h1>
      <p className="detail-lead">What each client needed, how the work was planned and what was delivered.</p>
      <CaseStudyGrid studies={caseStudies} eyebrow="All case studies" heading="Recent projects." />
    </div>
  );
}
