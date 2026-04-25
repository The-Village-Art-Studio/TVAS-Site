import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const t = useTranslations('About');

  return (
    <section className="py-24 lg:py-40 border-t border-border bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Image Block with Immersive Framing */}
          <div className="relative group order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.01] bg-card">
              <div 
                className="w-full h-full bg-muted grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                style={{
                  backgroundImage: 'url("/about-studio.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Glass Floating Badge */}
            <div className="absolute -bottom-10 -right-10 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 hidden sm:block animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <p className="font-heading font-black text-2xl tracking-tighter text-foreground mb-1">
                The Village
              </p>
              <p className="text-[10px] text-primary uppercase tracking-[0.4em] font-black">
                Toronto, Canada
              </p>
            </div>
            
            {/* Decorative dots */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Text Block */}
          <div className="lg:pl-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
              <Sparkles size={12} />
              {t('eyebrow')}
            </div>
            <h2 className="text-4xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-10">
              {t('headline')}
            </h2>
            <div className="space-y-8 text-muted-foreground text-xl leading-relaxed mb-12 max-w-xl">
              <p className="text-foreground/80 font-medium">{t('body1')}</p>
              <p>{t('body2')}</p>
            </div>
            
            <Button asChild variant="link" className="h-auto p-0 text-primary font-bold text-xl hover:no-underline group">
              <Link href="/about" className="flex items-center gap-3">
                {t('cta')} 
                <ArrowRight className="transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
