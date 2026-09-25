import { createHmac, timingSafeEqual } from 'node:crypto';

export type PrintMapping = {
  sku: string;
  assetUrl: string;
  sizing: 'fitPrintArea' | 'fillPrintArea';
  attributes: Record<string, string>;
};
export type ProdigiOrder = {
  id: string;
  merchantReference: string;
  status: { stage: string; issues: unknown[] };
  shipments: Array<{ id: string; tracking?: { number?: string; url?: string } }>;
};

export function prodigiMode() {
  const mode = process.env.PRODIGI_MODE || 'sandbox';
  if (mode !== 'sandbox' && mode !== 'live') throw new Error('Invalid Prodigi mode.');
  if (mode === 'live' && process.env.STORE_LIVE_ENABLED !== 'true') throw new Error('Live fulfillment is disabled.');
  return mode;
}

export function assertFulfillmentReady(livemode: boolean) {
  if ((prodigiMode() === 'live') !== livemode) throw new Error('Payment and fulfillment modes must match.');
  for (const key of ['PRODIGI_API_KEY', 'PRODIGI_CALLBACK_SECRET', 'RESEND_API_KEY', 'ORDER_EMAIL_FROM', 'ORDER_ALERT_EMAIL']) {
    if (!process.env[key]?.trim() || process.env[key]?.includes('REPLACE_ME')) throw new Error(`${key} is not configured.`);
  }
  if ((process.env.PRODIGI_CALLBACK_SECRET?.length || 0) < 32) throw new Error('Callback secret must have at least 32 characters.');
  const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || '');
  if (origin.protocol !== 'https:') throw new Error('Fulfillment requires a public HTTPS site URL.');
}

export function validateMapping(value: unknown): PrintMapping {
  if (!value || typeof value !== 'object') throw new Error('Print configuration is not ready for ordering.');
  const entry = value as PrintMapping;
  if (!entry.sku || !/^[A-Za-z0-9_-]+$/.test(entry.sku)) throw new Error('Invalid lab product.');
  const url = new URL(entry.assetUrl);
  if (url.protocol !== 'https:' || url.username || url.password || entry.assetUrl.length > 500) throw new Error('A secure print-ready asset URL is required.');
  if (/\/images\/photos\/|\.webp(?:\?|$)/i.test(url.pathname)) throw new Error('Use a print master, not a website preview.');
  if (!['fitPrintArea', 'fillPrintArea'].includes(entry.sizing)) throw new Error('Approve the print sizing first.');
  if (!entry.attributes || typeof entry.attributes !== 'object' || Array.isArray(entry.attributes) || Object.values(entry.attributes).some(v => typeof v !== 'string')) throw new Error('Invalid print attributes.');
  if (JSON.stringify(entry.attributes).length > 500) throw new Error('Too many print attributes.');
  return entry;
}

export function printMapping(storeSku: string) {
  const catalog = JSON.parse(process.env.PRODIGI_CATALOG_JSON || '{}');
  return validateMapping(catalog[storeSku]);
}

export function callbackToken(sessionId: string) {
  const secret = process.env.PRODIGI_CALLBACK_SECRET;
  if (!secret || secret.length < 32) throw new Error('Callback secret is not configured.');
  return createHmac('sha256', secret).update(sessionId).digest('hex');
}
export function validCallbackToken(sessionId: string, token: string) {
  if (!/^[a-f0-9]{64}$/.test(token)) return false;
  return timingSafeEqual(Buffer.from(callbackToken(sessionId), 'hex'), Buffer.from(token, 'hex'));
}

export async function prodigiRequest(path: string, body?: unknown): Promise<ProdigiOrder> {
  const key = process.env.PRODIGI_API_KEY;
  if (!key) throw new Error('Prodigi key is missing.');
  const host = prodigiMode() === 'live' ? 'api.prodigi.com' : 'api.sandbox.prodigi.com';
  const response = await fetch(`https://${host}/v4.0/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'X-API-Key': key, 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(15000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Prodigi request failed (${response.status}).`);
  const result = await response.json();
  if (!result.order?.id) throw new Error('Prodigi did not return an order.');
  return result.order as ProdigiOrder;
}
