// Switches for parts of the site that are built but not shown to the public.
//
// PRINT SHOP — paused on October 29, 2026 so the site can focus on photo and video clients.
// Everything is still here: the shop, product pages, collections, the photography archive,
// print sets, the print guide, shipping & returns, the bag and Stripe/Prodigi checkout.
// While paused, those pages redirect (temporarily) to /portfolio and are left out of the
// sitemap, navigation, footer, search and contact form.
//
// To relaunch: Vercel → Project → Settings → Environment Variables → add
// NEXT_PUBLIC_PRINT_SHOP = on (Production), then redeploy. next.config.ts reads the same variable.
export const PRINT_SHOP_ENABLED = process.env.NEXT_PUBLIC_PRINT_SHOP === 'on';

/** Public paths that belong to the print shop. Used for redirects and the sitemap. */
export const printShopPaths = ['/shop', '/collections', '/photography', '/print-guide', '/shipping-returns', '/checkout'];
