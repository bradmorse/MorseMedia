// Area pages at /areas/<slug> for Nashville and Middle Tennessee. Each one is written for the businesses
// and agents in that part of the metro, so search engines treat them as useful pages rather than copies.
// Edit freely. When you have photos taken in an area, swap them in as that page's `image`.

export type AreaFocus = { service: 'photography' | 'video-production' | 'real-estate' | 'monthly-content'; why: string };

export type Area = {
  slug: string;
  name: string; // short area name
  headline: string; // H1
  title: string; // browser/search title — keep under ~46 characters (" | Morse Media" is added)
  description: string; // search snippet — keep under ~155 characters
  towns: string[];
  neighborhoods?: boolean; // true when `towns` are Nashville neighborhoods rather than separate cities
  image: string; // from /images/photos — used as a backdrop, not a claim about where it was taken
  intro: string;
  focus: AreaFocus[];
  planningNote: string;
};

export const areas: Area[] = [
  {
    slug: 'downtown-midtown',
    name: 'Downtown & Midtown',
    headline: 'Downtown & Midtown photography & video.',
    title: 'Downtown Nashville Photographer & Videographer',
    description: 'Brand photography, headshots and short-form video for businesses, venues and artists in Downtown Nashville, The Gulch, Midtown, Music Row and Germantown.',
    towns: ['Downtown', 'The Gulch', 'SoBro', 'Midtown', 'Music Row', 'West End', 'Germantown', 'Wedgewood-Houston'],
    neighborhoods: true,
    image: '/images/photos/old-hill-window.webp',
    intro: 'Nashville’s core moves fast: hotels and restaurants opening every month, offices and healthcare companies competing for talent, and venues and artists that need to look as good online as they sound in person. Morse Media produces brand photography, headshots and short-form video for the businesses and people at the center of it all.',
    focus: [
      { service: 'video-production', why: 'Short films and vertical video for hotels, restaurants, venues and artists — made to be watched on a phone.' },
      { service: 'photography', why: 'Headshots, team portraits and workplace photography for offices, firms and healthcare groups.' },
      { service: 'monthly-content', why: 'A fresh batch of photos and video every month for restaurants and bars that post every day.' },
    ],
    planningNote: 'Downtown shoots are planned around parking, loading and crowds — early mornings are often the best time for clean exteriors and empty rooms.',
  },
  {
    slug: 'east-nashville',
    name: 'East Nashville',
    headline: 'East Nashville photography & video.',
    title: 'East Nashville Photographer & Videographer',
    description: 'Photography and short video for East Nashville shops, makers and restaurants in Five Points, Lockeland Springs and Inglewood, plus listing photos.',
    towns: ['Five Points', 'Lockeland Springs', 'Inglewood', 'Cleveland Park', 'Eastwood', 'Riverside Village', 'McFerrin Park', 'Edgefield'],
    neighborhoods: true,
    image: '/images/photos/forgotten-house.webp',
    intro: 'East Nashville runs on independents: coffee shops, makers, restaurants, salons, studios and the people behind them. These businesses have real character, and they deserve images that show it. Morse Media creates photography and short video that capture the space, the craft and the personality — plus listing photos for the neighborhood’s older homes and new builds.',
    focus: [
      { service: 'photography', why: 'Product, menu, interior and portrait photography for independent shops, studios and restaurants.' },
      { service: 'monthly-content', why: 'A manageable monthly rhythm of photos and video for small teams who would rather be running the business.' },
      { service: 'real-estate', why: 'Listing photos and walkthrough video for bungalows, renovations and new construction.' },
    ],
    planningNote: 'Small spaces photograph best when they are empty and well lit, so shoots for shops and restaurants are usually booked before opening.',
  },
  {
    slug: 'franklin-brentwood',
    name: 'Franklin & Brentwood',
    headline: 'Franklin & Brentwood photography & video.',
    title: 'Franklin & Brentwood TN Photographer',
    description: 'Real estate photography and video, headshots and brand films in Franklin, Brentwood, Cool Springs, Nolensville and across Williamson County, TN.',
    towns: ['Franklin', 'Brentwood', 'Cool Springs', 'Nolensville', 'Thompson’s Station', 'Spring Hill', 'Leiper’s Fork', 'Fairview'],
    image: '/images/photos/valley-in-color.webp',
    intro: 'Williamson County pairs some of the region’s most competitive real estate with corporate offices, medical practices and boutique businesses around downtown Franklin and Cool Springs. Morse Media helps agents list homes that stand out and helps companies show who they are, with polished photography and video made for buyers, clients and new hires.',
    focus: [
      { service: 'real-estate', why: 'Listing photography and cinematic walkthroughs for high-end homes, estates and acreage.' },
      { service: 'photography', why: 'Headshots, team portraits and workplace imagery for corporate offices and professional practices.' },
      { service: 'video-production', why: 'Brand films, recruiting videos and client testimonials that put a face on a firm.' },
    ],
    planningNote: 'Larger homes and acreage take longer to shoot well, and twilight images depend on the sky — exteriors are scheduled around the forecast.',
  },
  {
    slug: 'murfreesboro-smyrna',
    name: 'Murfreesboro & Smyrna',
    headline: 'Murfreesboro & Smyrna photography & video.',
    title: 'Murfreesboro & Smyrna TN Photographer',
    description: 'Listing and new-construction photography, event coverage and brand video in Murfreesboro, Smyrna, La Vergne and across Rutherford County, TN.',
    towns: ['Murfreesboro', 'Smyrna', 'La Vergne', 'Rockvale', 'Eagleville', 'Christiana', 'Lascassas'],
    image: '/images/photos/through-the-mountains.webp',
    intro: 'Rutherford County is one of the fastest-growing parts of Middle Tennessee, with new neighborhoods, new businesses and a busy calendar of events around Murfreesboro and MTSU. Morse Media works with builders, agents and local companies that need to keep up — listing and model-home photography, event coverage and brand imagery that looks established from day one.',
    focus: [
      { service: 'real-estate', why: 'Listing, new-construction and model-home photography for agents and builders.' },
      { service: 'photography', why: 'Event photography for conferences, campus events, fundraisers and grand openings.' },
      { service: 'video-production', why: 'Short brand videos and event recaps for growing companies and organizations.' },
    ],
    planningNote: 'New construction photographs best once landscaping and final cleaning are done — book the shoot for the week the home is truly finished.',
  },
  {
    slug: 'hendersonville-gallatin',
    name: 'Hendersonville & Gallatin',
    headline: 'Hendersonville & Gallatin photography & video.',
    title: 'Hendersonville & Gallatin TN Photographer',
    description: 'Lake home and listing photography, brand photos and video in Hendersonville, Gallatin, Goodlettsville and across Sumner County, TN.',
    towns: ['Hendersonville', 'Gallatin', 'Goodlettsville', 'White House', 'Portland', 'Millersville', 'Castalian Springs'],
    image: '/images/photos/storm-over-lake.webp',
    intro: 'Sumner County life centers on Old Hickory Lake, with waterfront homes, marinas and a strong base of family-owned businesses in Hendersonville and Gallatin. Morse Media photographs lake properties so buyers can see the water, the light and the space, and creates photography and video that help local businesses look their best.',
    focus: [
      { service: 'real-estate', why: 'Waterfront and lake-view listings, photographed to show the shoreline, the views and the space.' },
      { service: 'photography', why: 'Brand and team photography for family-owned businesses, practices and restaurants.' },
      { service: 'monthly-content', why: 'Seasonal photo and video content that keeps a local business visible all year.' },
    ],
    planningNote: 'Water and weather shape every lake shoot. Exterior work is scheduled for calm, clear conditions and moved if the forecast turns.',
  },
  {
    slug: 'mt-juliet-lebanon',
    name: 'Mt. Juliet & Lebanon',
    headline: 'Mt. Juliet & Lebanon photography & video.',
    title: 'Mt. Juliet & Lebanon TN Photographer',
    description: 'Real estate photography and video, storefront and team photos in Mt. Juliet, Hermitage, Donelson, Old Hickory and Lebanon, TN.',
    towns: ['Mt. Juliet', 'Hermitage', 'Donelson', 'Old Hickory', 'Lebanon', 'Watertown'],
    image: '/images/photos/coastline-dusk.webp',
    intro: 'East along I-40, Donelson, Hermitage, Mt. Juliet and Lebanon combine fast-growing neighborhoods with the shops, restaurants and service businesses that serve the whole eastern side of the metro, with Percy Priest and Old Hickory lakes close by. Morse Media helps agents and local businesses here look as good online as they do in person.',
    focus: [
      { service: 'real-estate', why: 'Listing photography and walkthrough video for new subdivisions, family homes and lake-area properties.' },
      { service: 'photography', why: 'Storefront, product and team photography for retail, restaurants and service businesses.' },
      { service: 'video-production', why: 'Short promotional videos and event recaps for local businesses and organizations.' },
    ],
    planningNote: 'Shoots east of the city can often be paired with nearby appointments, so mention it if you have more than one location or listing.',
  },
];

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug);
}
