/**
 * Home page background film (Update 8).
 * To change it: add new files with a new version number (the video folder is cached for a year),
 * then point these paths at them. Keep each clip short, silent and under ~7 MB.
 */
export const heroFilm = {
  /** 1920 × 1080 H.264, no audio — the full 16:9 frame with the film's cinematic letterbox bars. Laptops, desktops, tablets. */
  wide: '/video/hero-film-wide-v2.mp4',
  /** 720 × 1280 H.264, no audio — centre cut of the full frame, letterbox bars kept. Phones. */
  portrait: '/video/hero-film-portrait-v2.mp4',
  /** First frame of the film (with bars). Shown while the video loads, and instead of it for reduced motion or Save-Data. */
  poster: '/images/hero/hero-film-poster-v2.webp',
  posterAlt: 'Forest trail in summer, the opening shot of a short film by Bradley Morse',
  caption: 'Film by Bradley Morse',
};
