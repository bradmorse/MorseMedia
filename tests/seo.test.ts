import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { shareImage, startingPrice } from '../lib/seo';
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
