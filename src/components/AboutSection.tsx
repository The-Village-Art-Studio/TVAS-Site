import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function AboutSection() {
  const t = useTranslations('About');

  return (
    <section className="py-24 lg:py-32 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Block */}
          <div className="relative group">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[0.99]">
              <div 
                className="w-full h-full bg-muted"
                style={{
                  backgroundImage: 'url("/about-studio.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-8 bg-card border border-border p-8 rounded-2xl shadow-2xl z-10 hidden sm:block animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <p className="font-heading font-extrabold text-xl tracking-tight text-foreground">
                The Village Art Studio
              </p>
              <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-[0.3em] font-bold">
                Established in Toronto
              </p>
            </div>
          </div>

          {/* Text Block */}
          <div className="lg:pl-8">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8">
              {t('eyebrow')}
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-10">
              {t('headline')}
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed mb-12">
              <p>{t('body1')}</p>
              <p>{t('body2')}</p>
            </div>
            <Link 
              href="/about" 
              className="group inline-flex items-center gap-2 text-primary font-bold text-lg hover:gap-4 transition-all"
            >
              {t('cta')} 
              <span className="text-2xl transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
