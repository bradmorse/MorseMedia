import type { Product } from '@/data/site';
import { products as allProducts } from '@/data/site';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = allProducts }: { products?: Product[] }) {
  return (
    <div className="product-grid">
      {products.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );
}
