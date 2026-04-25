import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { Button } from './ui/button';
import { Rocket, ArrowRight } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('Hero');

  // Splitting headline for that dual-tone effect
  const headlineWords = t('headline').split(' ');
  const splitPoint = Math.ceil(headlineWords.length / 2);
  const firstHalf = headlineWords.slice(0, splitPoint).join(' ');
  const secondHalf = headlineWords.slice(splitPoint).join(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-32 lg:pt-48 lg:pb-48">
      {/* Background gradients for extra depth atop the 3D scene */}
      <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 text-foreground text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
          {t('eyebrow')}
        </div>
        
        {/* High-Fidelity Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold mb-10 text-foreground leading-[1.05] tracking-tight max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {firstHalf}{" "}
          <span className="text-primary drop-shadow-sm">
            {secondHalf}
          </span>
        </h1>

        {/* Subheadline with improved readability */}
        <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground/80 max-w-[850px] mx-auto mb-16 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          {t('subheadline')}
        </p>

        {/* Premium CTA Block */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <Button asChild size="lg" className="h-16 px-12 text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/20 hover:scale-[1.05] transition-all duration-500 group">
            <Link href="/workshops">
              <Rocket className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              {t('ctaPrimary')}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-16 px-12 text-xl font-bold rounded-2xl backdrop-blur-xl bg-white/5 border-white/10 text-foreground hover:bg-white hover:text-primary hover:border-white transition-all duration-500 shadow-xl group/btn">
            <Link href="/podcast" className="flex items-center">
              {t('ctaSecondary')}
              <ArrowRight className="ml-3 h-6 w-6 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
