'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeft, CheckCircle2, LoaderCircle, LockKeyhole, PackageCheck, ShoppingBag } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { products } from '@/data/site';
import { formatCurrency } from '@/lib/format';
import { useCart } from './CartProvider';

export default function CheckoutClient({ publishableKey }: { publishableKey: string }) {
  const { items, subtotal, hydrated } = useCart();
  const stripeReady = publishableKey.startsWith('pk_') && !publishableKey.includes('REPLACE_ME') && publishableKey.length > 20;
  const stripePromise = useMemo(() => stripeReady ? loadStripe(publishableKey) : null, [publishableKey, stripeReady]);
  const itemCount = useMemo(() => items.reduce((total, item) => total + item.qty, 0), [items]);

  const checkoutItems = useMemo(() => items.map(({ id, qty, size, finish }) => ({ id, qty, size, finish })), [items]);

  const fetchClientSecret = useCallback(async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ items: checkoutItems }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.clientSecret) throw new Error(data.error || 'Unable to load secure checkout.');
    return data.clientSecret as string;
  }, [checkoutItems]);

  if (!hydrated) {
    return (
      <section className="checkout-empty content-section" aria-live="polite">
        <LoaderCircle className="spin" />
        <p className="eyebrow">Loading your bag</p>
        <h1>Preparing secure checkout.</h1>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="checkout-empty content-section">
        <ShoppingBag />
        <p className="eyebrow">Your bag</p>
        <h1>There is nothing to check out yet.</h1>
        <p>Choose a photograph, size and finish before continuing to payment.</p>
        <Link className="button button--solid" href="/shop">Browse all prints</Link>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-page__heading">
        <Link className="back-link" href="/shop"><ArrowLeft /> Continue shopping</Link>
        <p className="eyebrow">Secure checkout</p>
        <h1>Complete your order.</h1>
        <p>Payment and shipping details stay inside the Morse Media checkout experience.</p>
      </div>

      <div className="checkout-layout">
        <aside className="checkout-summary">
          <div className="checkout-summary__header">
            <div><p className="eyebrow">Order summary</p><h2>{itemCount} print{itemCount === 1 ? '' : 's'}</h2></div>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="checkout-summary__items">
            {items.map((item) => {
              const product = products.find((entry) => entry.id === item.id);
              if (!product) return null;
              return (
                <div className="checkout-summary__item" key={item.key}>
                  <div className="checkout-summary__image"><Image src={product.image} alt="" fill sizes="88px" /></div>
                  <div><strong>{product.title}</strong><span>{item.size} · {item.finish}</span><small>Quantity {item.qty}</small></div>
                  <b>{formatCurrency(item.unitPrice * item.qty)}</b>
                </div>
              );
            })}
          </div>
          <div className="checkout-summary__subtotal"><span>Artwork subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
          <p className="checkout-summary__note">Shipping and applicable tax are calculated in the secure payment form.</p>
          <div className="checkout-assurances">
            <span><LockKeyhole /> Encrypted Stripe payment</span>
            <span><PackageCheck /> Made-to-order fulfillment workflow</span>
            <span><CheckCircle2 /> Server-verified product pricing</span>
          </div>
        </aside>

        <div className="checkout-payment">
          {!stripeReady || !stripePromise ? (
            <div className="checkout-setup-card">
              <p className="eyebrow">Print inquiries</p><h2>Let’s find the right print for you.</h2><p>Online payment is not available yet. Contact Morse Media to confirm your selected photograph, size and finish.</p><Link className="button" href="/contact?service=Print%20or%20order%20question">Ask about your prints</Link>
            </div>
          ) : (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </div>
    </section>
  );
}
