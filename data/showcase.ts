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

/** Home page, "Recent work": the video tour large, listing photography and personal work beside it. */
export const homeShowcase: ShowcaseTile[] = [
  video ? { src: video.poster, alt: 'A barn-style home seen across a pond, the opening shot of a listing video tour', label: 'Listing video tour', meta: `${formatDuration(video.duration)} · Barn-style home`, href: `/portfolio/real-estate#${barn?.slug}`, video: true } : null,
  kitchen ? { src: kitchen.src, alt: kitchen.alt, label: 'Listing photography', meta: `${barn?.photos.length} photos · Same visit`, href: `/portfolio/real-estate#${barn?.slug}` } : null,
  mountains ? { src: mountains.image, alt: mountains.alt, label: 'Landscape photography', meta: 'Personal work', href: '/portfolio#personal-work' } : null,
].filter(tile);

/** Portfolio header mosaic: one tall landscape photograph and two listing photos. */
export const portfolioMosaic: ShowcaseTile[] = [
  storm ? { src: storm.image, alt: storm.alt, label: 'Landscape photography', meta: 'Personal work', href: '#personal-work' } : null,
  front ? { src: front.src, alt: front.alt, label: 'Listing photography', meta: 'Exterior', href: '/portfolio/real-estate' } : null,
  family ? { src: family.src, alt: family.alt, label: 'Listing photography', meta: 'Interior', href: '/portfolio/real-estate' } : null,
].filter(tile);
