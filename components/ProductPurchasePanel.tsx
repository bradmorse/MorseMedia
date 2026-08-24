'use client';

import Link from 'next/link';
import { Check, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { finishOptions, getSizeOptions, type Product } from '@/data/site';
import { formatCurrency } from '@/lib/format';
import { useCart } from './CartProvider';

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const sizes = getSizeOptions(product.orientation);
  const [size, setSize] = useState(sizes[0]);
  const [finish, setFinish] = useState(finishOptions[0]);
  const { add } = useCart();
  const price = useMemo(() => product.price + size.add + finish.add, [finish, product.price, size]);

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
      <button className="button button--solid button--wide purchase-panel__add" type="button" onClick={() => add(product.id, { size: size.label, finish: finish.label })}>
        <ShoppingBag /> Add to bag · {formatCurrency(price)}
      </button>
      <div className="purchase-trust">
        <span><ShieldCheck /> Secure on-site Stripe checkout</span>
        <span><Truck /> Prepared for Printique production</span>
      </div>
      <ul className="purchase-notes">
        <li>Archival, made-to-order production</li>
        <li>Crop is reviewed before the order is submitted for printing</li>
        <li><Link href="/shipping-returns">View shipping and return information</Link></li>
      </ul>
    </div>
  );
}
