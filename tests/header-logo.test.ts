import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const logo = '/images/morse-media-logo-inline.png';

function pngSize(file: string) {
  const buf = readFileSync(file);
  assert.equal(buf.toString('latin1', 1, 4), 'PNG');
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

test('the header logo fits inside the header line at every size', () => {
  const { width, height } = pngSize(join(root, 'public', logo));
  // Circle and lettering share one height, so the mark is wide and short.
  assert.ok(width / height > 3.5, `logo is ${width} x ${height}`);
  const header = readFileSync(join(root, 'components', 'SiteChrome.tsx'), 'utf8');
  assert.ok(header.includes(`src="${logo}"`), 'header does not use the compact logo');
  const css = readFileSync(join(root, 'app', 'refinements.css'), 'utf8');
  const desktop = Number(/\.brand \{ width: clamp\(\d+px, [\d.]+vw, (\d+)px\); \}/.exec(css)?.[1]);
  const phone = Number(/@media \(max-width: 900px\) \{ \.brand \{ width: (\d+)px; \} \}/.exec(css)?.[1]);
  assert.ok(desktop && phone, 'brand widths not found in refinements.css');
  // Header content height = header height minus 12px padding top and bottom (scrolled headers are the tightest).
  assert.ok((desktop * height) / width <= 76 - 24, `desktop logo is ${((desktop * height) / width).toFixed(1)}px tall`);
  assert.ok((phone * height) / width <= 68 - 24, `phone logo is ${((phone * height) / width).toFixed(1)}px tall`);
});
