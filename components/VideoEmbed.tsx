import { videoEmbed } from '@/lib/video';

/** A responsive 16:9 YouTube or Vimeo player. Renders nothing when the link is empty or not recognised. */
export default function VideoEmbed({ url, title, className = '' }: { url?: string; title: string; className?: string }) {
  const src = videoEmbed(url);
  if (!src) return null;
  return (
    <div className={`video-embed ${className}`.trim()}>
      <iframe src={src} title={title} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
    </div>
  );
}
