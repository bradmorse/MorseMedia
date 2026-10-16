import { assertFulfillmentReady, printMapping } from './prodigi';
import { isPrintReady } from './print-quality';
import { buildSku, finishOptions, getSizeOptions, products, type Product } from '@/data/site';

function stripeKeyMode(): 'test' | 'live' | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim() || '';
  if (key.includes('REPLACE_ME')) return null;
  const match = /^(sk|rk)_(test|live)_/.exec(key);
  return match ? (match[2] as 'test' | 'live') : null;
}

export function availablePrintSkus(product: Product): string[] {
  try {
    const mode = stripeKeyMode();
    if (!mode) return [];
    assertFulfillmentReady(mode === 'live');
    // Sizes the print master cannot hold sharply are never offered, whatever the lab catalog says.
    return getSizeOptions(product.orientation).filter(size=>isPrintReady(product.id,size.label)).flatMap(size=>finishOptions.flatMap(finish=>{
      const sku=buildSku(product.id,size.label,finish.label);
      try {printMapping(sku);return [sku];} catch {return [];}
    }));
  } catch {return [];}
}

/** True when at least one print configuration can be bought online right now. */
export function storeIsOpen(): boolean {
  return products.some((product) => availablePrintSkus(product).length > 0);
}
