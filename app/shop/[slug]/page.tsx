import { availablePrintSkus } from '@/lib/store-readiness';
import { siteUrl, breadcrumbs, jsonLd, shareImage, snippet } from '@/lib/seo';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import PrintVisualizer from '@/components/PrintVisualizer';
import { describePhoto } from '@/data/discovery';
import ProductGrid from '@/components/ProductGrid';
import ProductPurchasePanel from '@/components/ProductPurchasePanel';
import { SetCard } from '@/components/SetCards';
import { setForProduct } from '@/lib/sets';
import { storeIsOpen } from '@/lib/store-readiness';
import { calculateUnitPrice, finishOptions, getCollection, getProduct, getSizeOptions, products } from '@/data/site';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const title = `${product.title} — Fine Art Print`;
  const description = snippet(`${product.description} ${product.location || 'New England'} photograph by Bradley Morse. Prints from $${product.price}.`);
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/shop/${product.slug}` },
    openGraph: { title, description, url: `${siteUrl}/shop/${product.slug}`, type: 'website', siteName: 'Morse Media', images: [shareImage(product.image, product.alt)] },
    twitter: { card: 'summary_large_image', title, description, images: [shareImage(product.image).url] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const collection = getCollection(product.collection);
  const color = describePhoto(product.slug).color;
  const set = setForProduct(product.id);
  const related = products
    .filter((entry) => entry.id !== product.id && !set?.pieces.includes(entry.id))
    .sort((a, b) =>
      Number(describePhoto(b.slug).color === color) - Number(describePhoto(a.slug).color === color) ||
      Number(b.collection === product.collection) - Number(a.collection === product.collection))
    .slice(0, 3);
  const sizes = getSizeOptions(product.orientation);
  const prices = sizes.flatMap((size) => finishOptions.map((finish) => calculateUnitPrice(product, size.label, finish.label) || product.price));
  const availableSkus = availablePrintSkus(product);
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.title} — Fine Art Print`,
    image: [`${siteUrl}${product.image}`],
    description: product.description,
    brand: { '@type': 'Brand', name: 'Morse Media' },
    category: 'Fine Art Photography Print',
    material: finishOptions.map((finish) => finish.label).join(', '),
    sku: product.id,
    offers: {
      '@type': 'AggregateOffer',
      url: `${siteUrl}/shop/${product.slug}`,
      priceCurrency: 'USD',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
      availability: availableSkus.length ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Print Shop', path: '/shop' }, { name: product.title, path: `/shop/${product.slug}` }])) }} />
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
        <div>
          <p>This image belongs to the <Link href={`/collections/${product.collection}`}>{collection?.name}</Link> collection. Each piece is produced to order so the material, scale and crop suit the room where it will live.</p>
          <p>Screen colors can vary slightly from the finished print. Interested in using this image commercially? <Link href={`/contact?service=Image%20licensing&photo=${product.slug}`}>Ask about licensing</Link>.</p>
        </div>
      </section>
      {set && (
        <section className="content-section product-set">
          <div className="section-heading"><div><p className="eyebrow">Part of a set</p><h2>Made to hang together.</h2></div><p>{set.hangingNote}</p></div>
          <SetCard set={set} storeOpen={storeIsOpen()} />
        </section>
      )}
      {related.length > 0 && (
        <section className="content-section related-products">
          <div className="section-heading"><div><p className="eyebrow">Pairs well with</p><h2>Build a collection.</h2></div></div>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
