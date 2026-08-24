import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/site';

export const metadata: Metadata = { title: 'Collections', description: 'Explore Morse Media photography collections from New England and beyond.' };

export default function CollectionsPage() {
  return (
    <>
      <section className="page-hero page-hero--tall">
        <Image src="/images/photos/mountain-veil.webp" alt="Foggy autumn mountains and lake" fill priority sizes="100vw" />
        <div className="page-hero__shade" />
        <div className="page-hero__copy"><p className="eyebrow">Photography collections</p><h1>Wild places.<br />Quiet moments.</h1><p>Curated bodies of work organized by place, atmosphere and subject.</p></div>
      </section>
      <section className="collection-index content-section">
        {collections.map((collection, index) => (
          <article className="collection-index__item" key={collection.slug}>
            <Link href={`/collections/${collection.slug}`} className="collection-index__image">
              <Image src={collection.image} alt={collection.name} fill sizes="(max-width: 900px) 100vw, 60vw" />
            </Link>
            <div className="collection-index__copy">
              <span className="index-number">0{index + 1}</span>
              <p className="eyebrow">{collection.eyebrow}</p>
              <h2>{collection.name}</h2>
              <p>{collection.description}</p>
              <Link className="text-link" href={`/collections/${collection.slug}`}>View collection <ArrowRight /></Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
