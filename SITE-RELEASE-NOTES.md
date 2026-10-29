# Morse Media — Update 8.3 (October 29, 2026)

Version 8.3.0. The footer and the home page "What Morse Media does" section now use the same compact logo as the header (circle the same height as the lettering). Lettering sizes are unchanged. The About page keeps the large original mark, and the email and search-engine logo are unchanged.

---

# Morse Media — Update 8.2 (October 29, 2026)

Version 8.2.0. Header logo tidied.

- New compact header logo `public/images/morse-media-logo-inline.png`: the circular mark is scaled to exactly the height of the MORSE MEDIA lettering (circle lines thickened slightly so they keep their weight). The lettering is the same size as before.
- The whole logo now sits inside the header's bottom line on desktop, after scrolling, and on phones (it used to hang below it). The footer keeps the original logo.
- `tests/header-logo.test.ts` checks the logo fits the header at every size.

---

# Morse Media — Update 8.1 (October 29, 2026)

Version 8.1.0. The hero film now keeps its cinematic letterbox bars.

- New cuts from the full 16:9 frame, bars included: `/video/hero-film-wide-v2.mp4` (1920 × 1080, 5.7 MB) and `/video/hero-film-portrait-v2.mp4` (720 × 1280 centre cut, bars kept, 3.2 MB), plus poster `/images/hero/hero-film-poster-v2.webp`. The v1 files (bars cropped) are removed.
- The closing fade is still trimmed so the loop is seamless (0–19.8 s).
- Only phones (screens taller than 2:3) get the portrait cut; tablets and wider use the full frame so the bars stay visible.
- `tests/hero-video.test.ts` now checks both cuts keep the full frame (1920 × 1080 and 720 × 1280).

---

# Morse Media — Update 8 (October 29, 2026)

Version 8.0.0. The home page hero is now a film instead of a photograph.

- **Hero film** (`data/hero.ts`, `components/HeroVideo.tsx`): Bradley's 20-second nature film plays silently on a loop behind the headline. Letterbox bars removed and the closing fade trimmed so it loops cleanly.
- Two cuts: 1920 × 960 for laptops and desktops (`/video/hero-film-wide-v1.mp4`, 5.8 MB) and 720 × 1280 for phones (`/video/hero-film-portrait-v1.mp4`, 3.6 MB). H.264, no audio, web-optimized.
- The first frame (`/images/hero/hero-film-poster-v1.webp`) loads first, so the page is just as fast; the film fades in once it is playing.
- A pause/play button sits beside the caption. Visitors who prefer reduced motion start paused; Save-Data connections never download the video; if a phone blocks autoplay (e.g. Low Power Mode) the still frame stays and the play button appears.
- `/video/*` is cached for a year, so new films get a new version number in the file name.
- `tests/hero-video.test.ts` checks the files (size, no audio, web-optimized), the player settings and the cache rule.
- **To change the film:** export a short, steady, silent clip, encode both cuts, add them with a new version number and update `data/hero.ts`.

---

# Morse Media — Update 7.1 (October 29, 2026)

Version 7.1.0. Links to the site now preview with the Morse Media logo.

- New link-preview card `public/images/og/morse-media-share.jpg` (1200 × 630): the logo on the site's dark background with "Photography & Video · Nashville, TN". Set in `lib/seo.ts` (`brandShareImage`).
- Used by the home page and every business page (services, service pages, real estate, areas, area pages, about, contact, portfolio) in place of the New England landscape photos. Case studies keep their own project photos.
- `tests/seo.test.ts` checks the card's size and that these pages don't switch back to a photo.
- Previews are cached by apps: iMessage may show the old photo for a link it has already displayed; Facebook and LinkedIn can be refreshed with their Sharing Debugger / Post Inspector.

---

# Morse Media — Update 7 (October 29, 2026)

Version 7.0.0. The site now focuses entirely on photo and video clients. The print shop is paused, not deleted.

## New in Update 7

**1. Print shop paused behind one switch** (`data/features.ts`)
- `/shop`, `/collections`, `/photography`, `/print-guide`, `/shipping-returns` and `/checkout` (and sub-pages) temporarily redirect (307) to `/portfolio`, and are left out of the sitemap, menu, footer, site search and home page. The bag is hidden, "Print or order question" is hidden from the contact form, and `/api/checkout` refuses orders.
- All print code and data is kept. **To relaunch:** set `NEXT_PUBLIC_PRINT_SHOP=on` in Vercel (Production) and redeploy — every print page, link and home-page section comes back as before. See `STORE-SETUP.md`.

