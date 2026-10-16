// Measures your full-resolution print masters and shows which sizes each one can print sharply.
// Usage: npm run masters:check -- "C:\path\to\masters"
// Files must be named after the photo, e.g. forest-current.jpg (JPEG, PNG or TIFF).
import { closeSync, openSync, readSync, readdirSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { getSizeOptions, products } from '../data/site';
import { recentWork } from '../data/recent-work';
import { minimumPpi, printPpi } from '../lib/print-quality';

function readHead(file: string, bytes = 4 * 1024 * 1024): Uint8Array {
  const fd = openSync(file, 'r');
  try {
    const buffer = new Uint8Array(bytes);
    const read = readSync(fd, buffer, 0, bytes, 0);
    return buffer.subarray(0, read);
  } finally { closeSync(fd); }
}

function jpegSize(b: Uint8Array) {
  let i = 2;
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const marker = b[i + 1];
    const length = (b[i + 2] << 8) | b[i + 3];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: (b[i + 5] << 8) | b[i + 6], width: (b[i + 7] << 8) | b[i + 8] };
    }
    i += 2 + length;
  }
  return null;
}

function pngSize(b: Uint8Array) {
  const v = new DataView(b.buffer, b.byteOffset, b.byteLength);
  return b.length > 24 ? { width: v.getUint32(16), height: v.getUint32(20) } : null;
}

function tiffSize(b: Uint8Array) {
  const v = new DataView(b.buffer, b.byteOffset, b.byteLength);
  const little = b[0] === 0x49;
  const u16 = (o: number) => v.getUint16(o, little);
  const u32 = (o: number) => v.getUint32(o, little);
  const ifd = u32(4);
  let width = 0; let height = 0;
  for (let n = 0; n < u16(ifd); n++) {
    const entry = ifd + 2 + n * 12;
    const tag = u16(entry); const type = u16(entry + 2);
    const value = type === 3 ? u16(entry + 8) : u32(entry + 8);
    if (tag === 256) width = value;
    if (tag === 257) height = value;
  }
  return width && height ? { width, height } : null;
}

function imageSize(file: string) {
  const b = readHead(file);
  if (b[0] === 0xff && b[1] === 0xd8) return jpegSize(b);
  if (b[0] === 0x89 && b[1] === 0x50) return pngSize(b);
  if ((b[0] === 0x49 && b[1] === 0x49) || (b[0] === 0x4d && b[1] === 0x4d)) return tiffSize(b);
  return null;
}

const folder = process.argv[2];
if (!folder) {
  console.log('Usage: npm run masters:check -- "C:\\path\\to\\masters"');
  process.exit(1);
}

const known = new Map<string, string>([...products.map((p) => [p.slug, p.orientation] as [string, string]), ...recentWork.map((p) => [p.slug, 'portrait'] as [string, string])]);
const entries: string[] = [];
console.log(`Minimum for sale: ${minimumPpi()} ppi\n`);
for (const name of readdirSync(folder).sort()) {
  if (!/\.(jpe?g|png|tiff?)$/i.test(name)) continue;
  const slug = basename(name, extname(name)).toLowerCase();
  const size = imageSize(join(folder, name));
  if (!size) { console.log(`?  ${name}: could not read the image size`); continue; }
  const orientation = known.get(slug);
  if (!orientation) { console.log(`?  ${name}: ${size.width} × ${size.height} — no photo with the slug "${slug}"`); continue; }
  const sizes = getSizeOptions(orientation === 'landscape' ? 'landscape' : 'portrait').map((option) => {
    const ppi = printPpi(size, option.label) || 0;
    return `${option.label} ${ppi >= minimumPpi() ? '✓' : '✗'} ${ppi} ppi`;
  });
  console.log(`${slug}: ${size.width} × ${size.height}\n   ${sizes.join('   ')}`);
  entries.push(`  '${slug}': { width: ${size.width}, height: ${size.height} },`);
}
console.log('\nPaste into data/print-masters.ts:\n');
console.log(entries.join('\n') || '  (no matching files found)');
