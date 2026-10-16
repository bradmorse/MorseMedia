// Client case studies. Each entry becomes a page at /work/<slug> and appears on the Portfolio page
// and on the matching service page. The list is empty on purpose: add real projects only.
//
// Photos: put them in public/images/work/ (for example public/images/work/harbor-cafe-1.jpg)
// and reference them as '/images/work/harbor-cafe-1.jpg'. Ask the client before naming them.

import type { Testimonial } from './proof';

export type CaseStudyImage = { src: string; alt: string };

export type CaseStudy = {
  slug: string; // URL name, e.g. 'harbor-cafe-rebrand'
  title: string; // e.g. 'A summer menu launch for Harbor Café'
  client: string;
  industry?: string; // e.g. 'Restaurant'
  location?: string; // e.g. 'Portsmouth, NH'
  year?: string;
  service: 'photography' | 'video-production' | 'social-media' | 'graphic-design' | 'real-estate';
  summary: string; // one or two sentences shown on cards
  challenge: string; // what the client needed
  approach: string; // what you planned and produced
  outcome: string; // what happened next — only facts the client has confirmed
  results?: string[]; // short, verifiable points, e.g. 'Menu photos used across web, print and Instagram'
  deliverables: string[];
  cover: CaseStudyImage;
  gallery?: CaseStudyImage[];
  videoUrl?: string; // optional YouTube or Vimeo link
  testimonial?: Testimonial; // a real quote, with permission
};

export const caseStudies: CaseStudy[] = [
  // {
  //   slug: 'harbor-cafe-summer-menu',
  //   title: 'A summer menu launch for Harbor Café',
  //   client: 'Harbor Café',
  //   industry: 'Restaurant',
  //   location: 'Portsmouth, NH',
  //   year: '2026',
  //   service: 'photography',
  //   summary: 'Menu, interior and team photography for a seasonal relaunch.',
  //   challenge: 'The café needed new images for its website, menus and social channels before the summer season.',
  //   approach: 'One planned half-day shoot covering twelve dishes, the dining room at golden hour and portraits of the team.',
  //   outcome: 'The new images now appear across the website, printed menus and weekly Instagram posts.',
  //   results: ['32 edited images delivered in four days', 'One shoot covered web, print and social'],
  //   deliverables: ['Food photography', 'Interior photography', 'Team portraits'],
  //   cover: { src: '/images/work/harbor-cafe-1.jpg', alt: 'Plated summer salad on a marble table by a window' },
  //   gallery: [{ src: '/images/work/harbor-cafe-2.jpg', alt: 'Dining room at golden hour' }],
  //   testimonial: { quote: 'Real quote from the client.', name: 'Client name', role: 'Owner, Harbor Café' },
  // },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function caseStudiesForService(service: string) {
  return caseStudies.filter((study) => study.service === service);
}
