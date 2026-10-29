'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Mail, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { collections, finishOptions, products } from '@/data/site';
import { recentWork } from '@/data/recent-work';
import { servicePages, servicePath } from '@/data/services';
import { areas } from '@/data/areas';
import { business } from '@/data/business';
import { PRINT_SHOP_ENABLED } from '@/data/features';
import { useCart } from './CartProvider';
import { useBodyScrollLock } from './useBodyScrollLock';

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Real Estate', href: '/real-estate' },
  { label: 'Portfolio', href: '/portfolio' },
  ...(PRINT_SHOP_ENABLED ? [{ label: 'Prints', href: '/shop' }] : []),
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const quoteHref = '/contact?service=Photo%20%2B%20video%20project';

const areaTerms = areas.flatMap((area) => [area.name, ...area.towns]).join(' ');

type SearchResult = { label: string; meta: string; href: string; image?: string };

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ storeOpen = false }: { storeOpen?: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const { count, setOpen: setCartOpen } = useCart();
  const showBag = PRINT_SHOP_ENABLED && (storeOpen || count > 0);

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

  const results = useMemo<SearchResult[]>(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    const matches = (...fields: (string | undefined)[]) => fields.join(' ').toLowerCase().includes(normalized);
    const finishTerms = finishOptions.map((finish) => `${finish.label} ${finish.description}`).join(' ');
    const productResults = products
      .filter((product) => matches(product.title, product.type, product.location, product.collection, product.description, product.alt, finishTerms))
      .map((product) => ({ label: product.title, meta: `Print · From $${product.price}`, href: `/shop/${product.slug}`, image: product.image }));
    const photoResults = recentWork
      .filter((photo) => matches(photo.title, photo.alt, 'autumn fall foliage'))
      .map((photo) => ({ label: photo.title, meta: 'Autumn studies · Photograph', href: `/photography/${photo.slug}`, image: photo.image }));
    const collectionResults = collections
      .filter((collection) => matches(collection.name, collection.eyebrow, collection.description))
      .map((collection) => ({ label: collection.name, meta: 'Photography collection', href: `/collections/${collection.slug}`, image: collection.image }));
    const serviceResults = servicePages
      .filter((service) => matches(service.name, service.type, service.intro, service.deliverables.join(' ')))
      .map((service) => ({ label: service.name, meta: 'Photo & video service', href: servicePath(service.slug) }));
    const areaResults = areas
      .filter((area) => matches(area.name, area.towns.join(' ')))
      .map((area) => ({ label: area.name, meta: 'Area served', href: `/areas/${area.slug}`, image: area.image }));
    const pageResults = [
      ...(PRINT_SHOP_ENABLED ? [{ label: 'Curated print sets', meta: 'Save on a complete set', href: '/shop#sets', terms: 'set bundle pair trio wall gallery discount' }] : []),
      { label: 'Get a quote', meta: 'Tell me about your project', href: quoteHref, terms: 'contact quote book booking hire availability email' },
      { label: 'Services & pricing', meta: 'Packages and starting prices', href: '/services#packages', terms: 'price pricing cost rates packages quote headshots headshot portraits event events wedding conference' },
      { label: 'Areas served', meta: `Nashville & ${business.region}`, href: '/areas', terms: `nashville tennessee tn middle ${areaTerms}` },
    ].filter((page) => matches(page.label, page.terms)).map(({ label, meta, href }) => ({ label, meta, href }));
    const printResults = PRINT_SHOP_ENABLED ? [...collectionResults, ...photoResults, ...productResults] : [];
    return [...serviceResults, ...pageResults, ...areaResults, ...printResults].slice(0, 10);
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
          <Image src="/images/morse-media-logo-inline.png" alt="Morse Media" width={176} height={48} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return <Link className={active ? 'active' : ''} aria-current={active ? 'page' : undefined} key={item.href} href={item.href}>{item.label}</Link>;
          })}
        </nav>
        <div className="header-actions">
          <Link className="button button--solid header-cta" href={quoteHref}>Get a quote</Link>
          <button ref={searchTriggerRef} className="icon-button" type="button" onClick={openSearch} aria-label="Search the site"><Search /></button>
          {showBag && (
            <button className="bag-button" type="button" onClick={() => { setMenuOpen(false); setSearchOpen(false); setCartOpen(true); }} aria-label={`Open shopping bag with ${count} item${count === 1 ? '' : 's'}`}>
              <ShoppingBag /><span aria-hidden="true">{count}</span>
            </button>
          )}
          <button className="icon-button menu-button" type="button" onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1} aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}>
              <span>0{index + 1}</span>{item.label}<ArrowRight />
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <Link className="button button--solid mobile-menu__cta" href={quoteHref} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>Get a quote</Link>
          <p>Photography and cinematic video · {business.baseShort}</p>
          <a href={`mailto:${business.email}`} tabIndex={menuOpen ? 0 : -1}>{business.email}</a>
        </div>
      </div>

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-labelledby="search-title" onMouseDown={(event) => { if (event.target === event.currentTarget) closeSearch(); }}>
          <button className="icon-button search-overlay__close" type="button" onClick={closeSearch} aria-label="Close search"><X /></button>
          <div className="search-overlay__inner">
            <p id="search-title" className="eyebrow">Search Morse Media</p>
            <label className="sr-only" htmlFor="site-search">{PRINT_SHOP_ENABLED ? 'Search photographs, prints, collections and services' : 'Search services, areas and pricing'}</label>
            <input
              id="site-search"
              type="search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={PRINT_SHOP_ENABLED ? "Search photographs, places, services…" : "Search services, areas, pricing…"}
              autoComplete="off"
            />
            {!query && <p className="search-hint">Try “headshots,” “real estate,” “video,” “Franklin,” or “pricing.”</p>}
            {query && (
              <div className="search-results" aria-live="polite">
                {results.length ? results.map((result) => (
                  <Link href={result.href} className="search-result" key={`${result.href}-${result.label}`} onClick={closeSearch}>
                    <span className="search-result__image">{result.image ? <Image src={result.image} alt="" fill sizes="72px" /> : <span className="search-result__mark" aria-hidden="true">MM</span>}</span>
                    <span><strong>{result.label}</strong><small>{result.meta}</small></span>
                    <ArrowRight />
                  </Link>
                )) : <p className="search-hint">Nothing matched. Try a place, subject or service — or <Link href="/contact" onClick={closeSearch}>ask directly</Link>.</p>}
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
        <Image src="/images/morse-media-logo-inline.png" alt="Morse Media" width={227} height={61} />
        <p>Photography and cinematic video for Nashville businesses, agents and brands{PRINT_SHOP_ENABLED ? ' — plus original fine-art prints' : ''}.</p>
        <span className="site-footer__location">{business.base} · Available for travel</span>
        <nav className="site-footer__areas" aria-label="Areas served">
          {areas.map((area) => <Link key={area.slug} href={`/areas/${area.slug}`}>{area.name}</Link>)}
        </nav>
      </div>
      <div>
        <h4>Services</h4>
        {servicePages.map((service) => <Link key={service.slug} href={servicePath(service.slug)}>{service.name}</Link>)}
        <Link href="/services#packages">Packages &amp; pricing</Link>
      </div>
      {PRINT_SHOP_ENABLED ? (
        <div>
          <h4>Prints &amp; more</h4>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/photography">Latest photography</Link>
          <Link href="/shop">Print shop</Link>
          <Link href="/print-guide">Size & finish guide</Link>
          <Link href="/about">About</Link>
        </div>
      ) : (
        <div>
          <h4>Studio</h4>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/real-estate">For real estate agents</Link>
          <Link href="/areas">Areas served</Link>
          <Link href="/about">About</Link>
        </div>
      )}
      <div>
        <h4>Contact</h4>
        <Link href={quoteHref}>Get a quote</Link>
        <Link href="/contact?service=Image%20licensing">License an image</Link>
        <a href={`mailto:${business.email}`}><Mail /> {business.email}</a>
      </div>
      <div className="site-footer__bottom">
        <small>© {new Date().getFullYear()} Morse Media · Bradley Morse. All rights reserved.</small>
        <span className="site-footer__legal">{PRINT_SHOP_ENABLED && <Link href="/shipping-returns">Shipping & returns</Link>}<Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></span>
      </div>
    </footer>
  );
}
