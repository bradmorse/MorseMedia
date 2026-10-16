import { NextResponse } from 'next/server';
import { postWebhook, sendOwnerEmail } from '@/lib/mail';

export const runtime = 'nodejs';

const CONTACT_ADDRESS = 'hello@morsemedia.co';

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const honeypot = clean(body?.company, 100);
    if (honeypot) return NextResponse.json({ ok: true });

    const name = clean(body?.name, 120).replace(/[\r\n]+/g, ' ');
    const email = clean(body?.email, 254).toLowerCase();
    const type = clean(body?.type, 120).replace(/[\r\n]+/g, ' ') || 'Creative project';
    const message = clean(body?.message, 5000);
    const details = Object.fromEntries(['location','timeline','budget','details','photo'].map(key=>[key,clean(body?.[key],500)]));

    if (!name || !isEmail(email) || message.length < 10) {
      return NextResponse.json({ error: 'Please provide your name, a valid email and a little more project detail.' }, { status: 400 });
    }

    const detailLines = Object.entries(details).filter(([,v])=>v).map(([k,v])=>`${k[0].toUpperCase()}${k.slice(1)}: ${v}`).join('\n');
    const text = `Name: ${name}\nEmail: ${email}\nProject type: ${type}\n${detailLines}\n\n${message}`;

    // 1. Webhook (Formspree, Zapier, Make…) if configured.
    const endpoint = process.env.CONTACT_FORM_WEBHOOK_URL?.trim();
    if (endpoint) {
      await postWebhook(endpoint, { name, email, type, message, ...details, source: 'morse-media-contact', submittedAt: new Date().toISOString() });
      return NextResponse.json({ ok: true, mode: 'webhook' });
    }

    // 2. Direct email through Resend (reply goes straight to the visitor).
    if (await sendOwnerEmail({ subject: `${type} inquiry from ${name}`, text, replyTo: email })) {
      return NextResponse.json({ ok: true, mode: 'email' });
    }

    // 3. Fallback: hand the visitor a prepared email.
    const subject = encodeURIComponent(`${type} inquiry from ${name}`);
    const mailBody = encodeURIComponent(text.slice(0, 1800));
    return NextResponse.json({ ok: true, mode: 'mailto', mailto: `mailto:${CONTACT_ADDRESS}?subject=${subject}&body=${mailBody}` });
  } catch (error) {
    console.error('[Morse Media] Contact delivery failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: `The message could not be sent. Please email ${CONTACT_ADDRESS} directly.` }, { status: 500 });
  }
}
