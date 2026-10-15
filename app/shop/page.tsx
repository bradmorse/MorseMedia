import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Image from 'next/image';
import ShopCatalog from '@/components/ShopCatalog';
import { finishOptions } from '@/data/site';
import { formatCurrency } from '@/lib/format';

export const metadata = pageMetadata('New England Fine Art Photography Prints', 'Browse original New Hampshire, Maine and Adirondack landscape photography. Compare artwork sizes, finishes and coordinated print pairings.', '/shop');

export default function ShopPage() {
  return (
    <>
      <section className="page-hero">
        <Image src="/images/photos/granite-run.webp" alt="Autumn river and bridge in New Hampshire" fill priority sizes="100vw" />
        <div className="page-hero__shade" />
        <div className="page-hero__copy">
          <p className="eyebrow">The print shop</p>
          <h1>Artwork made<br />to live with.</h1>
          <p>Explore original photographs, compare sizes and finishes, and enquire about the right piece for your space.</p>
        </div>
      </section>
      <section className="content-section shop-section">
        <div className="section-heading">
          <div><p className="eyebrow">Available work</p><h2>Fine-art photography prints.</h2></div>
          <p>Every listed image is an original Morse Media photograph. Use the filters to browse by collection, orientation or price.</p>
        </div>
        <ShopCatalog />
      </section>
      <section className="material-guide content-section">
        <div className="section-heading">
          <div><p className="eyebrow">Choose your finish</p><h2>Four ways to live with the work.</h2></div>
          <p>Final availability and exact production specifications are confirmed before fulfillment.</p>
        </div>
        <div className="material-grid">
          {finishOptions.map((finish, index) => (
            <article key={finish.label}>
              <span>0{index + 1}</span>
              <h3>{finish.label}</h3>
              <p>{finish.description}</p>
              <small>{finish.add === 0 ? 'Included in base price' : `From +${formatCurrency(finish.add)}`}</small>
              <b>Best for: {finish.bestFor}</b>
            </article>
          ))}
        </div>
      </section>
      <section className="info-band">
        <div><span>01</span><h3>Archival quality</h3><p>Premium papers and long-lasting pigment inks selected for photographic detail.</p></div>
        <div><span>02</span><h3>Made to order</h3><p>Every piece is produced after purchase, reducing excess inventory and handling.</p></div>
        <div><span>03</span><h3>On-site checkout</h3><p>Stripe securely collects payment and shipping details while the order is prepared for the configured fulfillment workflow.</p></div>
      </section>
    </>
  );
}
