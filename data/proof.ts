// Real proof only for testimonials: leave that list empty until you have genuine client quotes.
// Starting prices below are your published "from" rates for Nashville and Middle Tennessee.
// Edit any figure here and redeploy — every page that shows a price reads from this file.

import { startingPrice } from '../lib/seo';

export type Testimonial = { quote: string; name: string; role?: string };

export type ServicePackage = {
  kicker: string; // service label shown above the name
  name: string;
  startingAt?: string; // e.g. "From $950". Leave out to show "Custom quote".
  description: string;
  includes: string[];
  service: 'photography' | 'video-production' | 'real-estate' | 'monthly-content'; // slug of the matching service page
  inquiry: string; // project type pre-selected on the contact form
};

export const testimonials: Testimonial[] = [
  // { quote: 'Short, real quote from a client.', name: 'Client Name', role: 'Business or role' },
];

/**
 * Your showreel. Paste a YouTube or Vimeo link (for example 'https://vimeo.com/123456789') and it appears
 * on the home page and the video production page. Leave it empty to hide the section.
 */
export const showreel = { url: '', title: 'Morse Media — photo and video reel' };

// Nine starting points, shown three per row on /services: photography, video, then property and monthly work.
export const servicePackages: ServicePackage[] = [
  {
    kicker: 'Photography',
    name: 'Brand Photography Session',
    startingAt: 'From $950',
    description: 'A half-day on location with a planned shot list, built for your website, social channels and print.',
    includes: ['Up to 3 hours on location', 'Shot list and planning call', '25 edited, color-graded images', 'Web, social and print exports', 'Business-use licensing included'],
    service: 'photography',
    inquiry: 'Photography',
  },
  {
    kicker: 'Photography',
    name: 'Headshots & Team Portraits',
    startingAt: 'From $450',
    description: 'Consistent, flattering portraits for your website, LinkedIn and press — shot at your office or on location.',
    includes: ['Portable studio or natural-light setup', 'Up to 8 people in about two hours', 'One retouched image per person', 'A matching look for the whole team', 'Easy to match for new hires later'],
    service: 'photography',
    inquiry: 'Headshots & team portraits',
  },
  {
    kicker: 'Photography',
    name: 'Event Photography',
    startingAt: 'From $600',
    description: 'Candid and on-stage coverage for conferences, launches, parties and community events.',
    includes: ['Up to 2 hours of coverage', '75+ edited images', 'A few selects within 24 hours for social', 'Full gallery within five business days', 'Add a highlight video for the same event'],
    service: 'photography',
    inquiry: 'Event coverage',
  },
  {
    kicker: 'Video',
    name: 'Short-Form Video',
    startingAt: 'From $1,800',
    description: 'A cinematic 30–90 second piece, or a set of social cuts, planned and filmed around one clear message.',
    includes: ['Concept and shot plan', 'Half-day of filming', 'Edit with color, sound and captions', 'Widescreen master plus vertical cuts', 'Two rounds of revisions'],
    service: 'video-production',
    inquiry: 'Video production',
  },
  {
    kicker: 'Video',
    name: 'Commercial & Brand Film',
    startingAt: 'From $3,500',
    description: 'A full production for brand stories, commercials and interview-led films.',
    includes: ['Creative brief and storyboard', 'Up to a full day of filming', 'Interview, voiceover or b-roll storytelling', 'Color grading and audio finishing', 'Three rounds of revisions'],
    service: 'video-production',
    inquiry: 'Video production',
  },
  {
    kicker: 'Video',
    name: 'Event Highlight Film',
    startingAt: 'From $1,200',
    description: 'The energy of the day in one to two minutes, ready to share while people are still talking about it.',
    includes: ['Up to 3 hours of filming', 'A 60–120 second highlight film', 'Vertical cut for Reels and TikTok', 'Licensed music and color grading', 'Delivered within seven business days'],
    service: 'video-production',
    inquiry: 'Event coverage',
  },
  {
    kicker: 'Real estate',
    name: 'Real Estate Listing',
    startingAt: 'From $275',
    description: 'Interior and exterior coverage for listings up to 2,500 sq ft, delivered ready for the MLS.',
    includes: ['25–35 edited images', 'Window and exposure blending', '48-hour standard delivery', 'MLS-ready and web sizes', 'Twilight and detail add-ons available'],
    service: 'real-estate',
    inquiry: 'Real estate photo & video',
  },
  {
    kicker: 'Real estate',
    name: 'Listing Photo + Video',
    startingAt: 'From $650',
    description: 'The full listing package plus a cinematic walkthrough, captured in the same visit.',
    includes: ['Everything in the listing package', '60–90 second walkthrough video', 'Vertical cut for Reels and TikTok', 'Branded and unbranded versions for the MLS', 'Video delivered within three business days'],
    service: 'real-estate',
    inquiry: 'Real estate photo & video',
  },
  {
    kicker: 'Monthly content',
    name: 'Monthly Photo & Video',
    startingAt: 'From $1,400 / month',
    description: 'A planned half-day shoot every month, so your channels always have something new and real to post.',
    includes: ['Monthly shoot plan', '30+ edited photos', '4 short-form vertical videos', 'Platform-ready sizes for every channel', 'Priority scheduling, three-month minimum'],
    service: 'monthly-content',
    inquiry: 'Monthly photo & video content',
  },
];

/** The lowest published starting price for a service, e.g. "From $450", for cards and summaries. */
export function lowestStartingAt(service: string) {
  const priced = servicePackages
    .filter((p) => p.service === service && p.startingAt)
    .map((p) => ({ label: p.startingAt as string, value: startingPrice(p.startingAt) ?? Infinity }))
    .sort((a, b) => a.value - b.value);
  return priced[0]?.label;
}
