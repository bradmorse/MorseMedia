# Launching Morse Media — refinement release 4.2 (October 15, 2026)

The site launches as a **portfolio + services + print-request** site. The online
store switches itself on later, automatically, once Stripe and Prodigi are set up —
no code change needed.

## 1. Apply this update

1. Unzip `morse-media-refinements.zip` **on top of** your project folder and allow it to
   replace existing files.
2. Delete these outdated notes (they describe older versions): `START-HERE.md`,
   `WINDOWS-START-HERE.md`, `SERVICES-UPDATE.md`, `QUALITY-CHECK.md`,
   `SITE-RELEASE-NOTES.md`.
3. Make sure `public/images/photos/dry-falls.webp` and
   `public/images/photos/light-through-door.webp` are still in the folder — they were
   the two photos not included in the chat.

## 2. Check it on your computer

```bash
npm install
npm test          # 9 tests
npm run verify    # type-check + production build
npm run dev       # open http://localhost:3000
```

Click through: home, Print Shop → a print → "Request this print", Services,
Portfolio, Contact. On a phone-width window, open the menu and search.

## 3. Turn on working contact email (5 minutes, strongly recommended)

Without this, the contact form opens the visitor's email app and they must press send.

1. Create a free account at https://resend.com, add the domain `morsemedia.co`, and add
   the DNS records it shows you at your domain provider.
2. In Vercel → morse-media → Settings → Environment Variables (Production), add:
   - `RESEND_API_KEY` — from Resend
   - `CONTACT_EMAIL_FROM` — e.g. `Morse Media <website@morsemedia.co>`
   - `CONTACT_EMAIL_TO` — the inbox you actually read
3. Confirm `hello@morsemedia.co` receives mail (it is shown across the site).

## 4. Publish

```bash
git add -A
git commit -m "Refinement release 4.2: accurate store copy, working inquiries, Evergreen palette"
git push
```

Vercel deploys automatically from GitHub. When it finishes:

- Visit https://www.morsemedia.co and submit one test inquiry.
- In Google Search Console, submit `https://www.morsemedia.co/sitemap.xml`.

## What changed in 4.2

- **Honest store states.** With checkout not yet configured, the shop says "Request
  this print" and promises a personal quote, the bag icon is hidden, and nothing claims
  "secure checkout". Once the store is configured, checkout copy appears automatically.
- **Inquiries reach you directly** through Resend (reply-to set to the visitor), with
  webhook and mail-app fallbacks. Print requests now ask for size/finish and ship-to city.
- **Print preview fix.** The "picture it in your space" tool showed landscape prints
  tall and ignored the real finish names; both fixed.
- **One palette.** Services and Portfolio pages now use the site-wide Evergreen colors
  instead of the older gold theme.
- **Search** now finds services and the autumn photographs, not just prints.
- **Accuracy.** Removed the "crop is reviewed before printing" claim (fulfillment is
  automatic), corrected the Granite Run description, replaced "1×" stat with
  "1 point of contact", updated policy pages (dated, US/Canada shipping, analytics).
- **SEO.** Canonicals + share images on every page, breadcrumb data on collections,
  sitemap last-modified dates, Product schema uses PreOrder until online sales open.
- **Ops.** Checkout and form failures are logged (no customer data) so problems show in
  Vercel logs; HSTS header; `/prints` and `/store` redirect to `/shop`.

## Before turning on online sales

Follow `STORE-SETUP.md`. Also confirm the shipping/returns wording matches what you
want to promise customers.
