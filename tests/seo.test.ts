import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { brandShareAlt, brandShareImage, pageMetadata, shareImage, startingPrice } from '../lib/seo';
import { photos } from '../data/site';
import { recentWork } from '../data/recent-work';
import { servicePackages } from '../data/proof';

test('every photo has a 1200 x 630 JPG share image on disk', () => {
  for (const photo of [...photos, ...recentWork]) {
    const og = shareImage(photo.image);
    assert.match(og.url, /^\/images\/og\/[a-z0-9-]+\.jpg$/, `${photo.slug} share image path`);
    assert.ok(existsSync(join(process.cwd(), 'public', og.url)), `${og.url} is missing`);
    assert.equal(og.width, 1200);
    assert.equal(og.height, 630);
  }
});

test('starting prices parse from the published labels', () => {
  assert.equal(startingPrice('From $1,400 / month'), 1400);
  assert.equal(startingPrice('From $325'), 325);
  assert.equal(startingPrice(undefined), undefined);
  for (const pkg of servicePackages) {
    if (pkg.startingAt) assert.ok((startingPrice(pkg.startingAt) || 0) > 0, `${pkg.name} price label is not parseable`);
  }
});

/** Reads width and height from a JPEG's start-of-frame marker. */
function jpegSize(buf: Buffer) {
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) { i += 1; continue; }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

test('shared links preview the Morse Media logo card', () => {
  const file = join(process.cwd(), 'public', brandShareImage);
  assert.ok(existsSync(file), `${brandShareImage} is missing`);
  assert.deepEqual(jpegSize(readFileSync(file)), { width: 1200, height: 630 });
  const og = pageMetadata('Test', 'Test description', '/').openGraph as { images: { url: string; alt: string }[] };
  assert.equal(og.images[0].url, brandShareImage);
  assert.equal(og.images[0].alt, brandShareAlt);
  // Home and business pages use the logo card rather than a landscape photo.
  const pages = ['app/layout.tsx', 'app/page.tsx', 'app/services/page.tsx', 'app/services/[slug]/page.tsx', 'app/real-estate/page.tsx', 'app/contact/page.tsx', 'app/about/page.tsx', 'app/portfolio/page.tsx', 'app/areas/page.tsx', 'app/areas/[slug]/page.tsx'];
  for (const page of pages) {
    const source = readFileSync(join(process.cwd(), page), 'utf8');
    assert.doesNotMatch(source, /(pageMetadata|shareImage)\([^;]*\/images\//, `${page} sets its own preview image`);
  }
});
