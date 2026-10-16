// Real proof only for testimonials: leave that list empty until you have genuine client quotes.
// Starting prices below are your published "from" rates. Edit any figure here and redeploy.

export type Testimonial = { quote: string; name: string; role?: string };

export type ServicePackage = {
  kicker: string; // service label shown above the name
  name: string;
  startingAt?: string; // e.g. "From $950". Leave out to show "Custom quote".
  description: string;
  includes: string[];
  service: string; // slug of the matching service page
  inquiry: string; // project type pre-selected on the contact form
};

export const testimonials: Testimonial[] = [
  // { quote: 'Short, real quote from a client.', name: 'Client Name', role: 'Business or role' },
];

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
    kicker: 'Real estate',
    name: 'Real Estate Listing',
    startingAt: 'From $325',
    description: 'Interior and exterior coverage for listings up to 2,500 sq ft, delivered ready for the MLS.',
    includes: ['25–35 edited images', 'Window and exposure blending', '48-hour standard delivery', 'MLS-ready and web sizes', 'Twilight and detail add-ons available'],
    service: 'real-estate',
    inquiry: 'Real estate photography',
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
    name: 'Commercial Video',
    startingAt: 'From $3,500',
    description: 'A full production for campaigns, brand stories and interview-led films.',
    includes: ['Creative brief and storyboard', 'Up to a full day of filming', 'Interview, voiceover or b-roll storytelling', 'Motion graphics and audio finishing', 'Three rounds of revisions'],
    service: 'video-production',
    inquiry: 'Video production',
  },
  {
    kicker: 'Social media',
    name: 'Monthly Social Content',
    startingAt: 'From $1,400 / month',
    description: 'Planned, produced and platform-ready content on a steady rhythm, with a three-month minimum.',
    includes: ['Monthly content plan', '8–12 posts mixing photo, video and graphics', 'Captions and platform formatting', 'Monthly performance summary', 'Priority scheduling for shoots'],
    service: 'social-media',
    inquiry: 'Social media content',
  },
  {
    kicker: 'Design',
    name: 'Campaign Design',
    startingAt: 'From $750',
    description: 'A cohesive set of graphics for a campaign, launch or seasonal push, built inside your brand.',
    includes: ['Brief and visual direction', 'Up to 6 campaign assets', 'Digital and print-ready exports', 'Reusable layouts for later use', 'Two rounds of revisions'],
    service: 'graphic-design',
    inquiry: 'Graphic design',
  },
];
