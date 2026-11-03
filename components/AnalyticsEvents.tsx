'use client';

import { useEffect } from 'react';
import { classifyLink, trackEvent } from '@/lib/analytics';

/** One listener for the whole site: reports quote, email and phone link clicks to Google Analytics. */
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const match = classifyLink(link.getAttribute('href') || '', window.location.href);
      if (!match) return;
      const text = (link.textContent || link.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 100);
      trackEvent(match.event, { ...match.params, link_text: text || undefined, page_path: window.location.pathname });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
