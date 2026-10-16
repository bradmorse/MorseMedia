import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SET_DISCOUNT_PERCENT, printSets, type PrintSet } from '@/data/sets';
import { products } from '@/data/site';
import { formatCurrency } from '@/lib/format';

function setPieces(set: PrintSet) {
  return set.pieces.flatMap((slug) => products.filter((product) => product.slug === slug));
}

export function SetCard({ set, storeOpen }: { set: PrintSet; storeOpen: boolean }) {
  const pieces = setPieces(set);
  const listTotal = pieces.reduce((total, piece) => total + piece.price, 0);
  const setTotal = Math.round(listTotal * (100 - SET_DISCOUNT_PERCENT) / 100);
  return (
    <article className="set-card">
      <div className={`set-card__images set-card__images--${pieces.length}`}>
        {pieces.map((piece) => (
          <Link href={`/shop/${piece.slug}`} key={piece.slug} aria-label={`View ${piece.title}`}>
            <Image src={piece.image} alt={piece.alt} fill sizes="(max-width: 700px) 33vw, 12vw" />
          </Link>
        ))}
      </div>
      <p className="eyebrow">{pieces.length}-piece set · Save {SET_DISCOUNT_PERCENT}%</p>
      <h3>{set.name}</h3>
      <p>{set.description}</p>
      <p className="set-card__price"><s>{formatCurrency(listTotal)}</s> <strong>From {formatCurrency(setTotal)}</strong> <small>at the smallest size</small></p>
      <p className="set-card__pieces">{pieces.map((piece, index) => <span key={piece.slug}>{index > 0 && ' · '}<Link href={`/shop/${piece.slug}`}>{piece.title}</Link></span>)}</p>
      {storeOpen
        ? <small className="form-note">Add every piece to your bag, in any sizes and finishes — the set price applies automatically.</small>
        : <Link className="text-link" href={`/contact?service=${encodeURIComponent('Print or order question')}&photo=${pieces[0]?.slug || ''}`}>Ask about this set <ArrowUpRight /></Link>}
    </article>
  );
}

export default function SetCards({ storeOpen }: { storeOpen: boolean }) {
  return (
    <section className="content-section print-sets" id="sets">
      <div className="section-heading">
        <div><p className="eyebrow">Curated sets</p><h2>Complete the wall.</h2></div>
        <p>Photographs chosen to hang together. Order every piece in a set — in any sizes and finishes — and save {SET_DISCOUNT_PERCENT}% on the whole set.</p>
      </div>
      <div className="set-grid">{printSets.map((set) => <SetCard set={set} storeOpen={storeOpen} key={set.slug} />)}</div>
    </section>
  );
}
