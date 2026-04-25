import React from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTABannerProps {
  eyebrow: string;
  headline: string;
  body?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  theme?: 'light' | 'dark' | 'muted';
}

export default function CTABanner({ 
  eyebrow, 
  headline, 
  body, 
  primaryCta, 
  secondaryCta,
  theme = 'muted'
}: CTABannerProps) {
  const isDark = theme === 'dark';

  return (
    <section className={`py-24 lg:py-40 relative overflow-hidden ${isDark ? 'bg-foreground text-background' : 'bg-muted text-foreground'}`}>
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
        {/* Animated Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {eyebrow}
        </div>
        
        {/* High-Fidelity Headline */}
        <h2 className={`text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-8 ${isDark ? 'text-white' : 'text-foreground'}`}>
          {headline}
        </h2>

        {/* Body Text */}
        {body && (
          <p className={`text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl mx-auto ${isDark ? 'text-white/70' : 'text-muted-foreground'}`}>
            {body}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button asChild size="lg" className="h-16 px-12 text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/20 hover:scale-[1.05] transition-all duration-500 group">
            <Link href={primaryCta.href as any}>
              {primaryCta.label}
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          {secondaryCta && (
            <Button asChild variant="outline" size="lg" className={`h-16 px-12 text-xl font-bold rounded-2xl backdrop-blur-xl border-white/20 transition-all duration-500 ${isDark ? 'bg-white/10 text-white hover:bg-white hover:text-primary' : 'bg-background/10 text-foreground hover:bg-foreground hover:text-background'}`}>
              <Link href={secondaryCta.href as any}>
                {secondaryCta.label}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
