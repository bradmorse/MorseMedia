'use client';

import { useSearchParams } from 'next/navigation';
import { galleryPhotos } from '@/data/discovery';
import { ContactForm } from './Forms';
import { projectTypes } from '@/data/inquiries';

const allowedProjectTypes = new Set(projectTypes);

// Older links (and the names of services that no longer exist) still land on a sensible project type.
const serviceTypeMap: Record<string, string> = {
  Photography: 'Photography',
  Headshots: 'Headshots & team portraits',
  Events: 'Event coverage',
  'Event photography': 'Event coverage',
  'Video Production': 'Video production',
  'Real estate': 'Real estate photo & video',
  'Real estate photography': 'Real estate photo & video',
  'Social Media Content': 'Monthly photo & video content',
  'Social media content': 'Monthly photo & video content',
  'Monthly content': 'Monthly photo & video content',
  'Graphic Design': 'Photo + video project',
  'Graphic design': 'Photo + video project',
  'Combined creative campaign': 'Photo + video project',
  'Gift card': 'Print or order question',
  'Gift certificate': 'Print or order question',
};

/**
 * Reads ?service= and ?photo= in the browser, so the contact page itself can be served
 * instantly from the CDN instead of being rebuilt on every visit.
 */
export default function ContactFormFromQuery() {
  const params = useSearchParams();
  const service = params.get('service') || '';
  const photo = params.get('photo') || '';
  const requestedType = service ? serviceTypeMap[service] || service : 'Print or order question';
  const defaultType = allowedProjectTypes.has(requestedType) ? requestedType : 'Print or order question';
  const photoTitle = galleryPhotos.find((entry) => entry.slug === photo)?.title;
  return <ContactForm key={defaultType + photo} defaultType={defaultType} photoTitle={photoTitle} />;
}
