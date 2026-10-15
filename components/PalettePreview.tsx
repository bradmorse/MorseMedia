'use client';
import { useEffect, useState } from 'react';
const palettes = [
  { id: 'forest', name: 'Evergreen', description: 'Deep green, soft ivory and muted sage. A natural extension of your landscape work.', colors: ['#0d1412','#19241e','#b6c9a5','#f2f1e9'] },
  { id: 'charcoal', name: 'Gallery Charcoal', description: 'Cool charcoal and silver. Quiet, cinematic and close to the original site.', colors: ['#0c0e0f','#181b1c','#c4cecf','#f2f2ee'] },
  { id: 'copper', name: 'Copper & Ink', description: 'Warm black, sandstone and copper. Draws out the autumn colors without competing with them.', colors: ['#17120f','#27201b','#dfb18c','#f6eee3'] },
];
export default function PalettePreview() {
  const [selected,setSelected] = useState('forest');
  useEffect(() => { document.documentElement.dataset.palette = selected; return () => { delete document.documentElement.dataset.palette; }; },[selected]);
  return <section className="palette-panel"><p className="eyebrow">Morse Media · Color study</p><h1>Three moods. Your photography.</h1><p>Choose a palette to see it on the homepage below. These choices are a preview only.</p><div className="palette-options">{palettes.map(p => <button key={p.id} aria-pressed={selected === p.id} onClick={() => setSelected(p.id)}><span className="palette-swatches">{p.colors.map(color => <i key={color} style={{background:color}} />)}</span><strong>{p.name}</strong><span>{p.description}</span></button>)}</div></section>;
}
