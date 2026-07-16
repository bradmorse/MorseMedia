import { buildSku, calculateUnitPrice, getProduct } from '@/data/site';

export type CheckoutCartItem = {
  id: string;
  qty: number;
  size: string;
  finish: string;
};

export type ValidatedCheckoutItem = CheckoutCartItem & {
  title: string;
  image: string;
  unitPrice: number;
  sku: string;
};

const MAX_LINE_QUANTITY = 20;
const MAX_ORDER_QUANTITY = 50;

export function validateCheckoutItems(input: unknown): ValidatedCheckoutItem[] {
  if (!Array.isArray(input) || input.length === 0 || input.length > 50) {
    throw new Error('Your bag is empty or contains too many line items.');
  }

  const validated = input.map((value) => {
    if (!value || typeof value !== 'object') throw new Error('A cart item is invalid.');
    const item = value as Partial<CheckoutCartItem>;
    if (typeof item.id !== 'string' || typeof item.size !== 'string' || typeof item.finish !== 'string') {
      throw new Error('A cart item is missing required options.');
    }
    if (!Number.isInteger(item.qty) || Number(item.qty) < 1 || Number(item.qty) > MAX_LINE_QUANTITY) {
      throw new Error(`Item quantities must be between 1 and ${MAX_LINE_QUANTITY}.`);
    }

    const product = getProduct(item.id);
    if (!product) throw new Error(`The print “${item.id}” is no longer available.`);
    const unitPrice = calculateUnitPrice(product, item.size, item.finish);
    if (unitPrice === null) throw new Error(`The selected options for “${product.title}” are unavailable.`);

    return {
      id: product.id,
      qty: Number(item.qty),
      size: item.size,
      finish: item.finish,
      title: product.title,
      image: product.image,
      unitPrice,
      sku: buildSku(product.id, item.size, item.finish),
    };
  });

  const merged = new Map<string, ValidatedCheckoutItem>();
  for (const item of validated) {
    const existing = merged.get(item.sku);
    const qty = (existing?.qty || 0) + item.qty;
    if (qty > MAX_LINE_QUANTITY) throw new Error(`A single print configuration is limited to ${MAX_LINE_QUANTITY} copies.`);
    merged.set(item.sku, existing ? { ...existing, qty } : item);
  }

  const result = [...merged.values()];
  const totalQuantity = result.reduce((total, item) => total + item.qty, 0);
  if (totalQuantity > MAX_ORDER_QUANTITY) throw new Error(`Orders are limited to ${MAX_ORDER_QUANTITY} total prints.`);
  return result;
}
