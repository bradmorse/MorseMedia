import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { heroFilm } from '../data/hero';

const root = process.cwd();
const publicFile = (path: string) => join(root, 'public', path);

/** Handler types of every track in an MP4 ('vide', 'soun', …) and whether the index sits before the media data. */
function mp4Info(file: string) {
  const buf = readFileSync(file);
  const handlers: string[] = [];
  for (let i = buf.indexOf('hdlr'); i !== -1; i = buf.indexOf('hdlr', i + 4)) {
    const type = buf.toString('latin1', i + 12, i + 16);
    if (/^[a-z]{4}$/.test(type)) handlers.push(type);
  }
  return { handlers, fastStart: buf.indexOf('moov') !== -1 && buf.indexOf('moov') < buf.indexOf('mdat') };
}

test('hero film files are on disk, versioned and light enough for a background', () => {
  for (const [path, maxMb] of [[heroFilm.wide, 7], [heroFilm.portrait, 4.5]] as const) {
    assert.match(path, /^\/video\/[a-z0-9-]+-v\d+\.mp4$/, `${path} needs a version in its name (it is cached for a year)`);
    const file = publicFile(path);
    assert.ok(existsSync(file), `${path} is missing`);
    assert.ok(statSync(file).size < maxMb * 1024 * 1024, `${path} is over ${maxMb} MB`);
    const { handlers, fastStart } = mp4Info(file);
    assert.ok(handlers.includes('vide'), `${path} has no video track`);
    assert.ok(!handlers.includes('soun'), `${path} still has an audio track`);
    assert.ok(fastStart, `${path} is not web-optimized (moov after mdat)`);
  }
  assert.ok(existsSync(publicFile(heroFilm.poster)), `${heroFilm.poster} is missing`);
});

test('the hero film autoplays silently, can be paused and respects reduced motion and Save-Data', () => {
  const source = readFileSync(join(root, 'components', 'HeroVideo.tsx'), 'utf8');
  for (const needle of ['muted', 'loop', 'playsInline', 'prefers-reduced-motion', 'saveData', 'Pause background video', 'Play background video', 'heroFilm.portrait', 'heroFilm.wide']) {
    assert.ok(source.includes(needle), `HeroVideo is missing ${needle}`);
  }
  const home = readFileSync(join(root, 'app', 'page.tsx'), 'utf8');
  assert.match(home, /<Image className="hero__image[^"]*" src=\{heroFilm\.poster\}[^>]*priority/);
  assert.match(home, /<HeroVideo \/>/);
  const config = readFileSync(join(root, 'next.config.ts'), 'utf8');
  assert.match(config, /source: '\/video\/:path\*'.*max-age=31536000, immutable/);
});
