"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoCard from '@/components/cards/VideoCard';

type GalleryItem = {
  type: 'image' | 'video';
  url?: string;
  youtubeId?: string;
  title: string;
  description?: string;
};

interface LightboxGalleryProps {
  items: GalleryItem[];
  artistName: string;
}

export default function LightboxGallery({ items, artistName }: LightboxGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = items.filter(item => item.type === 'image');

  const openLightbox = (item: GalleryItem) => {
    if (item.type === 'image') {
      const imgIndex = images.findIndex(i => i.url === item.url);
      setSelectedIndex(imgIndex);
    }
  };

  const closeLightbox = () => setSelectedIndex(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[300px]">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`animate-in fade-in slide-in-from-bottom-8 duration-1000 overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-all ${item.type === 'image' ? 'cursor-zoom-in' : ''}`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => openLightbox(item)}
          >
            {item.type === 'video' ? (
              <div className="h-full w-full">
                <VideoCard 
                  title={item.title || "Video Process"}
                  artist={artistName}
                  description={item.description || "Video documentation"}
                  youtubeId={item.youtubeId || ''}
                />
              </div>
            ) : (
              <div className="relative w-full h-full group bg-card/50">
                <Image 
                  src={item.url || ''} 
                  alt={item.title || "Gallery Artwork"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          
          {selectedIndex > 0 && (
            <button 
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 hidden sm:block"
              onClick={prevImage}
            >
              <ChevronLeft size={48} />
            </button>
          )}

          <div className="relative w-full max-w-5xl h-[80vh] px-4" onClick={e => e.stopPropagation()}>
            <Image 
              src={images[selectedIndex].url || ''} 
              alt="Expanded view"
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {selectedIndex < images.length - 1 && (
            <button 
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 hidden sm:block"
              onClick={nextImage}
            >
              <ChevronRight size={48} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
