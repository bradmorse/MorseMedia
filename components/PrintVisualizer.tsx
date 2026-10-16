'use client';
import Image from 'next/image';
import { useState } from 'react';
import { finishOptions, getSizeOptions, type Product } from '@/data/site';

// Maps each real finish to its preview treatment (previously the labels didn't match the store's finishes).
const finishClass: Record<string, string> = { 'Fine Art Paper': 'paper', Canvas: 'canvas', Metal: 'metal', Framed: 'framed' };
const walls = [['Warm white', '#d9d4c8'], ['Sage', '#99a18d'], ['Charcoal', '#454945']] as const;

export default function PrintVisualizer({ product }: { product: Product }) {
  const sizes = getSizeOptions(product.orientation);
  const [size, setSize] = useState(sizes[1].label);
  const [wall, setWall] = useState<string>(walls[0][1]);
  const [finish, setFinish] = useState('Framed');
  const [w, h] = size.split(' × ').map(parseFloat);
  // Width is landscape-first in the label for landscape prints and short-edge-first for portrait prints.
  const [artW, artH] = product.orientation === 'landscape' ? [Math.max(w, h), Math.min(w, h)] : [Math.min(w, h), Math.max(w, h)];
  return (
    <section className="content-section print-visualizer">
      <div className="section-heading"><div><p className="eyebrow">Find your scale</p><h2>Picture it in your space.</h2></div><p>Illustrative scale against an 84-inch sofa. Artwork dimensions exclude any frame or mat; final crop and materials may differ.</p></div>
      <div className="room-scene" style={{ background: wall }} role="img" aria-label={`${product.title}, ${size}, ${finish} presentation above an 84-inch sofa`}>
        <div className={`room-art room-art--${finishClass[finish] || 'paper'}`} style={{ width: `${(artW / 120) * 100}%`, aspectRatio: `${artW}/${artH}` }}><Image src={product.image} alt="" fill sizes="40vw" /></div>
        <div className="room-sofa"><span /><span /><span /></div>
        <div className="room-floor" />
      </div>
      <div className="visualizer-controls">
        <label>Artwork size<select value={size} onChange={e => setSize(e.target.value)}>{sizes.map(s => <option key={s.label}>{s.label}</option>)}</select></label>
        <label>Presentation<select value={finish} onChange={e => setFinish(e.target.value)}>{finishOptions.map(f => <option key={f.label}>{f.label}</option>)}</select></label>
        <fieldset><legend>Wall color</legend>{walls.map(([name, c]) => <button type="button" key={c} aria-label={name} aria-pressed={wall === c} style={{ background: c }} onClick={() => setWall(c)} />)}</fieldset>
      </div>
      <p className="form-note">This tool changes the preview only. Select your order size and finish above.</p>
    </section>
  );
}
