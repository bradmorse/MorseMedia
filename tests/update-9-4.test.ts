import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { business } from '../data/business';
import { listingPrepPage, prepLeaveToMe, prepRooms, prepTimeline } from '../data/listing-prep';
import { listings } from '../data/real-estate-portfolio';
import sitemap from '../app/sitemap';

const read = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');

test('/real-estate shows the listing video tour right after the packages', () => {
  const page = read('app/real-estate/page.tsx');
  assert.ok(listings.some((listing) => listing.video), 'no listing has a video');
  const packages = page.indexOf('className="detail-packages"');
  const video = page.indexOf('<ListingVideo');
  const addOns = page.indexOf('re-addons__label');
  assert.ok(packages > 0 && video > packages && video < addOns, 'video should sit between the packages and the add-ons');
});

test('the Google Business Profile is linked from the site, the schema and a /review short link', () => {
  const { placeId, profileUrl, reviewUrl } = business.google;
  assert.match(placeId, /^ChIJ[\w-]{23}$/);
  assert.match(profileUrl, /^https:\/\/maps\.google\.com\/\?cid=\d+$/);
  assert.equal(reviewUrl, `https://search.google.com/local/writereview?placeid=${placeId}`);
  const config = read('next.config.ts');
  assert.ok(config.includes(`{ source: '/review', destination: '${reviewUrl}', permanent: false }`), '/review should redirect to the review link');
  assert.ok(config.includes(`{ source: '/reviews', destination: '${profileUrl}', permanent: false }`), '/reviews should redirect to the profile');
  assert.match(read('app/layout.tsx'), /sameAs: \[business\.google\.profileUrl\]/);
  assert.match(read('components/SiteChrome.tsx'), /href=\{business\.google\.profileUrl\}/);
  assert.match(read('app/contact/page.tsx'), /href="\/review"/);
});

test('the listing photo checklist is complete, linked and in the sitemap', () => {
  assert.ok(`${listingPrepPage.title} | Morse Media`.length <= 60, 'title is too long for search results');
  assert.ok(listingPrepPage.description.length >= 110 && listingPrepPage.description.length <= 160, `description is ${listingPrepPage.description.length} characters`);
  assert.equal(prepTimeline.length, 2);
  assert.ok(prepRooms.length >= 5 && prepLeaveToMe.length >= 3);
  for (const group of [...prepTimeline, ...prepRooms]) assert.ok(group.items.length >= 3, `${group.title} needs at least three items`);
  const items = [...prepTimeline, ...prepRooms].flatMap((group) => group.items);
  assert.equal(new Set(items).size, items.length, 'a checklist item is listed twice');
  assert.ok(sitemap().some((entry) => entry.url === `https://www.morsemedia.co${listingPrepPage.path}`), 'checklist missing from the sitemap');
  assert.match(read('app/real-estate/page.tsx'), /href=\{listingPrepPage\.path\}/);
  assert.match(read('components/SiteChrome.tsx'), /href="\/real-estate\/listing-photo-checklist"/);
  const page = read('app/real-estate/listing-photo-checklist/page.tsx');
  assert.match(page, /'@type': 'Article'/);
  assert.match(page, /type="checkbox"/);
  assert.match(page, /<ChecklistActions /);
  assert.match(read('app/refinements.css'), /@media print \{[^]*\.prep-page/);
});
