'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Listing } from '@/data/real-estate-portfolio';
import { useBodyScrollLock } from './useBodyScrollLock';

const pad = (value: number) => String(value).padStart(2, '0');

/** A listing's photos in posting order (the first one large), with a full-screen viewer. */
export default function ListingGallery({ listing }: { listing: Listing }) {
  const { photos } = listing;
  const [active, setActive] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useBodyScrollLock(active !== null);

  function close() {
    if (active === null) return;
    const previous = active;
    setActive(null);
    window.setTimeout(() => triggerRefs.current[previous]?.focus(), 0);
  }

  function move(step: number) {
    setActive((value) => (value === null ? null : (value + step + photos.length) % photos.length));
  }

  useEffect(() => {
    if (active === null) return;
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, photos.length]);

  const current = active === null ? null : photos[active];

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
              />
              <span className="listing-tile__label"><small>{pad(index + 1)} · {photo.group}</small><strong>{photo.caption}</strong></span>
            </button>
          </li>
        ))}
      </ol>
      {current && active !== null && (
        <div className="lightbox listing-lightbox" role="dialog" aria-modal="true" aria-labelledby="listing-lightbox-title" onMouseDown={close}>
          <button ref={closeButtonRef} className="icon-button lightbox__close" type="button" onClick={close} aria-label="Close photo"><X /></button>
          <button className="icon-button lightbox__prev" type="button" onMouseDown={(event) => event.stopPropagation()} onClick={() => move(-1)} aria-label="Previous photo"><ChevronLeft /></button>
          <figure onMouseDown={(event) => event.stopPropagation()}>
            <div className="lightbox__image">
              <Image src={current.src} alt={current.alt} fill sizes="95vw" priority />
            </div>
            <figcaption aria-live="polite"><span>{pad(active + 1)} / {pad(photos.length)}</span><strong id="listing-lightbox-title">{current.caption}</strong><small>{current.group}</small></figcaption>
          </figure>
          <button className="icon-button lightbox__next" type="button" onMouseDown={(event) => event.stopPropagation()} onClick={() => move(1)} aria-label="Next photo"><ChevronRight /></button>
        </div>
      )}
    </>
  );
}
