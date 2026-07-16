import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import { collections, getCollection, getPhotosForCollection, products } from '@/data/site';

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return { title: collection.name, description: collection.description, openGraph: { images: [collection.image] } };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const collectionPhotos = getPhotosForCollection(slug);
  const collectionProducts = products.filter((product) => product.collection === slug);

  return (
    <>
      <section className="collection-hero">
        <Image src={collection.image} alt={collection.name} fill priority sizes="100vw" />
        <div className="collection-hero__shade" />
        <div className="collection-hero__copy">
          <Link href="/collections" className="back-link">All collections</Link>
          <p className="eyebrow">{collection.eyebrow}</p>
          <h1>{collection.name}</h1>
          <p>{collection.description}</p>
          {collectionProducts.length > 0 && <Link className="button button--solid" href="#available-prints">Shop the collection</Link>}
        </div>
      </section>

      <section className="collection-gallery content-section">
        <div className="section-heading"><div><p className="eyebrow">Selected photographs</p><h2>A visual field journal.</h2></div><span>{collectionPhotos.length} images</span></div>
        <div className="collection-mosaic">
          {collectionPhotos.map((photo, index) => (
            <figure className={`collection-mosaic__item collection-mosaic__item--${photo.orientation} ${index % 5 === 0 ? 'collection-mosaic__item--wide' : ''}`} key={photo.slug}>
              <Link href={`/shop/${photo.slug}`} className="collection-mosaic__link" aria-label={`View ${photo.title} print options`}>
                <div><Image src={photo.image} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
                <figcaption><span>{String(index + 1).padStart(2, '0')}</span>{photo.title}<ArrowRight /></figcaption>
              </Link>
            </figure>
          ))}
        </div>
      </section>

      {collectionProducts.length > 0 && (
        <section id="available-prints" className="content-section collection-products">
          <div className="section-heading"><div><p className="eyebrow">Available prints</p><h2>Bring this collection home.</h2></div><Link className="text-link" href="/shop">Shop all prints <ArrowRight /></Link></div>
          <ProductGrid products={collectionProducts} />
        </section>
      )}
    </>
  );
}
