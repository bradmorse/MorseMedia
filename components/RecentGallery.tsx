'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { recentWork } from '@/data/recent-work';
import { useBodyScrollLock } from './useBodyScrollLock';

export default function RecentGallery() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const openedFrom = useRef(0);
  useBodyScrollLock(open);
  const photo = recentWork[active];
  function close() { dialog.current?.close(); }
  function move(step: number) { setActive(value => (value + step + recentWork.length) % recentWork.length); }
  return <>
    <div className="recent-grid">
      {recentWork.map((item, index) => <button className="recent-card" key={item.slug} ref={el => { triggers.current[index] = el; }} onClick={() => { openedFrom.current = index; setActive(index); setOpen(true); dialog.current?.showModal(); }} aria-label={`View ${item.title}`}>
        <span className="recent-card__image"><Image src={item.image} alt={item.alt} width={750} height={1000} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 23vw" /><span className="recent-card__expand"><ArrowUpRight aria-hidden="true" /></span></span>
        <span className="recent-card__caption"><span><small>0{index + 1} / Autumn studies</small><strong>{item.title}</strong></span><ArrowUpRight aria-hidden="true" /></span>
      </button>)}
    </div>
    <dialog className="recent-dialog" ref={dialog} aria-labelledby="recent-title" onClose={() => { setOpen(false); triggers.current[openedFrom.current]?.focus(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } }}>
      {open && <div className="recent-dialog__content">
        <button className="icon-button recent-dialog__close" onClick={close} aria-label="Close photograph" autoFocus><X /></button>
        <Image src={photo.image} alt={photo.alt} width={750} height={1000} sizes="(max-width: 600px) 90vw, 60vw" />
        <div className="recent-dialog__caption"><button className="icon-button" onClick={() => move(-1)} aria-label="Previous photograph"><ChevronLeft /></button><div aria-live="polite"><small>{active + 1} / {recentWork.length}</small><h2 id="recent-title">{photo.title}</h2><Link href={`/photography/${photo.slug}`}>View photograph story ↗</Link></div><button className="icon-button" onClick={() => move(1)} aria-label="Next photograph"><ChevronRight /></button></div>
      </div>}
    </dialog>
  </>;
}
