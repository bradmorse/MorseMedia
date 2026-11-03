import { blurPlaceholders } from '@/data/blur-placeholders';

/**
 * next/image props that show a blurred preview of a photo while it loads.
 * Images without a placeholder (logos, artwork with transparency) get nothing extra.
 */
export function blurProps(src: string): { placeholder?: 'blur'; blurDataURL?: string } {
  const blurDataURL = blurPlaceholders[src];
  return blurDataURL ? { placeholder: 'blur', blurDataURL } : {};
}

/** The placeholders for a set of photos, to hand to a client component. */
export function placeholdersFor(srcs: string[]): Record<string, string> {
  return Object.fromEntries(srcs.flatMap((src) => (blurPlaceholders[src] ? [[src, blurPlaceholders[src]]] : [])));
}
