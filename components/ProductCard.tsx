'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import type { Product } from '@/data/site';
import { formatCurrency } from '@/lib/format';
import { useCart } from './CartProvider';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="product-card">
      <Link href={`/shop/${product.slug}`} className="product-card__image" aria-label={`View ${product.title}`}>
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <span className="product-card__view">View print <ArrowUpRight /></span>
      </Link>
      <div className="product-card__meta">
        <div>
          <p className="eyebrow">{product.type}</p>
          <h3><Link href={`/shop/${product.slug}`}>{product.title}</Link></h3>
          <span>From {formatCurrency(product.price)}</span>
        </div>
        <button
          className="icon-button product-card__add"
          type="button"
          onClick={() => add(product.id)}
          aria-label={`Add ${product.title} to bag`}
        >
          <Plus />
        </button>
      </div>
    </article>
  );
}
