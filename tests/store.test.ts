import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCheckoutItems } from '../lib/store';
import { storeIsOpen, availablePrintSkus } from '../lib/store-readiness';
import { collections, finishOptions, getSizeOptions, products } from '../data/site';

test('every product is complete and belongs to a real collection', () => {
  const slugs = new Set(collections.map((c) => c.slug));
  for (const p of products) {
    assert.ok(p.price > 0 && p.description && p.location && p.alt, `${p.slug} is incomplete`);
    assert.ok(slugs.has(p.collection), `${p.slug} has unknown collection`);
  }
  assert.equal(new Set(products.map((p) => p.slug)).size, products.length);
});

test('size labels list the short edge first so previews can orient correctly', () => {
  for (const o of ['portrait', 'landscape'] as const) {
    for (const s of getSizeOptions(o)) {
      const [a, b] = s.label.split(' × ').map(parseFloat);
      assert.ok(a < b, s.label);
    }
  }
});

test('checkout merges duplicate configurations and rejects bad options', () => {
  const p = products[0];
  const size = getSizeOptions(p.orientation)[0].label;
  const finish = finishOptions[0].label;
  const merged = validateCheckoutItems([{ id: p.id, qty: 2, size, finish }, { id: p.id, qty: 3, size, finish }]);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].qty, 5);
  assert.throws(() => validateCheckoutItems([{ id: p.id, qty: 1, size: '99 × 99 in', finish }]), /unavailable/);
  assert.throws(() => validateCheckoutItems([{ id: 'nope', qty: 1, size, finish }]), /no longer available/);
});

test('store stays closed (inquiry mode) when payment and fulfillment are not configured', () => {
  delete process.env.STRIPE_SECRET_KEY;
  assert.equal(storeIsOpen(), false);
  assert.deepEqual(availablePrintSkus(products[0]), []);
  process.env.STRIPE_SECRET_KEY = 'rk_test_REPLACE_ME';
  assert.equal(storeIsOpen(), false);
});
