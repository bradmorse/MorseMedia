import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { servicePages } from '../data/services';
import { lowestStartingAt, servicePackages } from '../data/proof';
import { areas } from '../data/areas';
import { business, areaServedSchema } from '../data/business';
import { projectTypes } from '../data/inquiries';
import { videoEmbed } from '../lib/video';

const root = process.cwd();

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(name) ? [path] : [];
  });
}

test('the business is based in Nashville, Tennessee', () => {
  assert.equal(business.city, 'Nashville');
  assert.equal(business.stateCode, 'TN');
  const served = areaServedSchema().map((entry) => entry.name);
  assert.ok(served.includes('Nashville, TN'));
  assert.ok(served.includes('Middle Tennessee'));
});

test('graphic design is gone from services, packages and the contact form', () => {
  const slugs = servicePages.map((s) => s.slug as string);
  assert.ok(!slugs.includes('graphic-design'));
  assert.deepEqual(slugs.sort(), ['monthly-content', 'photography', 'real-estate', 'video-production']);
  for (const pkg of servicePackages) assert.ok(!/design/i.test(`${pkg.name} ${pkg.kicker} ${pkg.service} ${pkg.inquiry}`), pkg.name);
  assert.ok(!projectTypes.some((type) => /design/i.test(type)));
});

test('every service type and package inquiry pre-selects a real contact form option', () => {
  const types = new Set(projectTypes);
  for (const service of servicePages) assert.ok(types.has(service.type), `${service.slug}: ${service.type}`);
  for (const pkg of servicePackages) {
    assert.ok(types.has(pkg.inquiry), `${pkg.name}: ${pkg.inquiry}`);
    assert.ok(servicePages.some((s) => s.slug === pkg.service), `${pkg.name}: ${pkg.service}`);
  }
});

test('every service has a published starting price', () => {
  for (const service of servicePages) assert.match(lowestStartingAt(service.slug) || '', /^From \$/, service.slug);
  assert.equal(lowestStartingAt('photography'), 'From $450');
});

test('no page still says the studio is in New Hampshire or offers design', () => {
  const offenders: string[] = [];
  for (const file of [...sourceFiles(join(root, 'app')), ...sourceFiles(join(root, 'components')), ...sourceFiles(join(root, 'lib'))]) {
    if (file.endsWith('ContactFormFromQuery.tsx')) continue; // maps old links (including "Graphic design") to current types
    const text = readFileSync(file, 'utf8');
    if (/Based in New Hampshire|New Hampshire business|New Hampshire creative|graphic design|addressRegion: 'NH'/i.test(text)) offenders.push(file.replace(root, ''));
  }
  assert.deepEqual(offenders, []);
});

test('area pages cover Middle Tennessee', () => {
  assert.ok(areas.length >= 5);
  const text = areas.map((area) => `${area.name} ${area.towns.join(' ')}`).join(' ');
  for (const place of ['Franklin', 'Brentwood', 'Murfreesboro', 'Hendersonville', 'Mt. Juliet', 'East Nashville']) assert.ok(text.includes(place), place);
  assert.ok(!/Portsmouth|Laconia|Keene|Concord/.test(text));
});

test('showreel links become privacy-friendly embeds', () => {
  assert.equal(videoEmbed('https://www.youtube.com/watch?v=abc123XYZ'), 'https://www.youtube-nocookie.com/embed/abc123XYZ');
  assert.equal(videoEmbed('https://youtu.be/abc123XYZ'), 'https://www.youtube-nocookie.com/embed/abc123XYZ');
  assert.equal(videoEmbed('https://www.youtube.com/shorts/abc123XYZ'), 'https://www.youtube-nocookie.com/embed/abc123XYZ');
  assert.equal(videoEmbed('https://vimeo.com/123456789'), 'https://player.vimeo.com/video/123456789');
  assert.equal(videoEmbed('https://example.com/video'), null);
  assert.equal(videoEmbed(''), null);
});

test('gift certificates are retired', () => {
  assert.ok(!projectTypes.some((type) => /gift/i.test(type)));
  assert.ok(!existsSync(join(root, 'app', 'gift-cards')));
  const config = readFileSync(join(root, 'next.config.ts'), 'utf8');
  assert.match(config, /source: '\/gift-cards', destination: '\/shop'/);
});

test('search titles and descriptions stay within snippet limits', () => {
  // " | Morse Media" (14 characters) is appended to every title.
  for (const page of servicePages) {
    assert.ok(page.seoTitle.length <= 46, `${page.slug} title: ${page.seoTitle.length}`);
    assert.ok(page.seoDescription.length >= 110 && page.seoDescription.length <= 160, `${page.slug} description: ${page.seoDescription.length}`);
    assert.match(page.seoTitle, /Nashville/);
  }
  for (const area of areas) {
    assert.ok(area.title.length <= 46, `${area.slug} title: ${area.title.length}`);
    assert.ok(area.description.length >= 110 && area.description.length <= 160, `${area.slug} description: ${area.description.length}`);
  }
});
