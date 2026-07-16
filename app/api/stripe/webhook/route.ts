import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';

export const runtime = 'nodejs';

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
    const expanded = await stripe.checkout.sessions.retrieve(session.id, { expand: ['line_items.data.price.product'] });
    if (expanded.payment_status !== 'paid') return NextResponse.json({ received: true, fulfillment: 'waiting-for-payment' });

    const manifest = {
      eventId: event.id,
      eventType: event.type,
      orderId: expanded.id,
      paymentStatus: expanded.payment_status,
      customer: expanded.customer_details,
      shipping: expanded.collected_information?.shipping_details || null,
      amountTotal: expanded.amount_total,
      currency: expanded.currency,
      sessionMetadata: expanded.metadata,
      items: expanded.line_items?.data.map((line) => ({
        description: line.description,
        quantity: line.quantity,
        amountTotal: line.amount_total,
        productMetadata: typeof line.price?.product === 'object' && line.price.product && 'metadata' in line.price.product
          ? line.price.product.metadata
          : {},
      })) || [],
    };

    console.info('[Morse Media fulfillment manifest]', JSON.stringify(manifest));

    const handoffUrl = process.env.PRINTIQUE_ORDER_WEBHOOK_URL?.trim();
    if (handoffUrl) {
      const response = await fetch(handoffUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'idempotency-key': expanded.id,
          ...(process.env.FULFILLMENT_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.FULFILLMENT_WEBHOOK_SECRET}` } : {}),
        },
        body: JSON.stringify(manifest),
        signal: AbortSignal.timeout(9000),
      });
      if (!response.ok) throw new Error(`Fulfillment handoff returned ${response.status}.`);
    }

    return NextResponse.json({ received: true, fulfillment: handoffUrl ? 'handed-off' : 'manifest-logged' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook processing failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
