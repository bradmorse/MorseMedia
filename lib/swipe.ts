// Swipe detection for the photo viewers, kept free of React so it can be unit tested.

export type SwipeDirection = 'left' | 'right' | 'down';

/** Minimum travel, in CSS pixels, before a touch counts as a swipe rather than a tap. */
export const SWIPE_DISTANCE = 48;

/**
 * Which way a finished one-finger touch moved, or null for a tap or an unclear diagonal.
 * Sideways swipes need to be clearly more horizontal than vertical; a swipe down (to close)
 * needs a little more travel so a sloppy sideways swipe never closes the viewer.
 */
export function swipeDirection(dx: number, dy: number, minDistance = SWIPE_DISTANCE): SwipeDirection | null {
  if (Math.abs(dx) >= minDistance && Math.abs(dx) > Math.abs(dy) * 1.5) return dx < 0 ? 'left' : 'right';
  if (dy >= minDistance * 1.5 && dy > Math.abs(dx) * 1.5) return 'down';
  return null;
}

/** Index of the photo after stepping forward (1) or back (-1), wrapping at either end. */
export function stepIndex(index: number, step: number, count: number) {
  return ((index + step) % count + count) % count;
}
