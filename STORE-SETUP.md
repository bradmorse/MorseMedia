# Morse Media automated print store

## Current status

Prepared on `feat/prodigi-fulfillment`, based on GitHub main commit
`4be7c9abf787a4f9eb60607319d763b83c292c1e`. Not live and not connected to a lab yet.
The storefront, photographs, and service prices are unchanged. Checkout now refuses
unconfigured fulfillment instead of taking payment and only logging the order.
Do not merge this branch until preview configuration and a sandbox purchase pass.

## What is implemented

- Existing embedded Stripe checkout; original server-calculated prices.
- Approved per-print catalog mapping, snapshotted into Stripe product metadata.
- Paid webhook handoff to Prodigi, including delayed payment success.
- All line-item pages included; unpaid and unrelated sessions are ignored.
- Prodigi's persistent idempotency key uses the Stripe session ID. Retrying after a
  timeout or failed Stripe metadata update will retrieve the same provider order.
- Stripe session metadata stores the lab order ID and most recent callback status.
- Per-order HMAC callback token; callbacks re-fetch authenticated Prodigi data rather
  than trusting a posted shipping address, email, tracking link, or order ID.
- Shipment emails and owner alerts through Resend. Test emails go only to the owner.
- Successful email markers persist in Stripe metadata; Resend idempotency protects
  concurrent sends for its 24-hour window. There is no absolute exactly-once email
  guarantee if email succeeds and metadata persistence fails for more than 24 hours.
- No customer addresses or print-master URLs written to application logs.

## Your first steps

1. Create an account at https://dashboard.prodigi.com and add your business details
   and billing method yourself. Do not send card details or API keys in chat.
2. Reconnect the Vercel app with permission for the **morse-media** workspace.
   Existing project: https://vercel.com/morse-media/morse-media
   The current connection returned 403 for that workspace.
3. Supply full-resolution originals or print-ready exports for the photographs to
   sell. Existing website WebP previews are not print masters. We need stable,
   HTTPS asset hosting accessible to Prodigi; keep master files out of this public
   repository. Avoid expiring URLs that may expire before production/retries.
4. Create a Resend account at https://resend.com and verify a sending domain.
   Verification requires DNS changes at your domain provider. Choose the owner
   email address for fulfillment alerts. No emails have been sent by this work.
5. Approve initial products, sizes, paper/frame choices and samples after supplier
   quotes are checked against existing retail prices and shipping charges.

## Product mapping

Run `npm run catalog:checklist` for every store SKU needing a verified lab SKU,
master file and crop decision. Do not assume that a matching label guarantees a
matching lab product. Verify each SKU, attributes, destination support and required
pixel dimensions using the Prodigi catalog/product API and quotes.

Set server-only `PRODIGI_CATALOG_JSON` in Vercel Preview. It is a JSON object keyed
by the exact store SKU with values in this format (illustrative, not real products):

```json
{
  "EXACT-STORE-SKU": {
    "sku": "VERIFIED-PRODIGI-SKU",
    "assetUrl": "https://your-asset-host.example/print-master.jpg",
    "sizing": "fitPrintArea",
    "attributes": {}
  }
}
```

`fitPrintArea` preserves the whole image but may create white borders;
`fillPrintArea` can crop. Approve each crop before using fill. Never stretch.
Unmapped options remain visible but cannot be purchased in this draft. Hide or
label unavailable options before launch once the initial assortment is chosen.
If this catalog outgrows environment-variable size limits, move it to private
versioned storage before expanding. Each asset URL must fit Stripe's 500-character
metadata limit. Metadata access should be limited to staff who handle orders.

## Print masters and the readiness guard

A size is only offered for sale when its print master has at least 150 pixels per inch
at that size (`PRINT_MIN_PPI` changes the floor). This applies even if the size is mapped
in `PRODIGI_CATALOG_JSON`, and checkout re-checks it.

1. Export full-resolution masters from your originals into one folder, each named after
   its photo (e.g. `forest-current.jpg`). JPEG, PNG and TIFF are supported.
2. Run `npm run masters:check -- "C:\path\to\masters"`. It lists every size with its
   ppi and prints lines to paste into `data/print-masters.ts`.
3. `npm run catalog:checklist` now shows `printReady`, `masterPpi` and `pixelsNeeded`
   for every store SKU.