**2. Built for winning clients**
- "Get a quote" button in the header (wide screens) and the mobile menu; every main call to action now says "Get a quote".
- Home page ends with "How booking works" (three steps), three reasons to book, and a "Tell me about your next shoot" call to action in place of the prints, collections and newsletter.
- Contact page opens on "Photo + video project" and explains what happens next (reply within two business days, written quote, one planned shoot).
- About, contact, 404, footer, site description and share text no longer mention prints while the shop is paused.

**3. Checks** — `tests/print-shop.test.ts` confirms the print data is kept, that paused print pages stay out of the sitemap and contact form, that the redirects are temporary, and that shared links are gated. The suite passes with the shop both off and on.

---

# Morse Media — Update 6 (October 28, 2026)

Version 6.0.0. Morse Media is now based in Nashville, Tennessee, graphic design is gone, and the site leads with photography and video services. Update 5 notes follow below.

## New in Update 6

**1. Based in Nashville** (`data/business.ts`)
- One file holds the city, state, region, counties and service-area cities. Titles, descriptions, the business schema (`addressLocality: Nashville`, `addressRegion: TN`, `areaServed`), footer, contact page, service pages, real estate page and welcome email all read from it.
- Area pages rewritten for Middle Tennessee (`data/areas.ts`): Downtown & Midtown, East Nashville, Franklin & Brentwood, Murfreesboro & Smyrna, Hendersonville & Gallatin, Mt. Juliet & Lebanon. Neighborhood areas use Place schema; city areas use City schema. Old New Hampshire area URLs redirect to `/areas`.
- Print collections keep their real locations (New Hampshire, Maine, Adirondacks) — those describe where the photographs were taken.

**2. Graphic design removed**
- Service page, package, contact-form option, home card, portfolio tags and copy are gone. `/services/graphic-design` redirects to `/services`.
- "Social media content" is now **Monthly Photo & Video Content** (`/services/monthly-content`; the old URL redirects): a monthly shoot delivering photos and vertical video, no graphics or posting management.

**3. Photo and video first**
- Home page leads with services: new hero, starting prices on each service card, client band, areas served, then prints and collections.
- Navigation: Services, Real Estate, Portfolio, Prints, About, Contact. Footer lists every service.
- Nine packages on `/services` (three per row): Brand Photography Session $950, Headshots & Team Portraits $450, Event Photography $600, Short-Form Video $1,800, Commercial & Brand Film $3,500, Event Highlight Film $1,200, Real Estate Listing $275, Listing Photo + Video $650, Monthly Photo & Video $1,400/month. Prices live in `data/proof.ts`; they were set by Claude for the Nashville market and should be reviewed.
- Real estate page shows both listing packages, an "Agent spotlight video" add-on and new FAQs about listing video and areas covered.
- Services page: new FAQ answers (photo + video on the same day, delivery times, licensing) with FAQPage structured data.
- Showreel: paste a YouTube or Vimeo link into `showreel.url` in `data/proof.ts` and it appears on the home page, the services page and the video production page.

**4. Contact form**
- Project types: Photography, Headshots & team portraits, Event coverage, Video production, Real estate photo & video, Monthly photo & video content, Photo + video project, plus print questions and image licensing (`data/inquiries.ts`).
- Licensing inquiries show only the fields that apply (no location, timeline or budget).
- Old links such as `?service=Graphic%20design`, `?service=Social%20media%20content` or `?service=Gift%20card` still land on a sensible option.

**5. Gift certificates retired**
- The `/gift-cards` page, shop band, footer and search links, contact-form option and styles are removed. `/gift-cards` and `/gift` redirect to `/shop`. Stripe promotion codes still work at checkout.

**6. Search engine optimization**
- Every title is keyword-first and fits Google's ~60-character limit with " | Morse Media" (e.g. "Nashville Photographer & Videographer | Morse Media"); every description is 120–155 characters. Service and area SEO text lives in `data/services.ts` (`seoTitle`, `seoDescription`, `h1`) and `data/areas.ts` (`title`, `description`).
- H1s now name Nashville on the services, service and real estate pages.
- Service pages gained four FAQs each (with FAQPage structured data) and links to the area pages where that service is popular. Footer links to all six area pages.
- Business schema adds a contact point and an offer catalog of the four services; services and areas pages add breadcrumbs; areas page lists every area (ItemList). `<html lang="en-US">`.

**7. Checks** — `tests/nashville.test.ts` confirms the location, that no design service or gift certificate remains, that every package pre-selects a real form option, that every service has a starting price and that SEO titles and descriptions stay within limits.

---

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
