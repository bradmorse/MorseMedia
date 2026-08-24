'use client';

import { useEffect, useRef } from 'react';
import { useCart } from './CartProvider';

export default function ClearCartOnMount() {
  const { clear } = useCart();
  const clearRef = useRef(clear);

  useEffect(() => {
    clearRef.current();
  }, []);

  return null;
}
