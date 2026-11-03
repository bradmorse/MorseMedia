import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { stepIndex, swipeDirection } from '../lib/swipe';
import { analyticsEvents, classifyLink } from '../lib/analytics';
import { blurPlaceholders } from '../data/blur-placeholders';
import { listings } from '../data/real-estate-portfolio';
import { recentWork } from '../data/recent-work';
import { areas } from '../data/areas';

const root = process.cwd();
const read = (...parts: string[]) => readFileSync(join(root, ...parts), 'utf8');
const origin = 'https://www.morsemedia.co';

test('swipes: sideways changes photo, down closes, taps and diagonals do nothing', () => {
  assert.equal(swipeDirection(-80, 10), 'left');
  assert.equal(swipeDirection(90, -20), 'right');
  assert.equal(swipeDirection(5, 120), 'down');
  assert.equal(swipeDirection(10, 4), null); // tap
  assert.equal(swipeDirection(60, 55), null); // diagonal
  assert.equal(swipeDirection(0, -150), null); // swipe up is left to the browser
  assert.equal(stepIndex(0, -1, 24), 23);
  assert.equal(stepIndex(23, 1, 24), 0);
});

test('photo viewers support swipe, and the listing viewer has a thumbnail strip and a focus trap', () => {
  const listing = read('components', 'ListingGallery.tsx');
  for (const needle of ['useSwipe', 'listing-lightbox__thumbs', "aria-current={index === active ? 'true' : undefined}", "event.key === 'Tab'", 'loading="eager"']) {
    assert.ok(listing.includes(needle), `ListingGallery is missing ${needle}`);
  }
  assert.match(read('components', 'RecentGallery.tsx'), /recent-dialog__content" \{\.\.\.swipe\}/);
});

test('analytics: quote, email and phone links are classified; other links are ignored', () => {
  assert.equal(classifyLink('/contact?service=Real%20estate', origin)?.event, analyticsEvents.quoteClick);
  assert.equal(classifyLink('/contact?service=Real%20estate', origin)?.params.service, 'Real estate');
  assert.equal(classifyLink('/real-estate#book', origin)?.event, analyticsEvents.quoteClick);
  assert.equal(classifyLink('#book', `${origin}/real-estate`)?.event, analyticsEvents.quoteClick);
  assert.equal(classifyLink('mailto:hello@morsemedia.co?subject=Hi', origin)?.event, analyticsEvents.emailClick);
  assert.equal(classifyLink('mailto:hello@morsemedia.co?subject=Hi', origin)?.params.link_url, 'mailto:hello@morsemedia.co');
  assert.equal(classifyLink('tel:+16155550100', origin)?.event, analyticsEvents.phoneClick);
  assert.equal(classifyLink('/portfolio', origin), null);
  assert.equal(classifyLink('https://www.instagram.com/x', origin), null);
});

test('analytics: gtag.js loads lazily, enquiries and clicks are reported', () => {
  const layout = read('app', 'layout.tsx');
  assert.doesNotMatch(layout, /@next\/third-parties/);
  assert.match(layout, /googletagmanager\.com\/gtag\/js\?id=\$\{GA_ID\}`\} strategy="lazyOnload"/);
  assert.match(layout, /gtag\('config',/);
  assert.match(layout, /<AnalyticsEvents \/>/);
  const forms = read('components', 'Forms.tsx');
  assert.match(forms, /trackEvent\(analyticsEvents\.lead,/);
  assert.match(forms, /trackEvent\(analyticsEvents\.formError,/);
});

test('the hero film waits for the page to load before downloading', () => {
  const hero = read('components', 'HeroVideo.tsx');
  assert.match(hero, /document\.readyState === 'complete'/);
  assert.match(hero, /addEventListener\('load', start/);
  assert.match(hero, /requestIdleCallback/);
});

test('blurred placeholders exist for every listing, recent-work and area photo', () => {
  const needed = [
    ...listings.flatMap((listing) => listing.photos.map((photo) => photo.src)),
    ...recentWork.map((item) => item.image),
    ...areas.map((area) => area.image),
    '/images/photos/coastline-dusk.webp',
  ];
  for (const src of needed) assert.match(blurPlaceholders[src] || '', /^data:image\/webp;base64,[A-Za-z0-9+/]+=*$/, `${src} has no placeholder`);
  for (const [src, data] of Object.entries(blurPlaceholders)) {
    assert.ok(existsSync(join(root, 'public', src)), `placeholder for missing file ${src}`);
    assert.ok(data.length < 400, `${src} placeholder is too large`);
  }
});

test('accessibility: footer headings are h2s, link names include their visible text', () => {
  const chrome = read('components', 'SiteChrome.tsx');
  assert.doesNotMatch(chrome, /<h4>/);
  assert.match(chrome, /<h2>Services<\/h2>/);
  assert.doesNotMatch(read('app', 'page.tsx'), /aria-label=\{`Explore /);
  assert.doesNotMatch(read('components', 'RecentGallery.tsx'), /aria-label=\{`View /);
  assert.doesNotMatch(read('app', 'portfolio', 'page.tsx'), /linkLabel\} \(opens in a new tab\)`\}/);
  const css = read('app', 'refinements.css');
  assert.match(css, /\.site-footer__areas a, \.site-footer__legal a \{ min-height: 24px;/);
  assert.match(css, /\.about-values article span \{ color: #859087; \}/);
});
