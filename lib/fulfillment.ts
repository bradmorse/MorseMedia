import type Stripe from 'stripe';
import { assertFulfillmentReady, callbackToken, prodigiRequest, validateMapping, type ProdigiOrder } from './prodigi';
import { orderEmail } from './order-email';

export async function notifyOrder(stripe: Stripe, session: Stripe.Checkout.Session, order: ProdigiOrder) {
  if (order.status.issues?.length || order.status.stage === 'Cancelled') {
    await orderEmail(stripe, session, 'attention', process.env.ORDER_ALERT_EMAIL || '', 'Morse Media order needs attention',
      `Order ${session.id}\nProdigi ${order.id}\nStatus: ${order.status.stage}\nPlease review this order in the Prodigi dashboard. Do not place a replacement until you check the existing order.`);
  }
  for (const shipment of order.shipments || []) {
    if (!shipment.tracking?.number && !shipment.tracking?.url) continue;
    const email = session.customer_details?.email;
    if (!email) throw new Error('Customer email missing.');
    const tracking = shipment.tracking;
    const url = tracking.url && /^https:\/\//i.test(tracking.url) ? tracking.url : '';
    await orderEmail(stripe, session, `shipment-${shipment.id}`, email, 'Your Morse Media shipment is on its way',
      `Your order has a shipment on its way.\nOrder: ${session.id}\nTracking number: ${tracking.number || 'See tracking link'}\n${url}\nItems may arrive in separate packages. Thank you for supporting Morse Media.`);
  }
}

export async function fulfillSession(stripe: Stripe, sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.metadata?.storefront !== 'morse-media') return 'ignored';
  if (session.payment_status !== 'paid') return 'waiting-for-payment';
  assertFulfillmentReady(session.livemode);
  if (session.metadata?.fulfillment_provider !== 'prodigi') throw new Error('Legacy order needs manual review.');
  let order: ProdigiOrder;
  if (session.metadata.prodigi_order_id) {
    order = await prodigiRequest(`orders/${encodeURIComponent(session.metadata.prodigi_order_id)}`);
  } else {
    const shipping = session.collected_information?.shipping_details;
    const address = shipping?.address;
    if (!shipping?.name || !address?.line1 || !address.city || !address.country || !address.postal_code) throw new Error('Shipping address incomplete.');
    const items = [];
    // Iterate every page; the embedded line_items expansion only includes one page.
    for await (const line of stripe.checkout.sessions.listLineItems(sessionId, { limit: 100, expand: ['data.price.product'] })) {
      const product = line.price?.product;
      if (!product || typeof product === 'string' || product.deleted) throw new Error('Product metadata missing.');
      const m = product.metadata;
      const mapping = validateMapping({ sku: m.prodigi_sku, assetUrl: m.print_asset, sizing: m.print_sizing, attributes: JSON.parse(m.print_attributes || '{}') });
      if (!line.quantity || line.quantity < 1) throw new Error('Invalid print quantity.');
      items.push({ merchantReference: m.sku, sku: mapping.sku, copies: line.quantity, sizing: mapping.sizing, attributes: mapping.attributes, assets: [{ printArea: 'default', url: mapping.assetUrl }] });
    }
    if (!items.length) throw new Error('Order has no print items.');
    const callback = new URL('/api/prodigi/webhook', process.env.NEXT_PUBLIC_SITE_URL);
    callback.searchParams.set('session', sessionId);
    callback.searchParams.set('token', callbackToken(sessionId));
    order = await prodigiRequest('orders', {
      merchantReference: sessionId,
      idempotencyKey: `morse-media-${sessionId}`,
      callbackUrl: callback.toString(),
      shippingMethod: 'Standard',
      recipient: { name: shipping.name, email: session.customer_details?.email, phoneNumber: session.customer_details?.phone, address: {
        line1: address.line1, line2: address.line2 || undefined, townOrCity: address.city, postalOrZipCode: address.postal_code, countryCode: address.country, stateOrCounty: address.state || undefined,
      } },
      items,
    });
    if (order.merchantReference !== sessionId) throw new Error('Fulfillment order reference mismatch.');
    await stripe.checkout.sessions.update(sessionId, { metadata: { prodigi_order_id: order.id } });
  }
  await notifyOrder(stripe, session, order);
  return order.id;
}
