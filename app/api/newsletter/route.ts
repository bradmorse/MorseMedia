import { NextResponse } from 'next/server';

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
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(process.env.FORM_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.FORM_WEBHOOK_SECRET}` } : {}),
        },
        body: JSON.stringify({ email, source: 'morse-media-newsletter', submittedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`Newsletter delivery returned ${response.status}.`);
      return NextResponse.json({ ok: true, mode: 'webhook' });
    }

    const subject = encodeURIComponent('Morse Media newsletter subscription');
    const mailBody = encodeURIComponent(`Please add ${email} to the Morse Media email list.`);
    return NextResponse.json({ ok: true, mode: 'mailto', mailto: `mailto:hello@morsemedia.co?subject=${subject}&body=${mailBody}` });
  } catch {
    return NextResponse.json({ error: 'Subscription could not be prepared. Please email hello@morsemedia.co.' }, { status: 500 });
  }
}
