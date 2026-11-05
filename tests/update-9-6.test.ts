import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { homeShowcase, servicesStrip } from '../data/showcase';
import { blurPlaceholders } from '../data/blur-placeholders';

const root = process.cwd();
const read = (...parts: string[]) => readFileSync(join(root, ...parts), 'utf8');
const css = read('app', 'refinements.css');

test('every visitor gets the same typeface: Inter, self-hosted through next/font', () => {
  const layout = read('app', 'layout.tsx');
  assert.match(layout, /import \{ Inter \} from 'next\/font\/google';/);
  assert.match(layout, /variable: '--font-inter'/);
  assert.match(layout, /<html lang="en-US" className=\{inter\.variable\}>/);
  assert.match(css, /body \{ font-family: var\(--font-inter\), "Helvetica Neue", Arial, sans-serif;/);
});

test('no grid-line or ring backgrounds behind page headers', () => {
  for (const file of [['app', 'refinements.css'], ['app', 'globals.css'], ['app', 'services', 'services.module.css'], ['app', 'portfolio', 'portfolio.module.css']]) {
    const text = read(...file);
    assert.doesNotMatch(text, /repeating-linear-gradient\((90|0)deg, var\(--line\)/, `${file.join('/')} still draws grid lines`);
    assert.doesNotMatch(text, /linear-gradient\(90deg, rgba\(255, 255, 255, 0\.0\d+\) 1px, transparent 1px\)/, `${file.join('/')} still draws grid lines`);
    assert.doesNotMatch(text, /\.heroOrb/, `${file.join('/')} still has the rings`);
  }
  // (The portfolio's .heroGrid is its copy/mosaic layout, not a background, so only services is checked for it.)
  assert.doesNotMatch(read('app', 'services', 'services.module.css'), /\.heroGrid/);
  assert.doesNotMatch(read('app', 'services', 'page.tsx'), /heroOrb|heroGrid/);
});

test('/real-estate and /services open with a real photo', () => {
  const realEstate = read('app', 'real-estate', 'page.tsx');
  assert.match(realEstate, /className="re-hero__media"/);
  assert.match(realEstate, /<Image src=\{heroPhoto\.src\} alt=\{heroPhoto\.alt\} fill priority/);
  const services = read('app', 'services', 'page.tsx');
  assert.match(services, /<Image className=\{styles\.heroImage\}[^>]*priority/);
  assert.match(services, /18-family-room\.webp/);
});

test('services shows real work in place of the number boxes', () => {
  const services = read('app', 'services', 'page.tsx');
  assert.doesNotMatch(services, /overviewStats|Point of contact from plan to delivery/);
  assert.match(services, /servicesStrip\.map/);
  assert.equal(servicesStrip.length, 3);
  for (const tile of servicesStrip) {
    assert.ok(existsSync(join(root, 'public', tile.src)), `${tile.src} is missing`);
    assert.ok(blurPlaceholders[tile.src], `${tile.src} has no blur placeholder`);
    assert.ok(tile.alt.length > 20, `${tile.src} needs real alt text`);
  }
});

test('the home video tile crops past the boulder, and tiles honour their crop position', () => {
  const feature = homeShowcase[0];
  assert.ok(feature?.video, 'the first Recent work tile is the video tour');
  assert.equal(feature.position, '70% 50%');
  assert.match(read('app', 'page.tsx'), /style=\{tile\.position \? \{ objectPosition: tile\.position \} : undefined\}/);
});

test('home "What Morse Media does" is on-palette and small text is at least 11 px', () => {
  assert.match(css, /\.studio-section \{ background: var\(--panel\); \}/);
  assert.match(css, /\.desktop-nav a, \.header-cta \{ font-size: 11\.5px;/);
  assert.match(css, /\.eyebrow, \.button, \.text-link,[^{]*\{ font-size: 11px; \}/);
});
