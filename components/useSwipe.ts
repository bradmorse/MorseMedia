'use client';

import { useRef } from 'react';
import type { TouchEvent } from 'react';
import { swipeDirection, type SwipeDirection } from '@/lib/swipe';

/**
 * Touch handlers for a photo viewer: swipe left/right to change photo, swipe down to close.
 * Two-finger gestures (pinch zoom) and swipes on a zoomed-in page are left to the browser.
 */
export function useSwipe(actions: Partial<Record<SwipeDirection, () => void>>) {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart(event: TouchEvent) {
      const zoomed = (window.visualViewport?.scale ?? 1) > 1.01;
      const touch = event.touches[0];
      start.current = event.touches.length === 1 && !zoomed && touch ? { x: touch.clientX, y: touch.clientY } : null;
    },
    onTouchMove(event: TouchEvent) {
      if (event.touches.length > 1) start.current = null;
    },
    onTouchEnd(event: TouchEvent) {
      const from = start.current;
      start.current = null;
      const touch = event.changedTouches[0];
      if (!from || !touch || event.touches.length > 0) return;
      const direction = swipeDirection(touch.clientX - from.x, touch.clientY - from.y);
      if (direction) actions[direction]?.();
    },
    onTouchCancel() {
      start.current = null;
    },
  };
}
