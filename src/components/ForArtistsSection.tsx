import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Sparkles, Mic, ImageIcon, Rocket, MessageCircle, ArrowRight } from 'lucide-react';

const benefitIcons = {
  podcast: Mic,
  showcase: ImageIcon,
  workshops: Rocket,
  community: MessageCircle,
};

export default function ForArtistsSection() {
  const t = useTranslations('ForArtists');
  const benefitKeys = ['podcast', 'showcase', 'workshops', 'community'] as const;

  return (
    <section className="py-24 lg:py-40 relative overflow-hidden bg-background">
      {/* Immersive Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Modern Header Design */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 lg:mb-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
              <Sparkles size={12} className="animate-pulse" />
              {t('eyebrow')}
            </div>
            <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              {t('headline')}
            </h2>
            <p className="text-xl text-muted-foreground/80 leading-relaxed max-w-xl">
              {t('subheadline')}
            </p>
          </div>
          
          <div className="hidden lg:block pb-4">
            <Button asChild size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl bg-primary text-white shadow-2xl shadow-primary/20 hover:scale-[1.05] transition-all duration-500">
              <Link href="/for-artists">
                {t('cta')}
              </Link>
            </Button>
          </div>
        </div>

        {/* High-Fidelity Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefitKeys.map((key) => {
            const Icon = benefitIcons[key];
            return (
              <div key={key} className="group relative p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {t(`benefits.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-8">
                    {t(`benefits.${key}.description`)}
                  </p>
                  <Link 
                    href="/for-artists" 
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 group-hover:text-primary transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="lg:hidden text-center">
          <Button asChild size="lg" className="w-full h-14 font-bold rounded-xl bg-primary text-white">
            <Link href="/for-artists">
              {t('cta')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

