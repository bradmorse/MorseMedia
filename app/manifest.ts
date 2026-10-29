import type { MetadataRoute } from 'next';
import { PRINT_SHOP_ENABLED } from '@/data/features';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Morse Media',
    short_name: 'Morse Media',
    description: PRINT_SHOP_ENABLED ? 'Nashville photography and cinematic video, plus original fine-art prints.' : 'Nashville photography and cinematic video for businesses, agents and brands.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d1412',
    theme_color: '#0d1412',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
