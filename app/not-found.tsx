import Link from 'next/link';
import { ArrowLeft, ImageOff } from 'lucide-react';
import { PRINT_SHOP_ENABLED } from '@/data/features';

export default function NotFound() {
  return (
    <section className="order-result content-section">
      <ImageOff />
      <p className="eyebrow">404 · Not found</p>
      <h1>This part of the trail ends here.</h1>
      <p>{PRINT_SHOP_ENABLED ? 'The page may have moved, or the print is no longer listed.' : 'The page may have moved. Try the services page, or get in touch.'}</p>
      <div className="order-result__actions">
        <Link className="button button--solid" href="/services">Photo &amp; video services</Link>
        {PRINT_SHOP_ENABLED && <Link className="button" href="/shop">Browse prints</Link>}
        <Link className="button" href="/"><ArrowLeft /> Return home</Link>
      </div>
    </section>
  );
}
