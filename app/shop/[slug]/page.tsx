import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import ProductPurchasePanel from '@/components/ProductPurchasePanel';
import { calculateUnitPrice, finishOptions, getCollection, getProduct, getSizeOptions, products } from '@/data/site';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: `${product.description} Available as a fine-art photography print from Morse Media.`,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { title: product.title, description: product.description, images: [{ url: product.image, alt: product.alt }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const collection = getCollection(product.collection);
  const related = products.filter((entry) => entry.collection === product.collection && entry.id !== product.id).slice(0, 3);
  const sizes = getSizeOptions(product.orientation);
  const prices = sizes.flatMap((size) => finishOptions.map((finish) => calculateUnitPrice(product, size.label, finish.label) || product.price));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://morsemedia.co';
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: [`${siteUrl}${product.image}`],
    description: product.description,
    brand: { '@type': 'Brand', name: 'Morse Media' },
    category: 'Fine Art Photography Print',
    offers: {
      '@type': 'AggregateOffer',
      url: `${siteUrl}/shop/${product.slug}`,
      priceCurrency: 'USD',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }} />
      <section className="product-detail">
        <div className={`product-detail__image product-detail__image--${product.orientation}`}>
          <Image src={product.image} alt={product.alt} fill priority quality={90} sizes="(max-width: 900px) 100vw, 58vw" />
        </div>
        <div className="product-detail__copy">
          <Link className="back-link" href="/shop"><ArrowLeft /> Back to print shop</Link>
          <p className="eyebrow">{product.type} · {product.location}</p>
          <h1>{product.title}</h1>
          <p className="product-detail__description">{product.description}</p>
          <ProductPurchasePanel product={product} />
        </div>
      </section>
      <section className="product-story content-section">
        <div><p className="eyebrow">The photograph</p><h2>A piece of the journey.</h2></div>
        <div><p>This image belongs to the <Link href={`/collections/${product.collection}`}>{collection?.name}</Link> collection. Each piece is produced to order so the final material, scale and crop can be chosen for the room where it will live.</p><p>Screen colors may vary slightly from the final print. Shipping details and payment are completed securely on this website; production is routed through the configured fulfillment workflow.</p></div>
      </section>
      {related.length > 0 && (
        <section className="content-section related-products">
          <div className="section-heading"><div><p className="eyebrow">From the same collection</p><h2>Continue exploring.</h2></div></div>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
