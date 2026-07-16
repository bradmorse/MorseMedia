'use client';

import { useMemo, useState } from 'react';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { collections, products } from '@/data/site';
import ProductGrid from './ProductGrid';

export default function ShopCatalog() {
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState('all');
  const [orientation, setOrientation] = useState('all');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = products.filter((product) => {
      const collectionName = collections.find((entry) => entry.slug === product.collection)?.name || '';
      const matchesQuery = !normalized || [product.title, product.location, product.description, product.alt, collectionName].join(' ').toLowerCase().includes(normalized);
      const matchesCollection = collection === 'all' || product.collection === collection;
      const matchesOrientation = orientation === 'all' || product.orientation === orientation;
      return matchesQuery && matchesCollection && matchesOrientation;
    });

    return [...result].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'title') return a.title.localeCompare(b.title);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.title.localeCompare(b.title);
    });
  }, [collection, orientation, query, sort]);

  const hasFilters = Boolean(query) || collection !== 'all' || orientation !== 'all' || sort !== 'featured';

  function resetFilters() {
    setQuery('');
    setCollection('all');
    setOrientation('all');
    setSort('featured');
  }

  return (
    <div className="shop-catalog">
      <div className="shop-toolbar">
        <label className="shop-search">
          <span className="sr-only">Search prints</span>
          <Search />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search prints" autoComplete="off" />
        </label>
        <label><span>Collection</span>
          <select value={collection} onChange={(event) => setCollection(event.target.value)}>
            <option value="all">All collections</option>
            {collections.map((entry) => <option value={entry.slug} key={entry.slug}>{entry.name}</option>)}
          </select>
        </label>
        <label><span>Orientation</span>
          <select value={orientation} onChange={(event) => setOrientation(event.target.value)}>
            <option value="all">All orientations</option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
          </select>
        </label>
        <label><span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>
      <div className="shop-results-bar">
        <div className="shop-results-count" aria-live="polite"><SlidersHorizontal /> {filtered.length} print{filtered.length === 1 ? '' : 's'}</div>
        <button className="reset-filters" type="button" onClick={resetFilters} disabled={!hasFilters}><RotateCcw /> Reset filters</button>
      </div>
      {filtered.length ? <ProductGrid products={filtered} /> : <div className="empty-results"><h2>No prints found.</h2><p>Try clearing a filter or using a broader search.</p><button className="button" type="button" onClick={resetFilters}>Show all prints</button></div>}
    </div>
  );
}
