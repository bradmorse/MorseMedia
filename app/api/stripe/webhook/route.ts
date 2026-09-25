import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { fulfillSession } from '@/lib/fulfillment';
import { orderEmail } from '@/lib/order-email';

export const runtime = 'nodejs';
export const maxDuration = 60;

const fulfillmentEvents = new Set<string>([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
]);

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!webhookSecret) return NextResponse.json({ error: 'Webhook secret is not configured.' }, { status: 503 });

  const signature = request.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'Missing Stripe signature.' }, { status: 400 });

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    const payload = await request.text();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid webhook signature.';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (!fulfillmentEvents.has(event.type)) return NextResponse.json({ received: true });

  try {
    const session = event.data.object as Stripe.Checkout.Session;
    const fulfillment = await fulfillSession(stripe, session.id);
    return NextResponse.json({ received: true, fulfillment });
  } catch (error) {
    console.error('[Morse Media] Paid-order handoff failed; retry required.', { eventId: event.id });
    try {
      const session = await stripe.checkout.sessions.retrieve((event.data.object as Stripe.Checkout.Session).id);
      if (session.metadata?.storefront === 'morse-media') await orderEmail(stripe, session, 'handoff-failed', process.env.ORDER_ALERT_EMAIL || '', 'Morse Media paid order needs attention', `Order ${session.id} could not complete fulfillment. Check Stripe webhook delivery and Prodigi before retrying manually.`);
    } catch { console.error('[Morse Media] Order alert could not be delivered.'); }
    return NextResponse.json({ error: 'Order processing failed; please retry.' }, { status: 500 });
  }
}
