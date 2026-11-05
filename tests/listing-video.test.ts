import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { formatDuration, isoDuration, listingMeta, listings } from '../data/real-estate-portfolio';
import { blurPlaceholders } from '../data/blur-placeholders';
import sitemap from '../app/sitemap';

const root = process.cwd();
const publicFile = (path: string) => join(root, 'public', path);

/** Track types, video display size, length in seconds and web-optimized flag of an MP4. */
function mp4Info(file: string) {
  const buf = readFileSync(file);
  const handlers: string[] = [];
  for (let i = buf.indexOf('hdlr'); i !== -1; i = buf.indexOf('hdlr', i + 4)) {
    const type = buf.toString('latin1', i + 12, i + 16);
    if (/^[a-z]{4}$/.test(type)) handlers.push(type);
  }
  let size = { width: 0, height: 0 };
  for (let i = buf.indexOf('tkhd'); i !== -1; i = buf.indexOf('tkhd', i + 4)) {
    const at = i + (buf[i + 4] === 1 ? 92 : 80);
    const width = buf.readUInt32BE(at) / 65536;
    const height = buf.readUInt32BE(at + 4) / 65536;
    if (width && height) { size = { width, height }; break; }
  }
  // Movie header: timescale and duration (64-bit in version 1).
  const mvhd = buf.indexOf('mvhd');
  const v1 = buf[mvhd + 4] === 1;
  const timescale = buf.readUInt32BE(mvhd + (v1 ? 24 : 16));
  const duration = v1 ? Number(buf.readBigUInt64BE(mvhd + 28)) : buf.readUInt32BE(mvhd + 20);
  return { handlers, size, seconds: duration / timescale, fastStart: buf.indexOf('moov') !== -1 && buf.indexOf('moov') < buf.indexOf('mdat') };
}

/** Canvas size from a WebP header. */
function webpSize(buf: Buffer) {
  const chunk = buf.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
  if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  if (chunk === 'VP8L') { const bits = buf.readUInt32LE(21); return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }; }
  return null;
}

const withVideo = listings.filter((listing) => listing.video);

test('the barn home has its video tour', () => {
  const barn = listings.find((listing) => listing.slug === 'barn-home');
  assert.ok(barn?.video, 'barn home video is missing');
  assert.equal(barn.video.src, '/video/barn-home-tour-v1.mp4');
  assert.deepEqual(listingMeta(barn).filter(Boolean), ['24 photos', '1:30 video tour']);
});

test('listing videos are on disk, versioned, web-optimized and small enough to upload and stream', () => {
  for (const { video, slug } of withVideo) {
    if (!video) continue;
    assert.match(video.src, /^\/video\/[a-z0-9-]+-v\d+\.mp4$/, `${slug}: ${video.src} needs a version in its name (cached for a year)`);
    const file = publicFile(video.src);
    assert.ok(existsSync(file), `${video.src} is missing`);
    // GitHub's web upload takes files up to 25 MB.
    assert.ok(statSync(file).size < 25 * 1024 * 1024, `${video.src} is over 25 MB`);
    const info = mp4Info(file);
    assert.ok(info.handlers.includes('vide'), `${video.src} has no video track`);
    assert.ok(info.fastStart, `${video.src} is not web-optimized (moov after mdat)`);
    assert.deepEqual(info.size, { width: video.width, height: video.height }, `${video.src} size`);
    assert.ok(Math.abs(info.seconds - video.duration) < 1.5, `${video.src} runs ${info.seconds.toFixed(1)} s, listed as ${video.duration} s`);
    assert.ok(video.description.length >= 60 && video.title.length > 0, `${slug} video needs a title and description`);
    assert.match(video.uploadDate, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test('each video has a 16:9 poster frame with a blur placeholder', () => {
  for (const { video } of withVideo) {
    if (!video) continue;
    assert.ok(existsSync(publicFile(video.poster)), `${video.poster} is missing`);
    assert.deepEqual(webpSize(readFileSync(publicFile(video.poster))), { width: video.width, height: video.height }, `${video.poster} size`);
    assert.ok(blurPlaceholders[video.poster], `${video.poster} has no blur placeholder`);
  }
});

test('poster frames are versioned so a new frame is never hidden by the image cache', () => {
  for (const { slug, video } of withVideo) {
    if (!video) continue;
    assert.match(video.poster, /-v\d+\.webp$/, `${slug}: ${video.poster} needs a version in its name (images are cached for a week)`);
  }
  // Update 9.5.1: the barn home tour uses its opening frame as the thumbnail; the old 6-second frame is gone.
  const barn = listings.find((listing) => listing.slug === 'barn-home');
  assert.equal(barn?.video?.poster, '/images/real-estate/barn-home/tour-poster-v2.webp');
  assert.ok(!existsSync(publicFile('/images/real-estate/barn-home/tour-poster.webp')), 'old poster should be removed');
});

test('video durations format for people and for search engines', () => {
  assert.equal(formatDuration(90), '1:30');
  assert.equal(formatDuration(90.39), '1:30');
  assert.equal(formatDuration(65), '1:05');
  assert.equal(isoDuration(90), 'PT1M30S');
  assert.equal(isoDuration(45), 'PT45S');
});

test('the page shows the video above the photos, loads only the poster until played, and describes it for search', () => {
  const page = readFileSync(join(root, 'app/portfolio/real-estate/page.tsx'), 'utf8');
  assert.ok(page.indexOf('<ListingVideo') < page.indexOf('<ListingGallery'), 'video should come before the photo grid');
  assert.match(page, /'@type': 'VideoObject'/);
  const player = readFileSync(join(root, 'components/ListingVideo.tsx'), 'utf8');
  for (const needle of ['controls', 'playsInline', 'useState(false)', 'with sound', "trackEvent('video_start'"]) {
    assert.ok(player.includes(needle), `ListingVideo is missing ${needle}`);
  }
  assert.ok(!/autoPlay|\bmuted\b|\bloop\b/.test(player), 'the tour should not autoplay, loop or start muted');
  const entry = sitemap().find((item) => item.url === 'https://www.morsemedia.co/portfolio/real-estate');
  assert.equal(entry?.videos?.length, withVideo.length);
  assert.equal(entry?.videos?.[0]?.content_loc, 'https://www.morsemedia.co/video/barn-home-tour-v1.mp4');
});
