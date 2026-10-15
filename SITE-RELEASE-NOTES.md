# Site improvements — October 15, 2026

## Implemented
- Evergreen retained; `/design-preview` permanently redirects home.
- Full photography archive: subject, color, orientation, location/series, search and reset.
- Four individual autumn photo pages with image descriptions, interpretive stories and licensing inquiries.
- Print planning tool: four sizes, four illustrative presentations, three wall colors and an 84-inch sofa scale reference. Preview does not change cart options.
- Print-size/finish guide and color-based pairing suggestions; existing prices unchanged.
- Five service detail pages with scope, workflow and contextual inquiry links. Real-estate page is an inquiry page with a placeholder statement for future completed work; no pricing invented.
- Adaptive inquiry fields with server-side limits; mail-app fallback explicitly tells users they must send the email.
- Portfolio process section and a clearly labeled personal-photography gallery. No invented client metrics, testimonials or commercial media.
- Guarded Prodigi implementation integrated from the previously prepared branch. Only configured variants can be added on their product pages. No real payment or print order placed.
- Canonical www domain, individual page metadata, Service/ImageObject/BreadcrumbList structured data, image sitemap entries and optional Search Console verification.

## Still requires account access or supplied assets
- Vercel connection returns 403 for morse-media. Confirm environment configuration and rebuild after changes; deployment through GitHub still works.
- Verify Prodigi billing, sandbox API key, full-resolution master URLs, approved lab SKUs/crops, Resend sender, shipping rates, Stripe webhook and one complete sandbox transaction. STORE_LIVE_ENABLED stays off until those checks pass.
- Commercial video URLs/files and finished graphic examples are still needed for direct portfolio embeds. Search did not identify attributable usable files. Do not claim business results without source evidence.
- Search Console verification and sitemap submission require access to the verified property. GOOGLE_SITE_VERIFICATION is supported; sitemap URL is https://www.morsemedia.co/sitemap.xml.
- Browser validation could not run: Chromium download failed in this environment. HTTP, build, structured data and fulfillment tests are separate checks and do not replace visual/mobile review.
