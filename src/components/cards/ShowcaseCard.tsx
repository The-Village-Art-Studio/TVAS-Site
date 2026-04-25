import React from 'react';
import { ArrowUpRight, Palette, Calendar } from 'lucide-react';

interface ShowcaseCardProps {
  month: string;
  artist: string;
  medium: string;
  series: string;
  imageUrl?: string;
}

export default function ShowcaseCard({ month, artist, medium, series, imageUrl }: ShowcaseCardProps) {
  return (
    <div className="group relative flex flex-col rounded-[2.5rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500 z-10" />
        <div 
          className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          style={{ 
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
            backgroundColor: imageUrl ? 'transparent' : 'rgba(var(--primary-rgb), 0.1)',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        {/* Floating Label */}
        <div className="absolute top-6 left-6 px-4 py-2 bg-primary/90 text-white rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-2 z-20">
          <Calendar size={12} />
          {month}
        </div>
        
        {/* Action Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
          <div className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
            <ArrowUpRight size={32} />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 relative">
        <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-4">
          <Palette size={12} />
          {series}
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
          {artist}
        </h3>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium opacity-60">
          {medium}
        </p>
      </div>
    </div>
  );
}
