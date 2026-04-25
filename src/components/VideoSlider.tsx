"use client";

import React, { useRef, useState, useEffect } from 'react';
import VideoCard from '@/components/cards/VideoCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Episode {
  title: string;
  artist: string;
  description: string;
  youtubeId?: string;
}

interface VideoSliderProps {
  episodes: Episode[];
}

export default function VideoSlider({ episodes }: VideoSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Math.ceil to handle decimal pixels
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [episodes]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      // Scroll by one card width approximately (or full width if mobile)
      const scrollAmount = window.innerWidth < 768 ? clientWidth : clientWidth / 2;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // If 3 or fewer items, just render a static grid
  if (episodes.length <= 3) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {episodes.map((episode, index) => (
          <div 
            key={index}
            className="animate-in fade-in slide-in-from-bottom-8 duration-1000"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <VideoCard 
              title={episode.title}
              artist={episode.artist}
              description={episode.description}
              youtubeId={episode.youtubeId || "dQw4w9WgXcQ"}
            />
          </div>
        ))}
      </div>
    );
  }

  // If more than 3 items, render slider
  return (
    <div className="relative group">
      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 px-4 -mx-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {episodes.map((episode, index) => (
          <div 
            key={index}
            className="flex-none w-[85vw] md:w-[45vw] lg:w-[30vw] snap-center animate-in fade-in slide-in-from-bottom-8 duration-1000"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <VideoCard 
              title={episode.title}
              artist={episode.artist}
              description={episode.description}
              youtubeId={episode.youtubeId || "dQw4w9WgXcQ"}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            canScrollLeft 
              ? 'bg-card border border-border text-foreground hover:bg-primary hover:text-white hover:border-primary shadow-lg hover:-translate-y-1' 
              : 'bg-card/50 border border-border/50 text-muted-foreground opacity-50 cursor-not-allowed'
          }`}
          aria-label="Previous videos"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            canScrollRight 
              ? 'bg-card border border-border text-foreground hover:bg-primary hover:text-white hover:border-primary shadow-lg hover:-translate-y-1' 
              : 'bg-card/50 border border-border/50 text-muted-foreground opacity-50 cursor-not-allowed'
          }`}
          aria-label="Next videos"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
