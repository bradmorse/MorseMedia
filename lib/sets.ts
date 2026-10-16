import { SET_DISCOUNT_PERCENT, printSets, type PrintSet } from '@/data/sets';

export function setForProduct(productId: string): PrintSet | undefined {
  return printSets.find((set) => set.pieces.includes(productId));
}

export type SetPricedLine<T> = T & { originalUnitPrice: number; set?: { slug: string; name: string; percent: number } };

/** Set prices are rounded to whole dollars, matching how prices are shown everywhere on the site. */
function dollars(value: number) {
  return Math.round(value);
}

/**
 * Applies the complete-set discount: when every piece of a set is in the order (any size or finish),
 * each line for those pieces is discounted. Used by the bag (display) and by checkout (the price charged).
 */
export function applySetPricing<T extends { id: string; unitPrice: number }>(lines: T[], percent = SET_DISCOUNT_PERCENT): SetPricedLine<T>[] {
  const ids = new Set(lines.map((line) => line.id));
  const complete = printSets.filter((set) => set.pieces.every((piece) => ids.has(piece)));
  return lines.map((line) => {
    const set = complete.find((entry) => entry.pieces.includes(line.id));
    if (!set || percent <= 0) return { ...line, originalUnitPrice: line.unitPrice };
    return {
      ...line,
      originalUnitPrice: line.unitPrice,
      unitPrice: dollars(line.unitPrice * (100 - percent) / 100),
      set: { slug: set.slug, name: set.name, percent },
    };
  });
}

/** Sets the order has started but not finished, with the pieces still missing. */
export function incompleteSets(productIds: string[]) {
  const ids = new Set(productIds);
  return printSets
    .map((set) => ({ set, missing: set.pieces.filter((piece) => !ids.has(piece)) }))
    .filter(({ set, missing }) => missing.length > 0 && missing.length < set.pieces.length);
}
