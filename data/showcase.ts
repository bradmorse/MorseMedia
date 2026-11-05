// Images that put the work up front: the "Recent work" band on the home page and the photo mosaic in the
// portfolio header. Everything here is real work already on the site (the barn home listing and Brad's
// landscape photography). Swap in Nashville client work as it comes in.

import { formatDuration, listings } from './real-estate-portfolio';
import { photos } from './site';

export type ShowcaseTile = {
  src: string;
  alt: string;
  label: string; // what it is, e.g. "Listing video tour"
  meta: string; // a short detail line, e.g. "1:30 · Barn-style home"
  href: string;
  video?: boolean; // shows a play badge
  position?: string; // CSS object-position when the tile crops the photo, e.g. "70% 50%"
};

const barn = listings.find((listing) => listing.slug === 'barn-home');
const barnPhoto = (number: number) => barn?.photos[number - 1];
const photo = (slug: string) => photos.find((item) => item.slug === slug);

function tile(t: ShowcaseTile | null): t is ShowcaseTile {
  return t !== null;
}

const video = barn?.video;
const kitchen = barnPhoto(17);
const front = barnPhoto(1);
const family = barnPhoto(18);
const mountains = photo('mountain-veil');
const storm = photo('storm-over-lake');
const cascade = photo('granite-cascade');
const pavilion = barnPhoto(8);

/** Home page, "Recent work": the video tour large, listing photography and personal work beside it. */
const homeTiles: (ShowcaseTile | null)[] = [
  // Update 9.6: the large tile is wider than tall on desktop, so a centred crop left a thin sliver of the boulder
  // at its left edge. 70% keeps the whole house and leaves the boulder out (phones show the full 16:9 frame).
  video ? { src: video.poster, alt: 'A barn-style home across a lawn and pond, the opening shot of a listing video tour', label: 'Listing video tour', meta: `${formatDuration(video.duration)} · Barn-style home`, href: `/portfolio/real-estate#${barn?.slug}`, video: true, position: '70% 50%' } : null,
  kitchen ? { src: kitchen.src, alt: kitchen.alt, label: 'Listing photography', meta: `${barn?.photos.length} photos · Same visit`, href: `/portfolio/real-estate#${barn?.slug}` } : null,
  mountains ? { src: mountains.image, alt: mountains.alt, label: 'Landscape photography', meta: 'Personal work', href: '/portfolio#personal-work' } : null,
];
export const homeShowcase: ShowcaseTile[] = homeTiles.filter(tile);

/** Services page, under "One crew for stills and motion.": listing photography, a video tour and landscape work.
    (Update 9.6, in place of the "4 services / 1 point of contact / 48 hrs" number boxes.) */
const stripTiles: (ShowcaseTile | null)[] = [
  pavilion ? { src: pavilion.src, alt: pavilion.alt, label: 'Real estate photography', meta: 'Outdoor living', href: `/portfolio/real-estate#${barn?.slug}` } : null,
  video ? { src: video.poster, alt: 'A barn-style home across a lawn and pond, the opening shot of a listing video tour', label: 'Listing video tour', meta: formatDuration(video.duration), href: `/portfolio/real-estate#${barn?.slug}`, video: true, position: '60% 50%' } : null,
  cascade ? { src: cascade.image, alt: cascade.alt, label: 'Landscape photography', meta: 'Personal work', href: '/portfolio#personal-work' } : null,
];
export const servicesStrip: ShowcaseTile[] = stripTiles.filter(tile);

/** Portfolio header mosaic: one tall landscape photograph and two listing photos. */
export const portfolioMosaic: ShowcaseTile[] = [
  storm ? { src: storm.image, alt: storm.alt, label: 'Landscape photography', meta: 'Personal work', href: '#personal-work' } : null,
  front ? { src: front.src, alt: front.alt, label: 'Listing photography', meta: 'Exterior', href: '/portfolio/real-estate' } : null,
  family ? { src: family.src, alt: family.alt, label: 'Listing photography', meta: 'Interior', href: '/portfolio/real-estate' } : null,
].filter(tile);
