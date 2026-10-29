// Client case studies. Each entry becomes a page at /work/<slug> and appears on the Portfolio page
// and on the matching service page. The list is empty on purpose: add real projects only.
//
// Photos: put them in public/images/work/ (for example public/images/work/five-points-coffee-1.jpg)
// and reference them as '/images/work/five-points-coffee-1.jpg'. Ask the client before naming them.

import type { ServicePackage, Testimonial } from './proof';

export type CaseStudyImage = { src: string; alt: string };

export type CaseStudy = {
  slug: string; // URL name, e.g. 'five-points-coffee-menu'
  title: string; // e.g. 'A spring menu launch for a Five Points coffee shop'
  client: string;
  industry?: string; // e.g. 'Restaurant'
  location?: string; // e.g. 'East Nashville, TN'
  year?: string;
  service: ServicePackage['service'];
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
  //   slug: 'five-points-coffee-menu',
  //   title: 'A spring menu launch for a Five Points coffee shop',
  //   client: 'Client name',
  //   industry: 'Coffee shop',
  //   location: 'East Nashville, TN',
  //   year: '2026',
  //   service: 'photography',
  //   summary: 'Menu, interior and team photography plus three short videos for a seasonal relaunch.',
  //   challenge: 'The shop needed new images and video for its website, menus and Instagram before the spring menu launched.',
  //   approach: 'One planned morning shoot before opening, covering twelve drinks and dishes, the room in natural light and the team.',
  //   outcome: 'The new images now appear across the website, printed menus and weekly Instagram posts.',
  //   results: ['32 edited images and three vertical videos delivered in four days', 'One shoot covered web, print and social'],
  //   deliverables: ['Food and drink photography', 'Interior photography', 'Team portraits', 'Short-form video'],
  //   cover: { src: '/images/work/five-points-coffee-1.jpg', alt: 'Latte and pastry on a wooden counter by a sunny window' },
  //   gallery: [{ src: '/images/work/five-points-coffee-2.jpg', alt: 'The coffee shop dining room in morning light' }],
  //   videoUrl: 'https://vimeo.com/000000000',
  //   testimonial: { quote: 'Real quote from the client.', name: 'Client name', role: 'Owner' },
  // },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function caseStudiesForService(service: string) {
  return caseStudies.filter((study) => study.service === service);
}
