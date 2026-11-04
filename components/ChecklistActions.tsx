'use client';

import { Link2, Printer, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Print and share buttons for the seller checklist. Share opens the phone's share sheet where it exists,
 * and otherwise copies the page link so an agent can paste it into an email or text to the homeowner.
 */
export default function ChecklistActions({ title, url }: { title: string; url: string }) {
  const [status, setStatus] = useState('');
  // Decided after the first render so the server and browser render the same button text.
  const [canShare, setCanShare] = useState(false);
  useEffect(() => { setCanShare(typeof navigator.share === 'function' && window.matchMedia('(pointer: coarse)').matches); }, []);

  async function share() {
    trackEvent('share', { method: canShare ? 'share_sheet' : 'copy_link', content_type: 'checklist', item_id: url });
    if (canShare) {
      try { await navigator.share({ title, url }); } catch { /* closed the share sheet */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Link copied — paste it into an email or text.');
    } catch {
      setStatus(`Copy this link: ${url}`);
    }
    window.setTimeout(() => setStatus(''), 6000);
  }

  function print() {
    trackEvent('print_checklist', { item_id: url });
    window.print();
  }

  return (
    <div className="prep-actions">
      <button type="button" className="button button--solid" onClick={print}><Printer aria-hidden="true" /> Print the checklist</button>
      <button type="button" className="button" onClick={share}>
        {canShare ? <Share2 aria-hidden="true" /> : <Link2 aria-hidden="true" />} {canShare ? 'Send to a seller' : 'Copy link to send'}
      </button>
      <span className="prep-actions__status" role="status">{status}</span>
    </div>
  );
}
