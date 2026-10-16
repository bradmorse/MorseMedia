import type { Metadata } from 'next';
import { assertFulfillmentReady } from '@/lib/prodigi';
import CheckoutClient from '@/components/CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Securely complete your Morse Media fine-art print order.',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  let ready = false;
  try { assertFulfillmentReady(/^(sk|rk)_live_/.test(process.env.STRIPE_SECRET_KEY || '')); ready = true; } catch {}
  return <CheckoutClient publishableKey={ready ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() || '' : ''} />;
}
