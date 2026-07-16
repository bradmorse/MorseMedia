import 'server-only';
import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

function isRealKey(value: string | undefined, prefix: 'pk_' | 'sk_') {
  const key = value?.trim() || '';
  return key.startsWith(prefix) && !key.includes('REPLACE_ME') && key.length > 20;
}

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!isRealKey(secretKey, 'sk_')) throw new Error('STRIPE_SECRET_KEY is not configured.');
  if (!stripeClient) stripeClient = new Stripe(secretKey!);
  return stripeClient;
}

export function stripeIsConfigured() {
  return isRealKey(process.env.STRIPE_SECRET_KEY, 'sk_') &&
    isRealKey(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, 'pk_');
}
