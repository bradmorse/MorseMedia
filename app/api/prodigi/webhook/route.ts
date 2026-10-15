import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { assertFulfillmentReady, prodigiRequest, validCallbackToken } from '@/lib/prodigi';
import { notifyOrder } from '@/lib/fulfillment';
export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('session') || '';
    const token = url.searchParams.get('token') || '';
    if (!/^cs_(test_|live_)?[A-Za-z0-9]+$/.test(sessionId) || !validCallbackToken(sessionId, token)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    assertFulfillmentReady(session.livemode);
    if (session.payment_status !== 'paid' || session.metadata?.fulfillment_provider !== 'prodigi') return NextResponse.json({ error: 'Invalid order.' }, { status: 400 });
    // Ignore callback payload; use authenticated provider data and saved order ID.
    const id = session.metadata?.prodigi_order_id;
    if (!id) return NextResponse.json({ error: 'Order handoff pending.' }, { status: 503 });
    const order = await prodigiRequest(`orders/${encodeURIComponent(id)}`);
    if (order.merchantReference !== sessionId) throw new Error('Order reference mismatch.');
    await stripe.checkout.sessions.update(sessionId, { metadata: { prodigi_status: order.status.stage } });
    await notifyOrder(stripe, session, order);
    return NextResponse.json({ received: true });
  } catch {
    console.error('[Morse Media] Fulfillment update failed; retry required.');
    return NextResponse.json({ error: 'Unable to process update.' }, { status: 500 });
  }
}
