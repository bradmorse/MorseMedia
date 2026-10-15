'use client';

import Link from 'next/link';
import { Check, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { buildSku, finishOptions, getSizeOptions, type Product } from '@/data/site';
import { formatCurrency } from '@/lib/format';
import { useCart } from './CartProvider';

export default function ProductPurchasePanel({ product, availableSkus }: { product: Product; availableSkus: string[] }) {
  const sizes = getSizeOptions(product.orientation);
  const [size, setSize] = useState(sizes[0]);
  const [finish, setFinish] = useState(finishOptions[0]);
  const { add } = useCart();
  const price = useMemo(() => product.price + size.add + finish.add, [finish, product.price, size]);

  const canOrder = availableSkus.includes(buildSku(product.id, size.label, finish.label));

  return (
    <div className="purchase-panel">
      <div className="purchase-panel__price"><span>Configured price</span><strong>{formatCurrency(price)}</strong></div>
      <div className="option-group">
        <div className="option-group__header"><span>Size</span><small>{product.orientation === 'landscape' ? 'Landscape ratio' : 'Portrait ratio'}</small></div>
        <div className="option-grid">
          {sizes.map((entry) => (
            <button type="button" aria-pressed={size.label === entry.label} className={size.label === entry.label ? 'selected' : ''} onClick={() => setSize(entry)} key={entry.label}>
              {size.label === entry.label && <Check />}
              <span>{entry.label}</span>
              {entry.add > 0 && <small>+{formatCurrency(entry.add)}</small>}
            </button>
          ))}
        </div>
      </div>
      <div className="option-group">
        <div className="option-group__header"><span>Finish</span><small>Made to order</small></div>
        <div className="option-grid option-grid--finishes">
          {finishOptions.map((entry) => (
            <button type="button" aria-pressed={finish.label === entry.label} className={finish.label === entry.label ? 'selected' : ''} onClick={() => setFinish(entry)} key={entry.label}>
              {finish.label === entry.label && <Check />}
              <span>{entry.label}</span>
              {entry.add > 0 && <small>+{formatCurrency(entry.add)}</small>}
            </button>
          ))}
        </div>
        <div className="finish-description" aria-live="polite">
          <strong>{finish.label}</strong>
          <p>{finish.description}</p>
          <small>Best for: {finish.bestFor}</small>
        </div>
      </div>
      {canOrder ? <button className="button button--solid button--wide purchase-panel__add" type="button" onClick={() => add(product.id, { size: size.label, finish: finish.label })}>
        <ShoppingBag /> Add to bag · {formatCurrency(price)}
      </button> : <Link className="button button--solid button--wide" href={`/contact?service=Print%20or%20order%20question&photo=${product.slug}`}>Enquire about this print</Link>}
      {!canOrder && <p className="form-note">This configuration is available by inquiry while final print specifications are confirmed. No payment is collected here.</p>}
      <div className="purchase-trust">
        <span><ShieldCheck /> Secure on-site Stripe checkout</span>
        <span><Truck /> Made-to-order artwork</span>
      </div>
      <ul className="purchase-notes">
        <li><Link href="/print-guide">Compare print sizes and finishes</Link></li>
        <li>Crop is reviewed before the order is submitted for printing</li>
        <li><Link href="/shipping-returns">View shipping and return information</Link></li>
      </ul>
    </div>
  );
}
