import { NextResponse } from 'next/server';
import { postWebhook, saveSubscriber, sendOwnerEmail } from '@/lib/mail';
import { rateLimited, submittedTooFast } from '@/lib/spam';
import { sendWelcomeEmail } from '@/lib/welcome-email';

export const runtime = 'nodejs';

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase().slice(0, 254) : '';
    const honeypot = typeof body?.company === 'string' ? body.company.trim() : '';
    if (honeypot || submittedTooFast(body?.startedAt)) return NextResponse.json({ ok: true, mode: 'list' });
    if (rateLimited(request, 'newsletter', 5)) {
      return NextResponse.json({ error: 'Too many sign-ups in a short time. Please try again in a few minutes.' }, { status: 429 });
    }
    if (!isEmail(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });

    const endpoint = process.env.NEWSLETTER_WEBHOOK_URL?.trim();
    if (endpoint) {
      await postWebhook(endpoint, { email, source: 'morse-media-newsletter', submittedAt: new Date().toISOString() });
      return NextResponse.json({ ok: true, mode: 'webhook' });
    }

    // Save to a real list when Resend contacts are configured, and let the owner know either way.
    const saved = await saveSubscriber(email);
    const notified = await sendOwnerEmail({
      subject: saved ? 'New Morse Media newsletter subscriber' : 'New Morse Media newsletter sign-up',
      text: saved ? `${email} was added to your Resend contacts.` : `Please add ${email} to the Morse Media email list.`,
      replyTo: email,
    }).catch(() => false);
    if (saved || notified) {
      await sendWelcomeEmail(email);
      return NextResponse.json({ ok: true, mode: saved ? 'list' : 'email' });
    }

    const subject = encodeURIComponent('Morse Media newsletter subscription');
    const mailBody = encodeURIComponent(`Please add ${email} to the Morse Media email list.`);
    return NextResponse.json({ ok: true, mode: 'mailto', mailto: `mailto:hello@morsemedia.co?subject=${subject}&body=${mailBody}` });
  } catch (error) {
    console.error('[Morse Media] Newsletter delivery failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Subscription could not be completed. Please email hello@morsemedia.co.' }, { status: 500 });
  }
}
