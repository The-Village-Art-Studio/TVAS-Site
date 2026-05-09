import React from 'react';
import Image from 'next/image';
import { Palette, Camera, Box, Cpu, Music, PenTool } from 'lucide-react';

export type ArtistType = 'painter' | 'photographer' | 'sculptor' | 'digital' | 'musician' | 'writer';

interface ArtistMemberCardProps {
  name: string;
  type: ArtistType;
  typeLabel: string;
  imageUrl: string;
}

const TypeIcon = ({ type, size = 14 }: { type: ArtistType; size?: number }) => {
  switch (type) {
    case 'painter': return <Palette size={size} />;
    case 'photographer': return <Camera size={size} />;
    case 'sculptor': return <Box size={size} />;
    case 'digital': return <Cpu size={size} />;
    case 'musician': return <Music size={size} />;
    case 'writer': return <PenTool size={size} />;
    default: return <Palette size={size} />;
  }
};

export default function ArtistMemberCard({ name, type, typeLabel, imageUrl }: ArtistMemberCardProps) {
  return (
    <div className="group relative flex flex-col rounded-[2rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Profile Photo Area */}
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors duration-500 z-10" />
        <Image 
          src={imageUrl} 
          alt={name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
        />
        
        {/* Floating Type Label */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 z-20">
          <TypeIcon type={type} size={12} />
          {typeLabel}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 relative text-center">
        <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold">
          {typeLabel}
        </p>
      </div>
    </div>
  );
}
