# Morse Media — Refined Next.js Store

A responsive Next.js + React photography portfolio and fine-art print store using the supplied Morse Media logo and all 20 original photography assets.

## Requirements

- Node.js 22 LTS or newer
- npm

## Run locally on macOS

1. Open Terminal.
2. Type `cd `, including the trailing space.
3. Drag this project folder into Terminal and press Return.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open `http://localhost:3000` in Chrome.

Keep Terminal open while viewing the site. Stop the server with **Control + C**.

## Verify the complete project

Run:

```bash
npm run verify
```

This performs strict TypeScript checking and a production Next.js build.

## Activate Stripe test checkout

```bash
cp .env.example .env.local
open -e .env.local
```

Replace the Stripe placeholders with test-mode keys, save, restart `npm run dev`, add a print to the bag and open checkout.

For webhook testing, install the Stripe CLI and run:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the resulting `whsec_...` secret into `.env.local`.

## Printique fulfillment

The site validates prices on the server, collects payment/shipping through embedded Stripe Checkout and creates a structured fulfillment manifest after payment. Automatic Printique submission still requires a Printique-approved custom integration or another approved automation endpoint. Add that endpoint as `PRINTIQUE_ORDER_WEBHOOK_URL`.

Until a fulfillment endpoint is available, use paid Stripe orders and the webhook manifest for manual Printique submission.

## Contact and newsletter forms

Both forms are functional without another service: they open a pre-filled email to `hello@morsemedia.co`. To submit directly in the background, connect webhook endpoints using `CONTACT_FORM_WEBHOOK_URL` and `NEWSLETTER_WEBHOOK_URL`.

## Refinements in version 4

- Improved keyboard navigation, focus states, Escape-key support and modal scroll locking
- Fixed cart hydration flash and capped quantities to match server validation
- Added server-side duplicate-line merging and order quantity limits
- Added finish descriptions, price deltas and a material guide
- Added filter reset controls and improved search matching
- Made collection images link directly to their print pages
- Added product structured data, sitemap, robots and web-app manifest
- Added loading, not-found and error states
- Improved Stripe fulfillment event handling and idempotency headers
- Removed fake local-only newsletter behavior
- Kept every website image on the original, unedited photo assets
