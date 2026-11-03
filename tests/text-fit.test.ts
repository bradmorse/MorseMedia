import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { NBSP, dotList, keepTogether } from '../lib/text';

const root = process.cwd();
const css = readFileSync(join(root, 'app', 'refinements.css'), 'utf8');

test('dot lists keep each item whole and never start a line with a dot', () => {
  assert.equal(keepTogether("Thompson's Station"), `Thompson's${NBSP}Station`);
  assert.equal(dotList(['Downtown', 'The Gulch', undefined, 'SoBro']), `Downtown${NBSP}· The${NBSP}Gulch${NBSP}· SoBro`);
  assert.equal(dotList([]), '');
});

test('labels on public pages use dotList instead of joining with a bare " · "', () => {
  const skip = new Set(['shop', 'checkout', 'collections', 'photography', 'api']);
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) { if (!skip.has(name)) walk(path); }
      else if (/\.tsx$/.test(name)) files.push(path);
    }
  };
  walk(join(root, 'app'));
  for (const name of ['ListingCards.tsx', 'CaseStudyGrid.tsx', 'SiteChrome.tsx']) files.push(join(root, 'components', name));
  for (const file of files) assert.doesNotMatch(readFileSync(file, 'utf8'), /join\(' · '\)/, `${file} joins labels with a bare dot`);
});

test('titles fit: balanced headings, screen-sized photo titles on phones, capped on wide screens', () => {
  assert.match(css, /h1, h2, h3 \{ text-wrap: balance; overflow-wrap: break-word; \}/);
  assert.doesNotMatch(css, /overflow-wrap: anywhere/);
  assert.match(css, /\.hero h1, \.page-hero h1, \.collection-hero h1 \{ font-size: clamp\(32px, 10\.6vw, 64px\); \}/);
  assert.match(css, /\.page-hero h1 \{ font-size: clamp\(56px, 7\.1vw, 104px\); \}/);
});

test('home service cards get a full-width row on desktop', () => {
  assert.match(css, /@media \(min-width: 901px\) \{\s*\.studio-section \{ grid-template-columns: auto minmax\(0, 1fr\); \}\s*\.studio-services \{ grid-column: 1 \/ -1;/);
});
