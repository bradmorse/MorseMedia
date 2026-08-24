'use client';

import Image from 'next/image';
import Link from 'next/link';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { calculateUnitPrice, finishOptions, getSizeOptions, products } from '@/data/site';
import { formatCurrency } from '@/lib/format';
import { useBodyScrollLock } from './useBodyScrollLock';

type AddOptions = {
  size?: string;
  finish?: string;
};

export type CartItem = {
  key: string;
  id: string;
  qty: number;
  size: string;
  finish: string;
  unitPrice: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (id: string, options?: AddOptions) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (value: boolean) => void;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'morse-media-cart-v4';
const MAX_QUANTITY = 20;

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<CartItem>;
  return typeof item.key === 'string' && typeof item.id === 'string' &&
    Number.isInteger(item.qty) && Number(item.qty) > 0 && Number(item.qty) <= MAX_QUANTITY &&
    typeof item.size === 'string' && typeof item.finish === 'string' &&
    typeof item.unitPrice === 'number' && Number.isFinite(item.unitPrice);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(parsed)) {
        const restored = parsed.filter(isCartItem).flatMap((item) => {
          const product = products.find((entry) => entry.id === item.id);
          if (!product) return [];
          const unitPrice = calculateUnitPrice(product, item.size, item.finish);
          return unitPrice === null ? [] : [{ ...item, unitPrice }];
        });
        setItems(restored);
      }
    } catch {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* Storage can be unavailable in private browsing. */ }
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* Cart still works for the current session. */ }
  }, [hydrated, items]);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const add = (id: string, options: AddOptions = {}) => {
    const product = products.find((entry) => entry.id === id);
    if (!product) return;

    const defaultSize = getSizeOptions(product.orientation)[0].label;
    const size = options.size || defaultSize;
    const finish = options.finish || finishOptions[0].label;
    const unitPrice = calculateUnitPrice(product, size, finish);
    if (unitPrice === null) return;
    const key = `${id}::${size}::${finish}`;

    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      return existing
        ? current.map((item) => item.key === key ? { ...item, qty: Math.min(MAX_QUANTITY, item.qty + 1) } : item)
        : [...current, { key, id, qty: 1, size, finish, unitPrice }];
    });
    setAnnouncement(`${product.title} was added to your bag.`);
    setOpen(true);
  };

  const increment = (key: string) => setItems((current) => current.map((item) => item.key === key ? { ...item, qty: Math.min(MAX_QUANTITY, item.qty + 1) } : item));
  const decrement = (key: string) => setItems((current) => current.flatMap((item) => item.key !== key ? [item] : item.qty > 1 ? [{ ...item, qty: item.qty - 1 }] : []));
  const remove = (key: string) => setItems((current) => current.filter((item) => item.key !== key));
  const clear = () => setItems([]);
  const count = useMemo(() => items.reduce((total, item) => total + item.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((total, item) => total + item.unitPrice * item.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, add, increment, decrement, remove, clear, count, subtotal, open, setOpen, hydrated }}>
      {children}
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
      {open && (
        <div className="drawer-layer" role="presentation" onMouseDown={() => setOpen(false)}>
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="cart-drawer__header">
              <div>
                <p className="eyebrow">Your bag</p>
                <h2 id="cart-title">Selected prints</h2>
              </div>
              <button ref={closeButtonRef} className="icon-button" type="button" onClick={() => setOpen(false)} aria-label="Close bag"><X /></button>
            </div>

            {items.length === 0 ? (
              <div className="empty-state">
                <ShoppingBag />
                <h3>Your bag is empty.</h3>
                <p>Explore the print shop and add a photograph to begin.</p>
                <Link className="button" href="/shop" onClick={() => setOpen(false)}>Browse prints</Link>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map((item) => {
                    const product = products.find((entry) => entry.id === item.id);
                    if (!product) return null;
                    return (
                      <div className="cart-row" key={item.key}>
                        <Link href={`/shop/${product.slug}`} onClick={() => setOpen(false)} className="cart-row__image">
                          <Image src={product.image} alt="" fill sizes="90px" />
                        </Link>
                        <div className="cart-row__copy">
                          <strong>{product.title}</strong>
                          <small>{item.size} · {item.finish}</small>
                          <div className="quantity-control" aria-label={`Quantity for ${product.title}`}>
                            <button type="button" onClick={() => decrement(item.key)} aria-label="Decrease quantity"><Minus /></button>
                            <span aria-live="polite">{item.qty}</span>
                            <button type="button" onClick={() => increment(item.key)} disabled={item.qty >= MAX_QUANTITY} aria-label="Increase quantity"><Plus /></button>
                          </div>
                        </div>
                        <div className="cart-row__price">
                          <span>{formatCurrency(item.unitPrice * item.qty)}</span>
                          <button type="button" onClick={() => remove(item.key)} aria-label={`Remove ${product.title}`}><Trash2 /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="cart-summary">
                  <div><span>Estimated subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
                  <p>Shipping details and secure payment are completed without leaving the Morse Media website.</p>
                  <Link className="button button--solid button--wide" href="/checkout" onClick={() => setOpen(false)}>Secure checkout</Link>
                  <button className="text-button" type="button" onClick={clear}>Clear bag</button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
