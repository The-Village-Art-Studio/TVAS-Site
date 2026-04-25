import React from 'react';
import { Quote } from 'lucide-react';

interface QuoteBlockProps {
  quote: string;
  attribution?: string;
}

export default function QuoteBlock({ quote, attribution }: QuoteBlockProps) {
  return (
    <section className="py-24 lg:py-40 relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center">
        {/* Decorative Quote Icon */}
        <div className="mb-12 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary/40">
            <Quote size={32} />
          </div>
        </div>

        <blockquote className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-12 text-foreground">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {attribution && (
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-[1px] bg-primary/30" />
            <cite className="text-primary font-bold uppercase tracking-[0.2em] text-sm not-italic">
              {attribution}
            </cite>
            <div className="w-12 h-[1px] bg-primary/30" />
          </div>
        )}
      </div>

      {/* Subtle Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px]" />
      </div>
    </section>
  );
}
