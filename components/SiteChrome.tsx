'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Mail, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { collections, finishOptions, products } from '@/data/site';
import { useCart } from './CartProvider';
import { useBodyScrollLock } from './useBodyScrollLock';

const navItems = [
  { label: 'Print Shop', href: '/shop' },
  { label: 'Photography', href: '/photography' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const { count, setOpen: setCartOpen } = useCart();

  useBodyScrollLock(menuOpen || searchOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      setSearchOpen(false);
      window.setTimeout(() => searchTriggerRef.current?.focus(), 0);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, searchOpen]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    const finishTerms = finishOptions.map((finish) => `${finish.label} ${finish.description}`).join(' ');
    const productResults = products
      .filter((product) => [product.title, product.type, product.location, product.collection, product.description, product.alt, finishTerms].join(' ').toLowerCase().includes(normalized))
      .map((product) => ({ label: product.title, meta: `${product.type} · From $${product.price}`, href: `/shop/${product.slug}`, image: product.image }));
    const collectionResults = collections
      .filter((collection) => [collection.name, collection.eyebrow, collection.description].join(' ').toLowerCase().includes(normalized))
      .map((collection) => ({ label: collection.name, meta: 'Photography collection', href: `/collections/${collection.slug}`, image: collection.image }));
    return [...collectionResults, ...productResults].slice(0, 8);
  }, [query]);

  function openSearch() {
    setCartOpen(false);
    setMenuOpen(false);
    setSearchOpen(true);
  }

  function toggleMenu() {
    setCartOpen(false);
    setSearchOpen(false);
    setMenuOpen((value) => !value);
  }

  function closeSearch() {
    setSearchOpen(false);
    window.setTimeout(() => searchTriggerRef.current?.focus(), 0);
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <Link href="/" className="brand" aria-label="Morse Media home">
          <Image src="/images/morse-media-logo.png" alt="Morse Media" width={377} height={152} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return <Link className={active ? 'active' : ''} aria-current={active ? 'page' : undefined} key={item.href} href={item.href}>{item.label}</Link>;
          })}
        </nav>
        <div className="header-actions">
          <button ref={searchTriggerRef} className="icon-button" type="button" onClick={openSearch} aria-label="Search prints and collections"><Search /></button>
          <button className="bag-button" type="button" onClick={() => { setMenuOpen(false); setSearchOpen(false); setCartOpen(true); }} aria-label={`Open shopping bag with ${count} item${count === 1 ? '' : 's'}`}>
            <ShoppingBag /><span aria-hidden="true">{count}</span>
          </button>
          <button className="icon-button menu-button" type="button" onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
              <span>0{index + 1}</span>{item.label}<ArrowRight />
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <p>Fine-art photography, cinematic video and thoughtful design.</p>
          <a href="mailto:hello@morsemedia.co" tabIndex={menuOpen ? 0 : -1}>hello@morsemedia.co</a>
        </div>
      </div>

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-labelledby="search-title" onMouseDown={(event) => { if (event.target === event.currentTarget) closeSearch(); }}>
          <button className="icon-button search-overlay__close" type="button" onClick={closeSearch} aria-label="Close search"><X /></button>
          <div className="search-overlay__inner">
            <p id="search-title" className="eyebrow">Search Morse Media</p>
            <label className="sr-only" htmlFor="site-search">Search prints and collections</label>
            <input
              id="site-search"
              type="search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search prints, collections, locations…"
              autoComplete="off"
            />
            {!query && <p className="search-hint">Try “waterfall,” “abandoned,” “Maine,” “moon,” or “metal.”</p>}
            {query && (
              <div className="search-results" aria-live="polite">
                {results.length ? results.map((result) => (
                  <Link href={result.href} className="search-result" key={`${result.href}-${result.label}`} onClick={closeSearch}>
                    <span className="search-result__image"><Image src={result.image} alt="" fill sizes="72px" /></span>
                    <span><strong>{result.label}</strong><small>{result.meta}</small></span>
                    <ArrowRight />
                  </Link>
                )) : <p className="search-hint">No matching prints or collections found.</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <Image src="/images/morse-media-logo.png" alt="Morse Media" width={377} height={152} />
        <p>Original fine-art photography, cinematic video and thoughtful design from New England and beyond.</p>
        <span className="site-footer__location">New England · Available for travel</span>
      </div>
      <div>
        <h4>Shop</h4>
        <Link href="/shop">All prints</Link><Link href="/print-guide">Size & finish guide</Link>
        <Link href="/collections/new-hampshire">New Hampshire</Link>
        <Link href="/collections/forgotten-places">Forgotten Places</Link>
        <Link href="/shipping-returns">Shipping & returns</Link>
      </div>
      <div>
        <h4>Explore</h4>
        <Link href="/photography">Latest photography</Link>
        <Link href="/collections">Collections</Link>
        <Link href="/services">Services</Link>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/about">About</Link>
      </div>
      <div>
        <h4>Contact</h4>
        <Link href="/contact">Start a project</Link>
        <a href="mailto:hello@morsemedia.co"><Mail /> hello@morsemedia.co</a>
      </div>
      <div className="site-footer__bottom">
        <small>© {new Date().getFullYear()} Morse Media. All rights reserved.</small>
        <span className="site-footer__legal"><Link href="/shipping-returns">Shipping & returns</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></span>
      </div>
    </footer>
  );
}
