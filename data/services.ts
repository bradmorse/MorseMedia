// The four photo and video services. Each entry becomes a page at /services/<slug>
// (real estate uses its own landing page at /real-estate).
// `type` must match one of the project types in data/inquiries.ts so the contact form pre-selects it.
// `seoTitle` stays under ~46 characters (" | Morse Media" is added) and `seoDescription` under ~155.

export type ServicePage = {
  slug: 'photography' | 'video-production' | 'real-estate' | 'monthly-content';
  name: string;
  type: string;
  intro: string;
  copy: string;
  deliverables: string[];
  steps: string[];
  faq: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  faqs?: { question: string; answer: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: 'photography',
    name: 'Brand & Commercial Photography',
    type: 'Photography',
    intro: 'Brand, headshot, product and event photography for Nashville businesses.',
    copy: 'Build an image library your website, ads and social channels can draw on for months. Every session is planned around your brand, the story you want to tell and the places the photos need to work — in your space, on location or out around the city.',
    deliverables: ['Brand, lifestyle and workplace photography', 'Headshots and team portraits', 'Product, menu and interior photography', 'Event and conference coverage', 'Edited web, social and print exports'],
    steps: ['Define the audience, usage and shot list.', 'Plan the location, light and production schedule.', 'Photograph, edit and deliver the agreed image selection.'],
    faq: 'Have a location, approximate image count and intended usage in mind? Include those in your inquiry so the shoot can be scoped accurately.',
    seoTitle: 'Nashville Brand & Headshot Photographer',
    seoDescription: 'Brand, headshot, product and event photography for Nashville businesses. Sessions from $950, team headshots from $450, events from $600.',
    h1: 'Brand & commercial photography in Nashville',
    faqs: [
      { question: 'How much does brand photography cost in Nashville?', answer: 'Brand sessions start at $950 for up to three hours on location with 25 edited images. Headshots and team portraits start at $450 for up to eight people, and event photography starts at $600 for two hours. Every quote is confirmed in writing before the shoot.' },
      { question: 'Can you photograph headshots at our office?', answer: 'Yes. A portable studio or natural-light setup comes to your office anywhere in the Nashville area, so the whole team can be photographed in about two hours with one consistent look.' },
      { question: 'How soon will we get the photos?', answer: 'Brand and event galleries are typically delivered within five business days. Event coverage includes a few selects within 24 hours so you can post while the event is still fresh.' },
      { question: 'Can we use the photos in ads and print?', answer: 'Yes. Business-use licensing for your website, social media, email, digital ads and printed marketing is included with every package.' },
    ],
  },
  {
    slug: 'video-production',
    name: 'Video Production & Editing',
    type: 'Video production',
    intro: 'Cinematic brand films, social video and event recaps with a clear story.',
    copy: 'From the first concept to the final cut, Morse Media handles planning, filming, editing, color and sound. Projects can start with new footage or with material you already have, and every piece is delivered in the shapes you need — widescreen for the website, vertical for Reels, TikTok and Shorts.',
    deliverables: ['Brand films and commercials', 'Short-form vertical video for social', 'Interview and testimonial videos', 'Event recaps and highlight reels', 'Color grading, captions and audio cleanup'],
    steps: ['Agree the message, audience, runtime and formats.', 'Build a shot plan and film or organize supplied footage.', 'Edit, review and deliver platform-ready versions.'],
    faq: 'Share your target runtime, deadline, where the video will be shown and whether filming is needed. A reference video you like is the fastest way to agree on tone.',
    seoTitle: 'Nashville Videographer & Video Production',
    seoDescription: 'Brand films, commercials, social video and event recaps from a Nashville videographer. Short-form video from $1,800, event films from $1,200.',
    h1: 'Video production & editing in Nashville',
    faqs: [
      { question: 'How much does a brand video cost in Nashville?', answer: 'Short-form videos start at $1,800 for a half-day of filming and a 30–90 second edit with vertical cuts. Full brand films and commercials start at $3,500, and event highlight films start at $1,200.' },
      { question: 'Do you deliver vertical video for Reels and TikTok?', answer: 'Yes. Projects can include vertical cuts sized for Instagram Reels, TikTok and YouTube Shorts alongside the widescreen master for your website.' },
      { question: 'Can you edit footage we already have?', answer: 'Yes. Projects can start with your existing footage. Editing, color, sound and captions are quoted on the amount of material and the final runtime.' },
      { question: 'How long does a video project take?', answer: 'Timelines are agreed in the quote — usually one to two weeks from filming to final delivery, depending on revisions.' },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate Photography & Video',
    type: 'Real estate photo & video',
    intro: 'Listing photos and walkthrough video that help Middle Tennessee homes stand out.',
    copy: 'Bright, true-to-life interiors, clean exteriors and an optional cinematic walkthrough — all captured in one visit and delivered ready for the MLS, listing sites and social media.',
    deliverables: ['Interior and exterior listing photography', 'Cinematic walkthrough video with vertical cuts', 'Twilight and detail images', 'MLS-ready and full-resolution web files'],
    steps: ['Send the property address, size and listing date.', 'Confirm the package, add-ons and shoot time.', 'Shoot in one visit; photos arrive within 48 hours.'],
    faq: 'Please include the property address or area, approximate square footage and requested shoot date. Mention if you want video so the visit can be scheduled for both.',
    seoTitle: 'Nashville Real Estate Photography & Video',
    seoDescription: 'Listing photos and walkthrough video for Nashville and Middle Tennessee agents. MLS-ready files in 48 hours. Listings from $275, photo + video from $650.',
    h1: 'Nashville listing photos that earn the showing',
  },
  {
    slug: 'monthly-content',
    name: 'Monthly Photo & Video Content',
    type: 'Monthly photo & video content',
    intro: 'A steady supply of fresh photos and short videos, shot every month.',
    copy: 'One planned shoot a month keeps your feeds, website and ads stocked with real, current images of your business — no stock photos and no scrambling for something to post. You get organized, platform-ready files to publish on your own schedule.',
    deliverables: ['A monthly half-day shoot planned around what is coming up', 'Edited photos sized for every platform', 'Short-form vertical videos', 'A shared library organized by month and theme'],
    steps: ['Review your channels, calendar and priorities.', 'Plan each shoot around launches, events and seasons.', 'Shoot, edit and deliver a fresh batch every month.'],
    faq: 'Tell us which platforms you post on, how often, and what is coming up in the next three months. A three-month minimum keeps the plan consistent.',
    seoTitle: 'Monthly Photo & Video Content in Nashville',
    seoDescription: 'A planned shoot every month for Nashville businesses: 30+ edited photos and four vertical videos for social, web and ads. From $1,400 a month.',
    h1: 'Monthly photo & video content in Nashville',
    faqs: [
      { question: 'What is included each month?', answer: 'One planned half-day shoot, 30+ edited photos and four short-form vertical videos, delivered in sizes for every platform you use.' },
      { question: 'Is there a minimum commitment?', answer: 'Yes, three months. That leaves time to plan shoots around launches, events and seasons and to build a consistent library.' },
      { question: 'Do you post the content for us?', answer: 'You get organized, platform-ready files to publish on your own schedule or hand to whoever manages your accounts.' },
      { question: 'How much does monthly content cost?', answer: 'Monthly photo and video content starts at $1,400 per month. The final price depends on the number of locations and deliverables.' },
    ],
  },
];

export function servicePath(slug: string) {
  return slug === 'real-estate' ? '/real-estate' : `/services/${slug}`;
}
