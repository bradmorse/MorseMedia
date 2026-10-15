import test from 'node:test';
import assert from 'node:assert/strict';
import type Stripe from 'stripe';
import { assertFulfillmentReady, callbackToken, validCallbackToken, validateMapping, prodigiRequest } from '../lib/prodigi';
import { fulfillSession } from '../lib/fulfillment';

Object.assign(process.env, { PRODIGI_MODE: 'sandbox', PRODIGI_API_KEY: 'test-key', PRODIGI_CALLBACK_SECRET: 'a'.repeat(48), RESEND_API_KEY: 'test-mail', ORDER_EMAIL_FROM: 'store@example.com', ORDER_ALERT_EMAIL: 'owner@example.com', NEXT_PUBLIC_SITE_URL: 'https://example.com' });
const mapping = { sku: 'VERIFIED-LAB-SKU', assetUrl: 'https://assets.example.com/master.jpg', sizing: 'fitPrintArea', attributes: {} };

test('live orders cannot enter sandbox; live fulfillment needs an explicit gate', () => {
  assert.throws(() => assertFulfillmentReady(true), /modes must match/);
  process.env.PRODIGI_MODE = 'live';
  assert.throws(() => assertFulfillmentReady(true), /disabled/);
  process.env.PRODIGI_MODE = 'sandbox';
});
test('preview images and unapproved sizing are rejected', () => {
  assert.throws(() => validateMapping({ ...mapping, assetUrl: 'https://example.com/images/photos/photo.webp' }), /print master/);
  assert.throws(() => validateMapping({ ...mapping, sizing: 'stretchToPrintArea' }), /sizing/);
  assert.deepEqual(validateMapping(mapping), mapping);
});
test('callback token is tied to its order and rejects tampering', () => {
  const token = callbackToken('cs_test_123');
  assert.equal(validCallbackToken('cs_test_123', token), true);
  assert.equal(validCallbackToken('cs_test_456', token), false);
  assert.equal(validCallbackToken('cs_test_123', 'bad'), false);
});
test('fulfills all pages and retries with the same provider idempotency key after a persistence failure', async () => {
  const bodies: any[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_url, options) => {
    bodies.push(JSON.parse(options?.body as string));
    return Response.json({ order: { id: 'ord_123', merchantReference: 'cs_test_123', status: { stage: 'InProgress', issues: [] }, shipments: [] } });
  };
  let failSave = true;
  const session = { id: 'cs_test_123', livemode: false, payment_status: 'paid', metadata: { storefront: 'morse-media', fulfillment_provider: 'prodigi' }, collected_information: { shipping_details: { name: 'Test', address: { line1: '1 Test St', city: 'City', country: 'US', postal_code: '12345' } } } };
  const client = { checkout: { sessions: {
    retrieve: async () => session,
    listLineItems: async function* () { for (let i = 0; i < 25; i++) yield { quantity: 1, price: { product: { metadata: { sku: `sku-${i}`, prodigi_sku: mapping.sku, print_asset: mapping.assetUrl, print_sizing: mapping.sizing, print_attributes: '{}' } } } }; },
    update: async () => { if (failSave) { failSave = false; throw new Error('storage unavailable'); } },
  } } } as unknown as Stripe;
  try {
    await assert.rejects(fulfillSession(client, session.id), /storage unavailable/);
    assert.equal(await fulfillSession(client, session.id), 'ord_123');
    assert.equal(bodies[0].items.length, 25);
    assert.equal(bodies[0].idempotencyKey, bodies[1].idempotencyKey);
    assert.equal(bodies[0].recipient.address.countryCode, 'US');
    assert.ok(bodies[0].callbackUrl.includes('token='));
    session.payment_status = 'unpaid';
    assert.equal(await fulfillSession(client, session.id), 'waiting-for-payment');
    assert.equal(bodies.length, 2);
  } finally { globalThis.fetch = originalFetch; }
});
test('provider failures propagate for retry', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response('', { status: 503 });
  try { await assert.rejects(prodigiRequest('orders', {}), /503/); }
  finally { globalThis.fetch = originalFetch; }
});
