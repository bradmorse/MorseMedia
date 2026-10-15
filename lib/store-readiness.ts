import { assertFulfillmentReady, printMapping } from './prodigi';
import { buildSku, finishOptions, getSizeOptions, type Product } from '@/data/site';
export function availablePrintSkus(product: Product): string[] {
  try {
    const key=process.env.STRIPE_SECRET_KEY || '';
    if(!/^(sk|rk)_(test|live)_/.test(key)) return [];
    assertFulfillmentReady(/^(sk|rk)_live_/.test(key));
    return getSizeOptions(product.orientation).flatMap(size=>finishOptions.flatMap(finish=>{
      const sku=buildSku(product.id,size.label,finish.label);
      try {printMapping(sku);return [sku];} catch {return [];}
    }));
  } catch {return [];}
}
