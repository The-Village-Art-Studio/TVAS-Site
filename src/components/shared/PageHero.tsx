import React from 'react';

interface PageHeroProps {
  eyebrow: string;
  headline: string;
  lead?: string;
  backgroundImage?: string;
}

export default function PageHero({ eyebrow, headline, lead, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden border-b border-border bg-background">
      {/* Immersive Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {backgroundImage && (
        <div 
          className="absolute inset-0 z-[-1] opacity-20 grayscale brightness-50"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* Animated Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
          {eyebrow}
        </div>
        
        {/* High-Fidelity Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-10 text-foreground leading-[1.05] tracking-tight max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {headline}
        </h1>

        {/* Lead Text */}
        {lead && (
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground/80 max-w-[800px] mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
