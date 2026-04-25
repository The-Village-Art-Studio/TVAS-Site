import React from 'react';
import { Play, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoCardProps {
  title: string;
  artist: string;
  description: string;
  youtubeId: string;
}

export default function VideoCard({ 
  title, 
  artist, 
  description, 
  youtubeId 
}: VideoCardProps) {
  return (
    <div className="group relative flex flex-col rounded-[2.5rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
      {/* Video Embed Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <User size={12} />
            {artist}
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
           <a 
             href={`https://www.youtube.com/watch?v=${youtubeId}`}
             target="_blank"
             rel="noopener noreferrer"
             className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform"
           >
             Watch on YouTube
             <ArrowRight size={14} />
           </a>
        </div>
      </div>
    </div>
  );
}
