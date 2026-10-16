// Regional landing pages at /areas/<slug>. Each one is written for the businesses in that region,
// so search engines treat them as useful pages rather than copies. Edit freely.

export type AreaFocus = { service: 'photography' | 'video-production' | 'social-media' | 'graphic-design' | 'real-estate'; why: string };

export type Area = {
  slug: string;
  name: string; // short region name
  headline: string; // H1
  title: string; // browser/search title
  towns: string[];
  image: string; // from /images/photos — used as a backdrop, not a claim about where it was taken
  intro: string;
  focus: AreaFocus[];
  planningNote: string;
};

export const areas: Area[] = [
  {
    slug: 'seacoast',
    name: 'Seacoast',
    headline: 'Seacoast photography & video.',
    title: 'Photographer & Videographer on the New Hampshire Seacoast',
    towns: ['Portsmouth', 'Rye', 'Hampton', 'Exeter', 'Stratham', 'Dover', 'Durham', 'Newmarket'],
    image: '/images/photos/coastline-dusk.webp',
    intro: 'From downtown Portsmouth restaurants to Hampton’s summer businesses and the growing companies around Dover and Durham, the Seacoast moves quickly and competes on looks. Morse Media helps local businesses keep pace with photography, short-form video and social content made for the way customers actually find them.',
    focus: [
      { service: 'social-media', why: 'Restaurants, breweries and shops that need a steady flow of fresh posts through the busy season.' },
      { service: 'photography', why: 'Menu, interior and team photography for hospitality and retail, built for web, print and social.' },
      { service: 'real-estate', why: 'Listing photography for coastal homes and condos, where light and views do the selling.' },
    ],
    planningNote: 'Summer fills up early on the coast. Booking a spring shoot gives you a full image library before the season starts.',
  },
  {
    slug: 'lakes-region',
    name: 'Lakes Region',
    headline: 'Lakes Region photography & video.',
    title: 'Lakes Region NH Photographer — Real Estate, Video & Brand',
    towns: ['Laconia', 'Meredith', 'Wolfeboro', 'Gilford', 'Moultonborough', 'Alton', 'Center Harbor', 'Plymouth'],
    image: '/images/photos/storm-over-lake.webp',
    intro: 'Around Winnipesaukee and Squam, business follows the seasons: lakefront listings, vacation rentals, marinas, camps and the restaurants that fill up every summer weekend. Morse Media produces the images and short films that help these businesses book out — and the listing photos that help lake homes sell.',
    focus: [
      { service: 'real-estate', why: 'Lakefront homes and vacation rentals, photographed to show the water, the views and the space.' },
      { service: 'video-production', why: 'Short films for resorts, marinas and camps that capture what a summer there feels like.' },
      { service: 'social-media', why: 'Seasonal content plans that keep a business visible before, during and after the summer rush.' },
    ],
    planningNote: 'Water and weather shape every lake shoot. Exterior work is scheduled for calm, clear conditions and moved if the forecast turns.',
  },
  {
    slug: 'white-mountains',
    name: 'White Mountains',
    headline: 'White Mountains photography & video.',
    title: 'White Mountains Photographer & Videographer — Tourism & Lodging',
    towns: ['North Conway', 'Jackson', 'Bartlett', 'Lincoln', 'Franconia', 'Littleton', 'Bethlehem', 'Bretton Woods', 'Gorham'],
    image: '/images/photos/through-the-mountains.webp',
    intro: 'The White Mountains sell an experience: foliage weekends, ski seasons, trailheads and the inns and restaurants in between. Morse Media brings a landscape photographer’s eye to tourism, lodging and outdoor brands — images and video that make people want to make the drive.',
    focus: [
      { service: 'video-production', why: 'Destination and lodging films that show the setting, the rooms and the experience in under a minute.' },
      { service: 'photography', why: 'Lodging, dining and adventure photography that holds up next to the scenery outside.' },
      { service: 'graphic-design', why: 'Seasonal campaigns for foliage, ski and summer — consistent across web, social and print.' },
    ],
    planningNote: 'Foliage and ski campaigns need their content months ahead. The best time to shoot next autumn’s campaign is this autumn.',
  },
  {
    slug: 'manchester-nashua-concord',
    name: 'Manchester, Nashua & Concord',
    headline: 'Southern NH brand photography.',
    title: 'Manchester, Nashua & Concord NH Brand Photographer & Video',
    towns: ['Manchester', 'Nashua', 'Concord', 'Bedford', 'Merrimack', 'Londonderry', 'Hooksett', 'Salem'],
    image: '/images/photos/old-hill-window.webp',
    intro: 'Southern New Hampshire is home to healthcare groups, tech and manufacturing companies, professional firms and a strong small-business scene. Morse Media helps them look as good as the work they do, with brand photography, recruiting and explainer video, and campaign design that stays consistent across every channel.',
    focus: [
      { service: 'photography', why: 'Team portraits, workplace and product photography for websites, recruiting and sales materials.' },
      { service: 'video-production', why: 'Interview-led brand films, recruiting videos and short explainers for products and services.' },
      { service: 'graphic-design', why: 'Campaign creative and reusable layouts that keep busy marketing teams on brand.' },
    ],
    planningNote: 'Workplace shoots are planned around your team’s schedule, so a half-day on site can cover portraits, workspace and product in one visit.',
  },
  {
    slug: 'monadnock',
    name: 'Monadnock Region',
    headline: 'Monadnock photography & content.',
    title: 'Monadnock Region NH Photographer — Keene, Peterborough & Jaffrey',
    towns: ['Keene', 'Peterborough', 'Jaffrey', 'Dublin', 'Hancock', 'Rindge', 'Swanzey', 'Walpole'],
    image: '/images/photos/granite-and-gold.webp',
    intro: 'The Monadnock Region runs on makers, farms, inns and independent shops — businesses with real stories that deserve better than phone snapshots. Morse Media creates product, place and people photography, plus social content and design, that show the craft behind the business.',
    focus: [
      { service: 'photography', why: 'Product, process and place photography for makers, farms, inns and independent retailers.' },
      { service: 'social-media', why: 'A manageable monthly rhythm of posts for small teams who would rather be running the business.' },
      { service: 'graphic-design', why: 'Labels, event posters and campaign graphics that match the quality of what you make.' },
    ],
    planningNote: 'Farm and maker shoots are timed to the work itself — harvest, production days or a market — so the images show the real thing.',
  },
];

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug);
}
