'use client';

import { useSearchParams } from 'next/navigation';
import { galleryPhotos } from '@/data/discovery';
import { ContactForm, projectTypes } from './Forms';

const allowedProjectTypes = new Set(projectTypes);

const serviceTypeMap: Record<string, string> = {
  Photography: 'Photography',
  'Video Production': 'Video production',
  'Social Media Content': 'Social media content',
  'Graphic Design': 'Graphic design',
  'Real estate': 'Real estate photography',
  'Gift card': 'Gift certificate',
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
