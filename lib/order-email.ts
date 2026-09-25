import { createHash } from 'node:crypto';
import type Stripe from 'stripe';

// Stripe metadata persists successful sends. Resend's 24-hour idempotency window
// additionally protects concurrent callbacks and retries after a network timeout.
export async function orderEmail(stripe: Stripe, session: Stripe.Checkout.Session, key: string, to: string, subject: string, text: string) {
  const marker = `mail_${createHash('sha256').update(key).digest('hex').slice(0, 24)}`;
  const current = await stripe.checkout.sessions.retrieve(session.id);
  if (current.metadata?.[marker]) return;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;
  if (!apiKey || !from || !to) throw new Error('Order email is not configured.');
  // Test orders never send to customers, even if a real address was used in checkout.
  const recipient = session.livemode ? to : process.env.ORDER_ALERT_EMAIL;
  if (!recipient) throw new Error('Test email recipient is not configured.');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `${session.id}/${key}` },
    body: JSON.stringify({ from, to: [recipient], subject: `${session.livemode ? '' : '[TEST] '}${subject}`, text }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Order email failed (${response.status}).`);
  await stripe.checkout.sessions.update(session.id, { metadata: { [marker]: 'sent' } });
}
