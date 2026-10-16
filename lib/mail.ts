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
