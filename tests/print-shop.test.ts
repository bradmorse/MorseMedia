import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PRINT_SHOP_ENABLED, printShopPaths } from '../data/features';
import { defaultProjectType, projectTypes } from '../data/inquiries';
import { products } from '../data/site';
import { printSets } from '../data/sets';
import sitemap from '../app/sitemap';

const root = process.cwd();
const paused = !PRINT_SHOP_ENABLED;

test('the print shop data is kept for a later relaunch', () => {
  assert.ok(products.length >= 20, 'print catalog is still in data/site.ts');
  assert.ok(printSets.length > 0, 'print sets are still in data/sets.ts');
  for (const page of ['shop/page.tsx', 'shop/[slug]/page.tsx', 'collections/page.tsx', 'photography/page.tsx', 'print-guide/page.tsx', 'checkout/page.tsx']) {
    assert.ok(readFileSync(join(root, 'app', page), 'utf8').length > 0, `${page} still exists`);
  }
});

test('while paused, print pages are out of the sitemap and the contact form', { skip: !paused }, () => {
  const urls = sitemap().map((entry) => entry.url.replace('https://www.morsemedia.co', ''));
  for (const url of urls) assert.ok(!printShopPaths.some((base) => url === base || url.startsWith(`${base}/`)), `${url} should not be in the sitemap`);
  assert.ok(urls.includes('/services') && urls.includes('/real-estate') && urls.includes('/portfolio'));
  assert.ok(!projectTypes.includes('Print or order question'));
  assert.equal(defaultProjectType, 'Photo + video project');
});

test('while paused, print URLs redirect temporarily and the relaunch switch is documented', () => {
  const config = readFileSync(join(root, 'next.config.ts'), 'utf8');
  assert.match(config, /process\.env\.NEXT_PUBLIC_PRINT_SHOP === 'on'/);
  assert.match(config, /destination: '\/portfolio', permanent: false/);
  for (const path of printShopPaths) assert.ok(config.includes(`'${path}'`), `${path} is redirected`);
  assert.match(readFileSync(join(root, 'STORE-SETUP.md'), 'utf8'), /NEXT_PUBLIC_PRINT_SHOP/);
});

test('no always-visible link points into the paused shop', () => {
  // Shop links in shared components must sit behind PRINT_SHOP_ENABLED.
  const chrome = readFileSync(join(root, 'components', 'SiteChrome.tsx'), 'utf8');
  assert.match(chrome, /PRINT_SHOP_ENABLED \? \[\{ label: 'Prints', href: '\/shop' \}\] : \[\]/);
  const home = readFileSync(join(root, 'app', 'page.tsx'), 'utf8');
  assert.ok(home.indexOf('PRINT_SHOP_ENABLED ?') < home.indexOf('href="/shop"'), 'home page print section is gated');
});
