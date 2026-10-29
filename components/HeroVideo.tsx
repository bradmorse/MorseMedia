'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { heroFilm } from '@/data/hero';

type NetworkInformation = { saveData?: boolean };

/**
 * Silent background film for the home hero. The poster image rendered underneath is the film's first frame,
 * so the hero looks the same before the video starts. Phones get a portrait cut; visitors who prefer reduced
 * motion start paused (with a play button), and Save-Data connections never download the video.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection?.saveData) return;
    // Phones get the portrait cut; tablets and wider use the full frame so the letterbox bars stay in view.
    const tallScreen = window.matchMedia('(max-aspect-ratio: 2/3)').matches;
    setPaused(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setSrc(tallScreen ? heroFilm.portrait : heroFilm.wide);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    video.muted = true; // browsers only autoplay muted video
    if (paused) video.pause();
    else video.play().catch(() => setPaused(true)); // e.g. iOS Low Power Mode blocks autoplay
  }, [src, paused]);

  if (!src) return null;

  return (
    <>
      <video
        ref={videoRef}
        className={`hero__video${visible ? ' hero__video--visible' : ''}`}
        src={src}
        muted
        loop
        playsInline
        preload={paused ? 'none' : 'auto'}
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setVisible(true)}
      />
      <button
        type="button"
        className="hero__motion"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? 'Play background video' : 'Pause background video'}
      >
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>
    </>
  );
}
