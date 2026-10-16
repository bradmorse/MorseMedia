import test from 'node:test';
import assert from 'node:assert/strict';
import { getSizeOptions, products } from '../data/site';
import { printSets, SET_DISCOUNT_PERCENT } from '../data/sets';
import { areas } from '../data/areas';
import { caseStudies } from '../data/case-studies';
import { servicePages } from '../data/services';
import { applySetPricing, incompleteSets, setForProduct } from '../lib/sets';
import { pixelsNeeded, printPpi, printReadiness, sizeInches } from '../lib/print-quality';

test('print sizes are read from the shop labels', () => {
  assert.deepEqual(sizeInches('18 × 24 in'), [18, 24]);
  assert.deepEqual(sizeInches('8 x 12 in'), [8, 12]);
  assert.equal(sizeInches('Custom'), null);
});

test('print readiness blocks sizes the master cannot hold sharply', () => {
  const web = { width: 1638, height: 2048 }; // a website copy
  const camera = { width: 6336, height: 9504 }; // a 60 MP original
  assert.equal(printPpi(web, '8 × 10 in'), 204);
  assert.equal(printPpi(web, '24 × 32 in'), 64);
  const masters = { 'forest-current': web, 'granite-run': camera };
  assert.equal(printReadiness('forest-current', '8 × 10 in', masters).ready, true);
  assert.equal(printReadiness('forest-current', '12 × 16 in', masters).ready, false);
  assert.equal(printReadiness('granite-run', '24 × 32 in', masters).ready, true);
  assert.equal(printReadiness('dry-falls', '8 × 10 in', masters).ready, false, 'no master means not for sale');
  assert.deepEqual(pixelsNeeded('24 × 36 in'), [3600, 5400]);
});

test('every size label in the shop can be measured', () => {
  for (const orientation of ['portrait', 'landscape'] as const) {
    for (const size of getSizeOptions(orientation)) assert.ok(sizeInches(size.label), size.label);
  }
});

test('print sets use real prints and each print is in at most one set', () => {
  const slugs = new Set(products.map((p) => p.slug));
  const seen = new Set<string>();
  for (const set of printSets) {
    assert.ok(set.pieces.length >= 2, `${set.slug} needs at least two pieces`);
    for (const piece of set.pieces) {
      assert.ok(slugs.has(piece), `${set.slug}: unknown print ${piece}`);
      assert.ok(!seen.has(piece), `${piece} is in more than one set`);
      seen.add(piece);
    }
  }
});

test('the set discount applies only when the whole set is in the order', () => {
  const set = printSets[0];
  const lines = set.pieces.map((id, i) => ({ id, unitPrice: 95, qty: 1, key: String(i) }));
  const partial = applySetPricing(lines.slice(0, -1));
  assert.ok(partial.every((line) => line.unitPrice === 95 && !line.set));
  const full = applySetPricing([...lines, { id: 'quiet-watch', unitPrice: 95, qty: 1, key: 'x' }]);
  const expected = Math.round(95 * (100 - SET_DISCOUNT_PERCENT) / 100);
  for (const line of full) {
    if (set.pieces.includes(line.id)) { assert.equal(line.unitPrice, expected); assert.equal(line.originalUnitPrice, 95); }
    else assert.equal(line.unitPrice, 95);
  }
  assert.equal(setForProduct(set.pieces[0])?.slug, set.slug);
  assert.deepEqual(incompleteSets([set.pieces[0]]).map((entry) => entry.set.slug), [set.slug]);
  assert.deepEqual(incompleteSets(set.pieces), []);
});

test('area pages and case studies point at real services', () => {
  const services = new Set(servicePages.map((s) => s.slug));
  assert.equal(new Set(areas.map((a) => a.slug)).size, areas.length);
  for (const area of areas) {
    assert.ok(area.towns.length >= 4 && area.intro.length > 120, `${area.slug} is too thin`);
    for (const focus of area.focus) assert.ok(services.has(focus.service), `${area.slug}: ${focus.service}`);
  }
  for (const study of caseStudies) assert.ok(services.has(study.service), `${study.slug}: ${study.service}`);
});
