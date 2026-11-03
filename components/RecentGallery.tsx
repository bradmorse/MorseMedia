'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { recentWork } from '@/data/recent-work';
import { useBodyScrollLock } from './useBodyScrollLock';
import { useSwipe } from './useSwipe';
import { PRINT_SHOP_ENABLED } from '@/data/features';

/** Recent work grid with a full-screen viewer (arrows, arrow keys or swipe). `placeholders` maps image src to a blurred preview. */
export default function RecentGallery({ placeholders = {} }: { placeholders?: Record<string, string> }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const openedFrom = useRef(0);
  useBodyScrollLock(open);
  const photo = recentWork[active];
  function close() { dialog.current?.close(); }
  function move(step: number) { setActive(value => (value + step + recentWork.length) % recentWork.length); }
  const swipe = useSwipe({ left: () => move(1), right: () => move(-1), down: close });
  const blur = (src: string) => (placeholders[src] ? { placeholder: 'blur' as const, blurDataURL: placeholders[src] } : {});
  return <>
    <div className="recent-grid">
      {recentWork.map((item, index) => <button className="recent-card" key={item.slug} ref={el => { triggers.current[index] = el; }} onClick={() => { openedFrom.current = index; setActive(index); setOpen(true); dialog.current?.showModal(); }}>
        <span className="recent-card__image"><Image src={item.image} alt={item.alt} width={750} height={1000} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 23vw" {...blur(item.image)} /><span className="recent-card__expand"><ArrowUpRight aria-hidden="true" /></span></span>
        <span className="recent-card__caption"><span><small>0{index + 1} / Autumn studies</small><strong>{item.title}</strong></span><ArrowUpRight aria-hidden="true" /></span>
      </button>)}
    </div>
    <dialog className="recent-dialog" ref={dialog} aria-labelledby="recent-title" onClose={() => { setOpen(false); triggers.current[openedFrom.current]?.focus(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } }}>
      {open && <div className="recent-dialog__content" {...swipe}>
        <button className="icon-button recent-dialog__close" onClick={close} aria-label="Close photograph" autoFocus><X /></button>
        <Image src={photo.image} alt={photo.alt} width={750} height={1000} sizes="(max-width: 600px) 90vw, 60vw" />
        <div className="recent-dialog__caption"><button className="icon-button" onClick={() => move(-1)} aria-label="Previous photograph"><ChevronLeft /></button><div aria-live="polite"><small>{active + 1} / {recentWork.length}</small><h2 id="recent-title">{photo.title}</h2>{PRINT_SHOP_ENABLED && <Link href={`/photography/${photo.slug}`}>View photograph story ↗</Link>}</div><button className="icon-button" onClick={() => move(1)} aria-label="Next photograph"><ChevronRight /></button></div>
      </div>}
    </dialog>
  </>;
}
