import 'server-only';

/**
 * Sends an internal notification (contact inquiries, newsletter sign-ups) through Resend.
 * Returns false when Resend or the owner inbox is not configured, so callers can fall back.
 */
export async function sendOwnerEmail({ subject, text, replyTo }: { subject: string; text: string; replyTo?: string }) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = (process.env.CONTACT_EMAIL_FROM || process.env.ORDER_EMAIL_FROM)?.trim();
  const to = (process.env.CONTACT_EMAIL_TO || process.env.ORDER_ALERT_EMAIL)?.trim();
  if (!apiKey || !from || !to) return false;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Email delivery returned ${response.status}.`);
  return true;
}

export async function postWebhook(endpoint: string, payload: unknown) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(process.env.FORM_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.FORM_WEBHOOK_SECRET}` } : {}),
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Webhook delivery returned ${response.status}.`);
}

/**
 * Saves a newsletter subscriber as a Resend contact so there is a real, sendable list.
 * Needs RESEND_CONTACTS_API_KEY (a Resend key with Full access; the sending-only key cannot manage contacts).
 * Returns false when not configured or when Resend refuses, so sign-ups never fail because of it.
 */
export async function saveSubscriber(email: string) {
  const apiKey = process.env.RESEND_CONTACTS_API_KEY?.trim();
  if (!apiKey) return false;
  try {
    const response = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, unsubscribed: false }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) console.error(`[Morse Media] Saving subscriber returned ${response.status}.`);
    return response.ok;
  } catch (error) {
    console.error('[Morse Media] Saving subscriber failed:', error instanceof Error ? error.message : 'unknown error');
    return false;
  }
}
