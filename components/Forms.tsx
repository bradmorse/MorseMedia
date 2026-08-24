'use client';

import { FormEvent, useState } from 'react';
import { Check, LoaderCircle, Mail } from 'lucide-react';

type SubmitState = { status: 'idle' | 'sending' | 'success' | 'error'; message: string };

async function submitJson(url: string, payload: Record<string, string>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Something went wrong.');
  return data as { ok: boolean; mode?: 'webhook' | 'mailto'; mailto?: string };
}

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [state, setState] = useState<SubmitState>({ status: 'idle', message: '' });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: 'sending', message: 'Submitting…' });
    try {
      const result = await submitJson('/api/newsletter', { email, company });
      if (result.mode === 'mailto' && result.mailto) {
        window.location.href = result.mailto;
        setState({ status: 'success', message: 'Your email app should open with the subscription request ready.' });
      } else {
        setState({ status: 'success', message: 'You’re on the list.' });
        setEmail('');
      }
    } catch (error) {
      setState({ status: 'error', message: error instanceof Error ? error.message : 'Unable to subscribe.' });
    }
  }

  if (state.status === 'success') {
    return <div className="form-success" role="status"><Check /> {state.message}</div>;
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        autoComplete="email"
        required
      />
      <label className="honeypot" aria-hidden="true">Company<input tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} /></label>
      <button className="button button--solid" type="submit" disabled={state.status === 'sending'}>
        {state.status === 'sending' ? <><LoaderCircle className="spin" /> Sending</> : 'Subscribe'}
      </button>
      {state.status === 'error' && <p className="form-error" role="alert">{state.message}</p>}
    </form>
  );
}

export function ContactForm({ defaultType = 'Print or order question' }: { defaultType?: string }) {
  const [state, setState] = useState<SubmitState>({ status: 'idle', message: '' });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setState({ status: 'sending', message: 'Preparing your message…' });

    try {
      const result = await submitJson('/api/contact', {
        name: String(form.get('name') || ''),
        email: String(form.get('email') || ''),
        type: String(form.get('type') || 'Creative project'),
        message: String(form.get('message') || ''),
        company: String(form.get('company') || ''),
      });

      if (result.mode === 'mailto' && result.mailto) {
        window.location.href = result.mailto;
        setState({ status: 'success', message: 'Your email application should open with the inquiry filled in.' });
      } else {
        formElement.reset();
        setState({ status: 'success', message: 'Your inquiry was sent. Expect a reply within two business days.' });
      }
    } catch (error) {
      setState({ status: 'error', message: error instanceof Error ? error.message : 'Unable to send your inquiry.' });
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-row">
        <label>Name<input name="name" autoComplete="name" maxLength={120} required /></label>
        <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      </div>
      <label>Project type
        <select name="type" defaultValue={defaultType}>
          <option>Print or order question</option>
          <option>Photography</option>
          <option>Video production</option>
          <option>Social media content</option>
          <option>Graphic design</option>
          <option>Combined creative campaign</option>
          <option>Image licensing</option>
        </select>
      </label>
      <label>Message<textarea name="message" rows={7} minLength={10} maxLength={5000} required /></label>
      <label className="honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-actions">
        <button className="button button--solid" type="submit" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? <><LoaderCircle className="spin" /> Sending</> : <><Mail /> Send inquiry</>}
        </button>
        {state.status !== 'idle' && <span className={state.status === 'error' ? 'form-note form-error' : 'form-note'} role={state.status === 'error' ? 'alert' : 'status'}>{state.message}</span>}
      </div>
    </form>
  );
}
