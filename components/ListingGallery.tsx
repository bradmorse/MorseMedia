'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Listing } from '@/data/real-estate-portfolio';
import { stepIndex } from '@/lib/swipe';
import { useBodyScrollLock } from './useBodyScrollLock';
import { useSwipe } from './useSwipe';

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * A listing's photos in posting order (the first one large), with a full-screen viewer:
 * arrows, arrow keys or a swipe to move, a thumbnail strip to jump, swipe down or Esc to close.
 * `placeholders` maps photo src to a tiny blurred preview shown while each tile loads.
 */
export default function ListingGallery({ listing, placeholders = {} }: { listing: Listing; placeholders?: Record<string, string> }) {
  const { photos } = listing;
  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  activeRef.current = active;
  const isOpen = active !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useBodyScrollLock(isOpen);

  function close() {
    const previous = activeRef.current;
    if (previous === null) return;
    setActive(null);
    window.setTimeout(() => triggerRefs.current[previous]?.focus(), 0);
  }

  function move(step: number) {
    setActive((value) => (value === null ? null : stepIndex(value, step, photos.length)));
  }

  const swipe = useSwipe({ left: () => move(1), right: () => move(-1), down: close });

  // Keep keyboard focus inside the viewer while it is open.
  function trapFocus(event: KeyboardEvent) {
    const root = dialogRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const focused = document.activeElement;
    const inside = focused instanceof Node && root.contains(focused);
    if (event.shiftKey && (focused === first || !inside)) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (focused === last || !inside)) { event.preventDefault(); first.focus(); }
  }

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowRight') move(1);
      else if (event.key === 'ArrowLeft') move(-1);
      else if (event.key === 'Tab') trapFocus(event);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, photos.length]);

  // Keep the current photo's thumbnail in view.
  useEffect(() => {
    if (active === null) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    thumbRefs.current[active]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: still ? 'auto' : 'smooth' });
  }, [active]);

  const current = active === null ? null : photos[active];
  const neighbours = active === null || photos.length < 2 ? [] : Array.from(new Set([stepIndex(active, 1, photos.length), stepIndex(active, -1, photos.length)]));
  const blur = (src: string) => (placeholders[src] ? { placeholder: 'blur' as const, blurDataURL: placeholders[src] } : {});
  const stop = (event: { stopPropagation: () => void }) => event.stopPropagation();

  return (
    <>
      <ol className="listing-grid" aria-label={`${listing.title}: ${photos.length} photos`}>
        {photos.map((photo, index) => (
          <li className={index === 0 ? 'listing-tile listing-tile--feature' : 'listing-tile'} key={photo.src}>
            <button
              ref={(element) => { triggerRefs.current[index] = element; }}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Open photo ${index + 1} of ${photos.length}: ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={index === 0}
                sizes={index === 0 ? '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 66vw' : '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw'}
                {...blur(photo.src)}
              />
              <span className="listing-tile__label"><small>{pad(index + 1)} · {photo.group}</small><strong>{photo.caption}</strong></span>
            </button>
          </li>
        ))}
      </ol>
      {current && active !== null && (
        <div ref={dialogRef} className="lightbox listing-lightbox" role="dialog" aria-modal="true" aria-labelledby="listing-lightbox-title" onMouseDown={close}>
          <button ref={closeButtonRef} className="icon-button lightbox__close" type="button" onClick={close} aria-label="Close photo"><X /></button>
          <button className="icon-button lightbox__prev" type="button" onMouseDown={stop} onClick={() => move(-1)} aria-label="Previous photo"><ChevronLeft /></button>
          <figure onMouseDown={stop} {...swipe}>
            <div className="lightbox__image">
              <Image src={current.src} alt={current.alt} fill sizes="95vw" priority />
            </div>
            <figcaption aria-live="polite"><span>{pad(active + 1)} / {pad(photos.length)}</span><strong id="listing-lightbox-title">{current.caption}</strong><small>{current.group}</small></figcaption>
          </figure>
          <button className="icon-button lightbox__next" type="button" onMouseDown={stop} onClick={() => move(1)} aria-label="Next photo"><ChevronRight /></button>
          <div className="listing-lightbox__thumbs" role="group" aria-label="Jump to a photo" onMouseDown={stop}>
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                ref={(element) => { thumbRefs.current[index] = element; }}
                className="listing-lightbox__thumb"
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Photo ${index + 1}: ${photo.caption}`}
                aria-current={index === active ? 'true' : undefined}
              >
                <Image src={photo.src} alt="" width={96} height={64} sizes="64px" />
              </button>
            ))}
          </div>
          {/* The photos either side load in the background so the next swipe is instant. */}
          <div className="listing-lightbox__preload" aria-hidden="true">
            {neighbours.map((index) => (
              <Image key={photos[index].src} src={photos[index].src} alt="" width={photos[index].width} height={photos[index].height} sizes="95vw" loading="eager" />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
