import React from 'react';
import { Play, Clock, Mic, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EpisodeCardProps {
  number: string;
  title: string;
  artist: string;
  medium: string;
  duration: string;
  description: string;
}

export default function EpisodeCard({ 
  number, 
  title, 
  artist, 
  medium, 
  duration, 
  description 
}: EpisodeCardProps) {
  return (
    <div className="group relative flex flex-col p-8 lg:p-10 rounded-[2.5rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors duration-500" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Mic size={12} />
            Episode {number}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
            <Clock size={12} />
            {duration}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-primary font-bold text-xs uppercase tracking-widest mb-6">
          {artist} &bull; {medium}
        </p>
        
        <p className="text-muted-foreground leading-relaxed mb-10 line-clamp-3 flex-grow">
          {description}
        </p>

        <Button asChild variant="outline" className="self-start rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg group/btn">
          <button onClick={() => {}}>
            <Play size={14} className="mr-2 fill-current" />
            Listen Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </Button>
      </div>
    </div>
  );
}
