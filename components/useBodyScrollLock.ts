'use client';

import { useEffect } from 'react';

const ATTRIBUTE = 'data-morse-scroll-locks';

function readCount() {
  if (typeof document === 'undefined') return 0;
  const value = Number.parseInt(document.body.getAttribute(ATTRIBUTE) || '0', 10);
  return Number.isFinite(value) ? value : 0;
}

export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const next = readCount() + 1;
    document.body.setAttribute(ATTRIBUTE, String(next));
    document.body.classList.add('no-scroll');

    return () => {
      const remaining = Math.max(0, readCount() - 1);
      if (remaining === 0) {
        document.body.removeAttribute(ATTRIBUTE);
        document.body.classList.remove('no-scroll');
      } else {
        document.body.setAttribute(ATTRIBUTE, String(remaining));
      }
    };
  }, [active]);
}
