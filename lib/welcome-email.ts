import 'server-only';
import { featuredProducts } from '@/data/site';
import { recentWork } from '@/data/recent-work';
import { siteUrl } from './seo';

/**
 * Welcome email for new newsletter subscribers, sent through Resend from CONTACT_EMAIL_FROM.
 * Turn it off by setting NEWSLETTER_WELCOME=off in Vercel. Returns false when not configured.
 */
export function welcomeEmailContent() {
  const latest = recentWork.slice(0, 3);
  const prints = featuredProducts.slice(0, 3);
  const text = [
    'Thank you for subscribing to Morse Media.',
    '',
    'You will hear about new photographs, print releases and the occasional story from the field — a few emails a year, never spam.',
    '',
    'The latest work:',
    ...latest.map((photo) => `- ${photo.title}: ${siteUrl}/photography/${photo.slug}`),
    '',
    'Prints made to order:',
    ...prints.map((product) => `- ${product.title}: ${siteUrl}/shop/${product.slug}`),
    '',
    `Browse the print shop: ${siteUrl}/shop`,
    '',
    'Have a project in mind? Just reply to this email.',
    '',
    'Bradley Morse',
    'Morse Media · New Hampshire',
    '',
    'You received this because you signed up at morsemedia.co. To unsubscribe, reply with "unsubscribe".',
  ].join('\n');

  const card = (href: string, image: string, title: string, meta: string) =>
    `<td style="width:33%;padding:0 6px;vertical-align:top"><a href="${href}" style="color:#f2f1e9;text-decoration:none"><img src="${siteUrl}${image}" width="176" alt="${title}" style="display:block;width:100%;max-width:176px;height:auto;border:0"><p style="margin:10px 0 2px;font-size:14px">${title}</p><p style="margin:0;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#a8b5aa">${meta}</p></a></td>`;

  const html = `<!doctype html><html><body style="margin:0;background:#0d1412;font-family:Helvetica,Arial,sans-serif;color:#f2f1e9">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0d1412"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
<tr><td style="padding:0 6px 24px"><img src="${siteUrl}/images/morse-media-logo.png" width="160" alt="Morse Media" style="display:block;border:0"></td></tr>
<tr><td style="padding:0 6px"><img src="${siteUrl}/images/og/autumn-overlook.jpg" width="588" alt="Autumn valley and lake framed by pine branches" style="display:block;width:100%;height:auto;border:0"></td></tr>
<tr><td style="padding:28px 6px 8px"><p style="margin:0 0 6px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#b6c9a5">Welcome</p><h1 style="margin:0 0 14px;font-size:28px;font-weight:300">Thank you for subscribing.</h1><p style="margin:0;font-size:15px;line-height:1.6;color:#cbd4c8">You will hear about new photographs, print releases and the occasional story from the field — a few emails a year, never spam.</p></td></tr>
<tr><td style="padding:24px 0 8px"><p style="margin:0 6px 12px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#b6c9a5">The latest work</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${latest.map((photo) => card(`${siteUrl}/photography/${photo.slug}`, photo.image.replace('/images/photos/', '/images/og/').replace('.webp', '.jpg'), photo.title, 'Autumn studies')).join('')}</tr></table></td></tr>
<tr><td style="padding:20px 0 8px"><p style="margin:0 6px 12px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#b6c9a5">Prints made to order</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${prints.map((product) => card(`${siteUrl}/shop/${product.slug}`, product.image.replace('/images/photos/', '/images/og/').replace('.webp', '.jpg'), product.title, `From $${product.price}`)).join('')}</tr></table></td></tr>
<tr><td style="padding:24px 6px"><a href="${siteUrl}/shop" style="display:inline-block;padding:14px 22px;background:#b6c9a5;color:#0d1412;text-decoration:none;font-size:12px;letter-spacing:.14em;text-transform:uppercase">Browse the print shop</a></td></tr>
<tr><td style="padding:8px 6px 0;font-size:14px;line-height:1.6;color:#cbd4c8">Have a project in mind? Just reply to this email.<br><br>Bradley Morse<br>Morse Media · New Hampshire</td></tr>
<tr><td style="padding:28px 6px 0;font-size:11px;line-height:1.6;color:#7d8a80">You received this because you signed up at morsemedia.co. To unsubscribe, reply with “unsubscribe”.</td></tr>
</table></td></tr></table></body></html>`;

  return { subject: 'Welcome to Morse Media', text, html };
}

export async function sendWelcomeEmail(to: string) {
  if (process.env.NEWSLETTER_WELCOME === 'off') return false;
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = (process.env.CONTACT_EMAIL_FROM || process.env.ORDER_EMAIL_FROM)?.trim();
  const replyTo = (process.env.CONTACT_EMAIL_TO || process.env.ORDER_ALERT_EMAIL)?.trim();
  if (!apiKey || !from) return false;
  const { subject, text, html } = welcomeEmailContent();
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `welcome/${to}` },
      body: JSON.stringify({ from, to: [to], subject, text, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) console.error(`[Morse Media] Welcome email returned ${response.status}.`);
    return response.ok;
  } catch (error) {
    console.error('[Morse Media] Welcome email failed:', error instanceof Error ? error.message : 'unknown error');
    return false;
  }
}
