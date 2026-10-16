import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import ClearCartOnMount from '@/components/ClearCartOnMount';
import { getStripe, stripeIsConfigured } from '@/lib/stripe';
import { formatCurrency } from '@/lib/format';

export const metadata: Metadata = { title: 'Order Confirmation', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function CheckoutReturnPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId || !/^cs_(test_|live_)?[A-Za-z0-9]+$/.test(sessionId) || !stripeIsConfigured()) {
    return (
      <section className="order-result content-section">
        <CircleAlert />
        <p className="eyebrow">Order status unavailable</p>
        <h1>We could not retrieve this checkout.</h1>
        <p>Return to your bag and try again. No charge is created unless Stripe confirms the payment.</p>
        <Link className="button button--solid" href="/checkout">Return to checkout</Link>
      </section>
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items'] });
    const complete = session.status === 'complete' && session.payment_status === 'paid';

    if (!complete) {
      return (
        <section className="order-result content-section">
          <CircleAlert />
          <p className="eyebrow">Payment not completed</p>
          <h1>Your order is still open.</h1>
          <p>You can safely return to checkout to finish payment.</p>
          <Link className="button button--solid" href="/checkout">Return to checkout</Link>
        </section>
      );
    }

    return (
      <section className="order-result content-section">
        <ClearCartOnMount />
        <CheckCircle2 />
        <p className="eyebrow">Order received</p>
        <h1>Thank you for supporting Morse Media.</h1>
        <p>Payment was completed for <strong>{session.customer_details?.email || 'the email used at checkout'}</strong>. Your print is now being prepared for production.</p>
        <div className="order-result__details">
          <div><span>Order reference</span><strong title={session.id}>{session.id.slice(-14).toUpperCase()}</strong></div>
          <div><span>Paid total</span><strong>{formatCurrency((session.amount_total || 0) / 100, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div>
          <div><span>Items</span><strong>{session.line_items?.data.reduce((total, item) => total + (item.quantity || 0), 0) || 0}</strong></div>
        </div>
        <p className="order-result__fineprint">Stripe emails your payment receipt now. You will receive a separate email with tracking as soon as your print ships. Questions? Reply to either email or contact Morse Media with your order reference.</p>
        <div className="order-result__actions">
          <Link className="button button--solid" href="/collections">Explore collections</Link>
          <Link className="button" href="/contact">Contact Morse Media</Link>
        </div>
      </section>
    );
  } catch {
    return (
      <section className="order-result content-section">
        <CircleAlert />
        <p className="eyebrow">Order status unavailable</p>
        <h1>We could not confirm this order.</h1>
        <p>Please don’t pay again yet — contact Morse Media and we will check your order status for you.</p>
        <Link className="button button--solid" href="/contact">Contact support</Link>
      </section>
    );
  }
}
