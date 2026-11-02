import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { groupRanges, listingGroups, listings, previewPhotos } from '../data/real-estate-portfolio';
import sitemap from '../app/sitemap';

const publicFile = (src: string) => join(process.cwd(), 'public', src);

/** Canvas size from a WebP header (VP8X, lossy VP8 or lossless VP8L). */
function webpSize(buf: Buffer) {
  const chunk = buf.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
  if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  if (chunk === 'VP8L') { const bits = buf.readUInt32LE(21); return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }; }
  return null;
}

test('real estate listings show exteriors first, then outdoor living, then interiors', () => {
  assert.ok(listings.length > 0);
  for (const listing of listings) {
    const order = listing.photos.map((photo) => listingGroups.indexOf(photo.group));
    assert.deepEqual(order, [...order].sort((a, b) => a - b), `${listing.slug} photos are out of group order`);
    assert.equal(listing.photos[0].group, 'Exterior', `${listing.slug} must lead with an exterior`);
    assert.equal(groupRanges(listing).reduce((sum, range) => sum + range.count, 0), listing.photos.length);
  }
});

test('the barn home listing has all 24 photos in posting order', () => {
  const barn = listings.find((listing) => listing.slug === 'barn-home');
  assert.ok(barn);
  assert.equal(barn.photos.length, 24);
  assert.deepEqual(groupRanges(barn).map((r) => [r.group, r.first, r.last]), [['Exterior', 1, 7], ['Outdoor living', 8, 11], ['Interior', 12, 24]]);
  barn.photos.forEach((photo, index) => assert.match(photo.src, new RegExp(`/${String(index + 1).padStart(2, '0')}-[a-z0-9-]+\\.webp$`)));
  assert.equal(previewPhotos(barn).extras.length, 3);
});

test('every listing photo is on disk at its listed size, with alt text', () => {
  for (const listing of listings) {
    const seen = new Set<string>();
    for (const photo of listing.photos) {
      assert.ok(!seen.has(photo.src), `${photo.src} is listed twice`);
      seen.add(photo.src);
      assert.ok(existsSync(publicFile(photo.src)), `${photo.src} is missing`);
      assert.deepEqual(webpSize(readFileSync(publicFile(photo.src))), { width: photo.width, height: photo.height }, `${photo.src} size`);
      assert.ok(photo.alt.length >= 30 && photo.caption.length > 0, `${photo.src} needs alt text and a caption`);
    }
  }
});

test('the real estate portfolio is in the sitemap with its photos', () => {
  const entry = sitemap().find((item) => item.url === 'https://www.morsemedia.co/portfolio/real-estate');
  assert.ok(entry, '/portfolio/real-estate is not in the sitemap');
  assert.equal(entry.images?.length, listings.reduce((sum, listing) => sum + listing.photos.length, 0));
});

test('portfolio and real estate pages link to the listing gallery', () => {
  for (const page of ['app/portfolio/page.tsx', 'app/real-estate/page.tsx']) {
    assert.match(readFileSync(join(process.cwd(), page), 'utf8'), /<ListingCards listings=\{listings\}/, `${page} is missing the listing preview`);
  }
});
