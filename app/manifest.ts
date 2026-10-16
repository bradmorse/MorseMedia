import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Morse Media',
    short_name: 'Morse Media',
    description: 'Fine-art photography, cinematic video and thoughtful design.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d1412',
    theme_color: '#0d1412',
    icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }],
  };
}
