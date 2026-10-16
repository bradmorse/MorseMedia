'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { CircleAlert, RotateCcw } from 'lucide-react';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[Morse Media] Page error', error.digest || error.message);
  }, [error]);

  return (
    <section className="order-result content-section">
      <CircleAlert />
      <p className="eyebrow">Something went wrong</p>
      <h1>The page could not be completed.</h1>
      <p>Try the request again. If it keeps happening, email hello@morsemedia.co and it will be fixed quickly.</p>
      <div className="order-result__actions">
        <button className="button button--solid" type="button" onClick={reset}><RotateCcw /> Try again</button>
        <Link className="button" href="/">Return home</Link>
      </div>
    </section>
  );
}
