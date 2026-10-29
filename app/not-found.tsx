import Link from 'next/link';
import { ArrowLeft, ImageOff } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="order-result content-section">
      <ImageOff />
      <p className="eyebrow">404 · Not found</p>
      <h1>This part of the trail ends here.</h1>
      <p>The page may have moved, or the print is no longer listed.</p>
      <div className="order-result__actions">
        <Link className="button button--solid" href="/services">Photo &amp; video services</Link>
        <Link className="button" href="/shop">Browse prints</Link>
        <Link className="button" href="/"><ArrowLeft /> Return home</Link>
      </div>
    </section>
  );
}
