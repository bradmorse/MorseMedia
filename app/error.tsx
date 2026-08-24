'use client';

import Link from 'next/link';
import { CircleAlert, RotateCcw } from 'lucide-react';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="order-result content-section">
      <CircleAlert />
      <p className="eyebrow">Something went wrong</p>
      <h1>The page could not be completed.</h1>
      <p>Try the request again. Your shopping bag is saved in this browser.</p>
      <div className="order-result__actions">
        <button className="button button--solid" type="button" onClick={reset}><RotateCcw /> Try again</button>
        <Link className="button" href="/">Return home</Link>
      </div>
    </section>
  );
}
