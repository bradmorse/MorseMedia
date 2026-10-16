'use client';

import { FormEvent, useState } from 'react';
import { Check, LoaderCircle, Mail } from 'lucide-react';

type SubmitState = { status: 'idle' | 'sending' | 'success' | 'error'; message: string };
type SubmitResult = { ok: boolean; mode?: 'webhook' | 'email' | 'list' | 'mailto'; mailto?: string };

async function submitJson(url: string, payload: Record<string, string>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Something went wrong.');
  return data as SubmitResult;
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
        setState({ status: 'success', message: 'Your email app should open — press send to finish subscribing.' });
      } else {
        setState({ status: 'success', message: 'You’re on the list. Thank you.' });
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

const projectTypes = [
  'Print or order question',
  'Photography',
  'Real estate photography',
  'Video production',
  'Social media content',
  'Graphic design',
  'Combined creative campaign',
  'Image licensing',
];

function detailsLabel(type: string) {
  if (type === 'Real estate photography') return 'Square footage & requested shoot date';
  if (type === 'Video production') return 'Runtime, formats & filming needs';
  if (type === 'Social media content') return 'Platforms & posting frequency';
  if (type === 'Image licensing') return 'Image use, distribution & license term';
  return 'Deliverables & intended usage';
}

export function ContactForm({ defaultType = 'Print or order question', photoTitle = '' }: { defaultType?: string; photoTitle?: string }) {
  const [projectType, setProjectType] = useState(defaultType);
  const [mailLink, setMailLink] = useState('');
  const isPrint = projectType === 'Print or order question';
  const isProperty = projectType === 'Real estate photography';
  const [state, setState] = useState<SubmitState>({ status: 'idle', message: '' });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setState({ status: 'sending', message: 'Sending your message…' });

    try {
      const result = await submitJson('/api/contact', {
        name: String(form.get('name') || ''),
        email: String(form.get('email') || ''),
        type: String(form.get('type') || 'Creative project'),
        message: String(form.get('message') || ''),
        location: String(form.get('location') || ''),
        timeline: String(form.get('timeline') || ''),
        budget: String(form.get('budget') || ''),
        details: String(form.get('details') || ''),
        photo: photoTitle,
        company: String(form.get('company') || ''),
      });

      if (result.mode === 'mailto' && result.mailto) {
        window.location.href = result.mailto;
        setMailLink(result.mailto);
        setState({ status: 'idle', message: 'Your message is ready in your email app. Press send there to complete your inquiry.' });
      } else {
        formElement.reset();
        setState({ status: 'success', message: 'Thank you — your inquiry was sent. Expect a reply within two business days.' });
      }
    } catch (error) {
      setState({ status: 'error', message: error instanceof Error ? error.message : 'Unable to send your inquiry.' });
    }
  }

  if (state.status === 'success') {
    return <div className="form-success contact-success" role="status"><Check /> {state.message}</div>;
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-row">
        <label>Name<input name="name" autoComplete="name" maxLength={120} required /></label>
        <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      </div>
      <label>Project type
        <select name="type" value={projectType} onChange={e => setProjectType(e.target.value)}>
          {projectTypes.map((type) => <option key={type}>{type}</option>)}
        </select>
      </label>
      {photoTitle && <p className="inquiry-context">Photograph: {photoTitle}</p>}
      {isPrint && (
        <div className="field-row">
          <label>Preferred size & finish<input name="details" maxLength={500} placeholder="e.g. 18 × 24 in, framed" /></label>
          <label>Ship to (city, state)<input name="location" maxLength={250} autoComplete="address-level2" /></label>
        </div>
      )}
      {!isPrint && <div className="field-row"><label>{isProperty ? 'Property location' : 'Project location / website'}<input name="location" maxLength={250} autoComplete="off" /></label><label>Timeline<select name="timeline"><option value="">Select a timeframe</option><option>As soon as possible</option><option>Within a month</option><option>1–3 months</option><option>Flexible / exploring</option></select></label></div>}
      {!isPrint && <div className="field-row"><label>Budget range<select name="budget"><option value="">Prefer to discuss</option><option>Under $500</option><option>$500–$1,500</option><option>$1,500–$3,000</option><option>$3,000–$5,000</option><option>$5,000+</option></select></label><label>{detailsLabel(projectType)}<input name="details" maxLength={500} /></label></div>}
      <label>Message<textarea name="message" rows={7} minLength={10} maxLength={5000} required /></label>
      <label className="honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      {mailLink && <p><a className="text-link" href={mailLink}>Open prepared email ↗</a> · <a href="mailto:hello@morsemedia.co">Or email hello@morsemedia.co</a></p>}
      <div className="form-actions">
        <button className="button button--solid" type="submit" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? <><LoaderCircle className="spin" /> Sending</> : <><Mail /> Send inquiry</>}
        </button>
        {state.message && <span className={state.status === 'error' ? 'form-note form-error' : 'form-note'} role={state.status === 'error' ? 'alert' : 'status'}>{state.message}</span>}
      </div>
    </form>
  );
}
