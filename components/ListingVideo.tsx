'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { formatDuration, type ListingVideo as Video } from '@/data/real-estate-portfolio';
import { trackEvent } from '@/lib/analytics';

/**
 * A listing's video tour. Until it is clicked only the poster frame loads (a responsive next/image), so the
 * page stays fast; the click swaps in the real player, which starts playing with sound and native controls.
 */
export default function ListingVideo({ video, listingTitle, placeholder, sizes = '(max-width: 1440px) 100vw, 1360px' }: { video: Video; listingTitle: string; placeholder?: string; sizes?: string }) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const length = formatDuration(video.duration);

  useEffect(() => {
    const player = videoRef.current;
    if (!started || !player) return;
    player.focus(); // keyboard users land on the player (space pauses, arrows seek)
    player.play().catch(() => undefined); // if the browser refuses, the native controls show a play button
  }, [started]);

  return (
    <figure className="listing-video">
      <div className="listing-video__frame">
        {started ? (
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            width={video.width}
            height={video.height}
            controls
            playsInline
            preload="auto"
            aria-label={`${listingTitle}: ${video.title.toLowerCase()} (${length})`}
            onPlay={() => trackEvent('video_start', { video_title: `${listingTitle} — ${video.title}`, video_url: video.src })}
          />
        ) : (
          <button type="button" className="listing-video__start" onClick={() => setStarted(true)}>
            <Image
              src={video.poster}
              alt=""
              fill
              sizes={sizes}
              {...(placeholder ? { placeholder: 'blur' as const, blurDataURL: placeholder } : {})}
            />
            <span className="listing-video__play" aria-hidden="true"><Play /></span>
            {/* The visible label is the button's accessible name: "Play Video tour, 1:30, with sound". */}
            <span className="listing-video__label"><span className="sr-only">Play </span><strong>{video.title}</strong><small><span className="sr-only">, </span>{length}, with sound</small></span>
          </button>
        )}
      </div>
    </figure>
  );
}