Rough guide at 150 ppi: 8 × 10 needs 1200 × 1500 px; 18 × 24 needs 2700 × 3600 px;
24 × 36 needs 3600 × 5400 px.

## Curated sets

Sets live in `data/sets.ts`. When every piece of a set is in the bag (any size or
finish), each of those prints is discounted by `SET_DISCOUNT_PERCENT` (10%), rounded
to whole dollars. Checkout calculates this on the server; the bag only displays it.
Stripe line items carry `print_set` and `list_price` metadata for set orders.

## Promotion codes

Checkout accepts Stripe promotion codes (Products → Coupons), for example for a
one-off discount for a client. Gift certificates were retired on October 28, 2026;
`/gift-cards` now redirects to the shop.

## Preview setup

Use `.env.example` as the complete settings checklist. Add values to Vercel's
Preview environment only, then redeploy the branch:

- `NEXT_PUBLIC_SITE_URL`: stable HTTPS preview URL reachable by both providers.
  Provider callbacks cannot pass Vercel authentication; configure an appropriate
  accessible test deployment without exposing administrative pages or secrets.
- `STRIPE_SECRET_KEY`: preferably a restricted test key. Allow the API operations
  used here: create/retrieve/update Checkout Sessions, read their line items and
  products, plus permissions required by inline prices/customer creation.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: matching account's test publishable key.
- `STRIPE_WEBHOOK_SECRET`: preview endpoint's signing secret.
- `PRODIGI_MODE=sandbox`, `STORE_LIVE_ENABLED=false`, `PRODIGI_API_KEY`: sandbox key.
- `PRODIGI_CALLBACK_SECRET`: random secret, at least 32 characters.
- `PRODIGI_CATALOG_JSON`: approved mappings with real masters.
- `RESEND_API_KEY`, `ORDER_EMAIL_FROM`: verified sender; `ORDER_ALERT_EMAIL`: owner.
- `STORE_SHIPPING_RATE_CENTS`: confirm the existing flat shipping charge against
  real quotes before launch. This integration uses Prodigi Standard shipping;
  it does not implement live shipping quotes at checkout.
- `STRIPE_AUTOMATIC_TAX=false` until tax registrations and configuration are verified.

In Stripe, register `https://YOUR-PREVIEW/api/stripe/webhook` for
`checkout.session.completed` and `checkout.session.async_payment_succeeded`.
Prodigi gets its signed callback URL with each order; no global callback needed.
Enable customer payment receipts in Stripe. Shipment messages are separate.
Never reuse a production Stripe webhook signing secret for Preview.

## Verification and launch gates

Local:

```sh
npm ci
npm test
npm run verify
```

Then complete an actual sandbox checkout, inspect the Prodigi sandbox order,
replay the Stripe paid event and confirm only one lab order exists. Test a cart
with multiple configurations, delayed payment, callback retries, a lab issue,
partial shipments and email delivery. Confirm print-master resolution, crop,
shipping countries, costs and sample quality. Verify owner alerts are delivered.

The current local tests use mocked provider APIs. They do not prove account
permissions, deliverability, print quality, deployed webhook reachability or live
payment functionality. A completed local build is not permission to go live.

Keep live checkout disabled until these pass. Then configure matching live keys,
production webhooks and `PRODIGI_MODE=live` with `STORE_LIVE_ENABLED=true` in
Production, merge and deploy. Live Prodigi orders charge the business billing
method independently of when Stripe pays out customer funds. Refunds do not
cancel prints automatically; check the provider's cancellation window first.

## Operations and limitations

Stripe retries failed webhook deliveries. The handler returns an error when the
lab handoff fails and attempts an owner alert. Replay the original Stripe event
once a configuration issue is fixed; do not manually recreate the lab order.
Legacy sessions lacking Prodigi mapping are held for manual review, not printed
using guessed SKUs. Review any open legacy sessions before launch.

Callbacks update status and send tracking when available. There is not yet a
scheduled reconciliation job or independent durable queue. If a callback is
missed, review the order in Prodigi and replay the original Stripe event to fetch
current status and retry notifications. Add reconciliation before larger-volume
operation. No inventory is purchased, customer is charged, sample ordered,
production deployment changed, or subscription purchased by this draft.

## References

- https://www.prodigi.com/print-api/docs/reference/
- https://docs.stripe.com/payments/checkout/fulfill-orders
- https://resend.com/docs/api-reference/emails/send-email
