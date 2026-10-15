import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

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

    const name = clean(body?.name, 120);
    const email = clean(body?.email, 254).toLowerCase();
    const type = clean(body?.type, 120) || 'Creative project';
    const message = clean(body?.message, 5000);
    const details = Object.fromEntries(['location','timeline','budget','details','photo'].map(key=>[key,clean(body?.[key],500)]));

    if (!name || !isEmail(email) || message.length < 10) {
      return NextResponse.json({ error: 'Please provide your name, a valid email and a little more project detail.' }, { status: 400 });
    }

    const payload = { name, email, type, message, ...details, source: 'morse-media-contact', submittedAt: new Date().toISOString() };
    const endpoint = process.env.CONTACT_FORM_WEBHOOK_URL?.trim();

    if (endpoint) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(process.env.FORM_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.FORM_WEBHOOK_SECRET}` } : {}),
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`Contact delivery returned ${response.status}.`);
      return NextResponse.json({ ok: true, mode: 'webhook' });
    }

    const subject = encodeURIComponent(`${type} inquiry from ${name}`);
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject type: ${type}\n${Object.entries(details).filter(([,v])=>v).map(([k,v])=>`${k}: ${v}`).join("\n")}\n\n${message}`);
    return NextResponse.json({ ok: true, mode: 'mailto', mailto: `mailto:hello@morsemedia.co?subject=${subject}&body=${mailBody}` });
  } catch {
    return NextResponse.json({ error: 'The message could not be prepared. Please email hello@morsemedia.co directly.' }, { status: 500 });
  }
}
