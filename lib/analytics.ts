// Google Analytics 4 events for the moments that matter: quote requests, enquiries and email taps.
// Safe to call before gtag.js has loaded (commands wait in dataLayer) and a no-op on the server.

type EventParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Measurement ID; NEXT_PUBLIC_GA_ID overrides the live property. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || 'G-Q60YZCS3S9';

/** Events this site sends, so reports and code use the same names. */
export const analyticsEvents = {
  lead: 'generate_lead', // contact form sent (GA4 recommended event; mark it as a key event in GA)
  quoteClick: 'quote_click', // a "Get a quote" / "Book" / contact link was clicked
  emailClick: 'email_click', // a mailto: link was tapped
  phoneClick: 'phone_click', // a tel: link was tapped
  formError: 'form_error', // the contact form showed an error
  signUp: 'sign_up', // newsletter sign-up (GA4 recommended event)
} as const;

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    // Same queueing function as Google's snippet: gtag.js reads these when it loads.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  const clean = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== ''));
  window.gtag('event', name, clean);
}

/** What a clicked link means for analytics, or null for links we don't track. */
export function classifyLink(href: string, pageUrl: string): { event: string; params: EventParams } | null {
  const raw = href.trim();
  if (/^mailto:/i.test(raw)) return { event: analyticsEvents.emailClick, params: { link_url: raw.split('?')[0] } };
  if (/^tel:/i.test(raw)) return { event: analyticsEvents.phoneClick, params: { link_url: raw } };
  let url: URL;
  try { url = new URL(raw, pageUrl); } catch { return null; }
  if (url.origin !== new URL(pageUrl).origin) return null;
  if (url.pathname === '/contact' || url.hash === '#book') {
    return { event: analyticsEvents.quoteClick, params: { link_url: url.pathname + url.search + url.hash, service: url.searchParams.get('service') || undefined } };
  }
  return null;
}
