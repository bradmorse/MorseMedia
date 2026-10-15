import { availablePrintSkus } from '@/lib/store-readiness';
import { siteUrl, breadcrumbs, jsonLd } from '@/lib/seo';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import PrintVisualizer from '@/components/PrintVisualizer';
import { describePhoto } from '@/data/discovery';
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
  const related = products.filter(entry => entry.id !== product.id).sort((a,b) => Number(describePhoto(b.slug).color === describePhoto(product.slug).color) - Number(describePhoto(a.slug).color === describePhoto(product.slug).color)).slice(0,3);
  const sizes = getSizeOptions(product.orientation);
  const prices = sizes.flatMap((size) => finishOptions.map((finish) => calculateUnitPrice(product, size.label, finish.label) || product.price));
  const availableSkus = availablePrintSkus(product);
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
      availability: availableSkus.length ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumbs([{name:"Home",path:"/"},{name:"Print Shop",path:"/shop"},{name:product.title,path:`/shop/${product.slug}`}]))}} />
      <section className="product-detail">
        <div className={`product-detail__image product-detail__image--${product.orientation}`}>
          <Image src={product.image} alt={product.alt} fill priority quality={90} sizes="(max-width: 900px) 100vw, 58vw" />
        </div>
        <div className="product-detail__copy">
          <Link className="back-link" href="/shop"><ArrowLeft /> Back to print shop</Link>
          <p className="eyebrow">{product.type} · {product.location}</p>
          <h1>{product.title}</h1>
          <p className="product-detail__description">{product.description}</p>
          <ProductPurchasePanel product={product} availableSkus={availableSkus} />
        </div>
      </section>
      <PrintVisualizer product={product} />
      <section className="product-story content-section">
        <div><p className="eyebrow">The photograph</p><h2>A piece of the journey.</h2></div>
        <div><p>This image belongs to the <Link href={`/collections/${product.collection}`}>{collection?.name}</Link> collection. Each piece is produced to order so the final material, scale and crop can be chosen for the room where it will live.</p><p>Screen colors may vary slightly from the final print. Shipping details and payment are completed securely on this website; contact us for current print availability and production details.</p></div>
      </section>
      {related.length > 0 && (
        <section className="content-section related-products">
          <div className="section-heading"><div><p className="eyebrow">Pairs well with</p><h2>Build a collection.</h2></div></div>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
