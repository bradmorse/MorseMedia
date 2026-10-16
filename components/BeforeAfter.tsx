'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import type { Comparison } from '@/data/real-estate';

/** Drag the handle (or use the arrow keys on the slider) to compare an unedited frame with the final image. */
export default function BeforeAfter({ comparison }: { comparison: Comparison }) {
  const [position, setPosition] = useState(50);
  const id = useId();
  return (
    <figure className="before-after">
      <div className="before-after__frame" style={{ ['--split' as string]: `${position}%` }}>
        <Image src={comparison.after.src} alt={comparison.after.alt} fill sizes="(max-width: 900px) 100vw, 70vw" />
        <div className="before-after__before" aria-hidden="true">
          <Image src={comparison.before.src} alt="" fill sizes="(max-width: 900px) 100vw, 70vw" />
        </div>
        <span className="before-after__label before-after__label--before">Before</span>
        <span className="before-after__label before-after__label--after">After</span>
        <span className="before-after__handle" aria-hidden="true" />
        <label className="sr-only" htmlFor={id}>Compare before and after</label>
        <input id={id} className="before-after__range" type="range" min={0} max={100} value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-valuetext={`${position}% before`} />
      </div>
      <figcaption>{comparison.caption}</figcaption>
    </figure>
  );
}
