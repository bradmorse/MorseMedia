# Morse Media — Update 5 (October 16, 2026)

Version 5.0.0. This zip includes everything from Update 4 as well, so it can be applied on its own.

## New in Update 5

**1. Print-readiness guard** (`lib/print-quality.ts`, `data/print-masters.ts`)
- A print size is only offered for sale when its print master has at least 150 ppi at that size. Checkout re-checks it.
- `npm run masters:check -- "C:\path\to\masters"` measures your exported masters (JPEG, PNG, TIFF) and prints lines to paste into `data/print-masters.ts`.
- `npm run catalog:checklist` now shows print readiness and pixels needed for every SKU.

**2. Case studies** (`data/case-studies.ts`)
- Template pages at `/work/<slug>` with brief, approach, outcome, gallery, optional video and testimonial.
- They appear on Portfolio and on the matching service page automatically. Nothing shows until you add a real project (`/work` sends visitors to Portfolio until then).

**3. Real estate landing page** — `/real-estate` (also `/realtors`)
- Package and price, add-ons, how it works, a seller prep checklist agents can forward, FAQ (with FAQ structured data) and a booking form.
- Before/after slider appears once you add image pairs to `data/real-estate.ts`.
- Review the FAQ answers in `data/real-estate.ts` — they are written to match the published package; adjust anything that does not match how you work.

**4. Regional pages** — `/areas` and five regions: Seacoast, Lakes Region, White Mountains, Manchester/Nashua/Concord, Monadnock (`data/areas.ts`). Each has its own copy, towns, relevant services and starting prices.

**5. Newsletter welcome email** (`lib/welcome-email.ts`) — new subscribers get a branded thank-you with the latest work and three prints. Turn off with `NEWSLETTER_WELCOME=off`.

**6. Faster contact page** — now served instantly from the CDN; the service and photo in the link are read in the browser.

**7. Print shop**
- Curated sets (`data/sets.ts`): Granite & Water, Old Hill, Maine Coast, Adirondack Autumn, Moon Studies — on the shop page and on each member print's page.
- Complete-the-set discount: 10% off every piece when the whole set is ordered, in any sizes and finishes. Shown in the bag and checkout summary, charged by the server. The bag nudges customers who are one or two prints short.
- Gift certificates page at `/gift-cards` (also `/gift`) with a "Gift certificate" inquiry type. See `STORE-SETUP.md` for issuing them as Stripe promotion codes.

**Also**: footer links to Real estate, Areas served and Gift certificates; site search finds gift cards, sets and regions; six new tests (`tests/update5.test.ts`).

## Update 4 (included)

**Search and sharing**
- Home page title now includes the brand ("Morse Media | Fine Art Photography & Creative Services in New Hampshire").
- Every photo has a 1200 × 630 JPG share image in `public/images/og/`, so links posted to Facebook, LinkedIn, iMessage and Slack show a proper preview (WebP previews often fail).
- Business schema now describes Morse Media as a New Hampshire professional service (area served, services offered) plus a WebSite entry.
- Service pages: longer search descriptions that include the starting price, and the starting prices are now in the structured data.
- Photo story pages: fuller descriptions, thumbnail and license info in the structured data.
- Apple touch icon and a 192 px app icon for phones.
- Product page images now really render at quality 90 (Next 16 ignored the setting unless it was listed in `next.config.ts`).
- New short links: `/gallery` → Photography, `/pricing` → Services packages.

**Phones**
- Home page is about a third shorter on phones: autumn photos, collections, featured prints and the four services now sit two across.
- Shop and collection print grids are two across on phones.
- Small uppercase links have larger tap areas; hero text has a soft shadow so it stays readable over bright skies.

**Turning visitors into clients**
- Each service page lists its starting packages with what is included and a direct "Ask about this package" link.
- Photo story pages offer separate "Ask about a print" and "License this image" buttons.

**Spam protection** (`lib/spam.ts`)
- Forms submitted within 2.5 seconds of loading, or messages stuffed with links, are quietly ignored.
- Each visitor can send up to 5 messages and 5 sign-ups per 10 minutes.

**Housekeeping**
- Removed outdated notes: `START-HERE.md`, `WINDOWS-START-HERE.md`, `SERVICES-UPDATE.md`, `QUALITY-CHECK.md`, `ORIGINAL-PHOTOS.md`.
- New tests in `tests/seo.test.ts` (share images exist, starting prices parse).

## Still to do
1. Real testimonials and 2–3 case studies in `data/proof.ts` (never invent quotes).
2. Google Search Console: submit `https://www.morsemedia.co/sitemap.xml`; set up a Google Business Profile.
3. Print store: Stripe, Prodigi, full-resolution print masters, a test order (see `STORE-SETUP.md`).
4. Larger exports of the four autumn photos (currently 750 px wide).
