import { printMasters, type PrintMaster } from '@/data/print-masters';

/**
 * Print-readiness guard. A size can only be sold when the print master has enough pixels for it.
 * 150 pixels per inch is the floor for a sharp wall print viewed from a normal distance;
 * 300 ppi is ideal for small prints viewed up close. Override with PRINT_MIN_PPI (100–300).
 */
export const DEFAULT_MIN_PPI = 150;

export function minimumPpi() {
  const configured = Number.parseInt(process.env.PRINT_MIN_PPI || '', 10);
  return Number.isFinite(configured) ? Math.min(300, Math.max(100, configured)) : DEFAULT_MIN_PPI;
}

/** "18 × 24 in" → [18, 24]. Returns null when the label has no dimensions. */
export function sizeInches(label: string): [number, number] | null {
  const match = /([\d.]+)\s*[×xX]\s*([\d.]+)/.exec(label);
  if (!match) return null;
  const a = Number(match[1]);
  const b = Number(match[2]);
  return a > 0 && b > 0 ? [a, b] : null;
}

/** Effective pixels per inch when the master fills the print (the tighter edge decides). */
export function printPpi(master: PrintMaster, label: string): number | null {
  const inches = sizeInches(label);
  if (!inches || master.width <= 0 || master.height <= 0) return null;
  const shortIn = Math.min(...inches);
  const longIn = Math.max(...inches);
  const shortPx = Math.min(master.width, master.height);
  const longPx = Math.max(master.width, master.height);
  return Math.floor(Math.min(shortPx / shortIn, longPx / longIn));
}

export type PrintReadiness = { ready: boolean; ppi: number | null; reason: string };

export function printReadiness(photoId: string, sizeLabel: string, masters: Record<string, PrintMaster> = printMasters): PrintReadiness {
  const master = masters[photoId];
  if (!master) return { ready: false, ppi: null, reason: 'No print master recorded in data/print-masters.ts.' };
  const ppi = printPpi(master, sizeLabel);
  if (ppi === null) return { ready: false, ppi: null, reason: `Size "${sizeLabel}" could not be read.` };
  const minimum = minimumPpi();
  return ppi >= minimum
    ? { ready: true, ppi, reason: `${ppi} ppi` }
    : { ready: false, ppi, reason: `${ppi} ppi is below the ${minimum} ppi minimum.` };
}

export function isPrintReady(photoId: string, sizeLabel: string) {
  return printReadiness(photoId, sizeLabel).ready;
}

/** Smallest master (in pixels) that would print this size at the minimum ppi. */
export function pixelsNeeded(sizeLabel: string): [number, number] | null {
  const inches = sizeInches(sizeLabel);
  if (!inches) return null;
  const ppi = minimumPpi();
  return [Math.ceil(Math.min(...inches) * ppi), Math.ceil(Math.max(...inches) * ppi)];
}
