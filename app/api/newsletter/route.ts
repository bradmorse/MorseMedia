import { NextResponse } from 'next/server';
import { postWebhook, sendOwnerEmail } from '@/lib/mail';

export const runtime = 'nodejs';

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase().slice(0, 254) : '';
    const honeypot = typeof body?.company === 'string' ? body.company.trim() : '';
    if (honeypot) return NextResponse.json({ ok: true });
    if (!isEmail(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });

    const endpoint = process.env.NEWSLETTER_WEBHOOK_URL?.trim();
    if (endpoint) {
      await postWebhook(endpoint, { email, source: 'morse-media-newsletter', submittedAt: new Date().toISOString() });
      return NextResponse.json({ ok: true, mode: 'webhook' });
    }

    if (await sendOwnerEmail({ subject: 'New Morse Media newsletter sign-up', text: `Please add ${email} to the Morse Media email list.`, replyTo: email })) {
      return NextResponse.json({ ok: true, mode: 'email' });
    }

    const subject = encodeURIComponent('Morse Media newsletter subscription');
    const mailBody = encodeURIComponent(`Please add ${email} to the Morse Media email list.`);
    return NextResponse.json({ ok: true, mode: 'mailto', mailto: `mailto:hello@morsemedia.co?subject=${subject}&body=${mailBody}` });
  } catch (error) {
    console.error('[Morse Media] Newsletter delivery failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Subscription could not be completed. Please email hello@morsemedia.co.' }, { status: 500 });
  }
}
