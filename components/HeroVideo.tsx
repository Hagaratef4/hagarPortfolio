"use client";

import { useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import SafeImage from "./SafeImage";

interface HeroVideoProps {
  videoUrl?: string;
  posterImage: string;
  title: string;
}

export default function HeroVideo({
  videoUrl,
  posterImage,
  title,
}: HeroVideoProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const hasVideo = Boolean(videoUrl && videoUrl.trim().length > 0);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-neutral/40 bg-charcoal text-white shadow-2xl">
      <div className="relative aspect-[16/9] w-full flex items-center justify-center">
        {hasVideo ? (
          <video
            src={videoUrl}
            poster={posterImage}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="h-full w-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <div className="relative h-full w-full">
            <SafeImage
              src={posterImage}
              alt={`${title} video preview`}
              fill
              className="object-cover opacity-75 blur-[2px] transition-all duration-700 hover:blur-0 hover:opacity-90"
              sizes="(max-width: 1400px) 100vw, 1400px"
              priority
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
            
            {/* Center Play Indicator Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="group relative flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-olive hover:bg-olive/20">
                <Play className="h-8 w-8 text-white translate-x-0.5" strokeWidth={1.5} />
                <span className="absolute -inset-2 rounded-full border border-white/20 animate-ping opacity-25" />
              </div>
              <p className="mt-4 font-serif text-lg tracking-wide text-white/90 md:text-xl">
                {title} Demo Showcase
              </p>
              <span className="mt-1 font-sans text-xs tracking-[0.2em] text-white/60 uppercase">
                VIDEO PRESENTATION
              </span>
            </div>
          </div>
        )}

        {/* Video Control Bar if video exists */}
        {hasVideo && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-charcoal/70 px-4 py-2 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white/80 transition-colors hover:text-white"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <span className="h-3 w-px bg-white/30" />
            <span className="font-sans text-[10px] tracking-wider text-white/70 uppercase">
              {isPlaying ? "PLAYING" : "PAUSED"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
