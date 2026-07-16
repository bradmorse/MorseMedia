import type { Metadata } from 'next';
import CheckoutClient from '@/components/CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Securely complete your Morse Media fine-art print order.',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutClient publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() || ''} />;
}
