import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { homeShowcase, portfolioMosaic } from '../data/showcase';

const read = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');

test('the home page and portfolio header show real work, with every image on disk and described', () => {
  assert.equal(homeShowcase.length, 3);
  assert.equal(portfolioMosaic.length, 3);
  assert.ok(homeShowcase[0].video, 'the first home tile should be the video tour');
  for (const tile of [...homeShowcase, ...portfolioMosaic]) {
    assert.ok(existsSync(join(process.cwd(), 'public', tile.src)), `${tile.src} is missing`);
    assert.ok(tile.alt.length >= 30, `${tile.src} needs alt text`);
    assert.ok(Boolean(tile.label && tile.meta) && (tile.href.startsWith('/') || tile.href.startsWith('#')), `${tile.src} needs a label, detail and link`);
  }
  assert.match(read('app/page.tsx'), /className="content-section home-work"/);
});

test('the portfolio leads with images: header mosaic, then the listing, then personal photography', () => {
  const page = read('app/portfolio/page.tsx');
  const mosaic = page.indexOf('styles.heroMosaic');
  const listing = page.indexOf('<ListingCards listings={listings}');
  const personal = page.indexOf('id="personal-work"');
  const clients = page.indexOf('styles.caseStudyList');
  assert.ok(mosaic > 0 && mosaic < listing && listing < personal && personal < clients, 'portfolio sections are out of order');
  assert.doesNotMatch(page, /heroGlow/);
});

test('page titles use sentence case and scale with short screens', () => {
  const css = read('app/refinements.css');
  assert.match(css, /\.hero h1, \.page-hero h1, \.collection-hero h1, \.product-detail h1 \{ text-transform: none;/);
  assert.match(css, /\.hero h1 \{ font-size: min\(clamp\(56px, 7\.1vw, 112px\), 12\.5svh\); \}/);
});
