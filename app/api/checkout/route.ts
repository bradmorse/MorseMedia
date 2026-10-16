import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { validateCheckoutItems } from '@/lib/store';
import { assertFulfillmentReady, printMapping } from '@/lib/prodigi';
import { printReadiness } from '@/lib/print-quality';
import { applySetPricing } from '@/lib/sets';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = applySetPricing(validateCheckoutItems(body?.items));
    for (const item of items) {
      const quality = printReadiness(item.id, item.size);
      if (!quality.ready) throw new Error(`${item.sku} is not print-ready: ${quality.reason}`);
    }
    const stripe = getStripe();
    assertFulfillmentReady(/^(sk|rk)_live_/.test(process.env.STRIPE_SECRET_KEY || ''));
    const mappings = new Map(items.map(item => [item.sku, printMapping(item.sku)]));
    const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || new URL(request.url).origin;
    const shippingCents = Number.parseInt(process.env.STORE_SHIPPING_RATE_CENTS || '', 10);
    const enableTax = process.env.STRIPE_AUTOMATIC_TAX === 'true';

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const mapping = mappings.get(item.sku)!;
      return {
        quantity: item.qty,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(item.unitPrice * 100),
          ...(enableTax ? { tax_behavior: 'exclusive' as const } : {}),
          product_data: {
            name: item.title,
            description: `${item.size} · ${item.finish}${item.set ? ` · ${item.set.name} set price (${item.set.percent}% off)` : ''}`,
            metadata: {
              photo_id: item.id,
              size: item.size,
              finish: item.finish,
              sku: item.sku,
              ...(item.set ? { print_set: item.set.slug, list_price: String(item.originalUnitPrice) } : {}),
              prodigi_sku: mapping.sku,
              print_asset: mapping.assetUrl,
              print_sizing: mapping.sizing,
              print_attributes: JSON.stringify(mapping.attributes),
            },
          },
        },
      };
    });

    const params: Stripe.Checkout.SessionCreateParams = {
      ui_mode: 'embedded_page',
      integration_identifier: 'morse_media_prodigi_vqmtbxra',
      mode: 'payment',
      return_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      customer_creation: 'always',
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: true },
      shipping_address_collection: { allowed_countries: ['US', 'CA'] },
      automatic_tax: { enabled: enableTax },
      allow_promotion_codes: true,
      line_items: lineItems,
      metadata: {
        storefront: 'morse-media',
        fulfillment_provider: 'prodigi',
      },
      custom_text: {
        shipping_address: {
          message: 'Your shipping address is used to produce and deliver your made-to-order artwork.',
        },
        submit: {
          message: 'Your print is made to order. Please review the selected size and finish before paying.',
        },
      },
    };

    if (Number.isFinite(shippingCents) && shippingCents >= 0) {
      params.shipping_options = [{
        shipping_rate_data: {
          type: 'fixed_amount',
          display_name: shippingCents === 0 ? 'Complimentary standard shipping' : 'Standard tracked shipping',
          fixed_amount: { amount: shippingCents, currency: 'usd' },
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 12 },
          },
        },
      }];
    }

    const session = await stripe.checkout.sessions.create(params);
    if (!session.client_secret) throw new Error('Stripe did not return a checkout client secret.');
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    // Log the reason (never customer data) so configuration problems are visible in Vercel logs.
    console.error('[Morse Media] Checkout unavailable:', error instanceof Error ? error.message : 'unknown error');
    const message = 'Checkout is temporarily unavailable for these prints. Please contact Morse Media for help.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
