import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { groupRanges, listingMeta, listings, previewPhotos } from '../data/real-estate-portfolio';
import { blurPlaceholders } from '../data/blur-placeholders';
import sitemap from '../app/sitemap';

const read = (...parts: string[]) => readFileSync(join(process.cwd(), ...parts), 'utf8');

test('update 9.7: the farmhouse listing follows the barn home', () => {
  assert.deepEqual(listings.map((listing) => listing.slug), ['barn-home', 'farmhouse-barn']);
  // The barn home stays first: it has the video tour and interiors, and /real-estate uses its front photo in the header.
  assert.equal(listings[0].photos[0].src, '/images/real-estate/barn-home/01-exterior-front.webp');
});

test('update 9.7: the farmhouse is an exteriors-only shoot of 9 photos, numbered in posting order', () => {
  const farmhouse = listings.find((listing) => listing.slug === 'farmhouse-barn');
  assert.ok(farmhouse);
  assert.equal(farmhouse.title, 'Farmhouse with an attached barn');
  assert.equal(farmhouse.location, undefined, 'no town or address without permission');
  assert.equal(farmhouse.video, undefined);
  assert.equal(farmhouse.photos.length, 9);
  assert.deepEqual(groupRanges(farmhouse).map((r) => [r.group, r.first, r.last]), [['Exterior', 1, 9]]);
  farmhouse.photos.forEach((photo, index) => {
    assert.match(photo.src, new RegExp(`^/images/real-estate/farmhouse-barn/${String(index + 1).padStart(2, '0')}-exterior-[a-z0-9-]+\\.webp$`));
    assert.ok(blurPlaceholders[photo.src], `${photo.src} has no blur placeholder`);
  });
  assert.equal(farmhouse.photos[0].src, '/images/real-estate/farmhouse-barn/01-exterior-front.webp', 'leads with the full front of the property');
  assert.match(farmhouse.summary, /exteriors-only/);
  assert.deepEqual(listingMeta(farmhouse).filter(Boolean), ['9 photos']);
  assert.deepEqual(previewPhotos(farmhouse).extras.map((photo) => photo.caption), ['Front porch', 'Shingled wing', 'House to barn']);
});

test('update 9.7: the sitemap lists all 33 listing photos', () => {
  const entry = sitemap().find((item) => item.url === 'https://www.morsemedia.co/portfolio/real-estate');
  assert.equal(entry?.images?.length, 33);
  assert.ok(entry?.images?.includes('https://www.morsemedia.co/images/real-estate/farmhouse-barn/01-exterior-front.webp'));
});

test('update 9.7: preview card copy fits more than one listing', () => {
  assert.match(read('app', 'real-estate', 'page.tsx'), /heading="See real listing shoots\." intro="[^"]*Open a listing to see all of the photos\."/);
  assert.match(read('app', 'portfolio', 'page.tsx'), /intro="Listing shoots, shown in the order an agent would post them/);
});
