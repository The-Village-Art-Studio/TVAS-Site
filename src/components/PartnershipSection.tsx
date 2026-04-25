import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Handshake, MapPin, Briefcase, Globe, ArrowRight } from 'lucide-react';

const partnerIcons = {
  venue: MapPin,
  brand: Briefcase,
  community: Globe,
};

export default function PartnershipSection() {
  const t = useTranslations('Partnerships');
  const typeKeys = ['venue', 'brand', 'community'] as const;

  return (
    <section className="py-24 lg:py-40 relative overflow-hidden bg-background/50 border-t border-border">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          {/* Text Column - Sticky on Desktop */}
          <div className="lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
              <Handshake size={14} />
              {t('eyebrow')}
            </div>
            <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              {t('headline')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-lg">
              {t('subheadline')}
            </p>
            <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl border-primary/20 hover:bg-primary hover:text-white transition-all duration-500 shadow-xl group">
              <Link href="/partnerships">
                {t('cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Partnership Types Column */}
          <div className="flex flex-col gap-8">
            {typeKeys.map((key, index) => {
              const Icon = partnerIcons[key];
              return (
                <div 
                  key={key} 
                  className="group relative p-8 lg:p-12 rounded-[2.5rem] bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
                >
                  <div className="flex gap-8 items-start relative z-10">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                      <Icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {t(`types.${key}.title`)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {t(`types.${key}.description`)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle index number background */}
                  <div className="absolute top-8 right-12 text-8xl font-black text-primary/5 pointer-events-none select-none transition-all duration-500 group-hover:text-primary/10 group-hover:scale-110">
                    {`0${index + 1}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
