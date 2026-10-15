import type { Metadata } from 'next';
import HomePage from '../page';
import PalettePreview from '@/components/PalettePreview';
export const metadata: Metadata = { title: 'Color Studies', robots: { index: false, follow: false } };
export default function DesignPreview() { return <><PalettePreview /><HomePage /></>; }
