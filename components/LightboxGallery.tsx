'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Photo } from '@/data/site';
import { useBodyScrollLock } from './useBodyScrollLock';

export default function LightboxGallery({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useBodyScrollLock(active !== null);

  useEffect(() => {
    if (active === null) return;
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const previous = active;
        setActive(null);
        window.setTimeout(() => triggerRefs.current[previous]?.focus(), 0);
      }
      if (event.key === 'ArrowRight') setActive((value) => value === null ? null : (value + 1) % photos.length);
      if (event.key === 'ArrowLeft') setActive((value) => value === null ? null : (value - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, photos.length]);

  function close() {
    if (active === null) return;
    const previous = active;
    setActive(null);
    window.setTimeout(() => triggerRefs.current[previous]?.focus(), 0);
  }

  return (
    <>
      <div className="portfolio-masonry">
        {photos.map((photo, index) => (
          <button
            ref={(element) => { triggerRefs.current[index] = element; }}
            className={`portfolio-tile portfolio-tile--${photo.orientation}`}
            type="button"
            key={photo.slug}
            onClick={() => setActive(index)}
            aria-label={`Open ${photo.title} in gallery`}
          >
            <Image src={photo.image} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
            <span><small>{photo.collection.replaceAll('-', ' ')}</small><strong>{photo.title}</strong></span>
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" onMouseDown={close}>
          <button ref={closeButtonRef} className="icon-button lightbox__close" type="button" onClick={close} aria-label="Close image"><X /></button>
          <button className="icon-button lightbox__prev" type="button" onClick={(event) => { event.stopPropagation(); setActive((active - 1 + photos.length) % photos.length); }} aria-label="Previous image"><ChevronLeft /></button>
          <figure onMouseDown={(event) => event.stopPropagation()}>
            <div className={`lightbox__image lightbox__image--${photos[active].orientation}`}>
              <Image src={photos[active].image} alt={photos[active].alt} fill sizes="95vw" priority />
            </div>
            <figcaption><span>{String(active + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span><strong id="lightbox-title">{photos[active].title}</strong><Link href={`/shop/${photos[active].slug}`}>View print</Link></figcaption>
          </figure>
          <button className="icon-button lightbox__next" type="button" onClick={(event) => { event.stopPropagation(); setActive((active + 1) % photos.length); }} aria-label="Next image"><ChevronRight /></button>
        </div>
      )}
    </>
  );
}
